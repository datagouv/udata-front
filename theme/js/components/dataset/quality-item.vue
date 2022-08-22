<template>
    <div v-if="passed">
        <span class="fr-icon-check-line" aria-hidden="true"></span>
        {{messagePassed}}
    </div>
    <div v-else class="text-mention-grey">
        <span class="fr-icon-warning-line" aria-hidden="true"></span>
        {{messageFailed}}
    </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        passed: {
            type: Boolean,
            required: true,
        },
        messagePassed: {
            type: String,
            required: true,
        },
        messageFailed: {
            type: String,
            required: true,
        },
    }
});
</script>
