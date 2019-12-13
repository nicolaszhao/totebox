module.exports = (api) => {
  api.cache(true);

  return {
    babelrcRoots: [
      '.',
      'packages/*',
    ],
    presets: [
      '@hammal/babel-preset-app',
    ],
    overrides: [
      {
        test: './packages/ui',
        presets: [
          ['@hammal/babel-preset-app', { react: true }],
        ],
      },
    ],
  };
};
