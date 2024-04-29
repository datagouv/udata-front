import type { Meta, StoryObj } from '@storybook/vue3';
import { OrganizationType } from '.';
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, PUBLIC_SERVICE } from '../../composables/organizations/useOrganizationType';

const meta = {
  title: "Components/Organizations/Organization Type",
  component: OrganizationType,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Organization Type icon shows the corresponding icon based on the organization type."
      }
    }
  },
} satisfies Meta<typeof OrganizationType>;

export default meta;

export const DefaultOrganizationType: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { OrganizationType },
      setup() {
        return { args };
      },
      template: '<OrganizationType v-bind="args" />',
    }),
    args: {
      type: COMPANY,
    }
  };

export const PublicServiceOrganizationType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationType },
    setup() {
      return { args };
    },
    template: '<OrganizationType v-bind="args" />',
  }),
  args: {
    type: PUBLIC_SERVICE,
  }
};

export const AssociationOrganizationType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationType },
    setup() {
      return { args };
    },
    template: '<OrganizationType v-bind="args" />',
  }),
  args: {
    type: ASSOCIATION,
  }
};

export const LocalAuthorityOrganizationType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationType },
    setup() {
      return { args };
    },
    template: '<OrganizationType v-bind="args" />',
  }),
  args: {
    type: LOCAL_AUTHORITY,
  }
};
