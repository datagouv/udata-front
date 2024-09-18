import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion from './Accordion.vue';
import AccordionGroup from './AccordionGroup.vue';

const meta = {
  title: 'Components/AccordionGroup',
  component: AccordionGroup,
} satisfies Meta<typeof AccordionGroup>;

export default meta;

const args = {
};

export const ClosedAccordionGroup: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Accordion, AccordionGroup },
    setup() {
      return { args };
    },
    template: `
    <AccordionGroup v-bind="args">
      <Accordion title="First accordion">With content</Accordion>
      <Accordion title="Another accordion">Other content</Accordion>
    </AccordionGroup>`,
  }),
  args,
};
