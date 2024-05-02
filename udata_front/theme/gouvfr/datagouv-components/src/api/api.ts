import axios from "axios";
import { config } from "../config";
import { computed, watch } from "vue";

const CancelToken = axios.CancelToken;
export const generateCancelToken = () => CancelToken.source();

export const generateAbortcontroller = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController;
};

export const apiRootAbsoluteRef = computed(() => config.api_root?.startsWith("http") ? config.api_root : document.location.origin + config.api_root);
export let api_root_absolute = apiRootAbsoluteRef.value;

export const api2RootAbsoluteRef = computed(() => config.api_2_root?.startsWith("http") ? config.api_2_root : document.location.origin + config.api_2_root);
export let api_2_root_absolute = api2RootAbsoluteRef.value;

// Instantiate axios with base URL from config
// No need for CSRF or anything fancy here
// TODO : maybe add interceptor to better handle errors ?
export const api = axios.create({
  baseURL: api_root_absolute,
});

export const apiv2 = axios.create({
  baseURL: api_2_root_absolute,
});

watch(apiRootAbsoluteRef, (value) => {
  api_root_absolute = value;
  api.defaults.baseURL = value;
});

watch(api2RootAbsoluteRef, (value) => {
  api_2_root_absolute = value;
  apiv2.defaults.baseURL = value;
});
