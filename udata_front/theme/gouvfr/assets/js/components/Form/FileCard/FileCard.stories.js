import FileCard from './FileCard.vue';

export default {
  title: 'Components/FileCard',
  component: FileCard,
};

const args = {
  title: "Mon Fichier",
  filename: "monfichier.csv",
  lastModified: 1519129853500,
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
    allowEdit: false,
  },
};

export const FileCardWithFormat = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    format: "csv",
  },
};

export const FileCardWithFormatAndSize = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    filesize: "142045",
    format: "csv",
  },
};

export const WarningFileCard = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    missingMetadata: true
  },
};

export const WarningFileCardWithFormat = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    format: "csv",
    missingMetadata: true
  },
};



export const WarningFileCardWithFormatAndSize = {
  render: (args) => ({
    components: { FileCard },
    setup() {
      return { args };
    },
    template: '<FileCard v-bind="args" />',
  }),
  args: {
    ...args,
    filesize: "142045",
    format: "csv",
    missingMetadata: true
  },
};
