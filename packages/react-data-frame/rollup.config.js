import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './lib/cjs/index.js',
      format: 'cjs',
    },
    {
      file: './lib/esm/index.js',
      format: 'es',
    },
  ],
  external: [...Object.keys(packageJson.peerDependencies || {})],
  plugins: [
    cleaner({
      targets: [
        './lib/',
      ],
    }),
    nodeResolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
