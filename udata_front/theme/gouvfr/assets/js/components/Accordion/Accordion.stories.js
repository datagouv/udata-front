import Accordion from './Accordion.vue';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

const args = {
  title: "The accordion"
};

export const ClosedAccordion = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args,
};
