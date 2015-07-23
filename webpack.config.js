var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/main.js',
  ],
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
      },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
      { test: /\.(woff|woff2|ttf|eot|otf|svg)$/, loader: 'url' },
    ],
  },
};
