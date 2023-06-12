import Accordion from './Accordion.vue';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

const args = {
  title: "The accordion",
  id: null,
  opened: false,
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

export const OpenedAccordion = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    opened: true,
  },
};

export const ClosedAccordionWithCustomId = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    id: "some-id",
  },
};
export const OpenedAccordionWithCustomId = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    id: "some-id-opened",
    opened: true
  },
};
