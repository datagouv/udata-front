import type { Meta, StoryObj } from "@storybook/vue3";
import AdminReusesTestTable from "./AdminReusesTestTable.vue";
import { ReuseWithOwner } from "../../Reuse/Reuse.stories";
import type { Reuse } from "@datagouv/components/ts";
import { fn } from "@storybook/test";

const meta = {
  title: "Admin/AdminTable/AdminReusesTestTable",
  component: AdminReusesTestTable,
  args: {
    onSort: fn(),
  }
} satisfies Meta<typeof AdminReusesTestTable>;

export default meta;

export const ReusesTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminReusesTestTable },
    setup() {
      return { args };
    },
    template: `<AdminReusesTestTable v-bind="args"/>`,
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
