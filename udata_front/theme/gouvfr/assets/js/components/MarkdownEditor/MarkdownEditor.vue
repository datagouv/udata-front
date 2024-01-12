<template>
  <MilkdownProvider>
    <InternalEditor />
  </MilkdownProvider>
</template>
<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";
import InternalEditor from "./InternalEditor.vue";
</script>
