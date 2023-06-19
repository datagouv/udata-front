import Stepper from './Stepper.vue';

export default {
  title: 'Components/Stepper',
  component: Stepper,
};

const args = {
  steps: ["Publish data on data.gouv.fr", "Describe your dataset", "Add files", "Check information of your dataset", "Complete your publishing"],
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
