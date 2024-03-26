import type { Meta, StoryObj } from '@storybook/vue3';
import OrganizationNameWithCertificate from '.';
import { CERTIFIED, PUBLIC_SERVICE } from '../../composables/organizations/useOrganizationCertified';

const meta = {
  title: "Components/Organization Name With Certificate",
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

export const CertifiedOrganization: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { OrganizationNameWithCertificate },
      setup() {
        return { args };
      },
      template: '<OrganizationNameWithCertificate v-bind="args" />',
    }),
    args: {
      organization: {
        id: "someId",
        acronym: null,
        name: 'My Organization',
        uri: '',
        slug: '',
        page: '',
        logo: '',
        logo_thumbnail: '',
        badges: [{kind: CERTIFIED}, {kind: PUBLIC_SERVICE}]
      }
    }
  };


export const Organization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationNameWithCertificate },
    setup() {
      return { args };
    },
    template: '<OrganizationNameWithCertificate v-bind="args" />',
  }),
  args: {
    organization: {
      id: "someId",
      acronym: null,
      name: 'My Organization',
      uri: '',
      slug: '',
      page: '',
      logo: '',
      logo_thumbnail: '',
      badges: []
    }
  }
};
