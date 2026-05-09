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
      'Built the iPay International website using Next.js and Supabase, including admin dashboard, data analytics, and request proposal features.',
      'Built and enhanced the X-Meta System backend using PHP, JavaScript, HTML, Bootstrap, and MySQL.',
      'Automated manual processes such as program plays monitoring, daily dashboards, and email reporting for offline devices.',
      'Improved backend security, system performance, and developed user management and dashboard modules.',
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
    summary:
      'I build responsive web applications with strong front-end execution and growing full-stack depth across React, TypeScript, Node.js, PHP, MySQL, and Supabase.',
    bio:
      'My work focuses on practical products, clean UI structure, and maintainable implementation. I am building toward becoming a reliable software engineer who can contribute across both interface and application layers.',
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
      "I'm Edgar Orosa, a full-stack web developer based in Las Pinas City, Philippines. I got into programming while pursuing my BS in Information Systems and quickly realized that building for the web was the path I wanted to keep growing in. Since then, I've been learning by building real systems — from business tools and monitoring platforms to personal products designed to solve practical problems.",
    sections: [
      {
        title: 'My Background',
        body:
          "My foundation started with HTML, CSS, JavaScript, PHP, and MySQL, then expanded into React, TypeScript, Next.js, Node.js, and Supabase. During my internship at X-META Technologies Inc., I worked on internal systems, admin tools, dashboards, and real-time monitoring features. Outside of internship work, I built projects like TRACKY for personal finance and Coop-Tracker for cooperative management, which helped strengthen both my front-end and full-stack development skills.",
      },
      {
        title: 'Interests & Hobbies',
        body:
          "When I'm not coding, I enjoy exploring new web technologies, experimenting with AI tools, and finding ways to automate repetitive tasks. I also enjoy gaming and spending quiet time improving small details in personal projects while learning better development practices.",
      },
      {
        title: 'What Motivates Me',
        body:
          "What motivates me most is turning ideas into working software that is actually useful. I enjoy breaking down complex requirements into clear interfaces, reliable logic, and maintainable code. Seeing a feature move from concept to something people can use gives me the strongest sense of progress as a developer.",
      },
      {
        title: 'Career Goals',
        body:
          "My goal is to keep growing into a stronger full-stack developer and eventually take on more senior technical responsibility. I want to work on products that create real value, especially in areas like fintech, business systems, and practical web tools. I'm also committed to staying current with modern frameworks, AI-assisted workflows, and software engineering best practices.",
      },
    ],
  },
  experience: experienceItems,
  education: educationItems,
  certificates: certificateItems,
  contact: {
    title: 'Get in touch',
    body: 'Open to collaborations.',
    methods: contactMethods,
    compactLinks: compactContactLinks,
  },
  footerQuote: {
    text: 'The biggest risk is not taking any risk.',
    attribution: 'Mark Zuckerberg',
  },
}
