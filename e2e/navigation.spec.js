// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Navigation E2E Tests
 *
 * Verifies all navigation links resolve to the correct pages
 * and that core page elements render for each route.
 */

const NAV_LINKS = [
  { label: 'Home',    href: '/',        heading: null },
  { label: 'About',   href: '/about',   heading: 'About Me' },
  { label: 'Resume',  href: '/resume',  heading: 'Skills & Technologies' },
  { label: 'Work',    href: '/work',    heading: 'My Work' },
  { label: 'Contact', href: '/contact', heading: 'Contact Me' },
];

test.describe('Desktop Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const { label, href, heading } of NAV_LINKS) {
    test(`navigates to ${label} page via nav link`, async ({ page }) => {
      await page.getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));

      if (heading) {
        await expect(
          page.locator('h1.section-title', { hasText: heading })
        ).toBeVisible({ timeout: 10_000 });
      }
    });
  }

  test('brand link navigates to home page', async ({ page }) => {
    await page.goto('/about');
    await page.locator('.brand').click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('404 Page', () => {
  test('shows 404 for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.locator('text=404')).toBeVisible({ timeout: 10_000 });
  });
});
