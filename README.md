# Sam Montalvo Jr — Portfolio Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7fe4db5-e077-4f6c-ac6d-eb833ee81b12/deploy-status)](https://app.netlify.com/sites/gallant-hypatia-c82d23/deploys)
[![CI](https://github.com/montal95/reactportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/montal95/reactportfolio/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-2.3.0-blue)](https://github.com/montal95/reactportfolio/releases)

Personal portfolio site for [sammontalvojr.com](https://www.sammontalvojr.com) — built with React, deployed on Netlify, and actively modernized through a structured upgrade plan.

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 16.9 · React Router 6 · Bootstrap 5 · SCSS |
| Build | Create React App 3.4.3 (Vite migration planned) |
| Hosting | Netlify (continuous deployment from `main`) |
| Testing | React Testing Library · Playwright · axe-core |
| CI/CD | GitHub Actions |

---

## What's in Here

Beyond a typical CRA starter, this repo includes:

- **Security headers** via `public/_headers` — Content Security Policy, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Contact form spam protection** — honeypot field with offscreen CSS, `tabIndex="-1"`, and `autoComplete="off"`
- **17 unit tests** covering app rendering, navigation, contact form validation, bot detection, and honeypot behavior
- **Playwright E2E tests** for desktop navigation, mobile hamburger menu (Pixel 5 viewport), and all route links
- **axe-core accessibility baseline** on every route — only `color-contrast` is intentionally deferred
- **Three GitHub Actions workflows** — CI (`ci.yml`), Netlify deploy preview E2E (`e2e-preview.yml`), and auto-release (`release.yml`)
- **SEO meta layer** — Open Graph, Twitter Card, `meta description`, `sitemap.xml`, `robots.txt`
- **Accessibility landmarks** — `<main>` landmark, `aria-label` on nav and all social icon links, skip-to-content link, descriptive `alt` attributes
- **Netlify Forms** contact submission (no third-party SDK, no API keys in the bundle)

---

## Getting Started

**Prerequisites:** Node 20 (see `.nvmrc`)

```bash
nvm use          # switch to Node 20
npm install      # install dependencies
npm start        # start dev server at localhost:3000
```

> The build requires `NODE_OPTIONS=--openssl-legacy-provider` (already wired into `package.json` scripts) to run on Node 17+ with CRA 3.x.

---

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server at `localhost:3000` with hot reload |
| `npm test` | Unit tests in watch mode (React Testing Library) |
| `npm run build` | Production build to `build/` |
| `npm run test:e2e` | Playwright E2E suite (requires running dev server) |

---

## Testing

```bash
# Unit tests (runs in watch mode by default)
npm test

# Run once with coverage
CI=true npm test

# Playwright E2E — desktop + mobile navigation + a11y baseline
npx playwright test
```

Tests are split across:
- `src/App.test.js` — app rendering and navigation
- `src/pages/Contact.test.js` — form validation, honeypot, bot detection
- `e2e/navigation.spec.js` — desktop Playwright suite
- `e2e/mobile-navigation.spec.js` — mobile Playwright suite (Pixel 5 viewport)
- `e2e/accessibility.spec.js` — axe-core on all routes

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — triggers Netlify deploy and auto-release |
| `development` | Integration — all feature branches merge here first |
| `feature/*` / `phase*/` | Scoped feature or upgrade work |

PRs go to `development`. Releases go to `main` via a versioned release branch. The `release.yml` workflow tags and publishes the GitHub Release automatically when `package.json` version changes on `main`.

---

## Ongoing Modernization

The site is mid-way through a structured dependency and architecture upgrade:

- ✅ **Phase 1** — Safety net: RTL tests, Playwright E2E, axe-core baseline, CI workflows
- ✅ **Phase 2** — Security headers, honeypot spam protection, CSP hardening
- ✅ **Phase 3** — SEO meta layer, accessibility landmarks, content and data updates
- ✅ **Phase 4** — Dependency upgrades: axios 1.x, Bootstrap 5, React Router v6; Netlify Forms migration
- 🔜 **Phase 5** — CRA → Vite migration, code splitting, WebP image pipeline
- 🔜 **Phase 6** — React 18, TypeScript migration, error boundaries, dead code cleanup

---

*Built and maintained by [Sam Montalvo Jr](https://www.sammontalvojr.com)*
