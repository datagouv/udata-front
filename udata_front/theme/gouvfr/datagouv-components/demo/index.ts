import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";

import { setupI18n } from '../src';

import { createApp } from 'vue';
import App from './App.vue';

const i18n = setupI18n();

createApp(App)
.use(i18n)
.mount('#app');
