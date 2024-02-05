import { Meta, StoryObj } from "@storybook/vue3";
import MenuSearch from "./MenuSearch.vue";

const meta = {
  title: 'Components/MenuSearch',
  component: MenuSearch,
} satisfies Meta<typeof MenuSearch>;

export default meta;

export const DefaultMenuSearch: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { MenuSearch },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row relative">
                  <MenuSearch v-bind="args" />
                </div>`,
  }),
  args: {},
};
