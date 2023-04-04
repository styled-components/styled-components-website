const withMDX = require('@next/mdx');
const withSourceMaps = require('@zeit/next-source-maps');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = withMDX({
  // Use .md extension
  extension: /\.mdx?$/,
})(
  withSourceMaps({
    compiler: {
      styledComponents: true,
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
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
