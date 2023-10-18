import UpdateFileMetadata from './Step3UpdateFileMetadata.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';


export default {
  title: 'Pages/PublishingForm/Step3UpdateFileMetadata',
  component: UpdateFileMetadata,
};

const args = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  /** @type { import("../../types").DatasetLocalFile } */
  datasetFile: {
    file: new File(["foo"], "foo.csv", {
      type: "text/csv",
    }),
    title: "foo.csv",
    description: "",
    format: "csv",
    filesize: 142045,
    filetype: "file",
    mime: "text/csv",
    type: "main"
  }
};

const remoteArgs = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  /** @type { import("../../types").DatasetRemoteFile } */
  datasetFile: {
    title: "",
    description: "",
    format: "",
    filetype: "remote",
    mime: "",
    type: "main",
    url: "http://www.example.com/someurl",
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


export const Step3UpdateRemoteFileMetadata = {
  render: (args) => ({
    components: { UpdateFileMetadata },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <UpdateFileMetadata v-bind="args" />
                </div>`,
  }),
  args: remoteArgs,
};
