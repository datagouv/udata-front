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
      http.get('*/api/1/datasets/frequencies/', async () => {
        await delay();
        return HttpResponse.json(
          [
            {
              "id": "unknown",
              "label": "Inconnu"
            },
            {
              "id": "punctual",
              "label": "Ponctuelle"
            },
            {
              "id": "continuous",
              "label": "Temps réel"
            },
            {
              "id": "hourly",
              "label": "Toutes les heures"
            },
            {
              "id": "fourTimesADay",
              "label": "Quatre fois par jour"
            },
            {
              "id": "threeTimesADay",
              "label": "Trois fois par jour"
            },
            {
              "id": "semidaily",
              "label": "Deux fois par jour"
            },
            {
              "id": "daily",
              "label": "Quotidienne"
            },
            {
              "id": "fourTimesAWeek",
              "label": "Quatre fois par semaine"
            },
            {
              "id": "threeTimesAWeek",
              "label": "Trois fois par semaine"
            },
            {
              "id": "semiweekly",
              "label": "Deux fois par semaine"
            },
            {
              "id": "weekly",
              "label": "Hebdomadaire"
            },
            {
              "id": "biweekly",
              "label": "Toutes les deux semaines"
            },
            {
              "id": "threeTimesAMonth",
              "label": "Trois fois par mois"
            },
            {
              "id": "semimonthly",
              "label": "Deux fois par mois"
            },
            {
              "id": "monthly",
              "label": "Mensuelle"
            },
            {
              "id": "bimonthly",
              "label": "Bimestrielle"
            },
            {
              "id": "quarterly",
              "label": "Trimestrielle"
            },
            {
              "id": "threeTimesAYear",
              "label": "Trois fois par an"
            },
            {
              "id": "semiannual",
              "label": "Semestrielle"
            },
            {
              "id": "annual",
              "label": "Annuelle"
            },
            {
              "id": "biennial",
              "label": "Biennale"
            },
            {
              "id": "triennial",
              "label": "Triennale"
            },
            {
              "id": "quinquennial",
              "label": "Quinquennale"
            },
            {
              "id": "irregular",
              "label": "Sans régularité"
            }
          ]
        )
      }),
      http.get('*/api/1/datasets/licenses/', async () => {
        await delay();
        return HttpResponse.json(
          [
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "okd_compliant",
                "domain_content"
              ],
              "id": "cc-by",
              "maintainer": null,
              "title": "Creative Commons Attribution",
              "url": "http://www.opendefinition.org/licenses/cc-by"
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "okd_compliant",
                "domain_content"
              ],
              "id": "cc-by-sa",
              "maintainer": null,
              "title": "Creative Commons Attribution Share-Alike",
              "url": "http://www.opendefinition.org/licenses/cc-by-sa"
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "domain_data",
                "okd_compliant",
                "domain_content",
                "domain_software"
              ],
              "id": "cc-zero",
              "maintainer": null,
              "title": "Creative Commons CCZero",
              "url": "http://www.opendefinition.org/licenses/cc-zero"
            },
            {
              "alternate_titles": [
                "LO/OL"
              ],
              "alternate_urls": [
                "https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Open_Licence.pdf"
              ],
              "flags": [
                "domain_data",
                "okd_compliant",
                "domain_content"
              ],
              "id": "fr-lo",
              "maintainer": null,
              "title": "Licence Ouverte / Open Licence",
              "url": "https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf"
            },
            {
              "alternate_titles": [
                "License Etalab",
                "License Etalab v2",
                "License Etalab v2.0",
                "Licence Ouverte (Etalab)",
                "License Ouverte",
                "Licence Ouverte v2",
                "Licence Ouverte v2.0",
                "Licence Ouverte v2.0 (Etalab)",
                "Licence Ouverte version 2.0",
                "Open Licence v2",
                "Open Licence v2.0",
                "Open Licence version 2.0",
                "Licence Ouverte / Open Licence v2",
                "Licence Ouverte / Open Licence v2.0",
                "etalab-2.0"
              ],
              "alternate_urls": [
                "https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf",
                "https://github.com/etalab/Licence-Ouverte/blob/master/LO.md"
              ],
              "flags": [
                "domain_data",
                "okd_compliant",
                "domain_content"
              ],
              "id": "lov2",
              "maintainer": null,
              "title": "Licence Ouverte / Open Licence version 2.0",
              "url": "https://www.etalab.gouv.fr/licence-ouverte-open-licence"
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "generic"
              ],
              "id": "notspecified",
              "maintainer": null,
              "title": "License Not Specified",
              "url": null
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "domain_data",
                "okd_compliant"
              ],
              "id": "odc-by",
              "maintainer": null,
              "title": "Open Data Commons Attribution License",
              "url": "http://opendatacommons.org/licenses/by/summary/"
            },
            {
              "alternate_titles": [
                "Open Database License (ODbL) 1.0",
                "Open Data Commons Open Database License 1.0",
                "Open Database License"
              ],
              "alternate_urls": [
                "https://opendefinition.org/licenses/odc-odbl"
              ],
              "flags": [
                "domain_data",
                "okd_compliant"
              ],
              "id": "odc-odbl",
              "maintainer": null,
              "title": "Open Data Commons Open Database License (ODbL)",
              "url": "http://opendatacommons.org/licenses/odbl/summary/"
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "domain_data",
                "okd_compliant"
              ],
              "id": "odc-pddl",
              "maintainer": null,
              "title": "Open Data Commons Public Domain Dedication and Licence (PDDL)",
              "url": "http://opendatacommons.org/licenses/pddl/summary/"
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "okd_compliant",
                "generic",
                "domain_content"
              ],
              "id": "other-at",
              "maintainer": null,
              "title": "Other (Attribution)",
              "url": null
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "okd_compliant",
                "generic",
                "domain_content"
              ],
              "id": "other-open",
              "maintainer": null,
              "title": "Other (Open)",
              "url": null
            },
            {
              "alternate_titles": [],
              "alternate_urls": [],
              "flags": [
                "okd_compliant",
                "generic",
                "domain_content"
              ],
              "id": "other-pd",
              "maintainer": null,
              "title": "Other (Public Domain)",
              "url": null
            }
          ]
        )
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
      http.get('*/api/1/spatial/granularities/', async () => {
        await delay();
        return HttpResponse.json([
          {
            "id": "country-group",
            "name": "Groupement de pays"
          },
          {
            "id": "country",
            "name": "Pays"
          },
          {
            "id": "country-subset",
            "name": "Sous-ensemble de pays"
          },
          {
            "id": "fr:region",
            "name": "Région française"
          },
          {
            "id": "fr:departement",
            "name": "Département français"
          },
          {
            "id": "fr:arrondissement",
            "name": "Arrondissement français"
          },
          {
            "id": "fr:commune",
            "name": "Commune française"
          },
          {
            "id": "fr:iris",
            "name": "Iris (quartiers INSEE)"
          },
          {
            "id": "fr:canton",
            "name": "Canton français"
          },
          {
            "id": "fr:collectivite",
            "name": "Collectivités d'outre-mer françaises"
          },
          {
            "id": "fr:epci",
            "name": "Intercommunalité française (EPCI)"
          },
          {
            "id": "poi",
            "name": "Point d'Intérêt"
          },
          {
            "id": "other",
            "name": "Autre"
          }
        ]);
      }),
    ],
  },
};

export default preview;

