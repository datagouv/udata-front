import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import config from './config';

function InitSentry(app) {
    if (config.sentry) {
        Sentry.init({
            app,
            dsn: config.sentry.dsn,
            integrations: [new Integrations.BrowserTracing()],
            release: config.sentry.release,
            ignoreErrors: [
                'Auth required',
                'Network Error',
                'ResizeObserver loop limit exceeded',
                'ResizeObserver loop completed with undelivered notifications.'
            ],
        })
        Sentry.setTags(config.sentry.tags)
    }
}

export default InitSentry;
