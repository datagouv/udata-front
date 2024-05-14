import { Meta, StoryObj } from "@storybook/vue3";
import OrganizationSearch from "./OrganizationSearch.vue";

const meta = {
  title: 'Components/OrganizationSearch',
  component: OrganizationSearch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Organization Search component allows to search for organizations and provides a link to access each one of them."
      }
    }
  },
} satisfies Meta<typeof OrganizationSearch>;

export default meta;

export const DefaultOrganizationSearch: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationSearch },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row relative">
                  <OrganizationSearch v-bind="args" />
                </div>`,
  }),
  args: {},
};
