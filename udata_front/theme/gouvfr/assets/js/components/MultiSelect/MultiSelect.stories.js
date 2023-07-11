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
  initialOptions: Promise.resolve(["Option 1", "Option 2"]),
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
