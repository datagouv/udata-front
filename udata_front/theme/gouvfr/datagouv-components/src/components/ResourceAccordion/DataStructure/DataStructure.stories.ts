import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import DataStructure from '.';
import { Resource } from '../../../types/resources';
import { AvailablePreview } from '../Preview/Preview.stories';

const meta = {
  title: "Components/Resource/Internals/Data Structure",
  component: DataStructure,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Data Structure shows a smaller version of explore.data.gouv.fr to the user."
      }
    }
  },
  decorators: [withActions],
} satisfies Meta<typeof DataStructure>;

export default meta;

const resource: Resource = AvailablePreview.args.resource;

export const AvailableDataStructure: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataStructure },
    setup() {
      return { args };
    },
    template: '<DataStructure v-bind="args" />',
  }),
  args: {
    resource,
  }
};

export const UnavailablePreview: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataStructure },
    setup() {
      return { args };
    },
    template: '<DataStructure v-bind="args" />',
  }),
  args: {
    resource: {
      ...resource,
      id: "someId",
    },
  }
};
