import type { NewReuse, Reuse } from "@datagouv/components/ts";
import { getLocalizedUrl } from "../i18n";
import { toValue } from "vue";
import { api } from "../plugins/api";
import type { PaginatedArray } from "./types";

export async function getOrganizationReuses(oid: string, page: number, pageSize: number, sort: string) {
  const resp = await api.get<PaginatedArray<Reuse>>(getLocalizedUrl(`reuses/`), {
    params: { organization: oid, sort, page_size: pageSize, page }
  });
  return resp.data;
}
export async function getUserReuses(userId: string, page: number, pageSize: number, sort: string) {
  const resp = await api.get<PaginatedArray<Reuse>>(getLocalizedUrl(`reuses/`), {
    params: { owner: userId, sort, page_size: pageSize, page }
  });
  return resp.data;
}

type UploadLogoResponse = {
  image: string;
  success: boolean;
}

export function createReuse(reuse: NewReuse) {
  return api.post<Reuse>("reuses/", {
    ...toValue(reuse),
  }).then(resp => resp.data);
}

export function updateReuse(reuse: Reuse) {
  return api.put<Reuse>(`reuses/${reuse.id}/`, {
    ...toValue(reuse),
  }).then(resp => resp.data);
}

export function uploadLogo(reuseId: string, file: File) {
  return api.postForm<UploadLogoResponse>(`reuses/${reuseId}/image`, {
    file: file
  });
}

export async function getReuse(id: string) {
  const resp = await api.get<Reuse>(`/reuses/${id}/`);
  return resp.data;
}
