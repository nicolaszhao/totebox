const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { name, dependencies } = require('./package.json');

const upperCamelCase = (name) => {
  return name.split('-')
    .map(text => text.charAt(0).toUpperCase() + text.slice(1))
    .join('');
};

const genEntry = () => {
  const files = fs.readdirSync(path.resolve(__dirname, 'src'));
  
  return files.reduce((entry, file) => {
    if (/^([^.]+)\.js$/.test(file) && file !== 'index.js') {
      entry[RegExp.$1] = path.resolve(__dirname, 'src', file);
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

  externals: Object.keys(dependencies || {}).reduce((externals, module) => {
    const rootNameMaps = {
      urijs: 'URI'
    };

    externals[module] = {
      root: rootNameMaps[module] || upperCamelCase(module),
      amd: module,
      commonjs: module,
      commonjs2: module
    };

    return externals;
  }, {}),

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        include: path.join(__dirname, 'src')
      }
    ]
  }
};

module.exports = [

  // 分割子模块，更少的外部加载
  merge(config, {
    entry: genEntry(),
    output: {
      filename: `[name].js`,
      library: [upperCamelCase(name), '[name]']
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new CleanWebpackPlugin(['lib']),
    ]
  }),

  // 未压缩的版本
  merge(config, {
    output: {
      filename: `${name}.js`
    },
    optimization: {
      minimize: false
    }
  }),

  config
];
