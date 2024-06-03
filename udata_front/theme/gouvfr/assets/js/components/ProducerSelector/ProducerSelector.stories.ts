import type { Meta, StoryObj } from '@storybook/vue3';
import ProducerSelector from './ProducerSelector.vue';
import { rest } from 'msw';


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

const args = {};

export const ProducerSelectorWithNoOrganization: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({first_name: "John", last_name: "Doe", avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png", organizations: [], roles: []}));
      }),
    ],
  },
  render: (args) => ({
    components: { ProducerSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ProducerSelector v-bind="args" />
                </div>`,
  }),
  args,
};

export const ProducerSelectorWithOrganizations: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({first_name: "John", last_name: "Doe", roles: [], avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
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
              id: "65e9b7cf830c3b5a515ee4ed",
              logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              name: "My Second Organization",
              page: "",
              slug: "my-second-organization",
              uri: "/"
            }
          ]})
        );
      }),
    ],
  },
  render: (args) => ({
    components: { ProducerSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ProducerSelector v-bind="args" />
                </div>`,
  }),
  args,
};

export const ProducerSelectorWithAdmin: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({first_name: "John", last_name: "Doe", roles: ['admin'], avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
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
              id: "65e9b7cf830c3b5a515ee4ed",
              logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              name: "My Second Organization",
              page: "",
              slug: "my-second-organization",
              uri: "/"
            }
          ]})
        );
      }),
    ],
  },
  render: (args) => ({
    components: { ProducerSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ProducerSelector v-bind="args" />
                </div>`,
  }),
  args,
};
