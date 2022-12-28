import {computed} from "vue";
import config from "../config";

/**
 *
 * @param {import("vue").Ref<string>} q
 * @returns {{datasetUrl: import("vue").ComputedRef<string>, organizationUrl: import("vue").ComputedRef<string>, reuseUrl: import("vue").ComputedRef<string>}}
 */
export default function useSearchUrl(q) {
  const datasetUrl = computed(() => `${config.values.datasetUrl}?q=${q.value}`);
  const organizationUrl = computed(() => `${config.values.organizationUrl}?q=${q.value}`);
  const reuseUrl = computed(() => `${config.values.reuseUrl}?q=${q.value}`);
  return {
    datasetUrl,
    organizationUrl,
    reuseUrl,
  }
}
