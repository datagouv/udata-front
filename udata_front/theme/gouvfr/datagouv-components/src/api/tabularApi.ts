import axios from "axios";
import { config } from "../config";

export type SortConfig = {
  column: string;
  type: string;
} | null;

/**
 * Call Tabular-api to get table content
 */
export function getData(id: string, page: number, sortConfig?: SortConfig) {
  // Make url with id
  let url = `${config.tabular_api_url}/api/resources/${id}/data/?page=${page}&page_size=${config.tabular_page_size}`;

  if (sortConfig) {
    url = url + `&${sortConfig.column}__sort=${sortConfig.type}`;
  }
  return axios.get(url);
}

/**
 * Call Tabular-api to get table profile
 */
export function getProfile(id: string) {
  // Make url with id
  const url = `${config.tabular_api_url}/api/resources/${id}/profile/`;
  return axios.get(url);
}
