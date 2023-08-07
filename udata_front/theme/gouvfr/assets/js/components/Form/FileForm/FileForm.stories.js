import FileForm from './FileForm.vue';

export default {
  title: 'Components/FileForm',
  component: FileForm,
};

const args = {
  /** @type {import("../../../types").DatasetFile} */
  datasetFile: {
    file: new File(["foo"], "foo.csv", {
      type: "text/csv",
    }),
    title: "Mon Fichier",
    description: "",
    format: "csv",
    filesize: 142045,
    filetype: "remote",
    mime: "text/csv",
    type: "main"
  }
};

export const SimpleFileForm = {
  render: (args) => ({
    components: { FileForm },
    setup() {
      return { args };
    },
    template: '<FileForm v-bind="args" />',
  }),
  args,
};
