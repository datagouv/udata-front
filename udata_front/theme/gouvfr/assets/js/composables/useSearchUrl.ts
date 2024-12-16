import { computed, MaybeRefOrGetter, toValue } from "vue";
import { dataservice_url, dataset_url, organization_url, reuse_url } from "../config";

export default function useSearchUrl(q: MaybeRefOrGetter<string>) {
  const datasetUrl = computed(() => `${dataset_url}?q=${toValue(q)}`);
  const dataserviceUrl = computed(() => `${dataservice_url}?q=${toValue(q)}`);
  const organizationUrl = computed(() => `${organization_url}?q=${toValue(q)}`);
  const reuseUrl = computed(() => `${reuse_url}?q=${toValue(q)}`);
  return {
    dataserviceUrl,
    datasetUrl,
    organizationUrl,
    reuseUrl,
  }
}
