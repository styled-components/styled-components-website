module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/test/'],
  browser: false,
  testEnvironment: 'node',
  verbose: false,
  bail: true,
  globals: {
    __DEV__: true
  }
};
