// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Responsive Smoke Tests — Phase 8
 *
 * Two concerns:
 *
 * 1. No horizontal overflow at any tested breakpoint x route combo.
 *    A scrollWidth wider than the viewport means something is escaping
 *    its container — this catches it automatically across all pages.
 *
 * 2. Nav UI state matches the breakpoint: hamburger and desktop links
 *    appear/disappear at the correct threshold (768px).
 *
 * These are smoke tests, not interaction tests. They answer:
 * "does anything obviously break at this size?" — not "does every
 * feature work?" The existing navigation and mobile-navigation specs
 * cover interaction.
 *
 * Viewport matrix:
 *   mobile  — 375 x 812   (iPhone 14)
 *   tablet  — 768 x 1024  (iPad portrait — the nav collapse breakpoint)
 *   desktop — 1280 x 800
 *   wide    — 1440 x 900
 */

const VIEWPORTS = [
  { name: 'mobile',  width: 375,  height: 812  },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1280, height: 800  },
  { name: 'wide',    width: 1440, height: 900  },
];

const ROUTES = ['/', '/about', '/resume', '/work', '/contact'];

// ---------------------------------------------------------------------------
// 1. Horizontal overflow — every viewport x every route
// ---------------------------------------------------------------------------

test.describe('No horizontal overflow', () => {
  for (const vp of VIEWPORTS) {
    test.describe(`${vp.name} (${vp.width}px)`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      for (const route of ROUTES) {
        test(`${route} has no horizontal scroll`, async ({ page }) => {
          await page.goto(route);
          // Brief wait for Framer Motion entrance animations to settle
          await page.waitForTimeout(600);

          // Check document-level scroll width — fixed decorative elements
          // (e.g. ambient orbs) don't contribute to scrollWidth, so this
          // correctly measures actual layout overflow only.
          const hasOverflow = await page.evaluate(() => {
            const el = document.documentElement;
            return el.scrollWidth > el.clientWidth + 1;
          });

          if (hasOverflow) {
            // Log offending elements to aid debugging in CI output
            const offenders = await page.evaluate(() => {
              const results = [];
              document.querySelectorAll('*').forEach((node) => {
                const style = window.getComputedStyle(node);
                if (style.position === 'fixed' || style.position === 'absolute') return;
                const rect = node.getBoundingClientRect();
                if (rect.right > window.innerWidth + 1) {
                  results.push({
                    tag: node.tagName,
                    id: node.id || null,
                    classes: node.className || null,
                    right: Math.round(rect.right),
                    viewportWidth: window.innerWidth,
                  });
                }
              });
              return results;
            });
            console.log(
              `Overflow on ${route} at ${vp.width}px:`,
              JSON.stringify(offenders, null, 2)
            );
          }

          expect(hasOverflow).toBe(false);
        });
      }
    });
  }
});

// ---------------------------------------------------------------------------
// 2. Nav UI state — hamburger vs. desktop links per breakpoint
// ---------------------------------------------------------------------------

test.describe('Nav responsive state', () => {
  /**
   * Below 768px: hamburger visible, desktop nav links hidden.
   * At 768px and above: desktop nav links visible, hamburger hidden.
   *
   * We test 375px (clearly mobile) and 1280px (clearly desktop).
   * 768px itself is the boundary — tested separately below (TICKET-02).
   */

  test.describe('mobile (375px) — hamburger visible, desktop links hidden', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test.beforeEach(async ({ page }) => { await page.goto('/'); });

    test('hamburger button is visible', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    });

    test('desktop nav links are not visible', async ({ page }) => {
      await expect(page.locator('nav .nav-links')).toBeHidden();
    });
  });

  test.describe('desktop (1280px) — desktop links visible, hamburger hidden', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => { await page.goto('/'); });

    test('desktop nav links are visible', async ({ page }) => {
      await expect(page.locator('nav .nav-links')).toBeVisible();
    });

    test('hamburger button is not visible', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden();
    });
  });

  // TICKET-02: hamburger interaction at the last mobile pixel (767px).
  // The CSS breakpoint is `max-width: 767px` — at 768px the desktop nav
  // is already visible. 767px is the highest pixel inside mobile territory.
  test.describe('mobile-max (767px) — last pixel before desktop nav appears', () => {
    test.use({ viewport: { width: 767, height: 1024 } });

    test.beforeEach(async ({ page }) => { await page.goto('/'); });

    test('hamburger button is visible at 767px', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    });

    test('opens the mobile menu at 767px', async ({ page }) => {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
    });

    test('closes the mobile menu at 767px', async ({ page }) => {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      await page.getByRole('button', { name: 'Close menu' }).click();
      await expect(page.locator('#mobile-menu')).toBeHidden();
    });
  });
});
