import type { Meta, StoryObj } from "@storybook/vue3";
import AdminBadge from "../../AdminBadge/AdminBadge.vue";
import AdminContentWithTooltip from "../../AdminContentWithTooltip/AdminContentWithTooltip.vue";
import AdminTable from "./AdminTable.vue";
import AdminTableTd from "./AdminTableTd.vue";
import AdminTableTh from "./AdminTableTh.vue";
import QualityScoreTooltip from "../../dataset/QualityScore/QualityScoreTooltip/QualityScoreTooltip.vue";
import { CardLGWithOrganizationLogo } from "../../dataset/CardLG.stories";

const meta = {
  title: "Admin/AdminTable",
  component: AdminTable,
} satisfies Meta<typeof AdminTable>;

export default meta;

export const DatasetsTable: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge, AdminContentWithTooltip, AdminTable, AdminTableTd, AdminTableTh, QualityScoreTooltip },
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
                    <Tr>
                        <AdminTableTd>
                          <AdminContentWithTooltip>
                            <a class="fr-link" href="#">
                              Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                            </a>
                          </AdminContentWithTooltip>
                        </AdminTableTd>
                        <AdminTableTd>
                        <AdminBadge type="info">Public</AdminBadge>
                        </AdminTableTd>
                        <AdminTableTd>
                          07/05/2016
                        </AdminTableTd>
                        <AdminTableTd>
                          07/05/2016
                        </AdminTableTd>
                        <AdminTableTd>
                          1
                        </AdminTableTd>
                        <AdminTableTd>
                          <QualityScoreTooltip :dataset="CardLGWithOrganizationLogo.args.dataset"/>
                        </AdminTableTd>
                        <AdminTableTd>
                          412
                        </AdminTableTd>
                        <AdminTableTd>
                          4.5k
                        </AdminTableTd>
                        <AdminTableTd>
                          2.3k
                        </AdminTableTd>
                        <AdminTableTd>
                          412
                        </AdminTableTd>
                        <AdminTableTd>
                          412
                        </AdminTableTd>
                    </Tr>
                    <Tr>
                      <AdminTableTd>
                        <AdminContentWithTooltip>
                          <a class="fr-link" href="#">
                            Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                          </a>
                        </AdminContentWithTooltip>
                      </AdminTableTd>
                      <AdminTableTd>
                        <AdminBadge>Private</AdminBadge>
                      </AdminTableTd>
                      <AdminTableTd>
                        07/05/2016
                      </AdminTableTd>
                      <AdminTableTd class="relative">
                        07/05/2016
                        <AdminContentWithTooltip class="text-default-warning">
                          <span class="fr-icon--sm fr-icon-warning-line" aria-hidden="true"></span>
                          Update required
                        </AdminContentWithTooltip>
                      </AdminTableTd>
                      <AdminTableTd>
                        0
                        <AdminContentWithTooltip class="text-default-warning">
                          <span class="fr-icon--sm fr-icon-warning-line" aria-hidden="true"></span>
                          No files
                        </AdminContentWithTooltip>
                      </AdminTableTd>
                      <AdminTableTd>
                        <QualityScoreTooltip :dataset="CardLGWithOrganizationLogo.args.dataset"/>
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                      <AdminTableTd>
                        4.5k
                      </AdminTableTd>
                      <AdminTableTd>
                        2.3k
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                    </Tr>
                    <Tr>
                      <AdminTableTd>
                        <AdminContentWithTooltip>
                          <a class="fr-link" href="#">
                            Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                          </a>
                        </AdminContentWithTooltip>
                      </AdminTableTd>
                      <AdminTableTd>
                        <AdminBadge>Private</AdminBadge>
                      </AdminTableTd>
                      <AdminTableTd>
                        07/05/2016
                      </AdminTableTd>
                      <AdminTableTd>
                        07/05/2016
                      </AdminTableTd>
                      <AdminTableTd>
                        1
                      </AdminTableTd>
                      <AdminTableTd>
                        <QualityScoreTooltip :dataset="CardLGWithOrganizationLogo.args.dataset"/>
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                      <AdminTableTd>
                        4.5k
                      </AdminTableTd>
                      <AdminTableTd>
                        2.3k
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                    </Tr>
                    <Tr>
                      <AdminTableTd>
                        <AdminContentWithTooltip>
                          <a class="fr-link" href="#">
                            Indices de position sociale dans les écoles de France métropolitaine et DROM (2016-2021)
                          </a>
                        </AdminContentWithTooltip>
                      </AdminTableTd>
                      <AdminTableTd>
                        <AdminBadge type="info">Public</AdminBadge>
                      </AdminTableTd>
                      <AdminTableTd>
                        07/05/2016
                      </AdminTableTd>
                      <AdminTableTd>
                        07/05/2016
                      </AdminTableTd>
                      <AdminTableTd>
                        0
                        <AdminContentWithTooltip class="text-default-warning">
                          <span class="fr-icon--sm fr-icon-warning-line" aria-hidden="true"></span>
                          No files
                        </AdminContentWithTooltip>
                      </AdminTableTd>
                      <AdminTableTd>
                        <QualityScoreTooltip :dataset="CardLGWithOrganizationLogo.args.dataset"/>
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                      <AdminTableTd>
                        4.5k
                      </AdminTableTd>
                      <AdminTableTd>
                        2.3k
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                      <AdminTableTd>
                        412
                      </AdminTableTd>
                    </Tr>
                  </tbody>
                </AdminTable>`,
  }),
  args: {},
};
