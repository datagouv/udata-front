<template>
    <div v-if="!qualityItem" class="text-default-warning fr-grid-row fr-grid-row--middle fr-m-1v">
            <p class="fr-my-0 fr-text--sm">
                <span
                class="fr-icon-warning-line fr-icon--sm"
                aria-hidden="true"
                ></span>
                {{ message }}
            </p>
        </div>
</template>

<script setup lang="ts">
defineProps<{
    qualityItem: boolean,
    message: string
}>();
</script>
