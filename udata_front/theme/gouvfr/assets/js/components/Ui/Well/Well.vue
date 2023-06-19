<template>
  <div class="well" :class="wellClass">
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

/**
 * @typedef {"primary" | "secondary"} WellType
 */

export default defineComponent({
  props: {
    type: {
      /** @type {import("vue").PropType<WellType>} */
      type: /** @type {import("vue").PropType<WellType>} */(String),
      default: "primary"
    },
    color: {
      type: String,
      default: "grey-100",
    }
  },
  setup(props) {
    const wellClass = computed(() => `well${props.type === "primary" ? "" : "-" + props.type}-${props.color}`);
    return {
      wellClass,
    };
  },
});
</script>
