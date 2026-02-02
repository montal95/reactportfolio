// Polyfill MutationObserver for older jsdom in react-scripts 3.x
import 'mutationobserver-shim';

import '@testing-library/jest-dom';

// Mock react-particles-js - it requires canvas which doesn't exist in jsdom
jest.mock('react-particles-js', () => {
  return function MockParticles() {
    return null;
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
