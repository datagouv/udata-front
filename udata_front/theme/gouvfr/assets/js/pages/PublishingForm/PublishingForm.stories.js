import PublishingForm from './PublishingForm.vue';

export default {
  title: 'Pages/PublishingForm/Form',
  component: PublishingForm,
};

const args = {
  redirectDraftUrl: "https://demo.data.gouv.fr/fr/datasets/?q=draft",
  redirectPublishedUrl: "https://demo.data.gouv.fr/fr/datasets/?q=published"
};

export const Form = {
  render: (args) => ({
    components: { PublishingForm },
    setup() {
      return { args };
    },
    template: ` <div class="bg-grey-50 fr-p-4w">
                  <PublishingForm v-bind="args" />
                </div>`,
  }),
  args,
};
