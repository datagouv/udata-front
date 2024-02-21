import { rest } from 'msw';
import Admin from './Admin.vue';
import type { Meta, StoryObj } from "@storybook/vue3";
import type { Me } from '../../types';

const meta = {
  title: 'Pages/Admin',
  component: Admin,
  parameters: {
    flex: true,
    flexDirection: 'column',
    msw: [
      rest.get("*/api/1/me", async (_req, res, ctx) => {
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
          "metrics": {"datasets": 23, "followers": 0, "following": 1, "reuses": 0},
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
            }
          ],
          "page": "http://dev.local:7000/en/users/nicolas-kempf-1/",
          "roles": ["admin"],
          "since": "2021-10-14T11:12:26.622000+00:00",
          "slug": "nicolas-kempf-1",
          "uri": "http://dev.local:7000/api/1/users/nicolas-kempf-1/",
          "website": "https://www.data.gouv.fr"
        };
        return res(ctx.delay(), ctx.json(me));
      }),
    ]
  },
} satisfies Meta<typeof Admin>;

export default meta;

const args = {
};

export const HomeAdmin: StoryObj<typeof meta> = {
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
