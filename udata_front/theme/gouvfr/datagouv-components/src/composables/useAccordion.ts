import { ref } from "vue";
import { toggleAccordion } from "../helpers";

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
