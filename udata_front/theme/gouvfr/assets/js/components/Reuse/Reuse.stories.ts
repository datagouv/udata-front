import { CERTIFIED, PUBLIC_SERVICE, type Organization } from '@etalab/data.gouv.fr-components';
import Reuse, { type ReuseProps } from './Reuse.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/Reuse Card',
  component: Reuse,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof Reuse>;

export default meta;

const args: ReuseProps = {
  reuse: {
    id: "someId",
    description: "Some description",
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
    organization: null,
    title: "My new dataset",
    image: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
    image_thumbnail: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
  }
};

const updateLessThanAMonth = new Date();
updateLessThanAMonth.setMonth(updateLessThanAMonth.getMonth() - 1, updateLessThanAMonth.getDate() + 2);

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1, updateLastMonth.getDate());

const updateLastYear = new Date();
updateLastYear.setFullYear(updateLastYear.getFullYear() - 1, 0, 1);

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

/**
 * #### Reuse with a owner
 * This is how a reuse owned by a owner is shown.
 */
export const ReuseWithOwner: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Reuse },
    setup() {
      return { args };
    },
    template: '<Reuse v-bind="args"/>',
  }),
  args,
};

/**
 * #### Reuse with an organization
 * This is how a reuse owned by an organization is shown.
 */
export const ReuseWithOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Reuse },
    setup() {
      return { args };
    },
    template: '<Reuse v-bind="args"/>',
  }),
  args: argsWithOrganizationWithLogo,
};

/**
 * #### Reuse with a certified organization
 * This is how a reuse owned by a certified organization is shown.
 */
export const ReuseWithCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Reuse },
    setup() {
      return { args };
    },
    template: '<Reuse v-bind="args"/>',
  }),
  args: argsWithCertifiedOrganization,
};

/**
 * #### Reuse updated this month
 * This is how a reuse owned by an organization is shown.
 */
export const ReuseUpdatedLessThanAMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Reuse },
    setup() {
      return { args };
    },
    template: '<Reuse v-bind="args"/>',
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      last_update: updateLessThanAMonth.toDateString(),
    }
  },
};


/**
 * #### Reuse updated last month
 * This is how a reuse owned by an organization is shown.
 */
export const ReuseUpdatedLastMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Reuse },
    setup() {
      return { args };
    },
    template: '<Reuse v-bind="args"/>',
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      last_update: updateLastMonth.toDateString(),
    }
  },
};

/**
 * #### Reuse updated last year
 * This is how a reuse owned by an organization is shown.
 */
export const ReuseUpdatedLastYear: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Reuse },
    setup() {
      return { args };
    },
    template: '<Reuse v-bind="args"/>',
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      last_update: updateLastYear.toDateString(),
    }
  },
};
