import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      provider: 'v8',
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        '**/node_modules/**',
        '**/scripts/**',
        'vite.config.ts',
        'vitest.config.ts',
        'postcss.config.js',
        'tailwind.config.js',
        'eslint.config.js',
        'tsconfig*.json',
        'index.html',
        'src/main.tsx',
        'src/pages/**',
        'src/routes/**',
      ],
    },
  },
});