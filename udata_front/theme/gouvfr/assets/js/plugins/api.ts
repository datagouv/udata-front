import type { App } from "vue";
import { api_root_absolute, api_2_root_absolute, api, apiv2, generateCancelToken } from "@datagouv/components/ts";

export { api_root_absolute, api_2_root_absolute, api, apiv2, generateCancelToken };

export const install = (app: App) => {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$apiv2 = apiv2;
};

export default install;
