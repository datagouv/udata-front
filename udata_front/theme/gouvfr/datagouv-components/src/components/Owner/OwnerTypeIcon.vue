<template>
  <Vicon :height="wantedSize" :width="wantedSize" v-if="icon" :name="icon"/>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { OhVueIcon as Vicon, addIcons } from "oh-vue-icons";
import { RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine, RiUserLine } from "oh-vue-icons/icons";
import { findOrganizationType, type OrganizationTypes, type UserType } from "../../composables/organizations/useOrganizationType";

addIcons(RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine, RiUserLine);

const props = defineProps<{
  type: OrganizationTypes | UserType;
}>();

const wantedSize = 14;

const icon = computed(() => findOrganizationType(props.type).icon);
</script>
<style scoped>
.ov-icon {
  vertical-align: -0.1rem;
}
</style>
