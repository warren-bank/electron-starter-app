const path    = require('path')
const url     = require('url')
const webpack = require('webpack')

const base_configs = require('./webpack.config.renderer.js')
const server       = url.parse(process.env.dev_server_url)

// https://webpack.js.org/configuration/dev-server/#devserver

const configs = Object.assign({}, base_configs, {
  devServer: {
    https:            (server.protocol.toLowerCase() === 'https:'),
    host:             server.hostname,
    port:             server.port,
    publicPath:       `${server.protocol}//${server.hostname}:${server.port}/bundles/`,
    contentBase:      path.join(__dirname, 'app'),
    watchContentBase: false,
    lazy:             false,
    hot:              true,
    inline:           true,
    headers: {
      "Access-Control-Allow-Origin":      "*",
      "Access-Control-Allow-Methods":     "GET, POST, *",
      "Access-Control-Allow-Headers":     "Accept, Content-Type, Content-Length, Origin, Referer, *",
      "Access-Control-Allow-Credentials": "true"
    }
  }
})

configs.plugins = Array.isArray(configs.plugins)
                    ? [...configs.plugins]
                    : []

configs.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

module.exports = configs
