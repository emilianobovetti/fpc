const pkg = require('./package.json');

module.exports = {
  entry: pkg.main,
  target: 'web',
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    path: `${__dirname}/dist`,
    filename: `${pkg.name}.umd.js`,
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
