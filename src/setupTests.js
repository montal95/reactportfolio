// Polyfill MutationObserver for older jsdom in react-scripts 3.x
import 'mutationobserver-shim';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// See: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock react-particles-js — canvas APIs not available in jsdom
// TODO: Migrate to react-tsparticles v2 or @tsparticles/react v3 in Phase 5 (Vite).
// Both tsparticles v2 and v3 ship ESM builds with ES2021 syntax (??= operator) that
// CRA 3.x / Webpack 4 cannot transpile from node_modules. react-particles-js ships
// a pre-bundled UMD build that works cleanly under CRA 3.x.
jest.mock('react-particles-js', () => {
  const React = require('react');
  return function MockParticles() {
    return React.createElement('div', { 'data-testid': 'mock-particles' });
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
