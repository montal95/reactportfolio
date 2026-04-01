// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Mobile Navigation E2E Tests
 *
 * Tests the hamburger menu toggle and navigation
 * on mobile viewports. Uses an explicit viewport override
 * so these tests work regardless of which Playwright project
 * is active (chromium, firefox, mobile-chrome, etc.).
 */

test.use({ viewport: { width: 393, height: 851 } }); // Pixel 5

test.describe('Mobile Hamburger Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });

  test('opens and closes the nav menu', async ({ page }) => {
    const mobileMenu = page.locator('#mobile-menu');

    // Menu should start hidden
    await expect(mobileMenu).toBeHidden();

    // Open menu
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(mobileMenu).toBeVisible();

    // Close menu
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(mobileMenu).toBeHidden();
  });

  test('navigates to About via hamburger menu', async ({ page }) => {
    // Open menu
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Click About link inside the mobile drawer
    await page.locator('#mobile-menu a', { hasText: 'About' }).click();
    await expect(page).toHaveURL(/\/about$/);

    // Verify page content loaded
    await expect(
      page.locator('h1.section-title', { hasText: 'About Me' })
    ).toBeVisible({ timeout: 10_000 });
  });
});
