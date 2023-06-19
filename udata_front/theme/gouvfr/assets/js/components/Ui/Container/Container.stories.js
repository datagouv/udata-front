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
