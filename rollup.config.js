import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';

const subPackagePath = process.cwd();
const pkg = require(path.join(subPackagePath, 'package.json'));
const [, pkgName] = /^@[^/]+\/(.+)$/.exec(pkg.name);
const toCamelCaseName = (name) => name.split('-')
  .map((text, i) => {
    if (i > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  })
  .join('');

const umdName = (name) => `$totebox.${toCamelCaseName(name)}`;

export default [{
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
    resolve(),
    commonjs(),
  ],
}];
