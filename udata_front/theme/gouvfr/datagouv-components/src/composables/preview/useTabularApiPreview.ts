import { computed } from "vue";
import { config } from "../../config";
import type { Resource } from "../../types/resources";

export default function useTabularApiPreview(resource: Resource) {
  const hasPreview = computed<boolean>(() => config.tabular_api_url &&
    resource.extras['analysis:parsing:finished_at'] &&
    !resource.extras['analysis:parsing:error'] &&
    (config.tabular_allow_remote || resource.filetype === "file")
  );
  return {
    hasPreview,
  };
}
