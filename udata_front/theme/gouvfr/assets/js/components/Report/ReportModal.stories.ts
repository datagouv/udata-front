import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { rest } from 'msw';
import ReportModal, { type ReportModalProps } from './ReportModal.vue';

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
        return res(ctx.delay(), ctx.json([
          {
            "label": "Explicit content",
            "value": "explicit_content"
          },
          {
            "label": "Illegal content",
            "value": "illegal_content"
          },
          {
            "label": "Others",
            "value": "others"
          },
          {
            "label": "Personal data",
            "value": "personal_data"
          },
          {
            "label": "Security",
            "value": "security"
          },
          {
            "label": "Spam",
            "value": "spam"
          }
        ]));
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
} satisfies StoryObj<typeof meta>;

