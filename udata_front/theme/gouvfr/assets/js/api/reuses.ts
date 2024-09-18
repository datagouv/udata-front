import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";

let reuseTypesRequest: Promise<Array<ReuseType>> | null = null;

export type ReuseType = {
  id: string,
  label: string,
};

export function getReuseTypesUrl() {
  return getLocalizedUrl("reuses/types/");
}

/** TODO : those should be removed and the types from datagouv/components should be used instead when the package will be updated */

export function fetchReuseTypes() {
  if (reuseTypesRequest) {
    return reuseTypesRequest;
  }
  return reuseTypesRequest = api.get<Promise<Array<ReuseType>>>(getReuseTypesUrl())
  .then((resp) => resp.data);
}

export function getType(types: Array<ReuseType>, id: string): string {
  const type = types.find(t => t.id === id);
  return type ? type.label : "";
}
