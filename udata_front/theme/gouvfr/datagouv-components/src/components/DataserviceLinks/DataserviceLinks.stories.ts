import type { Meta, StoryObj } from '@storybook/vue3';
import { DataserviceLinks } from "./";
import type { Dataservice } from '../../types/dataservices';

const meta = {
  title: 'Components/DataserviceLinks',
  component: DataserviceLinks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The DataserviceLinks displays different links from dataservice in a custom way."
      }
    }
  },
} satisfies Meta<typeof DataserviceLinks>;

export default meta;

const dataservice: Dataservice = {
  acronym: "API",
  archived_at: null,
  authorization_request_url: null,
  availability: 99.9,
  base_api_url: "https://www.data.gouv.fr",
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
  endpoint_description_url: "https://www.data.gouv.fr",
  business_documentation_url: "https://guides.data.gouv.fr/api",
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

export const SimpleDataserviceLinks: StoryObj<typeof meta> = {
  render: (args: any) => ({
    components: { DataserviceLinks },
    setup() {
      return { args };
    },
    template: `<DataserviceLinks v-bind="args"/>`,
  }),
  args: {
    dataservice: dataservice
  }
};

export const EndpointOpenAPIDataserviceLinks: StoryObj<typeof meta> = {
  render: (args: any) => ({
    components: { DataserviceLinks },
    setup() {
      return { args };
    },
    template: `<DataserviceLinks v-bind="args"/>`,
  }),
  args: {
    dataservice: {
      ...dataservice,
      endpoint_description_url: "https://raw.githubusercontent.com/betagouv/api_gouv_swaggers/main/swaggers/api-impot-particulier.json", 
    }
  }
};

export const NoLinksDataserviceLinks: StoryObj<typeof meta> = {
  render: (args: any) => ({
    components: { DataserviceLinks },
    setup() {
      return { args };
    },
    template: `<DataserviceLinks v-bind="args"/>`,
  }),
  args: {
    dataservice: {
      ...dataservice,
      endpoint_description_url: null,
      business_documentation_url: null,
      base_api_url: null,
    }
  }
};
