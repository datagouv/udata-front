import PublishingForm from './PublishingForm.vue';

export default {
  title: 'Pages/PublishingForm/Form',
  component: PublishingForm,
};

const args = {
};

export const Form = {
  render: (args) => ({
    components: { PublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <PublishingForm />
                </div>`,
  }),
  args,
};
