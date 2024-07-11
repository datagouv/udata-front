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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const a = canvas.getByTestId<HTMLAnchorElement>("edit-button");
    const root = config.admin_root;
    expect(a.href).toBe(`${window.location.origin}${root}dataset/${args.datasetId}/resource/${args.resourceId}`);
  },
  render: (args) => ({
    components: { EditButton },
    setup() {
      return { args };
    },
    template: '<EditButton v-bind="args" />',
  }),
  args: {
    datasetId: "someId",
    resourceId: "someResourceId",
  }
};

export const EditButtonOnCommunityResource: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const a = canvas.getByTestId<HTMLAnchorElement>("edit-button");
    const root = config.admin_root;
    expect(a.href).toBe(`${window.location.origin}${root}dataset/${args.datasetId}/community-resource/${args.resourceId}`);
  },
  render: (args) => ({
    components: { EditButton },
    setup() {
      return { args };
    },
    template: '<EditButton v-bind="args" />',
  }),
  args: {
    datasetId: "someId",
    resourceId: "someResourceId",
    isCommunityResource: true,
  }
};
