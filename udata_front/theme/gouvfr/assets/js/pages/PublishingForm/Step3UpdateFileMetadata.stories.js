import UpdateFileMetadata from './Step3UpdateFileMetadata.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step3UpdateFileMetadata',
  component: UpdateFileMetadata,
};

const args = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  datasetFile: {
    file: new File(["foo"], "foo.csv", {
      type: "text/csv",
    }),
    title: "",
    description: "",
    format: "csv",
    filesize: 142045,
    filetype: "remote",
    mime: "text/csv",
    type: "main"
  }
};

export const Step3UpdateFileMetadata = {
  render: (args) => ({
    components: { UpdateFileMetadata },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <UpdateFileMetadata v-bind="args" />
                </div>`,
  }),
  args,
};
