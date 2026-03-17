import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/**
 * Unit tests for the React app.
 *
 * Route-level rendering is handled by Playwright E2E tests.
 * These tests verify the app bootstraps correctly and
 * individual components render without errors.
 *
 * Note: App.js contains its own <BrowserRouter>, so we render
 * it directly. Route-specific testing is done via Playwright
 * where we have full URL control.
 *
 * Note: RTL automatically unmounts after each test via its
 * built-in afterEach(cleanup) — no manual unmount needed.
 */

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the navigation header', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.mi-header')).toBeInTheDocument();
  });

  it('renders all expected nav links', () => {
    const { container } = render(<App />);
    const navLinks = container.querySelectorAll('.mi-header-menu li');
    // Home, About, Resume, Portfolio, Blogs, Contact
    expect(navLinks.length).toBe(6);
  });

  it('renders the home page content by default', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.mi-home-area')).toBeTruthy();
  });
});
