const path = require('path');
const exportDir = path.resolve(__dirname, process.env.EXPORT_DIR)

var HtmlWebpackPlugin = require('html-webpack-plugin');
var injectIndex = new HtmlWebpackPlugin({
  title: 'Game of Life',
  filename: 'index.html',
  inject: 'body'
});

module.exports = [
  {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    entry: path.resolve(__dirname, 'app.js'),
    output: {
      path: exportDir,
      filename: 'bundle.js',
    },
    plugins: [
      injectIndex,
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }
];
