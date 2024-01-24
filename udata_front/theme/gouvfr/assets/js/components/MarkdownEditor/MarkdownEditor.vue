<template>
  <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <InternalEditor />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
</template>
<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import InternalEditor from "./InternalEditor.vue";
</script>
