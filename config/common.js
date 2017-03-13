const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const IN_PRODUCTION = process.env.NODE_ENV === 'production';
const IN_DEVELOPER_MODE = process.env.BUNDLE_ENV === 'dev'; // New!
const CSS_LOADER_OPTIONS = {
  modules: true,
  localIdentName: '[hash:base64:8]',
  minimize: true,
  camelCase: false,
  importLoaders: 1
};
const POSTCSS_LOADER_OPTIONS = (browsers=["last 3 versions"]) => {
  return {
    plugins: function() {
      return [
        autoprefixer({
          browsers: browsers
        })
      ];
    } 
  }; 
};

const ExtractCSSPlugin = new ExtractTextPlugin({filename: 'bundle.[name].[chunkhash].css'});

const WebpackStats = {
  assets: true,
  cached: false,
  children: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
  colors: true,
  errors: true,
  errorDetails: true,
  hash: false,
  modules: false,
  publicPath: true,
  reasons: false,
  source: false,
  timings: false,
  version: false,
  warnings: false
};

const BabelLoaderRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader'
};
const CSSLoaderRule = (browsers) => {
  return {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractCSSPlugin.extract({
      fallback: 'style-loader',
      use: [
        { loader: 'css-loader', options: CSS_LOADER_OPTIONS },
        { loader: 'postcss-loader', options: POSTCSS_LOADER_OPTIONS(browsers) }
      ]
    })
  };
};

module.exports = {
  IN_PRODUCTION,
  CSS_LOADER_OPTIONS,
  ExtractCSSPlugin,
  WebpackStats,
  BabelLoaderRule,
  CSSLoaderRule
}