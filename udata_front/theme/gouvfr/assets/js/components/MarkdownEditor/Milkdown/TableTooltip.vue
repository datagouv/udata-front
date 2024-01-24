<template>
  <div class="fr-hidden">
    <div class="fr-grid-row" ref="toolTipRef">
      <TooltipButton
        v-if="!isWholeTable && !isHeading && isRow"
        icon="fr-icon-arrow-up-line"
        class="fr-mr-1w"
        @click="() => {
          if (loading) return;

          getEditor()?.action((ctx) => {
            ctx.get(commandsCtx).call(addRowBeforeCommand.key);
          });
          tooltipProvider?.hide();
        }"
      />
      <TooltipButton
        v-if="!isWholeTable && isCol"
        icon="fr-icon-arrow-go-back-line"
        @click="() => {
          if (loading) return;

          getEditor()?.action((ctx) => {
            ctx.get(commandsCtx).call(addColBeforeCommand.key);
          });
          tooltipProvider?.hide();
        }"
      />
      <TooltipButton
        v-if="isWholeTable || (!isHeading && isAny)"
        icon="fr-icon-delete-line"
        @click="() => {
          if (loading) return;

          getEditor()?.action((ctx) => {
            ctx.get(commandsCtx).call(deleteSelectedCellsCommand.key);
          });
          tooltipProvider?.hide();
        }"
      />

      <TooltipButton
        v-if="!isWholeTable && isRow"
        icon="fr-icon-arrow-down-line"
        @click="() => {
          if (loading) return;

          getEditor()?.action((ctx) => {
            ctx.get(commandsCtx).call(addRowAfterCommand.key);
          });
          tooltipProvider?.hide();
        }"
      />
      <template v-if="!isWholeTable && isCol">
        <TooltipButton
          icon="fr-icon-arrow-go-forward-line"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(addColAfterCommand.key);
            });

            tooltipProvider?.hide();
          }"
        />
        <TooltipButton
          icon="format_align_left"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(setAlignCommand.key, 'left');
            });
          }"
        />
        <TooltipButton
          icon="format_align_center"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(setAlignCommand.key, 'center');
            });
          }"
        />
        <TooltipButton
          icon="format_align_right"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(setAlignCommand.key, 'right');
            });
          }"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { commandsCtx } from "@milkdown/core";
import { TooltipProvider } from "@milkdown/plugin-tooltip";
import {
  addColAfterCommand,
  addColBeforeCommand,
  addRowAfterCommand,
  addRowBeforeCommand,
  deleteSelectedCellsCommand,
  setAlignCommand,
} from "@milkdown/preset-gfm";
import { CellSelection } from "@milkdown/prose/tables";
import { useInstance } from "@milkdown/vue";
import {
  usePluginViewContext,
} from "@prosemirror-adapter/vue";
import { computed, ref, watch } from "vue";
import TooltipButton from "./TooltipButton.vue";
import { useTooltipProvider } from "./useTooltipProvider";
const toolTipRef = ref<HTMLDivElement | null>(null);
const { view } = usePluginViewContext();

const [loading, getEditor] = useInstance();
const { tooltipProvider, setTooltipProvider } = useTooltipProvider(getEditor);
const isRow = computed(() =>
  view.value.state.selection instanceof CellSelection &&
  view.value.state.selection.isRowSelection());
const isCol = computed(() =>
  view.value.state.selection instanceof CellSelection &&
  view.value.state.selection.isColSelection());
const isWholeTable = computed(() => isRow.value && isCol.value);
const isAny = computed(() => isRow.value || isCol.value);
const isHeading = computed(() =>
  isRow.value &&
  view.value.state.doc.nodeAt((view.value.state.selection as CellSelection).$headCell.pos)
    ?.type.name === "table_header");

watch([toolTipRef, loading, tooltipProvider, view], ([toolTipRef, loading, tooltipProvider, view], [oldToolTipRef, oldLoading, oldTooltipProvider, oldView], onCleanup) => {
  if (
    toolTipRef &&
    !loading &&
    !tooltipProvider &&
    view &&
    view.state
  ) {
    const provider = new TooltipProvider({
      content: toolTipRef,
      tippyOptions: {
        zIndex: 30,
      },
      shouldShow: () => {
        return false;
      },
    });

    provider.update(view);
    setTooltipProvider(provider);
    onCleanup(() => oldTooltipProvider?.destroy());
  }
});
</script>
