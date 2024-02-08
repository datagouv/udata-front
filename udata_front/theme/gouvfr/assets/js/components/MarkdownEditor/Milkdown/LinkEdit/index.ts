import { insertLinkCommand } from "./insertLink";
import { linkEditTooltip, linkTooltipState, linkEditTooltipCtx } from "./linkEditTooltip";

export const linkEditPlugins = [
  linkEditTooltipCtx,
  linkEditTooltip,
  linkTooltipState,
  insertLinkCommand,
].flat();

export { insertLinkCommand };
