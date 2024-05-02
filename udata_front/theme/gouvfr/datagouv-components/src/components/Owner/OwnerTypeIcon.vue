<template>
  <Vicon v-if="type === PUBLIC_SERVICE" name="ri-bank-line"/>
  <Vicon v-else-if="type === ASSOCIATION" name="ri-community-line"/>
  <Vicon v-else-if="type === LOCAL_AUTHORITY" name="ri-government-line"/>
  <Vicon v-else-if="type === COMPANY" name="ri-building-2-line"/>
  <Vicon v-else name="ri-user-line"/>
</template>
<script setup lang="ts">
import { OhVueIcon as Vicon, addIcons } from "oh-vue-icons";
import { RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine, RiUserLine } from "oh-vue-icons/icons";
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, PUBLIC_SERVICE, type OrganizationTypes } from "../../composables/organizations/useOrganizationType";
import { UserType } from "../../types/users";

addIcons(RiBankLine, RiBuilding2Line, RiCommunityLine, RiGovernmentLine, RiUserLine);

defineProps<{
  type: OrganizationTypes | UserType;
}>();
</script>
