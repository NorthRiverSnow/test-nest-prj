const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin")
const typescriptEslint = require("typescript-eslint")
const { fixupPluginRules } = require("@eslint/compat")
const deprecation = require("eslint-plugin-deprecation")
const parser = require("@typescript-eslint/parser")
const eslintComments = require("eslint-plugin-eslint-comments")
const prettier = require("eslint-plugin-prettier")
const stylistic = require("@stylistic/eslint-plugin")

module.exports = [
  ...typescriptEslint.configs.strict,
  {
    ignores: ["dist/", "eslint.config.js"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      deprecation: fixupPluginRules(deprecation),
      "eslint-comments": eslintComments,
      prettier: prettier,
      "@stylistic": stylistic,
    },
    rules: {
      "no-console": 1,
      "no-warning-comments": 1,
      "prettier/prettier": [
        "error",
        {
          printWidth: 120,
          singleQuote: false,
          semi: false,
          trailingComma: "all",
        },
      ],
      "@typescript-eslint/no-useless-constructor": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@stylistic/object-curly-spacing": ["error", "always", { arraysInObjects: true }],
      "@stylistic/line-comment-position": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "require-await": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "deprecation/deprecation": "error",
      "eslint-comments/no-unused-disable": 1,
    },
  },
]
