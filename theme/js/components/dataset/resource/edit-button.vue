<template>
  <a
    :href="adminUrl"
    class="fr-btn fr-btn--secondary fr-btn--secondary-warning-425 fr-icon-pencil-line fr-icon--sm"
  >
    {{ $t("Edit resource") }}
  </a>
</template>

<script>
import config from "../../../config";

export default {
  name: "edit-button",
  props: {
    datasetId: {
      type: String,
      required: true,
    },
    isCommunityResource: {
      type: Boolean,
      default: false,
    },
    resourceId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const resourceType = props.isCommunityResource ? 'community-resource' : 'resource';
    const adminUrl = `${config.admin_root}dataset/${props.datasetId}/${resourceType}/${props.resourceId}`;
    return {
      adminUrl,
    }
  }
}
</script>

<style scoped>

</style>
