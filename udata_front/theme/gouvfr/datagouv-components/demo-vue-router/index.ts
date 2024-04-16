import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";

import { setupI18n } from '../src';

import App from '../demo/App.vue';
import Details from "./Details.vue";
import View from "./View.vue";

const routes = [
  { path: '/', component: App },
  {
    path: '/datasets/:id',
    name: 'dataset_detail',
    component: Details,
  },
  {
    path: '/organizations/:id',
    name: 'organization_detail',
    component: Details,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const i18n = setupI18n();

createApp(View)
.use(i18n)
.use(router)
.mount('#app');
