import * as Sentry from '@sentry/nextjs';

// if (process.env.NODE_ENV === 'production') {
  const SENTRY_DSN: string | undefined =
    process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  Sentry.init({
    environment: process.env.NODE_ENV,
    sendClientReports: true,
    dsn: SENTRY_DSN,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
// }
