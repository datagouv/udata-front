import MenuSearch from "./MenuSearch.vue";

export default {
  title: 'Components/MenuSearch',
  component: MenuSearch,
};

export const DefaultMenuSearch = {
  render: (args) => ({
    components: { MenuSearch },
    setup() {
      return { args };
    },
    template: ` <MenuSearch v-bind="args" />`,
  }),
  args: {},
};
