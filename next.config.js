/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

require('dotenv-safe').config({
  allowEmptyValues: true,
})

const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [process.env.IMAGES_DOMAIN],
  },
  env: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    scope: '/',
    runtimeCaching,
    // disable: process.env.NODE_ENV === 'development',
    mode: process.env.NODE_ENV
  },
  // target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: false,
  workboxOpts: {
    swDest: 'public/sw.js',
    maximumFileSizeToCacheInBytes: 5000000,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 250,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /api/,
        handler: 'NetworkFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
            headers: {
              'x-api-test': 'true',
            },
          },
        },
      },
    ],
  },
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
}

module.exports = withSentryConfig(withPWA(nextConfig), sentryWebpackPluginOptions)
