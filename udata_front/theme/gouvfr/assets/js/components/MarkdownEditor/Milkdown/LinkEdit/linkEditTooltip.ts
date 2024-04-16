import { TooltipProvider, tooltipFactory } from "@milkdown/plugin-tooltip";
import type { Mark } from 'prosemirror-model';
import { $ctx } from "@milkdown/utils";

export const linkEditTooltipCtx = $ctx<TooltipProvider | null, "linkEditTooltip">(
  null,
  "linkEditTooltip"
);

export type LinkTooltip = {
  from: number,
  to: number,
  mark: Mark | null,
};

export const linkTooltipState = $ctx<LinkTooltip, "linkTooltipStateCtx">({
  from: -1,
  to: -1,
  mark: null,
}, 'linkTooltipStateCtx');

export const linkEditTooltip = tooltipFactory("LINK_EDIT");
