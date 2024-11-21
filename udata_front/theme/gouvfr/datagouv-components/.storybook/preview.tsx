import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { setup, type Preview } from '@storybook/vue3';
import { setupI18n } from '../src/helpers/i18n';
import { setupComponents } from "../src/config";
import mswRequests from "./msw-requests";
import { initialize, mswLoader } from "msw-storybook-addon";

setupComponents({
  default_lang: "en",
  only_locales: "en",
});

const i18n = setupI18n();

setup((app) => {
  app.use(i18n);
});


/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  onUnhandledRequest: ({ url }, print) => {
    const pathname = new URL(url).pathname;
    if (pathname.startsWith("/src") || pathname.startsWith("/@fs") || pathname.startsWith("/node_modules") || pathname.endsWith("/.svg")) {
      return;
    }
    print.warning();
  }
});

const preview: Preview = {
  decorators: [
    (story, ctx) => {
      return {
        components: { story },
        template: ctx.title.includes("Pages") ? `<story />` : `<div class="fr-container datagouv-components"><story /></div>`,
      };
    },
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: mswRequests,
    options: {
      storySort: {
        method: "alphabetical"
      }
    },
    docs: {
      toc: {
        title: 'Table of contents'
      },
      page: () => (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <Controls />
            <Stories />
          </>
      ),
    },
  },
};

export default preview;
