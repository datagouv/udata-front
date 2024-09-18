import type { Meta, StoryObj } from '@storybook/vue3';
import ProducerSelector from './ProducerSelector.vue';

const meta = {
  title: 'Components/ProducerSelector',
  component: ProducerSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Producer Selector Item allows the user to select one of its organizations or himself in order to publish datasets or reuses. If the user has admin rights, he cas access all organizations."
      }
    }
  },
} satisfies Meta<typeof ProducerSelector>;

export default meta;

const user = {
  id: "someId",
  first_name: "John",
  last_name: "Doe",
  avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
  organizations: [
    {
      acronym: null,
      badges: [],
      class: "Organization",
      id: "65e9b7cf830c3b5a515ee4ed",
      logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      name: "My Organization",
      page: "",
      slug: "my-organization",
      uri: "/"
    },
    {
      acronym: null,
      badges: [],
      class: "Organization",
      id: "65e9b7cf830c3b5a515ee4ee",
      logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
      name: "My Second Organization",
      page: "",
      slug: "my-second-organization",
      uri: "/"
    }
  ],
  roles: [],
  page: ""
};

export const ProducerSelectorWithNoOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ProducerSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ProducerSelector v-bind="args" />
                </div>`,
  }),
  args: {
    user: {
      ...user,
      organizations: []
    },
  },
};

export const ProducerSelectorWithOrganizations: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ProducerSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ProducerSelector v-bind="args" />
                </div>`,
  }),
  args: {
    user: user
  },
};

export const ProducerSelectorWithAdmin: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ProducerSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ProducerSelector v-bind="args" />
                </div>`,
  }),
  args: {
    user: {
      ...user,
      roles: [...user.roles, 'admin']
    },
  },
};
