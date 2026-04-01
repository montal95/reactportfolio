/**
 * Vitest global setup — runs in the main process before any worker is spawned.
 *
 * NODE_ENV=production is set at the OS level on this machine (same setting
 * that causes npm to omit devDependencies by default). Overriding it here
 * ensures all test workers inherit NODE_ENV=test, which in turn causes React
 * to load its development build and export `act` — required by
 * @testing-library/react.
 */
export default function setup() {
  process.env.NODE_ENV = 'test'
}
