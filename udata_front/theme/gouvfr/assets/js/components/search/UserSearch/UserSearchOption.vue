<template>
  <button
    class="w-100 fr-grid-row fr-grid-row--middle border-default-grey border-bottom"
    @click="$emit('click', user)"
  >
    <Avatar :user class="fr-col-auto fr-m-1w" :size="32" :rounded="true" />
    <div class="fr-col text-align-left">
      {{ user.first_name + " " + user.last_name }}
    </div>
  </button>
</template>

<script setup lang="ts">
import type { User } from '@etalab/data.gouv.fr-components';
import Avatar from '../../discussions/Avatar/Avatar.vue';

defineProps<{
  user: User;
}>();

defineEmits<{
  click: [user: User]
}>();
</script>
