import { delay, http, HttpResponse } from 'msw';

export default {
  handlers: [
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
    http.get('*/api/1/datasets/frequencies/*', async () => {
      await delay();
      return HttpResponse.json(
        [
          {"id": "unknown", "label": "Unknown"},
          {"id": "punctual", "label": "Punctual"},
          {"id": "continuous", "label": "Real time"},
          {"id": "hourly", "label": "Hourly"},
          {"id": "fourTimesADay", "label": "Four times a day"},
          {"id": "threeTimesADay", "label": "Three times a day"},
          {"id": "semidaily", "label": "Semidaily"},
          {"id": "daily", "label": "Daily"},
          {"id": "fourTimesAWeek", "label": "Four times a week"},
          {"id": "threeTimesAWeek", "label": "Three times a week"},
          {"id": "semiweekly", "label": "Semiweekly"},
          {"id": "weekly", "label": "Weekly"},
          {"id": "biweekly", "label": "Biweekly"},
          {"id": "threeTimesAMonth", "label": "Three times a month"},
          {"id": "semimonthly", "label": "Semimonthly"},
          {"id": "monthly", "label": "Monthly"},
          {"id": "bimonthly", "label": "Bimonthly"},
          {"id": "quarterly", "label": "Quarterly"},
          {"id": "threeTimesAYear", "label": "Three times a year"},
          {"id": "semiannual", "label": "Biannual"},
          {"id": "annual", "label": "Annual"},
          {"id": "biennial", "label": "Biennial"},
          {"id": "triennial", "label": "Triennial"},
          {"id": "quinquennial", "label": "Quinquennial"},
          {"id": "irregular", "label": "Irregular"}
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
          {"id": "api", "label": "API"},
          {"id": "application", "label": "Application"},
          {"id": "idea", "label": "Idea"},
          {"id": "news_article", "label": "News Article"},
          {"id": "paper", "label": "Paper"},
          {"id": "post", "label": "Post"},
          {"id": "visualization", "label": "Visualization"},
          {"id": "hardware", "label": "Connected device"}
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
    http.get('*/api/1/spatial/granularities/*', async () => {
      await delay();
      return HttpResponse.json(
        [
          {"id": "country-group", "name": "Country group"},
          {"id": "country", "name": "Country"},
          {"id": "country-subset", "name": "Country subset"},
          {"id": "fr:region", "name": "French region"},
          {"id": "fr:departement", "name": "French county"},
          {"id": "fr:arrondissement", "name": "French arrondissement"},
          {"id": "fr:commune", "name": "French town"},
          {"id": "fr:iris", "name": "Iris (Insee districts)"},
          {"id": "fr:canton", "name": "French canton"},
          {"id": "fr:collectivite", "name": "French overseas collectivities"},
          {"id": "fr:epci", "name": "French intermunicipal (EPCI)"},
          {"id": "poi", "name": "POI"},
          {"id": "other", "name": "Other"}
        ]
      );
    }),
    http.get('*/api/1/spatial/zones/country:fr/*', async () => {
      await delay();
      return HttpResponse.json({
        "features": [
          {
            "geometry": { "coordinates": null, "type": null },
            "id": "country:fr",
            "properties": { "code": "fr", "level": "country", "name": "France", "slug": "France", "uri": null },
            "type": "Feature"
          }
        ],
        "type": "FeatureCollection"
      });
    }),
  ]
};
