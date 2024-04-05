import type { Editor } from "@milkdown/core";
import { SliceType } from "@milkdown/ctx";
import { TooltipProvider } from "@milkdown/plugin-tooltip";
import { useInstance } from "@milkdown/vue";
import { usePluginViewContext } from "@prosemirror-adapter/vue";
import { unrefElement } from "@vueuse/core";
import { type Ref, ref, toRaw, watch, type ComponentPublicInstance } from "vue";

export function useTooltipProvider(getEditor: () => Editor | undefined, key: SliceType<TooltipProvider | null>) {
  const getRawEditor = () => toRaw(getEditor());
  const tooltipProvider = ref<TooltipProvider | null>(null);
  const setTooltipProvider = (provider: TooltipProvider) => {
    tooltipProvider.value = provider;
    const editor = getRawEditor();
    if (editor?.ctx && editor.ctx.isInjected(key)) {
      editor.ctx.set(key, provider);
      tooltipProvider.value = provider;
    }
  }
  return {
    tooltipProvider,
    setTooltipProvider,
  }
}

export function makeTooltipProvider(key: SliceType<TooltipProvider | null>, tooltipRef: Ref<ComponentPublicInstance | HTMLElement | null>) {
  const { view } = usePluginViewContext();
  const [loading, getEditor] = useInstance();
  const { tooltipProvider, setTooltipProvider } = useTooltipProvider(getEditor, key);

  watch([tooltipRef, loading, tooltipProvider, view], ([ref, loading, tooltipProvider, view], [_oldToolTipRef, _oldLoading, oldTooltipProvider, _oldView], onCleanup) => {
    if (
      ref &&
      !loading &&
      !tooltipProvider &&
      view &&
      view.state
    ) {
      const elt = unrefElement<HTMLElement | ComponentPublicInstance>(ref);
      if(elt instanceof HTMLElement) {
        const provider = new TooltipProvider({
          content: elt,
          tippyOptions: {
            zIndex: 30,
          },
          shouldShow: () => {
            return false;
          },
        });
        provider.update(view);
        setTooltipProvider(provider);
      }
      onCleanup(() => oldTooltipProvider?.destroy());
    }
  });

  return {
    tooltipProvider,
  };
}
