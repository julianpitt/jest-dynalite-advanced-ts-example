/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  roots: ['<rootDir>'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['./testing/setupBeforeEnv.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json', 'd.ts'],
};
