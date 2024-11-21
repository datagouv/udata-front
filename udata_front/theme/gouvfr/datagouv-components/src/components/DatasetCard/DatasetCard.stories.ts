import type { Meta, StoryObj } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import { DatasetCard } from '.';
import type { DatasetV2 } from '../..';
import TestComponent from "./TestComponent.vue";

const meta = {
  title: 'Components/DatasetCard',
  component: DatasetCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The DatasetCard displays data about a dataset."
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
];

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
  created_at: (new Date()).toDateString(),
  last_modified: (new Date()).toDateString(),
  last_update: (new Date()).toDateString(),
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
  metrics: { discussions: 12, followers: 25, reuses: 8, views: 59, resources_downloads:	18705 },
  title: "Données changement climatique - Données changement climatique - Données changement climatique - Données changement climatique - SQR",
  acronym: "DCC",
  archived: false,
  description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Eaque ipsa quae s iste natus error siab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
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
    created_at: "",
    last_modified: "",
    last_update: "",
    deleted: null,
    members: [],
    metrics: {
      datasets: 0,
      followers: 0,
      members: 0,
      reuses: 0,
      views: 0
    },
    acronym: null,
    logo: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
    logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
    page: "https://demo.data.gouv.fr/fr/organizations/test-meteo-france/",
    business_number_id: "",
    description: "",
    badges: [
      {
        "kind": "public-service"
      },
      {
        "kind": "certified"
      }
    ],
    name: "Météo France",
    slug: "test-meteo-france",
    uri: "https://demo.data.gouv.fr/api/1/organizations/test-meteo-france/",
    url: ""
  }
};

const updateLessThanAMonth = new Date();
const twoDayAgoInMs = 2 * 24 * 60  * 60 * 1000;
updateLessThanAMonth.setHours(1, 0, 0, 0);
updateLessThanAMonth.setTime(updateLessThanAMonth.getTime() - twoDayAgoInMs);

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1);

const args = {
  dataset: dataset,
  datasetUrl: "/datasets/6571faa17f46a65ee05c4d17",
};

const argsPrivate = {
  dataset: {...dataset, private: true},
  datasetUrl: "/datasets/6571faa17f46a65ee05c4d17",
};

const argsArchived = {
  dataset: {...dataset, archived: true},
  datasetUrl: "/datasets/6571faa17f46a65ee05c4d17",
};

export const DatasetCardSimple: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args,
};

export const DatasetCardSimpleWithOwner: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    dataset: {
      ...args.dataset,
      organization: null,
      owner: {
        id: "someUserId",
        first_name: "John",
        last_name: "Doedoedoedoedoedoedoedoedoedoedoedoe",
        page: "https://demo.data.gouv.fr/en/users/antonin-garrone/",
      },
    }
  },
};

export const DatasetCardSimpleWithOrganizationUrl: StoryObj<typeof meta> = {
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

export const DatasetCardWithoutDescription: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    showDescription: false,
  },
};

export const PrivateDatasetCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    ...argsPrivate,
  },
};

export const ArchivedDatasetCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    ...argsArchived,
  },
};

export const RouterDatasetCardSimple: StoryObj<typeof meta> = {
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

export const RouterDatasetCardSimpleWithOrganizationUrl: StoryObj<typeof meta> = {
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

export const RouterDatasetCardWithoutDescription: StoryObj<typeof meta> = {
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
    showDescription: false,
  },
};

export const RouterPrivateDatasetCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args: {
    ...argsPrivate,
  },
};

export const RouterArchivedDatasetCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args: {
    ...argsArchived,
  },
};

export const DatasetCardUpdatedLessThanAMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    dataset: {...dataset, last_update: updateLessThanAMonth.toDateString()},
    datasetUrl: "/datasets/6571faa17f46a65ee05c4d17",
  },
};

export const DatasetCardUpdatedLastMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    dataset: {...dataset, last_update: updateLastMonth.toDateString()},
    datasetUrl: "/datasets/6571faa17f46a65ee05c4d17",
  },
};

export const DatasetCardWithLongOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DatasetCard },
    setup() {
      return { args };
    },
    template: `<DatasetCard v-bind="args"/>`,
  }),
  args: {
    dataset: {...dataset, organization: { ...dataset.organization, name: "Ministère de l’Économie, des Finances et de la Souveraineté industrielle et numérique de France, et encore un peu plus long"}},
  },
};
