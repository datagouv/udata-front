<template>
  <Well
    color="error"
    type="secondary"
    weight="regular"
  >
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
      <slot></slot>
    </div>
  </Well>
</template>
<script setup lang="ts">
import { Well } from '@datagouv/components/ts';
</script>
