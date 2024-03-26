<template>
  <div class="well" :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { Weight, WellType } from "../../types/ui";
export type WellProps = {
  type?: WellType;
  color?: string;
  weight?: Weight;
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<WellProps>(), {
  type: "primary",
  color: "grey-100",
  weight: "semi-bold",
});
const wellClass = computed(() => `well${props.type === "primary" ? "" : "-" + props.type}-${props.color}`);
const weightClass = computed(() => `fr-text--${props.weight}`);
const classes = computed(() => weightClass.value + " " + wellClass.value);
</script>
