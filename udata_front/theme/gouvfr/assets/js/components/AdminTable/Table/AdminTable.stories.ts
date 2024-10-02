import type { Meta, StoryObj } from "@storybook/vue3";
import AdminTable from "./AdminTable.vue";
import AdminTableTh from "./AdminTableTh.vue";

const meta = {
  title: "Admin/AdminTable",
  component: AdminTable,
} satisfies Meta<typeof AdminTable>;

export default meta;

export const LoadingTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminTable, AdminTableTh },
    setup() {
      return { args };
    },
    template: ` <AdminTable v-bind="args">
                  <thead>
                    <tr>
                        <AdminTableTh scope="col">some column</AdminTableTh>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </AdminTable>`,
  }),
  args: {
    loading: true,
  },
};
