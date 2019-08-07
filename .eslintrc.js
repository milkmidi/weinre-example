// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
};
