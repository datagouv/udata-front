import type { Meta, StoryObj } from "@storybook/vue3";
import { vueRouter } from 'storybook-vue3-router';
import { CERTIFIED, PUBLIC_SERVICE } from "../../composables";
import type { Organization } from "../../types/organizations";
import ReuseCard, { type ReuseProps } from './ReuseCard.vue';
import TestComponent from "../DatasetCard/TestComponent.vue"

const meta = {
  title: 'Components/ReuseCard',
  component: ReuseCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The ReuseCard displays data about a reuse and allows you to go to its page as well as its owner."
      }
    }
  },
} satisfies Meta<typeof ReuseCard>;

export default meta;

const datasetRoutes = [
  {
    path: '/reuses/:id',
    component: TestComponent
  },
  {
    path: '/organizations/:id',
    component: TestComponent
  }
];

const args: ReuseProps = {
  reuse: {
    id: "someId",
    description: "Some description",
    created_at: (new Date()).toDateString(),
    last_update: (new Date()).toDateString(),
    page: "https://www.data.gouv.fr",
    deleted: false,
    private: false,
    datasets: [],
    slug: "some-slug",
    topic: "housing_and_development",
    type: "application",
    tags: [],
    owner: {
      id: "someUserId",
      first_name: "John",
      last_name: "Doedoedoedoedoe",
      page: "https://demo.data.gouv.fr/en/users/antonin-garrone/",
    },
    metrics: {
      datasets: 3,
      discussions: 7,
      followers: 12,
      views: 36
    },
    organization: null,
    title: "My new reuse reuse reuse with with with a a a very very very long long long name name name",
    image: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
    image_thumbnail: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
  },
  reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
};

const updateLessThanAMonth = new Date();
const twoDayAgoInMs = 2 * 24 * 60  * 60 * 1000;
updateLessThanAMonth.setHours(1, 0, 0, 0);
updateLessThanAMonth.setTime(updateLessThanAMonth.getTime() - twoDayAgoInMs);

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1);

const updateLastYear = new Date();
updateLastYear.setFullYear(updateLastYear.getFullYear() - 1, 2, 2);

const organization: Organization = {
  id: "someId",
  acronym: null,
  name: "My Organization",
  badges: [],
  page: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/",
  uri: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/",
  slug: "data-gouv-fr",
  logo: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg",
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
};

const organizationWithLogo: Organization = {
  ...organization,
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg"
};

const argsWithOrganizationWithLogo: ReuseProps = {
  reuse: {
    ...args.reuse,
    organization: organizationWithLogo,
    owner: null,
  },
  reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  organizationUrl: "/organizations/another-url-easier-to-distinguish",
};

const argsWithCertifiedOrganization: ReuseProps = {
  reuse: {
    ...argsWithOrganizationWithLogo.reuse,
    organization: {
      ...organizationWithLogo,
      badges: [{kind: PUBLIC_SERVICE}, {kind: CERTIFIED}]
    },
    owner: null
  },
  reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  organizationUrl: "/organizations/another-url-easier-to-distinguish",
};

export const ReuseWithOwner: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args,
};

export const ReuseWithOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: argsWithOrganizationWithLogo,
};

export const ReuseWithCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: argsWithCertifiedOrganization,
};

export const PrivateReuse: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      private: true,
    },
    reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  },
};

export const ArchivedReuse: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      archived: true,
    },
    reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  },
};

export const PrivateArchivedReuse: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      archived: true,
      private: true,
    },
    reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  },
};

export const ReuseUpdatedLessThanAMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      last_update: updateLessThanAMonth.toDateString(),
    },
    reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  },
};

export const ReuseUpdatedLastMonth: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      last_update: updateLastMonth.toDateString(),
    },
    reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  },
};

export const ReuseUpdatedLastYear: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  args: {
    reuse: {
      ...argsWithOrganizationWithLogo.reuse,
      last_update: updateLastYear.toDateString(),
    },
    reuseUrl: "/reuses/6571faa17f46a65ee05c4d17",
  },
};

export const RouterReuseWithOwner: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args,
};

export const RouterReuseWithOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args,
};

export const ReuseCardWithLongOrganizationName: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseCard },
    setup() {
      return { args };
    },
    template: `<div class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
                <div class="fr-col-6">
                  <ReuseCard class="fr-mx-1v" v-bind="args"/>
                </div>
              </div>`,
  }),
  decorators: [vueRouter(datasetRoutes)],
  args: {
    ...args,
    reuse: {...args.reuse, owner: { ...args.reuse.owner, first_name: "Really really long first name", last_name: "Really really long last name" } },
  },
};
