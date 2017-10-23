'use strict';

var path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'karma-test-shim$': path.resolve(__dirname, './karma-test-shim.ts')
    }
  }
};
