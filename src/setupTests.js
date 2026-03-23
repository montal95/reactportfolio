// jest-dom adds custom jest matchers for asserting on DOM nodes.
// See: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock @tsparticles/react and @tsparticles/slim — canvas APIs not available in jsdom
vi.mock('@tsparticles/react', () => ({
  default: () => null,
  initParticlesEngine: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn().mockResolvedValue(undefined),
}));

// Suppress console.error for known React testing warnings
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
