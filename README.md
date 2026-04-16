# Portfolio Website

A modern personal portfolio built with React, Vite, and Tailwind CSS.

## Highlights
- Project gallery with category and year filters (sorted newest first)
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

## Supabase Setup
Create a local `.env.local` file with your own Supabase values:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Do not commit real Supabase credentials or secret keys.

See `SUPABASE_SETUP.md` for the full setup and connection guide.

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

## EmailJS Setup
Update the EmailJS identifiers in `src/pages/Contact.jsx`:
- Service ID
- Template ID
- Public key
