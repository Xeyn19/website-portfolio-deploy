# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React portfolio app. Main application code lives in `src/`:
- `src/pages/` route-level screens such as `HomePage.jsx`, `Projects.jsx`, and `Skills.jsx`
- `src/components/` shared UI pieces
- `src/hooks/`, `src/context/`, and `src/lib/` for state, providers, and utility logic
- `src/data/` generated/static data such as the `react-icons` manifest
- `src/assets/` fallback JSON content

Static images and PDFs live in `public/`. Serverless/API code lives in `api/`. Utility scripts live in `scripts/`, notably `scripts/generate-react-icons-manifest.mjs`.

## Build, Test, and Development Commands
- `npm install` — install dependencies
- `npm run dev` — start the local Vite dev server
- `npm run build` — create a production build in `dist/`
- `npm run preview` — preview the built app locally
- `npm run lint` — run ESLint on `js`/`jsx` files
- `npm run generate:icons` — rebuild `src/data/reactIconsManifest.js` from installed `react-icons`

## Coding Style & Naming Conventions
Use 2-space indentation and ES modules. Components, pages, layouts, and providers use `PascalCase` filenames; hooks use `camelCase` with a `use` prefix; utility modules use descriptive `camelCase` names.

Keep React components functional and colocate small helpers near the feature that uses them. Follow existing Tailwind utility patterns instead of introducing a parallel styling approach. ESLint is the main style gate; fix warnings you introduce when practical.

## Testing Guidelines
There is no dedicated test framework configured yet. Treat verification as:
- `npm run lint`
- `npm run build`
- manual browser checks for affected routes and admin flows

For UI changes, verify responsive behavior and any Supabase-backed CRUD paths you touch.

## Commit & Pull Request Guidelines
Recent commits use short, imperative, lowercase summaries such as `fixed 404 page` and `modify tutoycorp project`. Keep commits focused and descriptive, ideally one concern per commit.

Pull requests should include:
- a clear summary of the user-visible change
- any config or schema prerequisites (`.env.local`, Supabase tables/policies)
- screenshots or short recordings for UI changes
- the verification steps you ran

## Security & Configuration Tips
Never commit real credentials. Keep secrets in `.env.local`. Frontend code should only use publishable Supabase keys; secret keys stay server-side only.
