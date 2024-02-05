<template>
  <div class="fr-hidden">
    <div class="fr-grid-row" ref="toolTipRef">
      <TooltipButton
        v-if="!isWholeTable && !isHeading && isRow"
        icon="fr-icon-arrow-up-line"
        class="fr-mr-1v"
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
        icon="fr-icon-arrow-left-line"
        class="fr-mr-1v"
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
        class="fr-mr-1v"
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
        class="fr-mr-1v"
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
          icon="fr-icon-arrow-right-line"
          class="fr-mr-1v"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(addColAfterCommand.key);
            });

            tooltipProvider?.hide();
          }"
        />
        <TooltipButton
          :svg="AlignLeftIcon"
          class="fr-mr-1v"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(setAlignCommand.key, 'left');
            });
          }"
        />
        <TooltipButton
          class="fr-mr-1v"
          :svg="AlignCenterIcon"
          @click="() => {
            if (loading) return;
            getEditor()?.action((ctx) => {
              ctx.get(commandsCtx).call(setAlignCommand.key, 'center');
            });
          }"
        />
        <TooltipButton
          class="fr-mr-1v"
          :svg="AlignRightIcon"
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
import AlignCenterIcon from 'iconoir/icons/regular/align-center.svg?raw';
import AlignLeftIcon from 'iconoir/icons/regular/align-left.svg?raw';
import AlignRightIcon from 'iconoir/icons/regular/align-right.svg?raw';
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

watch([toolTipRef, loading, tooltipProvider, view], ([toolTipRef, loading, tooltipProvider, view], [_oldToolTipRef, _oldLoading, oldTooltipProvider, _oldView], onCleanup) => {
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
