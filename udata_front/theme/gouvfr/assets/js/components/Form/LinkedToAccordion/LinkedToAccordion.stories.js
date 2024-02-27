import Accordion from '../../Accordion/Accordion.vue';
import LinkedToAccordion from './LinkedToAccordion.vue';

export default {
  title: 'Components/LinkedToAccordion',
  component: LinkedToAccordion,
};

const args = {
  accordion: "some-id",
};

export const LinkedToClosedAccordion = {
  render: (args) => ({
    components: { Accordion, LinkedToAccordion },
    setup() {
      return { args };
    },
    template: ` <div>
                  <Accordion :id="args.accordion" title="The accordion">Some content</Accordion>
                  <LinkedToAccordion v-bind="args" v-slot="slotProps">
                    <input :aria-describedby="args.accordion" class="fr-input fr-mt-2w" />
                  </LinkedToAccordion>
                </div>`,
  }),
  args,
};
