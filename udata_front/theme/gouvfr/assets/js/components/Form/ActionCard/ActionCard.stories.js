import ActionCard from './ActionCard.vue';

export default {
  title: 'Components/ActionCard',
  component: ActionCard,
  argTypes: {
    actionsAlignment: {
      options: [
        "start",
        "center",
        "end"
      ],
      control: 'radio',
    },
  }
};

const args = {
  title: "Publish a dataset",
  content: "Administration or public society, everybody can publish on data.gouv.fr !",
  icon: "udata_front/theme/gouvfr/templates/svg/illustrations/dataset.svg",
  actionsAlignment: "end",
};

export const CardWithPrimaryButton = {
  render: (args) => ({
    components: { ActionCard },
    setup() {
      return { args };
    },
    template: ` <ActionCard v-bind="args">
                  <template v-slot:actions>
                    <button class="fr-btn">Start publishing</button>
                  </template>
                </ActionCard>`,
  }),
  args,
};

export const CardWithSecondaryButton = {
  render: (args) => ({
    components: { ActionCard },
    setup() {
      return { args };
    },
    template: ` <ActionCard v-bind="args">
                  <template v-slot:actions>
                    <button class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500">
                      Use our dedicated tool
                    </button>
                  </template>
                </ActionCard>`,
  }),
  args: {
    ...args,
    title: "Publish with a schema",
    content: "Are your data following a reference schema ? Validate, correct and publish your data on data.gouv.fr !",
    icon: "udata_front/theme/gouvfr/templates/svg/illustrations/schema.svg",
  },
};
