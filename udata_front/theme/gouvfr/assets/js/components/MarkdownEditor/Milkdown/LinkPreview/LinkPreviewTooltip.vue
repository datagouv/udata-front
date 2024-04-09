<template>
  <EditorTooltip ref="toolTipRef" :class="{'fr-hidden': link.length === 0}">
    <span aria-hidden="true" class="fr-icon-link fr-mr-1w"></span>
    <div class="text-overflow-ellipsis">
      <a class="fr-link" :href="link">
        {{ link }}
      </a>
    </div>
    <button class="fr-btn fr-btn--secondary fr-btn--sm fr-icon-pencil-line fr-mx-1w" @click="editLink">
      {{ t("Edit link") }}
    </button>
    <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-icon-link-unlink" :title="t('Remove link')" @click="deleteLink">
      {{ t("Remove link") }}
    </button>
  </EditorTooltip>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";
import EditorTooltip from "../Tooltip/EditorTooltip.vue";
import { linkPreviewTooltipCtx } from "./linkPreviewTooltip";
import { makeTooltipProvider } from "../Tooltip/useTooltipProvider";
import { useLinkPreview } from "./useLinkPreview";
import { removeLink } from "../../ProseMirror/handleLink";
import { usePluginViewContext } from "@prosemirror-adapter/vue";
import { useInstance } from "@milkdown/vue";
import { linkTooltipState } from "../LinkEdit/linkEditTooltip";
import { TextSelection } from "@milkdown/prose/state";
import { insertLink } from "../LinkEdit/insertLink";

const { t } = useI18n();
const toolTipRef = ref<InstanceType<typeof EditorTooltip> | null>(null);
const { tooltipProvider } = makeTooltipProvider(linkPreviewTooltipCtx.key, toolTipRef);
const { view } = usePluginViewContext();
const [_loading, getEditor] = useInstance();

const { link } = useLinkPreview();

function editLink() {
  const editor = toRaw(getEditor());
  if(!editor) return;
  const { from, to } = editor.ctx.get(linkTooltipState.key);
  tooltipProvider.value?.hide();
  view.value.dispatch(view.value.state.tr.setSelection(TextSelection.create(view.value.state.doc, from, to)));
  insertLink(editor.ctx);
}

function deleteLink() {
  const editor = toRaw(getEditor());
  if(!editor) return;
  const { from, to, mark } = editor.ctx.get(linkTooltipState.key);
  if(mark) {
    removeLink(view.value, from, to, mark);
  }
  tooltipProvider.value?.hide();
}
</script>
