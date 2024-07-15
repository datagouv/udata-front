import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import { delay, http, HttpResponse } from 'msw';
import ReportModal, { type ReportModalProps } from './ReportModal.vue';

const meta = {
  title: 'Components/Report/Internals/ReportModal',
  component: ReportModal,
  decorators: [withActions],
  argTypes: {
    onSend: { action: true },
  },
  parameters: {
    msw: [
      http.get('*/api/1/reports/reasons/', async () => {
        await delay();
        return HttpResponse.json([
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
        ]);
      }),
    ],
  },
} satisfies Meta<typeof ReportModal>;

export default meta;

const args: ReportModalProps = {
  id: "someId",
  loading: false,
  succeeded: false,
};

export const SimpleReportModal = {
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

export const LoadingReportModal = {
  render: (args) => ({
    components: { ReportModal },
    setup() {
      return { args };
    },
    template: ` <ReportModal class="fr-modal--opened" v-bind="args">
                </ReportModal>`,
  }),
  args: {
    ...args,
    loading: true,
  },
} satisfies StoryObj<typeof meta>;

export const SuceeddeedReportModal = {
  render: (args) => ({
    components: { ReportModal },
    setup() {
      return { args };
    },
    template: ` <ReportModal class="fr-modal--opened" v-bind="args">
                </ReportModal>`,
  }),
  args: {
    ...args,
    succeeded: true,
  },
} satisfies StoryObj<typeof meta>;

