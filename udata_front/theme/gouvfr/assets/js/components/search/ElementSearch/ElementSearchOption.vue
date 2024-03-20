<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
    <div class="fr-col fr-display-flex justify-center">
      <img v-if="logo" :src="logo" alt="Organization Logo" height="50" class="fr-mx-1w" />
      <Placeholder
        v-else
        type="organization"
        :size="50"
        class="fr-mx-1w"
      />
      <span class="fr-name">{{ name }}</span>
    </div>
    <div class="fr-col-auto fr-display-flex text-align-right justify-center fr-my-auto">
      <a target="_blank" :href="link">{{ t('See Organization') }}</a>
    </div>
  </div>
</template>

  
<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import Placeholder from '../../utils/placeholder.vue';
const { t } = useI18n();

const props = defineProps<{
  logo?: string;
  name: string;
  link: string;
}>();
</script>
  