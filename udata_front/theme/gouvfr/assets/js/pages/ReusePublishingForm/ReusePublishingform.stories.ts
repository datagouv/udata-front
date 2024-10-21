import type { Meta, StoryObj } from '@storybook/vue3';
import { delay, http, HttpResponse } from 'msw';
import { user } from '../../config';
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
      http.get('*/api/1/me', async () => {
        await delay();
        return HttpResponse.json({
          first_name: "John",
          last_name: "Doe",
          roles: [],
          avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
          organizations: [],
        })
      }),
      http.post('*/api/1/reuses/', async ({ request }) => {
        const body = await request.json();
        const reuse = {...body, id: "someId", last_update: new Date(), owner: user};
        await delay();
        return HttpResponse.json(reuse);
      }),
      http.post('*/api/1/reuses/:reuseId/image', async () => {
        await delay();
        return HttpResponse.json({image: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png", success: true});
      }),
      http.put('*/api/1/reuses/:reuseId', async ({ request }) => {
        const body = await request.json();
        const reuse = {...body};
        await delay();
        return HttpResponse.json(reuse);
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
      http.get('*/api/1/me', async () => {
        await delay();
        return HttpResponse.json({
          first_name: "John",
          last_name: "Doe",
          roles: [],
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
              uri: "/",
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
              uri: "/",
            },
          ]
        })
      }),
      http.post('*/api/1/reuses/', async ({ request }) => {
        const body = await request.json();
        const reuse = {...body, id: "someId", last_update: new Date(), owner: user};
        await delay();
        return HttpResponse.json(reuse);
      }),
      http.post('*/api/1/reuses/:reuseId/image', async () => {
        await delay();
        return HttpResponse.json({"image": "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png", "success": true});
      }),
      http.put('*/api/1/reuses/:reuseId', async ({ request }) => {
        const body = await request.json();
        const reuse = {...body};
        await delay();
        return HttpResponse.json(reuse);
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
      http.get('*/api/1/me', async () => {
        await delay();
        return HttpResponse.json({
          first_name: "John",
          last_name: "Doe",
          roles: [],
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
              uri: "/",
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
              uri: "/",
            },
          ]
        })
      }),
      http.post('*/api/1/reuses/', async ({ request }) => {
        const body = await request.json();
        const reuse = {...body, id: "someId", last_update: new Date(), owner: user};
        await delay();
        return HttpResponse.json(reuse);
      }),
      http.post('*/api/1/reuses/:reuseId/image', async () => {
        await delay();
        return HttpResponse.json({ error: "Chunk size mismatch" }, {
          status: 400,
        });
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
