import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    env: { NODE_ENV: 'test' },
    setupFiles: './src/setupTests.js',
    css: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
})
