import { withActions } from '@storybook/addon-actions/decorator';
import { expect, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import EditButton from './EditButton.vue';
import { config } from '../../config';
import ".";

const meta = {
  title: "Components/Resource/Internals/Edit Button",
  component: EditButton,
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click a'],
    },
    docs: {
      description: {
        component: "The Edit Button sends the user to the correct administration page."
      }
    }
  },
  decorators: [withActions],
} satisfies Meta<typeof EditButton>;

export default meta;

export const EditButtonOnResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { EditButton },
    setup() {
      return { args };
    },
    template: '<EditButton v-bind="args" />',
  }),
  args: {
    datasetId: "someId",
    resource: {id: "someResourceId"},
  }
};

export const EditButtonOnCommunityResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { EditButton },
    setup() {
      return { args };
    },
    template: '<EditButton v-bind="args" />',
  }),
  args: {
    datasetId: "someId",
    resource: {id: "someResourceId", owner: { id: "ownerId"}},
    isCommunityResource: true,
  }
};
