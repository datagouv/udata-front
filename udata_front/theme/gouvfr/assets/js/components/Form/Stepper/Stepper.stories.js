import Stepper from './Stepper.vue';

export default {
  title: 'Components/Stepper',
  component: Stepper,
};

const args = {
  steps: ["Step 1", "Second Step", "Third and last Step"],
  currentStep: 0,
};

export const StepperOnFirstStep = {
  render: (args) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: '<Stepper v-bind="args" />',
  }),
  args,
};
