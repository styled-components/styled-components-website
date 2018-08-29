module.exports = {
  setupFiles: ['<rootDir>/.jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/integration-test/'],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
};
