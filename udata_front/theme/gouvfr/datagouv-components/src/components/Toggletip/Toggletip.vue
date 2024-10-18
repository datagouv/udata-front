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
      'left-0': position === 'right',
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
  position?: 'left' | 'right';
}>(), {
  noMargin: false,
  position: 'left',
});
defineOptions({inheritAttrs: false});
</script>
<style scoped>
.z-10 {
  z-index: 10;
}
.left-0 {
  left: 0;
}
</style>
