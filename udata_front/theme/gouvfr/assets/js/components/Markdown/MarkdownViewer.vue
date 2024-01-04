<template>
  <div class="markdown" ref="markdownRef" v-html="markdown(mdContent)">
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { markdown } from "../../helpers";
import { onMounted } from "vue";

const props = defineProps<{ content?: string }>();
const markdownRef = ref<HTMLDivElement | null>(null);
const mdContent = ref(props.content ?? '');
onMounted(() => {
  if(!props.content) {
    mdContent.value = JSON.parse(markdownRef.value?.dataset.content ?? '');
  }
});
</script>
