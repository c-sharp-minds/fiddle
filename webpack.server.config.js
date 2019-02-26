const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DelWebpackPlugin = require('del-webpack-plugin');

module.exports = {
  target: 'node', // "web" | "webworker" | "node" | "async-node" | "node-webkit" | "electron-main" | "electron-renderer" | function
  entry: './src/server.js',
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
    new NodemonPlugin(),
    new CopyPlugin([
      {from: 'resources', to: 'resources'},
    ]),
    new DelWebpackPlugin({
      include: ['**.*'],
      info: true,
      keepGeneratedAssets: true,
      allowExternal: false,
    }),
  ],
};
