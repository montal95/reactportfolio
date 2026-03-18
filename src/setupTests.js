// jest-dom adds custom jest matchers for asserting on DOM nodes.
// See: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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
