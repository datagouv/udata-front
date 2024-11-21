import { delay, http, HttpResponse } from 'msw';
import OrganizationPublishingForm from './OrganizationPublishingForm.vue';
import type { Meta, StoryObj } from "@storybook/vue3";
import { Dataset, NewDataset, Organization } from '@datagouv/components/ts';

const meta = {
  title: 'Pages/OrganizationPublishingForm/Form',
  component: OrganizationPublishingForm,
} satisfies Meta<typeof OrganizationPublishingForm>;

export default meta;

const args = {};

export const Form: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      http.post('*/api/1/organizations/', async ({ request }) => {
        const body: Organization = await request.json();
        const organization: Organization = {...body, id: "someId", last_update: new Date()};
        await delay();
        return HttpResponse.json(organization);
      }),
      http.post('*/api/1/organizations/:organizationId/logo', async () => {
        return HttpResponse.json({"image": "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png", "success": true}), {
          status: 200,
        };
      }),
    ],
  },
  render: (args) => ({
    components: { OrganizationPublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <OrganizationPublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};

export const FormWithFailedRequests: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      http.post('*/api/1/organizations/', async ({ request }) => {
        const body: NewDataset = await request.json();
        const organization: Dataset = {...body, id: "someId", last_update: new Date()};
        await delay();
        return HttpResponse.json(organization);
      }),
      http.post('*/api/1/organizations/:organizationId/upload', async () => {
        await delay();
        return HttpResponse.json({error: "Chunk size mismatch"}, {
          status: 400,
        });
      }),
    ],
  },
  render: (args) => ({
    components: { OrganizationPublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <OrganizationPublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};
