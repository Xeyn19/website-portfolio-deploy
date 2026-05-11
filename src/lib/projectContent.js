import fallbackProjects from '../assets/data.json'
import { LuCode, LuLayoutTemplate } from 'react-icons/lu'
import {
  SiBootstrap,
  SiCss,
  SiDaisyui,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

const TECH_LABELS_BY_ASSET = {
  '/css.png': 'CSS',
  '/daisyui.png': 'daisyUI',
  '/daisyuiskills.svg': 'daisyUI',
  '/express.png': 'Express.js',
  '/front.png': 'Front-End',
  '/git.png': 'Git',
  '/github.png': 'GitHub',
  '/html.png': 'HTML',
  '/js.jpg': 'JavaScript',
  '/js.png': 'JavaScript',
  '/material-ui.png': 'Material UI',
  '/mysql.png': 'MySQL',
  '/nextjs.png': 'Next.js',
  '/nodejs.png': 'Node.js',
  '/php.png': 'PHP',
  '/reactjs.svg': 'React',
  '/supabase.jpg': 'Supabase',
  '/tailwindcss.png': 'Tailwind CSS',
  '/typescript.png': 'TypeScript',
  '/vercel.png': 'Vercel',
}

const PROJECT_OVERRIDE_ALIASES = {
  'daily-monitoring-page-x-meta-system': 'daily-monitoring-page-x-meta-system',
  'play-monitoring-page-x-meta-backend-system': 'daily-monitoring-page-x-meta-system',
}

const PROJECT_OVERRIDES = {
  'daily-monitoring-page-x-meta-system': {
    slug: 'daily-monitoring-page-x-meta-system',
    title: 'Play Monitoring Page - X-Meta Backend System',
    description:
      'I developed a secured and responsive Daily Play Monitoring dashboard for the X-Meta Backend System that helps users analyze device play statistics through 1-day, weekly, monthly, and custom date-range reporting. The module includes validated inputs, permission-controlled access, asynchronous API fetching, URL state persistence, responsive device-type filters, active filter indicators, summary statistics, a report overview panel, and a dynamic data table for cron-backed historical records. I also integrated automated user guide PDF synchronization, copy-to-clipboard utilities, polished loading, error, and empty states, plus monthly Chart.js analytics with visual range summaries and daily record trend charts to improve usability, reporting accuracy, and operational visibility.',
    image: '/playmonitoring1 (2).png',
  },
}

export const normalizeAssetPath = (value = '') => {
  const trimmedValue = value.toString().trim()

  if (!trimmedValue || trimmedValue.startsWith('http') || trimmedValue.startsWith('/')) {
    return trimmedValue
  }

  return `/${trimmedValue}`
}

export const slugifyProjectTitle = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const normalizeProject = (project) => ({
  ...project,
  ...(() => {
    const providedSlug = project.slug?.toString().trim().toLowerCase()
    const titleSlug = slugifyProjectTitle(project.title)
    const resolvedSlug =
      PROJECT_OVERRIDE_ALIASES[providedSlug] ??
      PROJECT_OVERRIDE_ALIASES[titleSlug] ??
      providedSlug ??
      titleSlug
    const projectOverride = PROJECT_OVERRIDES[resolvedSlug] ?? {}

    return {
      ...projectOverride,
      slug: projectOverride.slug ?? resolvedSlug,
      image: normalizeAssetPath(projectOverride.image ?? project.image),
    }
  })(),
  link: project.link ?? '',
  technologies: Array.isArray(project.technologies)
    ? project.technologies.map((technology) => normalizeAssetPath(technology))
    : [],
})

export const sortProjects = (projects) =>
  [...projects].sort((left, right) => {
    const rightDate = Number(right.date) || 0
    const leftDate = Number(left.date) || 0

    if (rightDate !== leftDate) {
      return rightDate - leftDate
    }

    return String(left.title ?? '').localeCompare(String(right.title ?? ''))
  })

export const getFallbackProjects = () => sortProjects(fallbackProjects).map(normalizeProject)

export const summarizeProjectDescription = (description = '', maxLength = 170) => {
  const normalizedDescription = description.toString().replace(/\s+/g, ' ').trim()

  if (normalizedDescription.length <= maxLength) {
    return normalizedDescription
  }

  const firstSentenceMatch = normalizedDescription.match(/^(.*?[.!?])(\s|$)/)
  const firstSentence = firstSentenceMatch?.[1]?.trim()

  if (firstSentence && firstSentence.length <= maxLength) {
    return firstSentence
  }

  return `${normalizedDescription.slice(0, maxLength).trimEnd()}...`
}

export const mapTechnologyToLabel = (technology = '') => {
  const normalizedTechnology = normalizeAssetPath(technology).toLowerCase()

  if (TECH_LABELS_BY_ASSET[normalizedTechnology]) {
    return TECH_LABELS_BY_ASSET[normalizedTechnology]
  }

  const assetName = normalizedTechnology.split('/').pop() ?? normalizedTechnology

  return assetName
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

export const getTechnologyVisual = (technology = '') => {
  const label = mapTechnologyToLabel(technology)
  const key = label.toLowerCase().replace(/[^a-z0-9]+/g, '')

  if (['html', 'html5'].includes(key)) {
    return { label, Icon: SiHtml5, iconClass: 'text-orange-400' }
  }

  if (['css', 'css3'].includes(key)) {
    return { label, Icon: SiCss, iconClass: 'text-sky-400' }
  }

  if (['bootstrap'].includes(key)) {
    return { label, Icon: SiBootstrap, iconClass: 'text-violet-400' }
  }

  if (['vanillajs', 'javascript', 'js'].includes(key)) {
    return { label, Icon: SiJavascript, iconClass: 'text-amber-300' }
  }

  if (['tailwindcss', 'tailwind'].includes(key)) {
    return { label, Icon: SiTailwindcss, iconClass: 'text-cyan-400' }
  }

  if (['react', 'reactjs'].includes(key)) {
    return { label, Icon: SiReact, iconClass: 'text-sky-300' }
  }

  if (['typescript', 'ts'].includes(key)) {
    return { label, Icon: SiTypescript, iconClass: 'text-blue-400' }
  }

  if (key.includes('frontend')) {
    return { label, Icon: LuLayoutTemplate, iconClass: 'text-violet-300' }
  }

  if (['daisyui'].includes(key)) {
    return { label, Icon: SiDaisyui, iconClass: 'text-fuchsia-300' }
  }

  if (['github'].includes(key)) {
    return { label, Icon: SiGithub, iconClass: 'text-slate-200' }
  }

  if (['git'].includes(key)) {
    return { label, Icon: SiGit, iconClass: 'text-orange-400' }
  }

  if (['materialui', 'mui'].includes(key)) {
    return { label, Icon: SiMui, iconClass: 'text-sky-400' }
  }

  if (['next', 'nextjs'].includes(key)) {
    return { label, Icon: SiNextdotjs, iconClass: 'text-slate-100' }
  }

  if (['express', 'expressjs'].includes(key)) {
    return { label, Icon: SiExpress, iconClass: 'text-slate-300' }
  }

  if (['node', 'nodejs'].includes(key)) {
    return { label, Icon: SiNodedotjs, iconClass: 'text-emerald-400' }
  }

  if (['mysql'].includes(key)) {
    return { label, Icon: SiMysql, iconClass: 'text-blue-300' }
  }

  if (['postgres', 'postgresql'].includes(key)) {
    return { label, Icon: SiPostgresql, iconClass: 'text-indigo-300' }
  }

  if (['php'].includes(key)) {
    return { label, Icon: SiPhp, iconClass: 'text-indigo-300' }
  }

  if (['supabase'].includes(key)) {
    return { label, Icon: SiSupabase, iconClass: 'text-emerald-400' }
  }

  return { label, Icon: LuCode, iconClass: 'text-slate-300' }
}

const isRepositoryUrl = (value = '') => /github\.com|gitlab\.com|bitbucket\.org/i.test(value)

export const getProjectExternalLinks = (project, caseStudy = {}) => {
  const baseLink = project?.link ?? ''
  const caseStudyLiveLink = caseStudy?.liveLink ?? ''
  const caseStudyRepoLink = caseStudy?.repoLink ?? ''

  if (caseStudyLiveLink || caseStudyRepoLink) {
    return {
      liveLink: caseStudyLiveLink,
      repoLink: caseStudyRepoLink,
    }
  }

  if (!baseLink) {
    return {
      liveLink: '',
      repoLink: '',
    }
  }

  return isRepositoryUrl(baseLink)
    ? { liveLink: '', repoLink: baseLink }
    : { liveLink: baseLink, repoLink: '' }
}
