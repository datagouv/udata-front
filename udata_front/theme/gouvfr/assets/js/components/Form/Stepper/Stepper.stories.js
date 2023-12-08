import Stepper from './Stepper.vue';

export default {
  title: 'Components/Stepper',
  component: Stepper,
};

const args = {
  steps: ["Publish data on data.gouv.fr", "Describe your dataset", "Add files", "Complete your publishing"],
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

export const StepperOnSecondStep = {
  render: (args) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: '<Stepper v-bind="args" />',
  }),
  args: {
    ...args,
    currentStep: 1,
  },
};
