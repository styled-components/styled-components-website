module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/integration-test/'],
  setupFiles: [
    './.jest.setup.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
};
