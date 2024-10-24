import type { Meta, StoryObj } from '@storybook/vue3';
import { delay, http, HttpResponse } from 'msw';
import { user } from '../../config';
import DataservicePublishingForm from './DataservicePublishingForm.vue';
import { ContactPoint } from '../../types';

const meta = {
  title: 'Pages/DataservicePublishingForm/Form',
  component: DataservicePublishingForm,
} satisfies Meta<typeof DataservicePublishingForm>;

export default meta;

const args = {};

//TODO stories with no orga and failed orga

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
      http.post('*/api/1/dataservices/', async ({ request }) => {
        const body = await request.json();
        const dataservice = {
          ...body,
          id: "someId",
          metadata_modified_at: new Date(),
          owner: user,
          organization: {
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
        };
        await delay();
        return HttpResponse.json(dataservice);
      }),
      http.patch('*/api/1/dataservices/:dataserviceId', async ({ request }) => {
        const body = await request.json();
        const dataservice = {...body};
        await delay();
        return HttpResponse.json(dataservice);
      }),
      http.get('*/organizations/*/contacts', async () => {
        await delay();
        return HttpResponse.json({ 
          data: [
            { 
              name:"Service DILA 1",
              id: "66db24fe79d274a6092717xx",
              email: "donnees-dila@dila.gouv.fr"
            },
            { 
              name:"Service DILA 2",
              id: "66db24fe79d274a6092717a2",
              contact_form: "https://dila.gouv.fr"
            }
          ]
        })
      }),
      http.post('*/contacts', async ({}) => {
        const contact: ContactPoint = { id: "someId", name: "test", email: "test@test.com" };
        await delay();
        return HttpResponse.json(contact);
      }),
    ],
  },
  render: (args) => ({
    components: { DataservicePublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <DataservicePublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};
