import type { Meta, StoryObj } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import { DataserviceCard } from ".";
import type { Dataservice } from '../../types/dataservices';
import TestComponent from "../DatasetCard/TestComponent.vue"

const meta = {
  title: 'Components/DataserviceCard',
  component: DataserviceCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The DataserviceCard displays data about a dataservice and allows you to go to its page as well as its organization."
      }
    }
  },
} satisfies Meta<typeof DataserviceCard>;

export default meta;

const dataserviceRoutes = [
  {
    path: '/dataservices/:id',
    component: TestComponent
  },
  {
    path: '/organizations/:id',
    component: TestComponent
  }
]

const dataservice: Dataservice = {
  acronym: "API",
  archived_at: null,
  authorization_request_url: null,
  availability: 99.9,
  base_api_url: null,
  contact_point: {
    email: "",
    id: "someId",
    name: "Contact",
    organization: null,
    owner: "John Doe",
  },
  created_at: (new Date()).toDateString(),
  datasets: [
    {
      class: "",
      id: "someId2",
      acronym: "",
      page: "",
      title: "",
      uri: "",
    }
  ],
  deleted_at: null,
  description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  endpoint_description_url: null,
  business_documentation_url: null,
  extras: {},
  format: "json",
  harvest: {},
  has_token: false,
  id: "653a6afa18f9f98d2ffdadee",
  is_restricted: false,
  license: "lov2",
  metadata_modified_at: (new Date()).toDateString(),
  metrics: { discussions: 12, followers: 25, reuses: 8, views: 59 },
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
    badges: [{kind: 'certified'}, {kind: 'public-service'}],
    name: "Météo France",
    slug: "test-meteo-france",
    uri: "https://demo.data.gouv.fr/api/1/organizations/test-meteo-france/",
    url: ""
  },
  owner: null,
  private: false,
  rate_limiting: "",
  self_api_url: "",
  self_web_url: "",
  slug: "",
  tags: [],
  title: "That Awesome API That Awesome API That Awesome API That Awesome API That Awesome API ",
};

const args = {
  dataservice: dataservice,
  dataserviceUrl: "/dataservices/6571faa17f46a65ee05c4d17",
};

const argsPrivate = {
  dataservice: {...dataservice, private: true},
  dataserviceUrl: "/dataservices/6571faa17f46a65ee05c4d17",
};

const argsArchived = {
  dataservice: {...dataservice, archived_at: new Date().toDateString()},
  dataserviceUrl: "/dataservices/6571faa17f46a65ee05c4d17",
};

export const SimpleDataserviceCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args,
};


export const DataserviceWithoutAvailabilityCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    dataservice: {
      ...args.dataservice,
      availability: null,
    }
  },
};

export const DataserviceCardWithoutDescription: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    showDescription: false,
  },
};

export const DataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const RestrictedDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    dataservice: {
      ...args.dataservice,
      is_restricted: true,
    },
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const PrivateDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...argsPrivate,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const ArchivedDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...argsArchived,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const PrivateArchivedRestrictedDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...argsArchived,
    dataservice: {
      ...argsArchived.dataservice,
      private: true,
      is_restricted: true,
    },
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const RouterDataserviceCard: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(dataserviceRoutes)],
  args,
};

export const RouterDataserviceCardWithoutDescription: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(dataserviceRoutes)],
  args: {
    ...args,
    showDescription: false,
  },
};

export const RouterDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(dataserviceRoutes)],
  args: {
    ...args,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const PrivateRouterDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(dataserviceRoutes)],
  args: {
    ...argsPrivate,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const ArchivedRouterDataserviceCardWithOrganizationUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/><router-view></router-view>`,
  }),
  decorators: [vueRouter(dataserviceRoutes)],
  args: {
    ...argsArchived,
    organizationUrl: "/organizations/another-url-easier-to-distinguish"
  },
};

export const DataserviceCardTabularApi: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DataserviceCard },
    setup() {
      return { args };
    },
    template: `<DataserviceCard v-bind="args"/>`,
  }),
  args: {
    ...args,
    dataservice: {
      ...args.dataservice,
      title: 'API automatique data.gouv.fr',
      organization: { ...args.dataservice.organization, name: 'data.gouv.fr' },
      id: '6716420e0cf1cfbbd07b4c8b', // Set in `.env`
    }
  },
};
