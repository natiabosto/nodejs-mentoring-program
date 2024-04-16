module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['text'],
  testPathIgnorePatterns: ['./src/e2e/'],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
