import type { Meta, StoryObj } from '@storybook/vue3';
import { QualityItem } from '.';
import "../quality-score.less";

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
    template: '<ul class="list-style-none fr-p-0 fr-m-0"><QualityItem v-bind="args" /></ul>',
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
      template: '<ul class="list-style-none fr-p-0 fr-m-0"><QualityItem v-bind="args" /></ul>',
    }),
    args:{
      passed: false,
      messagePassed: "It works",
      messageFailed: "Something is wrong"
    }
  };
