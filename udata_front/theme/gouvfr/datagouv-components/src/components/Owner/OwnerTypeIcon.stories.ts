import type { Meta, StoryObj } from '@storybook/vue3';
import OwnerTypeIcon from './OwnerTypeIcon.vue';
import { ASSOCIATION, COMPANY, LOCAL_AUTHORITY, OTHER, PUBLIC_SERVICE } from '../../composables/organizations/useOrganizationType';

const meta = {
  title: "Components/Owners/Owner Type Icon",
  component: OwnerTypeIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Owner Type icon shows the corresponding icon based on the owner type."
      }
    }
  },
} satisfies Meta<typeof OwnerTypeIcon>;

export default meta;

export const DefaultOwnerTypeIcon: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { OwnerTypeIcon },
      setup() {
        return { args };
      },
      template: '<OwnerTypeIcon v-bind="args" />',
    }),
    args: {
      type: "user",
    }
  };

export const PublicServiceOwnerTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerTypeIcon },
    setup() {
      return { args };
    },
    template: '<OwnerTypeIcon v-bind="args" />',
  }),
  args: {
    type: PUBLIC_SERVICE,
  }
};

export const AssociationOwnerTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerTypeIcon },
    setup() {
      return { args };
    },
    template: '<OwnerTypeIcon v-bind="args" />',
  }),
  args: {
    type: ASSOCIATION,
  }
};

export const LocalAuthorityOwnerTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerTypeIcon },
    setup() {
      return { args };
    },
    template: '<OwnerTypeIcon v-bind="args" />',
  }),
  args: {
    type: LOCAL_AUTHORITY,
  }
};

export const CompanyOwnerTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerTypeIcon },
    setup() {
      return { args };
    },
    template: '<OwnerTypeIcon v-bind="args" />',
  }),
  args: {
    type: COMPANY,
  }
};

export const OtherTypeIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OwnerTypeIcon },
    setup() {
      return { args };
    },
    template: '<OwnerTypeIcon v-bind="args" />',
  }),
  args: {
    type: OTHER,
  }
};
