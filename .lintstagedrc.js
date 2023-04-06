module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['jest -c .jest.config.js --findRelatedTests', 'prettier --write'],
};
