import FileCard from './FileCard.vue';
import { withActions } from '@storybook/addon-actions/decorator';


export default {
  title: 'Components/FileCard',
  component: FileCard,
  parameters: {
    actions: {
      handles: [
        "click button.fr-icon-delete-line",
        "click button.fr-icon-pencil-line"
      ],
    },
  },
  decorators: [withActions],
};


const args = {
  /** @type {import("../../../types").NewDatasetFile} */
  file: {
    title: "Mon Fichier",
    type: "main",
    description: "Some really long long description to go above the one hundred characters recommanded length for a description.",
    file: new File(["foo"], "foo.csv", {
      type: "text/csv",
    }),
    filetype: "file",
    filesize: 1519129,
    format: "csv",
    mime: "",
    state: "none"
  }
};

const argsRemote = {
  /** @type {import("../../../types").NewDatasetFile} */
  file: {
    title: "Mon Fichier",
    type: "main",
    description: "Some really long long description to go above the one hundred characters recommanded length for a description.",
    url: "http://www.example.com",
    filetype: "remote",
    format: "pdf",
    mime: "",
    state: "none"
  }
};

const argsNoDesc = {
  /** @type {import("../../../types").NewDatasetFile} */
  file: {
    title: "Mon Fichier",
    type: "main",
    description: "",
    url: "http://www.example.com",
    filetype: "remote",
    format: "gz",
    mime: "",
    state: "none"
  }
};

export const SimpleFileCard = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args,
};

export const FileCardWithoutEdit = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    showEditAndWarning: false,
  },
};

export const FileCardWithoutActions = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    hideActions: true,
  },
};

export const FileCardWithoutSize = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...argsRemote,
    file: {
      ...argsRemote.file,
      format: "csv",
    }
  },
};

export const FileCardWithoutFormatAndSize = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: argsRemote,
};

export const FileCardWithSmallDescriptionWarning = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...argsNoDesc,
    file: {
      ...argsNoDesc.file,
      description: "small"
    }
  },
};

export const FileCardWithoutDescriptionWarning = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...argsNoDesc,
    description: ""
  },
};

export const FileCardWithFormatError = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...argsRemote,
    file: {
      ...argsRemote.file,
      format: ""
    }
  },
};
