import type { Meta, StoryObj } from '@storybook/vue3';
import DescriptionList from './DescriptionList.vue';
import DescriptionTerm from './DescriptionTerm.vue';
import DescriptionDetails from './DescriptionDetails.vue';

const meta = {
  title: "Components/Description List/Description List",
  component: DescriptionList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Description Details is a styled `<dd>` to use in the `<DescriptionList>` component."
      }
    }
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;

export const Simple: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { DescriptionDetails, DescriptionList, DescriptionTerm },
    setup() {
      return { args };
    },
    template: `<DescriptionList>
        <DescriptionTerm>The Term</DescriptionTerm>
        <DescriptionDetails :withEllipsis="false">A really long details so we can see if it wraps to a new line or add ellipsis.</DescriptionDetails>
    </DescriptionList>`,
  }),
  args: {}
};

export const WithEllipsis: StoryObj<typeof meta> = {
    render: (args) => ({
      components: { DescriptionDetails, DescriptionList, DescriptionTerm },
      setup() {
        return { args };
      },
      template: `<DescriptionList>
      <DescriptionTerm>The Term</DescriptionTerm>
      <DescriptionDetails>A really long details so we can see if it wraps to a new line or add ellipsis.</DescriptionDetails>
  </DescriptionList>`,
    }),
    args: {}
};
