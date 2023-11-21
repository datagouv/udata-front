<template>
  <a
    :href="adminUrl"
    class="fr-btn fr-btn--secondary fr-btn--secondary-warning-425 fr-icon-pencil-line fr-icon--sm"
  >
    {{ t("Edit file") }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { admin_root } from "../../config";
import { useI18n } from "vue-i18n";

export default defineComponent({
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
    const { t } = useI18n();
    const resourceType = props.isCommunityResource ? 'community-resource' : 'resource';
    const adminUrl = `${admin_root}dataset/${props.datasetId}/${resourceType}/${props.resourceId}`;
    return {
      adminUrl,
      t,
    }
  }
});
</script>
