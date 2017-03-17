const path = require('path')

const $ = {}
const modulePattern = /(node_modules|bower_components)/

$.entry = {
  app: path.resolve(__dirname, './source', 'app.js'),
  style: path.resolve(__dirname, './source', 'app.css')
}

$.output = {
  filename: '[name].js',
  sourceMapFilename: '[name].map',
  path: path.resolve(__dirname, 'build')
}

$.module = {
  rules: [
    {
      test: /\.css$/,
      loaders: 'file-loader?name=[name].[ext]!extract-loader!css-loader!postcss-loader'
    },
    { test: /\.js$/, exclude: modulePattern, loader: 'babel-loader' },
    {
      enforce: 'pre',
      test: /\.js?$/,
      loader: 'standard-loader',
      exclude: modulePattern,
      options: {
        error: false,
        snazzy: true,
        parser: 'babel-eslint'
      }
    }
  ]
}

module.exports = $
