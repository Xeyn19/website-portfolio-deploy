const heroStats = [
  {
    label: 'Based In',
    value: 'Philippines',
  },
  {
    label: 'Education',
    value: 'BS Information Systems',
  },
  {
    label: 'Focus',
    value: 'Front-End and Full-Stack',
  },
  {
    label: 'Status',
    value: 'Open to opportunities',
  },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Xeyn19',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/edgar-orosa-a43a15333/',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/edgar.orosa.9/',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/c_stor_/',
  },
]

const experienceItems = [
  {
    role: 'Full Stack Developer Intern',
    company: 'X-META Technologies Inc.',
    dateRange: 'Feb 2026 - May 2026',
    durationLabel: '3 months',
    bullets: [
      'Built the iPay International website with Next.js and Supabase, including admin and analytics tools.',
      'Enhanced internal business systems using PHP, JavaScript, HTML, Bootstrap, and MySQL.',
      'Automated monitoring, dashboard, and reporting workflows for offline devices.',
      'Improved security, performance, and user management modules.',
    ],
    stackTags: [
      'Next.js',
      'Supabase',
      'PHP',
      'HTML',
      'JavaScript',
      'Bootstrap',
      'MySQL',
    ],
  },
]

const educationItems = [
  {
    title: 'BS in Information Systems',
    school: 'Dr. Filemon C. Aguilar Memorial College of Las Pinas - IT Campus',
    period: '2022 - 2026',
    location: 'Las Pinas City',
  },
]

const certificateItems = [
  {
    title: 'HTML Fundamentals',
    provider: 'CodeCred',
  },
  {
    title: 'IT Beginner to Advance Roadmap',
    provider: 'icreatechs',
  },
  {
    title: 'CSS',
    provider: 'Udemy',
  },
  {
    title: 'Javascript Development Mastery',
    provider: 'icreatechs',
  },
  {
    title: 'Web Development Fundamentals',
    provider: 'icreatechs',
  },
]

const testimonialItems = [
  {
    name: 'Keith Dwarren Vergara',
    role: 'Full-Stack Developer',
    company: 'X-Meta Technologies, Inc.',
    quote:
      'Edgar is a dependable full-stack developer who turns requirements into usable features. He pays attention to both UI quality and system logic, which made his contributions valuable to our team.',
    imageSrc: '/Keith.jpg',
  },
  {
    name: 'Sai Molales',
    role: 'IT Manager',
    company: 'X-Meta Technologies, Inc.',
    quote:
      'Edgar is a reliable developer who delivers practical solutions with consistency. He understands both technical requirements and user needs, which made his work valuable to our team at X-Meta.',
  },
  {
    name: 'Natalie Julio',
    role: 'Marketing',
    company: 'X-Meta Technologies, Inc.',
    quote:
      'Edgar creates work that is both polished and practical. He understands how to support business goals with clear execution, and his output consistently reflects care and professionalism.',
    imageSrc: '/Natalie.jpg',
  },
]

const contactMethods = [
  {
    label: 'Email',
    value: 'edgarrodilorosa@gmail.com',
    href: 'mailto:edgarrodilorosa@gmail.com',
  },
  {
    label: 'Phone',
    value: '+63 994 258 6519',
    href: 'tel:+639942586519',
  },
]

const compactContactLinks = [
  {
    label: 'Email',
    value: 'edgarrodilorosa@gmail.com',
    href: 'mailto:edgarrodilorosa@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/Xeyn19',
    href: 'https://github.com/Xeyn19',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/edgar-orosa-a43a15333',
    href: 'https://www.linkedin.com/in/edgar-orosa-a43a15333/',
  },
]

export const siteContent = {
  hero: {
    eyebrow: 'Portfolio',
    name: 'Edgar Orosa',
    title: 'Full-Stack Developer',
    rotatingTitles: [
      'Full-Stack Developer',
      'Building modern web apps',
      'Creating business websites',
      'Making life easier',
      'Designing intuitive UI',
      "Let's build your product",
    ],
    summary: 'I build fast, practical web apps for business, internal tools, and modern websites.',
    bio: 'My work focuses on clean UI, reliable systems, and useful automation.',
    badge: 'Open to work',
    stats: heroStats,
    socialLinks,
  },
  about: {
    title: 'About Me',
    body:
      "I'm a full-stack developer who builds production-ready web applications from frontend to backend, with a focus on clean interfaces, reliable systems, and practical solutions. I also automate workflows and build tools that make processes faster, simpler, and easier for people to manage.",
    detailTitle: 'Who I Am',
    detailIntro:
      "I'm Edgar Orosa, a full-stack web developer based in Las Pinas City, Philippines. I grow by building real products for business, internal workflows, and practical everyday use.",
    sections: [
      {
        title: 'My Background',
        body:
          "My foundation started with HTML, CSS, JavaScript, PHP, and MySQL, then expanded into React, TypeScript, Next.js, Node.js, and Supabase. I've worked on dashboards, admin tools, and internal systems that improved daily operations.",
      },
      {
        title: 'Interests & Hobbies',
        body:
          'I enjoy exploring modern web tools, experimenting with AI workflows, and improving small details in personal projects.',
      },
      {
        title: 'What Motivates Me',
        body:
          'I enjoy turning ideas into useful software with clear interfaces, solid logic, and maintainable code.',
      },
      {
        title: 'Career Goals',
        body:
          'My goal is to grow into a stronger full-stack developer and build products that create real value for users and teams.',
      },
    ],
  },
  experience: experienceItems,
  education: educationItems,
  certificates: certificateItems,
  testimonials: testimonialItems,
  contact: {
    title: 'Get in touch',
    body: 'Open to work, freelance projects, and collaborations.',
    methods: contactMethods,
    compactLinks: compactContactLinks,
  },
  footerQuote: {
    text: 'The biggest risk is not taking any risk.',
    attribution: 'Mark Zuckerberg',
  },
}
