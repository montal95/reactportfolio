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

// Mock @tsparticles/react and @tsparticles/slim — canvas APIs not available in jsdom
vi.mock('@tsparticles/react', () => ({
  default: () => null,
  initParticlesEngine: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn().mockResolvedValue(undefined),
}));

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

