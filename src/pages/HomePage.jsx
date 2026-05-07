import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LuAward, LuBookOpen, LuCode } from 'react-icons/lu'
import ElectricBorder from '../components/ElectricBorder'
import Spinner from '../components/Spinner'
import { siteContent } from '../data/siteContent'
import usePageLoader from '../hooks/usePageLoader'
import usePortfolioHomeData from '../hooks/usePortfolioHomeData'
import useSiteTheme from '../hooks/useSiteTheme'
import {
  getProjectExternalLinks,
  getTechnologyVisual,
  summarizeProjectDescription,
} from '../lib/projectContent'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
}

const publicCategoryFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'front-end', label: 'Front-End' },
]

const normalizeCategory = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

const buildMarqueeItems = (items) => {
  if (items.length === 0) {
    return []
  }

  const normalizedItems = [...items]

  while (normalizedItems.length < 10) {
    normalizedItems.push(...items)
  }

  return normalizedItems
}

const getCertificateVisual = (certificate = {}) => {
  const providerKey = (certificate.provider ?? '').toLowerCase()
  const titleKey = (certificate.title ?? '').toLowerCase()

  if (providerKey.includes('udemy')) {
    return { Icon: LuBookOpen, iconClass: 'text-violet-300' }
  }

  if (titleKey.includes('javascript') || titleKey.includes('development')) {
    return { Icon: LuCode, iconClass: 'text-amber-300' }
  }

  return { Icon: LuAward, iconClass: 'text-emerald-300' }
}

const HomePage = () => {
  const loading = usePageLoader()
  const { classes, isDark } = useSiteTheme()
  const { hero, about, experience, education, certificates, contact, footerQuote } = siteContent
  const { projects, skills } = usePortfolioHomeData()
  const [selectedProjectCategory, setSelectedProjectCategory] = useState('all')
  const marqueeSkills = buildMarqueeItems(skills)
  const firstRowSkills = marqueeSkills.filter((_, index) => index % 2 === 0)
  const secondRowSkills = marqueeSkills.filter((_, index) => index % 2 === 1)
  const visibleProjects = projects.filter((project) => {
    if (selectedProjectCategory === 'all') {
      return true
    }

    return normalizeCategory(project.category) === selectedProjectCategory
  })
  const heroMeta = [
    {
      label: 'Education',
      value: 'Information Systems',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      ),
    },
    {
      label: 'Location',
      value: 'Based in Philippines',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: 'edgarrodilorosa@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'Projects',
      value: 'Production-grade web apps',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </svg>
      ),
    },
  ]

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-80 bg-[radial-gradient(circle_at_left,rgba(180,83,9,0.24),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-80 bg-[radial-gradient(circle_at_right,rgba(14,116,144,0.18),transparent_65%)]" />

      <main className="mx-auto max-w-[980px]">
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <ElectricBorder
            accent="amber"
            className="rounded-[34px]"
            contentClassName={`overflow-hidden rounded-[34px] ${classes.shell}`}
          >
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <img
                  src="/edgar2.jpg"
                  alt="Edgar Orosa"
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15 shadow-[0_12px_30px_rgba(2,6,23,0.28)] sm:h-24 sm:w-24"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h1 className={`font-mono text-[2.05rem] font-bold tracking-tight sm:text-[2.85rem] ${classes.heading}`}>
                        {hero.name}
                      </h1>
                      <p className={`mt-2 text-[0.98rem] font-semibold sm:text-[1.08rem] ${classes.heading}`}>{hero.title}</p>
                    </div>

                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[13px] font-medium text-emerald-400">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      Open to Work
                    </span>
                  </div>

                  <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {heroMeta.map((item) => (
                      <div key={item.label} className={`flex items-center gap-3 text-[14px] ${classes.textMuted}`}>
                        <span className="shrink-0">{item.icon}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </Motion.section>

        <div className="mt-6 space-y-6">
          <Motion.section
            id="about"
            className="scroll-mt-32"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="cyan"
              className="rounded-[34px]"
              contentClassName={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-[1.75rem] font-semibold tracking-tight sm:text-[1.95rem] ${classes.heading}`}>
                    {about.title}
                  </h2>
                </div>
                <Link
                  to="/about"
                  className={`inline-flex self-start rounded-full px-5 py-2.5 text-[13px] font-medium transition ${classes.buttonGhost}`}
                >
                  Read more
                </Link>
              </div>
              <p className={`mt-5 max-w-4xl text-[15px] leading-7 sm:text-[15.5px] ${classes.textMuted}`}>
                {about.body}
              </p>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="experience"
            className="scroll-mt-32"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="amber"
              className="rounded-[34px]"
              contentClassName={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-[1.75rem] font-semibold tracking-tight sm:text-[1.95rem] ${classes.heading}`}>
                    Experience
                  </h2>
                </div>
                <Link
                  to="/resume"
                  className={`inline-flex self-start rounded-full px-5 py-2.5 text-[13px] font-medium transition ${classes.buttonGhost}`}
                >
                  My journey
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {experience.map((item) => (
                  <ElectricBorder
                    key={`${item.role}-${item.dateRange}`}
                    as="article"
                    accent="amber"
                    variant="soft"
                    className="rounded-[28px]"
                    contentClassName={`rounded-[28px] p-5 shadow-[0_14px_34px_rgba(2,6,23,0.18)] ${classes.surfaceMuted}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className={`text-[1.18rem] font-semibold tracking-tight sm:text-[1.35rem] ${classes.heading}`}>{item.role}</h3>
                        <p className={`mt-1 text-[14px] ${classes.textMuted}`}>{item.company}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[13px] sm:text-sm">
                        <span className={classes.textMuted}>{item.dateRange}</span>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${classes.badgeMuted}`}>
                          {item.durationLabel}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-3">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400" />
                          <span className={`max-w-3xl text-[14.5px] leading-7 ${classes.text}`}>
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.stackTags.map((tag) => {
                        const technology = getTechnologyVisual(tag)
                        const TechIcon = technology.Icon

                        return (
                          <span
                            key={`${item.role}-${technology.label}`}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${classes.badgeMuted}`}
                          >
                            <TechIcon className={`h-3.5 w-3.5 ${technology.iconClass}`} />
                            <span>{technology.label}</span>
                          </span>
                        )
                      })}
                    </div>
                  </ElectricBorder>
                ))}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="skills"
            className="scroll-mt-32"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="cyan"
              className="rounded-[34px]"
              contentClassName={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
            >
              <h2 className={`text-[1.75rem] font-semibold tracking-tight sm:text-[1.95rem] ${classes.heading}`}>
                Tech-Stack
              </h2>

              <div className="mt-7 space-y-4 overflow-hidden">
                {[firstRowSkills, secondRowSkills].map((rowItems, rowIndex) => (
                  <div key={`tech-row-${rowIndex}`} className="overflow-hidden">
                    <div className={`marquee-track ${rowIndex === 1 ? 'marquee-track-reverse' : ''}`}>
                      {[...rowItems, ...rowItems].map((skill, index) => (
                        (() => {
                          const techVisual = getTechnologyVisual(skill.techname)
                          const TechIcon = techVisual.Icon

                        return (
                          <ElectricBorder
                            key={`${skill.techname}-${rowIndex}-${index}`}
                            as={Link}
                            to="/skills"
                            accent="cyan"
                            variant="soft"
                            className="mx-2 rounded-[22px]"
                            contentClassName={`group inline-flex min-w-[172px] items-center gap-3 rounded-[22px] px-4 py-3 transition hover:-translate-y-0.5 ${classes.surfaceMuted}`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${
                                isDark ? 'bg-slate-950/80 ring-white/10' : 'bg-white ring-slate-200/90'
                              }`}
                            >
                              <TechIcon className={`h-4 w-4 transition group-hover:scale-105 ${techVisual.iconClass}`} />
                            </span>
                            <span className={`text-[14px] font-medium ${classes.heading}`}>{skill.techname}</span>
                          </ElectricBorder>
                        )
                      })()
                    ))}
                    </div>
                  </div>
                ))}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="projects"
            className="scroll-mt-32"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="amber"
              className="rounded-[34px]"
              contentClassName={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-[1.75rem] font-semibold tracking-tight sm:text-[1.95rem] ${classes.heading}`}>
                    Projects
                  </h2>
                  <p className={`mt-3 max-w-2xl text-[14px] leading-7 ${classes.textMuted}`}>
                    The full project list stays on the landing page. Open any card to view the separate case-study page with images and full implementation details.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {publicCategoryFilters.map((filter) => {
                  const isActive = selectedProjectCategory === filter.key

                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setSelectedProjectCategory(filter.key)}
                      className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                        isActive ? classes.navActive : classes.buttonGhost
                      }`}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {visibleProjects.map((project) => {
                  const externalLinks = getProjectExternalLinks(project)
                  const technologies = (project.technologies ?? []).map((technology) =>
                    getTechnologyVisual(technology),
                  )

                  return (
                    <ElectricBorder
                      key={`${project.id}-${project.title}`}
                      as="article"
                      accent="amber"
                      variant="soft"
                      className="rounded-[28px]"
                      contentClassName={`flex h-full flex-col rounded-[28px] p-5 ${classes.surfaceMuted}`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className={`text-[1.3rem] font-semibold tracking-tight sm:text-[1.55rem] ${classes.heading}`}>
                            {project.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Link
                            to={`/projects/${project.slug}`}
                            className={`inline-flex rounded-full px-4 py-2 text-[13px] font-medium transition ${classes.buttonGhost}`}
                          >
                            View
                          </Link>
                          {externalLinks.liveLink ? (
                            <a
                              href={externalLinks.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex rounded-full px-4 py-2 text-[13px] font-medium transition ${classes.buttonGhost}`}
                            >
                              Live
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <p className={`mt-4 flex-1 text-[14.5px] leading-7 ${classes.text}`}>
                        {summarizeProjectDescription(project.description, 140)}
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
                    </ElectricBorder>
                  )
                })}

                {!visibleProjects.length ? (
                  <ElectricBorder
                    accent="amber"
                    variant="soft"
                    className="rounded-[28px] lg:col-span-2"
                    contentClassName={`rounded-[28px] p-8 text-center ${classes.surfaceMuted}`}
                  >
                    <p className={`text-sm ${classes.textMuted}`}>No projects found for this category.</p>
                  </ElectricBorder>
                ) : null}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="certificates"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="cyan"
              className="rounded-[34px]"
              contentClassName={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
            >
              <h2 className={`text-[1.75rem] font-semibold tracking-tight sm:text-[1.95rem] ${classes.heading}`}>
                Certificates
              </h2>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {certificates.map((item) => (
                  (() => {
                    const certificateVisual = getCertificateVisual(item)
                    const CertificateIcon = certificateVisual.Icon

                    return (
                      <ElectricBorder
                        key={`${item.title}-${item.provider}`}
                        as="article"
                        accent="cyan"
                        variant="soft"
                        className="rounded-[26px]"
                        contentClassName={`rounded-[26px] p-5 sm:p-6 ${classes.surfaceMuted}`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${
                              isDark ? 'bg-slate-950/80 ring-white/10' : 'bg-white ring-slate-200/90'
                            }`}
                          >
                            <CertificateIcon className={`h-4.5 w-4.5 ${certificateVisual.iconClass}`} />
                          </span>

                          <div className="min-w-0">
                            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
                              {item.provider}
                            </p>
                            <h3 className={`mt-3 text-[1rem] font-semibold leading-7 sm:text-[1.08rem] ${classes.heading}`}>
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </ElectricBorder>
                    )
                  })()
                ))}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="education"
            className="scroll-mt-32"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="amber"
              className="rounded-[34px]"
              contentClassName={`rounded-[34px] p-6 sm:p-8 ${classes.shell}`}
            >
              <h2 className={`text-[1.75rem] font-semibold tracking-tight sm:text-[1.95rem] ${classes.heading}`}>
                Education
              </h2>

              <div className="mt-6 space-y-4">
                {education.map((item) => (
                  <ElectricBorder
                    key={`${item.title}-${item.period}`}
                    as="article"
                    accent="amber"
                    variant="soft"
                    className="rounded-[26px]"
                    contentClassName={`rounded-[26px] px-5 py-5 sm:px-6 ${classes.surfaceMuted}`}
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${classes.surface}`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className={`h-6 w-6 ${classes.textMuted}`}
                        >
                          <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
                          <path d="M22 10v6" />
                          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <h3 className={`text-[1.08rem] font-semibold tracking-tight sm:text-[1.18rem] ${classes.heading}`}>
                          {item.title}
                        </h3>
                        <p className={`mt-1 text-[14px] sm:text-[14.5px] ${classes.text}`}>
                          {item.school}
                        </p>
                        <p className={`mt-1 text-sm ${classes.textMuted}`}>{item.location}</p>
                      </div>
                    </div>
                  </ElectricBorder>
                ))}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="contact"
            className="scroll-mt-32"
            {...fadeInUp}
          >
            <ElectricBorder
              accent="cyan"
              className="rounded-[34px]"
              contentClassName={`overflow-hidden rounded-[34px] ${classes.shell}`}
            >
              <div className="grid gap-6 px-5 py-6 sm:px-7 sm:py-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
                <div>
                  <h2 className={`text-[1.7rem] font-semibold tracking-tight sm:text-[1.85rem] ${classes.heading}`}>
                    {contact.title}
                  </h2>
                  <p className={`mt-3 text-[14px] leading-7 ${classes.textMuted}`}>{contact.body}</p>
                </div>

                <div className="grid gap-3">
                  {contact.compactLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center gap-3 text-[14px] transition hover:opacity-80 ${classes.textMuted}`}
                    >
                      <span className="shrink-0">
                        {item.label === 'Email' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        ) : item.label === 'GitHub' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                            <path d="M15 22v-4a4 4 0 0 0-1.2-3 3.4 3.4 0 0 0 3-1.8c1-1.6.8-3.4.3-5-.2-.5-.2-1.1 0-1.7 0 0-.8-.2-2.6 1a9 9 0 0 0-5 0c-1.8-1.2-2.6-1-2.6-1 .2.6.2 1.2 0 1.7-.5 1.6-.7 3.4.3 5a3.4 3.4 0 0 0 3 1.8A4 4 0 0 0 9 18v4" />
                            <path d="M9 18c-4.5 2-5-2-7-2" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        )}
                      </span>
                      <span>{item.value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            className="pb-2 pt-2 text-center"
            {...fadeInUp}
          >
            <p className={`text-[0.95rem] italic ${classes.textMuted}`}>
              &ldquo;{footerQuote.text}&rdquo;
            </p>
            <p className={`mt-2 text-[14px] ${classes.textMuted}`}>- {footerQuote.attribution}</p>
            <p className={`mt-6 text-sm ${classes.textSubtle}`}>
              All rights reserved Edgar Orosa {new Date().getFullYear()}
            </p>
          </Motion.section>
        </div>
      </main>
    </div>
  )
}

export default HomePage
