import { QualityScore } from "@datagouv/components/ts";
import type { Meta, StoryObj } from "@storybook/vue3";
import AdminBadge from "../../AdminBadge/AdminBadge.vue";
import AdminContentWithTooltip from "../../AdminContentWithTooltip/AdminContentWithTooltip.vue";
import QualityScoreTooltipContent from "../../dataset/QualityScore/QualityScoreTooltipContent/QualityScoreTooltipContent.vue";
import Tooltip from '../../Tooltip/Tooltip.vue';
import AdminTable from "./AdminTable.vue";
import AdminTableTh from "./AdminTableTh.vue";
import { CardLGWithOrganizationLogo } from "../../dataset/CardLG.stories";

const meta = {
  title: "Admin/AdminTable",
  component: AdminTable,
} satisfies Meta<typeof AdminTable>;

export default meta;

export const DatasetsTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge, AdminContentWithTooltip, AdminTable, AdminTableTh, QualityScore, QualityScoreTooltipContent, Tooltip },
    setup() {
      return { args, CardLGWithOrganizationLogo };
    },
    template: ` <AdminTable>
                  <thead>
                    <tr>
                        <AdminTableTh :sortable="true" scope="col">title of the dataset</AdminTableTh>
                        <AdminTableTh scope="col">status</AdminTableTh>
                        <AdminTableTh :sortable="true" sorted="asc" scope="col">created at</AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">updated at</AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">files</AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">score</AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">
                          <span class="fr-icon--sm fr-icon-chat-3-line" aria-hidden="true"></span>
                        </AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">
                          <span class="fr-icon--sm fr-icon-eye-line" aria-hidden="true"></span>
                        </AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">
                          <span class="fr-icon--sm fr-icon-download-line" aria-hidden="true"></span>
                        </AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">
                          <span class="fr-icon--sm fr-icon-line-chart-line" aria-hidden="true"></span>
                        </AdminTableTh>
                        <AdminTableTh :sortable="true" scope="col">
                          <span class="fr-icon--sm fr-icon-star-s-line" aria-hidden="true"></span>
                        </AdminTableTh>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>
                          <AdminContentWithTooltip>
                            <a class="fr-link" href="#">
                              Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                            </a>
                          </AdminContentWithTooltip>
                        </td>
                        <Td>
                        <AdminBadge type="info">Public</AdminBadge>
                        </Td>
                        <Td>
                          07/05/2016
                        </Td>
                        <Td>
                          07/05/2016
                        </Td>
                        <Td>
                          1
                        </Td>
                        <Td>
                          <Tooltip>
                            <QualityScore :score="CardLGWithOrganizationLogo.args.dataset.quality.score" />
                            <template #tooltip>
                              <QualityScoreTooltipContent :dataset="CardLGWithOrganizationLogo.args.dataset" />
                            </template>
                          </Tooltip>
                        </Td>
                        <Td>
                          412
                        </Td>
                        <Td>
                          4.5k
                        </Td>
                        <Td>
                          2.3k
                        </Td>
                        <Td>
                          412
                        </Td>
                        <Td>
                          412
                        </Td>
                   </tr>
                    <tr>
                      <Td>
                        <AdminContentWithTooltip>
                          <a class="fr-link" href="#">
                            Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                          </a>
                        </AdminContentWithTooltip>
                      </Td>
                      <Td>
                        <AdminBadge>Private</AdminBadge>
                      </Td>
                      <Td>
                        07/05/2016
                      </Td>
                      <Td class="relative">
                        07/05/2016
                        <AdminContentWithTooltip class="text-default-warning">
                          <span class="fr-icon--sm fr-icon-warning-line" aria-hidden="true"></span>
                          Update required
                        </AdminContentWithTooltip>
                      </Td>
                      <Td>
                        0
                        <AdminContentWithTooltip class="text-default-warning">
                          <span class="fr-icon--sm fr-icon-warning-line" aria-hidden="true"></span>
                          No files
                        </AdminContentWithTooltip>
                      </Td>
                      <Td>
                        <Tooltip>
                          <QualityScore :score="CardLGWithOrganizationLogo.args.dataset.quality.score" />
                          <template #tooltip>
                            <QualityScoreTooltipContent :dataset="CardLGWithOrganizationLogo.args.dataset" />
                          </template>
                          </Tooltip>
                      </Td>
                      <Td>
                        412
                      </Td>
                      <Td>
                        4.5k
                      </Td>
                      <Td>
                        2.3k
                      </Td>
                      <Td>
                        412
                      </Td>
                      <Td>
                        412
                      </Td>
                    </tr>
                    <tr>
                      <Td>
                        <AdminContentWithTooltip>
                          <a class="fr-link" href="#">
                            Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                          </a>
                        </AdminContentWithTooltip>
                      </Td>
                      <Td>
                        <AdminBadge>Private</AdminBadge>
                      </Td>
                      <Td>
                        07/05/2016
                      </Td>
                      <Td>
                        07/05/2016
                      </Td>
                      <Td>
                        1
                      </Td>
                      <Td>
                        <Tooltip>
                          <QualityScore :score="CardLGWithOrganizationLogo.args.dataset.quality.score" />
                          <template #tooltip>
                            <QualityScoreTooltipContent :dataset="CardLGWithOrganizationLogo.args.dataset" />
                          </template>
                        </Tooltip>
                      </Td>
                      <Td>
                        412
                      </Td>
                      <Td>
                        4.5k
                      </Td>
                      <Td>
                        2.3k
                      </Td>
                      <Td>
                        412
                      </Td>
                      <Td>
                        412
                      </Td>
                    </tr>
                    <tr>
                      <Td>
                        <AdminContentWithTooltip>
                          <a class="fr-link" href="#">
                            Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                          </a>
                        </AdminContentWithTooltip>
                      </Td>
                      <Td>
                        <AdminBadge type="info">Public</AdminBadge>
                      </Td>
                      <Td>
                        07/05/2016
                      </Td>
                      <Td>
                        07/05/2016
                      </Td>
                      <Td>
                        0
                        <AdminContentWithTooltip class="text-default-warning">
                          <span class="fr-icon--sm fr-icon-warning-line" aria-hidden="true"></span>
                          No files
                        </AdminContentWithTooltip>
                      </Td>
                      <Td>
                        <Tooltip>
                          <QualityScore :score="CardLGWithOrganizationLogo.args.dataset.quality.score" />
                          <template #tooltip>
                            <QualityScoreTooltipContent :dataset="CardLGWithOrganizationLogo.args.dataset" />
                          </template>
                        </Tooltip>
                      </Td>
                      <Td>
                        412
                      </Td>
                      <Td>
                        4.5k
                      </Td>
                      <Td>
                        2.3k
                      </Td>
                      <Td>
                        412
                      </Td>
                      <Td>
                        412
                      </Td>
                    </tr>
                  </tbody>
                </AdminTable>`,
  }),
  args: {},
};
