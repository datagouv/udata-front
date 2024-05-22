<template>
  <img
    loading="lazy"
    :src="path"
    :alt="alternativeTextForDefinedImageOnly"
    :width="size"
    :height="size"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { computedAsync } from '@vueuse/core';
const props = defineProps<{
  type: string,
  src?: string,
  alt?: string,
  size: number
}>();
const placeholderUrl = async () => {
  const module = await import(`../../assets/img/placeholders/${props.type}.png`);
  return props.src ? props.src : module.default;
};
const alternativeTextForDefinedImageOnly = computed(() => props.src ? props.alt : '');
const path = computedAsync(() => placeholderUrl());
</script>
