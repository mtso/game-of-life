const path = require('path');
const exportDir = path.resolve(__dirname, process.env.EXPORT_DIR)

var HtmlWebpackPlugin = require('html-webpack-plugin');
var injectIndex = new HtmlWebpackPlugin({
  title: 'Game of Life',
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: 'styles.css',
  disable: false,
  allChunks: true,
})

module.exports = [
  {
    entry: [
      path.resolve(__dirname, 'app.js'),
      path.resolve(__dirname, 'style/main.scss'),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader',
          }),
        },
      ],
    },
    output: {
      path: exportDir,
      filename: 'bundle.js',
    },
    plugins: [
      extractSass,
      injectIndex,
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  },
];
