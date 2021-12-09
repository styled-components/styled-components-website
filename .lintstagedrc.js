module.exports = {
  '**/*.js?(x)': [
    'jest -c .jest.config.js --findRelatedTests',
    (filenames) => `next lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(' --file ')}`,
    'prettier --write',
  ],
  '*.md': ['prettier --write'],
};
