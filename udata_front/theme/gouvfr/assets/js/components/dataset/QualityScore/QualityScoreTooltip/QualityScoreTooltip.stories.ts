import type { Meta, StoryObj } from "@storybook/vue3";
import QualityScoreTooltip from "./QualityScoreTooltip.vue";
import { CardLGWithOrganizationLogo } from "../../CardLG.stories";
import type { Dataset } from "@etalab/data.gouv.fr-components";

const meta = {
  title: "Components/QualityScore/QualityScoreTooltip",
  component: QualityScoreTooltip,
} satisfies Meta<typeof QualityScoreTooltip>;

export default meta;

const dataset = CardLGWithOrganizationLogo.args.dataset;

export const Tooltip: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityScoreTooltip },
    setup() {
      return { args };
    },
    template: `<QualityScoreTooltip v-bind="args"/>`,
  }),
  args: {
    dataset: dataset as Dataset,
  },
};
