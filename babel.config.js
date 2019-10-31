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
  };
};
