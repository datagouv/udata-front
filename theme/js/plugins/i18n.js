/*
 * Handle i18n loading
 */
import config from "../config";
import { createI18n } from "vue-i18n";

// TODO : use glob import from Vite : https://vitejs.dev/guide/features.html#glob-import
import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";


export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: config.lang,
  messages: {
    en,
    es,
    fr
  },
  formatFallbackMessages: true
});
