import { getLocalizedUrl } from "../i18n";
import { toValue } from "vue";
import { api } from "../plugins/api";
import { Reuse } from "../types";

let reuseTypesRequest: Promise<Array<ReuseType>> | null = null;

export type ReuseType = {
  id: string,
  label: string,
};

type UploadLogoResponse = {
  image: string;
  success: boolean;
};

export function getReuseTypesUrl() {
  return getLocalizedUrl("reuses/types/");
}

export function getReuseTopicsUrl() {
  return getLocalizedUrl("reuses/topics/");
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

export function createReuse(reuse: Reuse) {
  return api.post<Reuse>("reuses/", {
    ...toValue(reuse),
  }).then(resp => resp.data);
}

export function updateReuse(reuse: Reuse) {
  return api.put<Reuse>(`reuses/${reuse.value.id}`, {
    ...toValue(reuse),
  }).then(resp => resp.data);
}

export function uploadLogo(reuseId: string, file: File) {
  return api.postForm<UploadLogoResponse>(`reuses/${reuseId}/image`, {
    file: file
  });
}
