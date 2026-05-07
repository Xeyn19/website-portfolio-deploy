import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import useAdminAuth from '../hooks/useAdminAuth'
import useProjectsData from '../hooks/useProjectsData'
import useSiteTheme from '../hooks/useSiteTheme'
import { supabase } from '../lib/supabaseClient'
import {
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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projectForm, setProjectForm] = useState(emptyProjectForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)

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

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'all') {
      return true
    }

    return normalizeCategory(project.category) === selectedCategory
  })

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

  if (authLoading) {
    return <Spinner />
  }

  if (!isAdmin) {
    return <Navigate to="/#projects" replace />
  }

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />

      <main className="mx-auto max-w-[860px]">
        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Selected Work
              </p>
              <h1 className={`mt-3 text-[1.75rem] font-semibold tracking-tight sm:text-[2rem] ${classes.heading}`}>
                Projects
              </h1>
              <p className={`mt-4 max-w-2xl text-[14px] leading-7 ${classes.textMuted}`}>
                A focused list of front-end and full-stack work. Open a project to read the full case
                study, responsibilities, tech stack, and implementation details.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {isAdmin ? (
                <>
                  <button
                    type="button"
                    onClick={openCreateProject}
                    className={`rounded-full px-5 py-2.5 text-[13px] font-medium transition ${classes.buttonPrimary}`}
                  >
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className={`rounded-full px-5 py-2.5 text-[13px] font-medium transition ${classes.buttonGhost}`}
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {isAdmin ? (
            <p className={`mt-5 text-xs ${classes.textMuted}`}>Admin: {userEmail}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {publicCategoryFilters.map((filter) => {
              const isActive = selectedCategory === filter.key

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setSelectedCategory(filter.key)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                    isActive ? classes.navActive : classes.buttonGhost
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-5">
            {filteredProjects.map((project, index) => {
              const { liveLink, repoLink } = getProjectExternalLinks(project)
              const technologies = (project.technologies ?? []).map((technology) =>
                getTechnologyVisual(technology),
              )

              return (
                <Motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
                  viewport={{ once: true, amount: 0.15 }}
                  className={`rounded-[28px] p-5 ${classes.surfaceMuted}`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-3xl">
                      <h2 className={`text-[1.18rem] font-semibold tracking-tight sm:text-[1.34rem] ${classes.heading}`}>
                        {project.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className={`inline-flex rounded-full px-4 py-2 text-[13px] font-medium transition ${classes.buttonGhost}`}
                      >
                        View
                      </Link>
                      {liveLink ? (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex rounded-full px-4 py-2 text-[13px] font-medium transition ${classes.buttonGhost}`}
                        >
                          Live
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className={`mt-4 max-w-3xl text-[14.5px] leading-7 ${classes.text}`}>
                    {summarizeProjectDescription(project.description, 170)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {technologies.map((technology) => {
                      const TechIcon = technology.Icon

                      return (
                      <span
                        key={`${project.slug}-${technology.label}`}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${classes.badgeMuted}`}
                      >
                        <TechIcon className={`h-3.5 w-3.5 ${technology.iconClass}`} />
                        <span>{technology.label}</span>
                      </span>
                      )
                    })}
                  </div>

                  {isAdmin ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openEditProject(project)}
                        className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${classes.buttonGhost}`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActionError('')
                          setDeleteTarget(project)
                        }}
                        className="rounded-full border border-red-300/60 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </Motion.article>
              )
            })}

            {!filteredProjects.length && !projectsLoading ? (
              <div className={`rounded-[28px] p-8 text-center ${classes.surfaceMuted}`}>
                <p className={`text-sm ${classes.textMuted}`}>No projects found for this category.</p>
              </div>
            ) : null}
          </div>
        </Motion.section>
      </main>

      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex min-h-dvh items-end bg-slate-950/70 px-4 py-6 backdrop-blur sm:items-center sm:justify-center">
          <form
            onSubmit={handleProjectSubmit}
            className={`max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
                  {editingProject ? 'Edit Project' : 'New Project'}
                </p>
                <h2 className={`mt-2 text-[1.45rem] font-semibold ${classes.heading}`}>
                  {editingProject ? editingProject.title : 'Add Project'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeProjectModal}
                className={`self-start rounded-full px-4 py-2 text-sm transition ${classes.buttonGhost}`}
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
                  value={projectForm.date}
                  onChange={handleProjectChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="2026"
                />
              </label>

              <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                Title
                <input
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
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
                  className={`mt-2 w-full resize-y rounded-2xl px-4 py-3 ${classes.input}`}
                  required
                />
              </label>

              <label className={`block text-sm font-medium ${classes.text}`}>
                Category
                <select
                  name="category"
                  value={projectForm.category}
                  onChange={handleProjectChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
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
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
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
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="/html.png, /tailwindcss.png, /reactjs.svg"
                />
                <span className={`mt-2 block text-xs ${classes.textMuted}`}>
                  Separate each local public-folder image path with a comma.
                </span>
              </label>

              <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                Link
                <input
                  name="link"
                  value={projectForm.link}
                  onChange={handleProjectChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="https://example.com"
                />
              </label>
            </div>

            {actionError && <p className="mt-4 text-sm text-red-400">{actionError}</p>}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeProjectModal}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${classes.buttonPrimary}`}
              >
                {saving ? 'Saving' : editingProject ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex min-h-dvh items-end bg-slate-950/70 px-4 py-6 backdrop-blur sm:items-center sm:justify-center">
          <div className={`w-full max-w-md rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>Delete</p>
            <h2 className={`mt-2 text-[1.45rem] font-semibold ${classes.heading}`}>Delete project?</h2>
            <p className={`mt-3 text-sm leading-6 ${classes.text}`}>
              This will remove "{deleteTarget.title}" from Supabase.
            </p>
            {actionError && <p className="mt-4 text-sm text-red-400">{actionError}</p>}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={saving}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProject}
                disabled={saving}
                className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Deleting' : 'Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
