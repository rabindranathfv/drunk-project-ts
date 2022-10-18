module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  clearMocks: true,
  testTimeout: 1000000,
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
