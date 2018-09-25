import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

const upperCamelCase = (name) => {
  return name.split('-')
    .map(text => text.charAt(0).toUpperCase() + text.slice(1))
    .join('');
};

const input = 'src/index.js',
  plugins = [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ];

export default [
  {
    input,
    output: [
      {
        name: upperCamelCase(pkg.name),
        file: `dist/${pkg.name}.js`,
        format: 'umd',
        globals: {
          axios: 'axios'
        }
      }
    ],
    external: [
      'axios'
    ],
    plugins
  },
  {
    input,
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
      ...plugins
    ]
  }
];
