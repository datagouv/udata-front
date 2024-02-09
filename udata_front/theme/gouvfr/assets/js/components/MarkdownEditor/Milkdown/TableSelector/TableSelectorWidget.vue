<template>
  <button
    ref="containerRef"
    :draggable="type !== 'top-left'"
    class="table-selector block fr-p-0"
    :class="className + ' ' + common"
    @click="click"
    @dragstart="dragStart"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="drop"
  ></button>
</template>

<script setup lang="ts">
import { Editor, commandsCtx } from "@milkdown/core";
import { useInstance } from "@milkdown/vue";
import { useWidgetViewContext } from "@prosemirror-adapter/vue";
import { computed, ref } from "vue";
import { tableTooltipCtx } from "../TableTooltip/tableTooltip";
import { moveColCommand, moveRowCommand, selectColCommand, selectRowCommand, selectTableCommand } from "@milkdown/preset-gfm";

const { spec } = useWidgetViewContext();
const type = spec?.type;
const index = spec?.index ?? 0;
const [loading, getEditor] = useInstance();
const containerRef = ref<HTMLDivElement | null>(null);

const drag = ref(false);

const common = computed(
  () => "absolute bg-grey-200 " + (drag.value ? "border border-blue-400 border-2" : "")
);

const className = computed(() => {
  if (type === "left") return "w-1w h-100 left-n3-5v top-0 fr-py-1v";

  if (type === "top") return "right-px h-1w w-100 left-0 top-n3-5v";

  return "h-3v w-3v left-n2w top-n2w rounded-circle";
});

function click(e: Event) {
  e.stopPropagation();
  const div = containerRef.value;
  if (!div) return;
  if (loading.value) return;
  const editor = getEditor() as Editor;
  editor.action((ctx) => {
    const tooltip = ctx.get(tableTooltipCtx.key);
    tooltip?.getInstance()?.setProps({
      getReferenceClientRect: () => {
        return div.getBoundingClientRect();
      },
    });
    tooltip?.show();

    const commands = ctx.get(commandsCtx);

    if (type === "left") commands.call(selectRowCommand.key, index);
    else if (type === "top") commands.call(selectColCommand.key, index);
    else commands.call(selectTableCommand.key);
  });
}

function dragStart(e: DragEvent) {
  e.stopPropagation();

  const data = { index: spec?.index, type: spec?.type };
  if(e.dataTransfer) {
    e.dataTransfer.setData(
      "application/milkdown-table-sort",
      JSON.stringify(data),
    );
    e.dataTransfer.effectAllowed = "move";
  }

}

function dragOver(e: DragEvent) {
  drag.value = true;
  e.stopPropagation();
  e.preventDefault();
  if(e.dataTransfer) {
    e.dataTransfer.dropEffect = "move";
  }
}

function dragLeave() {
  drag.value = false;
}

function drop(e: DragEvent) {
  drag.value = false;
  if (type === "top-left") return;
  const i = spec?.index;
  if (loading.value || i == null) return;
  const data = e.dataTransfer?.getData("application/milkdown-table-sort") ?? "";
  try {
    const { index, type } = JSON.parse(data);
    const editor = getEditor() as Editor;
    editor.action((ctx) => {
      const commands = ctx.get(commandsCtx);
      const options = {
        from: Number(index),
        to: i,
      };

      commands.call(
        type === "left" ? moveRowCommand.key : moveColCommand.key,
        options
      );
    });
  } catch {
    // ignore data from other source
  }
}
</script>

<style lang="less" scoped>
@import "../../../../../less/content/colors.less";
.table-selector {
  cursor: pointer;
  &:hover {
    background-color: @blue-400;
  }
}
</style>
