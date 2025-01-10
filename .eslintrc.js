module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'standard',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
      ecmaVersion: 2020
    },
    env: {
      node: true,
      jest: true
    },
    rules: {
      // Custom rules or overrides
    }
  }