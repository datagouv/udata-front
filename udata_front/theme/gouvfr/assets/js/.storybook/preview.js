import "../../less/style.less";

import { setup } from '@storybook/vue3';
import i18n from "../i18n";

setup((app) => {
  app.use(i18n);
});
