import "../../less/style.less";
import "@gouvfr/dsfr/dist/dsfr/dsfr.module";
import { setup } from '@storybook/vue3';
import i18n from "../i18n";

setup((app) => {
  app.use(i18n);
});
