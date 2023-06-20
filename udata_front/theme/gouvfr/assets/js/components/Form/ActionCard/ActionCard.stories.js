import ActionCard from './ActionCard.vue';

export default {
  title: 'Components/ActionCard',
  component: ActionCard,
};

const args = {
  title: "Publish data on data.gouv.fr",
  content: "Administration or public society, everybody can publish on data.gouv.fr !",
  icon: "udata_front/theme/gouvfr/templates/svg/blank_state/discussion.svg",
};

export const SimpleCard = {
  render: (args) => ({
    components: { ActionCard },
    setup() {
      return { args };
    },
    template: ` <ActionCard v-bind="args">
                  <template v-slot:actions>
                    <button class="fr-btn">Some action</button>
                  </template>
                </ActionCard>`,
  }),
  args,
};
