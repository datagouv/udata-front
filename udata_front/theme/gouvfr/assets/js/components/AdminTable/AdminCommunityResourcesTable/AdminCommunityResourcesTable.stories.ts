import { CommunityResource, Organization } from "@datagouv/components/ts";
import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import AdminCommunityResourcesTable from "./AdminCommunityResourcesTable.vue";
import { CardLGWithCertifiedOrganization } from "../../dataset/CardLG.stories";

const meta = {
  title: "Admin/AdminTable/AdminCommunityResourcesTable",
  component: AdminCommunityResourcesTable,
  args: {
    onSort: fn(),
  }
} satisfies Meta<typeof AdminCommunityResourcesTable>;

export default meta;

const resource = {
  checksum: {type: "sha1", value: "54d0f3a4847c546c1cc4865f5ca54a1f8fc3f9af"},
  created_at: "2023-11-15T10:40:22.288000+00:00",
  description: "",
  extras: {},
  filesize: 9167,
  filetype: "file",
  format: "csv",
  harvest: null,
  id: "e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
  internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
  last_modified: "2023-11-15T10:40:22.461000+00:00",
  latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
  metrics: {views: 0},
  mime: "text/csv",
  preview_url: "",
  schema: null,
  title: "tondeuse_batterie_fr.csv",
  type: "main",
  url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv",
  owner: null,
  organization: CardLGWithCertifiedOrganization.args.dataset.organization as Organization,
  dataset: CardLGWithCertifiedOrganization.args.dataset,
  } satisfies CommunityResource;

export const CommunityResourcesTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminCommunityResourcesTable },
    setup() {
      return { args };
    },
    template: `<AdminCommunityResourcesTable v-bind="args"/>`,
  }),
  args: {
    communityResources: [
      resource,
      {
        ...resource,
        extras: {
          'check:available': true,
        },
      },
      {
        ...resource,
        extras: {
          'check:available': false,
        },
      },
      resource,
      resource,
    ],
    loading: false,
    sortDirection: "desc",
    sortedBy: "created_at_internal"
  },
};
