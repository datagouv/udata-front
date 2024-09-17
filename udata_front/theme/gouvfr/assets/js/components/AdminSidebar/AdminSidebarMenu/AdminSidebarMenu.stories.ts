import type { Meta, StoryObj } from "@storybook/vue3";
import AdminSidebarMenu from "./AdminSidebarMenu.vue";
import type { Organization } from "@datagouv/components/ts";

const meta = {
  title: "Admin/AdminSidebarMenu",
  component: AdminSidebarMenu,
} satisfies Meta<typeof AdminSidebarMenu>;

export default meta;

const organization : Organization = {
  id: "someId",
  acronym: null,
  name: "data.gouv.fr",
  badges: [],
  page: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/",
  uri: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/",
  slug: "data-gouv-fr",
  logo: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg",
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
};

export const Opened: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarMenu },
    setup() {
      return { args };
    },
    template: `<ul class="fr-sidemenu"><AdminSidebarMenu v-bind="args"/></ul>`,
  }),
  args: {
    organization,
    isOpened: true,
  },
};

export const Closed: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminSidebarMenu },
    setup() {
      return { args };
    },
    template: `<ul class="fr-sidemenu"><AdminSidebarMenu v-bind="args"/></ul>`,
  }),
  args: {
    organization,
    isOpened: false,
  },
};
