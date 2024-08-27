<template>
  <fieldset class="fr-segmented" :class="{
    'fr-segmented--no-legend': legendPosition === 'hidden',
    'fr-segmented--sm': size === 'sm',
  }" @keyup.right="moveRight" @keyup.left="moveLeft">
    <legend class="fr-segmented__legend" :class="{
      'fr-segmented__legend--inline': legendPosition === 'inline',
    }">
      {{ legend }}
    </legend>
    <div class="fr-segmented__elements">
      <div class="fr-segmented__element" v-for="(option, index) in options" :key="option.label">
        <input :value="option" type="radio" :id="`${randomId}-${index}`" v-model="model">
        <label class="fr-label" :class="option.icon" :for="`${randomId}-${index}`">
          {{ option.label }}
        </label>
      </div>
    </div>
  </fieldset>
</template>
  
<script setup lang="ts" generic="T extends { label: string; icon?: string }">
import { getRandomId } from '@gouvminint/vue-dsfr';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  legend: string;
  options: Array<T>
  size?: "sm" | "md",
  legendPosition?: "above" | "inline" | "hidden";
}>(), {
  legendPosition: "above",
  size: "md",
})

const randomId = getRandomId("segmented");
const model = defineModel<T>()

const currentIndex = computed(() => model.value ? props.options.indexOf(model.value) : null)

const moveRight = () => {
  if (currentIndex.value === null || currentIndex.value >= (props.options.length - 1)) {
    model.value = props.options[0]
  } else {
    model.value = props.options[currentIndex.value + 1]
  }
}
const moveLeft = () => {
  if (currentIndex.value === null || currentIndex.value <= 0) {
    model.value = props.options[props.options.length - 1]
  } else {
    model.value = props.options[currentIndex.value - 1]
  }
}
</script>
