const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const CommonOptions = require('./common.js');

const BROWSER_NAME = 'safari';
const BROWSER_MIN_SUPPORTED_VERSION = 10;

module.exports = {
  entry: {
    'application': './src/index.js'
  },
  output: {
    filename: 'bundle.[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist', BROWSER_NAME),
    publicPath: `/dist/${BROWSER_NAME}/`,
    chunkFilename: 'bundle.[name].[chunkhash].js'
  },
  stats: CommonOptions.WebpackStats,
  module: {
    rules: [
      CommonOptions.BabelLoaderRule,
      CommonOptions.CSSLoaderRule(`${BROWSER_NAME} ${BROWSER_MIN_SUPPORTED_VERSION}`)
    ]
  },
  plugins: [
    new BabiliPlugin({'unsafe': false}),
    CommonOptions.ExtractCSSPlugin
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.js',
    ],
    mainFields: [
      'jsnext:main'
    ],
  },
};