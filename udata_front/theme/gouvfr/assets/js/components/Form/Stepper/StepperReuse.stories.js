import Stepper from './Stepper.vue';

export default {
  title: 'Components/StepperReuse',
  component: Stepper,
};

const args = {
  steps: ["Describe your reuse", "Add datasets", "Complete your publishing"],
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

export const StepperOnThirdStep = {
    render: (args) => ({
      components: { Stepper },
      setup() {
        return { args };
      },
      template: '<Stepper v-bind="args" />',
    }),
    args: {
      ...args,
      currentStep: 2,
    },
  };
