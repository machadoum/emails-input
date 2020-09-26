module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "airbnb-typescript", "prettier", "prettier/@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: ["import", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/camelcase": "off",
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
  },
};
