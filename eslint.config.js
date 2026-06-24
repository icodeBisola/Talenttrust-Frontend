const { default: nextPlugin } = require('eslint-config-next/flat');

module.exports = [
  // Ignore stray files that should never be linted
  {
    ignores: ['test_check.js'],
  },
  // Next.js recommended rules (includes react, react-hooks, @next/next)
  ...nextPlugin,
];
