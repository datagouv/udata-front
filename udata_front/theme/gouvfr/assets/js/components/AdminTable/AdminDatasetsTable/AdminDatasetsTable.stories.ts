import type { Meta, StoryObj } from "@storybook/vue3";
import AdminDatasetsTable from "./AdminDatasetsTable.vue";
import { CardLGArchivedWithOrganizationLogo, CardLGPrivateWithOrganizationLogo, CardLGUpdatedLastYearWithOrganizationLogo, CardLGWithDescriptionAndCertifiedOrganization } from "../../dataset/CardLG.stories";
import type { Dataset } from "@datagouv/components/ts";

const meta = {
  title: "Admin/AdminTable/AdminDatasetsTable",
  component: AdminDatasetsTable,
} satisfies Meta<typeof AdminDatasetsTable>;

export default meta;

export const DatasetsTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminDatasetsTable },
    setup() {
      return { args };
    },
    template: `<AdminDatasetsTable v-bind="args"/>`,
  }),
  args: {
    datasets: [
      CardLGArchivedWithOrganizationLogo.args.dataset as Dataset,
      CardLGPrivateWithOrganizationLogo.args.dataset as Dataset,
      CardLGUpdatedLastYearWithOrganizationLogo.args.dataset as Dataset,
      CardLGWithDescriptionAndCertifiedOrganization.args.dataset as Dataset,
    ],
    loading: false,
    sortDirection: "asc",
    sortedBy: "created"
  },
};
