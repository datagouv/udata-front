import axios from "axios";
import { config } from "../config";

const CancelToken = axios.CancelToken;
export const generateCancelToken = () => CancelToken.source();

export const generateAbortcontroller = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController;
};

export const api_root_absolute = config.api_root?.startsWith("http") ? config.api_root : document.location.origin + config.api_root;

export const api_2_root_absolute = config.api_2_root?.startsWith("http") ? config.api_2_root : document.location.origin + config.api_2_root;

// Instantiate axios with base URL from config
// No need for CSRF or anything fancy here
// TODO : maybe add interceptor to better handle errors ?
export const api = axios.create({
  baseURL: api_root_absolute,
});
export const apiv2 = axios.create({
  baseURL: api_2_root_absolute,
});
