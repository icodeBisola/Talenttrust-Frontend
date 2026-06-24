const js = require('@eslint/js');
const globals = require('globals');
const nextPlugin = require('eslint-config-next');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['test_check.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.rules,
    },
  },
];
