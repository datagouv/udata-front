import { getLocalizedUrl } from "../helpers/i18n";
import { api } from "../api";
import type { ReuseType } from "../types/reuses";

let reuseTypesRequest: Array<ReuseType> | null = null;

export function getReuseTypesUrl() {
  return getLocalizedUrl("reuses/types/");
}

export function getReuseTopicsUrl() {
  return getLocalizedUrl("reuses/topics/");
}

export async function fetchReuseTypes() {
  if (reuseTypesRequest) {
    return reuseTypesRequest;
  }
  const request = api.get<Array<ReuseType>>(getReuseTypesUrl())
  const resp = await request;
  reuseTypesRequest = resp.data;
  return reuseTypesRequest;
}

export function getType(types: Array<ReuseType>, id: string): string {
  const type = types.find(t => t.id === id);
  return type ? type.label : "";
}
