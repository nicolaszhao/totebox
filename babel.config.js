module.exports = (api) => {
  api.cache(true);

  return {
    babelrcRoots: [
      '.',
      'packages/*',
    ],
    presets: [
      ['@hammal/babel-preset-app', { typescript: true }],
    ],
    overrides: [
      {
        test: './packages/ui',
        presets: [
          ['@hammal/babel-preset-app', { typescript: true, react: true }],
        ],
      },
    ],
  };
};
