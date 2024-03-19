<template>
  <div class="fr-grid-row fr-grid-row--gutters justify-between w-100">
    <div class="fr-col fr-display-flex fr-align-items-center">
      <img v-if="logo" :src="logo" alt="Organization Logo" height="50" class="fr-mr-2w" />
      <span class="fr-name">{{ name }}</span>
    </div>
    <div class="fr-col fr-display-flex fr-align-items-center fr-justify-content-end">
      <a target="_blank" :href="link">{{ t('See Organization') }}</a>
    </div>
  </div>
</template>

  
<script setup lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

type Props = {
  logo: string;
  name: string;
  link: string;
};

const props = defineProps<Props>();
</script>
  