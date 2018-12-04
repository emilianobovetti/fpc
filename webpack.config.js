const pkg = require('./package.json');
const path = require('path');
const target = path.resolve(pkg['umd:main']);

module.exports = {
  entry: pkg.main,
  target: 'web',
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    path: `${path.dirname(target)}`,
    filename: `${path.basename(target)}`,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        sideEffects: false
      }
    ]
  }
};
