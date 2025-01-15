import { api, type Dataservice, type Dataset } from "@datagouv/components/ts";
import type { PaginatedArray } from "./types";
import { getLocalizedUrl } from "../i18n";
import { api, type Dataservice, type NewDataservice } from "@datagouv/components/ts";
import { toValue } from "vue";

export function createDataservice(dataservice: NewDataservice) {
  return api.post<Dataservice>("dataservices/", {
    ...toValue(dataservice),
  }).then(resp => resp.data);
}

export function updateDataservice(dataservice: Dataservice) {
  return api.patch<Dataservice>(`dataservices/${dataservice.id}/`, {
    ...toValue(dataservice),
  }).then(resp => resp.data);
}

export async function getDataservice(id: string) {
  const res = await api.get<Dataservice>(`dataservices/${id}/`);
  return res.data;
}

export async function getOrganizationDataservices(oid: string, page: number, pageSize: number, sortDirection: string) {
  const resp = await api.get<PaginatedArray<Dataservice>>(getLocalizedUrl(`dataservices/`), {
    params: { organization: oid, sort: sortDirection, page_size: pageSize, page }
  });
  return resp.data;
}

export async function getUserDataservices(userId: string, page: number, pageSize: number, sortDirection: string) {
  const resp = await api.get<PaginatedArray<Dataservice>>(getLocalizedUrl(`dataservices/`), {
    params: { sort: sortDirection, page_size: pageSize, page, owner: userId }
  });
  return resp.data;
}