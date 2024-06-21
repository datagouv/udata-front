import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { setup, type Preview } from '@storybook/vue3';
import { setupI18n } from '../src/helpers/i18n';

const i18n = setupI18n();

setup((app) => {
  app.use(i18n);
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
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
