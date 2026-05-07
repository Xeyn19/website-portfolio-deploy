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
    headline: 'Operational dashboard for monitoring real-time device activity and daily metrics.',
    overview:
      'This dashboard was built as part of the X-Meta System to help the team monitor device play activity, filter records by date and device type, and review summarized metrics in a cleaner operational interface.',
    problem:
      'Monitoring workflows were too manual and fragmented, which made it harder to track online and offline device activity quickly and consistently across the day.',
    solution:
      'I developed a dashboard that combines filtered data views, summarized monitoring output, and asynchronous data loading so operators can review device activity in a more usable and maintainable workflow.',
    responsibilities: [
      'Developed the frontend dashboard layout and interactive filtering flows.',
      'Integrated AJAX-driven data loading for monitoring records and summary panels.',
      'Improved empty, loading, and error states for more reliable daily use.',
    ],
    features: [
      'Date and device-type filtering.',
      'Summary cards and detailed monitoring tables.',
      'Responsive dashboard interaction patterns.',
      'Cleaner handling of loading and no-data states.',
    ],
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
