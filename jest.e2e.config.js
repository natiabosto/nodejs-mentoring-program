module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src/e2e'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['./src/e2e/**'],
  coverageReporters: ['text'],
};
