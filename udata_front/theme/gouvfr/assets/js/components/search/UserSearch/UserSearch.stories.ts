import { Meta, StoryObj } from "@storybook/vue3";
import UserSearch from "./UserSearch.vue";

const meta = {
  title: 'Components/UserSearch',
  component: UserSearch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The User Search component allows to search for users and provides a link to access each one of them."
      }
    }
  },
} satisfies Meta<typeof UserSearch>;

export default meta;

export const DefaultUserSearch: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { UserSearch },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row relative">
                  <UserSearch v-bind="args" />
                </div>`,
  }),
  args: {
  },
};
