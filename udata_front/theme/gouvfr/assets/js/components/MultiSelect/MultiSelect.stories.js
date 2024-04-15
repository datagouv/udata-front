import MultiSelect from './MultiSelect.vue';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
};

const args = {
  placeholder: "Complex select",
  searchPlaceholder: "Type to search",
  emptyPlaceholder: "Select an option",
  allOption: "Select something",
  initialOptions: Promise.resolve([
    {
      label: "Option 1",
      value: "Option 1",
    },
    {
      label: "Option 2",
      value: "Option 2",
    },
  ]),
  values: null,
};

const argsWithExtraDatas = {
  placeholder: "Complex select with extra datas",
  searchPlaceholder: "Type to search",
  emptyPlaceholder: "Select an option",
  allOption: "Select something",
  initialOptions: Promise.resolve([
    {
      label: "Option 1",
      value: "Option 1",
      helper: "Insee: 53350",
      description: "French region"
    },
    {
      label: "Option 2",
      value: "Option 2",
      helper: "Insee: 12005",
      description: "French department"
    },
  ]),
  values: null,
};

export const SimpleMultiSelect = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args,
};


export const SimpleMultiSelectWithSuggest = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...args,
    initialOptions: null,
    allOption: null,
    suggestUrl: "datasets/suggest/mime/",
  },
};

export const SimpleMultiSelectWithAddNewOption = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...args,
    initialOptions: null,
    allOption: null,
    suggestUrl: "datasets/suggest/mime/",
    addNewOption: true,
  },
};

export const SimpleMultiSelectWithoutAllOption = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...args,
    allOption: "",
  },
};

export const SimpleMultiSelectWithAllOptionNotAdded = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...args,
    addAllOption: false,
  },
};

export const BlueMultiSelect = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...args,
    isBlue: true,
  },
};

export const MultipleMultiSelect = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...args,
    multiple: true,
    values: [],
    addAllOption: false,
  },
};

export const SimpleMultiSelectWithHelperAndDescription = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      return { args };
    },
    template: '<MultiSelect v-bind="args"/>',
  }),
  args: {
    ...argsWithExtraDatas,
  },
};
