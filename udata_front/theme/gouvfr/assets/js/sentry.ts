import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { sentry } from './config';
import { App } from 'vue';

function InitSentry(app: App) {
  if (sentry.dsn) {
    Sentry.init({
      app,
      dsn: sentry.dsn,
      integrations: [new Integrations.BrowserTracing()],
      release: sentry.release,
      ignoreErrors: [
        'Auth required',
        'Network Error',
        'Request aborted',
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications.',
      ],
    })
    Sentry.setTags(sentry.tags)
  }
}

export default InitSentry;
