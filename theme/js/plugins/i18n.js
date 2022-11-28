/*
 * Handle i18n loading
 */
import config from "../config";
import { createI18n } from "vue-i18n";

import messages from '@intlify/unplugin-vue-i18n/messages';
import { getRegisteredTranslations } from "udata-front";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: config.lang,
  messages,
  formatFallbackMessages: true
});

let loadedModules = {};

/**
 * Reload translations from plugins if they aren't already loaded
 */
export function reloadLocale() {
  const translations = getRegisteredTranslations();
  let messages = {};
  for (let translation of translations) {
    if(translation.module) {
      if (loadedModules[translation.module]) {
        continue;
      }
      loadedModules[translation.module] = true;
    }
    messages = {...messages, ...translation.messages[config.lang]};
  }
  i18n.global.mergeLocaleMessage(config.lang, messages);
}

export default i18n;
