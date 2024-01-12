<template>
  <Milkdown />
</template>
<script setup lang="ts">
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { Milkdown, useEditor } from "@milkdown/vue";
import { commonmark } from "@milkdown/preset-commonmark";

useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, '')
    })
    .use(commonmark)
);
</script>
