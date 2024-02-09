import type { Meta, StoryObj } from '@storybook/vue3';
import MarkdownEditor from './MarkdownEditor.vue';

const meta = {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditor,
} satisfies Meta<typeof MarkdownEditor>;

export default meta;

const args = {
};

export const SimpleMarkdownEditor: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { MarkdownEditor },
    setup() {
      return { args };
    },
    template: ` <MarkdownEditor v-bind="args">
                </MarkdownEditor>`,
  }),
  args,
};
