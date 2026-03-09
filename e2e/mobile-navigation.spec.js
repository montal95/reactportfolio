// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Mobile Navigation E2E Tests
 *
 * Tests the hamburger menu toggle and navigation
 * on mobile viewports (Pixel 5 project in config).
 */

test.describe('Mobile Hamburger Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    const toggler = page.locator('.mi-header-toggler');
    await expect(toggler).toBeVisible();
  });

  test('opens and closes the nav menu', async ({ page }) => {
    const toggler = page.locator('.mi-header-toggler');
    const header = page.locator('.mi-header');

    // Menu should start hidden (no is-visible class)
    await expect(header).not.toHaveClass(/is-visible/);

    // Open menu
    await toggler.click();
    await expect(header).toHaveClass(/is-visible/);

    // Close menu
    await toggler.click();
    await expect(header).not.toHaveClass(/is-visible/);
  });

  test('navigates to About via hamburger menu', async ({ page }) => {
    const toggler = page.locator('.mi-header-toggler');

    // Open menu
    await toggler.click();
    await expect(page.locator('.mi-header')).toHaveClass(/is-visible/);

    // Click About link
    await page.locator('.mi-header-menu a', { hasText: 'About' }).click();
    await expect(page).toHaveURL(/\/about$/);

    // Verify page content loaded
    await expect(
      page.locator('.mi-sectiontitle h2', { hasText: 'About Me' })
    ).toBeVisible({ timeout: 10_000 });
  });
});
