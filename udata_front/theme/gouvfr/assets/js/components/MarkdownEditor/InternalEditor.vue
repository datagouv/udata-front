<template>
  <div class="editor__container">
    <div class="fr-mx-auto fr-grid-row fr-pb-1v" role="menubar">
        <div role="group" class="fr-pr-1w">
          <EditorButton
          icon="fr-icon-arrow-go-back-line"
          @click="() => call(undoCommand.key)"
          :title="t('Undo')"
          />
          <EditorButton
            icon="fr-icon-arrow-go-forward-line"
            @click="() => call(redoCommand.key)"
            :title="t('Redo')"
          />
        </div>
        <div role="separator" class="w-1px bg-grey-125 fr-my-1v">
        </div>
        <div role="group" class="fr-pr-1w">
          <EditorButton
            icon="fr-icon-bold"
            @click="() => call(toggleStrongCommand.key)"
            :title="t('Bold')"
          />
          <EditorButton
            icon="fr-icon-italic"
            @click="() => call(toggleEmphasisCommand.key)"
            :title="t('Italic')"
          />
          <EditorButton
            icon="fr-icon-h-1"
            @click="() => call(wrapInHeadingCommand.key, 3)"
            :title="t('Title')"
          />
          <EditorButton
            icon="fr-icon-h-2"
            @click="() => call(wrapInHeadingCommand.key, 4)"
            :title="t('Subtitle')"
          />
        </div>
        <div role="separator" class="w-1px bg-grey-125 fr-my-1v"></div>
        <div role="group" class="fr-px-1w">
          <EditorButton
            icon="fr-icon-table-2"
            @click="() => call(insertTableCommand.key)"
            :title="t('Table')"
          />
          <EditorButton
            icon="fr-icon-link"
            @click="() => call(insertLinkCommand.key)"
            :title="t('Link')"
          />
          <ImageModalButton
            @send="(data: ImageModalForm) => call(insertImageCommand.key, data)"
          />
        </div>
        <div role="separator" class="w-1px bg-grey-125 fr-my-1v"></div>
        <div role="group" class="fr-pl-1w">
          <EditorButton
            icon="fr-icon-list-unordered"
            @click="() => call(wrapInBulletListCommand.key)"
            :title="t('List unordered')"
          />
          <EditorButton
            icon="fr-icon-list-ordered"
            @click="() => call(wrapInOrderedListCommand.key)"
            :title="t('List ordered')"
          />
          <EditorButton
            icon="fr-icon-code-s-slash-line"
            @click="() => call(createCodeBlockCommand.key)"
            :title="t('Code block')"
          />
          <EditorButton
            icon="fr-icon-quote-line"
            @click="() => call(wrapInBlockquoteCommand.key)"
            :title="t('Quote')"
          />
        </div>
    </div>
    <div class="fr-p-1v">
      <Milkdown />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Editor, rootCtx, defaultValueCtx, CmdKey, editorViewOptionsCtx } from "@milkdown/core";
import type { Ctx } from "@milkdown/ctx";
import { history, redoCommand, undoCommand } from "@milkdown/plugin-history";
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import {
  commonmark,
  createCodeBlockCommand,
  headingAttr,
  insertImageCommand,
  paragraphAttr,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
} from "@milkdown/preset-commonmark";
import {
  insertTableCommand,
  gfm,
  columnResizingPlugin,
} from "@milkdown/preset-gfm";
import { callCommand } from "@milkdown/utils";
import { Milkdown, useEditor } from "@milkdown/vue";
import { usePluginViewFactory, useWidgetViewFactory } from "@prosemirror-adapter/vue";
import { useI18n } from "vue-i18n";
import EditorButton from "./EditorButton.vue";
import type { ImageModalForm } from "./ImageModal/ImageModal.vue";
import ImageModalButton from "./ImageModal/ImageModalButton.vue";
import { dsfrColumnResizingPlugin } from "./Milkdown/dsfrColumnResizingPlugin";
import { tableSelectorPlugin } from "./Milkdown/TableSelector/tableSelectorPlugin";
import { tableTooltip, tableTooltipCtx } from "./Milkdown/TableTooltip/tableTooltip";
import { insertLinkCommand, linkEditPlugins } from "./Milkdown/LinkEdit";
import { configureEditTooltip } from "./Milkdown/LinkEdit/configureEditTooltip";
import { linkPreviewPlugins } from "./Milkdown/LinkPreview";
import { configurePreviewTooltip } from "./Milkdown/LinkPreview/configurePreviewTooltip";
import { useLinkPreview } from "./Milkdown/LinkPreview/useLinkPreview";
import TableTooltip from "./Milkdown/TableTooltip/TableTooltip.vue";
import { debounce } from "../../composables/useDebouncedRef";
import type { MarkdownEditorProps } from "./types";

import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';

const props = withDefaults(defineProps<MarkdownEditorProps>(), {
  disabled: false,
  value: ""
});
const emit = defineEmits<{
  (event: 'change', value: string): void,
  (event: 'editorMounted'): void,
}>();

const onChange = debounce((markdown: string) => emit("change", markdown), 300);

const { t } = useI18n();

const pluginViewFactory = usePluginViewFactory();
const widgetViewFactory = useWidgetViewFactory();

const { updateLink } = useLinkPreview();

const columnResizingPluginIndex = gfm.findIndex(plugin => plugin === columnResizingPlugin);
gfm[columnResizingPluginIndex] = dsfrColumnResizingPlugin;

const gfmPlugins = [
  gfm,
  tableTooltip,
  tableTooltipCtx,
  (ctx: Ctx) => async () => {
    ctx.set(tableTooltip.key, {
      view: pluginViewFactory({
        component: TableTooltip,
      }),
    });
  },
  tableSelectorPlugin(widgetViewFactory),
].flat();

const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      configureEditTooltip(ctx);
      configurePreviewTooltip(ctx, updateLink);
      ctx.set(defaultValueCtx, props.value);
      // Add attributes to nodes and marks
      ctx.set(headingAttr.key, (node) => {
        const level = node.attrs.level;
        if (level === 1) return { class: 'fr-h1'};
        if (level === 2) return { class: 'fr-h2'};
        if (level === 3) return { class: 'fr-h3'};
        if (level === 4) return { class: 'fr-h4'};
        if (level === 5) return { class: 'fr-h5'};
        if (level === 6) return { class: 'fr-h6'};
        return {};
      });
      ctx.update(editorViewOptionsCtx, (prev) => {
        const prevAttr = prev.attributes;

        return {
        ...prev,
        attributes: (state) => {
          const attrs = typeof prevAttr === 'function' ? prevAttr(state) : (prevAttr ?? {});
          attrs.id = props.id;
          attrs['data-testid'] = "markdown-editor";
          if(props.ariaLabelledBy) {
            attrs["aria-labelledby"] = props.ariaLabelledBy;
          } else if (props.ariaLabel) {
            attrs.ariaLabel = props.ariaLabel;
          }
          return {
            ...attrs,
          };
        },
        editable: () => !props.disabled,
      };
      });

      ctx.set(paragraphAttr.key, () => ({ class: 'text-lg' }));
      ctx.get(listenerCtx).markdownUpdated((_ctx, markdown, _prevMarkdown) => onChange(markdown));
      ctx.get(listenerCtx).mounted((_ctx) => {
        emit("editorMounted");
      });
    })
    .use(commonmark)
    .use(gfmPlugins)
    .use(history)
    .use(linkEditPlugins)
    .use(linkPreviewPlugins)
    .use(listener)
);

function call<T>(command: CmdKey<T>, payload?: T) {
  return editor.get()?.action(callCommand(command, payload));
}
</script>
