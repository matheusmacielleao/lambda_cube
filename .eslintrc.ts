module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard-with-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/no-namespace": "off",

    "@typescript-eslint/return-await": "off",

    "@typescript-eslint/no-non-null-assertion": "off"
  },
};
