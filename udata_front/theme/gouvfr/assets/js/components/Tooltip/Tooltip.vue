<template>
  <p v-bind="$attrs" :aria-describedby="id">
    <slot></slot>
  </p>
  <span class="fr-tooltip fr-placement" :id="id" role="tooltip" aria-hidden="true">
    <slot name="tooltip"></slot>
  </span>
</template>

<script setup lang="ts">
import { getRandomId } from '@datagouv/components/ts';

const id = getRandomId("tooltip");
</script>
