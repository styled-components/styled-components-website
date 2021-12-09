module.exports = {
  setupFilesAfterEnv: ['<rootDir>test/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/integration-test/'],
};
