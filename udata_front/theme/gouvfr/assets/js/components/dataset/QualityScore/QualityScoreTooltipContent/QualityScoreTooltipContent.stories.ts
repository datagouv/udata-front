import type { Meta, StoryObj } from "@storybook/vue3";
import QualityScoreTooltipContent from "./QualityScoreTooltipContent.vue";
import { CardLGWithOrganizationLogo } from "../../CardLG.stories";
import type { Dataset } from "@etalab/data.gouv.fr-components";

const meta = {
  title: "Components/QualityScore/Internals/QualityScoreTooltipContent",
  component: QualityScoreTooltipContent,
} satisfies Meta<typeof QualityScoreTooltipContent>;

export default meta;

const dataset = CardLGWithOrganizationLogo.args.dataset;

export const Content: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { QualityScoreTooltipContent },
    setup() {
      return { args };
    },
    template: `<QualityScoreTooltipContent v-bind="args"/>`,
  }),
  args: {
    dataset: dataset as Dataset,
  },
};
