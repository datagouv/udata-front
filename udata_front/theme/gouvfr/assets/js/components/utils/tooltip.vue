<template>
  <div class="tooltip__wrapper text-grey-500">
    <slot></slot>
    <div class="tooltip" role="tooltip">
      <slot name="tooltip"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
});
</script>
