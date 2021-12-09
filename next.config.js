const withSourceMaps = require('@zeit/next-source-maps');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const withMDX = require('@next/mdx');

module.exports = withMDX({
  // Use .md extension
  extension: /\.md$/,
})(
  withSourceMaps({
    pageExtensions: ['js', 'jsx', 'md'],
    poweredByHeader: false,
    webpack: function (config, { dev, isServer }) {
      if (dev) {
        return config;
      }

      if (!!process.env.ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
            generateStatsFile: true,
            // Will be available at `.next/stats.json`
            statsFilename: 'stats.json',
          })
        );
      }

      return config;
    },
  })
);
