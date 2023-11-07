import SchemaSelect from './SchemaSelect.vue';

export default {
  title: 'Components/SchemaSelect',
  component: SchemaSelect,
};

const args = {
  values: ""
};

export const SimpleSchemaSelect = {
  render: (args) => ({
    components: { SchemaSelect },
    setup() {
      return { args };
    },
    template: '<SchemaSelect v-bind="args" />',
  }),
  args,
};

export const SchemaSelectWithoutExplanation = {
  render: (args) => ({
    components: { SchemaSelect },
    setup() {
      return { args };
    },
    template: '<SchemaSelect v-bind="args" />',
  }),
  args: {
    ...args,
    showExplanation: false,
  },
};

export const SchemaSelectWithAllOption = {
  render: (args) => ({
    components: { SchemaSelect },
    setup() {
      return { args };
    },
    template: '<SchemaSelect v-bind="args" />',
  }),
  args: {
    ...args,
    allOption: "Select a schema",
  },
};

export const SchemaSelectWithoutExplanationWithAllOption = {
  render: (args) => ({
    components: { SchemaSelect },
    setup() {
      return { args };
    },
    template: '<SchemaSelect v-bind="args" />',
  }),
  args: {
    ...args,
    showExplanation: false,
    allOption: "Select a schema",
  },
};

export const BlueSchemaSelect = {
  render: (args) => ({
    components: { SchemaSelect },
    setup() {
      return { args };
    },
    template: '<SchemaSelect v-bind="args" />',
  }),
  args: {
    ...args,
    isBlue: true,
  },
};
