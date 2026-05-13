import React, { useEffect, useMemo, useState } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageBackLink from '../components/PageBackLink'
import StoredReactIcon from '../components/StoredReactIcon'
import useAdminAuth from '../hooks/useAdminAuth'
import useSiteTheme from '../hooks/useSiteTheme'
import useSkillsData from '../hooks/useSkillsData'
import { searchReactIcons, getReactIconManifestEntry } from '../lib/reactIconsSearch'
import { normalizeStoredSkillIconValue } from '../lib/reactIconsLibrary'
import { supabase } from '../lib/supabaseClient'
import { getSkillVisual } from '../lib/projectContent'
import { getScrollRevealProps } from '../lib/scrollMotion'

const legacySkillImagePath = '/technology-icon.svg'

const emptySkillForm = {
  techname: '',
  experience: '',
  techlink: '',
  iconKey: '',
}

const isMissingIconKeyError = (error) => {
  const errorText = `${error?.message ?? ''} ${error?.details ?? ''} ${error?.hint ?? ''}`.toLowerCase()
  return errorText.includes('icon_key')
}

const toSkillForm = (skill) => ({
  techname: skill.techname ?? '',
  experience: skill.experience ?? '',
  techlink: skill.techlink ?? '',
  iconKey: normalizeStoredSkillIconValue(skill.iconKey ?? skill.icon_key ?? ''),
})

const buildSkillPayload = (form, currentSkill) => ({
  techname: form.techname.trim(),
  experience: form.experience.trim() || null,
  techlink: form.techlink.trim() || null,
  image: currentSkill?.image?.trim() || legacySkillImagePath,
  icon_key: normalizeStoredSkillIconValue(form.iconKey),
})

const Skills = () => {
  const { classes } = useSiteTheme()
  const shouldReduceMotion = useReducedMotion()
  const { skills, loading: skillsLoading, refreshSkills } = useSkillsData()
  const { isAdmin, loading: authLoading, signOut, userEmail } = useAdminAuth()
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [skillForm, setSkillForm] = useState(emptySkillForm)
  const [iconSearch, setIconSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)
  const focusRingClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70'
  const pillButtonClass = `inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-[13px] font-medium transition active:scale-[0.98] ${focusRingClass}`
  const primaryButtonClass = `${pillButtonClass} ${classes.buttonPrimary}`
  const ghostButtonClass = `${pillButtonClass} ${classes.buttonGhost}`
  const inputClass = `mt-2 w-full rounded-2xl px-4 py-3 text-base sm:text-sm ${classes.input} ${focusRingClass}`
  const sectionReveal = getScrollRevealProps(shouldReduceMotion)
  const cardReveal = getScrollRevealProps(shouldReduceMotion, {
    viewport: { amount: 0.12 },
  })
  const selectedManifestEntry = useMemo(() => getReactIconManifestEntry(skillForm.iconKey), [skillForm.iconKey])
  const iconSearchResults = useMemo(() => searchReactIcons(iconSearch, { limit: 72 }), [iconSearch])
  const previewSkill = useMemo(
    () => ({
      techname:
        skillForm.techname.trim() ||
        selectedManifestEntry?.label ||
        (skillForm.iconKey ? `Legacy Icon (${skillForm.iconKey})` : '') ||
        'Skill Preview',
      iconKey: skillForm.iconKey,
    }),
    [selectedManifestEntry, skillForm.iconKey, skillForm.techname],
  )

  const openCreateSkill = () => {
    setEditingSkill(null)
    setSkillForm(emptySkillForm)
    setIconSearch('')
    setActionError('')
    setIsSkillModalOpen(true)
  }

  const openEditSkill = (skill) => {
    setEditingSkill(skill)
    setSkillForm(toSkillForm(skill))
    setIconSearch('')
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
    setIconSearch('')
    setActionError('')
  }

  const handleSkillChange = (event) => {
    const { name, value } = event.target
    setSkillForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSkillIconSelect = (iconKey) => {
    setSkillForm((currentForm) => ({ ...currentForm, iconKey }))
  }

  useEffect(() => {
    if (!isSkillModalOpen && !deleteTarget) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || saving) {
        return
      }

      if (isSkillModalOpen) {
        closeSkillModal()
      }

      if (deleteTarget) {
        setDeleteTarget(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deleteTarget, isSkillModalOpen, saving])

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

    const payload = buildSkillPayload(skillForm, editingSkill)

    if (!payload.techname || !payload.icon_key) {
      setActionError('Skill name and icon are required.')
      toast.error('Skill name and icon are required.')
      return
    }

    setSaving(true)

    try {
      const { error } = editingSkill
        ? await supabase.from('skills').update(payload).eq('id', editingSkill.id)
        : await supabase.from('skills').insert([payload])

      if (error && isMissingIconKeyError(error)) {
        throw new Error(
          'Your Supabase skills table is missing the icon_key column. Add that column first to save react-icons-based skills.',
        )
      }

      if (error) {
        throw error
      }

      closeSkillModal(true)
      await refreshSkills()
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
      await refreshSkills()
      toast.success('Skill deleted successfully.')
    } catch (error) {
      console.error('Delete skill error', error)
      setActionError(error.message || 'Unable to delete skill.')
      toast.error(error.message || 'Unable to delete skill.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />

      <main className="mx-auto max-w-[980px]">
        <PageBackLink to="/#skills" label="Back to portfolio" />

        <Motion.section {...sectionReveal} className={`rounded-2xl p-4 sm:p-6 ${classes.shell}`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${classes.label}`}>Tech Stack</p>
              <h1 className={`mt-3 text-[1.45rem] font-semibold tracking-tight sm:text-[1.8rem] ${classes.heading}`}>
                Skills
              </h1>
              <p className={`mt-2 max-w-2xl text-[13.5px] leading-6 ${classes.textMuted}`}>
                Portfolio technologies, tools, and platforms. New admin-created skills render through `react-icons`,
                while legacy rows stay compatible.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
              <div
                className={`self-start rounded-full px-3 py-1.5 text-[12px] font-medium sm:self-auto ${classes.surfaceMuted} ${classes.heading}`}
              >
                {skills.length} skill{skills.length === 1 ? '' : 's'}
              </div>

              {!authLoading && isAdmin ? (
                <div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
                  <button type="button" onClick={openCreateSkill} className={`w-full sm:w-auto ${primaryButtonClass}`}>
                    Add Skill
                  </button>
                  <Link to="/projects" className={`w-full sm:w-auto ${ghostButtonClass}`}>
                    Manage Projects
                  </Link>
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

          <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => {
              const skillVisual = getSkillVisual(skill)

              return (
                <Motion.article
                  key={`${skill.id ?? skill.techname}-${index}`}
                  {...cardReveal}
                  transition={{ ...cardReveal.transition, delay: index * 0.02 }}
                  className={`flex h-full flex-col rounded-2xl p-4 sm:p-5 ${classes.surfaceMuted}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${
                        classes.surface
                      } ${classes.heading}`}
                    >
                      <StoredReactIcon
                        iconId={skillVisual.iconId}
                        fallbackIcon={skillVisual.Icon}
                        className={`h-5 w-5 ${skillVisual.iconClass}`}
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className={`text-[1rem] font-semibold tracking-tight ${classes.heading}`}>{skill.techname}</h2>
                      <p className={`mt-1 text-sm ${classes.textMuted}`}>
                        {skill.experience || 'Experience not specified'}
                      </p>
                    </div>
                  </div>

                  {skill.techlink ? (
                    <a
                      href={skill.techlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 ${ghostButtonClass}`}
                    >
                      Open Reference
                    </a>
                  ) : (
                    <p className={`mt-4 text-sm leading-6 ${classes.textMuted}`}>
                      No reference link added for this skill yet.
                    </p>
                  )}

                  {!authLoading && isAdmin ? (
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      <button type="button" onClick={() => openEditSkill(skill)} className={ghostButtonClass}>
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActionError('')
                          setDeleteTarget(skill)
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

            {!skills.length && !skillsLoading ? (
              <div className={`rounded-2xl p-6 text-center sm:col-span-2 sm:p-8 xl:col-span-3 ${classes.surfaceMuted}`}>
                <p className={`text-sm ${classes.textMuted}`}>No skills found yet.</p>
              </div>
            ) : null}
          </div>
        </Motion.section>
      </main>

      {isSkillModalOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-3 py-3 backdrop-blur sm:px-4 sm:py-6">
          <form
            onSubmit={handleSkillSubmit}
            aria-labelledby="skill-modal-title"
            aria-describedby="skill-modal-description"
            className="mx-auto flex min-h-full w-full items-end sm:items-center sm:justify-center"
          >
            <div
              role="dialog"
              aria-modal="true"
              className={`max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 ${classes.surface}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>
                    {editingSkill ? 'Edit Skill' : 'New Skill'}
                  </p>
                  <h2
                    id="skill-modal-title"
                    className={`mt-2 text-[1.3rem] font-semibold sm:text-[1.45rem] ${classes.heading}`}
                  >
                    {editingSkill ? editingSkill.techname : 'Add Skill'}
                  </h2>
                  <p id="skill-modal-description" className={`mt-2 text-sm leading-6 ${classes.textMuted}`}>
                    Choose a supported `react-icons` visual, then save the skill details. A legacy placeholder image
                    path is stored automatically for Supabase compatibility.
                  </p>
                </div>
                <button type="button" onClick={closeSkillModal} className={`w-full sm:w-auto ${ghostButtonClass}`}>
                  Close
                </button>
              </div>

              <div className={`mt-6 rounded-2xl p-4 sm:p-5 ${classes.surfaceMuted}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${classes.labelMuted}`}>Preview</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {(() => {
                    const skillVisual = getSkillVisual(previewSkill)

                    return (
                      <>
                        <span
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${classes.surface}`}
                        >
                          <StoredReactIcon
                            iconId={skillVisual.iconId}
                            fallbackIcon={skillVisual.Icon}
                            className={`h-6 w-6 ${skillVisual.iconClass}`}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className={`text-[1rem] font-semibold ${classes.heading}`}>{previewSkill.techname}</p>
                          <p className={`mt-1 text-sm ${classes.textMuted}`}>
                            {selectedManifestEntry
                              ? `${selectedManifestEntry.label} • ${selectedManifestEntry.packLabel}`
                              : skillForm.iconKey
                                ? `Legacy preset • ${skillForm.iconKey}`
                                : 'No icon selected yet'}
                          </p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                  Skill Name
                  <input
                    name="techname"
                    value={skillForm.techname}
                    onChange={handleSkillChange}
                    className={inputClass}
                    placeholder="React JS"
                    required
                  />
                </label>

                <label className={`block text-sm font-medium ${classes.text}`}>
                  Experience
                  <input
                    name="experience"
                    value={skillForm.experience}
                    onChange={handleSkillChange}
                    className={inputClass}
                    placeholder="2 years"
                  />
                </label>

                <div className={`sm:col-span-2 ${classes.text}`}>
                  <div className={`rounded-2xl p-4 sm:p-5 ${classes.surfaceMuted}`}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium">Icon Picker</p>
                        <p className={`mt-2 text-xs leading-5 ${classes.textMuted}`}>
                          Search installed `react-icons` packs directly. Example: `mysql workbench` will surface the
                          closest library icon match, such as MySQL.
                        </p>
                      </div>
                      <div
                        className={`inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${classes.badgeMuted}`}
                      >
                        Selected:
                        {' '}
                        {selectedManifestEntry ? selectedManifestEntry.id : skillForm.iconKey || 'None'}
                      </div>
                    </div>

                    <label className={`mt-4 block text-sm font-medium ${classes.text}`}>
                      Search Icons
                      <input
                        type="search"
                        value={iconSearch}
                        onChange={(event) => setIconSearch(event.target.value)}
                        className={inputClass}
                        placeholder="Search icon, e.g. mysql workbench"
                      />
                    </label>

                    {iconSearch.trim() ? (
                      <div className={`mt-3 rounded-2xl p-3 text-sm ${classes.surface}`}>
                        {!iconSearchResults.matches.length ? (
                          <p className={classes.textMuted}>
                            No installed `react-icons` match for "{iconSearch.trim()}". Try a broader technology or
                            brand term.
                          </p>
                        ) : iconSearchResults.hasExactMatch ? (
                          <p className={classes.textMuted}>
                            Exact installed icon match found. Choose the icon card you want to save.
                          </p>
                        ) : (
                          <p className={classes.textMuted}>
                            No exact installed icon match for "{iconSearch.trim()}". Closest library result:
                            {' '}
                            <span className={classes.heading}>
                              {iconSearchResults.bestMatch?.label || 'No nearby icon found'}
                            </span>
                          </p>
                        )}
                      </div>
                    ) : null}

                    <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {iconSearchResults.matches.map((choice) => {
                        const skillVisual = getSkillVisual({ techname: choice.label, iconKey: choice.id })
                        const isSelected = skillForm.iconKey === choice.id

                        return (
                          <button
                            key={choice.id}
                            type="button"
                            onClick={() => handleSkillIconSelect(choice.id)}
                            aria-pressed={isSelected}
                            className={`flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${focusRingClass} ${
                              isSelected ? classes.navActive : classes.buttonGhost
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${classes.surface}`}
                            >
                              <StoredReactIcon
                                iconId={choice.id}
                                fallbackIcon={skillVisual.Icon}
                                className={`h-4.5 w-4.5 ${skillVisual.iconClass}`}
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-medium">{choice.label}</span>
                              <span className={`mt-1 block truncate text-[11px] uppercase tracking-[0.12em] ${classes.textMuted}`}>
                                {choice.packLabel}
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <p className={`mt-3 text-xs leading-5 ${classes.textMuted}`}>
                      {iconSearch.trim()
                        ? `Showing ${iconSearchResults.matches.length} of ${iconSearchResults.total} library match${iconSearchResults.total === 1 ? '' : 'es'}.`
                        : `Showing ${iconSearchResults.matches.length} starter results from the installed react-icons packs. Search to narrow the full library.`}
                    </p>
                  </div>
                </div>

                <label className={`block text-sm font-medium sm:col-span-2 ${classes.text}`}>
                  Reference Link
                  <input
                    name="techlink"
                    value={skillForm.techlink}
                    onChange={handleSkillChange}
                    className={inputClass}
                    placeholder="https://react.dev"
                  />
                  <span className={`mt-2 block text-xs leading-5 ${classes.textMuted}`}>
                    Optional. Add a docs or official site link for this skill.
                  </span>
                </label>
              </div>

              {actionError ? <p className="mt-4 text-sm leading-6 text-red-400">{actionError}</p> : null}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeSkillModal} className={`w-full sm:w-auto ${ghostButtonClass}`}>
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full sm:w-auto ${primaryButtonClass} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {saving ? 'Saving' : editingSkill ? 'Save Changes' : 'Create Skill'}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-3 py-3 backdrop-blur sm:px-4 sm:py-6">
          <div className="mx-auto flex min-h-full w-full items-end sm:items-center sm:justify-center">
            <div
              role="dialog"
              aria-modal="true"
              className={`w-full max-w-md rounded-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6 ${classes.surface}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${classes.label}`}>Delete</p>
              <h2 className={`mt-2 text-[1.3rem] font-semibold sm:text-[1.45rem] ${classes.heading}`}>Delete skill?</h2>
              <p className={`mt-3 text-sm leading-6 ${classes.text}`}>
                This will remove "{deleteTarget.techname}" from Supabase.
              </p>
              {actionError ? <p className="mt-4 text-sm leading-6 text-red-400">{actionError}</p> : null}
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
                  onClick={handleDeleteSkill}
                  disabled={saving}
                  className={`inline-flex min-h-11 w-full items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${focusRingClass}`}
                >
                  {saving ? 'Deleting' : 'Delete Skill'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Skills
