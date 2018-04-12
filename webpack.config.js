const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');

const { name, dependencies } = require('./package.json');

const upperCamelCase = (name) => {
  return name.split('-')
    .map(text => text.charAt(0).toUpperCase() + text.slice(1))
    .join('');
};

const genEntry = () => {
  const files = fs.readdirSync(path.resolve(__dirname, 'src'));
  
  return files.reduce((entry, file) => {
    if (/^([^.]+)\.js$/.test(file)) {
      entry[file === 'index.js' ? name : RegExp.$1] = path.resolve(__dirname, 'src', file);
    }

    return entry;
  }, {});
};

const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    
    // when the entry is './src' (default)
    filename: `${name}.min.js`,
    library: upperCamelCase(name),

    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  },

  externals: Object.keys(dependencies || {}).reduce((externals, module) => {
    externals[module] = {
      root: upperCamelCase(module),
      amd: module,
      commonjs: module,
      commonjs2: module
    };

    return externals;
  }, {})
};

module.exports = [
  merge(config, {
    optimization: {
      minimize: false
    },
    entry: genEntry(),
    output: {
      filename: `[name].js`,
      library: [upperCamelCase(name), '[name]']
    }
  }),

  config
];
