import {ref} from "vue";

export default function useActiveDescendant() {
  const selected = ref(null);

  const isSelected = (id) => selected.value === id;

  const select = (id) => selected.value = id;

  const focusOut = () => {
    selected.value = '';
  };

  return {
    select,
    selected,
    isSelected,
    focusOut,
  }
}
