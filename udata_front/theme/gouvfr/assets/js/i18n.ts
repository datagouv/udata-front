/*
 * Handle i18n loading
 */
import { lang } from "./config";
import { createI18n } from "vue-i18n";
import messages from '@intlify/unplugin-vue-i18n/messages';
import { setupI18nWithExistingInstance } from "@etalab/data.gouv.fr-components";
import { enGB as en, es, fr } from 'date-fns/esm/locale';
import { createI18nMessage, minLength as vMinLength, not as vNot, required as vRequired, requiredIf as vRequiredIf, sameAs as vSameAs, helpers, type ValidatorWrapper } from '@vuelidate/validators';
import { api_root_absolute } from "./plugins/api";
import type { ValidationRuleWithoutParams } from "@vuelidate/core";

const dateLocales = { fr, en, es };

fr.formatLong?.date();

export function getLocalizedUrl (path: string) {
  const url = new URL(api_root_absolute + path);
  const params = new URLSearchParams({ lang });
  url.search = params.toString();
  return url.toString();
}

const isLangKey = (value: string): value is keyof typeof dateLocales => {
  return Object.keys(dateLocales).includes(value);
}

export function getDatepickerLocale(lang: keyof typeof dateLocales | string) {
  if(isLangKey(lang)) {
    return dateLocales[lang];
  }
  return undefined;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang,
  messages,
  formatFallbackMessages: true
});

setupI18nWithExistingInstance(i18n);


const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

const { withMessage } = helpers;

function passLocalizedMessageWithArguments(validator: ValidatorWrapper) {
  return (message: string, ...args: Array<any>) => withMessage(message, validator(...args));
}

function passLocalizedMessageWithoutArguments(validator: ValidationRuleWithoutParams) {
  return (message: string) => withMessage(message, validator);
}

const t = (message: string) => message;

const requiredText = t("The field {property} is required.");

export const required = withI18nMessage(vRequired, { messagePath: () => requiredText});
export const requiredIf = withI18nMessage(vRequiredIf, { messagePath: () => requiredText, withArguments: true });
export const requiredWithCustomMessage = passLocalizedMessageWithoutArguments(vRequired);
export const minLength = withI18nMessage(vMinLength, { messagePath: () => t("The {property} field has a minimum length of {min}."), withArguments: true });
export const minLengthWarning = withI18nMessage(vMinLength, { messagePath: () => t("It's advised to have a {property} of at least {min} characters."), withArguments: true });
export const not = passLocalizedMessageWithArguments(vNot);
export const sameAs = withI18nMessage(vSameAs, { messagePath: () => t("The value must be equal to the ${otherName} value"), withArguments: true });

export default i18n;
export { i18n, withMessage };
