import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { rest } from 'msw';
import ReportModal, { type ReportModalProps } from './ReportModal.vue';
import type { NewReport, Report } from '../../api/reports';

const meta = {
  title: 'Components/Report/Internals/ReportModal',
  component: ReportModal,
  decorators: [withActions],
  argTypes: {
    onSend: { action: true },
  }
} satisfies Meta<typeof ReportModal>;

export default meta;

const args: ReportModalProps = {
  id: "someId",
};

export const SimpleReportModal = {
  parameters: {
    msw: [
      rest.get('*/api/1/reports/reasons/', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({
          "explicit_content": "Explicit content",
          "illegal_content": "Illegal content",
          "others": "Others",
          "personal_data": "Personal data",
          "security": "Security",
          "spam": "Spam"
        }));
      }),
      rest.post('*/api/1/reports/', async (req, res, ctx) => {
        const reportSent = await req.json<NewReport>();
        return res(ctx.delay(), ctx.json<Report>({
          ...reportSent,
          id: "someId",
          by: null,
          reported_at: (new Date()).toUTCString()
        }));
      }),
    ],
  },
  render: (args) => ({
    components: { ReportModal },
    setup() {
      return { args };
    },
    template: ` <ReportModal class="fr-modal--opened" v-bind="args">
                </ReportModal>`,
  }),
  args,
} satisfies  StoryObj<typeof meta>;

