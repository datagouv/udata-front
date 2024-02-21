import { createApp } from "vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { setupComponents } from "@etalab/data.gouv.fr-components";

import "./dsfr.ts";
// @ts-ignore
import "@gouvfr/dsfr/dist/dsfr/dsfr.module";

import Admin from "./pages/Admin/Admin.vue";

import i18n from "./i18n.ts";
import { admin_root, explorable_resources, schema_catalog_url, schema_documentation_url, schema_validata_url, title } from "./config.ts";
import Api from "./plugins/api.ts";
import EventBus from "./plugins/eventbus.ts";
import Auth from "./plugins/auth.ts";
import InitSentry from "./sentry.ts";

setupComponents({
  admin_root,
  default_lang: i18n.global.locale.value,
  explorable_resources,
  only_locales: i18n.global.locale.value,
  schema_catalog_url,
  schema_documentation_url,
  schema_validata_url,
  show_copy_resource_permalink: true,
  title,
});

const routes: Array<RouteRecordRaw> = [
//   { path: '/', component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(Admin);

InitSentry(app);

app.use(Api);
app.use(EventBus);
app.use(Auth);
app.use(i18n);
app.use(router);

app.mount("#admin");
// @ts-ignore dsfr is added by @gouvfr/dsfr
globalThis.dsfr.start();
console.log("JS is injected !");