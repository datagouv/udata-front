import { rest } from 'msw';
import { user } from '../../config';
import ReusePublishingForm from './ReusePublishingForm.vue';

export default {
  title: 'Pages/ReusePublishingForm/Form',
  component: ReusePublishingForm,
};

const organization = {
  acronym: null,
  badges: [],
  class: "Organization",
  id: "65e9b7cf830c3b5a515ee4ed",
  logo: "https://picsum.photos/200",
  logo_thumbnail: "https://picsum.photos/200",
  name: "My Organization",
  page: "",
  slug: "my-organization",
  uri: "/"
};

const args = {
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
};

export const FormWithNoOrganizations = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: []}));
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const reuse = {...body, id: "someId", last_update: new Date(), owner: user};
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({image: "https://picsum.photos/200"}));
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

export const FormWithOrganizations = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: [
          organization
        ]}));
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        /** @type {import("../../types").NewDataset} */
        const body = await req.json();
        /** @type {import("../../types").Dataset} */
        const reuse = {...body, id: "someId", last_update: new Date(), organization: organization};
        console.log(reuse)
        return res(ctx.delay(), ctx.json(reuse));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({image: "https://picsum.photos/200"}));
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

export const FormWithFailedRequests = {
  parameters: {
    msw: [
      rest.get('*/api/1/me', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({organizations: []}));
      }),
      rest.post('*/api/1/reuses/', async (req, res, ctx) => {
        return res(ctx.delay(), ctx.status(400), ctx.json({error: "An unexpected error occured. Try again later"}));
      }),
      rest.post('*/api/1/reuses/:reuseId/image', async (req, res, ctx) => {
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
