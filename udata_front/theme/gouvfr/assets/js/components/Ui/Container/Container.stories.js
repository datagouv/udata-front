import Container from './Container.vue';

export default {
  title: 'Ui/Container',
  component: Container,
};

const args = {};

export const SimpleContainer = {
  render: (args) => ({
    components: { Container },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <Container>
                    Container with a white Background and some padding.
                  </Container>
                </div>`,
  }),
  args,
};

export const GreyContainer = {
  render: (args) => ({
    components: { Container },
    setup() {
      return { args };
    },
    template: ` <div class="fr-p-4w">
                  <Container v-bind="args">
                    Container with an alt grey Background and some padding.
                  </Container>
                </div>`,
  }),
  args: {
    ...args,
    color: "alt-grey"
  },
};
