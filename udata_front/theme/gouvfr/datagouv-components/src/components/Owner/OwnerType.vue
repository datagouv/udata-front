<template>
  <p class="text-mention-grey fr-text--sm fr-my-0">
    <OwnerTypeIcon :type="type" /> {{ name }}
  </p>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import OwnerTypeIcon from "./OwnerTypeIcon.vue";
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, PUBLIC_SERVICE, type OrganizationTypes } from "../../composables/organizations/useOrganizationType";
import type { UserType } from "../../types/users";

const props = defineProps<{
  type: OrganizationTypes | UserType;
}>();

const { t } = useI18n();

const name = ref("");

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
    case COMPANY:
      name.value = t('Company');
      break;
    default:
      name.value = t("User");
      break;
  }
});
</script>
