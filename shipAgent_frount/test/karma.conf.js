var webpackConfig = require('../buildScript/webpack.test.conf.js');

// Karma configuration
module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      './**/*.test.js'
    ],
    preprocessors: {
      './**/*.test.js': ['webpack']
    },
    webpack: webpackConfig

  })
}
