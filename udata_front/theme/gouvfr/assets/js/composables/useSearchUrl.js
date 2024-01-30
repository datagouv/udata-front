import { computed } from "vue";
import { dataset_url, organization_url, reuse_url } from "../config";

/**
 *
 * @param {import("vue").Ref<string>} q
 * @returns {{datasetUrl: import("vue").ComputedRef<string>, organizationUrl: import("vue").ComputedRef<string>, reuseUrl: import("vue").ComputedRef<string>}}
 */
export default function useSearchUrl(q) {
  const datasetUrl = computed(() => `${dataset_url}?q=${q.value}`);
  const organizationUrl = computed(() => `${organization_url}?q=${q.value}`);
  const reuseUrl = computed(() => `${reuse_url}?q=${q.value}`);
  return {
    datasetUrl,
    organizationUrl,
    reuseUrl,
  }
}
