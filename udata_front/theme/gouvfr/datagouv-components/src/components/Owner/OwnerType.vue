<template>
  <p :class="`${colorClass} fr-text--${size} fr-my-0`">
    <OwnerTypeIcon :type="type" /> {{ name }}
  </p>
</template>
<script setup lang="ts">
import { computed } from "vue";
import OwnerTypeIcon from "./OwnerTypeIcon.vue";
import { findOrganizationType, type OrganizationTypes, type UserType } from "../../composables/organizations/useOrganizationType";

const props = withDefaults(defineProps<{
  type: OrganizationTypes | UserType;
  size?: 'sm' | 'xs';
  color?: 'black' | 'grey';
}>(), {
  size: 'sm',
  color: 'grey',
});

const colorClass = computed(() => {
  switch(props.color) {
    case "black":
      return 'text-grey-500';
    case "grey":
      return 'text-mention-grey'
  }
});

const name = computed(() => findOrganizationType(props.type).label);
</script>
