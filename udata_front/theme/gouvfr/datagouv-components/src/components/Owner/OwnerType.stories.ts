import type { Meta, StoryObj } from '@storybook/vue3';
import { OwnerType } from '.';
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, OTHER, PUBLIC_SERVICE } from '../../composables/organizations/useOrganizationType';

const meta = {
  title: "Components/Owners/Owner Type",
  component: OwnerType,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Owner Type icon shows the corresponding icon based on the owner type."
      }
    }
  },
} satisfies Meta<typeof OwnerType>;

export default meta;

export const DefaultOwnerType: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { OwnerType },
      setup() {
        return { args };
      },
      template: '<OwnerType v-bind="args" />',
    }),
    args: {
      type: "user",
    }
  };

export const PublicServiceOwnerType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerType },
    setup() {
      return { args };
    },
    template: '<OwnerType v-bind="args" />',
  }),
  args: {
    type: PUBLIC_SERVICE,
  }
};

export const AssociationOwnerType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerType },
    setup() {
      return { args };
    },
    template: '<OwnerType v-bind="args" />',
  }),
  args: {
    type: ASSOCIATION,
  }
};

export const LocalAuthorityOwnerType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerType },
    setup() {
      return { args };
    },
    template: '<OwnerType v-bind="args" />',
  }),
  args: {
    type: LOCAL_AUTHORITY,
  }
};

export const CompanyOwnerType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerType },
    setup() {
      return { args };
    },
    template: '<OwnerType v-bind="args" />',
  }),
  args: {
    type: COMPANY,
  }
};

export const OtherOwnerType: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerType },
    setup() {
      return { args };
    },
    template: '<OwnerType v-bind="args" />',
  }),
  args: {
    type: OTHER,
  }
};
