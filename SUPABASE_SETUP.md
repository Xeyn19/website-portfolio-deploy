# Supabase Setup For Portfolio Data

This guide explains how this portfolio uses Supabase for project and skill data.

The actual image files stay in the Vite `public` folder. Supabase stores only text paths such as `/project1.png` or `/html.png`.

Do not commit real Supabase credentials, secret keys, or full inserted data dumps into markdown files.

## Supabase Project

1. Go to https://supabase.com.
2. Create an account or sign in.
3. Create a new project.
4. Save your database password somewhere safe.
5. Open your project dashboard.
6. Go to **Project Settings**.
7. Open **Data API** or **API**.
8. Copy:
   - Project URL
   - Publishable public key

Never use the Supabase secret key in a React frontend. A React/Vite app runs in the browser, so frontend environment variables are public.

## Environment Variables

Create a local `.env.local` file in the project root.

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

Keep `.env.local` private. It is ignored by git through the existing `*.local` rule in `.gitignore`.

For shared documentation, use `.env.example` with placeholder values only.

## Production Environment Variables

For production deployments, add the same variables in the hosting provider dashboard:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

Examples:

- Vercel: Project Settings -> Environment Variables
- Netlify: Site Configuration -> Environment Variables

The local `.env.local` file is not uploaded to production. Production needs its own environment variables configured in the hosting dashboard.

Do not add the Supabase secret key to frontend production environment variables.

## Database Tables

Create these tables in the Supabase SQL Editor.

```sql
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  source_id numeric,
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  image text not null,
  date integer,
  category text,
  link text,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id bigint generated always as identity primary key,
  source_id numeric,
  techname text not null,
  experience text,
  techlink text,
  image text not null,
  created_at timestamptz not null default now()
);
```

Supabase automatically creates a unique `id` for every new row. The CRUD forms do not ask you to type an ID.

`source_id` is only for the old JSON `id` values from the original import. New rows created from the app can leave `source_id` empty.

## Row Level Security

Enable public read access so the portfolio can display projects and skills.

```sql
alter table public.projects enable row level security;
alter table public.skills enable row level security;

create policy "Allow public read projects"
on public.projects
for select
to anon
using (true);

create policy "Allow public read skills"
on public.skills
for select
to anon
using (true);
```

These policies only allow public reads.

## Admin CRUD Auth

The portfolio has admin-only create, edit, and delete controls on the Projects and Skills pages.

1. Open Supabase.
2. Go to **Authentication**.
3. Create an admin user with email and password.
4. Set `VITE_ADMIN_EMAIL` in `.env.local` to the same email.
5. Restart the Vite dev server after changing `.env.local`.

The app only shows CRUD controls when the logged-in user's email matches `VITE_ADMIN_EMAIL`.

## Admin Write Policies

Run these policies in the Supabase SQL Editor. Replace `your-admin-email@example.com` with the same email used in `VITE_ADMIN_EMAIL`.

```sql
create policy "Allow admin insert projects"
on public.projects
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'your-admin-email@example.com');

create policy "Allow admin update projects"
on public.projects
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'your-admin-email@example.com')
with check ((auth.jwt() ->> 'email') = 'your-admin-email@example.com');

create policy "Allow admin delete projects"
on public.projects
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'your-admin-email@example.com');

create policy "Allow admin insert skills"
on public.skills
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'your-admin-email@example.com');

create policy "Allow admin update skills"
on public.skills
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'your-admin-email@example.com')
with check ((auth.jwt() ->> 'email') = 'your-admin-email@example.com');

create policy "Allow admin delete skills"
on public.skills
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'your-admin-email@example.com');
```

Do not create public insert, update, or delete policies for this portfolio.

## Adding Data

Add project and skill rows from the Supabase dashboard:

1. Open **Table Editor**.
2. Select `projects` or `skills`.
3. Click **Insert row**.
4. Copy the matching fields from your local JSON files.
5. Save the row.

Field mapping for `projects`:

- JSON `id` -> `source_id`
- `title` -> `title`
- `description` -> `description`
- `technologies` -> `technologies`
- `image` -> `image`
- `date` -> `date`
- `category` -> `category`
- `link` -> `link`

Field mapping for `skills`:

- JSON `id` -> `source_id`
- `techname` -> `techname`
- `experience` -> `experience`
- `techlink` -> `techlink`
- `image` -> `image`

Do not paste full production row values into this README. Keep the inserted content in Supabase.

When adding new rows from the React app, you do not need to fill in `id` or `source_id`. Supabase generates `id` automatically.

## React Connection

Install the Supabase client:

```bash
npm install @supabase/supabase-js
```

The shared client lives in `src/lib/supabaseClient.js` and reads:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

The Projects page reads from `public.projects`.

```js
const { data, error } = await supabase
  .from('projects')
  .select('id, source_id, title, description, technologies, image, date, category, link')
  .order('date', { ascending: false })
```

Admin users can also create, update, and delete rows from `public.projects`.

The Skills page reads from `public.skills`.

```js
const { data, error } = await supabase
  .from('skills')
  .select('id, source_id, techname, experience, techlink, image')
  .order('id', { ascending: true })
```

Admin users can also create, update, and delete rows from `public.skills`.

## Images

Images and icons are not uploaded to Supabase Storage in this setup.

Keep the files in the Vite `public` folder. Store only the path string in Supabase.

Example path format:

```txt
/project-image.png
/technology-icon.svg
```

React can render those paths normally:

```jsx
<img src={project.image} alt={project.title} />
```

## Verification

Run the app:

```bash
npm run dev
```

Check:

- Projects page loads data from Supabase.
- Skills page loads data from Supabase.
- Project filters still work.
- Images and icons still load from local public paths.
- Visiting `/login` opens the admin login modal.
- Admin login works for the configured `VITE_ADMIN_EMAIL`.
- Add, edit, and delete work for both projects and skills.

Build the app:

```bash
npm run build
```

## Production Checklist

Before deploying CRUD to production, confirm:

- `VITE_SUPABASE_URL` is added in the host dashboard.
- `VITE_SUPABASE_PUBLISHABLE_KEY` is added in the host dashboard.
- `VITE_ADMIN_EMAIL` is added in the host dashboard.
- The admin user exists in Supabase Auth.
- Public read RLS policies exist for `anon` and `authenticated` users.
- Admin write RLS policies exist for create, update, and delete.
- `/login` opens the React app in production.
- No Supabase secret key is exposed in frontend environment variables.

If `/login` returns a 404 after deployment, configure the host to rewrite all routes to `index.html`.

## Troubleshooting

If the page is blank or data does not load, check the browser console.

If Supabase returns a permission error, confirm the public `select` RLS policies exist.

If admin save or delete fails, confirm the admin write policies use the exact same email as `VITE_ADMIN_EMAIL`.

If data is empty, confirm the table names are exactly `projects` and `skills`.

If env variables are missing, confirm `.env.local` exists and restart the dev server.

In production, confirm the variables exist in the hosting provider dashboard and redeploy after changing them.

If `/login` works locally but not in production, configure a React Router fallback/rewrite to `index.html`.

If images are broken, confirm the files exist in the Vite `public` folder and the Supabase path starts with `/`.
