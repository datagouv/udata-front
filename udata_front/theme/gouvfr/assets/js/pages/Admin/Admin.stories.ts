import { delay, http, HttpResponse } from 'msw';
import Admin from './Admin.vue';
import type { Meta, StoryObj } from "@storybook/vue3";
import type { Me, PendingMembershipRequest } from '../../types';

const meta = {
  title: 'Pages/Admin',
  component: Admin,
  parameters: {
    flex: true,
    flexDirection: 'column',
  },
} satisfies Meta<typeof Admin>;

export default meta;

const args = {
};

export const HomeAdmin: StoryObj<typeof meta> = {
  parameters: {
    msw: [
      http.get("*/api/1/me", async () => {
        const me: Me = {
          "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "active": true,
          "apikey": null,
          "avatar": null,
          "avatar_thumbnail": null,
          "email": "contact@udata",
          "first_name": "Nicolas",
          "id": "6167f47af6e528f929382ca4",
          "last_name": "KEMPF",
          "metrics": { "datasets": 23, "followers": 0, "following": 1, "reuses": 0 },
          "organizations": [
            {
              "acronym": null,
              "badges": [],
              "id": "646b7187b50b2a93b1ae3d45",
              "logo": "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a.jpeg",
              "logo_thumbnail": "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
              "name": "data.gouv.fr",
              "page": "http://dev.local:7000/en/organizations/data-gouv-fr/",
              "slug": "data-gouv-fr",
              "uri": "http://dev.local:7000/api/1/organizations/data-gouv-fr/"
            },
            {
              "acronym": null,
              "badges": [],
              "id": "6481e3f7959723cf9f8bc98a",
              "logo": "https://dev-static.data.gouv.fr/avatars/dd/0525c5aa524398877c90f2611880df.jpg",
              "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/dd/0525c5aa524398877c90f2611880df-100.jpg",
              "name": "Cour d'appel de Metz",
              "page": "http://dev.local:7000/en/organizations/cour-dappel-de-metz/",
              "slug": "cour-dappel-de-metz",
              "uri": "http://dev.local:7000/api/1/organizations/cour-dappel-de-metz/"
            }
          ],
          "page": "http://dev.local:7000/en/users/nicolas-kempf-1/",
          "roles": ["admin"],
          "since": "2021-10-14T11:12:26.622000+00:00",
          "slug": "nicolas-kempf-1",
          "uri": "http://dev.local:7000/api/1/users/nicolas-kempf-1/",
          "website": "https://www.data.gouv.fr"
        };
        await delay();
        return HttpResponse.json(me);
      }),
      http.get("*/api/1/organizations/*/membership", async () => {
        const requests: Array<PendingMembershipRequest> = [
          {
            "comment": "justice et patriotisme information et suivie des affaires class\u00e9s r\u00e9ouverture ",
            "created": "2018-08-15T09:13:15.453000+00:00",
            "id": "873971df-f993-49a0-ada9-6a99ef863399",
            "status": "pending",
            "user": {
              "avatar": null,
              "avatar_thumbnail": null,
              "class": "User",
              "first_name": "175.1",
              "id": "58122e87c751df389fc562c7",
              "last_name": "M.",
              "page": "http://dev.local:7000/en/users/1751-m/",
              "slug": "1751-m",
              "uri": "http://dev.local:7000/api/1/users/1751-m/"
            }
          },
          {
            "comment": "j'aimerai signaler les pratiques d'un b\u00e9n\u00e9ficiaire des num\u00e9ros \u00e0 valeurs ajout\u00e9s (num\u00e9ros surtax\u00e9s pour le service voyance et astrologie)",
            "created": "2019-05-31T05:34:29.480000+00:00",
            "id": "02f988ae-1da4-46e8-ae43-4295d177c6cb",
            "status": "pending",
            "user": {
              "avatar": null,
              "avatar_thumbnail": null,
              "class": "User",
              "first_name": "some",
              "id": "5cf09b5b8b4c415c7833ca14",
              "last_name": "user",
              "page": "http://dev.local:7000/en/users/some-user/",
              "slug": "some-user",
              "uri": "http://dev.local:7000/api/1/users/some-user/"
            }
          }
        ];
        await delay();
        return HttpResponse.json(requests);
      }),
      http.get("*/api/1/organizations/6481e3f7959723cf9f8bc98a/datasets/*", async () => {
        await delay();
        return HttpResponse.json({
          "data": [],
          "next_page": null,
          "page": 1,
          "page_size": 10,
          "previous_page": null,
          "total": 0,
        });
      }),
    ],
  },
  render: (args) => ({
    components: { Admin },
    setup() {
      return { args };
    },
    template: `<div class="bg-grey-50">
                <Admin v-bind="args" />
              </div>`,
  }),
  args,
};
