import { CERTIFIED, PUBLIC_SERVICE } from '../../composables/useOrganizationCertified';
import CardLG from './card-lg.vue';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/Dataset Card/Card Large',
  component: CardLG,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
};
/**
 * @typedef {{
 *  [Property in keyof import("../../types").Dataset
 *    as Extract<Property, "acronym" | "archived" | "description" | "last_update" | "license" | "page" | "private" | "quality" | "title" | "owner" | "organization">
 *  ]: import("../../types").Dataset[Property]
 * } & {metrics?: Object, showMetrics: Boolean, style?: Object}} CardLGProps
 */

/** @type {CardLGProps} */
const args = {
  acronym: "",
  archived: false,
  description: "Some description",
  last_update: new Date(),
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
  showMetrics: true,
  metrics: {
    reuses: 100,
    favorites: 500
  }
};

const updateLastMonth = new Date();
updateLastMonth.setMonth(updateLastMonth.getMonth() - 1, 20);

const updateLastYear = new Date();
updateLastYear.setFullYear(updateLastYear.getFullYear() - 1);

/** @type {import('../../types').User} */
const owner = {
  first_name: "Jean",
  last_name: "Dupond",
};

/** @type {import('../../types').User} */
const ownerWithAvatar = {
  ...owner,
  avatar_thumbnail: "https://static.data.gouv.fr/avatars/0d/aebc1b126b410aa73701fde285dd76-100.jpg"
}

/** @type {import('../../types').Organization} */
const organization = {
  name: "My Organization",
  badges: [],
  page: "https://www.data.gouv.fr/fr/organizations/data-gouv-fr/"
};

/** @type {import('../../types').Organization} */
const organizationWithLogo = {
  ...organization,
  logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg"
};

/** @type {CardLGProps} */
const argsWithOwner = {
  ...args,
  owner,
};

/** @type {CardLGProps} */
const argsWithOwnerWithAvatar = {
  ...args,
  owner: ownerWithAvatar,
};

/** @type {CardLGProps} */
const argsWithOrganization = {
  ...args,
  organization: organization,
};

/** @type {CardLGProps} */
const argsWithOrganizationWithLogo = {
  ...args,
  organization: organizationWithLogo,
};

/** @type {CardLGProps} */
const argsWithAcronymAndOrganizationWithLogo = {
  ...argsWithOrganizationWithLogo,
  acronym: "MND"
};

/** @type {CardLGProps} */
const argsWithAcronymAndOwnerWithAvatar = {
  ...argsWithOwnerWithAvatar,
  acronym: "MND"
};

/** @type {CardLGProps} */
const argsWithCertifiedOrganization = {
  ...argsWithAcronymAndOrganizationWithLogo,
  organization: {
    ...organizationWithLogo,
    badges: [{kind: PUBLIC_SERVICE}, {kind: CERTIFIED}]
  },
};

/**
 * #### Card Large with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGWithOrganizationLogo = {
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
export const CardLGWithCertifiedOrganization = {
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
export const CardLGWithAcronymAndOrganizationLogo = {
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
export const CardLGWithDescriptionAndCertifiedOrganization = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithCertifiedOrganization,
    description: `Le plan cadastral est le découpage du territoire français en unités de surfaces permettant le calcul de certains impôts.

    Chaque commune est subdivisée en sections, elles-mêmes subdivisées en feuilles (ou planches).
    Une feuille cadastrale comporte des parcelles, qui peuvent supporter des bâtiments.

    Différence par rapport au PCI Vecteur
    Contrairement au Plan Cadastral Informatisé au format EDIGÉO qui est un ensemble de 600 000 feuilles cadastrales avec de nombreux éléments liés à la fiscalité ou à l'habillage du plan, cette version retravaillée par Etalab se concentre sur le découpage parcellaire et sur les bâtiments.

    Les différentes couches d'information géographique sont constituées par juxtaposition des feuilles, sans correction.`
  },
};

/**
 * #### Card Large updated last month with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGUpdatedLastMonthWithOrganizationLogo = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    last_update: updateLastMonth
  },
};

/**
 * #### Card Large updated last year with an organization logo
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGUpdatedLastYearWithOrganizationLogo = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    last_update: updateLastYear
  },
};

/**
 * #### Card Large without metrics with an organization logo
 * This is how a dataset without metrics is shown.
 */
export const CardLGWithoutMetricsWithOrganizationLogo = {
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
export const CardLGPrivateWithOrganizationLogo = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    private: true
  },
};

/**
 * #### Card Large for an archived dataset with organization logo
 * This is how an archived dataset owned by an organization is shown.
 */
export const CardLGArchivedWithOrganizationLogo = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    archived: true
  },
};

/**
 * #### Card Large for a private archived dataset with organization logo
 * This is how a private archived dataset owned by an organization is shown.
 */
export const CardLGPrivateArchivedWithOrganizationLogo = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOrganizationWithLogo,
    archived: true,
    private: true,
  },
};

/**
 * #### Card Large with owner avatar
 * This is how a dataset with an owner is shown.
 */
export const CardLGWithOwnerAvatar = {
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
export const CardLGWithAcronymAndOwnerWithAvatar = {
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
export const CardLGPrivateWithOwnerAvatar = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOwnerWithAvatar,
    private: true
  },
};

/**
 * #### Card Large for an archived dataset with owner avatar
 * This is how an archived dataset with an owner is shown.
 */
export const CardLGArchivedWithOwnerAvatar = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOwnerWithAvatar,
    archived: true
  },
};

/**
 * #### Card Large for a private archived dataset with owner avatar
 * This is how a private archived dataset with an owner is shown.
 */
export const CardLGPrivateArchivedWithOwnerAvatar = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: {
    ...argsWithOwnerWithAvatar,
    archived: true,
    private: true,
  },
};

/**
 * #### Card Large with organization placeholder
 * This is how a dataset owned by an organization is shown.
 */
export const CardLGWithOrganizationPlaceholder = {
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
export const CardLGWithOwnerPlaceholder = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args: argsWithOwner,
};

/**
 * #### Card Large with dataset placeholder
 * This is how a dataset without owner is shown.
 * It shouldn't exist based on API requirement but it's a `else` path for the card.
 */
export const CardLGWithDatasetPlaceholder = {
  render: (args) => ({
    components: { CardLG },
    setup() {
      return { args };
    },
    template: '<CardLG v-bind="args"/>',
  }),
  args,
};
