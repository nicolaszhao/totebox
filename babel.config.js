module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@nicolaz/babel-preset-hamal', { react: false }]
    ]
  };
};
