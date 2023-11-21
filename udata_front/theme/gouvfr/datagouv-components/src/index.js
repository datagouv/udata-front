import { createApp } from 'vue';
import { i18n } from './helpers/i18n';

import App from './App.vue';

createApp(App)
.use(i18n)
.mount('#app');

window.dsfr.start();
