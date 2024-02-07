import { Ctx } from "@milkdown/ctx";
import { useInstance } from "@milkdown/vue";
import { ref, toRaw, watch } from "vue";

export function useCtx() {
  const [loading, getEditor] = useInstance();
  const ctx = ref<Ctx>();
  watch([loading, () => toRaw(getEditor())], ([loading, editor]) => {
    if(!loading && editor) {
      ctx.value = editor.ctx;
    }
  }, {immediate: true});

  return {
    ctx,
  };
}
