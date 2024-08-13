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
      http.get('*/api/1/me', async () => {
        await delay();
        return HttpResponse.json({ 
          first_name: "John",
          last_name: "Doe",
          roles: [],
          avatar: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
          organizations: [
            {
              acronym: null,
              badges: [],
              class: "Organization",
              id: "65e9b7cf830c3b5a515ee4ed",
              logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              name: "My Organization",
              page: "",
              slug: "my-organization",
              uri: "/"
            },
            {
              acronym: null,
              badges: [],
              class: "Organization",
              id: "65e9b7cf830c3b5a515ee4ed",
              logo: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              logo_thumbnail: "https://demo-static.data.gouv.fr/avatars/84/3194d831264f769fa817e58813d413-100.png",
              name: "My Second Organization",
              page: "",
              slug: "my-second-organization",
              uri: "/"
            }
          ]
        })
      }),
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
          ]
        )
      }),
      http.get('*/api/1/reports/reasons/', async () => {
        await delay();
        return HttpResponse.json([
          {
            "label": "Explicit content",
            "value": "explicit_content"
          },
          {
            "label": "Illegal content",
            "value": "illegal_content"
          },
          {
            "label": "Others",
            "value": "others"
          },
          {
            "label": "Personal data",
            "value": "personal_data"
          },
          {
            "label": "Security",
            "value": "security"
          },
          {
            "label": "Spam",
            "value": "spam"
          }
        ]);
      }),
    ],
  },
};

export default preview;

