import "../../less/style.less";
import "@gouvfr/dsfr/dist/dsfr/dsfr.module";
import Toaster from "@conciergerie.dev/vue-toaster";
import { setup } from '@storybook/vue3';
import i18n from "../i18n";
import Api from "../plugins/api";

setup((app) => {
  app.use(Api);
  app.use(i18n);
  app.use(Toaster, {
    duration: false,
    dismissible: true,
  }).provide('toast', app.config.globalProperties.$toast);
});
