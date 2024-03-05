<template>
  <p class="fr-badge" :class="{
    'fr-badge--beige-gris-galet': !type || type === 'default',
    'fr-badge--blue-cumulus': type === 'info',
    'fr-badge--error fr-badge--no-icon': type === 'error',
    'fr-badge--warning fr-badge--no-icon': type === 'warning',
    'fr-badge--success fr-badge--no-icon': type === 'success'
  }">
    <slot></slot>
  </p>
</template>
<script setup lang="ts">
import type { AdminBadgeState } from '../../types';

defineProps<{type?: AdminBadgeState }>();
</script>
