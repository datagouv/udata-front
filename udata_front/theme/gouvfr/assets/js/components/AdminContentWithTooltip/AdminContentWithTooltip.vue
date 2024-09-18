<template>
  <p v-bind="$attrs" :aria-describedby="id" ref="contentRef">
    <slot></slot>
  </p>
  <span class="fr-hidden-xl fr-tooltip fr-placement" :id="id" role="tooltip" aria-hidden="true">
    {{ tooltipText }}
  </span>
</template>

<script setup lang="ts">
import { getRandomId } from '@datagouv/components/ts';
import { onMounted } from 'vue';
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const id = getRandomId();
const contentRef = ref<HTMLParagraphElement | null>();
const tooltipText = ref("");

onMounted(() => {
  if(contentRef.value) {
    tooltipText.value = contentRef.value.textContent || "";
  }
});
</script>
<style scoped>
p {
  line-height: var(--lh) !important;
}
</style>
