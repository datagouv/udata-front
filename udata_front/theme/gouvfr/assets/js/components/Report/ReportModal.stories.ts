import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import ReportModal, { type ReportModalProps } from './ReportModal.vue';

const meta = {
  title: 'Components/Report/Internals/ReportModal',
  component: ReportModal,
  decorators: [withActions],
  argTypes: {
    onSend: { action: true },
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

