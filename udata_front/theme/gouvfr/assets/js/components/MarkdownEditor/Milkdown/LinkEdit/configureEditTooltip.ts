import type { Ctx } from "@milkdown/ctx";
import { usePluginViewFactory } from "@prosemirror-adapter/vue";
import { linkEditTooltip } from "./linkEditTooltip";
import LinkEditTooltip from "./LinkEditTooltip.vue";

export function configureEditTooltip(ctx: Ctx) {
  const pluginViewFactory = usePluginViewFactory();

  ctx.set(linkEditTooltip.key, {
    view: pluginViewFactory({
      component: LinkEditTooltip,
    }),
  });
}
