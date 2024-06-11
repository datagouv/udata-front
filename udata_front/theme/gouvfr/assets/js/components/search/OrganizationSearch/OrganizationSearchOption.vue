<template>
  <div class="fr-grid-row fr-grid-row--middle fr-py-1w fr-enlarge-link border-default-grey border-bottom">
    <Placeholder :src="logo" type="organization" :size="30" class="fr-col-auto fr-mx-1w" />
    <a class="fr-col" :href="link">
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
  