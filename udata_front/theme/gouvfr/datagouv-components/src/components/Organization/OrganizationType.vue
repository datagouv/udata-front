<template>
  <p class="text-mention-grey fr-text--sm fr-my-0">
    <OrganizationTypeIcon :type="type" /> {{ name }}
  </p>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import OrganizationTypeIcon from "./OrganizationTypeIcon.vue";
import { ASSOCIATION, LOCAL_AUTHORITY, PUBLIC_SERVICE, type OrganizationTypes } from "../../composables/organizations/useOrganizationType";

const props = defineProps<{
  type: OrganizationTypes;
}>();

const { t } = useI18n();

const name = ref(t('Company'));

watchEffect(() => {
  switch (props.type) {
    case PUBLIC_SERVICE:
      name.value = t("Service public");
      break;
    case LOCAL_AUTHORITY:
      name.value = t("Local authority");
      break;
    case ASSOCIATION:
      name.value = t("Association");
      break;
    default:
      name.value = t("Company");
      break;
  }
});
</script>
