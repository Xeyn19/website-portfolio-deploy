import React, { startTransition, useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageBackLink from '../components/PageBackLink'
import { toast } from 'react-toastify'
import useAdminAuth from '../hooks/useAdminAuth'
import useProjectsData from '../hooks/useProjectsData'
import useSiteTheme from '../hooks/useSiteTheme'
import { supabase } from '../lib/supabaseClient'
import {
  getFallbackProjects,
  getProjectExternalLinks,
  getTechnologyVisual,
  summarizeProjectDescription,
} from '../lib/projectContent'

const projectCategoryChoices = ['Front-End', 'Full-Stack']
const publicCategoryFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'front-end', label: 'Front-End' },
]

const emptyProjectForm = {
  title: '',
  description: '',
  technologies: '',
  image: '',
  date: '',
  category: 'Front-End',
  link: '',
}

const toOptionalNumber = (value) => {
  const trimmedValue = value.toString().trim()

  if (!trimmedValue) {
    return null
  }

  const parsedValue = Number(trimmedValue)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

const toProjectForm = (project) => ({
  title: project.title ?? '',
  description: project.description ?? '',
  technologies: (project.technologies ?? []).join(', '),
  image: project.image ?? '',
  date: project.date?.toString() ?? '',
  category: project.category ?? 'Front-End',
  link: project.link ?? '',
})

const buildProjectPayload = (form) => ({
  title: form.title.trim(),
  description: form.description.trim(),
  technologies: form.technologies
    .split(',')
    .map((technology) => technology.trim())
    .filter(Boolean),
  image: form.image.trim(),
  date: toOptionalNumber(form.date),
  category: form.category.trim(),
  link: form.link.trim() || null,
})

const normalizeCategory = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

const Projects = () => {
  const { classes } = useSiteTheme()
  const { projects, loading: projectsLoading, refreshProjects } = useProjectsData()
  const { isAdmin, loading: authLoading, signOut, userEmail } = useAdminAuth()
  const safeProjects = Array.isArray(projects) && projects.length > 0 ? projects : getFallbackProjects()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projectForm, setProjectForm] = useState(emptyProjectForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)
  const focusRingClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70'
  const pillButtonClass = `inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-[13px] font-medium transition active:scale-[0.98] ${focusRingClass}`
  const primaryButtonClass = `${pillButtonClass} ${classes.buttonPrimary}`
  const ghostButtonClass = `${pillButtonClass} ${classes.buttonGhost}`
  const inputClass = `mt-2 w-full rounded-2xl px-4 py-3 text-base sm:text-sm ${classes.input} ${focusRingClass}`

  const openCreateProject = () => {
    setEditingProject(null)
    setProjectForm(emptyProjectForm)
    setActionError('')
    setIsProjectModalOpen(true)
  }

  const openEditProject = (project) => {
    setEditingProject(project)
    setProjectForm(toProjectForm(project))
    setActionError('')
    setIsProjectModalOpen(true)
  }

  const closeProjectModal = (force = false) => {
    if (saving && !force) {
      return
    }

    setIsProjectModalOpen(false)
    setEditingProject(null)
    setProjectForm(emptyProjectForm)
    setActionError('')
  }

  const handleProjectChange = (event) => {
    const { name, value } = event.target
    setProjectForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const filteredProjects = safeProjects.filter((project) => {
    if (selectedCategory === 'all') {
      return true
    }

    return normalizeCategory(project.category) === selectedCategory
  })
  const projectCategoryCounts = {
    all: safeProjects.length,
    'full-stack': safeProjects.filter((project) => normalizeCategory(project.category) === 'full-stack').length,
    'front-end': safeProjects.filter((project) => normalizeCategory(project.category) === 'front-end').length,
  }
  const selectedProjectFilter =
    publicCategoryFilters.find((filter) => filter.key === selectedCategory) ?? publicCategoryFilters[0]

  useEffect(() => {
    if (!isProjectModalOpen && !deleteTarget) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || saving) {
        return
      }

      if (isProjectModalOpen) {
        closeProjectModal()
      }

      if (deleteTarget) {
        setDeleteTarget(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deleteTarget, isProjectModalOpen, saving])

  const handleAdminLogout = async () => {
    const { error } = await signOut()

    if (error) {
      toast.error(error.message || 'Logout failed.')
    } else {
      toast.success('Logged out successfully.')
    }
  }

  const handleProjectSubmit = async (event) => {
    event.preventDefault()
    setActionError('')

    const payload = buildProjectPayload(projectForm)

    if (!payload.title || !payload.description || !payload.image || !payload.category) {
      setActionError('Title, description, category, and image path are required.')
      toast.error('Title, description, category, and image path are required.')
      return
    }

    setSaving(true)

    try {
      const request = editingProject
        ? supabase.from('projects').update(payload).eq('id', editingProject.id)
        : supabase.from('projects').insert([payload])

      const { error } = await request

      if (error) {
        throw error
      }

      closeProjectModal(true)
      await refreshProjects()
      toast.success(editingProject ? 'Project updated successfully.' : 'Project created successfully.')
    } catch (error) {
      console.error('Save project error', error)
      setActionError(error.message || 'Unable to save project.')
      toast.error(error.message || 'Unable to save project.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!deleteTarget) {
      return
    }

    setActionError('')
    setSaving(true)

    try {
      const { error } = await supabase.from('projects').delete().eq('id', deleteTarget.id)

      if (error) {
        throw error
      }

      setDeleteTarget(null)
      await refreshProjects()
      toast.success('Project deleted successfully.')
    } catch (error) {
      console.error('Delete project error', error)
      setActionError(error.message || 'Unable to delete project.')
      toast.error(error.message || 'Unable to delete project.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />

      <main className="mx-auto max-w-[860px]">
        <PageBackLink to="/#projects" label="Back to portfolio" />

        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className={`rounded-2xl p-5 sm:p-6 ${classes.shell}`}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Selected Work
              </p>
              <h1 className={`mt-3 text-[1.45rem] font-semibold tracking-tight sm:text-[1.8rem] ${classes.heading}`}>
                Projects
              </h1>
              <p className={`mt-2 max-w-xl text-[13.5px] leading-6 ${classes.textMuted}`}>
                A compact list of front-end and full-stack work.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
              <div className={`self-start rounded-full px-3 py-1.5 text-[12px] font-medium sm:self-auto ${classes.surfaceMuted} ${classes.heading}`}>
                {filteredProjects.length} / {safeProjects.length} {selectedProjectFilter.label}
              </div>

              {!authLoading && isAdmin ? (
                <div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
                  <button
                    type="button"
                    onClick={openCreateProject}
                    className={`w-full sm:w-auto ${primaryButtonClass}`}
                  >
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className={`w-full sm:w-auto ${ghostButtonClass}`}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {!authLoading && isAdmin ? (
            <p className={`mt-5 break-all text-xs sm:text-sm ${classes.textMuted}`}>Admin: {userEmail}</p>
          ) : null}

          <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {publicCategoryFilters.map((filter) => {
              const isActive = selectedCategory === filter.key

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => startTransition(() => setSelectedCategory(filter.key))}
                  className={`shrink-0 whitespace-nowrap ${pillButtonClass} ${
                    isActive ? classes.navActive : classes.buttonGhost
                  }`}
                >
                  {filter.label} ({projectCategoryCounts[filter.key] ?? 0})
                </button>
              )
            })}
          </div>

          <div className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
            {filteredProjects.map((project, index) => {
              const { liveLink, repoLink } = getProjectExternalLinks(project)
              const technologies = (project.technologies ?? []).map((technology) =>
                getTechnologyVisual(technology),
              )
              const projectMeta = [project.category, project.date].filter(Boolean)

              return (
                <Motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: 'easeOut', delay: index * 0.03 }}
                  viewport={{ once: false, amount: 0.15 }}
                  className={`rounded-2xl p-4 ${classes.surfaceMuted}`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 max-w-3xl">
                      <h2 className={`text-[1rem] font-semibold tracking-tight sm:text-[1.16rem] ${classes.heading}`}>
                        {project.title}
                      </h2>
                      {projectMeta.length ? (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {projectMeta.map((item) => (
                            <span
                              key={`${project.slug}-${item}`}
                              className={`inline-flex min-h-8 items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${classes.badgeMuted}`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                      <Link
                        to={`/projects/${project.slug}`}
                        className={ghostButtonClass}
                      >
                        View
                      </Link>
                      {liveLink ? (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={ghostButtonClass}
                        >
                          Live
                        </a>
                      ) : null}
                      {repoLink ? (
                        <a
                          href={repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={ghostButtonClass}
                        >
                          Code
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className={`mt-3 max-w-3xl text-[13.5px] leading-6 ${classes.text}`}>
                    {summarizeProjectDescription(project.description, 118)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {technologies.map((technology) => {
                      const TechIcon = technology.Icon

                      return (
                        <span
                          key={`${project.slug}-${technology.label}`}
                          className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${classes.badgeMuted}`}
                        >
                          <TechIcon className={`h-3 w-3 ${technology.iconClass}`} />
                          <span>{technology.label}</span>
                        </span>
                      )
                    })}
                  </div>

                  {!authLoading && isAdmin ? (
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                      <button
                        type="button"
                        onClick={() => openEditProject(project)}
                        className={ghostButtonClass}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActionError('')
                          setDeleteTarget(project)
                        }}
                        className={`inline-flex min-h-11 items-center justify-center rounded-full border border-red-300/60 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 ${focusRingClass}`}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </Motion.article>
              )
            })}

            {!filteredProjects.length && !projectsLoading ? (
              <div className={`rounded-2xl p-6 text-center sm:p-8 ${classes.surfaceMuted}`}>
                <p className={`text-sm ${classes.textMuted}`}>No projects found for this category.</p>
              </div>
            ) : null}
          </div>
        </Motion.section>
      </main>

      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-3 py-3 backdrop-blur sm:px-4 sm:py-6">
          <form
            onSubmit={handleProjectSubmit}
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-description"
            className={`mx-auto flex min-h-full w-full items-end sm:items-center sm:justify-center`}
          >
            <div
              role="dialog"
              aria-modal="true"
              className={`max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 ${classes.surface}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
                    {editingProject ? 'Edit Project' : 'New Project'}
                  </p>
                  <h2 id="project-modal-title" className={`mt-2 text-[1.3rem] font-semibold sm:text-[1.45rem] ${classes.heading}`}>
                    {editingProject ? editingProject.title : 'Add Project'}
                  </h2>
                  <p id="project-modal-description" className={`mt-2 text-sm leading-6 ${classes.textMuted}`}>
                    Use clear titles, concise descriptions, and links that work well on both mobile and desktop.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeProjectModal}
                  className={`w-full sm:w-auto ${ghostButtonClass}`}
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className={`block text-sm font-medium ${classes.text}`}>
                  Year
                  <input
                    name="date"
                    type="number"
                    inputMode="numeric"
                    value={projectForm.date}
                    onChange={handleProjectChange}
                    className={inputClass}
                    placeholder="2026"
                  />
                </label>

                <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                  Title
                  <input
                    name="title"
                    value={projectForm.title}
                    onChange={handleProjectChange}
                    className={inputClass}
                    required
                  />
                </label>

                <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                  Description
                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectChange}
                    rows="5"
                    className={`${inputClass} resize-y`}
                    required
                  />
                </label>

                <label className={`block text-sm font-medium ${classes.text}`}>
                  Category
                  <select
                    name="category"
                    value={projectForm.category}
                    onChange={handleProjectChange}
                    className={inputClass}
                    required
                  >
                    {projectCategoryChoices.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={`block text-sm font-medium ${classes.text}`}>
                  Image Path
                  <input
                    name="image"
                    value={projectForm.image}
                    onChange={handleProjectChange}
                    className={inputClass}
                    placeholder="/project-image.png"
                    required
                  />
                </label>

                <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                  Technology Icon Paths
                  <input
                    name="technologies"
                    value={projectForm.technologies}
                    onChange={handleProjectChange}
                    className={inputClass}
                    placeholder="/html.png, /tailwindcss.png, /reactjs.svg"
                  />
                  <span className={`mt-2 block text-xs leading-5 ${classes.textMuted}`}>
                    Separate each local public-folder image path with a comma.
                  </span>
                </label>

                <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                  Link
                  <input
                    name="link"
                    value={projectForm.link}
                    onChange={handleProjectChange}
                    className={inputClass}
                    placeholder="https://example.com"
                  />
                </label>
              </div>

              {actionError && <p className="mt-4 text-sm leading-6 text-red-400">{actionError}</p>}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeProjectModal}
                  className={`w-full sm:w-auto ${ghostButtonClass}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full sm:w-auto ${primaryButtonClass} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {saving ? 'Saving' : editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-3 py-3 backdrop-blur sm:px-4 sm:py-6">
          <div className="mx-auto flex min-h-full w-full items-end sm:items-center sm:justify-center">
            <div role="dialog" aria-modal="true" className={`w-full max-w-md rounded-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 ${classes.surface}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>Delete</p>
              <h2 className={`mt-2 text-[1.3rem] font-semibold sm:text-[1.45rem] ${classes.heading}`}>Delete project?</h2>
              <p className={`mt-3 text-sm leading-6 ${classes.text}`}>
                This will remove "{deleteTarget.title}" from Supabase.
              </p>
              {actionError && <p className="mt-4 text-sm leading-6 text-red-400">{actionError}</p>}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={saving}
                  className={`w-full sm:w-auto ${ghostButtonClass}`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProject}
                  disabled={saving}
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${focusRingClass}`}
                >
                  {saving ? 'Deleting' : 'Delete Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
