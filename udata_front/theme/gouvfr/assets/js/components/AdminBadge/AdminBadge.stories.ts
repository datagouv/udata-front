import type { Meta, StoryObj } from "@storybook/vue3";
import AdminBadge from "./AdminBadge.vue";

const meta = {
  title: "Admin/AdminBadge",
  component: AdminBadge,
} satisfies Meta<typeof AdminBadge>;

export default meta;

export const DefaultBadge: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge },
    setup() {
      return { args };
    },
    template: `<AdminBadge v-bind="args">Some text</AdminBadge>`,
  }),
  args: {
    type: 'default',
  },
};

export const InfoBadge: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge },
    setup() {
      return { args };
    },
    template: `<AdminBadge v-bind="args">Some text</AdminBadge>`,
  }),
  args: {
    type: 'info',
  },
};

export const WarningBadge: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge },
    setup() {
      return { args };
    },
    template: `<AdminBadge v-bind="args">Some text</AdminBadge>`,
  }),
  args: {
    type: 'warning',
  },
};

export const ErrorBadge: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge },
    setup() {
      return { args };
    },
    template: `<AdminBadge v-bind="args">Some text</AdminBadge>`,
  }),
  args: {
    type: 'error',
  },
};

export const SuccessBadge: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminBadge },
    setup() {
      return { args };
    },
    template: `<AdminBadge v-bind="args">Some text</AdminBadge>`,
  }),
  args: {
    type: 'success',
  },
};
