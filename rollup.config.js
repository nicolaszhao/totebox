import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';

const subPackagePath = process.cwd();
const pkg = require(path.join(subPackagePath, 'package.json'));

export default [{
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ],
  plugins: [
    external(),
    babel({
      rootMode: 'upward',
      runtimeHelpers: true,
      exclude: /node_modules/
    }),
    resolve(),
    commonjs(),
  ]
}];
