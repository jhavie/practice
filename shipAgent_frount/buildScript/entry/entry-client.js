const webpack = require('webpack')
const merge = require('webpack-merge')
const prodConfig = require('../webpack.prod.conf.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(prodConfig, {
  // entry: '../../src/entry-client.js',
  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin()
  ]
})