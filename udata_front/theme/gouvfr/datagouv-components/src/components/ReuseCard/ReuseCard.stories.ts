import { CERTIFIED, PUBLIC_SERVICE, type Organization } from '@etalab/data.gouv.fr-components';
import ReuseCard, { type ReuseProps } from './ReuseCard.vue';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/ReuseCard',
  component: ReuseCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The ReuseCard displays data about a reuse and allows you to go to its page as well as its owner."
      }
    }
  },
} satisfies Meta<typeof ReuseCard>;

export default meta;

const args: ReuseProps = {
  reuse: {
    id: "someId",
    description: "Some description",
    created_at: (new Date()).toDateString(),
    last_update: (new Date()).toDateString(),
    page: "https://www.data.gouv.fr",
    deleted: false,
    private: false,
    datasets: [],
    slug: "some-slug",
    topic: "housing_and_development",
    type: "application",
    tags: [],
    owner: {
      id: "someUserId",
      first_name: "First",
      last_name: "Last",
      page: "https://demo.data.gouv.fr/en/users/antonin-garrone/",
    },
    metrics: {
      datasets: 3,
      discussions: 7,
      followers: 12,
      views: 36
    },
    organization: null,
    title: "My new reuse",
    image: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
    image_thumbnail: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
  }
};

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1, 20);

const updateLastYear = new Date();
updateLastYear.setFullYear(updateLastYear.getFullYear() - 1);

const organization: Organization = {
  id: "someId",
  acronym: null,
  name: "My Organization",
  badges: [],
  page: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/",
  uri: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/",
  slug: "data-gouv-fr",
  logo: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg",
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
};

const organizationWithLogo: Organization = {
  ...organization,
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg"
};

const argsWithOrganizationWithLogo: ReuseProps = {
  reuse: {
    ...args.reuse,
    organization: organizationWithLogo,
    owner: null,
  }
};

const argsWithCertifiedOrganization: ReuseProps = {
  reuse: {
    ...argsWithOrganizationWithLogo.reuse,
    organization: {
      ...organizationWithLogo,
      badges: [{kind: PUBLIC_SERVICE}, {kind: CERTIFIED}]
    },
    owner: null
  }
};

export const ReuseWithOwner: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: '<ReuseCard v-bind="args"/>',
  }),
  args,
};

export const ReuseWithOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: '<ReuseCard v-bind="args"/>',
  }),
  args: argsWithOrganizationWithLogo,
};

export const ReuseWithCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: '<ReuseCard v-bind="args"/>',
  }),
  args: argsWithCertifiedOrganization,
};

export const ReuseUpdatedLastMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: '<ReuseCard v-bind="args"/>',
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      created_at: updateLastMonth.toDateString(),
    }
  },
};

export const ReuseUpdatedLastYear: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: '<ReuseCard v-bind="args"/>',
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      created_at: updateLastYear.toDateString(),
    }
  },
};
