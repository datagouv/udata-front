import type { Ctx } from "@milkdown/ctx";
import { posToDOMRect } from "@milkdown/prose";
import { usePluginViewFactory } from "@prosemirror-adapter/vue";
import { EditorView } from "prosemirror-view";
import LinkPreviewTooltip from "./LinkPreviewTooltip.vue";
import { findMarkPosition } from "../../ProseMirror/findMarkPosition";
import { linkPreviewTooltip, linkPreviewTooltipCtx } from "./linkPreviewTooltip";
import { shouldShowPreview } from "./shouldShowPreview";
import { debounce } from "../../../../composables/useDebouncedRef";
import { ref } from "vue";
import { linkEditTooltipCtx, linkTooltipState } from "../LinkEdit/linkEditTooltip";

const DELAY = 200;

export function configurePreviewTooltip(ctx: Ctx, updateLink: (newLink: string)=> void) {
  const pluginViewFactory = usePluginViewFactory();
  const hovering = ref(false);

  const onMouseEnterTooltip = () => {
    hovering.value = true;
  }

  const onMouseLeaveTooltip = () => {
    hovering.value = false;
  }

  const onMouseMove = debounce((view: EditorView, event: MouseEvent) => {
      if (!view.hasFocus())
        return

      const result = shouldShowPreview(ctx, view, event);
      const tooltip = ctx.get(linkPreviewTooltipCtx.key);
      if (result) {
        const position = view.state.doc.resolve(result.pos);
        const markPosition = findMarkPosition(result.mark, view.state.doc, position.before(), position.after());
        const tool = ctx.get(linkPreviewTooltip.key);
        if(!tool || !tool.view) return
        tooltip?.getInstance()?.setProps({
          getReferenceClientRect: () => {
            return posToDOMRect(view, markPosition.start, markPosition.end);
          },
        });
        ctx.update(linkTooltipState.key, () => ({
          from: markPosition.start,
          to: markPosition.end,
          mark: result.mark,
      }));
        updateLink(result.mark.attrs.href);

        tooltip?.show();
        tooltip?.getInstance()?.popper.addEventListener('mouseenter', onMouseEnterTooltip);
        tooltip?.getInstance()?.popper.addEventListener('mouseleave', onMouseLeaveTooltip);
        return;
      }

      onMouseLeave();
    }, DELAY);

  const onMouseLeave = () => {
    setTimeout(() => {
      if(hovering.value) {
        return;
      }
      const previewTooltip = ctx.get(linkPreviewTooltipCtx.key);
      const editTooltip = ctx.get(linkEditTooltipCtx.key);
      previewTooltip?.hide();
      if(!editTooltip?.getInstance()?.state.isVisible) {
        updateLink("");
      }
      previewTooltip?.getInstance()?.popper.removeEventListener('mouseenter', onMouseEnterTooltip);
      previewTooltip?.getInstance()?.popper.removeEventListener('mouseleave', onMouseLeaveTooltip);
    }, DELAY);
  }

  ctx.set(linkPreviewTooltip.key, {
    props: {
      handleDOMEvents: {
        mousemove: onMouseMove,
        mouseleave: onMouseLeave,
      },
    },
    view: pluginViewFactory({
      component: LinkPreviewTooltip,
    }),
  })
}
