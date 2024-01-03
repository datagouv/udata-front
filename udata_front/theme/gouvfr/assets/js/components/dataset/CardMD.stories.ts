import { CERTIFIED, PUBLIC_SERVICE } from '../../composables/useOrganizationCertified';
import type { Organization, User } from '../../types';
import CardMD, { type CardMDProps } from './CardMD.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/Dataset Card/Card Medium',
  component: CardMD,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof CardMD>;

export default meta;

const args: CardMDProps = {
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
    tags: [],
    frequency: "Unknown",
    temporal_coverage: "Test",
    frequency_date: null,
    spatial: null,
    owner: {
      id: "someUserId",
      first_name: "First",
      last_name: "Last",
    },
    title: "My new dataset",
  }
};

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1, 20);

const updateLastYear = new Date();
updateLastYear.setFullYear(updateLastYear.getFullYear() - 1);

const owner: User = {
  id: "someId",
  first_name: "Jean",
  last_name: "Dupond",
};

const ownerWithAvatar: User = {
  ...owner,
  avatar_thumbnail: "https://static.data.gouv.fr/avatars/0d/aebc1b126b410aa73701fde285dd76-100.jpg",
}

const organization: Organization = {
  name: "My Organization",
  badges: [],
  page: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/"
};

const organizationWithLogo: Organization = {
  ...organization,
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg"
};

const argsWithOwner: CardMDProps = {
  dataset: {
    ...args.dataset,
    owner,
    organization: undefined
  },
};

const argsWithOwnerWithAvatar: CardMDProps = {
  dataset: {
    ...args.dataset,
    owner: ownerWithAvatar,
    organization: undefined,
  }
};

const argsWithOrganization: CardMDProps = {
  dataset: {
    ...args.dataset,
    organization: organization,
    owner: undefined,
  }
};

const argsWithOrganizationWithLogo: CardMDProps = {
  dataset: {
    ...args.dataset,
    organization: organizationWithLogo,
    owner: undefined,
  }
};

const argsWithAcronymAndOrganizationWithLogo: CardMDProps = {
  dataset: {
    ...argsWithOrganizationWithLogo.dataset,
    acronym: "MND"
  }
};

const argsWithAcronymAndOwnerWithAvatar: CardMDProps = {
  dataset: {
    ...argsWithOwnerWithAvatar.dataset,
    acronym: "MND"
  }
};

const argsWithCertifiedOrganization: CardMDProps = {
  dataset: {
    ...argsWithAcronymAndOrganizationWithLogo.dataset,
    organization: {
      ...organizationWithLogo,
      badges: [{kind: PUBLIC_SERVICE}, {kind: CERTIFIED}]
    },
    owner: undefined
  }
};

/**
 * #### Card Medium with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardMDWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithOrganizationWithLogo,
};

/**
 * #### Card Medium with a certified organization
 * This is how a dataset owned by a certified organization is shown.
 */
export const CardMDWithCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithCertifiedOrganization,
};

/**
 * #### Card Medium with an acronym and an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardMDWithAcronymAndOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithAcronymAndOrganizationWithLogo,
};

/**
 * #### Card Medium with a description and a certified organization
 * This is how a dataset with a really long description is shown.
 */
export const CardMDWithDescriptionAndCertifiedOrganization: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithCertifiedOrganization.dataset,
    description: `Le plan cadastral est le découpage du territoire français en unités de surfaces permettant le calcul de certains impôts.

    Chaque commune est subdivisée en sections, elles-mêmes subdivisées en feuilles (ou planches).
    Une feuille cadastrale comporte des parcelles, qui peuvent supporter des bâtiments.

    Différence par rapport au PCI Vecteur
    Contrairement au Plan Cadastral Informatisé au format EDIGÉO qui est un ensemble de 600 000 feuilles cadastrales avec de nombreux éléments liés à la fiscalité ou à l'habillage du plan, cette version retravaillée par Etalab se concentre sur le découpage parcellaire et sur les bâtiments.

    Les différentes couches d'information géographique sont constituées par juxtaposition des feuilles, sans correction.`
    }
  },
};

/**
 * #### Card Medium updated last month with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardMDUpdatedLastMonthWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      last_update: updateLastMonth.toDateString(),
    }
  },
};

/**
 * #### Card Medium updated last year with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardMDUpdatedLastYearWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      last_update: updateLastYear.toDateString(),
    }
  },
};

/**
 * #### Card Medium for a private dataset with an organization logo
 * This is how a private dataset owned by an organization is shown.
 */
export const CardMDPrivateWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      private: true,
    },
  },
};

/**
 * #### Card Medium for an archived dataset with organization logo
 * This is how an archived dataset owned by an organization is shown.
 */
export const CardMDArchivedWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      archived: true,
    },
  },
};

/**
 * #### Card Medium for a private archived dataset with organization logo
 * This is how a private archived dataset owned by an organization is shown.
 */
export const CardMDPrivateArchivedWithOrganizationLogo: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOrganizationWithLogo.dataset,
      archived: true,
      private: true,
    },
  },
};

/**
 * #### Card Medium with owner avatar
 * This is how a dataset with an owner is shown.
 */
export const CardMDWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithOwnerWithAvatar,
};

/**
 * #### Card Medium with acronym and owner avatar
 * This is how a dataset with an owner is shown.
 */
export const CardMDWithAcronymAndOwnerWithAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithAcronymAndOwnerWithAvatar,
};

/**
 * #### Card Medium for a private dataset with owner avatar
 * This is how a private dataset with an owner is shown.
 */
export const CardMDPrivateWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOwnerWithAvatar.dataset,
      private: true,
    },
  },
};

/**
 * #### Card Medium for an archived dataset with owner avatar
 * This is how an archived dataset with an owner is shown.
 */
export const CardMDArchivedWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOwnerWithAvatar.dataset,
      archived: true,
    }
  },
};

/**
 * #### Card Medium for a private archived dataset with owner avatar
 * This is how a private archived dataset with an owner is shown.
 */
export const CardMDPrivateArchivedWithOwnerAvatar: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: {
    dataset: {
      ...argsWithOwnerWithAvatar.dataset,
      archived: true,
      private: true,
    },
  },
};

/**
 * #### Card Medium with organization placeholder
 * This is how a dataset owned by an organization is shown.
 */
export const CardMDWithOrganizationPlaceholder: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithOrganization,
};

/**
 * #### Card Medium with owner placeholder
 * This is how a dataset with an owner is shown. When the user doesn't have an avatar, udata computes an identicon.
 */
export const CardMDWithOwnerPlaceholder: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args: argsWithOwner,
};

/**
 * #### Card Medium with dataset placeholder
 * This is how a dataset without owner is shown.
 * It shouldn't exist based on API requirement but it's a `else` path for the card.
 */
export const CardMDWithDatasetPlaceholder: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMD },
    setup() {
      return { args };
    },
    template: '<CardMD v-bind="args"/>',
  }),
  args,
};
