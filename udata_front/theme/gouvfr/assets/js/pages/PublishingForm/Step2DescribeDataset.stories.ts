import type { NewDataset } from '@datagouv/components/ts';
import { withActions } from '@storybook/addon-actions/decorator';
import { expect, fn, userEvent, waitFor, within  } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Step2DescribeDataset, { Step2DescribeDatasetProps } from './Step2DescribeDataset.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';

const meta = {
  title: 'Pages/PublishingForm/Step2',
  component: Step2DescribeDataset,
  decorators: [withActions],
  args: {
    onNext: fn(),
  }
} satisfies Meta<typeof Step2DescribeDataset>;

export default meta;

const myUser = {
  id: "someId",
  first_name: "John",
  last_name: "Doe",
  avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
  about: "something about me",
  active: true,
  apikey: null,
  metrics: {
    datasets: 12,
    followers: 2,
    following: 3,
    reuses: 4,
  },
  since: (new Date()).toUTCString(),
  website: "",
  organizations: [
    {
      acronym: null,
      badges: [],
      class: "Organization",
      id: "65e9b7cf830c3b5a515ee4ed",
      logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      name: "My Organization",
      page: "",
      slug: "my-organization",
      uri: "/",
      business_number_id: "some business number",
      description: "",
      url: "someUrl",
      created_at: "",
      last_modified: "",
      last_update: "",
      deleted: "",
      members: [],
      metrics: {
        datasets: 12,
        followers: 0,
        members: 2,
        reuses: 0,
        views: 5,
      }
    },
    {
      acronym: null,
      badges: [],
      class: "Organization",
      id: "65e9b7cf830c3b5a515ee4ee",
      logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      name: "My Second Organization",
      page: "",
      slug: "my-second-organization",
      uri: "/",
      business_number_id: "some business number",
      description: "",
      url: "someUrl",
      created_at: "",
      last_modified: "",
      last_update: "",
      deleted: "",
      members: [],
      metrics: {
        datasets: 12,
        followers: 0,
        members: 2,
        reuses: 0,
        views: 5,
      }
    }
  ],
  roles: [],
  page: ""
};

const originalDataset: NewDataset = {
  title: "My new dataset",
  archived: false,
  private: false,
  page: "",
  acronym: "",
  description: "Its has a required description",
  tags: [] as Array<string>,
  license: "",
  frequency: "punctual",
  temporal_coverage: "",
  frequency_date: new Date(),
  spatial: {
    zones: [],
    granularity: "",
  },
  owner: myUser.id,
  organization: null,
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
};


const args: Step2DescribeDatasetProps = {
  originalDataset,
  steps: Stepper.StepperOnSecondStep.args.steps,
  user: myUser,
  granularities: [
    {
      'id': 'country-group',
      'name': 'Groupement de pays'
    },
    {
      'id': 'country',
      'name': 'Pays'
    },
    {
      "id": "country-subset",
      "name": "Sous-ensemble de pays"
    },
    {
      "id": "fr:region",
      "name": "Région française"
    },
    {
      "id": "fr:departement",
      "name": "Département français"
    },
    {
      "id": "fr:arrondissement",
      "name": "Arrondissement français"
    },
    {
      "id": "fr:commune",
      "name": "Commune française"
    },
    {
      "id": "fr:iris",
      "name": "Iris (quartiers INSEE)"
    },
    {
      "id": "fr:canton",
      "name": "Canton français"
    },
    {
      "id": "fr:collectivite",
      "name": "Collectivités d'outre-mer françaises"
    },
    {
      "id": "fr:epci",
      "name": "Intercommunalité française (EPCI)"
    },
    {
      "id": "poi",
      "name": "Point d'Intérêt"
    },
    {
      "id": "other",
      "name": "Autre"
    }
  ]
};

export const Step2WithNoOrganization: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByTestId("markdown-editor")).toBeDefined());

    await step('Click on next', async () => {
      await userEvent.click(canvas.getByRole("button", {name: "Next"}));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimeout(() => { expect(args.onNext).toHaveBeenCalled(); }, 1000);
    });
  },
  render: (args) => ({
    components: { Step2DescribeDataset },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step2DescribeDataset v-bind="args" />
                </div>`,
  }),
  args: {
    ...args,
    user: {
      ...myUser,
      organizations: []
    }
  },
};

export const Step2WithOrganizations: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step2DescribeDataset },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step2DescribeDataset v-bind="args" />
                </div>`,
  }),
  args,
};

export const Step2WithAdmin: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step2DescribeDataset },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step2DescribeDataset v-bind="args" />
                </div>`,
  }),
  args: {
    ...args,
    user: {
      ...myUser,
      roles: [...myUser?.roles, 'admin']
    }
  },
};
