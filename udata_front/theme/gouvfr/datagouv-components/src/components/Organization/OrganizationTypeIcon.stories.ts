import type { Meta, StoryObj } from '@storybook/vue3';
import { OrganizationTypeIcon } from '.';
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, PUBLIC_SERVICE } from '../../composables/organizations/useOrganizationType';

const meta = {
  title: "Components/Organizations/Internals/Organization Type Icon",
  component: OrganizationTypeIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Organization Type icon shows the corresponding icon based on the organization type."
      }
    }
  },
} satisfies Meta<typeof OrganizationTypeIcon>;

export default meta;

export const DefaultOrganizationTypeIcon: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { OrganizationTypeIcon },
      setup() {
        return { args };
      },
      template: '<OrganizationTypeIcon v-bind="args" />',
    }),
    args: {
      type: COMPANY,
    }
  };

export const PublicServiceOrganizationTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationTypeIcon },
    setup() {
      return { args };
    },
    template: '<OrganizationTypeIcon v-bind="args" />',
  }),
  args: {
    type: PUBLIC_SERVICE,
  }
};

export const AssociationOrganizationTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationTypeIcon },
    setup() {
      return { args };
    },
    template: '<OrganizationTypeIcon v-bind="args" />',
  }),
  args: {
    type: ASSOCIATION,
  }
};

export const LocalAuthorityOrganizationTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationTypeIcon },
    setup() {
      return { args };
    },
    template: '<OrganizationTypeIcon v-bind="args" />',
  }),
  args: {
    type: LOCAL_AUTHORITY,
  }
};
