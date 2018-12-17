const path    = require('path')
const nod_mod = path.resolve('./node_modules') + path.sep

const webpack      = require(nod_mod + 'webpack')
const TerserPlugin = require(nod_mod + 'terser-webpack-plugin')

module.exports = {
  entry: {
    index:   './src/renderer/index.js',
    webview: './src/renderer/webview.js'
  },
  output: {
    path:              path.resolve(__dirname, 'app', 'bundles'),
    filename:          '[name].js',
    sourceMapFilename: '[name].map'
  },
  devtool: '#source-map',
  resolve: {
    modules: [
      nod_mod.substring(0, nod_mod.length-1),
      path.resolve('./src/node_modules'),
      path.resolve('./src/renderer'),
      path.resolve('./src')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx)$/i,
        exclude: /(?:node_modules)/,
        loader: nod_mod + 'babel-loader',
        query: {
          presets: [nod_mod + 'babel-preset-' + 'env', nod_mod + 'babel-preset-' + 'stage-0', nod_mod + 'babel-preset-' + 'react']
        }
      },
      {
        test: /\.css$/,
        use: [
          nod_mod + 'style-loader',
          nod_mod + 'css-loader',
          {
            loader: nod_mod + 'postcss-loader',
            options: {
              plugins: () => [require(nod_mod + 'autoprefixer')]
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new TerserPlugin({
      sourceMap: true,
      cache:     false,
      parallel:  true,
      terserOptions: {
        ecma:            5,
        warnings:        false,
        parse:           {},
        compress:        {},
        mangle:          true,
        module:          false,
        output:          {
          comments:        /@license/i
        },
        toplevel:        false,
        nameCache:       null,
        ie8:             false,
        keep_classnames: undefined,
        keep_fnames:     false,
        safari10:        false
      }
    })
  ],
  node: {
    __filename: true,
    __dirname: true,
  },
  target: 'electron-renderer'
}
