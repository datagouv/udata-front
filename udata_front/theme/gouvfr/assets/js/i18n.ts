/*
 * Handle i18n loading
 */
import { lang } from "./config";
import { createI18n } from "vue-i18n";
import messages from '@intlify/unplugin-vue-i18n/messages';
import { setupI18nWithExistingInstance } from "@etalab/data.gouv.fr-components";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang,
  messages,
  formatFallbackMessages: true
});

setupI18nWithExistingInstance(i18n);

export default i18n;
export { i18n };
