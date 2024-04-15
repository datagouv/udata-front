import type { Meta, StoryObj } from '@storybook/vue3';
import { QualityItem } from '.';

const meta = {
  title: "Components/Quality/Internals/Quality Item",
  component: QualityItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Quality Item, mostly used as a part of the Quality Component, displays a message acording to a boolean."
      }
    }
  },
} satisfies Meta<typeof QualityItem>;

export default meta;

export const QualityItemPassed: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityItem },
    setup() {
      return { args };
    },
    template: '<QualityItem v-bind="args" />',
  }),
  args:{
    passed: true,
    messagePassed: "It works",
    messageFailed: "Something is wrong"
  } 
};

export const QualityItemFailed: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { QualityItem },
      setup() {
        return { args };
      },
      template: '<QualityItem v-bind="args" />',
    }),
    args:{
      passed: false,
      messagePassed: "It works",
      messageFailed: "Something is wrong"
    } 
  };
