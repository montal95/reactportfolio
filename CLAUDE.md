# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Personal portfolio site (sammontalvojr.com) built with **Next.js 16 App Router**, **React 19**, and **TypeScript (strict mode)**. Deployed on Netlify with continuous deployment from `main`.

**Core stack:**
- Next.js 16.2.1 (App Router)
- React 19.2.4
- TypeScript 5.9.3 (strict mode, `tsc --noEmit` required in CI)
- Framer Motion 12 (page transitions)
- Native CSS with `@layer` architecture (no SCSS, no Tailwind)
- Vitest + React Testing Library (unit tests)
- Playwright + axe-core (E2E and accessibility)

---

## Commands

### Development
```bash
npm run dev              # Next.js dev server at localhost:3000
npm run build            # Production build to .next/
npm start                # Serve production build
```

### Testing
```bash
npm test                 # Vitest unit tests (watch mode)
npm run test:coverage    # Vitest with @vitest/coverage-v8 → coverage/ HTML report
npx tsc --noEmit         # TypeScript type-check (strict mode)
npx playwright test      # Playwright E2E suite (desktop + mobile + a11y)
npm run test:e2e:ui      # Playwright UI mode for debugging
```

### CI Gates
All PRs must pass:
1. `npm test` (unit tests)
2. `npx tsc --noEmit` (type-check)
3. `npm run build` (production build)
4. `npx playwright test` (E2E + accessibility baseline)

> **Environment quirk:** `NODE_ENV=production` is set system-wide on the dev machine. Always run `npm install --include=dev` to avoid missing devDependencies. The `env: { NODE_ENV: 'test' }` block in `vitest.config.ts` overrides this at test runtime — do not remove it.

---

## Architecture

### Routing & Page Transitions
- **File-based routing** via Next.js App Router: `app/`, `app/about/`, `app/contact/`, `app/resume/`, `app/work/`
- **Page transitions**: `app/template.tsx` (remounts on navigation) + `TransitionProvider` (AnimatePresence wrapper in `layout.tsx`)
  - Framer Motion hooks into `template.tsx` unmount/remount lifecycle
  - Exit animation fires on navigation away; entrance animation fires on navigation in
  - `TransitionProvider` coordinates "exit before enter" via `AnimatePresence mode="wait"`

### Theme System
- **ThemeProvider** (`app/components/ThemeProvider.tsx`): React Context + `localStorage` persistence
- Theme applied via `data-theme` attribute on `<html>` element
- CSS custom properties respond to `[data-theme="light"]` / `[data-theme="dark"]`
- Toggled via `Nav` component's theme button

### CSS Architecture
- **`@layer` cascade order**: `reset → tokens → base → components → pages`
- All styles in `app/globals.css`
- Typed custom properties via `@property` for colors (e.g., `--accent`, `--bg`, `--text-heading`)
- Themes switch via `[data-theme]` selectors that reassign custom property values
- Zero external CSS frameworks

### Font Loading
- **Next.js `next/font`** preloading in `app/layout.tsx`:
  - Syne (headings): `--font-syne`
  - IBM Plex Sans (body): `--font-ibm-plex-sans`
  - JetBrains Mono (code): `--font-jetbrains-mono`
- Applied via CSS variable classes on `<html>` element

### Data Layer
- All site data lives in `lib/data/database.ts` + `lib/data/types/` — typed static objects, no HTTP, no axios
- `information.available: boolean` controls the "Available for work" badge rendered in the hero
- `socialLinks` includes: `github`, `linkedin`, `x`, `twitch`, `medium`
- Direct ES module imports only — no async lifecycle, no loading state

### Contact Form
- **Netlify Forms** backend (no third-party SDK)
- Honeypot field (`website`) for spam protection
- Netlify reCAPTCHA v2 widget injected at deploy time via `<div data-netlify-recaptcha="true" />`
- Static HTML form reference: `public/forms.html` (required for Netlify's build-time scanner)
- Submission logic in `app/components/ContactForm.tsx`:
  - Client-side validation before send
  - FormData POST to `/` with `application/x-www-form-urlencoded` encoding
  - Honeypot silently succeeds for bots

### Testing Strategy
**Unit tests** (`app/components/__tests__/`):
- Nav.test.tsx: rendering, theme toggle
- ContactForm.test.tsx: validation, honeypot, fetch paths (13 tests)
- SocialRow.test.tsx, ThemeProvider.test.tsx, HeroContent.test.tsx

**E2E tests** (`e2e/`):
- `navigation.spec.js`: desktop navigation flow
- `mobile-navigation.spec.js`: mobile hamburger (Pixel 5 viewport)
- `accessibility.spec.js`: axe-core baseline on all routes (KNOWN_ISSUES array is empty)

**Vitest config** (`vitest.config.ts`):
- `env: { NODE_ENV: 'test' }` override to prevent OS-level `production` from breaking React DevTools in tests
- Path alias: `@` maps to project root

**Playwright config** (`playwright.config.js`):
- Supports two modes: local dev server (default) or Netlify preview (set `PLAYWRIGHT_BASE_URL`)
- Projects: chromium, firefox, mobile-chrome (Pixel 5)
- Auto-starts `next dev` if no external URL provided

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — triggers Netlify deploy and auto-release workflow |
| `development` | Integration — all feature branches merge here first |
| `release/vX.Y.Z` | Version release branch (merges to `main` after approval) |
| `feature/*` | Scoped feature work |

**PR flow:**
1. Feature branches → `development`
2. `development` → `release/vX.Y.Z` → `main` (triggers deploy + GitHub Release)

---

## Deployment

- **Netlify** continuous deployment from `main`
- Uses `@netlify/plugin-nextjs` v5 for Next.js 15+ compatibility
- Security headers defined in `public/_headers`
- Build command: `npm run build`
- Publish directory: `.next`

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout: fonts, metadata, ThemeProvider, Nav, TransitionProvider |
| `app/template.tsx` | Framer Motion page transition wrapper (remounts on navigation) |
| `app/globals.css` | Entire design system: tokens, reset, base, components, pages |
| `app/components/ThemeProvider.tsx` | Theme context + localStorage persistence |
| `app/components/ContactForm.tsx` | Netlify Forms integration with honeypot + reCAPTCHA |
| `vitest.config.ts` | Vitest setup with NODE_ENV override |
| `playwright.config.js` | Playwright E2E config (local + Netlify preview support) |
| `public/forms.html` | Static form reference for Netlify build-time scanner |
| `public/_headers` | Netlify security headers (CSP, HSTS, etc.) |

---

## TypeScript Notes

- **Strict mode enabled** (`tsconfig.json`)
- All source files are `.tsx` / `.ts`
- `tsc --noEmit` is a CI gate — must pass before merge
- Path alias: `@/*` maps to project root

---

## Development Practices

### Test-Driven Development (TDD)

**This project uses strict Red → Green → Refactor. No implementation code is written before a failing test exists.**

#### The cycle — enforced for every feature and bug fix

1. **Red** — Write the test. Run it. Confirm it fails for the right reason (not a setup error, not a missing import — the actual assertion fails because the behavior doesn't exist yet).
2. **Green** — Write the minimum code to make the test pass. Do not over-engineer. Do not write code that isn't required by a test.
3. **Refactor** — Clean up duplication and structure while keeping the suite green. Run tests again after refactoring.

#### Rules
- Never write implementation code without a failing test first. If you're about to create a component or function, write the test file first.
- A test that passes immediately (without any implementation) is not a red — it means the test is wrong. Fix the test.
- `npm test` must be green before committing at any step. A red suite does not get committed.
- Skipped or `todo` tests must be explicitly discussed — not used to sidestep the cycle.

Place unit tests in `app/components/__tests__/` following existing patterns (Nav.test.tsx, ContactForm.test.tsx, etc.).

---

## Known Issues — Do Not "Fix" Without Checking the Audit

The following are tracked, intentionally deferred issues. The full plan lives in the Obsidian vault (`Sam's Notepad/01-Projects/Personal Portfolio/reactportfolio-audit.md`). Do not create ad-hoc fixes for these without confirming the phase is active.

| Area | Issue | Deferred to |
|---|---|---|
| Theme / FOUC | `data-theme` set in `useEffect` causes dark flash on load; fix requires inline blocking script in `<head>` + `suppressHydrationWarning` on `<html>` | Phase 9 |
| Page transitions | Hero CTAs use bare `<a>` tags instead of `<Link>`, causing full-page reloads that bypass the router and break exit animations | Phase 10 |
| Page transitions | `AnimatePresence` child needs a `pathname` key for exit animations to fire on navigation | Phase 10 |
| Particles | `ParticlesBackground` loads `@tsparticles/slim` synchronously (~280KB); no `prefers-reduced-motion` guard | Phase 11 |
| Dependencies | `react-on-screen` and `fslightbox-react` are in `package.json` with no confirmed consumers — flagged for removal | Phase 8 |
| CSP | `data:` present in `font-src` is unnecessary (next/font serves from `/_next/static/`) | Phase 14 |
