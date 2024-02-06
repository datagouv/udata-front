import axios from "axios";
import { api_root, api_2_root } from "../config";
import type { App } from "vue";

const CancelToken = axios.CancelToken;
export const generateCancelToken = () => CancelToken.source();

export const api_root_absolute = api_root?.startsWith("http") ? api_root : document.location.origin + api_root;

export const api_2_root_absolute = api_2_root?.startsWith("http") ? api_2_root : document.location.origin + api_2_root;

// Instantiate axios with base URL from config
// No need for CSRF or anything fancy here
// TODO : maybe add interceptor to better handle errors ?
export const api = axios.create({
  baseURL: api_root_absolute,
});
export const apiv2 = axios.create({
  baseURL: api_2_root_absolute,
});

export const install = (app: App) => {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$apiv2 = apiv2;
};

export default install;
