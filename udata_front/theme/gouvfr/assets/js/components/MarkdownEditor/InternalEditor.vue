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
            icon="fr-icon-h-3"
            @click="() => call(wrapInHeadingCommand.key, 3)"
            :title="t('Title size 3')"
          />
          <EditorButton
            icon="fr-icon-h-4"
            @click="() => call(wrapInHeadingCommand.key, 4)"
            :title="t('Title size 4')"
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
            @click="call(insertLinkCommand.key)"
            :title="t('Link')"
          />
          <EditorButton
            icon="fr-icon-image-add-fill"
            @click="() => call(insertTableCommand.key)"
            :title="t('Image')"
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
import { Editor, rootCtx, defaultValueCtx, CmdKey } from "@milkdown/core";
import type { Ctx } from "@milkdown/ctx";
import { history, redoCommand, undoCommand } from "@milkdown/plugin-history";
import {
  commonmark,
  createCodeBlockCommand,
  headingAttr,
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
import { dsfrColumnResizingPlugin } from "./Milkdown/dsfrColumnResizingPlugin";
import { tableSelectorPlugin } from "./Milkdown/tableSelectorPlugin";
import { tableTooltip, tableTooltipCtx } from "./Milkdown/tableTooltip";
import { insertLinkCommand, linkPlugins } from "./Milkdown/LinkEdit";
import TableTooltip from "./Milkdown/TableTooltip.vue";

import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';

const { t } = useI18n();

const pluginViewFactory = usePluginViewFactory();
const widgetViewFactory = useWidgetViewFactory();

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
      //configureLinkTooltip(ctx);
      ctx.set(defaultValueCtx, '');
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
      ctx.set(paragraphAttr.key, () => ({ class: 'text-lg' }));
    })
    .use(commonmark)
    .use(gfmPlugins)
    .use(history)
    .use(linkPlugins)
);

function call<T>(command: CmdKey<T>, payload?: T) {
  return editor.get()?.action(callCommand(command, payload));
}
</script>
