import { getLocalizedUrl } from "../helpers/i18n";
import { api } from "../api";

let reuseTypesRequest: Array<ReuseType> | null = null;

export type ReuseType = {
  id: string,
  label: string,
};

export function getReuseTypesUrl() {
  return getLocalizedUrl("reuses/types/");
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
