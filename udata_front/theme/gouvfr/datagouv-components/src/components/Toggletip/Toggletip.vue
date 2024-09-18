<template>
  <Popover class="relative text-grey-500" :focus="true">
    <PopoverButton
      v-bind="$attrs"
      ref="button"
      :as="ToggletipButton"
    >
      <slot></slot>
    </PopoverButton>
    <PopoverPanel class="toggletip" ref="toggletip" :class="{
      'fr-p-0': noMargin,
    }" v-slot="{ close }">
      <slot name="toggletip" :close></slot>
    </PopoverPanel>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import ToggletipButton from './ToggletipButton.vue';

withDefaults(defineProps<{
  noMargin?: boolean;
}>(), {
  noMargin: false,
});
defineOptions({inheritAttrs: false});
</script>
<style scoped>
.z-10 {
  z-index: 10;
}
</style>
