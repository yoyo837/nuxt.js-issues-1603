const _ = require('lodash')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'

    config.resolve.extensions = _.union(config.resolve.extensions, ['.js', '.vue', '.json'])
    return config
  }
}
