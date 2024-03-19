import Accordion from './Accordion.vue';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    state: {
      options: [
        "default",
        "info",
        "disabled",
        "error",
        "success",
      ],
      control: 'select',
    },
  }
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

export const AccordionInInfoState = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    state: "info"
  },
};

export const AccordionInDisabledState = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    state: "disabled"
  },
};

export const AccordionInErrorState = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    state: "error"
  },
};

export const AccordionInWarningState = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    state: "warning"
  },
};

export const AccordionInSuccessState = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args: {
    ...args,
    state: "success"
  },
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
