import type { Meta, StoryObj } from '@storybook/vue3';
import Step2AddDatasets from './Step2AddDatasets.vue';
import { user } from '../../config';

const meta = {
  title: 'Pages/ReusePublishingForm/Step2',
  component: Step2AddDatasets,
} satisfies Meta<typeof Step2AddDatasets>;

export default meta;

const args = {
  reuse: {
    badges: [],
    created_at: "2024-03-03T19:04:43.599000+00:00",
    datasets: [],
    deleted: null,
    description: "This is a random description",
    extras: {},
    featured: null,
    id: "someId",
    image: "hhttps://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
    image_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
    last_modified: "2024-03-04T08:07:50.215000+00:00",
    metrics: {
      datasets: 1,
      discussions: 0,
      followers: 0,
      views: 0
    },
    organization: null,
    owner: {
      avatar: "https://static.data.gouv.fr/avatars/27/62003f06b04fa996d1e3ae84adbaf9-original.png",
      avatar_thumbnail: "https://static.data.gouv.fr/avatars/27/62003f06b04fa996d1e3ae84adbaf9-500.png",
      class: "User",
      first_name: "Benoit",
      id: "5bdb10308b4c4108ae679f01",
      last_name: "Demaegdt",
      page: "https://www.data.gouv.fr/fr/users/benoit-demaegdt/",
      slug: "benoit-demaegdt",
      uri: "https://www.data.gouv.fr/api/1/users/benoit-demaegdt/"
    },
    page: "",
    private: false,
    slug: "testReuse",
    tags: [
      "mobilite",
      "mobilite-douce",
      "velo"
    ],
    title: "Test Reuse",
    topic: "transport_and_mobility",
    type: "vizualization",
    uri: "",
    url: "data.gouv.fr"
  },
  originalDatasets: [
    {
      id: "someId",
      title: "Another awesome dataset",
      archived: false,
      private: false,
      page: "",
      acronym: "",
      description: "Its has a required description",
      tags: [],
      license: "",
      frequency: "punctual",
      temporal_coverage: "",
      frequency_date: "2021-10-11T00:00:00+00:00",
      last_update: "2023-11-23T13:27:56.844000+00:00",
      spatial: {
        zones: [],
        granularity: "",
      },
      owner: user,
      quality: {
        all_resources_available: true,
        dataset_description_quality: true,
        has_open_format: true,
        has_resources: true,
        license: true,
        resources_documentation: true,
        score: 1,
        spatial: true,
        temporal_coverage: true,
        update_frequency: true,
        update_fulfilled_in_time: true,
      },
      metrics: {
        discussions: 2,
        followers: 17,
        views: 76
      }
    }
  ],
  errors: [],
};

export const Step2: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step2AddDatasets },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <div class="fr-container">
                    <Step2AddDatasets v-bind="args" />
                  </div>
                </div>`,
  }),
  args,
}
