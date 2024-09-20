import type { License } from "@datagouv/components/ts";
import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";

let licensesRequest: Promise<Array<License>> | null = null;

export function getLicensesUrl() {
  return getLocalizedUrl("datasets/licenses/");
}

export default function fetchLicenses() {
  if (licensesRequest) {
    return licensesRequest;
  }
  return licensesRequest = api.get<Array<License>>(getLicensesUrl())
  .then((resp) => resp.data);
}
