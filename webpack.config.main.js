const path    = require('path')
const nod_mod = path.resolve('./node_modules') + path.sep
const webpack = require(nod_mod + 'webpack')

module.exports = {
  entry: './src/main/index.js',
  output: {
    path:     path.resolve(__dirname, 'app', 'bundles'),
    filename: 'main.js'
  },
  resolve: {
    modules: [
      nod_mod.substring(0, nod_mod.length-1),
      path.resolve('./src/node_modules'),
      path.resolve('./src/main'),
      path.resolve('./src')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx)$/i,
        exclude: /\/node_modules\/(?!@warren-bank\/)/,
        loader: nod_mod + 'babel-loader',
        query: {
          presets: [nod_mod + 'babel-preset-' + 'env', nod_mod + 'babel-preset-' + 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      warnings: false,
      mangle: true,
      cache: false
    })
  ],
  node: {
    __filename: true,
    __dirname: true,
  },
  target: 'electron-main'
}
