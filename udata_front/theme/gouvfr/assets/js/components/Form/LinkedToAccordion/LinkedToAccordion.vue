<template>
  <div @focusin="openIfClosed" @focusout="focusout" ref="parent">
      <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ["blur"],
  props: {
    accordion: {
      type: String,
      required: true,
    }
  },
  setup(props, { emit }) {

    /** @type {import("vue").Ref<HTMLDivElement | null>} */
    const parent = ref(null);

    const openIfClosed = () => {
      const button = document.querySelector(`[aria-controls=${props.accordion}]`);
      if(button && button.ariaExpanded !== "true") {
        button.ariaExpanded = "true";
      }
    };

    /**
     *
     * @param {FocusEvent} event
     */
    const focusout = (event) => {
      const target = /** @type {HTMLElement | null} */ (event.relatedTarget);
      if(!parent.value?.contains(target)) {
        emit('blur');
      }
    }

    return {
      openIfClosed,
      focusout,
      parent,
    };
  },
});
</script>
