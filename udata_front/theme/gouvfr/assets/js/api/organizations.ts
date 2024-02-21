import { toValue } from "vue";
import { api } from "../plugins/api";
import { Organization } from "../types";

export function createOrganization(organization: Organization) {
  return api.post("organizations/", {
    ...toValue(organization),
  }).then(resp => resp.data);
}

export function uploadLogo(organizationId: string, file: any) {
  const apiForm = {
    file: file
  };

  return api.postForm(`organizations/${organizationId}/logo`, {
    ...apiForm,
  });
}
