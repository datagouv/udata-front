<template>
  <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <InternalEditor
        v-bind="props"
        @change="(value) => $emit('change', value)"
        @editor-mounted="$emit('editorMounted')"
      />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>
<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import InternalEditor from "./InternalEditor.vue";
import type { MarkdownEditorProps } from "./types";
import { useLinkPreviewProvider } from "./Milkdown/LinkPreview/useLinkPreview";

const props = defineProps<MarkdownEditorProps>();

defineEmits<{
  (event: 'change', value: string): void,
  (event: 'editorMounted'): void,
}>();

useLinkPreviewProvider();
</script>
