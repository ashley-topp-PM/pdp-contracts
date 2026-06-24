import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      globals: {
        'ts-jest': {
          tsconfig: {
            lib: ['ES2020', 'DOM'],
          },
        },
      },
      roots: ['<rootDir>/src'],
      testMatch: ['**/__tests__/**/*.spec.ts'],
      testPathIgnorePatterns: ['dispatch-pdp-event'],
    },
    {
      displayName: 'jsdom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      globals: {
        'ts-jest': {
          tsconfig: {
            lib: ['ES2020', 'DOM'],
          },
        },
      },
      roots: ['<rootDir>/src'],
      testMatch: ['**/__tests__/dispatch-pdp-event.spec.ts'],
    },
  ],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/**', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};

export default config;
