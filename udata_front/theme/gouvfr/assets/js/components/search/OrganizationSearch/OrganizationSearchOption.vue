<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center border-default-grey border-bottom">
    <!-- Logo/Placeholder column -->
    <div class="fr-col-auto fr-display-flex justify-center fr-my-auto">
      <img v-if="logo" :src="logo" alt="Organization Logo" height="30" class="fr-mx-1w" />
      <Placeholder v-else type="organization" :size="30" class="fr-mx-1w" />
    </div>
    <!-- Name column -->
    <div class="fr-col fr-display-flex align-items-center fr-my-auto">
      <span class="fr-name">{{ name }}</span>
    </div>
    <!-- Link column -->
    <div class="fr-col-auto fr-display-flex align-items-center justify-end fr-my-auto fr-mr-1w">
      <a target="_blank" :href="link">{{ t('See Organization') }}</a>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Placeholder from '../../utils/placeholder.vue';
const { t } = useI18n();

const props = defineProps<{
  logo?: string;
  name: string;
  link: string;
}>();
</script>
  