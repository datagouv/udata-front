import type { License } from "@etalab/data.gouv.fr-components";
import { MaybeRefOrGetter, ref, toValue, watchEffect } from "vue";
import fetchLicenses from "../api/licenses";

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
