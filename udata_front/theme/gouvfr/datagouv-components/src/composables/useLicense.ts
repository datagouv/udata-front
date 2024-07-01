import {ref, unref} from "vue";
import fetchLicenses from "../api/licenses";
import { type License } from "../types/licenses";

/** TODO : to be removed when the component moved to data.gouv.fr-components */

export default function useLicense(id: string) {
  id = unref(id);
  const license = ref<License | null>(null);
  fetchLicenses().then((licenses: License[]) => {
    const found = licenses.find(license => license.id === id);
    if(found) {
      license.value = found;
    }
  });
  return license;
}
