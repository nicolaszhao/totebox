import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const banner = `
/**
* NZ's utils
*
* Version: ${pkg.version}
*
* Author: NZ
* Web: https://github.com/nicolaszhao/tote-box
*
* Licensed under
*   MIT License http://www.opensource.org/licenses/mit-license
*
*/
`;

const upperCamelCase = (name) => {
  return name.split('-')
    .map(text => text.charAt(0).toUpperCase() + text.slice(1))
    .join('');
};

const input = 'src/index.js',
  external = Object.keys(pkg.dependencies);

export default [
  {
    input,
    external,
    output: {
      banner,
      name: upperCamelCase(pkg.name),
      file: `dist/${pkg.name}.js`,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },

  {
    input, 
    external,
    output: {
      banner,
      file: pkg.module,
      format: 'esm'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },

  {
    input,
    external,
    output: {
      banner,
      file: pkg.main,
      format: 'cjs'
    }
  }
];
