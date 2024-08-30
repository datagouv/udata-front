<template>
      <Tab as="template" v-slot="{ selected }">
        <button
            class="fr-segmented__element"
            :class="{ 'selected': selected }"
        >
            <div class="inner">
                <slot></slot>
            </div>
        </button>
      </Tab>
</template>
<script setup lang="ts">
import { Tab } from '@headlessui/vue'
</script>
<style scoped>
button {
    display: inline-flex;
    align-items: center;
    border-radius: .25rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    padding: .25rem 0.25rem;
    white-space: nowrap;
}

.tabs-sm button {
    font-size: .875rem;
    line-height: 1.5rem;
}

button.selected {
    box-shadow: inset 0 0 0 1px var(--border-active-blue-france);
    color: var(--text-active-blue-france);
    z-index: 1;
}

button:hover {
    background-color: transparent;
}

button .inner {
    width: 100%;
    padding: .25rem .75rem;
    border-radius: .25rem;
}

.tabs-sm button .inner {
    padding: 0rem .5rem;

}

button:not(.selected):hover .inner {
    background-color: var(--hover);
}
</style>