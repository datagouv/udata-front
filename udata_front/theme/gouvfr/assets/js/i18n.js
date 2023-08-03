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
import { enGB as en, es, fr } from 'date-fns/esm/locale';
import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat';
import RelativeTime from "dayjs/esm/plugin/relativeTime";
import messages from '@intlify/unplugin-vue-i18n/messages';
import { getRegisteredTranslations } from "@etalab/udata-front-plugins-helper";
import { createI18nMessage, minLength as vMinLength, not as vNot, required as vRequired, sameAs as vSameAs, helpers } from '@vuelidate/validators';

const dateLocales = { fr, en, es };

fr.formatLong?.date();

/**
 * Get locale messages for date-fns
 * @param {string} lang
 * @returns {import("date-fns").Locale | undefined}
 */
export function getDatepickerLocale(lang) {
  return dateLocales[lang];
}

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

let loadedModules = {};

/**
 * Reload translations from plugins if they aren't already loaded
 */
export function reloadLocale() {
  const translations = getRegisteredTranslations();
  /** @type {object} */
  let messages = {};
  for (let translation of translations) {
    if(translation.module) {
      if (loadedModules[translation.module]) {
        continue;
      }
      loadedModules[translation.module] = true;
    }
    messages = {...messages, ...translation.messages[lang]};
  }
  i18n.global.mergeLocaleMessage(lang, messages);
}

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

const { withMessage } = helpers;

/**
 *
 * @param {import("@vuelidate/validators").ValidatorWrapper} validator
 * @returns {(message: string, ...args: Array<any>) => import("@vuelidate/core").ValidationRuleWithParams}
 */
function passLocalizedMessageWithArguments(validator) {
  return (message, ...args) => withMessage(message, validator(...args));
}

/**
 *
 * @param {import("@vuelidate/core").ValidationRuleWithoutParams} validator
 * @returns {(message: string, ...args: Array<any>) => import("@vuelidate/core").ValidationRuleWithParams}
 */
function passLocalizedMessageWithoutArguments(validator) {
  return (message) => withMessage(message, validator);
}

/**
 * This is a local fake `t` function
 * @param {string} message
 * @returns {string}
 */
const t = (message) => message;

export const required = withI18nMessage(vRequired, { messagePath: () => t("The field {property} is required.")});
export const requiredWithCustomMessage = passLocalizedMessageWithoutArguments(vRequired);
export const minLength = withI18nMessage(vMinLength, { messagePath: () => t("The {property} field has a minimum length of {min}."), withArguments: true });
export const not = passLocalizedMessageWithArguments(vNot);
export const sameAs = withI18nMessage(vSameAs, { messagePath: () => t("The value must be equal to the ${otherName} value"), withArguments: true });

export default i18n;
export { dayjs, i18n, withMessage };
