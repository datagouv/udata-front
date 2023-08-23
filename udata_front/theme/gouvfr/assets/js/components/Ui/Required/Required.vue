<template>
  <span
    v-if="required"
    class="required-field-star"
  >*</span>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    required: {
      type: Boolean,
      required: true
    },
  },
});
</script>
