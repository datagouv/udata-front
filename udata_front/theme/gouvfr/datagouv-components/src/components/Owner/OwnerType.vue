<template>
  <p class="text-mention-grey fr-text--sm fr-my-0">
    <OwnerTypeIcon :type="type" /> {{ name }}
  </p>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import OwnerTypeIcon from "./OwnerTypeIcon.vue";
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, OTHER, PUBLIC_SERVICE, USER, type OrganizationTypes, type UserType } from "../../composables/organizations/useOrganizationType";
import { throwOnNever } from "../../helpers/throwOnNever";

const props = defineProps<{
  type: OrganizationTypes | UserType;
}>();

const { t } = useI18n();

 const name = computed(() => {
  switch (props.type) {
    case PUBLIC_SERVICE:
      return t("Public service");
    case LOCAL_AUTHORITY:
      return t("Local authority");
    case ASSOCIATION:
      return t("Association");
    case COMPANY:
      return t('Company');
      case OTHER:
      return t('Other');
    case USER:
      return t("User");
    default:
      return throwOnNever(props.type, `Unknown type ${props.type}`);
  };
});
</script>
