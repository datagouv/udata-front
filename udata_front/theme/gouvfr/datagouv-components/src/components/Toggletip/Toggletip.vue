<template>
  <div
    class="toggletip__wrapper text-grey-500"
    ref="wrapper"
    @focusout="hideIfOutside"
    @keydown.esc="hide"
  >
    <button
      v-bind="$attrs"
      :aria-expanded="shown"
      :aria-controls="id"
      ref="button"
      role="button"
      @click.prevent="toggle"
    >
      <slot></slot>
    </button>
    <div class="toggletip" :id="id" v-show="shown" ref="toggletip">
      <slot name="toggletip"></slot>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getRandomId } from "@gouvminint/vue-dsfr";
defineOptions({inheritAttrs: false})
const button = ref<HTMLButtonElement | null>(null);
const toggletip = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const shown = ref(false);
const id = getRandomId("toggletip");
const toggle = () => {
  shown.value = !shown.value;
}
const hide = () => {
  shown.value = false;
}
const hideIfOutside = (e: FocusEvent) => {
  const target = (e.relatedTarget || e.target) as HTMLElement | null;
  if(button.value !== target &&
    !button.value?.contains(target) &&
    !toggletip.value?.contains(target)
  ) {
    hide();
  }
};
onMounted(() => {
  document.addEventListener("click", hideIfOutside);
});
</script>
