<template>
    <TabList class="fr-segmented__elements">
        <slot></slot>
    </TabList>
</template>
<script setup lang="ts">
import { TabList } from '@headlessui/vue'
</script>
<style scoped>
.fr-segmented__elements {
    display: inline-flex;
}
</style>