<template>
    <p class="fr-my-0" v-if="passed">
        <span class="fr-icon-check-line" aria-hidden="true"></span>
        {{messagePassed}}
    </p>
    <p class="fr-my-0 text-mention-grey" v-else>
        <span class="fr-icon-warning-line" aria-hidden="true"></span>
        {{messageFailed}}
    </p>
</template>

<script setup lang="ts">
defineProps<{
    passed: boolean,
    messagePassed: string,
    messageFailed: string
}>();
</script>
