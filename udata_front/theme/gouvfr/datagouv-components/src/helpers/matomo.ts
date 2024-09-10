export function trackEvent(values: Array<any>): void {
    globalThis._paq?.push(['trackEvent', ...values]);
}