import { ref, type MaybeRefOrGetter, toRef, watchEffect, toValue } from "vue";
import { fetchReuseTypes, getType } from "../api/reuses";

export default function useReuseType(id: MaybeRefOrGetter<string>) {
  const label = ref("");
  watchEffect(async () => {
    const idValue = toValue(id);
    const types = await fetchReuseTypes();
    label.value = getType(types, idValue);
  });
  return {
    label,
  };
}
