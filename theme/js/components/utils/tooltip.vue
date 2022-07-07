<template>
    <span class="tooltip__wrapper text-grey-500">
        <slot></slot>
        <div class="tooltip">
            <slot name="tooltip"></slot>
        </div>
    </span>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
});
</script>