import CardList, { type CardListProps } from './CardList.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";
import { CardLGWithCertifiedOrganization } from './CardLG.stories';

const meta = {
  title: 'Lists/Dataset Card List',
  component: CardList,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof CardList>;

export default meta;

const dataset = {
  ...CardLGWithCertifiedOrganization.args.dataset,
};

const args: CardListProps = {
  datasets: [dataset, dataset, dataset],
  totalResults: 3,
};

const paginatedArgs: CardListProps = {
  datasets: [dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset,
    dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset],
  totalResults: 25,
};

const customPaginationArgs: CardListProps = {
  datasets: [dataset, dataset],
  pageSize: 2,
  totalResults: 3,
};

/**
 * #### Card List
 * A list of dataset cards.
 */
export const DefaultCardList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardList },
    setup() {
      return { args };
    },
    template: '<CardList v-bind="args"/>',
  }),
  args,
};

/**
 * #### Card List With Pagination
 * A list of dataset cards.
 */
export const PaginatedCardList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardList },
    setup() {
      return { args };
    },
    template: '<CardList v-bind="args"/>',
  }),
  args: paginatedArgs,
};

/**
 * #### Card List With Custom Page Size
 * A list of dataset cards with custom page size.
 */
export const CustomPageSizeCardList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardList },
    setup() {
      return { args };
    },
    template: '<CardList v-bind="args"/>',
  }),
  args: customPaginationArgs,
};
