import { Meta, StoryObj } from "@storybook/vue3";
import OrganizationSearchOption from "./OrganizationSearchOption.vue";

const meta = {
  title: 'Components/OrganizationSearch/Internals/OrganizationSearchOption',
  component: OrganizationSearchOption,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Organization Search Option component, part of the Organization Search component, is the display of one organization with its name, logo and the link to access it."
      }
    }
  },
} satisfies Meta<typeof OrganizationSearchOption>;

export default meta;

export const DefaultOrganizationSearchOption: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { OrganizationSearchOption },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row relative">
                  <OrganizationSearchOption v-bind="args" />
                </div>`,
  }),
  args: {
    name: 'Etalab',
    link: 'https://www.data.gouv.fr/fr/organizations/etalab/',
    logo: ''
  },
};
