module.exports = {
  '**/*.js?(x)': [
    'jest -c .jest.config.js --findRelatedTests',
    (filenames) =>
      `next lint --fix --file ${filenames
        .map((file) => file.split(process.cwd().replace(/\\/g, '/'))[1])
        .join(' --file ')}`, // normalized path for windows
    'prettier --write',
  ],
  '*.md': ['prettier --write'],
};
