<template>
  <div class="fr-grid-row fr-grid-row--center fr-py-1w fr-enlarge-link border-default-grey border-bottom">
    <!-- Logo/Placeholder column -->
    <div class="fr-col-auto fr-display-flex justify-center fr-my-auto">
      <img v-if="logo" :src="logo" alt="Organization Logo" height="30" class="fr-mx-1w" />
      <Placeholder v-else type="organization" :size="30" class="fr-mx-1w" />
    </div>
    <!-- Name column -->
    <a class="fr-col fr-display-flex align-items-center justify-center fr-my-auto" :href="link">
      <span class="fr-text--bold">{{ name }}</span>
    </a>
  </div>
</template>
  
<script setup lang="ts">
import Placeholder from '../../utils/placeholder.vue';

defineProps<{
  logo?: string;
  name: string;
  link: string;
}>();
</script>
  