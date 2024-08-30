<template>
  <Vicon :height="wantedSize" :width="wantedSize" v-if="icon" :name="icon"/>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { OhVueIcon as Vicon, addIcons } from "oh-vue-icons";
import { RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine, RiUserLine } from "oh-vue-icons/icons";
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, OTHER, PUBLIC_SERVICE, USER, type OrganizationTypes, type UserType } from "../../composables/organizations/useOrganizationType";
import { throwOnNever } from "../../helpers/throwOnNever";

addIcons(RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine, RiUserLine);

const props = defineProps<{
  type: OrganizationTypes | UserType;
}>();

const wantedSize = 14;

const icon = computed(() => {
  switch(props.type) {
    case PUBLIC_SERVICE:
      return "ri-bank-line";
    case ASSOCIATION:
      return "ri-community-line";
    case LOCAL_AUTHORITY:
      return "ri-government-line";
    case COMPANY:
      return "ri-building-2-line";
    case USER:
      return "ri-user-line";
    case OTHER:
      return "";
    default:
      return throwOnNever(props.type, `Unknown type ${props.type}`);
  }
});
</script>
<style scoped>
.ov-icon {
  vertical-align: -0.1rem;
}
</style>
