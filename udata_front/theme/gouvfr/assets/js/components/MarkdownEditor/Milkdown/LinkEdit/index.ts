import type{ Ctx } from "@milkdown/ctx";
import { insertLinkCommand } from "./insertLink";
import { linkEditTooltip, linkTooltipState, linkTooltipCtx } from "./linkEditTooltip";
import LinkEditTooltip from "./LinkEditTooltip.vue";
import { usePluginViewFactory } from "@prosemirror-adapter/vue";

export const linkPlugins = [
  linkTooltipCtx,
  linkEditTooltip,
  linkTooltipState,
  insertLinkCommand,
  (ctx: Ctx) => async () => {
    const pluginViewFactory = usePluginViewFactory();
    ctx.set(linkEditTooltip.key, {
      view: pluginViewFactory({
        component: LinkEditTooltip,
      }),
    });
  },
].flat();

export { insertLinkCommand };
