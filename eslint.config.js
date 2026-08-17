// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import noFloatingPromise from "eslint-plugin-no-floating-promise";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      "no-floating-promise": noFloatingPromise,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-undef": "error",
      "semi": ["error", "always"],
      "curly": "off",
      "no-unused-vars": "off",
      "no-unreachable": "off",
      "require-await": "error",
      "no-floating-promise/no-floating-promise": "error",
    },
  },
];
