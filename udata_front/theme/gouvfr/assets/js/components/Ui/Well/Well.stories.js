import Well from './Well.vue';

export default {
  title: 'Ui/Well',
  component: Well,
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
        "grey-100"
      ],
      control: 'select',
    }
  }
};

const args = {
  type: "primary",
};

export const SimpleWell = {
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
