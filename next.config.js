const withPreact = require('@zeit/next-preact')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const returnConfig = (config, options, nextConfig = {}) => {
  if (typeof nextConfig.webpack === 'function') {
    return nextConfig.webpack(config, options)
  }

  return config
}

const config = (nextConfig = {}) => Object.assign({}, nextConfig, {
  webpack(config, options) {
    const { dev, isServer } = options
    if (dev || !isServer) {
      return returnConfig(config, options, nextConfig)
    }

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        filename: 'sw.js',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        staticFileGlobs: ['static/**/*'],
        forceDelete: true,
        runtimeCaching: [
          // Example with different handlers
          {
            handler: 'fastest',
            urlPattern: /[.](png|jpg|css)/
          },
          {
            handler: 'networkFirst',
            urlPattern: /^http.*/ //cache all files
          }
        ]
      })
    )

    return returnConfig(config, options, nextConfig)
  }
})

module.exports = withPreact(config())
