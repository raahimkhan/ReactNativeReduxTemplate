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
      // file names should be kebab-case
      // except _layout.tsx and +not-found.tsx files
      "filenames-simple/naming-convention": ["error", { 
        "rule": "kebab-case",
        "excepts": ["_layout", "^\\+not-found$"]
      }],
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