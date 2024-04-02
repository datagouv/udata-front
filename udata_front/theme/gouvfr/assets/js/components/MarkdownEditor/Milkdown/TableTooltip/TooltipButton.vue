<template>
  <button
    class="fr-btn fr-btn--secondary fr-btn--sm bg-white"
    :class="iconClass"
    @click="emit('click')"
  >
    <div v-if="svg" v-html="svg"></div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export type ButtonProps = {
  icon: string,
  svg?: never,
} | {
  icon?: never,
  svg: string,
};
</script>

<script setup lang="ts">
const props = defineProps<ButtonProps>();

const iconClass = props.icon ? props.icon : "fr-icon-svg";

const emit = defineEmits<{click: []}>();

</script>
