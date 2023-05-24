<template>
    <div class="tooltip__wrapper fr-grid-row fr-grid-row--middle text-grey-500">
        <slot></slot>
        <div class="tooltip">
            <slot name="tooltip"></slot>
        </div>
      </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
});
</script>
