import { toValue } from "vue";
import { api } from "../plugins/api";
import { Organization } from "../types";

export function createOrganization(organization: Organization) {
  return api.post("organizations/", {
    ...toValue(organization),
  }).then(resp => resp.data);
}

export function uploadLogo(organizationId: string, file: any) {
  return api.postForm(`organizations/${organizationId}/logo`, {
    file: file
  });
}
