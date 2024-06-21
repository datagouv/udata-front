<template>
  <div class="fr-stepper fr-mb-3w">
    <h2 class="fr-stepper__title fr-mb-3v">
      <span class="fr-stepper__state text-default-grey">{{ $t("Step {n} of {count}", { n: currentStepNumber, count: stepCount }) }}</span>
      {{ currentStepName }}
    </h2>
    <div class="fr-stepper__steps" :data-fr-current-step="currentStepNumber" :data-fr-steps="stepCount"></div>
    <p class="fr-stepper__details" v-if="hasNextStep">
      <span class="fr-text--bold">{{ $t("Next Step:") }}</span> {{ nextStepName }}
    </p>
  </div>
</template>

<script lang="ts">
export type Step = string;
</script>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  steps: Array<Step>;
  currentStep: number;
}>();
const stepCount = computed(() => props.steps.length);
const currentStepName = computed(() => props.steps[props.currentStep]);
const currentStepNumber = computed(() => props.currentStep + 1);
const hasNextStep = computed(() => props.currentStep + 1 < props.steps.length);
const nextStepName = computed(() => {
  if (hasNextStep.value) {
    return props.steps[props.currentStep + 1];
  }
  return "";
});
</script>
