import type { Preview } from '@storybook/vue3';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import mswRequests from '../udata_front/theme/gouvfr/datagouv-components/.storybook/msw-requests';

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  onUnhandledRequest: ({ url }, print) => {
    const pathname = new URL(url).pathname
    if (pathname.startsWith("/udata_front") || pathname.startsWith("/@fs") || pathname.startsWith("/node_modules") || pathname.endsWith("/.svg")) {
      return;
    }
    print.warning();
  }
});

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'iphone14promax',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: mswRequests,
  },
};

export default preview;

