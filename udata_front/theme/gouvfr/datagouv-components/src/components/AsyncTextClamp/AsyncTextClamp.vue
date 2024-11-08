<template>
  <TextClamp
    v-if="resolvedText"
    :text="resolvedText"
    :max-lines
  />
</template>

<script setup lang="ts">
import TextClamp from "vue3-text-clamp"

const props = defineProps<{
  maxLines: number
  text: Promise<string>
}>();

const resolvedText = await props.text;
</script>
