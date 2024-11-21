import type { Meta, StoryObj } from "@storybook/vue3";
import AdminReusesTable from "./AdminReusesTable.vue";
import { ReuseWithOwner } from "../../Reuse/Reuse.stories";
import type { Reuse } from "@datagouv/components/ts";
import { fn } from "@storybook/test";

const meta = {
  title: "Admin/AdminTable/AdminReusesTable",
  component: AdminReusesTable,
  args: {
    onSort: fn(),
  }
} satisfies Meta<typeof AdminReusesTable>;

export default meta;

const reuse : Reuse = {
  ...ReuseWithOwner.args.reuse as Reuse,
  created_at: new Date("2024-10-12").toDateString(),
};

export const ReusesTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminReusesTable },
    setup() {
      return { args };
    },
    template: `<AdminReusesTable v-bind="args"/>`,
  }),
  args: {
    reuses: [
      reuse,
      {
        ...reuse,
        archived: new Date().toDateString(),
      },
      {
        ...reuse,
        deleted: new Date().toDateString(),
      },
      {
        ...reuse,
        private: true,
      },
    ],
    loading: false,
    sortDirection: "desc",
    sortedBy: "created"
  },
};
