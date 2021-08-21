module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project:  "./tsconfig.json",
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/all',
    'prettier',
  ],
};
