import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";

let licensesRequest = null;

export function getLicensesUrl() {
  return getLocalizedUrl("datasets/licenses/");
}

/**
 *
 * @returns {Promise<Array>}
 */
export default function fetchLicenses() {
  if (licensesRequest) {
    return licensesRequest;
  }
  return licensesRequest = api.get(getLicensesUrl())
  .then((resp) => resp.data);
}
