import type { Preview, StoryContext, StoryFn } from '@storybook/vue3';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { defineComponent } from 'vue';

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  onUnhandledRequest: ({ url }, print) => {
    const pathname = new URL(url).pathname
    if(pathname.startsWith("/udata_front") || pathname.startsWith("/@fs") || pathname.startsWith("/node_modules")) {
      return;
    }
    print.warning();
  }
});

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
