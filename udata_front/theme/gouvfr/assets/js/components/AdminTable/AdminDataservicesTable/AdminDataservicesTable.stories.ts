import type { Meta, StoryObj } from "@storybook/vue3";
import AdminDataservicesTable from "./AdminDataservicesTable.vue";
import { SimpleDataserviceCard } from "../../../../../datagouv-components/src/components/DataserviceCard/DataserviceCard.stories";
import type { Dataservice } from "@datagouv/components/ts";
import { fn } from "@storybook/test";

const meta = {
  title: "Admin/AdminTable/AdminDataservicesTable",
  component: AdminDataservicesTable,
  args: {
    onSort: fn(),
  }
} satisfies Meta<typeof AdminDataservicesTable>;

export default meta;

export const DataservicesTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminDataservicesTable },
    setup() {
      return { args };
    },
    template: `<AdminDataservicesTable v-bind="args"/>`,
  }),
  args: {
    dataservices: [
      SimpleDataserviceCard.args.dataservice as Dataservice,
      {
        ...SimpleDataserviceCard.args.dataservice,
        archived: new Date().toDateString(),
      } as Dataservice,
      {
        ...SimpleDataserviceCard.args.dataservice,
        deleted: new Date().toDateString(),
      } as Dataservice,
      {
        ...SimpleDataserviceCard.args.dataservice,
        private: true,
      } as Dataservice,
    ],
    loading: false,
    sortDirection: "desc",
    sortedBy: "created"
  },
};
