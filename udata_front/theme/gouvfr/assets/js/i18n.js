/*
 * Handle i18n loading
 */
import { lang } from "./config";
import { createI18n } from "vue-i18n";
import dayjs from "dayjs/esm";
import "dayjs/esm/locale/es";
import "dayjs/esm/locale/fr";
import "dayjs/esm/locale/it";
import "dayjs/esm/locale/pt";
import "dayjs/esm/locale/sr";
import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat';
import RelativeTime from "dayjs/esm/plugin/relativeTime";
import messages from '@intlify/unplugin-vue-i18n/messages';

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime, {
  thresholds: [
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 1 },
    { l: 'yy', d: 'year' }
  ],
});
dayjs.locale(lang);

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang,
  messages,
  formatFallbackMessages: true
});

export default i18n;
export { dayjs, i18n };
