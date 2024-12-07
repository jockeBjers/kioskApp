module.exports = {
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off',          // Disable the 'no-unused-vars'
      'no-console': 'off',              // Allow `console.log` statements
      'semi': ['error', 'always'],      // Enforce semicolons
      'quotes': 'off',                  // Let strings be "" and ''
    },
  };
  