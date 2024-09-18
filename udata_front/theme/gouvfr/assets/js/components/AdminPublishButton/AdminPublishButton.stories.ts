import type { Meta, StoryObj } from "@storybook/vue3";
import AdminPublishButton from "./AdminPublishButton.vue";

const meta = {
  title: "Admin/AdminPublishButton",
  component: AdminPublishButton,
} satisfies Meta<typeof AdminPublishButton>;

export default meta;

const args = {};

export const PublishButton: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminPublishButton },
    setup() {
      return { args };
    },
    template: `<div class="bg-grey-50">
                <AdminPublishButton v-bind="args" />
              </div>`,
  }),
  args,
};
