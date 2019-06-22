const webpack = require('webpack');
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
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint/lib/cli-engine/formatters/stylish')
            }
          }
        ]
      }
    ]
  }
};
