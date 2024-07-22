import { toggleAccordion } from "@etalab/data.gouv.fr-components";
import { ref } from "vue";

export default function useAccordion(id: string) {
  const expanded = ref(false);
  function expand() {
    expanded.value = !expanded.value;
    const element = document.getElementById(id);
    if(element) {
      toggleAccordion(element, expanded.value);
    }
  };
  return {
    expanded,
    expand,
  };
}
