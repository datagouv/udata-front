import "../../less/style.less";
import "../dsfr";
import "@gouvfr/dsfr/dist/dsfr/dsfr.module";
import Toaster from "@conciergerie.dev/vue-toaster";
import { setup } from '@storybook/vue3';
import i18n from "../i18n";
import Api from "../plugins/api";
import Datasets from "../pages/Admin/Datasets/Datasets.vue";
import Dataservices from "../pages/Admin/Dataservices/Dataservices.vue";
import Discussions from "../pages/Admin/Discussions/Discussions.vue";
import Harvesters from "../pages/Admin/Harvesters/Harvesters.vue";
import CommunityResources from "../pages/Admin/CommunityResources/CommunityResources.vue";
import Members from "../pages/Admin/Members/Members.vue";
import Profile from "../pages/Admin/Profile/Profile.vue";
import Reuses from "../pages/Admin/Reuses/Reuses.vue";
import Me from "../pages/Admin/Me/Me.vue";
import { type RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

setup((app) => {
  app.use(Api);
  app.use(i18n);


  const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Me },
    {
      path: '/me',
      children: [
        { path: '', component: Me, name: "me" },
        { path: 'datasets', component: Datasets, name: "me-datasets" },
        { path: 'dataservices', component: Dataservices, name: "me-dataservices" },
        { path: 'reuses', component: Reuses, name: "me-reuses" },
        { path: 'community-resources', component: CommunityResources, name: "me-community-resources" },
      ]
    },
    {
      path: '/organizations/:oid',
      children: [
        { path: 'datasets', component: Datasets, props: true, name: "organization-datasets" },
        { path: 'dataservices', component: Dataservices, props: true, name: "organization-dataservices" },
        { path: 'reuses', component: Reuses, props: true, name: "organization-reuses" },
        { path: 'discussions', component: Discussions, props: true, name: "organization-discussions" },
        { path: 'members', component: Members, props: true, name: "organization-members" },
        { path: 'harvesters', component: Harvesters, props: true, name: "organization-harvesters" },
        { path: 'community-resources', component: CommunityResources, props: true, name: "organization-community-resources" },
        { path: 'profile', component: Profile, props: true, name: "organization-profile" },
      ],
    },
  ];

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  app.use(router);

  app.use(Toaster, {
    duration: false,
    dismissible: true,
  }).provide('toast', app.config.globalProperties.$toast);
});

globalThis.dsfr.start();

const preview = {
  decorators: [
    (story, ctx) => {
      return {
        components: { story },
        template: ctx.title.includes("Pages") ? `<story />` : `<div class="fr-container"><story /></div>`,
      };
    },
  ],
};

export default preview;
