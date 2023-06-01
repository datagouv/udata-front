<template>
  <div class="fr-stepper">
    <h2 class="fr-stepper__title">
        <span class="fr-stepper__state">{{ $t("Step {n} of {count}", {n: currentStep, count: stepCount}) }}</span>
        {{ currentStepName }}
    </h2>
    <div class="fr-stepper__steps" :data-fr-current-step="currentStep" :data-fr-steps="stepCount"></div>
    <p class="fr-stepper__details" v-if="hasNextStep">
        <span class="fr-text--bold">{{$t("Next Step:")}}</span> {{ nextStepName }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

/**
 * @typedef {string} Step
 */

export default defineComponent({
  props: {
    steps: {
      /** @type {import("vue").PropType<Array<Step>>} */
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const stepCount = computed(() => props.steps.length);
    const currentStepName = computed(() => props.steps[props.currentStep]);
    const hasNextStep = computed(() => props.currentStep + 1 < props.steps.length);
    const nextStepName = computed(() => {
      if (hasNextStep.value) {
        return props.steps[props.currentStep + 1];
      }
      return "";
    });
    return {
      currentStepName,
      hasNextStep,
      nextStepName,
      stepCount,
    }
  },
});
</script>
