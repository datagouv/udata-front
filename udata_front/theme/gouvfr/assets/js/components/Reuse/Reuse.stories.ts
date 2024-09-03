import type {  Reuse } from '@datagouv/components';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";
import ReuseCard from './Reuse.vue';

const meta = {
  title: 'Components/Reuse Card',
  component: ReuseCard,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof ReuseCard>;

export default meta;

const args = {
  reuse: {
    id: "someId",
    description: "Some description",
    created_at: (new Date()).toDateString(),
    last_update: (new Date()).toDateString(),
    page: "https://www.data.gouv.fr",
    archived: false,
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
    metrics: {
      datasets: 2,
      discussions: 0,
      followers: 3,
      views: 5,
    },
    title: "My new dataset",
    image: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
    image_thumbnail: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
  } satisfies Reuse,
};

const updateLessThanAMonth = new Date();
const twoDayAgoInMs = 2 * 24 * 60  * 60 * 1000;
updateLessThanAMonth.setTime(updateLessThanAMonth.getTime() - twoDayAgoInMs);

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1);

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
 * #### Reuse for udata-front
 * Reuse card with its udata page as url
 */
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
