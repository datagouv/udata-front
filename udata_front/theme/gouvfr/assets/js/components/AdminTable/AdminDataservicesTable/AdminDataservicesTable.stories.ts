import type { Meta, StoryObj } from "@storybook/vue3";
import AdminDataservicesTable from "./AdminDataservicesTable.vue";
import { CardLGArchivedWithOrganizationLogo, CardLGPrivateWithOrganizationLogo, CardLGUpdatedLastYearWithOrganizationLogo, CardLGWithDescriptionAndCertifiedOrganization } from "../../dataset/CardLG.stories";
import type { Dataservice } from "@datagouv/components/ts";

const meta = {
  title: "Admin/AdminTable/AdminDataservicesTable",
  component: AdminDataservicesTable,
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
      CardLGArchivedWithOrganizationLogo.args.dataservice as Dataservice,
      CardLGPrivateWithOrganizationLogo.args.dataservice as Dataservice,
      CardLGUpdatedLastYearWithOrganizationLogo.args.dataservice as Dataservice,
      CardLGWithDescriptionAndCertifiedOrganization.args.dataservice as Dataservice,
    ],
    loading: false,
    sortDirection: "asc",
    sortedBy: "title"
  },
};
