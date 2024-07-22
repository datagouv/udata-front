import dayjs from "dayjs/esm";
import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat';
import RelativeTime from "dayjs/esm/plugin/relativeTime";
import { DefineLocaleMessage, I18n, Locale, createI18n } from "vue-i18n";
import messages from '@intlify/unplugin-vue-i18n/messages';
import { config } from "../config";
import { api_root_absolute } from "../api/api";
import { getRegisteredTranslations } from "@etalab/udata-front-plugins-helper";

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

let i18n : I18n | null = null;

const setupI18n = () => {
  i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: config.default_lang,
    messages: {},
    formatFallbackMessages: true
  });
  setupI18nWithExistingInstance(i18n);
  return i18n;
}

const setupI18nWithExistingInstance = (newI18n: I18n) => {
  const locales = config.only_locales.split(",");
  if(!locales.includes(config.default_lang)) {
    throw new Error("Default lang is not in only locales, it won't be loaded");
  }

  const modules = import.meta.glob<{default: any}>("/node_modules/dayjs/esm/locale/*.js");
  let langPromises = [];
  for (let path in modules) {
    let locale = path.split("/").pop()?.split(".").shift() ?? "";
    if(locales.includes(locale)) {
      langPromises.push(modules[path]());
    }
  }
  const isFulfilled = <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> => result.status === 'fulfilled';

  Promise.allSettled(langPromises).then(results => {
    const loadedLocales = results
      .filter(isFulfilled)
      .map(result => result.value.default);
    for(let loadedLocale of loadedLocales) {
      dayjs.locale(loadedLocale, undefined, true);
    }
    dayjs.locale(config.default_lang);
  });

  i18n = newI18n;

  for (let locale in messages) {
    if(locales.includes(locale)) {
      i18n.global.mergeLocaleMessage(locale, messages[locale]);
    }
  }

  return i18n;
}

const loadedModules: Record<string, boolean> = {};

export function getLocalizedUrl (path: string) {
  const lang = i18n?.global.locale.value ?? config.default_lang;
  const url = new URL(api_root_absolute + path);
  const params = new URLSearchParams({ lang });
  url.search = params.toString();
  return url.toString();
}

/**
 * Reload translations from plugins if they aren't already loaded
 */
export function reloadLocale() {
  const translations = getRegisteredTranslations();
  let messages: Record<string, any> = {};
  for (let translation of translations) {
    if(translation.module) {
      if (loadedModules[translation.module]) {
        continue;
      }
      loadedModules[translation.module] = true;
    }
    messages = {...messages, ...(translation.messages as Record<Locale, DefineLocaleMessage>)[config.default_lang]};
  }
  if(i18n) {
    i18n.global.mergeLocaleMessage(config.default_lang, messages);
  }
}

export { dayjs, i18n, setupI18n, setupI18nWithExistingInstance };
