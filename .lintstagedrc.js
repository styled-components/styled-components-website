module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['jest -c .jest.config.js --findRelatedTests --passWithNoTests', 'prettier --write'],
};
