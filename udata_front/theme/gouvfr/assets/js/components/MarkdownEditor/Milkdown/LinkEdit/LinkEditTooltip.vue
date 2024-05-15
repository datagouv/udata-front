<template>
  <EditorTooltip ref="toolTipRef">
    <input
      class="input-area"
      :placeholder="t('Paste link...')"
      ref="linkInput"
      @keydown.enter.stop.prevent="onConfirmEdit"
      @keydown="onCancel"
      v-model="updatedLink"
    />
    <button class="fr-ml-1w fr-button fr-btn--sm fr-btn--tertiary-no-outline" :class="{'fr-hidden': updatedLink.length === 0}" @click="onConfirmEdit">
      {{ t("Confirm ⏎") }}
    </button>
  </EditorTooltip>
</template>

<script setup lang="ts">
import { linkSchema } from '@milkdown/preset-commonmark';
import { usePluginViewContext } from '@prosemirror-adapter/vue';
import { ref, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { makeTooltipProvider } from '../Tooltip/useTooltipProvider';
import { linkEditTooltipCtx, linkTooltipState } from './linkEditTooltip';
import useKeyCodes from '../../../../composables/useKeyCodes';
import EditorTooltip from "../Tooltip/EditorTooltip.vue";
import { addLink } from '../../ProseMirror/handleLink';
import { useInstance } from '@milkdown/vue';
import { useLinkPreview } from '../LinkPreview/useLinkPreview';
import { watchEffect } from 'vue';

const { t } = useI18n();

const toolTipRef = ref<InstanceType<typeof EditorTooltip> | null>(null);
const { link, updateLink } = useLinkPreview();
const updatedLink = ref("");

watchEffect(() => {
  updatedLink.value = link.value;
});

const { view } = usePluginViewContext();
const { KEYCODES } = useKeyCodes();
const [_loading, getEditor] = useInstance();
const { tooltipProvider } = makeTooltipProvider(linkEditTooltipCtx.key, toolTipRef);

function reset() {
  updateLink("");
  tooltipProvider.value?.hide();
};

function onConfirmEdit() {
  const editor = toRaw(getEditor());
  if(!editor) return;
  const { mark } = editor.ctx.get(linkTooltipState.key);
  const type = linkSchema.type(editor.ctx);
  if (mark && mark.attrs.href === updatedLink.value) {
    reset();
    return;
  }

  addLink(view.value, type.create({ href: updatedLink.value }), mark);
  reset();
}

function onCancel(e: KeyboardEvent) {
  if(e.keyCode === KEYCODES.ESCAPE) {
    reset();
  }
}
</script>
