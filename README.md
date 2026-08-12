# Edgar Orosa Portfolio

A responsive full-stack developer portfolio built with React, Vite, and Tailwind CSS. It presents professional experience, technical skills, certificates, education, project case studies, and a downloadable resume in a light/dark interface.

## Features

- Responsive single-page portfolio with section navigation
- Dedicated project case-study pages with multi-image carousels
- Base-path-aware project images and resume links for production hosting
- Supabase-backed project and skill data with local JSON fallbacks
- Admin-only project and skill management through Supabase Auth
- Searchable `react-icons` skill picker and stored icon metadata
- GitHub contribution calendar powered by a server-side GraphQL endpoint
- EmailJS contact form with client-side daily rate limiting
- Context-aware Tawk.to chat widget
- Motion effects with reduced-motion support
- Light and dark themes

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, React Router, Vite 6 |
| Styling | Tailwind CSS 4, DaisyUI, Material UI |
| Animation | Framer Motion |
| Data and authentication | Supabase |
| Contact and chat | EmailJS, Tawk.to |
| Icons | React Icons |
| Deployment | Vercel-compatible serverless API and SPA rewrites |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Copy `.env.example` to `.env.local`, then replace the placeholder values:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ADMIN_EMAIL=your-admin-email@example.com
GITHUB_CLASSIC_TOKEN=your-github-classic-token
```

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Public URL for the Supabase project |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable browser key used for public reads and authentication |
| `VITE_ADMIN_EMAIL` | Email allowed to access admin project and skill controls |
| `GITHUB_CLASSIC_TOKEN` | Server-only token used by the contribution API; `read:user` can include private contribution counts |
| `GITHUB_READ_TOKEN` | Optional fallback when `GITHUB_CLASSIC_TOKEN` is not set |
| `VITE_BASE_PATH` | Optional production asset base; defaults to `/website-portfolio-deploy` |

Never prefix GitHub tokens with `VITE_`, expose a Supabase secret key to the frontend, or commit real credentials.

### 3. Start development

```bash
npm run dev
```

Vite runs at `http://localhost:3000` by default. Restart the server after changing environment variables.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run test:unit` | Run the Node unit-test suite |
| `npm run generate:icons` | Regenerate the searchable React Icons manifest |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Public portfolio homepage |
| `/projects/:slug` | Public project case study and screenshot gallery |
| `/login` | Supabase admin login |
| `/projects` | Admin project management |
| `/skills` | Skill management interface |
| `/contact` | Dedicated contact page |
| `/certificates` | Dedicated certificates page |

Homepage navigation uses section hashes such as `/#experience`, `/#projects`, and `/#contact`.

## Project and Skill Data

The app reads live content from the following Supabase tables:

- `projects`
- `skills`

When live data is unavailable, the app falls back to the reference files in `src/assets/`.

Project records support a main `image`, optional `gallery_images`, a `technologies` text array, and an optional external `link`. Image files remain in `public/`; Supabase stores paths such as `/ipay1.png` rather than uploaded image data.

Skill records use an `icon_key` for React Icons. A legacy `image` value is still maintained for compatibility with older schemas.

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for table definitions, migrations, authentication, and Row Level Security policies. Existing databases may need the documented `gallery_images` and `icon_key` migrations.

## Admin Access

1. Create the admin account in Supabase Auth.
2. Set `VITE_ADMIN_EMAIL` to the same account email.
3. Apply the admin-only write policies from `SUPABASE_SETUP.md`.
4. Open `/login` and authenticate.

Public visitors can read portfolio content, while create, update, and delete operations remain restricted to the configured admin.

## Static Assets and Resume

Static screenshots, icons, portraits, and PDFs live in `public/`. Project galleries use `object-contain` so complete screenshots remain visible across desktop and mobile layouts.

The homepage and footer Resume links both serve:

```text
public/resume-updated.pdf
```

Local asset URLs are resolved against Vite's `import.meta.env.BASE_URL`, allowing them to work under a subdirectory deployment.

## Integrations

### GitHub contributions

Development requests to `/api/github-contributions` are handled by Vite middleware. Production uses the serverless handler in `api/github-contributions.js`. Add the GitHub token to the hosting provider's server environment and redeploy.

### EmailJS

The contact form integration is configured in `src/pages/Contact.jsx`. Update its EmailJS service ID, template ID, and public key when connecting another EmailJS account.

### Tawk.to

The chat widget is implemented in `src/components/TawkChatWidget.jsx`, with page-specific context in `src/data/tawkChatbotContent.js`.

## Production Deployment

`vercel.json` includes an SPA rewrite for non-API routes. Configure the same Supabase, admin, and GitHub environment variables in the deployment dashboard.

The production build defaults to `/website-portfolio-deploy` as its base path. For a root-domain deployment, set:

```env
VITE_BASE_PATH=/
```

For a subdirectory deployment, use its pathname instead, for example `/website-portfolio-deploy/`.

Before deploying, run:

```bash
npm run lint
npm run build
```

## Project Structure

```text
api/                  Serverless API handlers
public/               Static images and resume PDFs
scripts/              Development and manifest utilities
src/
  assets/             Local fallback JSON data
  components/         Shared interface components
  context/            React providers
  data/               Case studies and generated data
  hooks/              Data, authentication, and theme hooks
  layout/             Route layouts
  lib/                Content normalization and utilities
  pages/              Homepage, detail pages, and admin screens
```

## Security Notes

- Keep real credentials in `.env.local`; it is ignored by Git.
- Use only the Supabase publishable key in browser code.
- Keep GitHub tokens server-side.
- Protect write operations with Supabase RLS instead of relying only on hidden frontend controls.
