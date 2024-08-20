import type { Preview } from '@storybook/vue3';
import { delay, http, HttpResponse } from 'msw';
import { initialize, mswDecorator } from 'msw-storybook-addon';

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
    msw: [
      http.get('*/api/1/reuses/types/', async () => {
        await delay();
        return HttpResponse.json(
        [
          {
            "id": "api",
            "label": "API"
          },
          {
            "id": "application",
            "label": "Application"
          },
          {
            "id": "idea",
            "label": "Idée"
          },
          {
            "id": "news_article",
            "label": "Article de presse"
          },
          {
            "id": "paper",
            "label": "Papier"
          },
          {
            "id": "post",
            "label": "Article de blog"
          },
          {
            "id": "visualization",
            "label": "Visualisation"
          },
          {
            "id": "hardware",
            "label": "Objet connecté"
          }
        ]);
      }),
    ],
  },
};

export default preview;
