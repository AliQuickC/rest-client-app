import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        'src/index.{js,jsx,ts,tsx}',
        'src/main.{js,jsx,ts,tsx}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
    testTimeout: 60000,
  },
});
