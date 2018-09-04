module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/integration-test/'],
  setupTestFrameworkScriptFile: '<rootDir>test/setup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
