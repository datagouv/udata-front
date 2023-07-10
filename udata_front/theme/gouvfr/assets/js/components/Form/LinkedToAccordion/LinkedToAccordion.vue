<template>
  <div @focusin="openIfClosed" @focusout="$emit('blur')">
      <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ["blur"],
  props: {
    accordion: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const openIfClosed = () => {
      const button = document.querySelector(`[aria-controls=${props.accordion}]`);
      if(button && button.ariaExpanded !== "true") {
        button.ariaExpanded = "true";
      }
    };

    return {
      openIfClosed,
    };
  },
});
</script>
