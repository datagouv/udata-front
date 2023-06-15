<template>
  <div @focusin="openIfClosed">
      <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
