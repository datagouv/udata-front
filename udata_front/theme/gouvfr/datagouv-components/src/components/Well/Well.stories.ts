import Well from '.';
import type { WellProps } from './Well.vue';
import editIcon from "../../../../templates/svg/illustrations/edit.svg";
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Ui/Well',
  component: Well,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: [
        "primary",
        "secondary"
      ],
      control: 'radio',
    },
    color: {
      options: [
        "success",
        "warning",
        "grey-100",
        "blue-cumulus"
      ],
      control: 'select',
    }
  },
  parameters: {
    docs: {
      description: {
        component: "This component is a simple container with a colored background and some padding.",
      },
    },
  },
} satisfies Meta<typeof Well>;

export default meta;

const args: WellProps = {
  type: "primary",
};

export const SimpleWell: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Well },
    setup() {
      return { args };
    },
    template: ` <div class="fr-p-4w">
                  <Well v-bind="args">
                    Well with a colored Background and some padding.
                  </Well>
                </div>`,
  }),
  args,
};

const argsRegular: WellProps = {
  color: "blue-cumulus",
  weight: "regular"
};

export const WellWithImg: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Well },
    setup() {
      return { args, editIcon };
    },
    template: ` <Well v-bind="args">
                    <div class="fr-grid-row">
                      <div class="fr-col-auto fr-mr-3v">
                        <img :src="editIcon" alt="" />
                      </div>
                      <div class="fr-col">
                        <p class="fr-m-0 fr-text--bold">What is a dataset?</p>
                        <p class="fr-m-0 fr-text--xs">On udata-front, a dataset is a set of files.</p>
                      </div>
                    </div>
                  </Well>`,
  }),
  args: argsRegular,
}
