# Sam Montalvo Jr — Portfolio Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7fe4db5-e077-4f6c-ac6d-eb833ee81b12/deploy-status)](https://app.netlify.com/sites/gallant-hypatia-c82d23/deploys)
[![CI](https://github.com/montal95/reactportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/montal95/reactportfolio/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-5.0.1-blue)](https://github.com/montal95/reactportfolio/releases)

Personal portfolio site for [sammontalvojr.com](https://www.sammontalvojr.com) — built with Next.js 15 App Router and React 19, deployed on Netlify.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 · Framer Motion · native CSS (`@layer` architecture) |
| Language | TypeScript 5 (strict mode) |
| Fonts | `next/font` (Inter + JetBrains Mono — zero layout shift) |
| Hosting | Netlify · `@netlify/plugin-nextjs` v5 (continuous deployment from `main`) |
| Testing | Vitest · React Testing Library · Playwright · axe-core |
| CI/CD | GitHub Actions |

---

## What's in Here

Beyond a basic portfolio, this repo includes:

- **Next.js 15 App Router** — file-based routing, server components, `template.tsx` for Framer Motion page transitions
- **React 19** — concurrent features; zero class components
- **Framer Motion transitions** — per-page entrance animations via `template.tsx` remount pattern; hero section entrance sequence
- **Native CSS design system** — `@layer reset, tokens, base, components, pages` with CSS custom properties; no SCSS, no Tailwind
- **Dark / light theme** — `ThemeProvider` sets `data-theme` on `<html>`, persisted to `localStorage`
- **TypeScript strict mode** — all source files in `.tsx` / `.ts`; `tsc --noEmit` is a required CI gate
- **Static data layer** — typed interfaces in `app/data/types/`; no axios, no mock adapter
- **Contact form** — Netlify Forms with honeypot spam protection; `public/forms.html` static page for build-time scanner detection; no third-party SDK
- **36 unit tests** — Vitest + React Testing Library covering Nav, ContactForm, SocialRow, ThemeProvider, and HeroContent components; `test.env: { NODE_ENV: 'test' }` override for OS-level `production` environments
- **Vitest coverage** — `@vitest/coverage-v8`; `npm run test:coverage` generates HTML + text reports; uploaded as CI artifact
- **Playwright E2E** — desktop navigation, mobile hamburger (Pixel 5 viewport), axe-core a11y baseline on all routes; `exact: true` locators prevent strict-mode violations
- **Three GitHub Actions workflows** — CI (`ci.yml`), Netlify deploy preview E2E (`e2e-preview.yml`), auto-release (`release.yml`)
- **Accessibility** — axe-core KNOWN_ISSUES is empty across all routes; skip-to-content link, `aria-label` on nav and social icons, descriptive alt text, WCAG 2.1 AA color contrast
- **SEO meta layer** — Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`, `next/font` preloading, preconnect hints

---

## Getting Started

**Prerequisites:** Node 22 (see `.nvmrc`)

```bash
nvm use          # switch to Node 22
npm install      # install dependencies
npm run dev      # Next.js dev server at localhost:3000
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server at `localhost:3000` with Fast Refresh |
| `npm test` | Vitest unit test suite (watch mode) |
| `npm run test:coverage` | Vitest with `@vitest/coverage-v8` — generates `coverage/` report |
| `npm run build` | Production build to `.next/` |
| `npx tsc --noEmit` | TypeScript type-check (strict mode) |
| `npx playwright test` | Playwright E2E suite |

---

## Testing

```bash
# Unit tests
npm test

# Unit tests with coverage report
npm run test:coverage

# TypeScript type-check
npx tsc --noEmit

# Playwright E2E — desktop + mobile navigation + a11y baseline
npx playwright test
```

Tests are organized as:

- `app/components/__tests__/Nav.test.tsx` — Nav rendering and theme toggle (4 tests)
- `app/components/__tests__/ContactForm.test.tsx` — form validation, honeypot, bot detection, fetch paths (13 tests)
- `app/components/__tests__/SocialRow.test.tsx` — social link rendering
- `app/components/__tests__/ThemeProvider.test.tsx` — theme context and `localStorage` persistence
- `app/components/__tests__/HeroContent.test.tsx` — hero section rendering
- `e2e/navigation.spec.js` — desktop Playwright suite
- `e2e/mobile-navigation.spec.js` — mobile Playwright suite (Pixel 5 viewport)
- `e2e/accessibility.spec.js` — axe-core on all routes

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — triggers Netlify deploy and auto-release |
| `development` | Integration — all feature branches merge here first |
| `feature/nextjs-migration` | v5.0.0 Next.js rebuild (in final approach) |
| `feature/*` / `phase*/` | Scoped feature or upgrade work |

PRs go to `development`. Releases go to `main` via a versioned release branch (`release/vX.Y.Z`). The `release.yml` workflow tags and publishes the GitHub Release automatically when `package.json` version changes on `main`.

---

## Modernization History

Complete history from CRA 3.4.3 / React 16 / JavaScript baseline to a Next.js 15 / React 19 / TypeScript application:

- ✅ **Phase 1** — Safety net: RTL tests, Playwright E2E, axe-core baseline, CI workflows
- ✅ **Phase 2** — Security headers, honeypot spam protection, CSP hardening
- ✅ **Phase 3** — SEO meta layer, accessibility landmarks, content and data updates
- ✅ **Standalone** — Netlify Forms migration; `emailjs-com` removed; no client-side API keys
- ✅ **Phase 4** — Dependency upgrades: axios 1.x, Bootstrap 5.3, React Router v6, tsParticles v3
- ✅ **Phase 5** — CRA → Vite migration; WebP image pipeline; Bootstrap tree-shaking; code splitting; TypeScript foundation
- ✅ **Phase 6** — React 18 (`createRoot`); TypeScript strict mode; static data layer; error boundaries; dead code cleanup
- ✅ **Phase 7** — Dependency cleanup: `react-lineicons` → `react-feather`; skill chips; expanded services; zero high/critical audit findings
- ✅ **Next.js migration (Phases A–J)** — Full App Router rebuild with React 19, Framer Motion, native CSS design system, and updated CI; v5.0.0 in final approach on `feature/nextjs-migration`

---

*Built and maintained by [Sam Montalvo Jr](https://www.sammontalvojr.com)*
