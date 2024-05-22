import type { Meta, StoryObj } from '@storybook/vue3';
import Stepper from './Stepper.vue';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

const args = {
  steps: ["Publish data on data.gouv.fr", "Describe your dataset", "Add files", "Complete your publishing"],
  currentStep: 0,
};

const argsOrga = {
  steps: ["Create or join an organization on data.gouv.fr", "Describe your organization", "Finalize your organization"],
  currentStep: 0,
}

export const StepperOnFirstStep: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: '<Stepper v-bind="args" />',
  }),
  args,
};

export const StepperOnSecondStep: StoryObj<typeof meta> = {
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

export const StepperOrgaOnFirstStep: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: '<Stepper v-bind="args" />',
  }),
  args: argsOrga,
};

export const StepperOrgaOnSecondStep: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: '<Stepper v-bind="args" />',
  }),
  args: {
    ...argsOrga,
    currentStep: 1,
  },
};
