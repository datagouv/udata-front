import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion from './Accordion.vue';

const meta = {
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
} satisfies Meta<typeof Accordion>;

export default meta;

const args = {
  title: "The accordion",
  id: null,
  opened: false,
};

export const ClosedAccordion: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: '<Accordion v-bind="args">Some content</Accordion>',
  }),
  args,
};

export const AccordionInInfoState: StoryObj<typeof meta> = {
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

export const AccordionInDisabledState: StoryObj<typeof meta> = {
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

export const AccordionInErrorState: StoryObj<typeof meta> = {
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

export const AccordionInWarningState: StoryObj<typeof meta> = {
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

export const AccordionInSuccessState: StoryObj<typeof meta> = {
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

export const OpenedAccordion: StoryObj<typeof meta> = {
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

export const ClosedAccordionWithCustomId: StoryObj<typeof meta> = {
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
export const OpenedAccordionWithCustomId: StoryObj<typeof meta> = {
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
