# Sam Montalvo Jr — Portfolio Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7fe4db5-e077-4f6c-ac6d-eb833ee81b12/deploy-status)](https://app.netlify.com/sites/gallant-hypatia-c82d23/deploys)
[![CI](https://github.com/montal95/reactportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/montal95/reactportfolio/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-4.1.0-blue)](https://github.com/montal95/reactportfolio/releases)

Personal portfolio site for [sammontalvojr.com](https://www.sammontalvojr.com) — built with React 18 and TypeScript, deployed on Netlify, and modernized through a structured six-phase upgrade plan.

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 18 · React Router 6 · Bootstrap 5.3 (tree-shaken) · SCSS |
| Language | TypeScript (strict mode) · JSX via Vite OXC transformer |
| Build | Vite 8 · @vitejs/plugin-react |
| Particles | @tsparticles/react v3 · @tsparticles/slim |
| Hosting | Netlify (continuous deployment from `main`) |
| Testing | Vitest · React Testing Library · Playwright · axe-core |
| CI/CD | GitHub Actions |

---

## What's in Here

Beyond a basic portfolio, this repo includes:

- **TypeScript strict mode** — all source files converted to `.tsx`/`.ts`; `tsc --noEmit` is a required CI gate
- **React 18** — `createRoot` API; concurrent mode enabled
- **Vite 8 build** — route-level code splitting via `React.lazy`, replaces legacy CRA 3.x / Webpack 4
- **Direct data imports** — static `database.ts` with typed interfaces; no axios, no mock adapter
- **WebP image pipeline** — all images converted to WebP (1,726 KB → 560 KB, −68%)
- **Bootstrap tree-shaking** — custom SCSS partial imports only what's used (270 KB → 130 KB, −52%)
- **Security headers** via `public/_headers` — CSP (no `unsafe-inline` in `script-src`), X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Contact form** — Netlify Forms with honeypot spam protection; no third-party SDK
- **Error boundaries** — route-level `ErrorBoundary` catches lazy-load failures gracefully
- **13 unit tests** — Vitest + RTL covering app rendering, contact form validation, honeypot, and fetch paths
- **Playwright E2E** — desktop navigation, mobile hamburger (Pixel 5 viewport), axe-core a11y baseline on all routes
- **Three GitHub Actions workflows** — CI (`ci.yml`), Netlify deploy preview E2E (`e2e-preview.yml`), auto-release (`release.yml`)
- **SEO meta layer** — Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`, preconnect hints
- **Accessibility** — `<main>` landmark, `aria-label` on nav and social icons, skip-to-content, descriptive alt text; axe-core `KNOWN_ISSUES` is empty

---

## Getting Started

**Prerequisites:** Node 22 (see `.nvmrc`)

```bash
nvm use          # switch to Node 22
npm install      # install dependencies
npm start        # Vite dev server at localhost:3000
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Vite dev server at `localhost:3000` with hot reload |
| `npm test` | Vitest unit test suite |
| `npm run build` | Production build to `dist/` |
| `npx tsc --noEmit` | TypeScript type-check (strict mode) |
| `npx playwright test` | Playwright E2E suite |

---

## Testing

```bash
# Unit tests
npm test

# TypeScript type-check
npx tsc --noEmit

# Playwright E2E — desktop + mobile navigation + a11y baseline
npx playwright test
```

Tests are split across:
- `src/App.test.tsx` — app rendering and navigation
- `src/pages/Contact.test.tsx` — form validation, honeypot, bot detection, fetch paths
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

## Modernization History

Six-phase structured upgrade from a CRA 3.4.3 / React 16 / JavaScript baseline:

- ✅ **Phase 1** — Safety net: RTL tests, Playwright E2E, axe-core baseline, CI workflows
- ✅ **Phase 2** — Security headers, honeypot spam protection, CSP hardening
- ✅ **Phase 3** — SEO meta layer, accessibility landmarks, content and data updates; Netlify Forms migration
- ✅ **Phase 4** — Dependency upgrades: axios 1.x, Bootstrap 5.3, React Router v6
- ✅ **Phase 5** — CRA → Vite 8 migration; tsParticles v3; WebP images; Bootstrap tree-shaking; code splitting; TypeScript foundation
- ✅ **Phase 6** — React 18 (`createRoot`); TypeScript strict mode; axios data layer replaced with direct imports; error boundaries; dead code cleanup

---

*Built and maintained by [Sam Montalvo Jr](https://www.sammontalvojr.com)*
