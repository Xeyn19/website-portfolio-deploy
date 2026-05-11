export const projectCaseStudies = {
  'ipay-international-website': {
    headline: 'Scalable marketing and proposal platform for a payment solutions business.',
    overview:
      'I built the iPay International website as a modern, production-ready web experience focused on trust, conversion, and maintainability. The project combines a polished marketing frontend with structured lead capture, proposal request flows, and Supabase-backed data handling.',
    problem:
      'The platform needed a strong public-facing website that could present business credibility clearly while also supporting proposal requests and internal lead management without adding a fragmented admin workflow.',
    solution:
      'I used Next.js, React, TypeScript, Tailwind CSS, and Supabase to build a modular frontend and a backend-friendly content flow. The result is a responsive website with reusable sections, integrated form handling, and an admin-ready data foundation.',
    responsibilities: [
      'Built reusable page sections and responsive marketing layouts.',
      'Implemented proposal request flows and Supabase-backed data submission handling.',
      'Structured the project for maintainability with modular frontend architecture and modern TypeScript patterns.',
    ],
    features: [
      'Responsive marketing website with modern visual hierarchy.',
      'Request Proposal workflow with structured lead capture.',
      'Admin-ready data handling through Supabase integration.',
      'Light and dark theme support with reusable components.',
    ],
    liveLink: 'https://ipays.ph/',
  },
  'daily-monitoring-page-x-meta-system': {
    headline: 'Secured daily play monitoring dashboard with flexible reporting, responsive controls, and historical analytics.',
    overview:
      'I built this Daily Play Monitoring module for the X-Meta Backend System to give users a secure and responsive way to review device play statistics across 1-day, weekly, monthly, and custom date ranges. The interface combines validated reporting controls, permission-aware access, cron-backed historical records, summary panels, and Chart.js analytics so operational teams can review monitoring data faster and with better context.',
    problem:
      'The monitoring workflow needed a clearer and more reliable way to analyze play records across multiple time ranges, device types, and screen sizes without exposing unauthorized users or forcing operators through fragmented reporting steps.',
    solution:
      'I implemented a dashboard flow backed by asynchronous API requests, validated filters, persistent URL state, and responsive controls so users can move between reporting ranges, inspect cron-backed history, copy key values, and review monthly analytics from one polished interface.',
    responsibilities: [
      'Developed the secure dashboard UI in PHP and JavaScript with permission-controlled access and validated date-range inputs.',
      'Integrated the reporting flow across the view, frontend script, and backend API for asynchronous monitoring data retrieval.',
      'Implemented responsive date controls, mobile and desktop device-type filters, active filter indicators, and utility actions like copy-to-clipboard.',
      'Added automated user guide PDF synchronization, polished loading overlays, and resilient loading, error, and empty states.',
    ],
    features: [
      '1-day, weekly, monthly, and custom date-range reporting with validated inputs.',
      'Permission-controlled access with asynchronous API fetching and URL state persistence.',
      'Report overview cards, summary statistics, and a dynamic table for cron-backed historical records.',
      'Chart.js monthly range summaries and daily record trend charts.',
      'Responsive desktop and mobile filters, active filter indicators, and copy-to-clipboard helpers.',
    ],
    galleryImages: ['/playmonitoring2 (2).png', '/playmonitoring3.png'],
  },
  'users-management-page-x-meta-system': {
    headline: 'Role-aware user management interface for internal operations and permission control.',
    overview:
      'I built this user management module to give administrators clearer control over user status, program assignment, access windows, and permission visibility inside the X-Meta System.',
    problem:
      'Internal user administration needed a structured interface that could handle role-based control, multiple program mappings, and reliable visibility into active or inactive user records.',
    solution:
      'I designed a more scalable user-management flow with role-aware actions, external mapping support, structured table rendering, and clearer real-time statistics for system operators.',
    responsibilities: [
      'Implemented role-based CRUD controls and read-only safeguards for non-admin users.',
      'Built table rendering logic for user status, access windows, and program ID mappings.',
      'Added supporting statistics and helper logic to keep the module maintainable.',
    ],
    features: [
      'Role-based access control.',
      'Structured user data table with mapped program IDs.',
      'Active and inactive user statistics.',
      'Scalable helper logic for missing or partial data states.',
    ],
  },
  'job-application-tracker': {
    headline: 'Full-stack job pipeline tracker with authentication, CRUD workflows, and live progress metrics.',
    overview:
      'This project helps job seekers manage applications across the full hiring process with secure authentication, detailed application records, and a live dashboard that summarizes progress across pipeline stages.',
    problem:
      'Tracking multiple job applications manually becomes messy fast, especially when trying to monitor statuses, attached files, notes, and hiring-stage changes in one place.',
    solution:
      'I built a full-stack application with protected user accounts, CRUD flows, upload support, and a clear pipeline breakdown so each application can be managed as part of a single dashboard workflow.',
    responsibilities: [
      'Designed the full-stack architecture from database structure to frontend workflow.',
      'Implemented JWT-secured authentication and protected application management routes.',
      'Built a dashboard view for statistics and hiring-stage breakdown.',
    ],
    features: [
      'Authenticated user accounts.',
      'Add, edit, and delete job applications.',
      'Pipeline stages for Applied, Interview, Offer, and Rejected.',
      'Live dashboard metrics and visual progress breakdown.',
    ],
    repoLink: 'https://github.com/Xeyn19/Express-Node-React-Prac',
  },
}
