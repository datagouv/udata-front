import type { Meta, StoryObj } from '@storybook/vue3';
import { Toggletip } from '.';

const meta = {
  title: 'Components/Toggletip',
  component: Toggletip,
} satisfies Meta<typeof Toggletip>;

export default meta;

export const SimpleToggletip: StoryObj<typeof meta> = {
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
  args: {},
};
