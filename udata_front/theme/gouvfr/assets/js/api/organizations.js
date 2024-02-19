import { toValue } from "vue";
import { api } from "../plugins/api";

/**
* @param {import("vue").MaybeRefOrGetter<import("../types").Organization>} organization
* @returns {Promise<import("../types").Organization>}
*/
export function createOrganization(organization) {
  return api.post("organizations/", {
    ...toValue(organization),
  }).then(resp => resp.data);
}

export function uploadLogo(organizationId, file) {
  return api.post(`organizations/${organizationId}/logo/`, {
    file: toValue(file),
  });
}
