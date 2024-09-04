import type { Meta, StoryObj } from "@storybook/vue3";
import AdminLoader from "./AdminLoader.vue";

const meta = {
  title: "Admin/AdminLoader",
  component: AdminLoader,
} satisfies Meta<typeof AdminLoader>;

export default meta;

const args = {};

export const DefaultLoader: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminLoader },
    setup() {
      return { args };
    },
    template: `<div class="bg-grey-50">
                <AdminLoader v-bind="args" />
              </div>`,
  }),
  args,
};
