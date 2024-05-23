import type { Meta, StoryObj } from '@storybook/vue3';
import { rest } from 'msw';
import { user } from '../../config';
import ReusePublishingForm from './ReusePublishingForm.vue';

const meta = {
  title: 'Pages/ReusePublishingForm/Form',
  component: ReusePublishingForm,
} satisfies Meta<typeof ReusePublishingForm>;

export default meta;

const args = {
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/reuses/?q=draft",
};

export const FormWithNoOrganizations: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({first_name: "John", last_name: "Doe", avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",organizations: []})
        );
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        const body = await req.json();
        const reuse = {...body, id: "someId", last_update: new Date(), owner: user};
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({image: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png"}));
      }),
      rest.put('*/api/1/reuses/:reuseId', async (req, res, ctx) => {
        const body = await req.json();
        const reuse = {...body};
        return res(ctx.delay(), ctx.json(reuse));
      }),
    ],
  },
  render: (args) => ({
    components: { ReusePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ReusePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithOrganizations: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({first_name: "John", last_name: "Doe", avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
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
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const reuse = {...body, id: "someId", last_update: new Date(), organization: organization};
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({image: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png"}));
      }),
      rest.put('*/api/1/reuses/:reuseId', async (req, res, ctx) => {
        const body = await req.json();
        const reuse = {...body};
        return res(ctx.delay(), ctx.json(reuse));
      }),
    ],
  },
  render: (args) => ({
    components: { ReusePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ReusePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithFailedRequests: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.json({first_name: "John", last_name: "Doe", avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
          organizations: []
        }));
      }),
      rest.post('*/api/1/reuses/', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400), ctx.json({error: "An unexpected error occured. Try again later"}));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (_req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400), ctx.json({error: "Chunk size mismatch"}));
      }),
    ],
  },
  render: (args) => ({
    components: { ReusePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ReusePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};