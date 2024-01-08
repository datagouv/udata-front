import ReuseList, { type ReuseListProps } from './ReuseList.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";
import { ReuseWithOwner } from './Reuse.stories';

const meta = {
  title: 'Lists/Reuse Card List',
  component: ReuseList,
  parameters: {
    actions: {
      handles: ['click a'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof ReuseList>;

export default meta;

const reuse = {
  ...ReuseWithOwner.args.reuse,
}

const args: ReuseListProps = {
  reuses: [reuse, reuse, reuse],
  totalResults: 3,
};

const twoReusesArgs: ReuseListProps = {
  reuses: [reuse, reuse],
  totalResults: 2,
};

const paginatedArgs: ReuseListProps = {
  reuses: [reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse,
    reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse, reuse],
  totalResults: 24,
};

/**
 * #### Reuse List
 * A list of reuse cards.
 */
export const DefaultReuseList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseList },
    setup() {
      return { args };
    },
    template: '<ReuseList v-bind="args"/>',
  }),
  args,
};

/**
 * #### 2-reuses List
 * A list of large reuse cards.
 */
export const TwoReusesList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseList },
    setup() {
      return { args };
    },
    template: '<ReuseList v-bind="args"/>',
  }),
  args: twoReusesArgs,
};

/**
 * #### Reuse List With Pagination
 * A list of reuse cards with pagination.
 */
export const PaginatedReuseList: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ReuseList },
    setup() {
      return { args };
    },
    template: '<ReuseList v-bind="args"/>',
  }),
  args: paginatedArgs,
};
