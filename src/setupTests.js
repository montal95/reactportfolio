// jest-dom adds custom jest matchers for asserting on DOM nodes.
// See: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock axios globally — components fire axios requests on mount but jsdom
// has no server to respond to. Without this, every component test produces
// unhandled errors that cause Vitest to exit with code 1 even when all
// assertions pass.
// Return sensible empty shapes that match what components destructure.
vi.mock('axios', () => {
  const mockAxios = {
    get: vi.fn().mockResolvedValue({
      data: {
        // information endpoint (Header, Home, About, Socialicons)
        socialLinks: {},
        // all other endpoints return empty arrays/objects by default
      }
    }),
    post: vi.fn().mockResolvedValue({ data: {} }),
    create: vi.fn().mockReturnThis(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    defaults: { headers: { common: {} } },
  };
  return { default: mockAxios, ...mockAxios };
});

// Mock react-particles-js — canvas APIs not available in jsdom
// Phase 5: migrate to @tsparticles/react in Group C once Vite is stable
vi.mock('react-particles-js', () => {
  return {
    default: function MockParticles() {
      const React = require('react');
      return React.createElement('div', { 'data-testid': 'mock-particles' });
    }
  };
});

// Suppress console.error for known React testing warnings
// These are caused by async state updates after tests complete
// TODO: Remove this after upgrading to React 18+ (uses automatic batching)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('not wrapped in act') ||
        args[0].includes('Cannot update a component') ||
        args[0].includes("Can't perform a React state update"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

