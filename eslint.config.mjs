import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import noHardcodedLocale from './eslint/rules/no-hardcoded-locale.js';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Custom rules
  {
    plugins: {
      'custom': {
        rules: {
          'no-hardcoded-locale': noHardcodedLocale,
        },
      },
    },
    rules: {
      'custom/no-hardcoded-locale': 'error',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig;
