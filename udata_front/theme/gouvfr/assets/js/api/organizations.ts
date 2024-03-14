import { Ref, toValue } from "vue";
import { api } from "../plugins/api";
import type { Organization } from "../types";

type UploadLogoResponse = {
  image: string;
  success: boolean;
};

export function createOrganization(organization: Ref<Organization>) {
  return api.post<Organization>("organizations/", {
    ...toValue(organization),
  }).then(resp => resp.data);
}

export function uploadLogo(organizationId: string, file: File) {
  return api.postForm<UploadLogoResponse>(`organizations/${organizationId}/logo`, {
    file: file
  });
}
