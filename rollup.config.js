import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import path from 'path';

/* eslint-env node */

export default {
  input: pkg.main,
  plugins: [
    nodeResolve(),
    terser(),
  ],
  output: [
    {
      file: path.join(__dirname, pkg['es:main']),
      format: 'es',
    },
    {
      file: path.join(__dirname, pkg['umd:main']),
      name: pkg.name,
      format: 'umd',
    },
  ],
};
