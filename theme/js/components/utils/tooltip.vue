<template>
    <span class="tooltip__wrapper">
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