import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { delay, http, HttpResponse } from 'msw';
import ReportModalButton from './ReportModalButton.vue';
import type { NewReport, Report } from '../../api/reports';

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
  parameters: {
    msw: [
      http.get('*/api/1/reports/reasons/', async () => {
        await delay();
        return HttpResponse.json({
          "explicit_content": "Explicit content",
          "illegal_content": "Illegal content",
          "others": "Others",
          "personal_data": "Personal data",
          "security": "Security",
          "spam": "Spam"
        });
      }),
      http.post('*/api/1/reports/', async ({ request }) => {
        await delay();
        const reportSent = await request.json() as NewReport;
        return HttpResponse.json<Report>({
          ...reportSent,
          id: "someId",
          by: null,
          reported_at: (new Date()).toUTCString()
        });
      }),
    ],
  },
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

