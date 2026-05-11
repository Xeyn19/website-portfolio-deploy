import React, { Suspense, lazy, startTransition, useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
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
import { getScrollRevealProps } from '../lib/scrollMotion'

const GitHubContributionCalendar = lazy(() => import('../components/GitHubContributionCalendar'))
const preferredTechStackOrder = [
  'html 5',
  'css',
  'vanilla js',
  'tailwind css',
  'react js',
  'typescript',
  'front-end development',
  'daisy ui',
  'github',
  'git',
  'material ui',
  'next js',
]

const publicCategoryFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'front-end', label: 'Front-End' },
]

const currentCalendarYear = new Date().getFullYear()
const githubCalendarStartYear = 2023
const githubCalendarYears = Array.from(
  { length: currentCalendarYear - githubCalendarStartYear + 1 },
  (_, index) => currentCalendarYear - index,
)
const sectionRadius = 'rounded-2xl'
const cardRadius = 'rounded-2xl'
const controlRadius = 'rounded-2xl'

const githubCalendarTheme = {
  light: ['#e2e8f0', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9'],
  dark: ['#0f172a', '#082f49', '#0c4a6e', '#0369a1', '#38bdf8'],
}
const focusRingClass = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70'

const normalizeCategory = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')

const normalizeTechName = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

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
    return { Icon: LuCode, iconClass: 'text-sky-300' }
  }

  return { Icon: LuAward, iconClass: 'text-emerald-300' }
}

const HomePage = () => {
  const loading = usePageLoader()
  const { classes, isDark } = useSiteTheme()
  const { hero, about, experience, education, certificates, testimonials, contact, footerQuote } = siteContent
  const { projects, skills } = usePortfolioHomeData()
  const shouldReduceMotion = useReducedMotion()
  const [selectedProjectCategory, setSelectedProjectCategory] = useState('all')
  const [selectedGithubYear, setSelectedGithubYear] = useState(currentCalendarYear)
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0)
  const [activeHeroTitleIndex, setActiveHeroTitleIndex] = useState(0)
  const orderedTechStack = [
    ...preferredTechStackOrder
      .map((techName) =>
        skills.find((skill) => normalizeTechName(skill.techname) === techName),
      )
      .filter(Boolean),
    ...skills.filter(
      (skill) => !preferredTechStackOrder.includes(normalizeTechName(skill.techname)),
    ),
  ]
  const marqueeSkills = buildMarqueeItems(orderedTechStack)
  const firstRowSkills = marqueeSkills.filter((_, index) => index % 2 === 0)
  const secondRowSkills = marqueeSkills.filter((_, index) => index % 2 === 1)
  const heroRotatingTitles =
    Array.isArray(hero.rotatingTitles) && hero.rotatingTitles.length > 0
      ? hero.rotatingTitles
      : [hero.title]
  const visibleProjects = projects.filter((project) => {
    if (selectedProjectCategory === 'all') {
      return true
    }

    return normalizeCategory(project.category) === selectedProjectCategory
  })
  const githubProfileLink =
    hero.socialLinks.find((item) => item.label === 'GitHub')?.href ?? 'https://github.com/Xeyn19'
  const resumePdfHref = '/Resume%20-%20updated_1.pdf'
  const activeHeroTitle = heroRotatingTitles[activeHeroTitleIndex] ?? hero.title
  const projectCategoryCounts = {
    all: projects.length,
    'full-stack': projects.filter((project) => normalizeCategory(project.category) === 'full-stack').length,
    'front-end': projects.filter((project) => normalizeCategory(project.category) === 'front-end').length,
  }
  const selectedProjectFilter =
    publicCategoryFilters.find((filter) => filter.key === selectedProjectCategory) ?? publicCategoryFilters[0]
  const activeTestimonial = testimonials[selectedTestimonialIndex] ?? testimonials[0] ?? null
  const totalTestimonials = testimonials.length
  const sectionReveal = getScrollRevealProps(shouldReduceMotion)
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

  useEffect(() => {
    if (shouldReduceMotion || heroRotatingTitles.length <= 1) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroTitleIndex((currentIndex) => (currentIndex + 1) % heroRotatingTitles.length)
    }, 2200)

    return () => window.clearInterval(intervalId)
  }, [heroRotatingTitles, shouldReduceMotion])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:pb-20">
      <div className={`pointer-events-none absolute inset-0 -z-20 ${classes.pageBackground}`} />
      <div
        className={`pointer-events-none absolute inset-0 -z-10 ${
          isDark ? 'home-stage home-stage--dark' : 'home-stage home-stage--light'
        }`}
      />

      <main className="mx-auto max-w-[980px]">
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <ElectricBorder
            accent="amber"
            className={sectionRadius}
            contentClassName={`overflow-hidden ${sectionRadius} ${classes.shell}`}
          >
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src="/edgar.jpg"
                  alt="Edgar Orosa"
                  className="h-16 w-16 rounded-full object-cover ring-1 ring-white/15 shadow-[0_8px_18px_rgba(2,6,23,0.18)] sm:h-18 sm:w-18"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <Motion.h1
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className={`hero-name-shell ${isDark ? 'hero-name-shell--dark' : 'hero-name-shell--light'} text-[1.72rem] font-bold tracking-tight sm:text-[2.15rem] lg:text-[2.35rem]`}
                      >
                        <span aria-hidden="true" className="hero-name-layer hero-name-layer--cyan">
                          {hero.name}
                        </span>
                        <span aria-hidden="true" className="hero-name-layer hero-name-layer--rose">
                          {hero.name}
                        </span>
                        <span className="hero-name-core">{hero.name}</span>
                      </Motion.h1>
                      <div className="relative mt-1 min-h-[3rem] sm:min-h-[1.75rem]">
                        <AnimatePresence mode="wait" initial={false}>
                          <Motion.p
                            key={activeHeroTitle}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className={`absolute inset-x-0 top-0 max-w-[17rem] pr-3 text-[0.95rem] font-medium leading-6 sm:max-w-none sm:pr-0 sm:text-[1rem] ${classes.text}`}
                          >
                            {activeHeroTitle}
                          </Motion.p>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={resumePdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-10 items-center justify-center px-4 py-2 text-[12px] font-medium transition ${controlRadius} ${classes.buttonGhost}`}
                      >
                        Resume
                      </a>
                      <span className={`inline-flex w-fit items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[12px] font-medium text-emerald-400 ${controlRadius}`}>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </span>
                        Open to Work
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-x-5 gap-y-2.5 sm:mt-5 sm:grid-cols-2">
                    {heroMeta.map((item) => (
                      <div key={item.label} className={`flex items-center gap-2.5 text-[12.5px] leading-5 sm:text-[13px] ${classes.textMuted}`}>
                        <span className="shrink-0 opacity-90">{item.icon}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </ElectricBorder>
        </Motion.section>

        <Motion.section
          className="mt-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
        >
          <ElectricBorder
            accent="cyan"
            className={sectionRadius}
            contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className={`text-[1.05rem] font-semibold ${classes.heading}`}>
                  GitHub Contributions
                </h2>
                <p className={`mt-1 text-[13px] ${classes.textMuted}`}>
                  Public activity from {githubCalendarStartYear} to now.
                </p>
              </div>
              <a
                href={githubProfileLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[12px] font-medium transition ${classes.textMuted}`}
              >
                View profile
              </a>
            </div>

            <div className={`mt-5 ${cardRadius} ${classes.surfaceMuted} p-4 sm:p-5`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${classes.labelMuted}`}>
                    Choose year
                  </p>
                  <p className={`mt-1 text-[13px] ${classes.textMuted}`}>
                    Showing contributions for {selectedGithubYear}.
                  </p>
                </div>

                <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:justify-end md:px-0">
                  {githubCalendarYears.map((year) => {
                    const isActive = selectedGithubYear === year

                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setSelectedGithubYear(year)}
                        aria-pressed={isActive}
                        className={`min-h-10 min-w-[72px] shrink-0 whitespace-nowrap px-4 py-2 text-[12px] font-medium transition active:scale-[0.98] ${controlRadius} ${focusRingClass} ${
                          isActive ? classes.navActive : classes.buttonGhost
                        }`}
                      >
                        {year}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className={`mt-4 ${cardRadius} border border-white/8 bg-slate-950/10 p-3 sm:p-4`}>
                <div className="overflow-x-auto pb-2">
                  <Suspense
                    fallback={
                      <div className={`flex min-h-[140px] items-center justify-center text-[13px] ${classes.textMuted}`}>
                        Loading activity...
                      </div>
                    }
                  >
                    <GitHubContributionCalendar
                      username="Xeyn19"
                      className={`text-[12px] ${classes.textMuted}`}
                      year={selectedGithubYear}
                      colorScheme={isDark ? 'dark' : 'light'}
                      blockSize={13}
                      blockMargin={4}
                      fontSize={12}
                      showWeekdayLabels={false}
                      theme={githubCalendarTheme}
                      labels={{
                        totalCount: '{{count}} contributions in {{year}}',
                      }}
                      errorMessage="GitHub activity is unavailable right now."
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </Motion.section>

        <div className="mt-6 space-y-6">
          <Motion.section
            id="about"
            className="scroll-mt-32"
            {...sectionReveal}
          >
            <ElectricBorder
              accent="cyan"
              className={sectionRadius}
              contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
                    {about.title}
                  </h2>
                </div>
                <Link
                  to="/about"
                  className={`inline-flex self-start px-5 py-2.5 text-[13px] font-medium transition ${controlRadius} ${classes.buttonGhost}`}
                >
                  Read more
                </Link>
              </div>
              <p className={`mt-4 max-w-3xl text-[14px] leading-6 sm:text-[14.5px] ${classes.textMuted}`}>
                {about.body}
              </p>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="experience"
            className="scroll-mt-32"
            {...sectionReveal}
          >
            <ElectricBorder
              accent="amber"
              className={sectionRadius}
              contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
                    Experience
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {experience.map((item) => (
                  <ElectricBorder
                    key={`${item.role}-${item.dateRange}`}
                    as="article"
                    accent="amber"
                    variant="soft"
                    className={cardRadius}
                    contentClassName={`${cardRadius} p-4 shadow-[0_10px_22px_rgba(2,6,23,0.12)] ${classes.surfaceMuted}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className={`text-[1.05rem] font-semibold tracking-tight sm:text-[1.2rem] ${classes.heading}`}>{item.role}</h3>
                        <p className={`mt-1 text-[13px] ${classes.textMuted}`}>{item.company}</p>
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
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400" />
                          <span className={`max-w-3xl text-[13.5px] leading-6 ${classes.text}`}>
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
            {...sectionReveal}
          >
            <ElectricBorder
              accent="cyan"
              className={sectionRadius}
              contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
            >
              <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
                Tech-Stack
              </h2>

              <div className="mt-6 space-y-4 overflow-hidden">
                {[firstRowSkills, secondRowSkills].map((rowItems, rowIndex) => (
                  <div key={`tech-row-${rowIndex}`} className="overflow-hidden">
                    <div className={`marquee-track ${rowIndex === 1 ? 'marquee-track-reverse' : ''}`}>
                      {[...rowItems, ...rowItems].map((skill, index) => {
                        const techVisual = getTechnologyVisual(skill.techname)
                        const TechIcon = techVisual.Icon

                        return (
                          <ElectricBorder
                            key={`${skill.techname}-${rowIndex}-${index}`}
                            accent="cyan"
                            variant="soft"
                            className={`mx-2 ${cardRadius}`}
                            contentClassName={`inline-flex min-w-[172px] items-center gap-3 px-4 py-3 ${cardRadius} ${classes.surfaceMuted}`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center ring-1 ring-inset ${controlRadius} ${
                                isDark ? 'bg-slate-950/80 ring-white/10' : 'bg-white ring-slate-200/90'
                              }`}
                            >
                              <TechIcon className={`h-4 w-4 ${techVisual.iconClass}`} />
                            </span>
                            <span className={`text-[13.5px] font-medium ${classes.heading}`}>{skill.techname}</span>
                          </ElectricBorder>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="projects"
            className="scroll-mt-32"
            {...sectionReveal}
          >
            <ElectricBorder
              accent="amber"
              className={sectionRadius}
              contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
                    Projects
                  </h2>
                  <p className={`mt-2 max-w-xl text-[13.5px] leading-6 ${classes.textMuted}`}>
                    Selected front-end and full-stack work.
                  </p>
                </div>
                <div className={`self-start rounded-full px-3 py-1.5 text-[12px] font-medium ${classes.surfaceMuted} ${classes.heading}`}>
                  {visibleProjects.length} / {projects.length} {selectedProjectFilter.label}
                </div>
              </div>

              <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                {publicCategoryFilters.map((filter) => {
                  const isActive = selectedProjectCategory === filter.key

                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => startTransition(() => setSelectedProjectCategory(filter.key))}
                      className={`shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium transition active:scale-[0.98] ${controlRadius} ${focusRingClass} ${
                        isActive ? classes.navActive : classes.buttonGhost
                      }`}
                    >
                      {filter.label} ({projectCategoryCounts[filter.key] ?? 0})
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
                  const projectMeta = [project.category, project.date].filter(Boolean)

                  return (
                    <ElectricBorder
                      key={`${project.id}-${project.title}`}
                      as="article"
                      accent="amber"
                      variant="soft"
                      className={cardRadius}
                      contentClassName={`flex h-full flex-col p-4 ${cardRadius} ${classes.surfaceMuted}`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className={`text-[1.02rem] font-semibold tracking-tight sm:text-[1.2rem] ${classes.heading}`}>
                            {project.title}
                          </h3>
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

                        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                          <Link
                            to={`/projects/${project.slug}`}
                            className={`inline-flex min-h-10 items-center justify-center px-4 py-2 text-[13px] font-medium transition ${controlRadius} ${classes.buttonGhost} ${focusRingClass}`}
                          >
                            View
                          </Link>
                          {externalLinks.liveLink ? (
                            <a
                              href={externalLinks.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex min-h-10 items-center justify-center px-4 py-2 text-[13px] font-medium transition ${controlRadius} ${classes.buttonGhost} ${focusRingClass}`}
                            >
                              Live
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <p className={`mt-3 flex-1 text-[13.5px] leading-6 ${classes.text}`}>
                        {summarizeProjectDescription(project.description, 108)}
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
                    </ElectricBorder>
                  )
                })}

                {!visibleProjects.length ? (
                  <ElectricBorder
                    accent="amber"
                    variant="soft"
                    className={`${cardRadius} lg:col-span-2`}
                    contentClassName={`${cardRadius} p-8 text-center ${classes.surfaceMuted}`}
                  >
                    <p className={`text-sm ${classes.textMuted}`}>No projects found for this category.</p>
                  </ElectricBorder>
                ) : null}
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            id="certificates"
            {...sectionReveal}
          >
            <ElectricBorder
              accent="cyan"
              className={sectionRadius}
              contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
            >
              <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
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
                        className={cardRadius}
                        contentClassName={`${cardRadius} p-4 sm:p-5 ${classes.surfaceMuted}`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center ring-1 ring-inset ${controlRadius} ${
                              isDark ? 'bg-slate-950/80 ring-white/10' : 'bg-white ring-slate-200/90'
                            }`}
                          >
                            <CertificateIcon className={`h-4.5 w-4.5 ${certificateVisual.iconClass}`} />
                          </span>

                          <div className="min-w-0">
                            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${classes.labelMuted}`}>
                              {item.provider}
                            </p>
                            <h3 className={`mt-2.5 text-[0.95rem] font-semibold leading-6 sm:text-[1rem] ${classes.heading}`}>
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

          {testimonials.length ? (
            <Motion.section
              id="testimonials"
              className="scroll-mt-32"
              {...sectionReveal}
            >
              <ElectricBorder
                accent="amber"
                className={sectionRadius}
                contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
                      Testimonials
                    </h2>
                  </div>
                  {activeTestimonial ? (
                    <div className="mt-3 flex flex-wrap items-center gap-2 self-start sm:mt-0 sm:justify-end">
                      <div className={`max-w-full rounded-full px-3 py-1.5 text-[12px] font-medium ${classes.surfaceMuted} ${classes.heading}`}>
                        {activeTestimonial.name}
                      </div>
                      <button
                        type="button"
                        aria-label="Previous testimonial"
                        onClick={() =>
                          startTransition(() =>
                            setSelectedTestimonialIndex((currentIndex) =>
                              currentIndex === 0 ? totalTestimonials - 1 : currentIndex - 1,
                            ),
                          )
                        }
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center text-sm font-medium transition active:scale-[0.98] ${controlRadius} ${focusRingClass} ${classes.buttonGhost}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5">
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      <div className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${classes.surfaceMuted} ${classes.heading}`}>
                        {selectedTestimonialIndex + 1} / {totalTestimonials}
                      </div>
                      <button
                        type="button"
                        aria-label="Next testimonial"
                        onClick={() =>
                          startTransition(() =>
                            setSelectedTestimonialIndex((currentIndex) =>
                              currentIndex === totalTestimonials - 1 ? 0 : currentIndex + 1,
                            ),
                          )
                        }
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center text-sm font-medium transition active:scale-[0.98] ${controlRadius} ${focusRingClass} ${classes.buttonGhost}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                </div>

                {activeTestimonial ? (
                  <div className="mt-6">
                    <AnimatePresence mode="wait" initial={false}>
                      <Motion.div
                        key={`${activeTestimonial.name}-${activeTestimonial.company}`}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -18 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <ElectricBorder
                          as="article"
                          accent="amber"
                          variant="soft"
                          className={cardRadius}
                          contentClassName={`${cardRadius} overflow-hidden ${classes.surfaceMuted}`}
                        >
                          <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
                            <div className={`relative min-h-[420px] sm:min-h-[360px] lg:min-h-[300px] ${isDark ? 'bg-slate-950/70' : 'bg-slate-100'}`}>
                              {activeTestimonial.imageSrc ? (
                                <>
                                  <img
                                    src={activeTestimonial.imageSrc}
                                    alt={activeTestimonial.name}
                                    className="absolute inset-0 h-full w-full object-contain object-top p-2 sm:p-3 lg:object-cover lg:object-center lg:p-0"
                                  />
                                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.46))]" />
                                </>
                              ) : (
                                <div
                                  className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
                                    isDark
                                      ? 'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_rgba(15,23,42,0.96)_62%)] text-amber-200'
                                      : 'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_rgba(241,245,249,1)_64%)] text-amber-700'
                                  }`}
                                >
                                  <div
                                    className={`flex h-24 w-24 items-center justify-center rounded-full text-[1.7rem] font-semibold tracking-[0.12em] ring-1 ring-inset ${
                                      isDark ? 'bg-white/8 ring-white/10' : 'bg-white/80 ring-slate-200'
                                    }`}
                                  >
                                    {activeTestimonial.name
                                      .split(' ')
                                      .filter(Boolean)
                                      .slice(0, 2)
                                      .map((part) => part[0])
                                      .join('')
                                      .toUpperCase()}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col justify-between p-4 sm:p-6">
                              <div>
                                <span
                                  className={`inline-flex h-11 w-11 items-center justify-center ring-1 ring-inset ${controlRadius} ${
                                    isDark ? 'bg-slate-950/80 ring-white/10 text-amber-300' : 'bg-white ring-slate-200/90 text-amber-600'
                                  }`}
                                  aria-hidden="true"
                                >
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M9.86 5A5.86 5.86 0 0 0 4 10.86V19h8.14v-8.14H7.86A2.86 2.86 0 0 1 10.71 8H12V5H9.86Zm10 0A5.86 5.86 0 0 0 14 10.86V19h8.14v-8.14h-4.28A2.86 2.86 0 0 1 20.71 8H22V5h-2.14Z" />
                                  </svg>
                                </span>

                                <blockquote className={`mt-4 text-[14px] leading-6 sm:text-[1rem] sm:leading-7 ${classes.text}`}>
                                  {activeTestimonial.quote}
                                </blockquote>
                              </div>

                              <div className="mt-6 border-t border-white/10 pt-4">
                                <p className={`text-[1rem] font-semibold ${classes.heading}`}>{activeTestimonial.name}</p>
                                <p className={`mt-1 text-[13px] ${classes.textMuted}`}>
                                  {activeTestimonial.role} at {activeTestimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </ElectricBorder>
                      </Motion.div>
                    </AnimatePresence>
                  </div>
                ) : null}
              </ElectricBorder>
            </Motion.section>
          ) : null}

          <Motion.section
            id="education"
            className="scroll-mt-32"
            {...sectionReveal}
          >
            <ElectricBorder
              accent="amber"
              className={sectionRadius}
              contentClassName={`${sectionRadius} p-5 sm:p-6 ${classes.shell}`}
            >
              <h2 className={`text-[1.55rem] font-semibold tracking-tight sm:text-[1.75rem] ${classes.heading}`}>
                Education
              </h2>

              <div className="mt-6 space-y-4">
                {education.map((item) => (
                  <ElectricBorder
                    key={`${item.title}-${item.period}`}
                    as="article"
                    accent="amber"
                    variant="soft"
                    className={cardRadius}
                    contentClassName={`${cardRadius} px-4 py-4 sm:px-5 ${classes.surfaceMuted}`}
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
                        <h3 className={`text-[1rem] font-semibold tracking-tight sm:text-[1.08rem] ${classes.heading}`}>
                          {item.title}
                        </h3>
                        <p className={`mt-1 text-[13.5px] ${classes.text}`}>
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
            {...sectionReveal}
          >
            <ElectricBorder
              accent="cyan"
              className={sectionRadius}
              contentClassName={`overflow-hidden ${sectionRadius} ${classes.shell}`}
            >
              <div className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-7">
                <div>
                  <h2 className={`text-[1.5rem] font-semibold tracking-tight sm:text-[1.65rem] ${classes.heading}`}>
                    {contact.title}
                  </h2>
                  <p className={`mt-2 text-[13.5px] leading-6 ${classes.textMuted}`}>{contact.body}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {contact.compactLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px] transition hover:opacity-80 ${classes.surfaceMuted} ${classes.textMuted}`}
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
                      <span className="min-w-0 break-all">{item.value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </ElectricBorder>
          </Motion.section>

          <Motion.section
            className="pb-2 pt-2 text-center"
            {...sectionReveal}
          >
            <ElectricBorder
              accent="rose"
              variant="soft"
              className={cardRadius}
              contentClassName={`${cardRadius} px-5 py-5 sm:px-6 ${classes.shell}`}
            >
              <p className={`text-[0.9rem] italic ${classes.textMuted}`}>
                &ldquo;{footerQuote.text}&rdquo;
              </p>
              <p className={`mt-2 text-[14px] ${classes.textMuted}`}>- {footerQuote.attribution}</p>
              <p className={`mt-6 text-sm ${classes.textSubtle}`}>
                &copy; Edgar Orosa {new Date().getFullYear()}. All rights reserved.
              </p>
            </ElectricBorder>
          </Motion.section>
        </div>
      </main>
    </div>
  )
}

export default HomePage
