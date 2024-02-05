import type { Editor } from "@milkdown/core";
import { TooltipProvider } from "@milkdown/plugin-tooltip";
import { ref, toRaw } from "vue";
import { tableTooltipCtx } from "./tableTooltip";

export function useTooltipProvider(getEditor: () => Editor | undefined) {
  const getRawEditor = () => toRaw(getEditor());
  const tooltipProvider = ref<TooltipProvider | null>(null);
  const setTooltipProvider = (provider: TooltipProvider) => {
    tooltipProvider.value = provider;
    const editor = getRawEditor();
    if (editor?.ctx && editor.ctx.isInjected(tableTooltipCtx.key)) {
      editor.ctx.set(tableTooltipCtx.key, provider);
      tooltipProvider.value = provider;
    }
  }
  return {
    tooltipProvider,
    setTooltipProvider,
  }
}
