import type { Meta, StoryObj } from "@storybook/vue3";
import AdminSidebarOrganizationMenu from "./AdminSidebarOrganizationMenu.vue";

const meta = {
  title: "Admin/AdminSidebarOrganizationMenu",
  component: AdminSidebarOrganizationMenu,
} satisfies Meta<typeof AdminSidebarOrganizationMenu>;

export default meta;

export const Opened: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarOrganizationMenu },
    setup() {
      return { args };
    },
    template: `<ul class="fr-sidemenu"><AdminSidebarOrganizationMenu v-bind="args"/></ul>`,
  }),
  args: {
    name: "data.gouv.fr",
    isOpened: true,
  },
};

export const Closed: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarOrganizationMenu },
    setup() {
      return { args };
    },
    template: `<ul class="fr-sidemenu"><AdminSidebarOrganizationMenu v-bind="args"/></ul>`,
  }),
  args: {
    name: "data.gouv.fr",
    isOpened: false,
  },
};
