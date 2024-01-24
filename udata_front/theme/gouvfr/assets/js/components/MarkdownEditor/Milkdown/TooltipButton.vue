<template>
  <button
    class="fr-btn fr-btn--secondary fr-btn--sm"
    :class="icon"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">

defineProps<{icon: string}>();
const emit = defineEmits<{click: []}>();

</script>
