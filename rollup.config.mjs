// import babel from 'rollup-plugin-babel';
// import {terser} from 'rollup-plugin-terser';

export default [{
  input: 'src/uri-templates.mjs',
  output: {
    file: 'uri-templates.js',
    format: 'umd',
    name: 'UriTemplate'
  },
  plugins: [
  ]
}];
