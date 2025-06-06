import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { sentry } from './config';
import { App } from 'vue';

function InitSentry(app: App) {
  if (sentry.dsn) {
    Sentry.init({
      app,
      dsn: sentry.dsn,
      environment: sentry.environment,
      integrations: [new Integrations.BrowserTracing()],
      sampleRate: sentry.sampleRate,
      release: sentry.release,
      ignoreErrors: [
        'Auth required',
        'Network Error',
        'Request aborted',
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications.',
      ],
      autoSessionTracking: false,
    })
    Sentry.setTags(sentry.tags)
  }
}

export default InitSentry;
