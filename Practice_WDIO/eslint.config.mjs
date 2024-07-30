import globals from 'globals';
import js from '@eslint/js';
import Mocha from 'eslint-plugin-mocha';
import WDIO from 'eslint-plugin-wdio';

export default [
  js.configs.recommended,
  Mocha.configs.flat.recommended,
  WDIO.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha
      },
    },
    rules: {
      'no-empty': 'error',
      'no-multiple-empty-lines': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
    }
  },
];
