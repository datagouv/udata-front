<template>
  <p class="fr-px-1v rounded-2 monospace fr-text--sm text-mention-grey bg-grey-100 fr-m-0">{{ email }}</p>
</template>
<script setup lang="ts">
defineProps<{
  email: string;
}>();
</script>
