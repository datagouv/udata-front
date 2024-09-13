import type { License } from "@datagouv/components/ts";
import { MaybeRefOrGetter, ref, toValue, watchEffect } from "vue";
import fetchLicenses from "../api/licenses";

/** TODO : to be removed when the component moved to data.gouv.fr-components */

export default function useLicense(id: MaybeRefOrGetter<string>) {
    const license = ref<License | null>(null);
    watchEffect(() => {
      id = toValue(id);
      fetchLicenses().then(licenses => {
          const found = licenses.find((license: License) => license.id === id);
          if(found) {
              license.value = found;
          }
      });
    });
    return license;
}
