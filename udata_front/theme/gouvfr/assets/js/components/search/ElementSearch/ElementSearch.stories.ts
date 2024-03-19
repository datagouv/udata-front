import { Meta, StoryObj } from "@storybook/vue3";
import ElementSearch from "./ElementSearch.vue";

const meta = {
  title: 'Components/ElementSearch',
  component: ElementSearch,
} satisfies Meta<typeof ElementSearch>;

export default meta;

export const DefaultElementSearch: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ElementSearch },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row relative">
                  <ElementSearch v-bind="args" />
                </div>`,
  }),
  args: {suggestUrl: "/organizations/suggest/"},
};
