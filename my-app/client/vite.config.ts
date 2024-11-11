import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    ...configDefaults,

    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup.test.tsx', // Ensure this file exists for setting up Vitest
  },
});
