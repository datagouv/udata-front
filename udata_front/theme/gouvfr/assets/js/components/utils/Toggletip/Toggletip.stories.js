import Toggletip from './Toggletip.vue';

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
};

const args = {
};

export const SimpleToggletip = {
  render: (args) => ({
    components: { Toggletip },
    setup() {
      return { args };
    },
    template: ` <Toggletip class="fr-btn">
                  Click on Me
                  <template v-slot:toggletip>This is shown in the toggletip</template>
                </Toggletip>`,
  }),
  args,
};
