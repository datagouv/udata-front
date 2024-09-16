import { type Reuse } from '@datagouv/components/ts';
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
    url: "https://www.data.gouv.fr",
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
