import type { Meta, StoryObj } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import { DatasetCard } from ".";
import type { DatasetV2 } from '../..';
import TestComponent from "./TestComponent.vue"

const meta = {
  title: 'Components/DatasetCard',
  component: DatasetCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The DatasetCard displays data about a dataset and allows you to go to its page as well as its organization."
      }
    }
  },
} satisfies Meta<typeof DatasetCard>;

export default meta;

const datasetRoutes = [
  {
    path: '/datasets/:id',
    component: TestComponent
  },
  {
    path: '/organizations/:id',
    component: TestComponent
  }
]

const dataset: DatasetV2 = {
  id: "653a6afa18f9f98d2ffdadee",
  page: "https://demo.data.gouv.fr/fr/datasets/donnees-changement-climatique-sqr/",
  resources: {
    rel: "subsection",
    href: "https://demo.data.gouv.fr/api/1/datasets/community_resources/?dataset=653a6afa18f9f98d2ffdadee&page=1&page_size=50",
    total: 12,
    type: "GET"
  },
  community_resources: {
    rel: "subsection",
    href: "https://demo.data.gouv.fr/api/2/datasets/653a6afa18f9f98d2ffdadee/resources/?page=1&page_size=50",
    total: 0,
    type: "GET"
  },
  created_at: "2023-10-26T13:34:50.156000+00:00",
  last_modified: "2023-12-07T16:51:02.937000+00:00",
  last_update: "2023-11-03T08:55:42.847000+00:00",
  uri: "https://demo.data.gouv.fr/api/1/datasets/donnees-changement-climatique-sqr/",
  slug: "donnees-changement-climatique-sqr",
  quality: {
    all_resources_available: false,
    dataset_description_quality: false,
    has_open_format: true,
    has_resources: false,
    license: false,
    resources_documentation: true,
    score: 0.9,
    spatial: false,
    temporal_coverage: false,
    update_frequency: false,
    update_fulfilled_in_time: false,
  },
  metrics: { discussions: 12, followers: 25, reuses: 8, views: 59 },
  title: "Données changement climatique - SQR",
  acronym: "DCC",
  archived: false,
  description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  tags: null,
  license: "lov2",
  frequency: "Unknown",
  temporal_coverage: "Test",
  frequency_date: null,
  private: false,
  spatial: null,
  badges: [],
  owner: null,
  organization: {
    id: "some_id",
    acronym: null,
    logo: "https://demo-static.data.gouv.fr/avatars/92/6284d057ca4279af35e9b62bc62639-100.png",
    logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/92/6284d057ca4279af35e9b62bc62639-100.png",
    page: "https://demo.data.gouv.fr/fr/organizations/test-meteo-france/",
    badges: [],
    name: "[TEST] Météo France",
    slug: "test-meteo-france",
    uri: "https://demo.data.gouv.fr/api/1/organizations/test-meteo-france/"
  }
};

const args = {
  dataset: dataset,
  datasetUrl: "/datasets/6571faa17f46a65ee05c4d17",
};

export const DatasetCardWithDatasetUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args,
};

export const DatasetCardWithNoQualityScore: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args" :showQualityScore="false"/>`,
  }),
  args,
};

export const DatasetCardWithDatasetAndOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const RouterDatasetCardWithDatasetUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args,
};

export const RouterDatasetCardWithDatasetAndOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args: {
    ...args,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};
