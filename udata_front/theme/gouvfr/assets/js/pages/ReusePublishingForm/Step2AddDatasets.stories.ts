import Step2AddDatasets from './Step2AddDatasets.vue';
import * as Stepper from '../../components/Form/Stepper/StepperReuse.stories';
import UploadModalButton from '../../components/Form/UploadGroup/UploadModalButton.stories';
import { withActions } from '@storybook/addon-actions/decorator';

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
  originalDatasets: [],
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
