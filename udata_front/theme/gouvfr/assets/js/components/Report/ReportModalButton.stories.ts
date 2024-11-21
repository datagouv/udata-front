import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import ReportModalButton from './ReportModalButton.vue';

const meta = {
  title: 'Components/Report/Internals/ReportModalButton',
  component: ReportModalButton,
  decorators: [withActions],
  argTypes: {
    onSend: { action: true },
  }
} satisfies Meta<typeof ReportModalButton>;

export default meta;

export const SimpleReportModalButton = {
  render: (args) => ({
    components: { ReportModalButton },
    setup() {
      return { args };
    },
    template: ` <ReportModalButton v-bind="args">
                </ReportModalButton>`,
  }),
  args: {
    objectId: "someId",
    objectType: "Dataset",
  },
} satisfies StoryObj<typeof meta>;

