import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    ignores: ['*.min.js', 'uri-templates.js']
  },
  {
    files: ['test/**/*.mjs'],
    languageOptions: {
      globals: globals.mocha
    }
  },
  js.configs.recommended
];
