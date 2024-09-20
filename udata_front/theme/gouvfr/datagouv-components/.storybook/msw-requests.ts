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
          { "id": "unknown", "label": "Unknown" },
          { "id": "punctual", "label": "Punctual" },
          { "id": "continuous", "label": "Real time" },
          { "id": "hourly", "label": "Hourly" },
          { "id": "fourTimesADay", "label": "Four times a day" },
          { "id": "threeTimesADay", "label": "Three times a day" },
          { "id": "semidaily", "label": "Semidaily" },
          { "id": "daily", "label": "Daily" },
          { "id": "fourTimesAWeek", "label": "Four times a week" },
          { "id": "threeTimesAWeek", "label": "Three times a week" },
          { "id": "semiweekly", "label": "Semiweekly" },
          { "id": "weekly", "label": "Weekly" },
          { "id": "biweekly", "label": "Biweekly" },
          { "id": "threeTimesAMonth", "label": "Three times a month" },
          { "id": "semimonthly", "label": "Semimonthly" },
          { "id": "monthly", "label": "Monthly" },
          { "id": "bimonthly", "label": "Bimonthly" },
          { "id": "quarterly", "label": "Quarterly" },
          { "id": "threeTimesAYear", "label": "Three times a year" },
          { "id": "semiannual", "label": "Biannual" },
          { "id": "annual", "label": "Annual" },
          { "id": "biennial", "label": "Biennial" },
          { "id": "triennial", "label": "Triennial" },
          { "id": "quinquennial", "label": "Quinquennial" },
          { "id": "irregular", "label": "Irregular" }
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
          { "id": "api", "label": "API" },
          { "id": "application", "label": "Application" },
          { "id": "idea", "label": "Idea" },
          { "id": "news_article", "label": "News Article" },
          { "id": "paper", "label": "Paper" },
          { "id": "post", "label": "Post" },
          { "id": "visualization", "label": "Visualization" },
          { "id": "hardware", "label": "Connected device" }
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
          { "id": "country-group", "name": "Country group" },
          { "id": "country", "name": "Country" },
          { "id": "country-subset", "name": "Country subset" },
          { "id": "fr:region", "name": "French region" },
          { "id": "fr:departement", "name": "French county" },
          { "id": "fr:arrondissement", "name": "French arrondissement" },
          { "id": "fr:commune", "name": "French town" },
          { "id": "fr:iris", "name": "Iris (Insee districts)" },
          { "id": "fr:canton", "name": "French canton" },
          { "id": "fr:collectivite", "name": "French overseas collectivities" },
          { "id": "fr:epci", "name": "French intermunicipal (EPCI)" },
          { "id": "poi", "name": "POI" },
          { "id": "other", "name": "Other" }
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
    http.get('*/api/1/organizations/*', async () => {
      await delay();
      return HttpResponse.json({
        "data": [
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "12002701600563",
            "created_at": "2014-04-17T18:21:21.523000+00:00",
            "deleted": null,
            "description": "L'Institut national de la statistique et des \u00e9tudes \u00e9conomiques (Insee) collecte, produit, analyse et diffuse des informations sur l'\u00e9conomie et la soci\u00e9t\u00e9 fran\u00e7aises. Ces informations int\u00e9ressent les pouvoirs publics, les administrations, les entreprises, les chercheurs, les m\u00e9dias, les enseignants, les \u00e9tudiants, les particuliers. Elles leur permettent d'enrichir leurs connaissances, d'effectuer des \u00e9tudes, de faire des pr\u00e9visions et de prendre des d\u00e9cisions. Pour satisfaire ses utilisateurs, l'Insee est \u00e0 l'\u00e9coute de leurs besoins et oriente ses travaux en cons\u00e9quence en poursuivant un objectif principal : \u00e9clairer le d\u00e9bat \u00e9conomique et social.",
            "extras": {
              "datagouv_ckan_id": "2592c1f6-eb5d-4248-997f-6dbda8709d5d",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:15.286000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "INSTITUT NATIONAL DE LA STATISTIQUE ET DES ETUDES ECONOMIQUES (INSEE)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "12002701600563"
            },
            "id": "534fff81a3a7292c64a77e5c",
            "last_modified": "2024-09-02T05:17:59.801000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 59,
              "followers": 649,
              "members": 15,
              "reuses": 3,
              "views": 3325184
            },
            "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
            "page": "https://www.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
            "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
            "uri": "https://www.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
            "url": null
          },
          {
            "acronym": "MEFSIN",
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11002001300097",
            "created_at": "2014-04-17T18:21:34.211000+00:00",
            "deleted": null,
            "description": "Le minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique est charg\u00e9 de mettre en \u0153uvre la politique du Gouvernement en mati\u00e8re \u00e9conomique, financi\u00e8re, budg\u00e9taire et fiscale. Ses missions recouvrent des champs d\u2019action vari\u00e9s tels que l\u2019industrie, le commerce, les services, l\u2019innovation mais aussi la gestion des comptes publics et la d\u00e9finition de la strat\u00e9gie des finances publiques (affaires mon\u00e9taires, imp\u00f4ts, douanes\u2026). Elles sont assur\u00e9es par les diff\u00e9rents services et directions qui composent le minist\u00e8re.\n",
            "extras": {
              "datagouv_ckan_id": "2fe1cbaa-5442-4fed-9981-5dfa24f3af82",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:48.819000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DE L'ECONOMIE DES FINANCES ET DE LA SOUVERAINETE INDUSTRIELLE ET NUMERIQUE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11002001300097"
            },
            "id": "534fff8ea3a7292c64a77f02",
            "last_modified": "2024-09-02T05:18:00.409000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 528,
              "followers": 422,
              "members": 45,
              "reuses": 1,
              "views": 2582882
            },
            "name": "Minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
            "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
            "url": "https://economie.gouv.fr/"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11001401600015",
            "created_at": "2014-04-17T18:21:36.879000+00:00",
            "deleted": null,
            "description": "Plac\u00e9 au c\u0153ur de l\u2019\u00c9tat, le minist\u00e8re de l\u2019int\u00e9rieur et des outre-mer assure la permanence et la continuit\u00e9 de l\u2019\u00c9tat. Cette fonction r\u00e9galienne se concr\u00e9tise par le r\u00f4le majeur et les services rendus par le r\u00e9seau des pr\u00e9fectures et des sous-pr\u00e9fectures aux citoyens de m\u00e9tropole et d'outre-mer. Au quotidien, le minist\u00e8re de l\u2019int\u00e9rieur et des outre-mer est le garant de la s\u00e9curit\u00e9 des Fran\u00e7ais : s\u00e9curit\u00e9s publique, civile, routi\u00e8re... Le minist\u00e8re de l\u2019int\u00e9rieur et des outre-mer est, \u00e0 ce titre, un minist\u00e8re op\u00e9rationnel capable d\u2019agir et de r\u00e9agir \u00e0 tout moment pour prot\u00e9ger les populations, notamment, lors de crises majeures. Il est aussi le garant du libre exercice et du respect des libert\u00e9s publiques : libert\u00e9s de circulation, de vote, d\u2019association, de culte, d\u2019installation dans des conditions r\u00e9guli\u00e8res pour ceux qui viennent de l\u2019\u00e9tranger. Il veille, enfin, au respect des libert\u00e9s locales et des comp\u00e9tences des collectivit\u00e9s territoriales.\n\n**Sites institutionnels: **\n\n**https://www.interieur.gouv.fr/**\n\n**https://www.outre-mer.gouv.fr/**\n\n**https://www.prefectures-regions.gouv.fr/**\n\n**Pr\u00e9fecture de police de Paris:** http://www.prefecturedepolice.interieur.gouv.fr/\n\n**Agence nationale des titres s\u00e9curis\u00e9s**:** https://ants.gouv.fr/\n\n**Agence nationale de traitement automatis\u00e9 des infractions:** https://www.antai.gouv.fr/publiques/accueil\n\n**Collectivit\u00e9s locales:** https://www.collectivites-locales.gouv.fr/open-collectivit%C3%A9s\n\n**Office Fran\u00e7ais de l\u2019Immigration et de l'Int\u00e9gration (OFII):** https://www.ofii.fr/**",
            "extras": {
              "datagouv_ckan_id": "bd71283c-9c05-4a68-a405-77643a02a6fe",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:39.218000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DE L' INTERIEUR ET DES OUTRE-MER",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11001401600015"
            },
            "id": "534fff91a3a7292c64a77f53",
            "last_modified": "2024-09-02T08:24:24.284000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-100.png",
            "members": [],
            "metrics": {
              "datasets": 702,
              "followers": 374,
              "members": 31,
              "reuses": 3,
              "views": 3518193
            },
            "name": "Minist\u00e8re de l'Int\u00e9rieur et des Outre-Mer",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-linterieur-et-des-outre-mer/",
            "slug": "ministere-de-linterieur-et-des-outre-mer",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-linterieur-et-des-outre-mer/",
            "url": "http://www.interieur.gouv.fr/"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "13002526500013",
            "created_at": "2014-04-17T18:21:09.022000+00:00",
            "deleted": null,
            "description": "Etalab est un d\u00e9partement de la direction interminist\u00e9rielle du num\u00e9rique (DINUM), dont les missions et l\u2019organisation sont fix\u00e9es par le d\u00e9cret du 30 Octobre 2019. Il coordonne notamment la conception et la mise en \u0153uvre de la strat\u00e9gie de l\u2019\u00c9tat dans le domaine de la donn\u00e9e.\u2009\n\n**Ouverture (open data) et partage des donn\u00e9es**\nEtalab coordonne la politique d\u2019ouverture et de partage des donn\u00e9es publiques (open data) : Il coordonne les actions des administrations de l\u2019Etat et leur apporte son appui pour faciliter la diffusion et la r\u00e9utilisation de leurs informations publiques.\n\nIl d\u00e9veloppe et anime la plateforme d\u2019open data data.gouv.fr destin\u00e9e \u00e0 rassembler et \u00e0 mettre \u00e0 disposition librement l\u2019ensemble des informations publiques de l\u2019Etat, de ses \u00e9tablissements publics et, si elles le souhaitent, des collectivit\u00e9s territoriales et des personnes de droit public ou de droit priv\u00e9 charg\u00e9es d\u2019une mission de service public.\n\nIl coordonne le Service Public de la Donn\u00e9e .\n\nEtalab contribue \u00e9galement \u00e0 faciliter la circulation et l\u2019\u00e9change de donn\u00e9es entre administrations, notamment dans le cadre de la mise en oeuvre du principe du \u00ab Dites le nous une fois \u00bb, ou avec des tiers. \n\n**Exploitation des donn\u00e9es : datasciences, intelligence artificielle et algorithmes publics**\nPour la DINUM, Etalab coordonne et promeut l\u2019action de l\u2019Etat et des organismes plac\u00e9s sous sa tutelle en mati\u00e8re d\u2019inventaire, de gouvernance, de production, de circulation, d\u2019exploitation et d\u2019ouverture des donn\u00e9es, et notamment des codes sources.\nIl organise, dans le respect de la protection des donn\u00e9es personnelles et des secrets prot\u00e9g\u00e9s par la loi, la meilleure exploitation des donn\u00e9es de l\u2019Etat et des organismes plac\u00e9s sous sa tutelle et leur plus large circulation. La DINUM peut \u00eatre saisie par une personne morale de droit public de toute question portant sur cette circulation.\n\nEtalab contribue \u00e0 la promotion des sciences des donn\u00e9es (\u00ab datasciences \u00bb) et de l\u2019intelligence artificielle dans la sph\u00e8re publique. Il porte notamment le programme \u00ab Lab IA \u00bb visant \u00e0 mener des projets de datasciences et d\u2019IA, \u00e0 faciliter l\u2019exp\u00e9rimentation et le partage de bonnes pratiques, \u00e0 animer des communaut\u00e9s de datascientists et porteurs de projet d\u2019IA.\n\nEtalab accompagne \u00e9galement les administrations dans l\u2019ouverture et l\u2019usage responsable des algorithmes publics.  \n\n**Innovation et ouverture de l\u2019action publique** \nPour la DINUM, Etalab contribue \u00e0 \u00ab promouvoir l\u2019innovation, l\u2019exp\u00e9rimentation, les m\u00e9thodes de travail ouvertes, agiles et it\u00e9ratives, ainsi que les synergies avec la soci\u00e9t\u00e9 civile pour d\u00e9cloisonner l\u2019administration et favoriser l\u2019adoption des meilleures pratiques professionnelles dans le domaine du num\u00e9rique.\nA ce titre il \u00e9tudie notamment l\u2019opportunit\u00e9 de recourir \u00e0 des technologies en voie de maturation issues du monde de la recherche \u00bb (art.6 du d\u00e9cret, 6\u00b0).\n\nEtalab contribue ainsi \u00e0 ouvrir l\u2019administration et l\u2019action publique sur la soci\u00e9t\u00e9, en mettant en oeuvre les principes de \u00ab gouvernement ouvert \u00bb : transparence de l\u2019action publique, consultation et concertation avec la soci\u00e9t\u00e9 civile, participation citoyenne, innovation ouverte. Il a coordonn\u00e9 jusqu\u2019en 2019, en lien avec le Minist\u00e8re de l\u2019Europe et des Affaires \u00e9trang\u00e8res l\u2019action de la France au sein du Partenariat pour un gouvernement ouvert (\u00ab PGO \u00bb), d\u00e9sormais pilot\u00e9 par la Direction Interminist\u00e9rielle de la Transformation Publique. \n\nEtalab a par ailleurs con\u00e7u, lanc\u00e9 et d\u00e9velopp\u00e9 le programme \u00ab Entrepreneurs d\u2019Int\u00e9r\u00eat G\u00e9n\u00e9ral \u00bb, qui recrute chaque ann\u00e9e pendant 10 mois des talents du num\u00e9rique \u2013 d\u00e9veloppeurs, datascientists, designers\u2026. \u2013 pour r\u00e9soudre des d\u00e9fis d\u2019int\u00e9r\u00eat g\u00e9n\u00e9ral aux cot\u00e9s des administrations. \n\n",
            "extras": {
              "datagouv_ckan_id": "69160813-5ee5-4e4a-9b48-363c843b7a25",
              "datagouv_ckan_last_sync": "2014-09-17T03:30:53.819000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "DIRECTION INTERMINISTERIELLE DU NUMERIQUE (DINUM)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "13002526500013"
            },
            "id": "534fff75a3a7292c64a77de4",
            "last_modified": "2024-09-02T05:17:58.395000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/2015-01-12/8ebc26cca2394e089a8b065fe0ae2659/etalab-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/2015-01-12/8ebc26cca2394e089a8b065fe0ae2659/etalab-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 49,
              "followers": 359,
              "members": 14,
              "reuses": 35,
              "views": 221590
            },
            "name": "Etalab",
            "page": "https://www.data.gouv.fr/fr/organizations/etalab/",
            "slug": "etalab",
            "uri": "https://www.data.gouv.fr/api/1/organizations/etalab/",
            "url": "https://www.etalab.gouv.fr"
          },
          {
            "acronym": "OSM",
            "badges": [],
            "business_number_id": "84103758300025",
            "created_at": "2014-04-17T18:21:52.854000+00:00",
            "deleted": null,
            "description": "Le wiki cartographique mondial qui cr\u00e9e et fournit des donn\u00e9es g\u00e9ographiques sous licence libre [ODbL](http://osm.org/copyright). OSM est repr\u00e9sent\u00e9 en France par [OpenStreetMap France](http://openstreetmap.fr/), association r\u00e9gie par la loi de 1901 cr\u00e9\u00e9e en Octobre 2011.\r\n\r\nPour tout usage de ces donn\u00e9es, vous avez obligation de pr\u00e9ciser la source: \"\u00a9 les contributeurs OpenStreetMap\" et de partager \u00e0 l'identique les donn\u00e9es d\u00e9riv\u00e9es. Voir [http://osm.org/copyright](http://osm.org/copyright) pour plus de d\u00e9tails.",
            "extras": {
              "datagouv_ckan_id": "d77e80a8-01a5-49a4-8f83-b8be50cc5eb8",
              "datagouv_ckan_last_sync": "2014-09-17T03:32:07.264000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "OPENSTREETMAP FRANCE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "False",
              "siretisation:found_siret": "84103758300025"
            },
            "id": "534fffa0a3a7292c64a7806b",
            "last_modified": "2024-09-02T05:17:49.425000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/c7/513a9d32e84c1dbcc6ac7e2ce42cb8-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/c7/513a9d32e84c1dbcc6ac7e2ce42cb8-100.png",
            "members": [],
            "metrics": {
              "datasets": 36,
              "followers": 298,
              "members": 10,
              "reuses": 1,
              "views": 464035
            },
            "name": "OpenStreetMap",
            "page": "https://www.data.gouv.fr/fr/organizations/openstreetmap/",
            "slug": "openstreetmap",
            "uri": "https://www.data.gouv.fr/api/1/organizations/openstreetmap/",
            "url": "http://www.openstreetmap.fr/"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11000101300017",
            "created_at": "2014-04-17T18:21:57.325000+00:00",
            "deleted": null,
            "description": "\nAux c\u00f4t\u00e9s de son cabinet, l\u2019administration de la Premi\u00e8re ministre comprend de nombreux services qui l\u2019assistent et prennent part \u00e0 l\u2019\u00e9laboration de la politique du Gouvernement. Sont rattach\u00e9s au Premier ministre les organismes charg\u00e9s de missions de coordination interminist\u00e9rielle qui ne peuvent \u00eatre attribu\u00e9es \u00e0 un seul minist\u00e8re. ",
            "extras": {
              "datagouv_ckan_id": "8938c878-9861-4899-a15c-dbdf681307ef",
              "datagouv_ckan_last_sync": "2014-09-17T03:32:16.382000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "GOUVERNEMENT PREMIER MINISTRE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11000101300017"
            },
            "id": "534fffa5a3a7292c64a7809e",
            "last_modified": "2024-09-02T05:17:57.698000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-100.png",
            "members": [],
            "metrics": {
              "datasets": 177,
              "followers": 289,
              "members": 19,
              "reuses": 53,
              "views": 598717
            },
            "name": "Premier ministre",
            "page": "https://www.data.gouv.fr/fr/organizations/premier-ministre/",
            "slug": "premier-ministre",
            "uri": "https://www.data.gouv.fr/api/1/organizations/premier-ministre/",
            "url": null
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11000007200014",
            "created_at": "2014-04-17T18:21:40.735000+00:00",
            "deleted": null,
            "description": "Le minist\u00e8re des solidarit\u00e9s et de la sant\u00e9 pr\u00e9pare et met en \u0153uvre la politique du Gouvernement dans les domaines des affaires sociales, de la solidarit\u00e9 et de la coh\u00e9sion sociale, de la sant\u00e9 publique et de l'organisation du syst\u00e8me de soins. Sous r\u00e9serve des comp\u00e9tences du ministre de l'\u00e9conomie et des finances, il pr\u00e9pare et met en \u0153uvre la politique du Gouvernement dans le domaine de la protection sociale.",
            "extras": {
              "datagouv_ckan_id": "596a482f-ecee-45b0-ad01-9853973c7121",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:46.336000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DU TRAVAIL DE LA SANTE ET DES SOLIDARITES",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11000007200014"
            },
            "id": "534fff94a3a7292c64a77fc1",
            "last_modified": "2024-09-02T08:34:47.096000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-100.png",
            "members": [],
            "metrics": {
              "datasets": 317,
              "followers": 275,
              "members": 54,
              "reuses": 5,
              "views": 6169787
            },
            "name": "Minist\u00e8re des Solidarit\u00e9s et de la Sant\u00e9",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-des-solidarites-et-de-la-sante/",
            "slug": "ministere-des-solidarites-et-de-la-sante",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-des-solidarites-et-de-la-sante/",
            "url": null
          },
          {
            "acronym": "SPF",
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "13002233800011",
            "created_at": "2020-03-18T13:55:21.674000+00:00",
            "deleted": null,
            "description": "Sant\u00e9 publique France est l\u2019agence nationale de sant\u00e9 publique. Cr\u00e9\u00e9e en mai 2016 par ordonnance et d\u00e9cret, c\u2019est un \u00e9tablissement public administratif sous tutelle du minist\u00e8re charg\u00e9 de la Sant\u00e9. Sa mission : am\u00e9liorer et prot\u00e9ger la sant\u00e9 des populations. Cette mission s'articule autour de trois axes majeurs : anticiper, comprendre et agir.\n\n\n### Sant\u00e9 publique France en quelques mots :\n\nEn tant qu'agence scientifique et d\u2019expertise du champ sanitaire, Sant\u00e9 publique France a en charge :\n- l'observation \u00e9pid\u00e9miologique et la surveillance de l'\u00e9tat de sant\u00e9 des populations ;\n- la veille sur les risques sanitaires mena\u00e7ant les populations ;\n- le lancement de l'alerte sanitaire ;\n- la promotion de la sant\u00e9 et la r\u00e9duction des risques pour la sant\u00e9 ;\n- le d\u00e9veloppement de la pr\u00e9vention et de l'\u00e9ducation pour la sant\u00e9 ;\n- la pr\u00e9paration et la r\u00e9ponse aux menaces, alertes et crises sanitaires.\n\n",
            "extras": {
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "AGENCE NATIONALE DE SANTE PUBLIQUE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "13002233800011"
            },
            "id": "5e721a395d57f93d0bed451f",
            "last_modified": "2024-09-02T05:18:00.530000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
            "members": [],
            "metrics": {
              "datasets": 30,
              "followers": 270,
              "members": 5,
              "reuses": 0,
              "views": 3162657
            },
            "name": "Sant\u00e9 publique France",
            "page": "https://www.data.gouv.fr/fr/organizations/sante-publique-france/",
            "slug": "sante-publique-france",
            "uri": "https://www.data.gouv.fr/api/1/organizations/sante-publique-france/",
            "url": "https://www.santepubliquefrance.fr/"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "18006701900430",
            "created_at": "2014-04-17T18:21:20.106000+00:00",
            "deleted": null,
            "description": "![entrez la description de l'image ici](http://www.ign.fr/sites/all/files/portail_cat-offre_634.jpg \"entrez le titre de l'image ici\")\r\n\r\nL\u2019IGN est l\u2019op\u00e9rateur public de r\u00e9f\u00e9rence pour l\u2019information g\u00e9ographique et foresti\u00e8re.\r\nL\u2019IGN a pour vocation de d\u00e9crire, d\u2019un point de vue g\u00e9om\u00e9trique et physique, la surface du territoire national et l\u2019occupation de son sol, d\u2019\u00e9laborer et de mettre \u00e0 jour l\u2019inventaire permanent des ressources foresti\u00e8res nationales.\r\n\r\nProducteur et diffuseur de r\u00e9f\u00e9rentiels faisant autorit\u00e9, de donn\u00e9es g\u00e9ographiques multith\u00e9matiques, il est \u00e9galement fournisseur de services d\u2019utilisation des donn\u00e9es.\r\n\r\nL\u2019IGN intervient en appui pour contribuer \u00e0 l\u2019analyse des territoires, faciliter la mise en oeuvre des projets d\u2019am\u00e9nagement et de d\u00e9veloppement durables comme l\u2019application des r\u00e9glementations.\r\n\r\nLes activit\u00e9s :\r\n\r\n* L'observation et la mesure de la Terre\r\n* La description du territoire\r\n* La diffusion de l'information g\u00e9ographique\r\n* La recherche, l'innovation et l'enseignement\r\n* Le conseil et l'expertise",
            "extras": {
              "datagouv_ckan_id": "7660f3e4-8883-4520-a348-fd34491aa1ca",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:12.956000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "INSTITUT NATIONAL DE L'INFORMATION GEOGRAPHIQUE ET FORESTIERE (IGN)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "18006701900430"
            },
            "id": "534fff80a3a7292c64a77e41",
            "last_modified": "2024-09-02T05:18:00.022000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/1b/e4985396724faf9f6e1122baa7b65c-original.gif",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/1b/e4985396724faf9f6e1122baa7b65c-100.gif",
            "members": [],
            "metrics": {
              "datasets": 40,
              "followers": 227,
              "members": 13,
              "reuses": 8,
              "views": 766633
            },
            "name": "Institut National de l'Information G\u00e9ographique et Foresti\u00e8re",
            "page": "https://www.data.gouv.fr/fr/organizations/institut-national-de-l-information-geographique-et-forestiere/",
            "slug": "institut-national-de-l-information-geographique-et-forestiere",
            "uri": "https://www.data.gouv.fr/api/1/organizations/institut-national-de-l-information-geographique-et-forestiere/",
            "url": null
          },
          {
            "acronym": "MENJ",
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11004301500012",
            "created_at": "2014-04-17T18:21:35.113000+00:00",
            "deleted": null,
            "description": "Le site www.education.gouv.fr propose des informations sur le fonctionnement du syst\u00e8me \u00e9ducatif, tous les niveaux d'enseignement, de la maternelle \u00e0 la terminale, les programmes, les dipl\u00f4mes, les formations, les fili\u00e8res, etc. \n\nIl donne des informations actualis\u00e9es quotidiennement sur le minist\u00e8re, sur les r\u00e9formes engag\u00e9es et la politique minist\u00e9rielle (conf\u00e9rences de presse, communiqu\u00e9s de presse, rapports, etc.). \n\nOn y trouve \u00e9galement des informations pratiques et des services (bourses, aides, modalit\u00e9s d'inscription, concours) et des renseignements sur les carri\u00e8res de l'\u00e9ducation, des ressources et des outils p\u00e9dagogiques. Cela repr\u00e9sente plus de 30 000 pages et documents.",
            "extras": {
              "datagouv_ckan_id": "30b10fe4-f2d4-4e3b-92f8-da8f0a650319",
              "datagouv_ckan_last_sync": "2014-09-17T03:30:48.557000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DE L'EDUCATION NATIONALE ET DE LA JEUNESSE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11004301500012"
            },
            "id": "534fff8fa3a7292c64a77f22",
            "last_modified": "2024-09-02T05:17:55.457000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/91/b572136a0046e59aa6bb77f16e0520-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/91/b572136a0046e59aa6bb77f16e0520-100.png",
            "members": [],
            "metrics": {
              "datasets": 198,
              "followers": 199,
              "members": 5,
              "reuses": 0,
              "views": 1599780
            },
            "name": "Minist\u00e8re de l'\u00c9ducation Nationale et de la Jeunesse",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leducation-nationale-et-de-la-jeunesse/",
            "slug": "ministere-de-leducation-nationale-et-de-la-jeunesse",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leducation-nationale-et-de-la-jeunesse/",
            "url": "http://www.education.gouv.fr"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11004601800013",
            "created_at": "2014-04-17T18:21:37.845000+00:00",
            "deleted": null,
            "description": "Le Minist\u00e8re de la culture a pour mission de rendre accessible au plus grand nombre les \u0153uvres culturelles mondiales et celles de la France.\n\nA ce titre, il conduit la politique de sauvegarde, de protection et de mise en valeur du patrimoine culturel dans toutes ses composantes, il favorise la cr\u00e9ation des \u0153uvres de l'art et de l'esprit et le d\u00e9veloppement des pratiques et de l'\u00e9ducation artistique et culturelle sur l'ensemble du territoire. Le Minist\u00e8re de la culture veille au d\u00e9veloppement des industries cr\u00e9atives et culturelles. Il contribue au d\u00e9veloppement des nouvelles technologies de diffusion et de valorisation du patrimoine culturel mat\u00e9riel et immat\u00e9riel.\n\nLes donn\u00e9es publiques en mati\u00e8re de culture et de communication sont accessibles sur une plateforme d\u00e9di\u00e9e  https://data.culture.gouv.fr synchronis\u00e9e avec la plateforme www.data.gouv.fr.\nCette initiative s\u2019inscrit dans le cadre de l\u2019engagement du Minist\u00e8re de la culture en faveur de l'ouverture et du partage des donn\u00e9es publiques, ainsi que dans le d\u00e9veloppement d\u2019une \u00e9conomie num\u00e9rique culturelle. ",
            "extras": {
              "datagouv_ckan_id": "65e4f87d-ee70-48c6-b187-3b6c12c54506",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:41.149000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DE LA CULTURE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11004601800013"
            },
            "id": "534fff91a3a7292c64a77f73",
            "last_modified": "2024-09-02T05:17:55.566000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/57/048fb19b4e40a0a6d346dfb93dcf9e-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/57/048fb19b4e40a0a6d346dfb93dcf9e-100.png",
            "members": [],
            "metrics": {
              "datasets": 172,
              "followers": 194,
              "members": 4,
              "reuses": 1,
              "views": 695669
            },
            "name": "Minist\u00e8re de la Culture",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-la-culture-et-de-la-communication/",
            "slug": "ministere-de-la-culture-et-de-la-communication",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-la-culture-et-de-la-communication/",
            "url": null
          },
          {
            "acronym": "MTE",
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11006801200050",
            "created_at": "2014-04-17T18:21:33.498000+00:00",
            "deleted": null,
            "description": "\nLe minist\u00e8re de la Transition \u00e9cologique doit concilier les urgences environnementales du pr\u00e9sent et pr\u00e9parer l\u2019avenir pour les g\u00e9n\u00e9rations futures.\n\n\n\nLe minist\u00e8re intervient \u00e0 plusieurs niveaux et notamment au travers des directions r\u00e9gionales de l\u2019environnement, de l\u2019am\u00e9nagement et du logement (DREAL) qui agissent de concert avec les directions d\u00e9partementales interminist\u00e9rielles, en particulier les directions d\u00e9partementales des territoires (DDT), pour d\u00e9ployer les politiques publiques du minist\u00e8re au plan local. Le minist\u00e8re assure \u00e9galement la tutelle de plus d\u2019une soixantaine d\u2019\u00e9tablissements publics, dont M\u00e9t\u00e9o-France, l'IGN, les agences de l\u2019eau, les parcs naturels\u2026\n\n\n\n",
            "extras": {
              "datagouv_ckan_id": "548d0a66-021b-4c25-9f0f-022b1bca6079",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:36.427000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DE LA TRANSITION ECOLOGIQUE ET DE LA COHESION DES TERRITOIRES",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11006801200050"
            },
            "id": "534fff8da3a7292c64a77eee",
            "last_modified": "2024-09-02T07:04:19.046000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 131,
              "followers": 185,
              "members": 45,
              "reuses": 6,
              "views": 1182091
            },
            "name": "Minist\u00e8re de la Transition \u00e9cologique",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-la-transition-ecologique/",
            "slug": "ministere-de-la-transition-ecologique",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-la-transition-ecologique/",
            "url": "https://www.ecologique-solidaire.gouv.fr/"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "35600000000048",
            "created_at": "2014-04-17T18:21:25.359000+00:00",
            "deleted": null,
            "description": "\nSoci\u00e9t\u00e9 anonyme \u00e0 capitaux 100 % publics depuis le 1er mars 2010, Le Groupe La Poste est un mod\u00e8le original de groupe multi-m\u00e9tiers structur\u00e9 autour de quatre activit\u00e9s : le Courrier, le Colis/Express, La Banque Postale et l\u2019Enseigne La Poste.",
            "extras": {
              "datagouv_ckan_id": "fbc3ebe1-28ee-4a0c-86da-432b71f5f9da",
              "datagouv_ckan_last_sync": "2014-09-17T03:31:21.785000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "LA POSTE (DIRECTION GENERALE DE LA POSTE)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "False",
              "siretisation:found_siret": "35600000000048"
            },
            "id": "534fff85a3a7292c64a77e9c",
            "last_modified": "2024-09-02T05:18:00.328000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/cb/959f9456d141299c5648a832e0418f-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/cb/959f9456d141299c5648a832e0418f-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 17,
              "followers": 175,
              "members": 8,
              "reuses": 0,
              "views": 321151
            },
            "name": "La Poste",
            "page": "https://www.data.gouv.fr/fr/organizations/la-poste/",
            "slug": "la-poste",
            "uri": "https://www.data.gouv.fr/api/1/organizations/la-poste/",
            "url": null
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11000035300034",
            "created_at": "2014-04-17T18:20:40.326000+00:00",
            "deleted": null,
            "description": "L\u2019Autorit\u00e9 de r\u00e9gulation des communications \u00e9lectroniques et des postes et de la distribution de la presse (Arcep) a \u00e9t\u00e9 cr\u00e9\u00e9e par la loi du 26 juillet 1996 pour pr\u00e9parer et accompagner l\u2019ouverture \u00e0 la concurrence du secteur et veiller \u00e0 la fourniture et au financement du service universel des t\u00e9l\u00e9communications. La loi du 20 mai 2005 relative \u00e0 la r\u00e9gulation des activit\u00e9s postales a \u00e9tendu la comp\u00e9tence de l\u2019Autorit\u00e9 au secteur postal. Autorit\u00e9 administrative ind\u00e9pendante, l\u2019Arcep assure, au nom de l\u2019Etat, et sous le contr\u00f4le du Parlement et du juge, la r\u00e9gulation des secteurs des communications \u00e9lectroniques et postales. Depuis la loi sur la modernisation de la distribution de la presse en octobre 2019, l\u2019Arcep exerce \u00e9galement la mission de r\u00e9gulation du secteur de la distribution group\u00e9e de la presse.",
            "extras": {
              "datagouv_ckan_id": "aa3100b5-e0aa-4b85-a860-6a2bfec2c8f0",
              "datagouv_ckan_last_sync": "2014-09-17T03:30:04.776000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "AUTORITE DE REGULATION DES COMMUNICATIONS ELECTRONIQUES, DES POSTES ET DE LA DISTRIBUTION DE LA PRESSE (ARCEP)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11000035300034"
            },
            "id": "534fff58a3a7292c64a77cf6",
            "last_modified": "2024-09-02T07:02:46.741000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/1f/047bb9cae647e9bf0bb222412f0dc3-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/1f/047bb9cae647e9bf0bb222412f0dc3-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 17,
              "followers": 172,
              "members": 4,
              "reuses": 5,
              "views": 444219
            },
            "name": "Autorit\u00e9 de r\u00e9gulation des communications \u00e9lectroniques, des postes et de la distribution de la presse (ARCEP)",
            "page": "https://www.data.gouv.fr/fr/organizations/autorite-de-regulation-des-communications-electroniques-des-postes-et-de-la-distribution-de-la-presse-arcep/",
            "slug": "autorite-de-regulation-des-communications-electroniques-des-postes-et-de-la-distribution-de-la-presse-arcep",
            "uri": "https://www.data.gouv.fr/api/1/organizations/autorite-de-regulation-des-communications-electroniques-des-postes-et-de-la-distribution-de-la-presse-arcep/",
            "url": "http://www.arcep.fr"
          },
          {
            "acronym": "MESRI",
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11004401300040",
            "created_at": "2014-04-17T18:21:36.262000+00:00",
            "deleted": null,
            "description": "Le [Minist\u00e8re de l'Enseignement sup\u00e9rieur et de la Recherche](http://www.enseignementsup-recherche.gouv.fr) pr\u00e9pare et met en \u0153uvre la politique du gouvernement relative au d\u00e9veloppement de l\u2019enseignement sup\u00e9rieur, de la recherche et de la technologie. Il d\u00e9finit et suit la politique en mati\u00e8re d\u2019innovation. Il participe \u00e0 la promotion des sciences et des technologies et \u00e0 la diffusion de la culture scientifique, technologique et industrielle, ainsi qu'\u00e0 l'\u00e9laboration et \u00e0 la mise en \u0153uvre de la politique du gouvernement en faveur du d\u00e9veloppement et de la diffusion des usages du num\u00e9rique dans la soci\u00e9t\u00e9 et l'\u00e9conomie.\n\nLes donn\u00e9es publiques en mati\u00e8re d'enseignement sup\u00e9rieur, de recherche et de l'innovation sont accessibles sur une plateforme d\u00e9di\u00e9e ([https://data.enseignementsup-recherche.gouv.fr](https://data.enseignementsup-recherche.gouv.fr)) synchronis\u00e9e avec la plateforme www.data.gouv.fr. le Minist\u00e8re propose \u00e9galement un moteur de recherche des diff\u00e9rentes ressources en donn\u00e9es (applications, tableaux de bord, API, publications) sur ses domaines : [#dataESR](https://data.esr.gouv.fr/FR/).\n\nCette initiative s\u2019inscrit dans le cadre de l\u2019engagement du minist\u00e8re de de l\u2019Enseignement sup\u00e9rieur, de la Recherche et de l'innovation en faveur de l\u2019open data et de sa strat\u00e9gie num\u00e9rique pour l\u2019enseignement sup\u00e9rieur et la recherche.",
            "extras": {
              "datagouv_ckan_id": "16f6b100-8c38-4874-a05b-9a0496eda1a7",
              "datagouv_ckan_last_sync": "2014-09-17T03:30:50.972000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11004401300040"
            },
            "id": "534fff90a3a7292c64a77f45",
            "last_modified": "2024-09-02T05:17:55.136000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/30/daafde21354471af38bc4a570ab9f6-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/30/daafde21354471af38bc4a570ab9f6-100.png",
            "members": [],
            "metrics": {
              "datasets": 253,
              "followers": 152,
              "members": 6,
              "reuses": 25,
              "views": 576241
            },
            "name": "Minist\u00e8re de l'Enseignement sup\u00e9rieur et de la Recherche",
            "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-lenseignement-superieur-et-de-la-recherche/",
            "slug": "ministere-de-lenseignement-superieur-et-de-la-recherche",
            "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-lenseignement-superieur-et-de-la-recherche/",
            "url": "http://www.enseignementsup-recherche.gouv.fr/"
          },
          {
            "acronym": null,
            "badges": [],
            "business_number_id": "52458062800013",
            "created_at": "2015-01-09T16:35:44.035000+00:00",
            "deleted": null,
            "description": "Nous avons pour ambition de rendre accessible les donn\u00e9es ouvertes au plus grand nombre via une interface simple de consultation. DataFrance s\u2019inscrit dans le mouvement open data et veut contribuer \u00e0 promouvoir une plus large ouverture des donn\u00e9es dans l\u2019int\u00e9r\u00eat de tout public.",
            "extras": {
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "DATAFRANCE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "False",
              "siretisation:found_siret": "52458062800013"
            },
            "id": "54aff550c751df34bd381279",
            "last_modified": "2024-07-24T07:51:49.494000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/2015-01-09/d0b08844d828411fabd93dfe16cec790/logo-datafrance-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/2015-01-09/d0b08844d828411fabd93dfe16cec790/logo-datafrance-100.png",
            "members": [],
            "metrics": {
              "datasets": 0,
              "followers": 150,
              "members": 3,
              "reuses": 7,
              "views": 734
            },
            "name": "DataFrance",
            "page": "https://www.data.gouv.fr/fr/organizations/datafrance/",
            "slug": "datafrance",
            "uri": "https://www.data.gouv.fr/api/1/organizations/datafrance/",
            "url": "http://datafrance.info"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "18003502402369",
            "created_at": "2014-04-17T18:20:44.213000+00:00",
            "deleted": null,
            "description": "Assureur solidaire en sant\u00e9, la Cnam d\u00e9finit les politiques de gestion du risque et pilote le r\u00e9seau d'organismes charg\u00e9s de les mettre en \u0153uvre.\nDans le cadre de la loi de r\u00e9forme d'ao\u00fbt 2004, la Caisse nationale de l'assurance maladie (Cnam) a vu ses responsabilit\u00e9s compl\u00e9t\u00e9es, renforc\u00e9es et soutenues par des outils qui lui permettent d'optimiser le fonctionnement du syst\u00e8me de soins.\nElle met en \u0153uvre le parcours de soins coordonn\u00e9s en pla\u00e7ant le m\u00e9decin traitant au c\u0153ur du syst\u00e8me. Elle veille \u00e0 l'\u00e9quilibre des d\u00e9penses avec les ressources publiques qui lui sont affect\u00e9es. Elle est ainsi l'acteur central du syst\u00e8me de soins dont elle assure la ma\u00eetrise m\u00e9dicalis\u00e9e.\n\n\n\n",
            "extras": {
              "datagouv_ckan_id": "47d8e24c-5d03-4598-b71b-6a70011b7c38",
              "datagouv_ckan_last_sync": "2014-09-17T03:30:10.245000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "CAISSE NATIONALE DE L'ASSURANCE MALADIE (CNAM)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "18003502402369"
            },
            "id": "534fff5ca3a7292c64a77d1a",
            "last_modified": "2024-09-02T00:31:15.391000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/1e/3ae33c736f41fe8ed91bb9897e010d-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/1e/3ae33c736f41fe8ed91bb9897e010d-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 32,
              "followers": 144,
              "members": 14,
              "reuses": 0,
              "views": 199660
            },
            "name": "Caisse nationale de l'assurance maladie",
            "page": "https://www.data.gouv.fr/fr/organizations/caisse-nationale-de-l-assurance-maladie-des-travailleurs-salaries/",
            "slug": "caisse-nationale-de-l-assurance-maladie-des-travailleurs-salaries",
            "uri": "https://www.data.gouv.fr/api/1/organizations/caisse-nationale-de-l-assurance-maladie-des-travailleurs-salaries/",
            "url": "https://www.ameli.fr/"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "40356835500024",
            "created_at": "2014-04-17T18:22:00.473000+00:00",
            "deleted": null,
            "description": "http://data.iledefrance.fr",
            "extras": {
              "datagouv_ckan_id": "07e2a61d-960e-4d6c-b3a2-9d1fb4701731",
              "datagouv_ckan_last_sync": "2014-09-17T03:32:22.876000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "REGION ILE DE FRANCE",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "False",
              "siretisation:found_siret": "40356835500024"
            },
            "id": "534fffa8a3a7292c64a780c8",
            "last_modified": "2024-09-02T05:17:59.499000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/9b/01f5340aaa44ad8ead413ad8a29b6e-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/9b/01f5340aaa44ad8ead413ad8a29b6e-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 1025,
              "followers": 122,
              "members": 2,
              "reuses": 6,
              "views": 1705630
            },
            "name": "R\u00e9gion \u00cele-de-France",
            "page": "https://www.data.gouv.fr/fr/organizations/region-ile-de-france/",
            "slug": "region-ile-de-france",
            "uri": "https://www.data.gouv.fr/api/1/organizations/region-ile-de-france/",
            "url": "http://data.iledefrance.fr"
          },
          {
            "acronym": null,
            "badges": [
              {
                "kind": "public-service"
              },
              {
                "kind": "certified"
              }
            ],
            "business_number_id": "11000012200033",
            "created_at": "2014-04-17T18:20:49.757000+00:00",
            "deleted": null,
            "description": "La <a Href=\"http://www.cnil.fr\" target=\"_blank\">Commission nationale de l\u2019informatique et des libert\u00e9s</a> est l'autorit\u00e9 administrative ind\u00e9pendante en charge de la protection des donn\u00e9es personnelles en France. \n\nEn tant que r\u00e9gulateur, elle veille au respect du r\u00e8glement g\u00e9n\u00e9ral sur la protection des donn\u00e9es (RGPD) et de la loi Informatique et Libert\u00e9s modifi\u00e9e : \n\n- elle **conseille et accompagne** les responsables de projets num\u00e9riques ;\n\n- elle accompagne les **d\u00e9l\u00e9gu\u00e9s \u00e0 la protection des donn\u00e9es (DPO)** d\u00e9sign\u00e9s par les entreprises, les associations et les services publics ; \n\n- elle analyse les cons\u00e9quences des **innovations technologiques** sur la vie priv\u00e9e et les libert\u00e9s, et \u00e9met des **recommandations** ; \n\n- elle **autorise** les traitements de donn\u00e9es pr\u00e9sentant une **sensibilit\u00e9 particuli\u00e8re** ;\n\n- elle a un pouvoir de **contr\u00f4le** et de **sanction administrative** ; \n\n- enfin, elle travaille en **\u00e9troite collaboration avec ses homologues** europ\u00e9ens et internationaux.\n\n<br /><br />\n\n\n",
            "extras": {
              "datagouv_ckan_id": "70d0698e-fb6b-464e-9b43-2ddfe34c4624",
              "datagouv_ckan_last_sync": "2014-09-17T03:30:20.866000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "COMMISSION NATIONALE DE L'INFORMATIQUE ET DES LIBERTES (CNIL)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "True",
              "siretisation:found_siret": "11000012200033"
            },
            "id": "534fff61a3a7292c64a77d59",
            "last_modified": "2024-09-02T00:27:33.979000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/43/4f3dcc999b4e34b7cccf57f64f0b17-original.jpg",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/43/4f3dcc999b4e34b7cccf57f64f0b17-100.jpg",
            "members": [],
            "metrics": {
              "datasets": 16,
              "followers": 121,
              "members": 1,
              "reuses": 1,
              "views": 183692
            },
            "name": "CNIL",
            "page": "https://www.data.gouv.fr/fr/organizations/cnil/",
            "slug": "cnil",
            "uri": "https://www.data.gouv.fr/api/1/organizations/cnil/",
            "url": "https://www.cnil.fr/"
          },
          {
            "acronym": null,
            "badges": [],
            "business_number_id": "81452990500014",
            "created_at": "2014-04-17T18:21:50.485000+00:00",
            "deleted": null,
            "description": "Open Food Facts r\u00e9pertorie les produits alimentaires du monde entier.\r\nLes informations sur les aliments (photos, ingr\u00e9dients, composition nutritionnelle etc.) sont collect\u00e9es de fa\u00e7on collaborative et mises \u00e0 disposition de tous et pour tous usages dans une base de donn\u00e9es ouverte, libre et gratuite.\r\n\r\nCes donn\u00e9es sont ensuite r\u00e9utilisables et redistribuables librement et gratuitement pour :\r\n\r\n- Vous aider \u00e0 faire de meilleurs choix\r\n- Inciter les industriels \u00e0 proposer des produits plus sains\r\n- Aider la recherche\r\n",
            "extras": {
              "datagouv_ckan_id": "45cae233-d944-4dbc-83df-9257dad71a58",
              "datagouv_ckan_last_sync": "2014-09-17T03:32:03.792000",
              "siretisation:collectivite_territoriale:code_insee": "nan",
              "siretisation:collectivite_territoriale:niveau": "nan",
              "siretisation:denomination_unite_legale": "OPEN FOOD FACTS (OFF)",
              "siretisation:est_collectivite_territoriale": "False",
              "siretisation:est_service_public": "False",
              "siretisation:found_siret": "81452990500014"
            },
            "id": "534fff9ea3a7292c64a78049",
            "last_modified": "2024-09-02T00:30:23.070000+00:00",
            "logo": "https://static.data.gouv.fr/avatars/b3/9cc0c7e967416c8994d485701ae5e1-original.png",
            "logo_thumbnail": "https://static.data.gouv.fr/avatars/b3/9cc0c7e967416c8994d485701ae5e1-100.png",
            "members": [],
            "metrics": {
              "datasets": 2,
              "followers": 111,
              "members": 13,
              "reuses": 10,
              "views": 46292
            },
            "name": "Open Food Facts",
            "page": "https://www.data.gouv.fr/fr/organizations/open-food-facts/",
            "slug": "open-food-facts",
            "uri": "https://www.data.gouv.fr/api/1/organizations/open-food-facts/",
            "url": null
          }
        ],
        "next_page": "https://www.data.gouv.fr/api/1/organizations/?sort=-followers&page=2",
        "page": 1,
        "page_size": 20,
        "previous_page": null,
        "total": 4706
      });
    }),
    http.get('*/api/1/datasets/extensions/*', async () => {
      await delay();
      return HttpResponse.json([
        "tar",
        "gz",
        "tgz",
        "rar",
        "zip",
        "7z",
        "xz",
        "bz2",
        "csv",
        "txt",
        "json",
        "pdf",
        "xml",
        "rtf",
        "xsd",
        "ods",
        "odt",
        "odp",
        "odg",
        "xls",
        "xlsx",
        "doc",
        "docx",
        "pps",
        "ppt",
        "jpeg",
        "jpg",
        "jpe",
        "gif",
        "png",
        "dwg",
        "svg",
        "tiff",
        "ecw",
        "svgz",
        "jp2",
        "shp",
        "kml",
        "kmz",
        "gpx",
        "shx",
        "ovr",
        "geojson",
        "gpkg",
        "grib2",
        "rdf",
        "ttl",
        "n3",
        "dbf",
        "prj",
        "sql",
        "sqlite",
        "db",
        "epub",
        "sbn",
        "sbx",
        "cpg",
        "lyr",
        "owl",
        "dxf",
        "ics",
        "ssim",
        "other",
        "ics",
        "jsonl.gz",
        "jsonl.bz2",
        "jsonl",
        "parquet",
        "shz",
        "yaml",
        "yml"
      ]);
    }),
    http.get('*/recherche-entreprises.api.gouv.fr/search/*', async () => {
      await delay();
      return HttpResponse.json({
        "results": [
            {
                "siren": "130025265",
                "nom_complet": "DIRECTION INTERMINISTERIELLE DU NUMERIQUE (DINUM)",
                "nom_raison_sociale": "DIRECTION INTERMINISTERIELLE DU NUMERIQUE",
                "sigle": "DINUM",
                "nombre_etablissements": 1,
                "nombre_etablissements_ouverts": 1,
                "siege": {
                    "activite_principale": "84.11Z",
                    "activite_principale_registre_metier": null,
                    "annee_tranche_effectif_salarie": "2021",
                    "adresse": "20 AVENUE DE SEGUR 75007 PARIS",
                    "caractere_employeur": "N",
                    "cedex": null,
                    "code_pays_etranger": null,
                    "code_postal": "75007",
                    "commune": "75107",
                    "complement_adresse": null,
                    "coordonnees": "48.850699,2.308628",
                    "date_creation": "2017-05-24",
                    "date_debut_activite": "2017-05-24",
                    "date_fermeture": null,
                    "date_mise_a_jour": null,
                    "date_mise_a_jour_insee": "2024-03-30T02:31:29",
                    "departement": "75",
                    "distribution_speciale": null,
                    "epci": "200054781",
                    "est_siege": true,
                    "etat_administratif": "A",
                    "geo_adresse": "20 Avenue de Ségur 75007 Paris",
                    "geo_id": "75107_8909_00020",
                    "indice_repetition": null,
                    "latitude": "48.850699",
                    "libelle_cedex": null,
                    "libelle_commune": "PARIS",
                    "libelle_commune_etranger": null,
                    "libelle_pays_etranger": null,
                    "libelle_voie": "DE SEGUR",
                    "liste_enseignes": null,
                    "liste_finess": null,
                    "liste_id_bio": null,
                    "liste_idcc": null,
                    "liste_id_organisme_formation": null,
                    "liste_rge": null,
                    "liste_uai": null,
                    "longitude": "2.308628",
                    "nom_commercial": null,
                    "numero_voie": "20",
                    "region": "11",
                    "siret": "13002526500013",
                    "statut_diffusion_etablissement": "O",
                    "tranche_effectif_salarie": "22",
                    "type_voie": "AVENUE"
                },
                "activite_principale": "84.11Z",
                "categorie_entreprise": "PME",
                "caractere_employeur": null,
                "annee_categorie_entreprise": "2021",
                "date_creation": "2017-05-24",
                "date_fermeture": null,
                "date_mise_a_jour": "2024-09-10T07:59:51",
                "date_mise_a_jour_insee": "2024-03-22T14:26:06",
                "date_mise_a_jour_rne": null,
                "dirigeants": [],
                "etat_administratif": "A",
                "nature_juridique": "7120",
                "section_activite_principale": "O",
                "tranche_effectif_salarie": "22",
                "annee_tranche_effectif_salarie": "2021",
                "statut_diffusion": "O",
                "matching_etablissements": [
                    {
                        "activite_principale": "84.11Z",
                        "ancien_siege": false,
                        "annee_tranche_effectif_salarie": "2021",
                        "adresse": "20 AVENUE DE SEGUR 75007 PARIS",
                        "caractere_employeur": "N",
                        "code_postal": "75007",
                        "commune": "75107",
                        "date_creation": "2017-05-24",
                        "date_debut_activite": "2017-05-24",
                        "date_fermeture": null,
                        "epci": "200054781",
                        "est_siege": true,
                        "etat_administratif": "A",
                        "geo_id": "75107_8909_00020",
                        "latitude": "48.850699",
                        "libelle_commune": "PARIS",
                        "liste_enseignes": null,
                        "liste_finess": null,
                        "liste_id_bio": null,
                        "liste_idcc": null,
                        "liste_id_organisme_formation": null,
                        "liste_rge": null,
                        "liste_uai": null,
                        "longitude": "2.308628",
                        "nom_commercial": null,
                        "region": "11",
                        "siret": "13002526500013",
                        "statut_diffusion_etablissement": "O",
                        "tranche_effectif_salarie": "22"
                    }
                ],
                "finances": {},
                "complements": {
                    "collectivite_territoriale": null,
                    "convention_collective_renseignee": false,
                    "liste_idcc": null,
                    "egapro_renseignee": false,
                    "est_association": false,
                    "est_bio": false,
                    "est_entrepreneur_individuel": false,
                    "est_entrepreneur_spectacle": false,
                    "est_ess": false,
                    "est_finess": false,
                    "est_organisme_formation": false,
                    "est_qualiopi": false,
                    "liste_id_organisme_formation": null,
                    "est_rge": false,
                    "est_service_public": true,
                    "est_siae": false,
                    "est_societe_mission": false,
                    "est_uai": false,
                    "identifiant_association": null,
                    "statut_entrepreneur_spectacle": null,
                    "type_siae": null
                }
            }
        ],
        "total_results": 1,
        "page": 1,
        "per_page": 10,
        "total_pages": 1
    });
    }),

  ]
};
