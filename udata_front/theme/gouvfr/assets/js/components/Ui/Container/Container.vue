<template>
  <div class="fr-p-3w" :class="background">
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: {
      type: String,
      default: "white"
    }
  },
  setup(props) {
    const background = computed(() => `bg-${props.color}`);
    return {
      background,
    }
  },
});
</script>
