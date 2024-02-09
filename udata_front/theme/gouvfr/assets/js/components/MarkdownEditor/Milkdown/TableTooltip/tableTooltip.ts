import { TooltipProvider, tooltipFactory } from "@milkdown/plugin-tooltip";
import { $ctx } from "@milkdown/utils";

export const tableTooltipCtx = $ctx<TooltipProvider | null, "tableTooltip">(
  null,
  "tableTooltip"
);

export const tableTooltip = tooltipFactory("TABLE");
