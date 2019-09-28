module.exports = function(api) {
  api.cache(true);

  return {
    babelrcRoots: [
      '.',
      'packages/*',
    ],
    presets: [
      ['@nicolaz/babel-preset-hamal', { react: false }]
    ]
  };
};
