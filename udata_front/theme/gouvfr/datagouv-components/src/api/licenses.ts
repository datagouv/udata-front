import { getLocalizedUrl } from "../helpers/i18n";
import { type License } from "../types/licenses";
import { api } from "../api";

let licensesRequest: Promise<License[]>;

export function getLicensesUrl() {
  return getLocalizedUrl("datasets/licenses/");
}

export default function fetchLicenses(): Promise<License[]> {
  if (licensesRequest) {
    return licensesRequest;
  }
  return licensesRequest = api.get(getLicensesUrl())
  .then((resp) => resp.data);
}
