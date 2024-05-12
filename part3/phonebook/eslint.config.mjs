import globals from "globals";

export default [
  {rules: {
    "no-unused-vars": "warn",
    "no-undef": "error",
  },
  ignores: ['dist/**/*']
  },
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
];