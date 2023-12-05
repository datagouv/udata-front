<template>
  <div :class="classes">
    <component :is="titleLevel" v-if="$slots.title && !isSm" class="fr-alert__title">
      <slot name="title"></slot>
    </component>
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: /** @type {import("vue").PropType<import("../../types").AlertSize>} */(String),
      default: "md",
    },
    titleLevel: {
      type: /** @type {import("vue").PropType<import("../../types").TitleLevel>} */(String),
      default: "h3",
    },
    type: {
      type: /** @type {import("vue").PropType<import("../../types").AlertType>} */(String),
      required: true,
    }
  },
  setup(props) {
    const type = computed(() => `fr-alert--${props.type}`);
    const size = computed(() => props.size === "md" ? "" : `fr-alert--${props.size}`);
    const isSm = computed(() => props.size === "sm");
    const classes = computed(() => `fr-alert ${type.value} ${size.value}`);
    return {
      classes,
      isSm,
    }
  },
});
</script>
