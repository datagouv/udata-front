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

<script>
import { defineComponent, onMounted, ref } from "vue";
import useUid from "../../../composables/useUid";
export default defineComponent({
  inheritAttrs: false,
  setup() {
    /** @type {import("vue").Ref<HTMLButtonElement | null>} */
    const button = ref(null);

    /** @type {import("vue").Ref<HTMLElement | null>} */
    const toggletip = ref(null);

    /** @type {import("vue").Ref<HTMLElement | null>} */
    const wrapper = ref(null);

    const shown = ref(false);
    const { id } = useUid("toggletip");

    const toggle = () => {
      shown.value = !shown.value;
    }

    const hide = () => {
      shown.value = false;
    }

    /**
     *
     * @param {FocusEvent} e
     */
    const hideIfOutside = (e) => {
      const target = /** @type {HTMLElement | null} */ (e.relatedTarget || e.target);
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

    return {
      button,
      hide,
      hideIfOutside,
      id,
      shown,
      toggle,
      toggletip,
      wrapper,
    };
  }
});
</script>
