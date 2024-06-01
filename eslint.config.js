module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      project: ['./tsconfig.json'], // Adjust this path if your tsconfig.json is in a different location
    },
    plugins: [
      '@angular-eslint',
      '@typescript-eslint',
      'prettier',
    ],
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          trailingComma: 'es5',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          bracketSpacing: true,
          arrowParens: 'avoid',
          htmlWhitespaceSensitivity: 'css',
          endOfLine: 'lf',
        },
        {
          usePrettierrc: true,
        }
      ],
      // Add or modify other ESLint rules here
      'max-len': [1, { code: 120 }],
      'single-quote': true,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    overrides: [
      {
        files: ['*.html'],
        parser: '@angular-eslint/template-parser',
        plugins: ['@angular-eslint/template'],
        rules: {
          // Add or modify Angular template linting rules here
        },
      },
    ],
  };