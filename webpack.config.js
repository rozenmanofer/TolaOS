const path = require('path');

module.exports = {
  entry: path.resolve(__dirname + '/src/entry.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/build'),
    publicPath: 'http://localhost:8080/build/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      }
    ]
  },
  target: 'electron'
};