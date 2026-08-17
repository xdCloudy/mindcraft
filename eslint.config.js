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
        // SES installs these globals at runtime.
        Compartment: "readonly",
        lockdown: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Establish a non-blocking baseline first. These warnings document the
      // existing debt without forcing a repo-wide style/lifecycle rewrite in
      // the same PR. Individual follow-up PRs can tighten them to errors.
      "no-undef": "warn",
      "semi": ["warn", "always"],
      "curly": "off",
      "no-unused-vars": "off",
      "no-unreachable": "off",
      "require-await": "warn",
      "no-floating-promise/no-floating-promise": "warn",
      "no-ex-assign": "warn",
      "no-fallthrough": "warn",
      "no-prototype-builtins": "warn",
      "no-empty": "warn",
      "no-useless-escape": "warn",
    },
  },
];
