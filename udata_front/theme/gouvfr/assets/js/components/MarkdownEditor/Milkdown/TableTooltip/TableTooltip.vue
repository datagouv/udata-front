<template>
  <div class="fr-hidden">
    <div class="fr-grid-row" ref="toolTipRef">
      <TooltipButton
        v-if="!isWholeTable && !isHeading && isRow"
        icon="fr-icon-arrow-up-line"
        class="fr-mr-1v"
        :title="t('Add row before')"
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
        :title="t('Add column before')"
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
        :title="t('Delete selected cells')"
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
        :title="t('Add row after')"
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
          :title="t('Add column after')"
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
          :title="t('Align left')"
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
          :title="t('Align center')"
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
          :title="t('Align right')"
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
import { computed, ref } from "vue";
import { tableTooltipCtx } from "./tableTooltip";
import TooltipButton from "./TooltipButton.vue";
import { makeTooltipProvider } from "../Tooltip/useTooltipProvider";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toolTipRef = ref<HTMLDivElement | null>(null);
const { view } = usePluginViewContext();

const [loading, getEditor] = useInstance();
const { tooltipProvider } = makeTooltipProvider(tableTooltipCtx.key, toolTipRef);
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
</script>
