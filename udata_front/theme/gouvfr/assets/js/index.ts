import { createApp } from "vue";
import { setupComponents } from "@etalab/data.gouv.fr-components";

import "./dsfr.ts";
// @ts-ignore
import "@gouvfr/dsfr/dist/dsfr/dsfr.module";

import Chart from "./components/charts/chart.vue";
import Threads from "./components/discussions/Threads.vue";
import ThreadCreate from "./components/discussions/ThreadCreate/ThreadCreate.vue";
import MenuSearch from "./components/search/MenuSearch/MenuSearch.vue";
import Search from "./components/search/Search/Search.vue";
import DeleteButton from "./components/utils/DeleteButton/DeleteButton.vue";
import FeaturedButton from './components/utils/featured.vue';
import FollowButton from "./components/utils/follow-button.vue";
import ReadMore from "./components/ReadMore/ReadMore.vue";
import RequestMembership from "./components/organization/request-membership.vue";
import ResourceFromHash from "./components/dataset/resource/resourceFromHash.vue";
import Resources from "./components/dataset/resource/resources.vue";
import Captcha from "./components/utils/captcha.vue";
import Toggletip from "./components/utils/Toggletip/Toggletip.vue";
import UserDatasetList from "./components/UserDatasetList/UserDatasetList.vue";
import UserReuseList from "./components/UserReuseList/UserReuseList.vue";
import PublishingForm from "./pages/PublishingForm/PublishingForm.vue";

import "./components/vanilla/tabs.js";
import "./components/vanilla/accordion.js";
import "./components/vanilla/clipboard.js";
import "./components/vanilla/dialog.js";
import "./components/vanilla/sort-search.js";
import handleUpdateUrlButtons from "./components/vanilla/update-url.js";

import i18n from "./i18n.ts";
import { admin_root, api_root, api_2_root, explorable_resources, schema_catalog_url, schema_documentation_url, schema_validata_url, title, } from "./config.ts";
import Api from "./plugins/api.ts";
import EventBus from "./plugins/eventbus.ts";
import Auth from "./plugins/auth.ts";
import InitSentry from "./sentry.ts";

setupComponents({
  admin_root,
  api_root,
  api_2_root,
  default_lang: i18n.global.locale.value,
  explorable_resources,
  only_locales: i18n.global.locale.value,
  schema_catalog_url,
  schema_documentation_url,
  schema_validata_url,
  show_copy_resource_permalink: true,
  title,
});

const configAndMountApp = (el: HTMLElement) => {
  const app = createApp({});

  // Configure as early as possible in the app's lifecycle
  InitSentry(app);

  app.use(Api);
  app.use(EventBus);
  app.use(Auth);
  app.use(i18n);

  app.component("discussion-threads", Threads);
  app.component("discussion-create", ThreadCreate);
  app.component("menu-search", MenuSearch);
  app.component("search", Search);
  app.component("delete-button", DeleteButton);
  app.component("featured-button", FeaturedButton);
  app.component("follow-button", FollowButton);
  app.component("read-more", ReadMore);
  app.component("request-membership", RequestMembership);
  app.component("dataset-resources", Resources);
  app.component("dataset-resource-from-hash", ResourceFromHash);
  app.component("captcha", Captcha);
  app.component("chart", Chart);
  app.component("toggletip", Toggletip);
  app.component("publishing-form", PublishingForm);
  app.component("user-dataset-list", UserDatasetList);
  app.component("user-reuse-list", UserReuseList);

  // @ts-ignore unset delimiters used in html templates to prevent injections using {{ }}
  app.config.compilerOptions.delimiters = [];

  app.mount(el);
};

const elements = document.querySelectorAll<HTMLElement>(".vuejs");

elements.forEach((el) => {
  //We keep the div HTML from before trying to mount the VueJS App
  const previousHtml = el.innerHTML;

  try {
    configAndMountApp(el);
  } catch (e) {
    //If the mount wasn't successful, Vue will remove all HTML from the div. We'll put it back so you can use the website.
    el.innerHTML = previousHtml;

    console.log(
      `VueJS template compilation failed for element ${el.className}.
      Aborted the process and rolled back the HTML.
      See error(s) above and below (probably won't help you tho) :`
    );
    console.log(el);
    console.error(e);
    throw e;
  }
});
// @ts-ignore dsfr is added by @gouvfr/dsfr
globalThis.dsfr.start();
console.log("JS is injected !");
handleUpdateUrlButtons();
