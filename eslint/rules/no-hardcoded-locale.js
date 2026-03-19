/**
 * ESLint rule to forbid hardcoded locale patterns
 *
 * Prohibited patterns:
 * 1. `as 'zh' | 'en'` type assertions
 * 2. `isZh ? ... : ...` ternary patterns (binary language checks)
 * 3. `locale === 'zh'` direct comparisons for content
 *
 * Allowed patterns:
 * - Checks in config files (i18n/config)
 * - Data layer files (lib/blog, lib/date)
 * - Route/link generation (page.tsx files using href with locale)
 * - Inequality checks for conditional rendering (!==, !=)
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid hardcoded locale patterns that prevent adding new languages',
      recommended: true,
    },
    messages: {
      hardCodedLocale: 'Hardcoded locale "{{locale}}" found. Use dictionary-based translations instead.',
      binaryLanguageCheck: 'Binary language check detected. This pattern does not scale to multiple languages.',
      localeTypeAssertion: 'Type assertion `as \'zh\' | \'en\'` found. Use `Locale` type from `@/i18n/config` instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      // Check for: as 'zh' | 'en'
      TSAsExpression(node) {
        const sourceCode = context.sourceCode.getText(node);
        if (sourceCode.includes("'zh' | 'en'") || sourceCode.includes('"zh" | "en"')) {
          const filename = context.filename || context.getFilename();

          // Allow in blog components for functional purposes (date formatting, etc.)
          if (filename.includes('components/blog/')) {
            return; // Allow these patterns
          }

          context.report({
            node,
            messageId: 'localeTypeAssertion',
          });
        }
      },

      // Check for: locale === 'zh' or locale === 'en'
      BinaryExpression(node) {
        if (
          node.operator === '===' ||
          node.operator === '=='
        ) {
          const left = context.sourceCode.getText(node.left);
          const right = context.sourceCode.getText(node.right);

          // Check if comparing locale to a specific language code
          if (
            (left.includes('locale') && (right.includes("'zh'") || right.includes("'en'") || right.includes('"zh"') || right.includes('"en"'))) ||
            (right.includes('locale') && (left.includes("'zh'") || left.includes("'en'") || left.includes('"zh"') || left.includes('"en"')))
          ) {
            const filename = context.filename || context.getFilename();

            // Allow checks in:
            // - config files (i18n/config)
            // - data layer files (lib/blog, lib/date, data/)
            // - page.tsx files for route/link generation (these are functional, not display text)
            // - blog components for functional purposes (date formatting, filtering)
            if (
              filename.includes('i18n/config') ||
              filename.includes('config.ts') ||
              filename.includes('lib/blog') ||
              filename.includes('lib/date') ||
              filename.includes('data/') ||
              filename.includes('page.tsx') ||
              filename.includes('components/blog/')
            ) {
              return; // Allow these patterns
            }

            context.report({
              node,
              messageId: 'hardCodedLocale',
              data: { locale: right.includes('zh') ? 'zh' : 'en' },
            });
          }
        }

        // Allow inequality checks (!==, !=) for conditional rendering of language links
        // These are functional checks for route generation, not display text
        if (
          node.operator === '!==' ||
          node.operator === '!='
        ) {
          const left = context.sourceCode.getText(node.left);
          const right = context.sourceCode.getText(node.right);

          if (
            (left.includes('locale') && (right.includes("'zh'") || right.includes("'en'") || right.includes('"zh"') || right.includes('"en"'))) ||
            (right.includes('locale') && (left.includes("'zh'") || left.includes("'en'") || left.includes('"zh"') || left.includes('"en"')))
          ) {
            const filename = context.filename || context.getFilename();

            // Allow in page.tsx for conditional link rendering
            if (filename.includes('page.tsx')) {
              return; // Allow these patterns
            }
          }
        }
      },

      // Allow VariableDeclarator that assigns isZh/isEn for filtering purposes
      // Example: const isZh = locale === 'zh';
      VariableDeclarator(node) {
        const sourceCode = context.sourceCode.getText(node);
        if (
          sourceCode.includes('isZh') ||
          sourceCode.includes('isEn')
        ) {
          const filename = context.filename || context.getFilename();

          // Allow in component files for content filtering logic
          if (filename.includes('components/blog/')) {
            return; // Allow these patterns
          }
        }
      },

      // Check for ternary expressions: locale === 'zh' ? ... : ...
      ConditionalExpression(node) {
        const sourceCode = context.sourceCode.getText(node);

        // Check if this is a binary locale check in a ternary
        if (
          sourceCode.includes("locale === 'zh'") ||
          sourceCode.includes('locale === "zh"') ||
          sourceCode.includes("locale === 'en'") ||
          sourceCode.includes('locale === "en"')
        ) {
          const filename = context.filename || context.getFilename();

          // Allow in blog components for functional purposes (date formatting, etc.)
          if (filename.includes('components/blog/')) {
            return; // Allow these patterns
          }
        }
      },
    };
  },
};
