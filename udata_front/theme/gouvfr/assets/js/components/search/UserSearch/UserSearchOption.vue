<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center border-default-grey border-bottom">
    <div class="fr-col-auto fr-display-flex justify-center fr-my-auto">
      <Avatar :user class="fr-mx-1w" />
    </div>
    <div class="fr-col fr-display-flex align-items-center fr-my-auto">
      {{ user.first_name + " " + user.last_name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@etalab/data.gouv.fr-components';
import Avatar from '../../discussions/Avatar/Avatar.vue';

defineProps<{
  user: User
}>();
</script>
