import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        $: 'readonly',
        $$: 'readonly',
        browser: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
      },
    },
    rules: {
      'no-empty': 'error',
      'no-multiple-empty-lines': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
    },
    ignores: ['wdio.conf.js'],
  },
];
