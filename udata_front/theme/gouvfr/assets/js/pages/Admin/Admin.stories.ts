import Admin from './Admin.vue';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Pages/Admin',
  component: Admin,
  parameters: {
    flex: true,
    flexDirection: 'column',
  },
} satisfies Meta<typeof Admin>;

export default meta;

const args = {
};

export const HomeAdmin: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Admin },
    setup() {
      return { args };
    },
    template: `<div class="bg-grey-50">
                <Admin v-bind="args" />
              </div>`,
  }),
  args,
};
