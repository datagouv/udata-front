<template>
  <a
    :href="adminUrl"
    class="fr-btn fr-btn--secondary fr-btn--secondary-warning-425 fr-icon-pencil-line fr-icon--sm"
    data-testid="edit-button"
  >
    {{ t("Edit file") }}
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { config } from "../../config";
import { useI18n } from "vue-i18n";
import { CommunityResource, Resource } from "../../types/resources";

type Props = {
  datasetId: string,
  isCommunityResource?: boolean,
  resource: Resource | CommunityResource,
};

const props = withDefaults(defineProps<Props>(), {
  isCommunityResource: false,
});

const { t } = useI18n();

const adminUrl = computed(() => {
  if (config.new_admin) {
    if ('owner' in props.resource && props.resource.owner) {
      return `${config.admin_root}users/${props.resource.owner.id}/community-resources/?resource_id=${props.resource.id}`
    } else if ('organization' in props.resource && props.resource.organization) {
      return `${config.admin_root}organization/${props.resource.organization.id}/community-resources/?resource_id=${props.resource.id}`
    } else {
      return `${config.admin_root}datasets/${props.datasetId}/files/?resource_id=${props.resource.id}`
    }
  } else {
    return `${config.admin_root}dataset/${props.datasetId}/${props.isCommunityResource ? 'community-resource' : 'resource'}/${props.resource.id}`
  }
  
})
</script>
