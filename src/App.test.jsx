import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';

/**
 * Unit tests for the React app.
 *
 * Route-level rendering is handled by Playwright E2E tests.
 * These tests verify the app bootstraps correctly and
 * individual components render without errors.
 *
 * Note: App.jsx uses React.lazy + Suspense for code splitting.
 * Tests that assert on lazy-loaded content must use waitFor so
 * the async import resolves before the assertion runs.
 *
 * Note: RTL automatically unmounts after each test via its
 * built-in afterEach(cleanup) — no manual unmount needed.
 */

describe('App', () => {
  it('renders without crashing', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container.firstChild).toBeTruthy();
    });
  });

  it('renders the navigation header', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container.querySelector('.mi-header')).toBeInTheDocument();
    });
  });

  it('renders all expected nav links', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      const navLinks = container.querySelectorAll('.mi-header-menu li');
      // Home, About, Resume, Portfolio, Blogs, Contact
      expect(navLinks.length).toBe(6);
    });
  });

  it('renders the home page content by default', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container.querySelector('.mi-home-area')).toBeTruthy();
    });
  });
});
