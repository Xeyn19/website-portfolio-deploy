import React, { useCallback, useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import useAdminAuth from '../hooks/useAdminAuth'
import useSiteTheme from '../hooks/useSiteTheme'
import { supabase } from '../lib/supabaseClient'

const emptySkillForm = {
  techname: '',
  experience: '',
  techlink: '',
  image: '',
}

const toSkillForm = (skill) => ({
  techname: skill.techname ?? '',
  experience: skill.experience ?? '',
  techlink: skill.techlink ?? '',
  image: skill.image ?? '',
})

const buildSkillPayload = (form) => ({
  techname: form.techname.trim(),
  experience: form.experience.trim(),
  techlink: form.techlink.trim() || null,
  image: form.image.trim(),
})

const Skills = () => {
  const [loading, setLoading] = useState(false)
  const [techData, setTechData] = useState([])
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [skillForm, setSkillForm] = useState(emptySkillForm)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)
  const { classes } = useSiteTheme()
  const { isAdmin, signOut, userEmail } = useAdminAuth()

  const fetchSkills = useCallback(async ({ showSpinner = true } = {}) => {
    if (showSpinner) {
      setLoading(true)
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('id, source_id, techname, experience, techlink, image')
        .order('id', { ascending: true })

      if (error) {
        throw error
      }

      setTechData(data ?? [])
    } catch (error) {
      console.error('Fetch data error', error)
      setTechData([])
    } finally {
      if (showSpinner) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const openCreateSkill = () => {
    setEditingSkill(null)
    setSkillForm(emptySkillForm)
    setActionError('')
    setIsSkillModalOpen(true)
  }

  const openEditSkill = (skill) => {
    setEditingSkill(skill)
    setSkillForm(toSkillForm(skill))
    setActionError('')
    setIsSkillModalOpen(true)
  }

  const closeSkillModal = (force = false) => {
    if (saving && !force) {
      return
    }

    setIsSkillModalOpen(false)
    setEditingSkill(null)
    setSkillForm(emptySkillForm)
    setActionError('')
  }

  const handleSkillChange = (event) => {
    const { name, value } = event.target
    setSkillForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleAdminLogout = async () => {
    const { error } = await signOut()

    if (error) {
      toast.error(error.message || 'Logout failed.')
    } else {
      toast.success('Logged out successfully.')
    }
  }

  const handleSkillSubmit = async (event) => {
    event.preventDefault()
    setActionError('')

    const payload = buildSkillPayload(skillForm)

    if (!payload.techname || !payload.experience || !payload.image) {
      setActionError('Technology name, experience, and image path are required.')
      toast.error('Technology name, experience, and image path are required.')
      return
    }

    setSaving(true)

    try {
      const request = editingSkill
        ? supabase.from('skills').update(payload).eq('id', editingSkill.id)
        : supabase.from('skills').insert([payload])

      const { error } = await request

      if (error) {
        throw error
      }

      closeSkillModal(true)
      await fetchSkills({ showSpinner: false })
      toast.success(editingSkill ? 'Skill updated successfully.' : 'Skill created successfully.')
    } catch (error) {
      console.error('Save skill error', error)
      setActionError(error.message || 'Unable to save skill.')
      toast.error(error.message || 'Unable to save skill.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSkill = async () => {
    if (!deleteTarget) {
      return
    }

    setActionError('')
    setSaving(true)

    try {
      const { error } = await supabase.from('skills').delete().eq('id', deleteTarget.id)

      if (error) {
        throw error
      }

      setDeleteTarget(null)
      await fetchSkills({ showSpinner: false })
      toast.success('Skill deleted successfully.')
    } catch (error) {
      console.error('Delete skill error', error)
      setActionError(error.message || 'Unable to delete skill.')
      toast.error(error.message || 'Unable to delete skill.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-10">
      <div className={`pointer-events-none absolute inset-0 -z-10 ${classes.pageBackground}`} />

      <div className="mx-auto max-w-6xl space-y-7">
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`overflow-hidden rounded-[32px] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-8 ${classes.shell}`}
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>
                Technical Foundation
              </p>
              <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${classes.heading}`}>
                Skills
              </h1>
              <p className={`mt-4 max-w-3xl text-sm leading-7 ${classes.text}`}>
                I build responsive web applications with a front-end focus and growing back-end
                capability. My stack covers React and TypeScript development, component-based workflows, RESTful app structure, database fundamentals, and deployment-ready collaboration tools.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {isAdmin && (
                  <>
                    <button
                      type="button"
                      onClick={openCreateSkill}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonPrimary}`}
                    >
                      Add Skill
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
                Focus Areas
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Responsive UI', 'React Development', 'TypeScript', 'API Integration', 'Version Control', 'Database Basics'].map(
                  (item) => (
                    <span
                      key={item}
                      className={`rounded-full px-3 py-1 text-xs ${classes.darkChip}`}
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                The current stack emphasizes production-ready front-end work with React and TypeScript while extending into Node.js, Express.js, PHP, and MySQL for full-stack growth.
              </p>
            </div>
          </div>
        </Motion.section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {techData.map((data, index) => (
            <Motion.article
              key={`${data.id}-${data.techname}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -6 }}
              className={`group rounded-[28px] p-6 transition ${classes.surface}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${classes.surfaceMuted} ${classes.surfaceAccent}`}>
                  <img
                    src={data.image}
                    alt={data.techname}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes.badge}`}>
                  {data.experience}
                </span>
              </div>

              <div className="mt-5">
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.labelMuted}`}>
                  Technology
                </p>
                <h2 className={`mt-2 text-xl font-semibold ${classes.heading}`}>{data.techname}</h2>
              </div>

              <p className={`mt-4 text-sm leading-7 ${classes.textMuted}`}>
                Practical experience building interfaces, features, and development workflows with{' '}
                {data.techname}.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={data.techlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition ${classes.buttonGhost}`}
                >
                  Learn more
                </a>

                {isAdmin && (
                  <>
                    <button
                      type="button"
                      onClick={() => openEditSkill(data)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${classes.buttonGhost}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActionError('')
                        setDeleteTarget(data)
                      }}
                      className="rounded-full border border-red-300/60 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </Motion.article>
          ))}
        </section>
      </div>

      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex min-h-dvh items-end bg-slate-950/70 px-4 py-6 backdrop-blur sm:items-center sm:justify-center">
          <form
            onSubmit={handleSkillSubmit}
            className={`max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
                  {editingSkill ? 'Edit Skill' : 'New Skill'}
                </p>
                <h2 className={`mt-2 text-2xl font-semibold ${classes.heading}`}>
                  {editingSkill ? editingSkill.techname : 'Add Skill'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeSkillModal}
                className={`self-start rounded-full px-4 py-2 text-sm transition ${classes.buttonGhost}`}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className={`block text-sm font-medium ${classes.text}`}>
                Experience
                <input
                  name="experience"
                  value={skillForm.experience}
                  onChange={handleSkillChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="1 year"
                  required
                />
              </label>

              <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                Technology Name
                <input
                  name="techname"
                  value={skillForm.techname}
                  onChange={handleSkillChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="React JS"
                  required
                />
              </label>

              <label className={`block text-sm font-medium ${classes.text}`}>
                Icon Path
                <input
                  name="image"
                  value={skillForm.image}
                  onChange={handleSkillChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="/reactjs.svg"
                  required
                />
              </label>

              <label className={`block text-sm font-medium ${classes.text}`}>
                Learn More Link
                <input
                  name="techlink"
                  value={skillForm.techlink}
                  onChange={handleSkillChange}
                  className={`mt-2 w-full rounded-2xl px-4 py-3 ${classes.input}`}
                  placeholder="https://react.dev/"
                />
              </label>
            </div>

            {actionError && <p className="mt-4 text-sm text-red-400">{actionError}</p>}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeSkillModal}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${classes.buttonGhost}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${classes.buttonPrimary}`}
              >
                {saving ? 'Saving' : editingSkill ? 'Save Changes' : 'Create Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex min-h-dvh items-end bg-slate-950/70 px-4 py-6 backdrop-blur sm:items-center sm:justify-center">
          <div className={`w-full max-w-lg rounded-t-[28px] p-6 sm:rounded-[28px] ${classes.surface}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>Delete</p>
            <h2 className={`mt-2 text-2xl font-semibold ${classes.heading}`}>Delete skill?</h2>
            <p className={`mt-3 text-sm leading-6 ${classes.text}`}>
              This will remove "{deleteTarget.techname}" from Supabase.
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
                onClick={handleDeleteSkill}
                disabled={saving}
                className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Deleting' : 'Delete Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Skills
