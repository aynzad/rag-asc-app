import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"]],
          pathGroupsExcludedImportTypes: ["internal"],
          pathGroups: [
            // Import react before the other externals
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            // Import internals before the other relative imports
            {
              pattern: "@src/**/*",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@pages/**/*",
              group: "internal",
              position: "before",
            },
          ],
          distinctGroup: false,
          "newlines-between": "always",
        },
      ],
    },
  }
);