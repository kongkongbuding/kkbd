import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const rollupConfig = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/kkbd.js',
      format: 'umd',
      name: 'kkbd'
    },
    plugins: [babel()]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/kkbd.min.js',
      format: 'umd',
      name: 'kkbd'
    },
    plugins: [babel(), terser()]
  }
]

export default rollupConfig

