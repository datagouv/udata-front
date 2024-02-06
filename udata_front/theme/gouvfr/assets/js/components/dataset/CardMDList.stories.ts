import CardMDList, { type CardMDListProps } from './CardMDList.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";
import { CardMDWithCertifiedOrganization } from './CardMD.stories';

const meta = {
  title: 'Lists/Dataset Card List',
  component: CardMDList,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof CardMDList>;

export default meta;

const dataset = {
  ...CardMDWithCertifiedOrganization.args.dataset,
};

const args: CardMDListProps = {
  datasets: [dataset, dataset, dataset],
  totalResults: 3,
};

const paginatedArgs: CardMDListProps = {
  datasets: [dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset,
    dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset, dataset],
  totalResults: 25,
};

const customPaginationArgs: CardMDListProps = {
  datasets: [dataset, dataset],
  pageSize: 2,
  totalResults: 3,
};

/**
 * #### Card Medium List
 * A list of dataset cards.
 */
export const DefaultCardMDList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMDList },
    setup() {
      return { args };
    },
    template: '<CardMDList v-bind="args"/>',
  }),
  args,
};

/**
 * #### Card Medium List With Pagination
 * A list of dataset cards.
 */
export const PaginatedCardMDList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMDList },
    setup() {
      return { args };
    },
    template: '<CardMDList v-bind="args"/>',
  }),
  args: paginatedArgs,
};

/**
 * #### Card Medium List With Custom Page Size
 * A list of dataset cards with custom page size.
 */
export const CustomPageSizeCardMDList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { CardMDList },
    setup() {
      return { args };
    },
    template: '<CardMDList v-bind="args"/>',
  }),
  args: customPaginationArgs,
};
