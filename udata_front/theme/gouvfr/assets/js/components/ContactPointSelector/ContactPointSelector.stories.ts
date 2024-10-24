import type { Meta, StoryObj } from '@storybook/vue3';
import ContactPointSelector from './ContactPointSelector.vue';
import { delay, http, HttpResponse } from 'msw';

const meta = {
  title: 'Components/ContactPointSelector',
  component: ContactPointSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The ContactPoint Selector Item allows the user to select one of its contact points from the organization specified."
      }
    }
  },
} satisfies Meta<typeof ContactPointSelector>;

export default meta;

const contacts = [
  {
    email: "donnees-dila@dila.gouv.fr",
    id: "66db24fe79d274a6092717a2",
    name: "Service DILA 1"
  },
  {
    url: "https://dila.gouv.fr",
    id: "55db24fe79d274a609271xx",
    name: "Service DILA 2"
  }
];

export const ContactPointSelectorWithOrganizations: StoryObj<typeof meta> = {
  parameters: {
    msw: [
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
              url: "https://dila.gouv.fr"
            }
          ]
        })
      })
    ]
  },
  render: (args) => ({
    components: { ContactPointSelector },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <ContactPointSelector v-bind="args" />
                </div>`,
  }),
  args: {
    oid: "646b7187b50b2a93b1ae3d45",
  },
};
