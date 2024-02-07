<template>
  <EditorTooltip ref="toolTipRef" :class="{'fr-hidden': hideTooltip}">
    <input
      class="input-area"
      :placeholder="t('Paste link...')"
      ref="linkInput"
      @keydown.enter.stop.prevent="onConfirmEdit"
      @keydown="onCancel"
      v-model="link"
    />
    <button class="fr-ml-1w fr-button fr-btn--sm fr-btn--tertiary-no-outline" :class="{'fr-hidden': link.length === 0}" @click="onConfirmEdit">
      {{ t("Confirm ⏎") }}
    </button>
  </EditorTooltip>
</template>

<script setup lang="ts">
import { linkSchema } from '@milkdown/preset-commonmark';
import { usePluginViewContext } from '@prosemirror-adapter/vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { makeTooltipProvider } from '../useTooltipProvider';
import { linkTooltipCtx, linkTooltipState } from './linkEditTooltip';
import useKeyCodes from '../../../../composables/useKeyCodes';
import EditorTooltip from "../EditorTooltip.vue";
import { useCtx } from '../useCtx';
import { addLink } from '../../ProseMirror/addLink';

const { t } = useI18n();

const toolTipRef = ref<InstanceType<typeof EditorTooltip> | null>(null);
const link = ref("");

const { hideTooltip, tooltipProvider } = makeTooltipProvider(linkTooltipCtx.key, toolTipRef);
const { view } = usePluginViewContext();
const { KEYCODES } = useKeyCodes();
const { ctx } = useCtx();

function reset() {
  link.value = "";
  tooltipProvider.value?.hide();
};

function onConfirmEdit() {
  if(!ctx.value) return;
  const { mark } = ctx.value.get(linkTooltipState.key);
  const type = linkSchema.type(ctx.value);
  if (mark && mark.attrs.href === link.value) {
    reset();
    return;
  }

  addLink(view.value, type.create({ href: link.value }), mark);
  reset();
}

function onCancel(e: KeyboardEvent) {
  if(e.keyCode === KEYCODES.ESCAPE) {
    reset();
  }
}
</script>
