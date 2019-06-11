module.exports = {
  setupFilesAfterEnv: ['<rootDir>test/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['/node_modules/', '/integration-test/'],
};
