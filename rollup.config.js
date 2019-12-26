import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssUrl from 'postcss-url';

const cwd = process.cwd();
const pkg = require(path.join(cwd, 'package.json'));
const [, pkgName] = /^@[^/]+\/(.+)$/.exec(pkg.name);
const upperCaseGlobals = ['ajax', 'events'];

const toCamelCaseName = (name) => name.split('-')
  .map((text, i) => {
    if (i > 0 || upperCaseGlobals.includes(text)) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  })
  .join('');

const umdName = (name) => `$totebox.${toCamelCaseName(name)}`;

export default {
  input: 'src/index.js',
  output: [
    process.env.INCLUDE_UMD === 'true' && {
      name: umdName(pkgName),
      file: `dist/${pkgName}.js`,
      format: 'umd',
      banner: `/* ${umdName(pkgName)} v${pkg.version} by ${pkg.author} */`,
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ].filter(Boolean),
  plugins: [
    external(),
    babel({
      rootMode: 'upward',
      runtimeHelpers: true,
      exclude: /node_modules/,
    }),
    process.env.EXTRACT_STYLE === 'true' && postcss({
      extract: pkg.style,
      modules: {
        generateScopedName: '[folder]-[local]__[hash:base64:5]',
      },
      plugins: [
        postcssPresetEnv(),
        postcssUrl({
          url: 'inline',
        }),
      ],
    }),
    resolve(),
    commonjs(),
  ].filter(Boolean),
};
