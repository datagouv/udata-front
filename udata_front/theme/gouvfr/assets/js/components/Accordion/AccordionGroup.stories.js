import Accordion from './Accordion.vue';
import AccordionGroup from './AccordionGroup.vue';

export default {
  title: 'Components/AccordionGroup',
  component: AccordionGroup,
};

const args = {
};

export const ClosedAccordionGroup = {
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
