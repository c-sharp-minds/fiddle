const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const DelWebpackPlugin = require('del-webpack-plugin');

module.exports = {
  target: 'web', // "web" | "webworker" | "node" | "async-node" | "node-webkit" | "electron-main" | "electron-renderer" | function
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new CopyPlugin([
      {from: 'resources', to: 'resources'},
      {from: 'src/index.html', to: 'index.html'},
    ]),
    new DelWebpackPlugin({
      include: ['**.*'],
      info: true,
      keepGeneratedAssets: true,
      allowExternal: false,
    }),
  ],
};
