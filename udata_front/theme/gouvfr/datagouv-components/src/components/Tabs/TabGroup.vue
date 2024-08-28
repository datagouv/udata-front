<template>
    <TabGroup as="div" :class="{
        'tabs-sm': size === 'sm',
    }">
        <slot></slot>
    </TabGroup>
</template>
<script setup lang="ts">
import { TabGroup } from '@headlessui/vue'

withDefaults(defineProps<{
    size?: "sm" | "md";
}>(), {
    size: "md",
})
</script>