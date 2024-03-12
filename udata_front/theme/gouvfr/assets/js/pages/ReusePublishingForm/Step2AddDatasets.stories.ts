import Step2AddDatasets from './Step2AddDatasets.vue';
import * as Stepper from '../../components/Form/Stepper/StepperReuse.stories';
import UploadModalButton from '../../components/Form/UploadGroup/UploadModalButton.stories';
import { withActions } from '@storybook/addon-actions/decorator';
import { user } from '../../config';

export default {
  title: 'Pages/ReusePublishingForm/Step2',
  component: Step2AddDatasets,
  parameters: {
    actions: {
      handles: [
        ...UploadModalButton.parameters.actions.handles,
      ],
    },
  },
  decorators: [withActions],
};

const args = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  originalDatasets: [
    {
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

export const Step2 = {
  render: (args) => ({
    components: { Step2AddDatasets },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step2AddDatasets v-bind="args" />
                </div>`,
  }),
  args,
}
