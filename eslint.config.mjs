import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  {rules: {
    "indent": ["error", 2],
    "no-use-before-define": ["error", { "variables": true, "functions": false, "classes": false }]
  }},
  pluginJs.configs.recommended,
];
