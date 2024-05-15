import type { Meta, StoryObj } from "@storybook/vue3";
import AdminDangerZone from "./AdminDangerZone.vue";

const meta = {
  title: "Admin/AdminDangerZone",
  component: AdminDangerZone,
} satisfies Meta<typeof AdminDangerZone>;

export default meta;

export const Example: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminDangerZone },
    setup() {
      return { args };
    },
    template: ` <AdminDangerZone v-bind="args">
                  <div class="fr-col">
                    <p class="fr-m-0 text-grey-500">Remove member from the organization</p>
                    <p class="fr-m-0 fr-text--xs text-default-error">Be careful, this action can't be reverse.</p>
                  </div>
                  <div class="fr-col-auto">
                    <button class="fr-btn fr-btn--secondary fr-btn--secondary--error fr-btn--icon-left fr-icon-logout-box-r-line">
                      Remove member
                    </button>
                  </div>
                </AdminDangerZone>`,
  }),
  args: {},
};
