import React, { useCallback, useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import useAdminAuth from '../hooks/useAdminAuth'
import useSiteTheme from '../hooks/useSiteTheme'
import { supabase } from '../lib/supabaseClient'

const categoryOptions = [
  { key: 'all', label: 'All Projects' },
  { key: 'Front-End', label: 'Front-End' },
  { key: 'Full Stack', label: 'Full Stack' },
]

const projectCategoryChoices = ['Front-End', 'Full-Stack']

const emptyProjectForm = {
  title: '',
  description: '',
  technologies: '',
  image: '',
  date: '',
  category: 'Front-End',
  link: '',
}

const normalizeCategory = (category = '') =>
  category
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

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

const Projects = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [imageModes, setImageModes] = useState({})
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projectForm, setProjectForm] = useState(emptyProjectForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)
  const { classes } = useSiteTheme()
  const { isAdmin, signOut, userEmail } = useAdminAuth()

  const fetchProjects = useCallback(async ({ showSpinner = true } = {}) => {
    if (showSpinner) {
      setLoading(true)
    }

    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('id, source_id, title, description, technologies, image, date, category, link')
        .order('date', { ascending: false })

      if (error) {
        throw error
      }

      setData(projects ?? [])
    } catch (error) {
      console.error('Fetch data error', error)
      setData([])
    } finally {
      if (showSpinner) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
  }

  const handleYearFilter = (year) => {
    const nextYear = year === 'all' ? 'all' : Number(year)
    setSelectedYear(nextYear)
  }

  const handleImageLoad = (imageSrc, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    const nextMode = naturalHeight > naturalWidth ? 'portrait' : 'landscape'

    setImageModes((prev) => (prev[imageSrc] === nextMode ? prev : { ...prev, [imageSrc]: nextMode }))
  }

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
      await fetchProjects({ showSpinner: false })
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
      await fetchProjects({ showSpinner: false })
      toast.success('Project deleted successfully.')
    } catch (error) {
      console.error('Delete project error', error)
      setActionError(error.message || 'Unable to delete project.')
      toast.error(error.message || 'Unable to delete project.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Spinner />
  }

  const availableYears = Array.from(
    new Set(data.map((project) => project.date).filter((date) => Number.isFinite(date)))
  ).sort((a, b) => b - a)

  const sortedData = [...data].sort((a, b) => (b.date || 0) - (a.date || 0))

  const filteredData = sortedData.filter((project) => {
    const normalized = normalizeCategory(project.category)
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'Front-End' && normalized === 'front-end') ||
      (selectedCategory === 'Full Stack' && normalized === 'full-stack')
    const matchesYear = selectedYear === 'all' || project.date === selectedYear

    return matchesCategory && matchesYear
  })

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className={`pointer-events-none absolute inset-0 -z-10 ${classes.pageBackground}`} />

      <div className="mx-auto max-w-6xl space-y-7">
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`overflow-hidden rounded-[32px] p-6 sm:p-8 ${classes.shell}`}
        >
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Selected Work
              </p>
              <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${classes.heading}`}>
                Projects
              </h1>
              <p className={`mt-4 max-w-3xl text-sm leading-7 ${classes.text}`}>
                A collection of front-end and full-stack projects focused on responsive interfaces,
                user-centered interaction, and practical functionality. Each build reflects hands-on
                experience with modern web tools, data handling, and real deployment workflows.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {isAdmin && (
                  <>
                    <button
                      type="button"
                      onClick={openCreateProject}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonPrimary}`}
                    >
                      Add Project
                    </button>
                    <button
                      type="button"
                      onClick={handleAdminLogout}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
                    >
                      Logout
                    </button>
                    <span className={`text-xs ${classes.textMuted}`}>Admin: {userEmail}</span>
                  </>
                )}
              </div>
            </div>

            <div className={`rounded-[28px] p-6 ${classes.panelDark}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/90">
                Filter
              </p>
              <div className="mt-4 space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                    Category
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {categoryOptions.map((category) => {
                      const isActive = selectedCategory === category.key

                      return (
                        <button
                          key={category.key}
                          type="button"
                          onClick={() => handleCategoryFilter(category.key)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? 'bg-amber-400 text-slate-900 shadow-[0_10px_25px_rgba(251,191,36,0.35)]'
                              : classes.darkChip
                          }`}
                        >
                          {category.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                    Year
                  </p>
                  <div className="group relative mt-3">
                    <select
                      value={selectedYear === 'all' ? 'all' : String(selectedYear)}
                      onChange={(event) => handleYearFilter(event.target.value)}
                      className={`w-full appearance-none rounded-2xl px-4 py-2.5 pr-10 text-sm font-medium shadow-[0_10px_24px_rgba(2,6,23,0.18)] transition hover:border-amber-300 hover:text-amber-300 focus:border-amber-300 focus:text-amber-300 focus:ring-2 focus:ring-amber-300/40 ${classes.input}`}
                    >
                      <option value="all">All Years</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span
                      className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${classes.textMuted} group-hover:text-amber-300 group-focus-within:text-amber-300`}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Showing {filteredData.length} project{filteredData.length === 1 ? '' : 's'} in the{' '}
                {selectedCategory === 'all' ? 'full portfolio' : selectedCategory.toLowerCase()} category
                {selectedYear === 'all' ? '.' : ` for ${selectedYear}.`}
              </p>
            </div>
          </div>
        </Motion.section>

        {filteredData.length > 0 ? (
          <div className="grid gap-6">
            {filteredData.map((project, index) => (
              ((mode) => (
              <Motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.15 }}
                className={`overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.08)] ${classes.surface}`}
              >
                <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes.badge}`}>
                        {project.category}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes.badgeMuted}`}>
                        {project.date}
                      </span>
                    </div>

                    <h2 className={`mt-4 text-2xl font-semibold leading-tight ${classes.heading}`}>
                      {project.title}
                    </h2>
                    <p className={`mt-4 text-sm leading-7 ${classes.text}`}>
                      {project.description}
                    </p>

                    <div className="mt-6">
                      <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.labelMuted}`}>
                        Tech Stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {(project.technologies ?? []).slice(0, 10).map((techImg, techIndex) => (
                          <div
                            key={`${project.id}-${techIndex}`}
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${classes.surfaceMuted}`}
                          >
                            <img
                              src={techImg}
                              alt={`${project.title} technology ${techIndex + 1}`}
                              className="h-7 w-7 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.link ? (
                        <button
                          type="button"
                          onClick={() => window.open(project.link, '_blank')}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonPrimary}`}
                        >
                          Live Preview
                        </button>
                      ) : (
                        <span className={`rounded-full px-5 py-2.5 text-sm font-medium ${classes.buttonGhost}`}>
                          Preview unavailable
                        </span>
                      )}

                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            onClick={() => openEditProject(project)}
                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActionError('')
                              setDeleteTarget(project)
                            }}
                            className="rounded-full border border-red-300/60 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`p-6 sm:p-8 ${classes.surfaceAccent}`}>
                    <div
                      className={`flex h-full min-h-[320px] w-full items-center justify-center rounded-[28px] shadow-[0_18px_45px_rgba(148,163,184,0.16)] ${classes.imageFrame} ${
                        mode === 'portrait' ? 'p-5 sm:p-6' : 'p-3'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        onLoad={(event) => handleImageLoad(project.image, event)}
                        className={`h-full w-full rounded-[20px] ${
                          mode === 'portrait' ? 'object-contain object-center' : 'object-cover object-center'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </Motion.article>
              ))(imageModes[project.image] || 'landscape')
            ))}
          </div>
        ) : (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-[28px] p-8 text-center ${classes.surface}`}
          >
            <p className={`text-sm ${classes.textMuted}`}>No projects found for the selected category.</p>
          </Motion.div>
        )}
      </div>

      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex min-h-dvh items-end bg-slate-950/70 px-4 py-6 backdrop-blur sm:items-center sm:justify-center">
          <form
            onSubmit={handleProjectSubmit}
            className={`max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
                  {editingProject ? 'Edit Project' : 'New Project'}
                </p>
                <h2 className={`mt-2 text-2xl font-semibold ${classes.heading}`}>
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
          <div className={`w-full max-w-lg rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>Delete</p>
            <h2 className={`mt-2 text-2xl font-semibold ${classes.heading}`}>Delete project?</h2>
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
