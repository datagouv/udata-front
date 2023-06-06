import Required from './Required.vue';

export default {
  title: 'Components/Required',
  component: Required,
};

export const RequiredLabel = {
  render: (args) => ({
    components: { Required },
    setup() {
      return { args };
    },
    template: '<label>Label for a required field<Required v-bind="args" /></label>',
  }),
  args: {
    required: true,
  },
};

export const NonRequiredLabel = {
  render: (args) => ({
    components: { Required },
    setup() {
      return { args };
    },
    template: '<label>Label for a non required field<Required v-bind="args" /></label>',
  }),
  args: {
    required: false,
  },
};
