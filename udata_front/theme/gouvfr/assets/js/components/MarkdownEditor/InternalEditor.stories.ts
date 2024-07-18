import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import InternalEditor from './InternalEditor.vue';
import { MarkdownEditorProps } from './types';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue';
import { MilkdownProvider } from '@milkdown/vue';
import { useLinkPreviewProvider } from './Milkdown/LinkPreview/useLinkPreview';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/MarkdownEditor/Internals/InternalEditor',
  component: InternalEditor,
  decorators: [withActions],
  args: {
    onChange: fn(),
    onEditorMounted: fn(),
  }
} satisfies Meta<typeof InternalEditor>;

export default meta;

const args: MarkdownEditorProps = {
  id: "someId",
  value: "",
};

export const SimpleInternalEditor: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { InternalEditor, MilkdownProvider, ProsemirrorAdapterProvider },
    setup() {
      useLinkPreviewProvider();
      return { args };
    },
    template: ` <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <InternalEditor
        v-bind="args"
      />
    </ProsemirrorAdapterProvider>
    </MilkdownProvider>
    `,
  }),
  args,
};
