import { withActions } from '@storybook/addon-actions/decorator';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Step1DescribeDataservice from './Step1DescribeDataservice.vue';

const meta = {
  title: 'Pages/DataservicePublishingForm/Step1',
  component: Step1DescribeDataservice,
  decorators: [withActions],
  args: {
    onNext: fn(),
  }
} satisfies Meta<typeof Step1DescribeDataservice>;

export default meta;

const myUser = {
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

const originalDataservice = {
  title: "",
  description: "",
};

const args = {
  originalDataservice,
  steps: ["Describe your dataservice", "Add datasets", "Complete your publishing"],
  errors: [],
  user: myUser
};

// Todo with no orga and failed orga

export const Step1WithOrganizations: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step1DescribeDataservice },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <div class="fr-container">
                    <Step1DescribeDataservice v-bind="args" />
                  </div>
                </div>`,
  }),
  args,
};

export const Step1WithAdmin: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Step1DescribeDataservice },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <div class="fr-container">
                    <Step1DescribeDataservice v-bind="args" />
                  </div>
                </div>`,
  }),
  args: {
    ...args,
    user: {
      ...myUser,
      roles: [...myUser?.roles, 'admin']
    }
  },
};
