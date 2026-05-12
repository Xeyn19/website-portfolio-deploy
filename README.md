# Portfolio Website

A modern personal portfolio built with React, Vite, and Tailwind CSS.

## Highlights
- Project gallery with category filters and newest-first sorting
- Full-Stack projects shown by default on the public project views
- Admin CRUD for projects and skills through Supabase Auth
- Project detail pages with carousel-ready multiple screenshots
- Motion-driven sections using Framer Motion
- Light/dark theme styling
- Contact form powered by EmailJS with basic rate limiting
- Fully responsive layout

## Tech Stack
- React 19
- Vite 6
- Tailwind CSS 4 + DaisyUI
- Framer Motion
- EmailJS
- Supabase

## Project Data
Projects and skills are loaded from Supabase tables:
- `projects`
- `skills`

Local JSON files in `src/assets/` are the original source data/reference files.

Images and icons are not stored in Supabase. They stay in the Vite `public` folder, while Supabase stores only path strings such as `/project1.png` or `/html.png`.

Projects support:
- a required main detail image
- optional additional detail images through `gallery_images`
- tech stack values stored as a `text[]` array
- optional external link values for live sites or repositories

## Supabase Setup
Create a local `.env.local` file with your own Supabase values:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ADMIN_EMAIL=your-admin-email@example.com
GITHUB_CLASSIC_TOKEN=your-github-classic-token-with-read-user
```

Do not commit real Supabase credentials or secret keys.

See `SUPABASE_SETUP.md` for the full setup and connection guide.

## GitHub Contributions Setup
The homepage contribution calendar uses a server-side GitHub GraphQL request so it can stay closer to your real GitHub profile activity.

Preferred local and production setup:

```env
GITHUB_CLASSIC_TOKEN=your-github-classic-token-with-read-user
```

Optional fallback variable:

```env
GITHUB_READ_TOKEN=your-optional-github-read-token
```

Notes:
- `GITHUB_CLASSIC_TOKEN` is preferred over `GITHUB_READ_TOKEN`.
- Use a classic personal access token with the `read:user` scope if you want private contribution counts to be included.
- Do not prefix these variables with `VITE_`. They must stay server-side only.
- In production, add the same variable in your hosting provider environment settings and redeploy.
- On localhost, restart `npm run dev` after changing `.env.local` so the Vite dev API middleware picks up the new token.

The local dev server now serves `/api/github-contributions`, and production uses the Vercel function in `api/github-contributions.js`.

## Admin CRUD
Projects and skills support admin-only create, edit, and delete controls.

To use CRUD:
- Create an admin user in Supabase Auth.
- Set `VITE_ADMIN_EMAIL` in `.env.local` to that admin user's email.
- Add the admin-only write policies from `SUPABASE_SETUP.md`.
- Visit `/login` directly in the browser to open the admin login modal.

Project admin form notes:
- The main image field is for the first image shown on the project detail page.
- Additional project screenshots are optional and feed the detail-page carousel.
- Tech stack is selected from one multi-select list based on your portfolio skills/current project data.
- Link is optional, so projects without a live site or repository can still be saved.

## Production CRUD
CRUD works in production when the deployed site has the same required environment variables:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ADMIN_EMAIL=your-admin-email@example.com
GITHUB_CLASSIC_TOKEN=your-github-classic-token-with-read-user
```

Add these in the hosting provider dashboard, such as Vercel or Netlify. The local `.env.local` file is only used on your computer.

Production also requires:
- The admin user exists in Supabase Auth.
- RLS policies allow public reads and admin writes.
- The deployment supports React Router fallback so `/login` loads the React app instead of a 404 page.
- If you want the GitHub contribution calendar to match your profile more closely, the deployment must include `GITHUB_CLASSIC_TOKEN`.

Never add the Supabase secret key to frontend production environment variables.

## Getting Started
```bash
npm install
npm run dev
```

## Build And Preview
```bash
npm run build
npm run preview
```

## Scripts
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Notes
- If your existing Supabase `projects` table was created before gallery support was added, run the `gallery_images` migration from `SUPABASE_SETUP.md`.
- Public project reads fall back gracefully for older tables, but multiple detail images require the `gallery_images` column to persist properly.

## EmailJS Setup
Update the EmailJS identifiers in `src/pages/Contact.jsx`:
- Service ID
- Template ID
- Public key
