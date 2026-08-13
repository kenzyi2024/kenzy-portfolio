# Deploying the Portfolio

This is a static Vite + React site — it builds to plain HTML/CSS/JS in `dist/` and can be hosted anywhere. It's currently on **Vercel**; instructions for that and a couple of alternatives are below.

## Build settings (any host)

| Setting | Value |
|---|---|
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18+ (20 LTS recommended) |
| Local preview of the build | `npm run preview` |

There is no backend and no server-side rendering, so no runtime environment is required — just static hosting.

## Deploy to Vercel (recommended)

### Option A — Git integration (auto-deploys on every push)
1. Push this repo to GitHub (or GitLab/Bitbucket).
2. At [vercel.com/new](https://vercel.com/new), **Import** the repository.
3. Vercel auto-detects Vite. Confirm: Build `npm run build`, Output `dist`.
4. Click **Deploy**. Every push to the main branch redeploys; pull requests get preview URLs.

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel          # first run links/creates the project (accept Vite defaults)
vercel --prod   # promote to production
```

### Custom domain (kenzyibrahim.com)
1. Vercel project → **Settings → Domains → Add** `kenzyibrahim.com` (and `www`).
2. At your registrar, point DNS to Vercel:
   - Apex `kenzyibrahim.com` → **A** record `76.76.21.21`, **or** an `ALIAS`/`ANAME` to `cname.vercel-dns.com`.
   - `www` → **CNAME** `cname.vercel-dns.com`.
3. Vercel provisions HTTPS automatically once DNS resolves.

> The Open Graph tags in `index.html` use absolute URLs (`https://kenzyibrahim.com/og-image.png`). If you deploy under a different domain, update those `og:image` / `og:url` / `twitter:image` URLs so link previews render.

## Contact form in production

The form works with no setup (it falls back to opening the visitor's mail client). To receive submissions by email:

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint.
2. Set `FORM_ENDPOINT` near the top of `src/App.jsx` to that URL, commit, and redeploy.

If you'd rather not hardcode it, you can read it from a Vite env var instead:
```js
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/your_form_id';
```
Then add `VITE_FORM_ENDPOINT` under Vercel → Settings → Environment Variables (only `VITE_`-prefixed vars are exposed to the client, which is fine — a Formspree endpoint is not a secret).

## Alternatives

**Netlify** — New site from Git; build `npm run build`, publish directory `dist`. For SPA routing add a `public/_redirects` file with `/*  /index.html  200` (not needed today since the site is a single page with hash anchors, but harmless).

**GitHub Pages** — Works, but the base path differs. In `vite.config.js` set `base: '/<repo-name>/'` (unless using a custom domain at the apex), run `npm run build`, and publish `dist/` via the `gh-pages` branch or an Actions workflow.

## Pre-deploy checklist
- [ ] `npm run build` succeeds locally
- [ ] `npm run lint` is clean
- [ ] Résumé at `src/assets/resume.pdf` is the current version
- [ ] `FORM_ENDPOINT` set (or intentionally left on the mailto fallback)
- [ ] OG/Twitter URLs match the final domain
- [ ] Spot-check light/dark toggle and the contact form on the deployed URL
