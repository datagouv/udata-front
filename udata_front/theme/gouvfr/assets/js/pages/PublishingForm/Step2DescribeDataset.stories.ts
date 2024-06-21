import { withActions } from '@storybook/addon-actions/decorator';
import { expect, fn, userEvent, waitFor, within  } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Step2DescribeDataset, { Step2DescribeDatasetProps } from './Step2DescribeDataset.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
import { user } from '../../config';
import { NewDataset } from '../../types';
import { User } from '@etalab/data.gouv.fr-components';


const meta = {
  title: 'Pages/PublishingForm/Step2',
  component: Step2DescribeDataset,
  decorators: [withActions],
  args: {
    onNext: fn(),
  }
} satisfies Meta<typeof Step2DescribeDataset>;

export default meta;

const originalDataset: NewDataset = {
  title: "My new dataset",
  archived: false,
  private: false,
  page: "",
  acronym: "",
  description: "Its has a required description",
  tags: [],
  license: "",
  frequency: "punctual",
  temporal_coverage: "",
  frequency_date: new Date(),
  spatial: {
    zones: [],
    granularity: "",
  },
  owner: user as User,
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

export const Step2: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByTestId("markdown-editor")).toBeDefined());

    await step('Click on next', async () => {
      await userEvent.click(canvas.getByRole("button", {name: "Next"}));
    });

    await waitFor(() => expect(args.onNext).toHaveBeenCalled());
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
  args,
};
