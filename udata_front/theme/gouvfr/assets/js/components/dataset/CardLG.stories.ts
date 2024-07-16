import { CERTIFIED, PUBLIC_SERVICE, type Dataset, type Organization, type User } from '@etalab/data.gouv.fr-components';
import CardLG from './card-lg.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Components/Dataset Card/Card Large',
  component: CardLG,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof CardLG>;

export default meta;

type CardLGProps = {
  readonly dataset: Dataset,
  showMetrics?: boolean | undefined,
  style?: Record<string, any> | undefined,
};

const owner: User = {
  id: "someId",
  first_name: "Jean",
  last_name: "Dupond",
  page: "http://www.data.gouv.fr",
};

const args: CardLGProps = {
  dataset: {
    id: "someId",
    acronym: "",
    archived: false,
    description: "Some description",
    last_update: (new Date()).toDateString(),
    license: "lov2",
    page: "https://www.data.gouv.fr",
    private: false,
    quality: {
      all_resources_available: true,
      dataset_description_quality: true,
      has_open_format: true,
      has_resources: true,
      license: true,
      resources_documentation: true,
      score: 1,
      spatial: true,
      temporal_coverage: true,
      update_frequency: true,
      update_fulfilled_in_time: true,
    },
    title: "My new dataset",
    resources: [],
    community_resources: [],
    created_at: "2014-12-12T12:01:06.889000+00:0",
    last_modified: "2020-11-03T09:16:55.837000+00:00",
    uri: "https://www.data.gouv.fr",
    slug: "data-gouv-fr",
    tags: [],
    frequency: "Unknown",
    temporal_coverage: "Test",
    frequency_date: null,
    spatial: null,
    organization: null,
    owner,
    metrics: {
      discussions: 20,
      reuses: 100,
      followers: 500,
      views: 50000
    },
    extras: {},
    harvest: {},
    badges: [],
  },
  showMetrics: true,
};

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1, updateLastMonth.getDate());

const updateLastYear = new Date();
updateLastYear.setFullYear(updateLastYear.getFullYear() - 1, 0, 1);

const ownerWithAvatar: User = {
  ...owner,
  avatar_thumbnail: "https://static.data.gouv.fr/avatars/0d/aebc1b126b410aa73701fde285dd76-100.jpg"
};

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

const argsWithOwnerWithAvatar: CardLGProps = {
  ...args,
  dataset: {
    ...args.dataset,
    owner: ownerWithAvatar,
    organization: null,
  },
};

const argsWithOrganization: CardLGProps = {
  ...args,
  dataset: {
    ...args.dataset,
    organization: organization,
    owner: null,
  },
};

const argsWithOrganizationWithLogo: CardLGProps = {
  ...args,
  dataset: {
    ...args.dataset,
    organization: organizationWithLogo,
    owner: null,
  },
};

const argsWithAcronymAndOrganizationWithLogo: CardLGProps = {
  ...args,
  dataset: {
  ...argsWithOrganizationWithLogo.dataset,
  acronym: "MND",
  },
};

const argsWithAcronymAndOwnerWithAvatar: CardLGProps = {
  ...args,
  dataset: {
    ...argsWithOwnerWithAvatar.dataset,
    acronym: "MND",
  },
};

const argsWithCertifiedOrganization: CardLGProps = {
  ...args,
  dataset: {
    ...argsWithAcronymAndOrganizationWithLogo.dataset,
    organization: {
      ...organizationWithLogo,
      badges: [{kind: PUBLIC_SERVICE}, {kind: CERTIFIED}]
    },
    owner: null,
  }
};

/**
 * #### Card Large with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithOrganizationWithLogo,
};

/**
 * #### Card Large with a certified organization
 * This is how a dataset owned by a certified organization is shown.
 */
export const CardLGWithCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithCertifiedOrganization,
};

/**
 * #### Card Large with an acronym and an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGWithAcronymAndOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithAcronymAndOrganizationWithLogo,
};

/**
 * #### Card Large with a description and a certified organization
 * This is how a dataset with a really long description is shown.
 */
export const CardLGWithDescriptionAndCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithCertifiedOrganization,
    dataset: {
      ...argsWithCertifiedOrganization.dataset,
      description: `Le plan cadastral est le découpage du territoire français en unités de surfaces permettant le calcul de certains impôts.

        Chaque commune est subdivisée en sections, elles-mêmes subdivisées en feuilles (ou planches).
        Une feuille cadastrale comporte des parcelles, qui peuvent supporter des bâtiments.

        Différence par rapport au PCI Vecteur
        Contrairement au Plan Cadastral Informatisé au format EDIGÉO qui est un ensemble de 600 000 feuilles cadastrales avec de nombreux éléments liés à la fiscalité ou à l'habillage du plan, cette version retravaillée par Etalab se concentre sur le découpage parcellaire et sur les bâtiments.

        Les différentes couches d'information géographique sont constituées par juxtaposition des feuilles, sans correction.`
      },
    }
};

/**
 * #### Card Large updated last month with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGUpdatedLastMonthWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      last_update: updateLastMonth.toISOString()
    }
  },
};

/**
 * #### Card Large updated last year with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGUpdatedLastYearWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      last_update: updateLastYear.toISOString()
    }
  },
};

/**
 * #### Card Large without metrics with an organization logo
 * This is how a dataset without metrics is shown.
 */
export const CardLGWithoutMetricsWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithAcronymAndOrganizationWithLogo,
    showMetrics: false,
  },
};

/**
 * #### Card Large for a private dataset with an organization logo
 * This is how a private dataset owned by an organization is shown.
 */
export const CardLGPrivateWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      private: true,
    },
  },
};

/**
 * #### Card Large for an archived dataset with organization logo
 * This is how an archived dataset owned by an organization is shown.
 */
export const CardLGArchivedWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      archived: true,
    },
  },
};

/**
 * #### Card Large for a private archived dataset with organization logo
 * This is how a private archived dataset owned by an organization is shown.
 */
export const CardLGPrivateArchivedWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      archived: true,
      private: true,
    },
  },
};

/**
 * #### Card Large with owner avatar
 * This is how a dataset with an owner is shown.
 */
export const CardLGWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithOwnerWithAvatar,
};

/**
 * #### Card Large with acronym and owner avatar
 * This is how a dataset with an owner is shown.
 */
export const CardLGWithAcronymAndOwnerWithAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithAcronymAndOwnerWithAvatar,
};

/**
 * #### Card Large for a private dataset with owner avatar
 * This is how a private dataset with an owner is shown.
 */
export const CardLGPrivateWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOwnerWithAvatar,
    dataset: {
      ...argsWithOwnerWithAvatar.dataset,
      private: true,
    }
  },
};

/**
 * #### Card Large for an archived dataset with owner avatar
 * This is how an archived dataset with an owner is shown.
 */
export const CardLGArchivedWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOwnerWithAvatar,
    dataset: {
      ...argsWithOwnerWithAvatar.dataset,
      archived: true,
    }
  },
};

/**
 * #### Card Large for a private archived dataset with owner avatar
 * This is how a private archived dataset with an owner is shown.
 */
export const CardLGPrivateArchivedWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOwnerWithAvatar,
    dataset: {
      ...argsWithOwnerWithAvatar.dataset,
      archived: true,
      private: true,
    }
  },
};

/**
 * #### Card Large with organization placeholder
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGWithOrganizationPlaceholder: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithOrganization,
};

/**
 * #### Card Large with owner placeholder
 * This is how a dataset with an owner is shown. When the user doesn't have an avatar, udata computes an identicon.
 */
export const CardLGWithOwnerPlaceholder: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args,
};

/**
 * #### Card Large with dataset placeholder
 * This is how a dataset without owner is shown.
 * It shouldn't exist based on API requirement but it's a `else` path for the card.
 */
export const CardLGWithDatasetPlaceholder: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...args,
    // @ts-ignore
    dataset: {
      ...args.dataset,
      owner: null,
      organization: null,
    }
  },
};
