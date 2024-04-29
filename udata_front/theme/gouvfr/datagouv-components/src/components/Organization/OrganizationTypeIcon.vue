<template>
  <Vicon v-if="type === PUBLIC_SERVICE" name="ri-bank-line" aria-hidden="true"/>
  <Vicon v-else-if="type === ASSOCIATION" name="ri-community-line" aria-hidden="true"/>
  <Vicon v-else-if="type === LOCAL_AUTHORITY" name="ri-government-line" aria-hidden="true"/>
  <Vicon v-else name="ri-building-2-line" />
</template>
<script setup lang="ts">
import { OhVueIcon as Vicon, addIcons } from "oh-vue-icons";
import { RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine } from "oh-vue-icons/icons";
import { ASSOCIATION, LOCAL_AUTHORITY, PUBLIC_SERVICE, type OrganizationTypes } from "../../composables/organizations/useOrganizationType";

addIcons(RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine);

defineProps<{
  type: OrganizationTypes;
}>();
</script>
