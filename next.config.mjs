import withMDX from '@next/mdx';
import withSourceMaps from '@zeit/next-source-maps';
import remarkPlugin from 'remark-gfm'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default withMDX({
  // Use .md extension
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkPlugin],
  },
})(
  withSourceMaps({
    compiler: {
      styledComponents: true,
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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
