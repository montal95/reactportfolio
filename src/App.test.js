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
 * Note: App.js contains its own <BrowserRouter>, so we
 * render it directly. Route-specific testing is done via
 * Playwright where we have full URL control.
 */

describe('App', () => {
  it('renders without crashing', () => {
    const { unmount } = render(<App />);
    unmount();
  });

  it('renders the navigation header', () => {
    const { container, unmount } = render(<App />);
    const header = container.querySelector('.mi-header');
    expect(header).toBeInTheDocument();
    unmount();
  });

  it('renders all expected nav links', () => {
    const { container, unmount } = render(<App />);
    const navLinks = container.querySelectorAll('.mi-header-menu li');
    // Home, About, Resume, Portfolio, Blogs, Contact
    expect(navLinks.length).toBe(6);
    unmount();
  });

  it('renders the home page content by default', () => {
    const { container, unmount } = render(<App />);
    // Home page should render (it's the "/" route)
    expect(container.querySelector('.mi-home-area')).toBeTruthy();
    unmount();
  });
});
