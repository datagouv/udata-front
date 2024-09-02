import { delay, http, HttpResponse } from "msw";
import Threads from "./Threads.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: 'Components/Discussions',
  component: Threads,
} satisfies Meta<typeof Threads>;

export default meta;

const args = {
  subjectId: "5de8f397634f4164071119c5",
  subjectClass: "Dataset",
};

export const DefaultThreads: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/1/discussions/*', async () => {
          await delay();
          return HttpResponse.json({
            "data": [
              {
                "class": "Discussion",
                "closed": null,
                "closed_by": null,
                "created": "2024-07-22T14:59:06.086000+00:00",
                "discussion": [
                  {
                    "content": "Bonjour,\nJe constate un tr\u00e8s faible nombre de d\u00e9c\u00e8s en juillet 1997, avec autour de 555 d\u00e9c\u00e8s au plus bas du mois. Ce pic n'est pas pr\u00e9sent dans les donn\u00e9es mensuelles INSEE.\nJe souhaitais savoir si quelqu'un partageait mon constat et s'il avait une explication.\nMerci,",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "jeanne",
                      "id": "669e726da8b49a686aa3390c",
                      "last_name": "bessiere",
                      "page": "https://www.data.gouv.fr/fr/users/jeanne-bessiere/",
                      "slug": "jeanne-bessiere",
                      "uri": "https://www.data.gouv.fr/api/1/users/jeanne-bessiere/"
                    },
                    "posted_on": "2024-07-22T14:59:06.086000+00:00",
                    "spam": {
                      "status": null
                    }
                  }
                ],
                "extras": {},
                "id": "669e73ba2d615eb2a86b4210",
                "spam": {
                  "status": "not_checked"
                },
                "subject": {
                  "class": "Dataset",
                  "id": "5de8f397634f4164071119c5"
                },
                "title": "Anomalie juillet 1997",
                "url": "https://www.data.gouv.fr/api/1/discussions/669e73ba2d615eb2a86b4210/",
                "user": {
                  "avatar": null,
                  "avatar_thumbnail": null,
                  "class": "User",
                  "first_name": "Jane",
                  "id": "669e726da8b49a686aa3390c",
                  "last_name": "Doe",
                  "page": "https://www.data.gouv.fr/fr/users/jane-doe/",
                  "slug": "jane-doe",
                  "uri": "https://www.data.gouv.fr/api/1/users/jane-doe/"
                }
              },
              {
                "class": "Discussion",
                "closed": null,
                "closed_by": null,
                "created": "2024-07-08T21:55:35.355000+00:00",
                "discussion": [
                  {
                    "content": "Hello,\n\nI need help locating the record below. It says my grandfather died in France, but he actually died in Mexico City, Mexico. I have a copy of his death certificate. I believe his daughters falsified the certificate to collect his belongings.",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "John",
                      "id": "64a63de24ee3717e3ca73a8e",
                      "last_name": "Doe",
                      "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                      "slug": "john-doe",
                      "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                    },
                    "posted_on": "2024-07-08T21:55:35.355000+00:00",
                    "spam": {
                      "status": null
                    }
                  }
                ],
                "extras": {},
                "id": "668c6057caeb96f6a0487de3",
                "spam": {
                  "status": "no_spam"
                },
                "subject": {
                  "class": "Dataset",
                  "id": "5de8f397634f4164071119c5"
                },
                "title": "French death certificate of my grandfather",
                "url": "https://www.data.gouv.fr/api/1/discussions/668c6057caeb96f6a0487de3/",
                "user": {
                  "avatar": null,
                  "avatar_thumbnail": null,
                  "class": "User",
                  "first_name": "John",
                  "id": "64a63de24ee3717e3ca73a8e",
                  "last_name": "Doe",
                  "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                  "slug": "john-doe",
                  "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                }
              },
              {
                "class": "Discussion",
                "closed": null,
                "closed_by": null,
                "created": "2024-05-28T11:07:08.961000+00:00",
                "discussion": [
                  {
                    "content": "bonjour\ndans le dernier fichier des oppositions, dat\u00e9 du 27 mai 2024, le dernier enregistrement ajout\u00e9 concerne un d\u00e9c\u00e8s \u00e0 l'\u00e9tranger.\ndans les cas des d\u00e9c\u00e8s \u00e0 l'\u00e9tranger, le code INSEE de la commune de d\u00e9c\u00e8s est en fait le code INSEE du pays de d\u00e9c\u00e8s, dans ce cas, le 99131, c'est \u00e0 dire la BELGIQUE.\ndans ce cas particulier de d\u00e9c\u00e8s, le num\u00e9ro de l'acte de d\u00e9c\u00e8s est le 999, nombre qui pourrait fortement signifier un num\u00e9ro inconnu.\n\u00e0 cause de ce manque d'unicit\u00e9, il se trouve que ce sont 2 d\u00e9c\u00e8s qui se retrouvent masqu\u00e9/supprim\u00e9, car le d\u00e9c\u00e8s est dat\u00e9 du m\u00eame jour aussi.\ndans ce cas pr\u00e9cis, c'est d'autant + \u00e9tonnant, car ces 2 enregistrements de d\u00e9c\u00e8s communiqu\u00e9s dans les fichiers de d\u00e9c\u00e8s de l'INSEE, concernent 2 personnes qui ont le meme nom de famille et le meme premier pr\u00e9nom, mais n\u00e9s \u00e0 des dates diff\u00e9rentes espac\u00e9es de 2 ans, l'un en suisse, l'autre dans le bas-rhin.\npour le moment, ces 2 personnes n'apparaissent plus, sans savoir lequel devrait r\u00e9ellement disparaitre\nmerci pour votre lecture",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "John",
                      "id": "61d9cc7ad962b77922870df1",
                      "last_name": "DOE",
                      "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                      "slug": "john-doe",
                      "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                    },
                    "posted_on": "2024-05-28T11:07:08.960000+00:00",
                    "spam": {
                      "status": null
                    }
                  },
                  {
                    "content": "Bonjour,\n\nCe d\u00e9c\u00e8s et cette opposition \u00e0 rediffusion concernent un d\u00e9c\u00e8s \u00e0 tort.\nIl y a eu le m\u00eame d\u00e9c\u00e8s appliqu\u00e9 2 fois, une fois sur une mauvaise personne et une autre fois sur la personne r\u00e9ellement d\u00e9c\u00e9d\u00e9e.\nDans le fichier des oppositions \u00e0 rediffusion sont mis \u00e0 disposition : la date de d\u00e9c\u00e8s, le lieu de d\u00e9c\u00e8s et le num\u00e9ro d\u2019acte de d\u00e9c\u00e8s qui sont donc les m\u00eames pour les deux individus.\n\nCordialement\n",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "Anne",
                      "id": "606340e403e60e0cf339e351",
                      "last_name": "Levet",
                      "page": "https://www.data.gouv.fr/fr/users/anne-levet/",
                      "slug": "anne-levet",
                      "uri": "https://www.data.gouv.fr/api/1/users/anne-levet/"
                    },
                    "posted_on": "2024-06-06T17:05:00.341000+00:00",
                    "spam": {
                      "status": "not_checked"
                    }
                  }
                ],
                "extras": {},
                "id": "6655badd22e9df29a538704b",
                "spam": {
                  "status": "not_checked"
                },
                "subject": {
                  "class": "Dataset",
                  "id": "5de8f397634f4164071119c5"
                },
                "title": "unicit\u00e9 de d\u00e9c\u00e8s incorrect provoqu\u00e9 par le fichier des oppositions",
                "url": "https://www.data.gouv.fr/api/1/discussions/6655badd22e9df29a538704b/",
                "user": {
                  "avatar": null,
                  "avatar_thumbnail": null,
                  "class": "User",
                  "first_name": "John",
                  "id": "61d9cc7ad962b77922870df1",
                  "last_name": "DOE",
                  "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                  "slug": "john-doe",
                  "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                }
              },
              {
                "class": "Discussion",
                "closed": null,
                "closed_by": null,
                "created": "2024-03-08T08:27:23.106000+00:00",
                "discussion": [
                  {
                    "content": "Bonjour,\nDans les fichiers annuels on trouve un champ comdom qui indique la commune de r\u00e9sidence de la personne.\nPar contre ce champ ne se retrouve pas dans ces fichiers mensuels ?\nExiste-t-il une autre source INSEE ?\nD'avance merci,\nP",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "john",
                      "id": "551d1a52c751df046d0cd89f",
                      "last_name": "DOE",
                      "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                      "slug": "john-doe",
                      "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                    },
                    "posted_on": "2024-03-08T08:27:23.106000+00:00",
                    "spam": {
                      "status": null
                    }
                  }
                ],
                "extras": {},
                "id": "65eacbebea47c3875f34f068",
                "spam": {
                  "status": "not_checked"
                },
                "subject": {
                  "class": "Dataset",
                  "id": "5de8f397634f4164071119c5"
                },
                "title": "Commune du domicile des personnes",
                "url": "https://www.data.gouv.fr/api/1/discussions/65eacbebea47c3875f34f068/",
                "user": {
                  "avatar": null,
                  "avatar_thumbnail": null,
                  "class": "User",
                  "first_name": "john",
                  "id": "551d1a52c751df046d0cd89f",
                  "last_name": "DOE",
                  "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                  "slug": "john-doe",
                  "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                }
              },
              {
                "class": "Discussion",
                "closed": null,
                "closed_by": null,
                "created": "2024-02-16T15:25:18.119000+00:00",
                "discussion": [
                  {
                    "content": "Bonjour,\n\nSa diffusion est-elle pr\u00e9vue en F\u00e9vier 2024 ou le service est-il suspendu cette ann\u00e9e ?\n\nmerci pour votre r\u00e9ponse\n\nCordialement",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "John",
                      "id": "61b9c609915b08aa47e92107",
                      "last_name": "DOE",
                      "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                      "slug": "john-doe",
                      "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                    },
                    "posted_on": "2024-02-16T15:25:18.118000+00:00",
                    "spam": {
                      "status": null
                    }
                  },
                  {
                    "content": "Bonjour,\n\nLa diffusion mensuelle de ce jeu de donn\u00e9es est toujours active.\n\nLes donn\u00e9es de 2024 sont en cours de validation et seront disponibles sous peu.\n\nBien cordialement",
                    "posted_by": {
                      "avatar": null,
                      "avatar_thumbnail": null,
                      "class": "User",
                      "first_name": "Fabrice",
                      "id": "63f8715e1155494fb4c7da10",
                      "last_name": "ROMANS",
                      "page": "https://www.data.gouv.fr/fr/users/fabrice-romans/",
                      "slug": "fabrice-romans",
                      "uri": "https://www.data.gouv.fr/api/1/users/fabrice-romans/"
                    },
                    "posted_on": "2024-02-16T19:03:33.881000+00:00",
                    "spam": {
                      "status": "not_checked"
                    }
                  }
                ],
                "extras": {},
                "id": "65cf7e5ea64415a5e4edefa6",
                "spam": {
                  "status": "not_checked"
                },
                "subject": {
                  "class": "Dataset",
                  "id": "5de8f397634f4164071119c5"
                },
                "title": "Fichier des d\u00e9c\u00e8s Janvier 2024",
                "url": "https://www.data.gouv.fr/api/1/discussions/65cf7e5ea64415a5e4edefa6/",
                "user": {
                  "avatar": null,
                  "avatar_thumbnail": null,
                  "class": "User",
                  "first_name": "John",
                  "id": "61b9c609915b08aa47e92107",
                  "last_name": "DOE",
                  "page": "https://www.data.gouv.fr/fr/users/john-doe/",
                  "slug": "john-doe",
                  "uri": "https://www.data.gouv.fr/api/1/users/john-doe/"
                }
              }
            ],
            "next_page": "https://www.data.gouv.fr/api/1/discussions/?page=2&for=5de8f397634f4164071119c5&sort=-created&page_size=5",
            "page": 1,
            "page_size": 5,
            "previous_page": null,
            "total": 155
          });
        }),
      ],
    },
  },
  render: (args) => ({
    components: { Threads },
    setup() {
      return { args };
    },
    template: ` <Threads v-bind="args"/>`,
  }),
  args,
};
