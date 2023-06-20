<template>
  <div class="well" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: /** @type {import("vue").PropType<import("../../types").WellType>} */(String),
      default: "primary"
    },
    color: {
      type: String,
      default: "grey-100",
    },
    weight: {
      type: /** @type {import("vue").PropType<import("../../types").Weight>} */(String),
      default: "semi-bold",
    }
  },
  setup(props) {
    const wellClass = computed(() => `well${props.type === "primary" ? "" : "-" + props.type}-${props.color}`);
    const weightClass = computed(() => `fr-text--${props.weight}`);
    const classes = computed(() => weightClass.value + " " + wellClass.value);
    return {
      classes
    };
  },
});
</script>
