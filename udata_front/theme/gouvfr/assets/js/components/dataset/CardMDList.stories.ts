import CardMDList, { type CardMDListProps } from './CardMDList.vue';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/Dataset Card List',
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

const args: CardMDListProps = {
  datasets: [dataset, dataset, dataset],
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
