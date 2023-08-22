import { onMounted, readonly, ref } from "vue";
/**
 *
 * @param {Array<RegExp>} regExpArray - regExpArray to check for
 */
export default function useIdFromHash(regExpArray) {

  /** @type {import("vue").Ref<string | null>} */
  const id = ref(null);

  const checkHash = () => {
    const hash = window.location.hash;
    for (const regex of regExpArray) {
      let [a, foundId, b] = regex.exec(hash) || [];
      if(foundId) {
        return id.value = foundId;
      }
    }
    id.value = null;
  };

  const resetHash = () => {
    history.pushState(null, "", " ");
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  onMounted(() => {
    checkHash();
    window.addEventListener("hashchange", () => checkHash());
  });

  return {
    id: readonly(id),
    resetHash,
  }
};
