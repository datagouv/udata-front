import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import type { GetPaginatedData, Reuse } from "../types";

let reuseTypesRequest: Promise<Array<ReuseType>> | null = null;

export type ReuseType = {
  id: string,
  label: string,
};

export function getReuseTypesUrl() {
  return getLocalizedUrl("reuses/types/");
}

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

export async function getOrganizationReuses(oid: string, page: number, pageSize: number, sort: string) {
  const resp = await api.get<GetPaginatedData<Reuse>>(getLocalizedUrl(`organizations/${oid}/reuses/`), {
    params: { sort, page_size: pageSize, page }
  });
  return resp.data;
}
