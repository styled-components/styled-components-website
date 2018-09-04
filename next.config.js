const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  webpack: function(config, { dev, isServer }) {
    if (dev) {
      return config
    }

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        generateStatsFile: true,
        // Will be available at `.next/stats.json`
        statsFilename: 'stats.json',
      }),
    )

    if (!isServer) {
      const oldEntry = config.entry

      config.entry = () =>
        oldEntry().then(entry => {
          entry['main.js'].push(path.resolve('./utils/track.js'))
          entry.commons = ['./utils/prismTemplateString.js']

          return entry
        })
    }

    return config
  },
}
