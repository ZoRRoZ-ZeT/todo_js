module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
};
