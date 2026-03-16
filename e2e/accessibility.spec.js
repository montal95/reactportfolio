// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Accessibility (a11y) E2E Tests
 *
 * Uses axe-core to run automated accessibility audits
 * against each major route.
 *
 * Phase 3 resolved: landmark-one-main, link-name, region.
 * Remaining known issue: color-contrast (needs manual
 * verification against WCAG 2.1 AA — deferred to Phase 5
 * or a dedicated design pass).
 */

// Rules to skip until addressed in a future phase
const KNOWN_ISSUES = [
  'color-contrast',    // Needs manual verification — deferred
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
