import type { Meta, StoryObj } from '@storybook/vue3';
import { OrganizationNameWithCertificate } from '.';
import { CERTIFIED } from '../../composables/organizations/useOrganizationCertified';
import { ASSOCIATION, LOCAL_AUTHORITY, PUBLIC_SERVICE } from '../../composables/organizations/useOrganizationType';
import type { Organization } from '../../types/organizations';

const meta = {
  title: "Components/Organizations/Organization Name With Certificate",
  component: OrganizationNameWithCertificate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Organization Name With Certificate shows the organization name and a checkmark if it's certified."
      }
    }
  },
} satisfies Meta<typeof OrganizationNameWithCertificate>;

export default meta;

const organization: Organization = {
  id: "someId",
  acronym: null,
  name: 'My Organization',
  uri: '',
  slug: '',
  page: '',
  logo: '',
  logo_thumbnail: '',
  badges: [{kind: CERTIFIED}, {kind: PUBLIC_SERVICE}],
  business_number_id: "",
  description: "",
  url: "",
  created_at: (new Date()).toUTCString(),
  last_modified: (new Date()).toUTCString(),
  last_update: (new Date()).toUTCString(),
  deleted: (new Date()).toUTCString(),
  members: [],
  metrics: {
    datasets: 0,
    followers: 0,
    members: 0,
    reuses: 0,
    views: 0,
  },
}

export const CertifiedPublicServiceName: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization,
  }
};

export const CertifiedLocalAuthorityName: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization: {
      ...organization,
      badges: [{kind: CERTIFIED}, {kind: LOCAL_AUTHORITY}]
    },
  }
};

export const PlublicServiceName: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization: {
      ...organization,
      badges: [{kind: PUBLIC_SERVICE}]
    },
  }
};

export const LocalAuthorityName: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization: {
      ...organization,
      badges: [{kind: LOCAL_AUTHORITY}]
    },
  }
};

export const AssociationName: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization: {
      ...organization,
      badges: [{kind: ASSOCIATION}]
    },
  }
};

export const OrganizationWithoutBadges: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization: {
      ...organization,
      badges: [],
    }
  }
};
