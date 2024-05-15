import type { Meta, StoryObj } from "@storybook/vue3";
import AdminSidebarLink from "./AdminSidebarLink.vue";
import DatabaseIcon from 'iconoir/icons/regular/database.svg?raw';

const meta = {
  title: "Admin/AdminSidebarLink",
  component: AdminSidebarLink,
} satisfies Meta<typeof AdminSidebarLink>;

export default meta;

export const Link: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarLink },
    setup() {
      return { args };
    },
    template: `<ul><AdminSidebarLink v-bind="args"/></ul>`,
  }),
  args: {
    label: "Reuses",
    to: "something",
    icon: "fr-icon-line-chart-line",
  },
};

export const SelectedLink: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarLink },
    setup() {
      return { args };
    },
    template: `<ul><AdminSidebarLink v-bind="args"/></ul>`,
  }),
  args: {
    label: "Reuses",
    to: "",
    icon: "fr-icon-line-chart-line",
  },
};

export const LinkWithSvgIcon: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarLink },
    setup() {
      return { args };
    },
    template: `<ul><AdminSidebarLink v-bind="args"/></ul>`,
  }),
  args: {
    label: "Datasets",
    to: "something",
    iconHtml: DatabaseIcon,
  },
};
