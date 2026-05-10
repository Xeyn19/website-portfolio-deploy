import { getFallbackProjects, slugifyProjectTitle, summarizeProjectDescription } from '../lib/projectContent'
import { siteContent } from './siteContent'

const fallbackProjects = getFallbackProjects()

const featuredProjectTitles = [
  'Ipay International Website',
  'Job Application Tracker',
  'Online Saving Goal system for Working Students',
  'Daily Monitoring Page - X-Meta System',
]

const featuredProjects = featuredProjectTitles
  .map((title) => fallbackProjects.find((project) => project.title === title))
  .filter(Boolean)
  .map((project) => ({
    title: project.title,
    summary: summarizeProjectDescription(project.description, 170),
    route: `/projects/${project.slug ?? slugifyProjectTitle(project.title)}`,
    externalLink: project.link || '',
    category: project.category,
    year: project.date,
  }))

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Supabase',
  'PHP',
  'MySQL',
  'JavaScript',
]

export const tawkHomepageSectionLinks = {
  about: '/#about',
  experience: '/#experience',
  skills: '/#skills',
  projects: '/#projects',
  certificates: '/#certificates',
  testimonials: '/#testimonials',
  education: '/#education',
  contact: '/#contact',
}

export const tawkRouteLinks = {
  about: '/about',
  projects: '/projects',
  certificates: '/certificates',
  contact: '/contact',
  github: 'https://github.com/Xeyn19',
  linkedin: 'https://www.linkedin.com/in/edgar-orosa-a43a15333/',
  email: 'mailto:edgarrodilorosa@gmail.com',
  phone: 'tel:+639942586519',
}

const certificatesLine = siteContent.certificates
  .map((certificate) => `${certificate.title} (${certificate.provider})`)
  .join(', ')

const testimonialsLine = siteContent.testimonials
  .map((testimonial) => `${testimonial.name} - ${testimonial.role} at ${testimonial.company}`)
  .join('; ')

const featuredProjectsList = featuredProjects
  .map((project) => `- ${project.title} (${project.year}, ${project.category}) - ${project.route}`)
  .join('\n')

const featuredProjectsSummary = featuredProjects
  .map((project) => `- [${project.title}](${project.route}) - ${project.summary}`)
  .join('\n')

export const tawkBasePrompt = `You are Edgar Orosa's portfolio assistant. Only answer questions about Edgar, his portfolio, skills, experience, projects, certificates, testimonials, availability, and contact details. Keep replies concise, practical, and professional. Prefer guiding visitors with the existing menu options. Use the exact portfolio information provided in the data sources. Do not invent pricing, clients, services, timelines, or personal details that are not in the portfolio data. If the answer is not available, say you can help with Edgar's background, skills, projects, certificates, testimonials, and contact details, then guide the visitor back to the main menu or contact options. When a visitor asks how to reach Edgar, prioritize email, LinkedIn, and GitHub.`

export const tawkKnowledgeText = `Edgar Orosa Portfolio Knowledge Base

Profile
- Name: Edgar Orosa
- Title: Full-Stack Developer
- Location: Las Pinas City, Philippines
- Education: BS in Information Systems
- Status: Open to opportunities

Summary
- Edgar builds fast, practical web apps for business, internal tools, and modern websites.
- His work focuses on clean UI, reliable systems, and useful automation.

About Edgar
- Edgar is a full-stack web developer based in Las Pinas City, Philippines.
- He builds production-ready web applications from frontend to backend.
- He focuses on clean interfaces, reliable systems, and practical solutions.
- He also automates workflows and builds tools that make processes faster and easier to manage.

Tech Stack
- ${techStack.join(', ')}

Experience
- Role: Full Stack Developer Intern
- Company: X-META Technologies Inc.
- Dates: Feb 2026 - May 2026
- Duration: 3 months
- Highlights:
  - Built the iPay International website with Next.js and Supabase, including admin and analytics tools.
  - Enhanced internal business systems using PHP, JavaScript, HTML, Bootstrap, and MySQL.
  - Automated monitoring, dashboard, and reporting workflows for offline devices.
  - Improved security, performance, and user management modules.

Education
- BS in Information Systems
- Dr. Filemon C. Aguilar Memorial College of Las Pinas - IT Campus
- 2022 - 2026
- Las Pinas City

Featured Projects
${featuredProjectsList}

Project Highlights
${featuredProjects
  .map(
    (project) =>
      `- ${project.title}: ${project.summary}${project.externalLink ? ` External link: ${project.externalLink}` : ''}`,
  )
  .join('\n')}

Certificates
- ${certificatesLine}

Testimonials
- ${testimonialsLine}

Contact
- Email: edgarrodilorosa@gmail.com
- Phone: +63 994 258 6519
- GitHub: https://github.com/Xeyn19
- LinkedIn: https://www.linkedin.com/in/edgar-orosa-a43a15333/

Useful Internal Links
- About section: /#about
- Experience section: /#experience
- Skills section: /#skills
- Projects section: /#projects
- Certificates section: /#certificates
- Testimonials section: /#testimonials
- Education section: /#education
- Contact section: /#contact
- About page: /about
- Projects page: /projects
- Certificates page: /certificates
- Contact page: /contact`

export const tawkFaqEntries = [
  {
    question: 'What does Edgar do?',
    answer:
      "Edgar Orosa is a full-stack developer who builds production-ready web applications, internal tools, and business websites with a focus on clean UI, reliable systems, and practical automation.",
  },
  {
    question: 'Where is Edgar based?',
    answer: 'Edgar is based in Las Pinas City, Philippines.',
  },
  {
    question: 'Is Edgar open to work?',
    answer: 'Yes. Edgar is open to opportunities, freelance projects, and collaborations.',
  },
  {
    question: 'What technologies does Edgar use?',
    answer: `Edgar works with ${techStack.join(', ')}.`,
  },
  {
    question: 'What experience does Edgar have at X-META?',
    answer:
      'Edgar worked as a Full Stack Developer Intern at X-META Technologies Inc. from February 2026 to May 2026, building the iPay International website and improving internal systems, dashboards, automation, and user management tools.',
  },
  {
    question: "What are Edgar's featured projects?",
    answer:
      'Featured work includes Ipay International Website, Job Application Tracker, Online Saving Goal System for Working Students, and Daily Monitoring Page - X-Meta System.',
  },
  {
    question: 'How can I contact Edgar?',
    answer:
      'You can reach Edgar by email at edgarrodilorosa@gmail.com, on LinkedIn at linkedin.com/in/edgar-orosa-a43a15333, or on GitHub at github.com/Xeyn19.',
  },
]

export const tawkRootMenuOptions = [
  'About Edgar',
  'Skills & Experience',
  'Projects & Certificates',
  'Contact / Hire Edgar',
]

export const tawkShortcutDefinitions = [
  {
    id: 'main-menu',
    title: 'Main Menu',
    aiQuestions: ['main menu', 'start', 'portfolio help', 'show me options', 'what can you help with'],
    suggestedMessages: tawkRootMenuOptions,
    message:
      "Hi, I'm Edgar's portfolio assistant. I can help you explore his background, work, and contact details. What would you like to know?",
  },
  {
    id: 'about-edgar',
    title: 'About Edgar',
    aiQuestions: ['about edgar', 'who is edgar', 'tell me about edgar', 'background', 'about him'],
    suggestedMessages: ['Experience at X-META', 'Education', 'Testimonials', 'Main Menu'],
    message: `Edgar Orosa is a full-stack developer based in Las Pinas City, Philippines. He builds practical web apps, internal tools, and modern business websites, and he is open to opportunities.\n\nLearn more on the [About page](${tawkRouteLinks.about}) or jump to the [About section](${tawkHomepageSectionLinks.about}).`,
  },
  {
    id: 'skills-experience',
    title: 'Skills & Experience',
    aiQuestions: ['skills and experience', 'skills', 'experience', 'tech stack', 'what is his stack'],
    suggestedMessages: ['Tech Stack', 'X-META Experience', 'Featured Projects', 'Main Menu'],
    message: `Edgar works across frontend and full-stack development, with strong focus on ${techStack.slice(0, 6).join(', ')}. His recent hands-on experience includes production-focused internship work at X-META Technologies Inc.\n\nSee the [Skills section](${tawkHomepageSectionLinks.skills}) or the [Experience section](${tawkHomepageSectionLinks.experience}).`,
  },
  {
    id: 'projects-certificates',
    title: 'Projects & Certificates',
    aiQuestions: ['projects and certificates', 'projects', 'certificates', 'portfolio work', 'show projects'],
    suggestedMessages: ['Featured Projects', 'Certificates', 'GitHub Profile', 'Main Menu'],
    message: `Edgar's portfolio includes business websites, dashboards, admin tools, and full-stack applications. He also holds certificates covering HTML, CSS, JavaScript, and web development fundamentals.\n\nBrowse the [Projects page](${tawkRouteLinks.projects}) or the [Certificates page](${tawkRouteLinks.certificates}).`,
  },
  {
    id: 'contact-hire',
    title: 'Contact / Hire Edgar',
    aiQuestions: ['contact', 'hire edgar', 'work with edgar', 'how can i reach edgar', 'get in touch'],
    suggestedMessages: ['Email Edgar', 'LinkedIn', 'GitHub Profile', 'Main Menu'],
    message: `Edgar is open to work, freelance projects, and collaborations.\n\nBest contact options:\n- [Email Edgar](${tawkRouteLinks.email})\n- [LinkedIn](${tawkRouteLinks.linkedin})\n- [GitHub](${tawkRouteLinks.github})\n- Phone: [+63 994 258 6519](${tawkRouteLinks.phone})`,
  },
  {
    id: 'xmeta-experience',
    title: 'X-META Experience',
    aiQuestions: ['experience at x-meta', 'x-meta experience', 'internship', 'full stack developer intern', 'xmeta'],
    suggestedMessages: ['Tech Stack', 'Featured Projects', 'Contact / Hire Edgar', 'Main Menu'],
    message:
      "Edgar worked as a Full Stack Developer Intern at X-META Technologies Inc. from February 2026 to May 2026. He built the iPay International website with Next.js and Supabase, improved internal business systems with PHP and MySQL, automated reporting workflows, and enhanced security and user-management features.\n\nSee the [Experience section](/#experience).",
  },
  {
    id: 'education',
    title: 'Education',
    aiQuestions: ['education', 'school', 'degree', 'college background', 'what did he study'],
    suggestedMessages: ['About Edgar', 'Skills & Experience', 'Contact / Hire Edgar', 'Main Menu'],
    message:
      'Edgar earned a BS in Information Systems from Dr. Filemon C. Aguilar Memorial College of Las Pinas - IT Campus from 2022 to 2026.\n\nSee the [Education section](/#education).',
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    aiQuestions: ['testimonials', 'recommendations', 'what do people say about edgar', 'feedback', 'references'],
    suggestedMessages: ['About Edgar', 'Experience at X-META', 'Contact / Hire Edgar', 'Main Menu'],
    message:
      "Edgar's portfolio includes testimonials from Keith Dwarren Vergara, Sai Molales, and Natalie Julio at X-Meta Technologies, Inc., highlighting his dependable execution, practical solutions, UI quality, and professionalism.\n\nSee the [Testimonials section](/#testimonials).",
  },
  {
    id: 'tech-stack',
    title: 'Tech Stack',
    aiQuestions: ['tech stack', 'technologies', 'tools', 'frameworks', 'what technologies does he use'],
    suggestedMessages: ['X-META Experience', 'Featured Projects', 'Contact / Hire Edgar', 'Main Menu'],
    message: `Edgar's main stack includes ${techStack.join(', ')}. He builds responsive interfaces, production-ready business websites, and practical internal tools.\n\nSee the [Skills section](${tawkHomepageSectionLinks.skills}).`,
  },
  {
    id: 'featured-projects',
    title: 'Featured Projects',
    aiQuestions: ['featured projects', 'best projects', 'top projects', 'portfolio highlights', 'show featured projects'],
    suggestedMessages: ['Projects & Certificates', 'GitHub Profile', 'Contact / Hire Edgar', 'Main Menu'],
    message: `Here are strong portfolio highlights:\n${featuredProjectsSummary}\n\nBrowse all work on the [Projects page](${tawkRouteLinks.projects}).`,
  },
  {
    id: 'certificates',
    title: 'Certificates',
    aiQuestions: ['certificates', 'certifications', 'what certificates does he have', 'training', 'courses'],
    suggestedMessages: ['Projects & Certificates', 'Skills & Experience', 'Contact / Hire Edgar', 'Main Menu'],
    message: `Edgar's certificate topics include HTML Fundamentals, IT Beginner to Advance Roadmap, CSS, Javascript Development Mastery, and Web Development Fundamentals.\n\nBrowse the [Certificates page](${tawkRouteLinks.certificates}) or jump to the [Certificates section](${tawkHomepageSectionLinks.certificates}).`,
  },
  {
    id: 'github-profile',
    title: 'GitHub Profile',
    aiQuestions: ['github profile', 'github', 'source code', 'repositories', 'view github'],
    suggestedMessages: ['Featured Projects', 'Contact / Hire Edgar', 'Main Menu'],
    message: `You can explore Edgar's code and project activity on [GitHub](${tawkRouteLinks.github}). The portfolio also includes a GitHub contributions section on the homepage.`,
  },
  {
    id: 'email-edgar',
    title: 'Email Edgar',
    aiQuestions: ['email edgar', 'email', 'send email', 'email address', 'contact email'],
    suggestedMessages: ['LinkedIn', 'GitHub Profile', 'Main Menu'],
    message: `Email Edgar at [edgarrodilorosa@gmail.com](${tawkRouteLinks.email}). He is open to work, freelance projects, and collaborations.`,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    aiQuestions: ['linkedin', 'linkedin profile', 'connect on linkedin', 'professional profile'],
    suggestedMessages: ['Email Edgar', 'GitHub Profile', 'Main Menu'],
    message: `Connect with Edgar on [LinkedIn](${tawkRouteLinks.linkedin}).`,
  },
]

const routeContextByPath = {
  '/': {
    pageType: 'home',
    pageLabel: 'Homepage',
    portfolioSection: 'home',
  },
  '/about': {
    pageType: 'about',
    pageLabel: 'About Page',
    portfolioSection: 'about',
  },
  '/projects': {
    pageType: 'projects',
    pageLabel: 'Projects Page',
    portfolioSection: 'projects',
  },
  '/contact': {
    pageType: 'contact',
    pageLabel: 'Contact Page',
    portfolioSection: 'contact',
  },
  '/certificates': {
    pageType: 'certificates',
    pageLabel: 'Certificates Page',
    portfolioSection: 'certificates',
  },
}

const routeTagsByPath = {
  '/': ['page-home', 'section-home'],
  '/about': ['page-about', 'section-about'],
  '/projects': ['page-projects', 'section-projects'],
  '/contact': ['page-contact', 'section-contact'],
  '/certificates': ['page-certificates', 'section-certificates'],
}

const formatSlugLabel = (slug = '') =>
  slug
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')

const getProjectContext = (pathname) => {
  const slug = pathname.replace('/projects/', '').replace(/\/+$/, '')
  const matchedProject = fallbackProjects.find((project) => project.slug === slug)
  const label = matchedProject?.title ?? formatSlugLabel(slug)

  return {
    pageType: 'project-detail',
    pageLabel: label ? `Project: ${label}` : 'Project Detail',
    portfolioSection: 'project-detail',
  }
}

export const getTawkRouteContext = (pathname = '/') => {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  if (normalizedPath.startsWith('/projects/')) {
    const projectContext = getProjectContext(normalizedPath)

    return {
      ...projectContext,
      tags: ['page-project-detail', 'section-projects'],
      attributes: {
        'page-path': normalizedPath,
        'page-type': projectContext.pageType,
        'page-label': projectContext.pageLabel,
        'portfolio-section': projectContext.portfolioSection,
      },
    }
  }

  const baseContext = routeContextByPath[normalizedPath] ?? {
    pageType: 'general',
    pageLabel: 'Public Page',
    portfolioSection: 'general',
  }

  return {
    ...baseContext,
    tags: routeTagsByPath[normalizedPath] ?? ['page-general', 'section-general'],
    attributes: {
      'page-path': normalizedPath,
      'page-type': baseContext.pageType,
      'page-label': baseContext.pageLabel,
      'portfolio-section': baseContext.portfolioSection,
    },
  }
}
