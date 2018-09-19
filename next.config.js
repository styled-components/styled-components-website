const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const withMDX = require('@zeit/next-mdx')

module.exports = withMDX({
  // Use .md extension
  extension: /\.md$/,
})(
  withSourceMaps({
    pageExtensions: ['js', 'jsx', 'md'],
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
  }),
)
