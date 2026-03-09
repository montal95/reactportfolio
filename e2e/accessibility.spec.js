// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Accessibility (a11y) E2E Tests
 *
 * Uses axe-core to run automated accessibility audits
 * against each major route. This establishes the baseline
 * that Phase 3 (Content & SEO) will improve upon.
 *
 * Note: These tests will initially flag known issues
 * (missing landmarks, weak alt text, etc.) that are
 * documented in the audit. We disable specific rules
 * for now and track them as future fixes.
 */

// Rules to skip until Phase 3 addresses them
const KNOWN_ISSUES = [
  'color-contrast',   // Needs manual verification — Phase 3
  'landmark-one-main', // No <main> landmark yet — Phase 3
  'region',           // Content not in landmark regions — Phase 3
];

const ROUTES = ['/', '/about', '/resume', '/portfolios', '/contact'];

test.describe('Accessibility Audits', () => {
  for (const route of ROUTES) {
    test(`${route} has no critical a11y violations`, async ({ page }) => {
      await page.goto(route);

      // Wait for content to render (mock data loads async)
      await page.waitForTimeout(2000);

      const results = await new AxeBuilder({ page })
        .disableRules(KNOWN_ISSUES)
        .analyze();

      // Log violations for debugging (visible in CI output)
      if (results.violations.length > 0) {
        console.log(
          `a11y violations on ${route}:`,
          JSON.stringify(
            results.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.length,
            })),
            null,
            2
          )
        );
      }

      // Fail on serious and critical violations only
      const serious = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );
      expect(serious).toHaveLength(0);
    });
  }
});
