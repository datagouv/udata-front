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
      ReuseWithOwner.args.reuse as Reuse,
      {
        ...ReuseWithOwner.args.reuse,
        archived: new Date().toDateString(),
      } as Reuse,
      {
        ...ReuseWithOwner.args.reuse,
        deleted: new Date().toDateString(),
      } as Reuse,
      {
        ...ReuseWithOwner.args.reuse,
        private: true,
      } as Reuse,
    ],
    loading: false,
    sortDirection: "desc",
    sortedBy: "created"
  },
};
