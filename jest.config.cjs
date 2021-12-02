module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['<rootDir>/jest-setup.js', 'dotenv/config'],
  /*moduleNameMapper: {
    '^\\$data(.*)$': '<rootDir>/src/data$1',
    '^\\$lib(.*)$': '<rootDir>/src/lib$1',
  },*/
};
