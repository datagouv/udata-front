import { api, type Dataservice, type Dataset } from "@datagouv/components/ts";
import type { PaginatedArray } from "./types";
import { getLocalizedUrl } from "../i18n";

export async function getDataservice(id: string) {
  const res = await api.get<Dataservice>(`dataservices/${id}/`);
  return res.data;
}

export async function getOrganizationDataservices(oid: string, page: number, pageSize: number, sortDirection: string) {
  //TODO : need to update back with this api first
  //const resp = await api.get<PaginatedArray<Dataservice>>(getLocalizedUrl(`organizations/${oid}/dataservices/`), {
  const resp = await api.get<PaginatedArray<Dataservice>>(getLocalizedUrl(`dataservices/`), {
    params: { sort: sortDirection, page_size: pageSize, page }
  });
  return resp.data;
}

export async function getUserDataservices(userId: string, page: number, pageSize: number, sortDirection: string) {
  const resp = await api.get<PaginatedArray<Dataservice>>(getLocalizedUrl(`dataservices/`), {
    params: { sort: sortDirection, page_size: pageSize, page, owner: userId }
  });
  return resp.data;
}