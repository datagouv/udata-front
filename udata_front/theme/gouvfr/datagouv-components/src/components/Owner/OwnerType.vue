<template>
  <p class="text-mention-grey fr-text--sm fr-my-0">
    <OwnerTypeIcon :type="type" /> {{ name }}
  </p>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import OwnerTypeIcon from "./OwnerTypeIcon.vue";
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, PUBLIC_SERVICE, type OrganizationTypes } from "../../composables/organizations/useOrganizationType";
import type { UserType } from "../../types/users";

const props = defineProps<{
  type: OrganizationTypes | UserType;
}>();

const { t } = useI18n();

 const name = computed(() => {
  switch (props.type) {
    case PUBLIC_SERVICE:
      return t("Service public");
    case LOCAL_AUTHORITY:
      return t("Local authority");
    case ASSOCIATION:
      return t("Association");
    case COMPANY:
      return t('Company');
    default:
      return t("User");
  }
});
</script>
