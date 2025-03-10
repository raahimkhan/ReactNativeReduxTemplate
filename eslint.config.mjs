import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import filenamesSimple from "eslint-plugin-filenames-simple";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // for non-screen files: kebab-case
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["**/screens/**/*"],
    plugins: {
      'filenames-simple': filenamesSimple
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "filenames-simple/naming-convention": ["error", { 
        "rule": "kebab-case",
        "excepts": [
          "^_layout$", 
          "^\\+not-found$"
        ]
      }]
    }
  },
  // for screen files: PascalCase
  {
    files: ["**/screens/**/*.{ts,tsx}"],
    plugins: {
      'filenames-simple': filenamesSimple
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "filenames-simple/naming-convention": ["error", { 
        "rule": "PascalCase"
      }]
    }
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      'filenames-simple': filenamesSimple,
    },
    rules: {
      // disable the rule that forbids require() because local fonts and images need this in React Native
      "@typescript-eslint/no-require-imports": "off",
      // interface and type names should be PascalCase
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": ["interface", "typeAlias"],
          "format": ["PascalCase"]
        }
      ]
    },
  },
];