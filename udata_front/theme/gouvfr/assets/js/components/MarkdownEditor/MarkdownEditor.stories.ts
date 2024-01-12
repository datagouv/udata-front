import MarkdownEditor from './MarkdownEditor.vue';

export default {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditor,
};

const args = {
};

export const SimpleMarkdownEditor = {
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
