import Step3AddFiles from './Step3AddFiles.vue';
import * as Stepper from '../../components/Form/Stepper/Stepper.stories';
import UploadModalButton from '../../components/Form/UploadGroup/UploadModalButton.stories';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Pages/PublishingForm/Step3',
  component: Step3AddFiles,
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
  originalFiles: [],
  errors: [],
};

const loadingArgs = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  /** @type {Array<import("../../types").NewDatasetFile>} */
  originalFiles: [
    {
      file: new File(["foo"], "foo.csv", {
        type: "text/csv",
      }),
      title: "foo.csv",
      description: "",
      format: "csv",
      filesize: 142045,
      filetype: "file",
      mime: "text/csv",
      type: "main",
      state: "loading",
    }
  ],
  loading: true,
  errors: [],
};

const fileArgs = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  /** @type {Array<import("../../types").NewDatasetFile>} */
  originalFiles: [
    {
      file: new File(["foo"], "foo.csv", {
        type: "text/csv",
      }),
      title: "foo.csv",
      description: "",
      format: "csv",
      filesize: 142045,
      filetype: "file",
      mime: "text/csv",
      type: "main",
      state: "none",
    }
  ],
  errors: []
};

const fileArgsWithError = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  /** @type {Array<import("../../types").NewDatasetFile>} */
  originalFiles: [
    {
      file: new File(["foo"], "foo.csv", {
        type: "text/csv",
      }),
      title: "foo.csv",
      description: "",
      format: "csv",
      filesize: 142045,
      filetype: "file",
      mime: "text/csv",
      type: "main",
      state: "failed",
    },
    {
      file: new File(["foo"], "foo.txt", {
        type: "text/plain",
      }),
      title: "bar.txt",
      description: "",
      format: "txt",
      filesize: 12045,
      filetype: "file",
      mime: "text/plain",
      type: "main",
      state: "loaded",
    }
  ],
  errors: ["Failed to upload file foo.csv"]
};

const fileArgsWithErrors = {
  steps: Stepper.StepperOnSecondStep.args.steps,
  /** @type {Array<import("../../types").NewDatasetFile>} */
  originalFiles: [
    {
      file: new File(["foo"], "foo.csv", {
        type: "text/csv",
      }),
      title: "foo.csv",
      description: "",
      format: "csv",
      filesize: 142045,
      filetype: "file",
      mime: "text/csv",
      type: "main",
      state: "failed",
    },
    {
      file: new File(["foo"], "foo.txt", {
        type: "text/plain",
      }),
      title: "bar.txt",
      description: "",
      format: "txt",
      filesize: 12045,
      filetype: "file",
      mime: "text/plain",
      type: "main",
      state: "failed",
    }
  ],
  errors: ["Failed to upload file foo.csv", "Failed to upload file bar.txt"]
};

export const Step3 = {
  render: (args) => ({
    components: { Step3AddFiles },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3AddFiles v-bind="args" />
                </div>`,
  }),
  args,
};

export const Step3WithFile = {
  render: (args) => ({
    components: { Step3AddFiles },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3AddFiles v-bind="args" />
                </div>`,
  }),
  args: fileArgs,
};

export const Step3Loading = {
  render: (args) => ({
    components: { Step3AddFiles },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3AddFiles v-bind="args" />
                </div>`,
  }),
  args: loadingArgs,
};


export const Step3WithError = {
  render: (args) => ({
    components: { Step3AddFiles },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3AddFiles v-bind="args" />
                </div>`,
  }),
  args: fileArgsWithError,
};

export const Step3WithErrors = {
  render: (args) => ({
    components: { Step3AddFiles },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Step3AddFiles v-bind="args" />
                </div>`,
  }),
  args: fileArgsWithErrors,
};
