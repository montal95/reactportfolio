import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // Override OS-level NODE_ENV=production before workers load React
    env: { NODE_ENV: 'test' },
    globalSetup: ['./vitest.global-setup.ts'],
    setupFiles: ['./vitest.setup.ts'],
    include: ['app/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e', 'src'],
    coverage: {
      provider: 'v8',
      include: ['app/components/**'],
      exclude: ['app/components/__tests__/**'],
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
