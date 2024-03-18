import Search from "./Search.vue";

export default {
  title: 'Components/Search',
  component: Search,
};

const sampleResults = JSON.stringify([
  {
    "id": "57343feb88ee3823b0d1b934",
    "title": "Référentiel de l'organisation administrative de l'Etat",
    "acronym": null,
    "slug": "referentiel-de-lorganisation-administrative-de-letat",
    "description": "[Le décret du 14 mars 2017](https://www.legifrance.gouv.fr/eli/decret/2017/3/14/PRMJ1636987D/jo/texte) a institué le **Service Public de la Donnée**.\n\nCelui-ci met à la disposition du public **9 jeux de  données de référence** parmi lesquels la base nationale de l’organisation administrative de l’Etat, produite et diffusée par la Dila sur son site [service-public.fr](https://lannuaire.service-public.fr/).\n\nLe Référentiel de l’organisation administrative de l’Etat, nouvelle appellation de la base, comprend toutes les institutions régies par la Constitution de la Ve République et les administrations qui en dépendent, soit environ 6000 organismes.\nLe périmètre couvre **les services centraux de l’Etat**, jusqu’au niveau des bureaux. \n\nLe référentiel comprend les missions, l’organisation hiérarchique des services et leurs coordonnées complètes. \n\n**_REMARQUE IMPORTANTE :_ A compter du 4 juillet 2022, ce jeu de données change de format et de structure. Les données sont au format json. [Une spécification détaillée est précisée.](https://echanges.dila.gouv.fr/OPENDATA/RefOrgaAdminEtat/Documentation/Sp%c3%a9cifications-datagouv-r%c3%a9f%c3%a9rentiel-organisation-administrative-de-l-Etat_V1.1.pdf)**\n\n[Accéder à l'historique des versions](https://echanges.dila.gouv.fr/OPENDATA/RefOrgaAdminEtat/FluxHistorique/)\n\n**Pour accéder au répertoire des données sous le protocole ftps, contacter le service Administration des données de la Dila à l’adresse suivante :** [donnees-dila@dila.gouv.fr](donnees-dila@dila.gouv.fr)\n\nVous pouvez nous écrire ou vous abonner à une alerte par mail adressé à : [donnees-dila@dila.gouv.fr](donnees-dila@dila.gouv.fr)",
    "created_at": "2016-05-12T10:33:46.890000+00:00",
    "last_modified": "2023-09-11T09:02:14.306000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "administration",
      "administration-generale",
      "administration-publique",
      "annuaire",
      "annuaire-de-services",
      "autorites-publiques",
      "base",
      "coordonnees",
      "coordonnees-geographiques",
      "dila",
      "nationale",
      "organisation-administrative",
      "organisme-public",
      "referentiel",
      "service-public",
      "services-d-utilite-publique",
      "services-de-l-etat"
    ],
    "badges": [
      {
        "kind": "spd"
      }
    ],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/57343feb88ee3823b0d1b934/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=57343feb88ee3823b0d1b934&page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "frequency": "punctual",
    "frequency_date": null,
    "extras": {
      "recommendations-externals": [
        {
          "id": "https://lannuaire.service-public.fr/",
          "score": 50,
          "source": "edito",
          "messages": {
            "en": {
              "title": "Are you looking for a public service, an administration or a contact point?",
              "message": "L’Annuaire de l’administration allows you to easily find all the contacts for your relations with public services (town hall, prefecture, ministry, etc.).",
              "button": "Visit « l’Annuaire de l’administration »"
            },
            "fr": {
              "title": "Vous cherchez un service public, une administration ou un contact ?",
              "message": "L’Annuaire de l’administration vous permet de retrouver facilement tous les contacts pour vos relations avec les services publics (mairie, préfecture, ministère, etc.).",
              "button": "Consulter « l’Annuaire de l’administration »"
            }
          }
        }
      ],
      "recommendations:sources": [
        "edito"
      ]
    },
    "metrics": {
      "discussions": 16,
      "reuses": 4,
      "followers": 20,
      "views": 20414
    },
    "organization": {
      "name": "Première ministre",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/premiere-ministre/",
      "slug": "premiere-ministre",
      "page": "https://dev.data.gouv.fr/fr/organizations/premiere-ministre/",
      "logo": "https://dev-static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fffa5a3a7292c64a7809e",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2016-05-12",
      "end": "2036-05-12"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/referentiel-de-lorganisation-administrative-de-letat/",
    "page": "https://dev.data.gouv.fr/fr/datasets/referentiel-de-lorganisation-administrative-de-letat/",
    "last_update": "2023-10-16T09:20:53.934951+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2016-05-12T10:33:46.890000+00:00",
      "last_modified_internal": "2023-09-11T09:02:14.306000+00:00"
    }
  },
  {
    "id": "621df2954fa5a3b5a023e23c",
    "title": "Bases statistiques communale et départementale de la délinquance enregistrée par la police et la gendarmerie nationales ",
    "acronym": "base",
    "slug": "bases-statistiques-communale-et-departementale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales",
    "description": "Dans le cadre de leur activité judiciaire, les forces de sécurité (services de police et unités de gendarmerie) sont amenées à rédiger des procédures relatives à des infractions, avant de les transmettre à l’autorité judiciaire qui est susceptible de les requalifier par la suite. Ces infractions ont pu être constatées suite à une plainte déposée par une victime, à un signalement, un témoignage, un flagrant délit, une dénonciation, etc., mais aussi sur l’initiative des forces de sécurité.\n\nDepuis 1972, les services de sécurité (police et gendarmerie) se sont dotées d’un outil standardisé de mesure de l’activité judiciaire des services basé sur des comptages mensuels, appelé « État 4001 ». Ce document administratif porte sur les crimes et les délits (à l’exclusion des contraventions et des délits routiers), enregistrés pour la première fois par les forces de sécurité et portés à la connaissance de l’institution judiciaire. Les infractions y sont classées en 107 catégories (appelés « index »), très hétérogènes par la nature et la gravité des faits, mais aussi par le nombre d’infractions constatées chaque mois. Selon l’index, l’unité de compte retenue peut varier : elle peut être la victime par exemple en matière de violence sexuelle, l’auteur par exemple en matière d’usage ou d’usage revente de stupéfiants ou encore le véhicule en matière de vol de véhicule, etc. Cela implique qu’il n’est pas pertinent de constituer des agrégats regroupant des index n’ayant pas la même unité de compte.\n\nDepuis sa création fin 2014, le Service statistique ministériel de la sécurité intérieure ([SSMSI](https://www.interieur.gouv.fr/Interstats/Qui-sommes-nous)) expertise et fiabilise ces différents index et diffuse des indicateurs choisis et construits à partir de regroupements de ces index. \n\nLa disponibilité, depuis le printemps 2016, de bases de données détaillées sur les infractions constatées a permis la construction de catégories statistiques plus fines que celles de « l’état 4001» (comptages historiques suivis par le ministère de l’Intérieur) : repérage des violences intrafamiliales, analyses par types de victimes ou selon la localisation des faits (par exemple dans les transports en commun).\n\n**Afin de favoriser l’ouverture des données sur la délinquance et l’insécurité, le SSMSI met à disposition, depuis mars 2022,  deux bases de données annuelles sur les principaux indicateurs des crimes et délits enregistrés par la police et la gendarmerie nationales, depuis 2016 : l’une à l’échelle communale et l’autre à l’échelle départementale, toutes deux selon le lieu de commission.** \nCes bases ont vocation à être enrichies au fur et à mesure que les données pour d’autres indicateurs seront fiabilisées.\n\n_Calendrier des enrichissements/modifications :\n   Mars 2022 : création des bases communale et départementale ;\n   Juin 2022: rectification de la valeur de certains taux départementaux de délinquance pour 1000 habitants/logements. Pour les départements de Paris, du Rhône et des Bouches-du-Rhône, les       habitants/logements de Paris, Lyon et Marseille ont été comptés en double (en sommant la population de la commune et celle de ses arrondissements). Ceci a induit une erreur dans les taux de délinquance pour 1 000 habitants/logements de ces départements ;\n   Septembre 2022 : intégration de la géographie des communes connue au 1er janvier 2022 ;\n   Mars 2023 : ajout de l’indicateur relatif aux destructions et dégradations volontaires, extension du champ géographique aux DROM et ajout des arrondissements de Paris, Lyon et Marseille;\n   Juillet 2023 : ajouts des indicateurs relatifs à l’usage et au trafic de stupéfiants ;\n   Septembre 2023 (à venir) : ajout des arrondissements de Paris, Lyon et Marseille pour les indicateurs usage et trafic de stupéfiants._\n \nLes données diffusées sont limitées aux communes pour lesquelles plus de 5 faits ont été enregistrés pendant 3 années successives. Cette précaution est motivée : d’une part par la fragilité des estimations sur des communes qui enregistrent peu de faits de délinquance ([Interstats Analyse n°56, mars 2023](https://www.interieur.gouv.fr/Interstats/Actualites/Interstats-Analyse-n-56-Geographie-de-la-delinquance-a-l-echelle-communale-en-2022)), d’autre part par le secret statistique qui ne doit pas permettre, par le croisement de multiples sources, de déduire des informations individuelles sur les personnes concernées dans ces procédures. Cette précaution doit notamment être appréciée au regard de la sensibilité de certaines atteintes comme les violences sexuelles. La base de données diffusée fournit également l'information sur l'absence de faits enregistrés lorsqu’elle se reproduit sur 3 années successives. Les données communales de délinquance ventilées par lieu de commission en 2014 et en 2015 n’étant pas disponibles, les données communales de 2016 et de 2017 sont diffusées si les critères de diffusion pour l’année 2018 sont vérifiés. \n\nOutre les indicateurs des crimes et délits, la base communale comporte des données informatives relatives à la commune où se sont produits les faits, telles que les codes officiels géographiques de la commune, du département et de la région d’appartenance, leurs libellés respectifs, les populations résidentes correspondantes,… (pour plus de détails se référer à l’espace Documentation ci-dessous)\n\n\n**Dernière mise à jour :** juillet 2023\n\n",
    "created_at": "2022-03-01T11:16:53.477000+00:00",
    "last_modified": "2023-07-19T08:08:41.035000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "communes",
      "crime",
      "crimes-et-delits",
      "departement",
      "insecurite",
      "statistiques",
      "territoires",
      "violence",
      "vol"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/621df2954fa5a3b5a023e23c/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=621df2954fa5a3b5a023e23c&page=1&page_size=50",
      "type": "GET",
      "total": 3
    },
    "frequency": "annual",
    "frequency_date": "2023-03-01T14:15:12+00:00",
    "extras": {},
    "metrics": {
      "discussions": 0,
      "reuses": 6,
      "followers": 15,
      "views": 31413
    },
    "organization": {
      "name": "Ministère de l'Intérieur et des Outre-Mer",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-linterieur-et-des-outre-mer/",
      "slug": "ministere-de-linterieur-et-des-outre-mer",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-linterieur-et-des-outre-mer/",
      "logo": "https://dev-static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff91a3a7292c64a77f53",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2016-01-01",
      "end": "2021-12-31"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:commune"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/bases-statistiques-communale-et-departementale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/",
    "page": "https://dev.data.gouv.fr/fr/datasets/bases-statistiques-communale-et-departementale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/",
    "last_update": "2023-07-19T08:08:41.022000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2022-03-01T11:16:53.477000+00:00",
      "last_modified_internal": "2023-07-19T08:08:41.035000+00:00"
    }
  },
  {
    "id": "586a824588ee3835ec3f4e61",
    "title": "Fichier des prénoms - Edition 2016 (voir Fichier des prénoms de 1900 à 2019)",
    "acronym": null,
    "slug": "fichier-des-prenoms-edition-2016-voir-fichier-des-prenoms-de-1900-a-2019",
    "description": "En raison de la mise à jour de ce jeu de données par ajout d'années supplémentaires, veuillez svp vous reporter au jeu de données \"Fichier des prénoms de 1900 à 2019\" sur data.gouv.fr.\n\n",
    "created_at": "2017-01-02T17:39:33.975000+00:00",
    "last_modified": "2021-03-30T18:22:57.171000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "etat-civil",
      "naissances",
      "prenom",
      "prenoms"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/586a824588ee3835ec3f4e61/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 5
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=586a824588ee3835ec3f4e61&page=1&page_size=50",
      "type": "GET",
      "total": 1
    },
    "frequency": "annual",
    "frequency_date": "2018-01-02T17:34:34+00:00",
    "extras": {},
    "metrics": {
      "discussions": 7,
      "reuses": 20,
      "followers": 16,
      "views": 9944
    },
    "organization": {
      "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
      "page": "https://dev.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "logo": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff81a3a7292c64a77e5c",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "1900-01-01",
      "end": "2015-12-31"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:departement"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/fichier-des-prenoms-edition-2016-voir-fichier-des-prenoms-de-1900-a-2019/",
    "page": "https://dev.data.gouv.fr/fr/datasets/fichier-des-prenoms-edition-2016-voir-fichier-des-prenoms-de-1900-a-2019/",
    "last_update": "2023-09-15T10:33:38.659041+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": false,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": false,
      "resources_documentation": false,
      "score": 0.6666666667
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2017-01-02T17:39:33.975000+00:00",
      "last_modified_internal": "2021-03-30T18:22:57.171000+00:00"
    }
  },
  {
    "id": "61d5e2d372a52d9f9411ff88",
    "title": "Géolocalisation des établissements du répertoire SIRENE-pour les études statistiques",
    "acronym": null,
    "slug": "geolocalisation-des-etablissements-du-repertoire-sirene-pour-les-etudes-statistiques",
    "description": "**La géolocalisation des établissements du répertoire Sirene, pour les études statistiques** est mise à disposition des utilisateurs. Les données concernent le géocodage des établissements (coordonnées X,Y) avec leur géoréférencement dans les zonages infra-communaux (IRIS, QPV, ZUS, ZFU, QVA, voir la documentation associée).\n* À compter du mois de novembre 2023, les codes commune et les Îlots regroupés pour l’information statistique (IRIS) utilisent les informations géographiques de 2023.\n* Le fichier **mensuel** correspond aux établissements dont **les données sont diffusibles** et présents **dans la base Sirene au 1er du mois**.\n* Il est **mis en ligne le 21 du mois** avec les informations géographiques suivantes : siret, coordonnées (X,Y), code commune, variables de qualité de la géolocalisation, positionnement dans les zonages (IRIS, QPV, ZUS, ZFU, QVA).\n* La géolocalisation concerne **le territoire français hors Mayotte** (Métropole, Guadeloupe, Martinique, Guyane, La Réunion). Le codage utilisé pour la métropole suit le système géodésique RGF93 Lambert 93, pour les Dom le système est différent (voir la documentation associée).\n* La géolocalisation est réalisée par une application de **géocodage automatique** développée à l’Insee. Celle-ci est adossée à un référentiel d’adresses géolocalisées construit à partir du Répertoire d’Immeubles Localisés (RIL), qui intègre **les coordonnées géographiques des adresses positionnées à l’accès du bâtiment** pour les besoins du Recensement de la Population dans les communes de plus de 10 000 habitants, et de **la géolocalisation des parcelles cadastrales.**\n* La géolocalisation **des établissements actifs de 200 salariés ou plus** a été systématiquement **vérifiée** par des gestionnaires de reprise de géolocalisation, ainsi que celle **des établissements de 20 à 199 salariés** pour lesquels la géolocalisation automatique est incertaine.  \n",
    "created_at": "2022-01-05T19:26:27.679000+00:00",
    "last_modified": "2023-10-17T14:41:19.760000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "cadastre",
      "commune",
      "etablissement",
      "geocodage",
      "geolocalisation",
      "sirene",
      "siret"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/61d5e2d372a52d9f9411ff88/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=61d5e2d372a52d9f9411ff88&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "monthly",
    "frequency_date": "2022-02-05T20:10:34+00:00",
    "extras": {},
    "metrics": {
      "discussions": 14,
      "reuses": 4,
      "followers": 12,
      "views": 20008
    },
    "organization": {
      "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
      "page": "https://dev.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "logo": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff81a3a7292c64a77e5c",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2022-01-21",
      "end": "2022-02-21"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/geolocalisation-des-etablissements-du-repertoire-sirene-pour-les-etudes-statistiques/",
    "page": "https://dev.data.gouv.fr/fr/datasets/geolocalisation-des-etablissements-du-repertoire-sirene-pour-les-etudes-statistiques/",
    "last_update": "2023-10-17T14:41:19.750000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 0.8888888889
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2022-01-05T19:26:27.679000+00:00",
      "last_modified_internal": "2023-10-17T14:41:19.760000+00:00"
    }
  },
  {
    "id": "649998d50f6f27459dc6cf5b",
    "title": "Bureaux de vote et adresses de leurs électeurs",
    "acronym": null,
    "slug": "bureaux-de-vote-et-adresses-de-leurs-electeurs",
    "description": "Les fichiers de correspondance entre les bureaux de vote et les adresses des électeurs qui en dépendent permettent la construction des aires de bureaux de vote. Celles-ci facilitent la comparaison des données électorales avec les caractéristiques socio-démographiques des électeurs rattachés à ces aires. Ces fichiers sont élaborés à partir du Répertoire électoral unique (REU), institué par la loi n°2016-1048 du 1er août 2016 rénovant les modalités d’inscription sur les listes électorales, et qui a été mis en œuvre à partir du 1er janvier 2019.\n\nGéré par l’Insee, le REU a pour finalité la gestion du processus électoral et la fiabilisation des listes électorales. Il permet la mise à jour en continu des listes électorales à l’initiative, soit des communes  (et des consulats) qui procèdent aux inscriptions et radiations des électeurs, soit de l’Insee sur la base des informations transmises par différentes administrations (armées, justice, intérieur) et des données d’état-civil.\n\nLe REU contient, entre autres, l’adresse des électeurs inscrits sur les listes électorales et leur bureau de vote, ce qui permet de les mettre en correspondance. À la suite de l’avis favorable rendu par la Commission d’accès aux documents administratifs sur la publication des adresses, et en concertation avec le ministère de l’Intérieur, l’Insee a développé une méthode permettant de publier cette correspondance adresses-bureaux de vote en données ouvertes (ou open-data), tout en ne divulguant aucune information sur les noms et prénoms des personnes. Le projet a bénéficié de la collaboration de la DINUM (Etalab), l’organisme public qui coordonne la politique d’ouverture et de partage des données publiques.\n\n\n### Fichiers\n\nLes données brutes utilisées par l’Insee correspondent à une extraction des adresses du Répertoire Électoral Unique réalisée en septembre 2022. Le travail effectué sur cette extraction permet la diffusion de 2 fichiers, proposés aux formats csv et parquet :\n\n- La table des adresses normalisées et géolocalisées du REU\n- La table des bureaux de vote du REU\n\nTrois fichiers de documentation sont disponibles en accompagnement des données :\n\n- Le dictionnaire des variables de la table des adresses\n- Le dictionnaire des variables de la table des bureaux de vote\n- Un document méthodologique détaillant le travail effectué sur les données du REU\n\nLe code associé aux traitements effectués est disponible sur [Github](https://github.com/InseeFrLab/traitement-adresses-REU).\n\nLien vers l’article du blog de l’Insee qui présente un exemple de réutilisation de ces données : https://blog.insee.fr/a-vote-a-chaque-bureau-de-vote-ses-electeurs\n",
    "created_at": "2023-06-26T13:55:33.527000+00:00",
    "last_modified": "2023-06-28T12:57:35.063000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "adresses-des-electeurs",
      "bureaux-de-vote",
      "reu"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/649998d50f6f27459dc6cf5b/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 7
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=649998d50f6f27459dc6cf5b&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "punctual",
    "frequency_date": "2023-06-28T12:00:00+00:00",
    "extras": {},
    "metrics": {
      "discussions": 1,
      "reuses": 1,
      "followers": 12,
      "views": 20014
    },
    "organization": {
      "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
      "page": "https://dev.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "logo": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff81a3a7292c64a77e5c",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2022-09-30",
      "end": "2022-10-01"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/bureaux-de-vote-et-adresses-de-leurs-electeurs/",
    "page": "https://dev.data.gouv.fr/fr/datasets/bureaux-de-vote-et-adresses-de-leurs-electeurs/",
    "last_update": "2023-06-27T15:08:37.295000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2023-06-26T13:55:33.527000+00:00",
      "last_modified_internal": "2023-06-28T12:57:35.063000+00:00"
    }
  },
  {
    "id": "5cd57bf68b4c4179299eb0e9",
    "title": "Données essentielles de la commande publique - fichiers consolidés",
    "acronym": "DECP",
    "slug": "donnees-essentielles-de-la-commande-publique-fichiers-consolides",
    "description": "[L’arrêté du 14 avril 2017](https://www.legifrance.gouv.fr/eli/arrete/2017/4/14/ECFM1637256A/jo/texte), modifié par [l'arrêté du 27 juillet 2018](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000037282994&dateTexte=&categorieLien=id), est entré en vigueur le 1er octobre 2018, et avec lui l’obligation pour les 70 000 acheteurs publics français (collectivités, ministères, hôpitaux publics, etc.) de publier les données essentielles de leurs marchés publics sur leur profil d'acheteur.\n\nAfin de faciliter la consommation de ces données à l'échelle nationale, nous avons développé [des scripts](https://github.com/etalab/decp-rama) permettant de rassembler, traiter et publier ces données de façon centralisée, dans [les formats réglementaires](https://github.com/etalab/format-commande-publique).\n\nLes sources de données utilisées sont les suivantes :\n\n- [données issues du PES Marché de la DGFiP](https://www.data.gouv.fr/fr/datasets/donnees-essentielles-de-la-commande-publique-transmises-via-le-pes-marche/)\n- [données collectées par l'API DUME de l'AIFE](https://www.data.gouv.fr/fr/organizations/agence-pour-linformatique-financiere-de-letat/) \n- données issues du profil d'acheteur [Achatpublic.com](https://www.data.gouv.fr/fr/datasets/aife-de-44785462100045/) mises à disposition via l'API DUME de l'AIFE\n- données issues du profil d'acheteur [Dématis](https://www.data.gouv.fr/fr/organizations/dematis/) facilitant le téléchargement des données de ses clients ([e-marchespublics.com](https://www.data.gouv.fr/fr/datasets/donnees-essentielles-des-marches-publics-e-marchespublics-com-1/#_))\n- données publiées [sur le portail Open Data du Grand Lyon](https://data.grandlyon.com/citoyennete/marchf-public-de-la-mftropole-de-lyon/)\n- données publiées sur le profil d'acheteur AWS ([marches-publics.info](https://www.marches-publics.info/mpiaws/index.cfm?fuseaction=pub.affResultats&IDs=25)), extraites et publiées manuellement par Colin Maudry [sur data.gouv.fr](https://www.data.gouv.fr/fr/datasets/donnees-essentielles-des-marches-publics-publies-sur-marches-publics-info-aws/)\n\nSi vous avez connaissance de sources de données susceptibles d'être agrégées à ce jeu de données, merci de nous contacter sur decp@finances.gouv.fr ou de l'indiquer dans les commentaires ci-dessous (espace \"Discussions\").\n\n### Bon à savoir\n\n- Les données publiées par l'AIFE souffrent de quelques anomalies décrites [ici](https://github.com/etalab/decp-rama/issues/5). Vous pouvez connaître la source des données grâce au champ `source` de chaque marché.\n- Nous excluons les données de marchés qui sont manifestement [fictifs](https://www.data.gouv.fr/fr/datasets/5cd57bf68b4c4179299eb0e9/#resource-c0e97cb8-4530-4709-9fc3-eb264fcce8f7) ou [inexploitables](https://www.data.gouv.fr/fr/datasets/5cd57bf68b4c4179299eb0e9/#resource-9e149698-7804-49f1-b15c-e300be611995) (voir aussi [sur Github](https://github.com/etalab/decp-rama/issues/26))\n\n\n",
    "created_at": "2019-05-10T15:26:14.659000+00:00",
    "last_modified": "2023-10-17T02:20:18.010000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "acheteurs-publics",
      "commande-publique",
      "marche-de-fournitures",
      "marche-de-services",
      "marche-public",
      "marches-de-travaux",
      "marches-publics",
      "transparence"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5cd57bf68b4c4179299eb0e9/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 1570
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5cd57bf68b4c4179299eb0e9&page=1&page_size=50",
      "type": "GET",
      "total": 5
    },
    "frequency": "daily",
    "frequency_date": "2021-04-16T23:10:15+00:00",
    "extras": {},
    "metrics": {
      "discussions": 14,
      "reuses": 6,
      "followers": 11,
      "views": 44504
    },
    "organization": {
      "name": "Ministère de l'Économie, des Finances et de la Souveraineté industrielle et numérique",
      "acronym": "MEFSIN",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
      "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
      "logo": "https://dev-static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff8ea3a7292c64a77f02",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2018-10-01",
      "end": "2024-10-01"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "poi"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/donnees-essentielles-de-la-commande-publique-fichiers-consolides/",
    "page": "https://dev.data.gouv.fr/fr/datasets/donnees-essentielles-de-la-commande-publique-fichiers-consolides/",
    "last_update": "2023-10-17T04:20:16.444000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 0.8888888889
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2019-05-10T15:26:14.659000+00:00",
      "last_modified_internal": "2023-10-17T02:20:18.010000+00:00"
    }
  },
  {
    "id": "5369931ca3a729239d2040d1",
    "title": "Données carroyées à 200 m sur la population",
    "acronym": null,
    "slug": "donnees-carroyees-a-200-m-sur-la-population",
    "description": "Cette base comprend 18 variables sur la structure par âge des individus, les caractéristiques des ménages (locataire/propriétaire, etc.) et les revenus au 31 décembre 2010.\nAfin de respecter la règle de diffusion des données sur les revenus fiscaux des ménages, aucune information statistique (à l'exception du nombre total d'individus) n'est diffusée sur des carreaux de moins de 11 ménages. Ces carreaux de faibles effectifs sont donc regroupés en rectangles de taille plus importante et satisfaisant à cette règle des 11 ménages minimum.\nPar ailleurs, un certain nombre de variables considérées comme « à risque » ont été traitées afin que tout risque de rupture de confidentialité soit évité.\nL'utilisation correcte de ces données carroyées impose une lecture attentive de la documentation complète sur les données carroyées à 200 mètres.\n",
    "created_at": "2013-12-17T08:35:15.907000+00:00",
    "last_modified": "2019-01-15T18:47:34.117000+00:00",
    "deleted": null,
    "private": false,
    "tags": [],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5369931ca3a729239d2040d1/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 3
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5369931ca3a729239d2040d1&page=1&page_size=50",
      "type": "GET",
      "total": 1
    },
    "frequency": "unknown",
    "frequency_date": null,
    "extras": {
      "datagouv_ckan_id": "7981f24d-244f-4005-bbd6-fb06eea4cb1d",
      "datagouv_ckan_last_sync": 1410926805
    },
    "metrics": {
      "discussions": 4,
      "reuses": 12,
      "followers": 13,
      "views": 11677
    },
    "organization": {
      "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
      "page": "https://dev.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
      "logo": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff81a3a7292c64a77e5c",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2010-12-31",
      "end": "2011-01-01"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/donnees-carroyees-a-200-m-sur-la-population/",
    "page": "https://dev.data.gouv.fr/fr/datasets/donnees-carroyees-a-200-m-sur-la-population/",
    "last_update": "2023-09-15T12:46:29.172346+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": false,
      "score": 0.6666666667
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2013-12-17T08:35:15.907000+00:00",
      "last_modified_internal": "2019-01-15T18:47:34.117000+00:00"
    }
  },
  {
    "id": "639c7cf4969f3318338df9a8",
    "title": " \"Carte des loyers\" - Indicateurs de loyers d'annonce par commune en 2022",
    "acronym": null,
    "slug": "carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2022",
    "description": "**Contexte du projet**\n\nLa connaissance du niveau des loyers est importante pour garantir le bon fonctionnement du marché locatif et la conduite des politiques nationales et locales de l’habitat. La Direction Générale de l’Aménagement, du Logement et de la Nature (DGALN) a lancé en 2018 le projet de « carte des loyers » en s’associant d’une part à une équipe de recherche en économie d’Agrosup Dijon et de l’Institut national de la recherche en agronomique (INRAE), et d’autre part à SeLoger et leboncoin. En 2020, le projet a été repris par l’Agence Nationale pour l’Information sur le Logement (ANIL), qui a publié en 2022 une nouvelle version de la carte. \nCe partenariat innovant a permis de reconstituer une base de données avec plus de 7 millions d’annonces locatives. A partir de ces données, l’équipe de recherche et l’ANIL ont développé une méthodologie d’estimation d’indicateurs, à l’échelle communale, du loyer (charges comprises) par m² pour les appartements et maisons. \nCes indicateurs expérimentaux sont mis en ligne afin d’être utilisables par tous : services de l’Etat, collectivités territoriales, professionnels de l’immobiliers, particuliers bailleurs et locataires. A partir de 2022, les cartes sont actualisées et publiées tous les ans par l’ANIL. \nCe projet fournit une information complémentaire à celle offerte par les Observatoires Locaux des Loyers (OLL), déployés depuis 2013 et renforcés depuis 2018 par la loi Elan. Aujourd’hui, ce réseau associatif d’une trentaine d’OLL publie chaque année des informations précises sur les loyers pratiqués dans une cinquantaine d’agglomérations françaises.\n\n**Présentation du jeu de données**\n\nLes données diffusées sont des indicateurs de loyers d’annonces, à l’échelle de la commune. Le champ couvert est la France entière, hors Mayotte. La géographie des communes est celle en vigueur au 1er janvier 2022.\nLes indicateurs de loyers sont calculés grâce à l’utilisation des données d’annonces parues sur les plateformes de leboncoin et du Groupe SeLoger sur la période -2018 - 2022. \nLes indicateurs de loyers sont fournis charges comprises pour des biens types loués vides et mis en location au 3ème trimestre 2022 avec les caractéristiques de référence suivantes :\n- Pour un appartement (toutes typologies confondues) : surface de 52 m² et surface moyenne par pièce de 22,2 m²\n- Pour appartement type T1-T2 : surface de 37 m² et surface moyenne par pièce de 22,9 m²\n- Pour appartement type T3 et plus : surface de 72 m² et surface moyenne par pièce de 21,2 m²\n- Pour une maison : surface de 92 m² et surface moyenne par pièce de 22,3 m²\n\n**Conditions d’utilisation des données**\n\nCes indicateurs sont utilisables librement, sous réserve de mentionner la source sous la forme suivante : « Estimations ANIL, à partir des données du Groupe SeLoger et de leboncoin ».\n\n**Précautions d’emploi**\n\nLes indicateurs de loyers sont calculés sur des biens non meublés et charges comprises, sur des données d’annonces.. Les données ont été dédoublonnées mais sans pouvoir s’appuyer sur des photos et des caractéristiques très discriminantes. La méthode de maillage implique, pour les communes n’ayant aucun logement mis en location via une annonce sur au moins un des 2 sites sur la période considérée, quel’indicateur de loyer est celui estimé pour une maille plus grande comprenant des communes voisines présentant des caractéristiques similaires.\n\n**Les utilisateurs sont invités à considérer avec prudence les indicateurs de loyer dans les communes où le coefficient de détermination (R2) est inférieur à 0,5, le nombre d’observations dans la commune est inférieur à 30 ou l’intervalle de prédiction est très large.**\n**Par ailleurs, par rapport à la version précédente des indicateurs publiée en 2020, cette nouvelle carte ne permet pas de mesurer des évolutions de loyer, du fait de différences dans le maillage communal et d’évolutions de la méthodologie. **\n\n",
    "created_at": "2022-12-16T15:13:08.440000+00:00",
    "last_modified": "2023-01-10T16:45:28.670000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "immobilier",
      "logement",
      "loyer"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/639c7cf4969f3318338df9a8/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 7
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=639c7cf4969f3318338df9a8&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "punctual",
    "frequency_date": null,
    "extras": {},
    "metrics": {
      "discussions": 3,
      "reuses": 5,
      "followers": 16,
      "views": 51073
    },
    "organization": {
      "name": "Ministère de la Transition écologique",
      "acronym": "MTE",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-la-transition-ecologique/",
      "slug": "ministere-de-la-transition-ecologique",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-la-transition-ecologique/",
      "logo": "https://dev-static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff8da3a7292c64a77eee",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2022-07-01",
      "end": "2022-09-30"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:commune"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2022/",
    "page": "https://dev.data.gouv.fr/fr/datasets/carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2022/",
    "last_update": "2023-01-10T16:45:28.635000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2022-12-16T15:13:08.440000+00:00",
      "last_modified_internal": "2023-01-10T16:45:28.670000+00:00"
    }
  },
  {
    "id": "5ed117db6c161bd5baf070be",
    "title": "OLD Données relatives aux résultats des tests virologiques COVID-19",
    "acronym": "SI-DEP",
    "slug": "old-donnees-relatives-aux-resultats-des-tests-virologiques-covid-19",
    "description": "**********************\n### ⚠️ Cette ressource n'est plus actualisée depuis le 18 mai 2022.\n\nLe format des ressources issues des données de laboratoires pour le dépistage (SI-DEP) évolue.\nL'ensemble des ressources au nouveau format sont centralisées dans le nouveau jeu de données dédié :\n➡️ https://www.data.gouv.fr/fr/datasets/donnees-de-laboratoires-pour-le-depistage-a-compter-du-18-05-2022-si-dep/\nMerci à nos utilisateurs pour leur compréhension\n**********************\n\n**Information du 20 mai 2021**\n\nA compter de ce jour, les indicateurs seront corrigés afin de supprimer l’effet doublon, lors de la réalisation de plusieurs tests de dépistage par une même personne. \n\nDepuis le début de la pandémie, la plateforme sécurisée Si-DEP enregistre tous les résultats des tests de dépistage. Afin de garantir la protection des données personnelles des personnes testées, chaque résultat était lié à l’émission d’un pseudo anonymisé. Cependant, avec l’apparition des variants sur le territoire, certaines personnes sont amenées à réaliser deux tests, jusqu’à présent comptabilisés deux fois. \n\nL'algorithme  utilisé a donc récemment été mis à jour afin qu’il ne décompte qu’un seul patient lorsque celui-ci se fait tester plusieurs fois dans un intervalle de temps court, toujours en respectant l'anonymat. Grâce à cette nouvelle pseudonymisation, Santé publique France est capable de renforcer son efficacité et de produire des données encore plus précises, consultables chaque semaine dans son point épidémiologique.\n\n### Les actions de Santé publique France\n\nSanté publique France a pour mission d'améliorer et de protéger la santé des populations. Durant la crise sanitaire liée à l'épidémie du COVID-19, Santé publique France se charge de surveiller et comprendre la dynamique de l'épidémie, d'anticiper les différents scénarii et de mettre en place des actions pour prévenir et limiter la transmission de ce virus sur le territoire national.\n\n### Le Système d’Informations de DEPistage (SI-DEP)\n\nLe nouveau système d’information de dépistage (SI-DEP), en déploiement depuis le 13 mai 2020, est une plateforme sécurisée où sont systématiquement enregistrés les résultats des laboratoires des testsréalisés par l’ensemble des laboratoires de ville et établissements hospitaliers concernant le SARS-COV2.\n\nLa création de ce système d'information est autorisée pour une durée de 6 mois à compter de la fin de l'état d'urgence sanitaire par application du [décret n° 2020-551 du 12 mai 2020](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041869923) relatif aux systèmes d’information mentionnés à l’article 11 de la loi n° 2020-546 du 11 mai 2020 prorogeant l’état d’urgence sanitaire et complétant ses dispositions.\n\n### Description des données \n\nLe présent jeu de données renseigne à l'échelle départementale et régionale : \n- le nombre de personnes testées et le nombre de personnes déclarées positives par classe d'âge (quotidien et hebdomadaire) ;\n- le nombre de personnes positives sur 7 jours glissants.\n\nLe présent jeu de données renseigne à l'échelle nationale : \n- le nombre de personnes testées et le nombre de personnes déclarées positives par sexe et classe d'âge (quotidien et hebdomadaire).\n\nLe taux de positivité correspond au nombre de tests positifs rapportés au nombre de tests réalisés. Il est calculé de la manière suivante : 100*nombre de test positif/ nombre de tests réalisés\n\n**Précisions** : Si plusieurs prélèvements sont rapportés pour un même patient:\n- A compter du 29/08, les indicateurs issus des données de laboratoires (SI-DEP) présentent des taux d’incidence, de positivité et de dépistage corrigés en fonction des dépistages réalisés dans les aéroports à l’arrivée des vols internationaux.\n\nLa correction s’applique sur l’ensemble des données postérieures à la date du 12 août.\n\n**Limites** : \n- Seuls les tests biologiques des personnes pour lesquelles le département de résidence a pu être localisé sont représentés sur les cartes. Les personnes dont le département n’a pas pu être remonté dans les données SIDEP ne sont comptabilisées qu'au niveau France entière. De ce fait la somme des tests indiqués dans les départements ou régions est inférieure au nombre de tests indiqué en France.\n- Le délai de remontée des tests peut excéder 9 jours dans certains cas. Les indicateurs sont ajustés quotidiennement selon la réception des résultats.\n\nPour en savoir plus consultez la note méthodologique disponible dans les ressources.\n\n### Changements notables \n\nDepuis le 8 décembre, après avoir vérifié la qualité des données remontées, tous les résultats de tests RT-PCR ou Antigéniques, entrent dans la production des indicateurs épidémiologiques nationaux et territoriaux (taux d’incidence, taux de positivité et taux de dépistage) utiles au suivi de l’épidémie de COVID-19. Par ailleurs, l’épidémie se prolonge dans le temps et les capacités de dépistage ont augmenté, ce qui conduit à une fréquence croissante de personnes testées plusieurs fois. Ainsi, un ajustement des méthodes de dédoublonnage pour les patients bénéficiant de tests répétés et donc de la définition des personnes testées étaient nécessaires. Santé publique France, dans son approche épidémiologique centrée sur les patients, a donc adapté ses méthodes pour que ces indicateurs reflètent notamment au mieux la proportion de personnes infectées parmi la population testée. Ces évolutions n’ont pas d’impact sur les tendances et l’interprétation de la dynamique de l’épidémie, qui restent identiques. Des données plus précises relatives aux tests (incidence et positivité) sont également publiées par [Santé publique France](https://www.data.gouv.fr/fr/organizations/sante-publique-france/) (données SI-DEP).",
    "created_at": "2020-05-29T16:10:35.407000+00:00",
    "last_modified": "2022-11-15T17:23:36.725000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "coronavirus",
      "covid-19",
      "covid19",
      "depistage",
      "si-dep"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5ed117db6c161bd5baf070be/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 15
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5ed117db6c161bd5baf070be&page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "frequency": "daily",
    "frequency_date": "2020-10-22T09:53:26+00:00",
    "extras": {},
    "metrics": {
      "discussions": 61,
      "reuses": 45,
      "followers": 17,
      "views": 18371
    },
    "organization": {
      "name": "Santé publique France",
      "acronym": "SPF",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/sante-publique-france/",
      "slug": "sante-publique-france",
      "page": "https://dev.data.gouv.fr/fr/organizations/sante-publique-france/",
      "logo": "https://dev-static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "5e721a395d57f93d0bed451f",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": null,
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/old-donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/",
    "page": "https://dev.data.gouv.fr/fr/datasets/old-donnees-relatives-aux-resultats-des-tests-virologiques-covid-19/",
    "last_update": "2022-05-18T18:06:31.605000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": false,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 0.7777777778
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2020-05-29T16:10:35.407000+00:00",
      "last_modified_internal": "2022-11-15T17:23:36.725000+00:00"
    }
  },
  {
    "id": "5710b9f088ee383cf54d8898",
    "title": "Transparence-santé",
    "acronym": null,
    "slug": "transparence-sante-1",
    "description": "**REFONTE DE TRANSPARENCE-SANTE**\n===============================\n\nDepuis plusieurs mois, un travail de **refonte de la base Transparence-Santé** a été engagé par le Ministère des Solidarités et de la Santé (site de déclaration et site de publication destinée au grand public). L’équipe projet vous annonce que **la nouvelle plateforme sera mise à disposition** :\n\nDébut 2022.\n===============================\n\n\n\nEn conséquence, à partir de cette date, les données qui seront disponibles sur Data.gouv.fr respecteront le nouveau modèle de données.\nPour plus d’information, merci de contacter l’équipe support : TRANSPARENCE-SANTE-SUPPORT@sante.gouv.fr\n\n***\n\n**Attention : le jeu de données contient plus de 10 millions de lignes. Il convient de disposer d’un logiciel permettant d’afficher l’ensemble de ces lignes.**\n\n***\n      \nLa base de données publique Transparence - Santé rend accessible l'ensemble des informations déclarées par les entreprises sur les liens qu'elles entretiennent avec les acteurs du secteur de la santé. Pilotée par le ministère chargé de la santé, cette initiative de transparence vise à préserver la nécessaire relation de confiance entre les citoyens, les usagers et les multiples acteurs du système de santé.\n\nConformément aux articles L. 1453-1 et L. 1453-2 du code de la santé publique, les entreprises produisant ou commercialisant des produits à finalité sanitaire, cosmétique ou sanitaire doivent rendre publics les conventions, les rémunérations et les avantages accordés aux différents acteurs intervenant dans le champ de la santé, notamment aux professionnels de santé.\n\nLes informations mises à disposition sont issues de déclarations réalisées, deux fois par an, par les entreprises et publiées sur le site www.transparence.sante.gouv.fr. Elles contiennent des données à caractère personnel et à ce titre le réutilisateur est tenu de se conformer aux obligations prévues par la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés.\n\nLes entreprises sont responsables de l’exactitude des contenus publiés.\n\nLa réutilisation des données issues de la base Transparence - Santé est soumise au respect de la licence de réutilisation de l’information.\n\n**La réutilisation des données est restreinte**, elle doit être faite dans le respect de la finalité de la transparence des liens d’intérêts, ce qui exclut notamment une réutilisation à des fins strictement commerciales.\n\n[Attribution - Pas d’Utilisation Commerciale - Partage dans les Mêmes Conditions 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr)\n\nPar ailleurs, en cas de réutilisation des données donnant lieu à un traitement de données, **le réutilisateur doit se conformer aux dispositions de la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés**. Le réutilisateur doit aussi assurer la sécurité et la protection des seules données directement identifiantes contre l'indexation par des moteurs de recherche externes.\n\nLe jeu de données contient les champs et les données que le public est autorisé à voir sur le site www.transparence-sante.gouv.fr à l’instant T, c’est-à-dire les déclarations publiées au moment de la date de la demande d’extraction sur le site data.gouv.fr et les tags des demandes de rectification sur ces déclarations.\n\n",
    "created_at": "2016-04-15T11:52:48.515000+00:00",
    "last_modified": "2022-03-09T18:34:16.163000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "avantage",
      "avantages-en-natures",
      "convention",
      "medecin",
      "medicament",
      "professionnels-de-sante",
      "sante",
      "transparence"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5710b9f088ee383cf54d8898/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 1
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5710b9f088ee383cf54d8898&page=1&page_size=50",
      "type": "GET",
      "total": 3
    },
    "frequency": "daily",
    "frequency_date": "2016-04-16T11:52:43+00:00",
    "extras": {},
    "metrics": {
      "discussions": 26,
      "reuses": 6,
      "followers": 16,
      "views": 14056
    },
    "organization": {
      "name": "Ministère des Solidarités et de la Santé",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-des-solidarites-et-de-la-sante/",
      "slug": "ministere-des-solidarites-et-de-la-sante",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-des-solidarites-et-de-la-sante/",
      "logo": "https://dev-static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff94a3a7292c64a77fc1",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": null,
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "other-at",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/transparence-sante-1/",
    "page": "https://dev.data.gouv.fr/fr/datasets/transparence-sante-1/",
    "last_update": "2022-03-09T18:34:16.163000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": false,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": false,
      "score": 0.6666666667
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2016-04-15T11:52:48.515000+00:00",
      "last_modified_internal": "2022-03-09T18:34:16.163000+00:00"
    }
  },
  {
    "id": "60007bfb10632c47538583d8",
    "title": "Lieux de vaccination contre la Covid-19",
    "acronym": null,
    "slug": "lieux-de-vaccination-contre-la-covid-19",
    "description": "### Stratégie vaccinale \n\nLa stratégie vaccinale mise en place doit permettre de remplir trois objectifs de santé publique :\n- Faire baisser la mortalité et les formes graves de la maladie\n- Protéger les soignants et le système de soins\n- Garantir la sécurité des vaccins et de la vaccination\n\nDans le cadre de cette stratégie des lieux dédiés à la vaccination sont mis en place.\n\n### Les données\n\nLe jeu de données contient la liste des lieux dédiés à la vaccination contre la Covid-19. Cette liste provient des déclarations des Agences Régionales de Santé, qui consolident les centres de leurs régions.\n\nLes données sont extraites toutes les heures. Il n'y a pas toujours une mise à jour ou une correction, seule la dernière version est disponible.\nUn nouveau champs est ajouté  ce jour (centre_type). Il vient taguer le centre comme \"Grand centre\", \"Sécurité Civile\", \"USMP\", \"USHI\", \"USHA\", \"Equipe mobile\", \"SSA\". \nAttention, dans les réutilisations, les centres dont le champ \"centre_fermeture\" = t (true) n'ont pas vocation à être explosé au public. Ce sont des centres pour des publics spécifiques comme les prisons qui sont présents dans la liste des centres de vaccination, mais non exposés sur www.sante.fr\n\n**25/06/21** - Une liste de centres de vaccination fictifs a été ajoutée (1 par pays étranger). Ils représentent l'ensemble des centres de vaccination d'un pays. Ils ne sont pas exposés au public via sante.fr, il n'est, bien sûr, pas possible de prendre rdv. La source de la liste est celle du Ministère des Affaires Étrangères  disponible sur data.gouv.fr\nIls n'ont pas de positions géographiques (position 0 0).\nLeur seule utilité est interne au dispositif de saisie des données de vaccination.\nLe GID de ces centres est sur 9 caractères et commence par 9900xxxxx",
    "created_at": "2021-01-14T18:14:35.343000+00:00",
    "last_modified": "2023-10-18T01:05:18.988000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "coronavirus",
      "covid",
      "covid19",
      "vaccin",
      "vaccins"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/60007bfb10632c47538583d8/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=60007bfb10632c47538583d8&page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "frequency": "hourly",
    "frequency_date": "2021-01-15T18:13:40+00:00",
    "extras": {
      "recommendations-externals": [
        {
          "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
          "score": 50,
          "source": "edito",
          "messages": {
            "en": {
              "title": "Do you want to monitor the COVID-19 pandemic evolution?",
              "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
              "button": "Visit the COVID-19 pandemic monitoring dashboard"
            },
            "fr": {
              "title": "Vous souhaitez suivre l’évolution de l’épidémie de COVID-19 ?",
              "message": "Le tableau de bord de suivi de l’épidémie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l’évolution de la situation sanitaire.",
              "button": "Consulter le tableau de bord de suivi de l’épidémie de COVID-19"
            }
          }
        }
      ],
      "recommendations:sources": [
        "edito"
      ]
    },
    "metrics": {
      "discussions": 67,
      "reuses": 23,
      "followers": 11,
      "views": 32256
    },
    "organization": {
      "name": "Ministère des Solidarités et de la Santé",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-des-solidarites-et-de-la-sante/",
      "slug": "ministere-des-solidarites-et-de-la-sante",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-des-solidarites-et-de-la-sante/",
      "logo": "https://dev-static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff94a3a7292c64a77fc1",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": null,
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "poi"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/lieux-de-vaccination-contre-la-covid-19/",
    "page": "https://dev.data.gouv.fr/fr/datasets/lieux-de-vaccination-contre-la-covid-19/",
    "last_update": "2023-10-18T03:05:18.860000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": false,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 0.7777777778
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2021-01-14T18:14:35.343000+00:00",
      "last_modified_internal": "2023-10-18T01:05:18.988000+00:00"
    }
  },
  {
    "id": "559390f9c751df0139a453ba",
    "title": "BOAMP",
    "acronym": null,
    "slug": "boamp",
    "description": "### Annonces publiées au BOAMP (Bulletin officiel des annonces de marchés publics)\n\n\nLe BOAMP publie les avis d’appel public à la concurrence ainsi que les marchés à procédure adaptée (MAPA) inférieurs à 90000 € HT et les avis de résultat de marchés de l’Etat, des collectivités locales et de leurs établissements publics.\nIl publie également les contrats de partenariat public-privé, les délégations de service public et les marchés de défense ou de sécurité.\n\n**REMARQUE IMPORTANTE :**\n**Le 25 octobre 2023 au plus tard, la réglementation européenne des marchés publics impose l'utilisation de nouveaux formulaires européens dits \"eForms\". \nSi vous êtes utilisateur des données ouvertes du BOAMP diffusées par la direction de l'information légale et administrative (DILA), nous vous informons que le changement de format des avis initialement prévu fin septembre est reporté à mi-octobre 2023.**\n**Par ailleurs, le versement actuel de fichiers sous forme de parution sera remplacé par le dépôt d'avis/flux unitaires versés au fil de l'eau et la structure sera modifiée (dossier année/mois/jour).**\n**Le nouveau schéma XSD est d’ores et déjà disponible via ce [lien](https://echanges.dila.gouv.fr/OPENDATA/BOAMP/Schemas/jo_boamp_opendata_v3.2.5.zip), à noter une nouvelle référence de version : la v1.7 est remplacée par la v3.2.5. Sont également accessibles un [jeu de xml d’exemples](https://echanges.dila.gouv.fr/OPENDATA/BOAMP/Schemas/xml_v3.2.5_exemples_20230720.zip) ainsi qu’un document expliquant la [structure globale de ce nouveau format de diffusion](https://echanges.dila.gouv.fr/OPENDATA/BOAMP/Schemas/Informations_schema_jo_opendata_v3.2.5_20230720.doc).**\n**Nous vous tiendrons informés de la date de mise en place de ces changements ultérieurement.**\n\n\nVous pouvez également utiliser **[l'API BOAMP.](https://boamp-datadila.opendatasoft.com/explore/dataset/boamp/api/)**\n\n\nLes données sont mises à disposition le jour de publication 2 fois par jour, 7 jours/7.\n\nLe flux d’information est constitué de :\n\n- un fichier xml pour les méta-données relatives aux avis publiés ;\n- chaque annonce au format HTML.\n\n4 versions du schéma xsd des données existent :\n\n- V240 pour les annonces à partir de janvier 2022 ;\n- V230 pour les annonces à partir du 1er mars 2015 à fin décembre 2021;\n- V110 pour les annonces hors MAPA 2006 et 2007 et pour toutes les annonces de 2008 à fin février 2015 ;\n- V010 pour les annonces MAPA 2006 et 2007.\n\n\n[Accéder à l'historique des annonces, des schémas de données et de la documentation.](https://echanges.dila.gouv.fr/OPENDATA/BOAMP/)\n\n\n**Pour accéder au répertoire des données sous le protocole ftps, contacter le service Administration des données de la Dila à l’adresse suivante :** [donnees-dila@dila.gouv.fr](donnees-dila@dila.gouv.fr)\n\n\n**La mise à disposition par la DILA de jeux de données pouvant contenir des données personnelles n’affranchit pas le réutilisateur du respect de la loi Informatique et Libertés, conformément au document [AVERTISSEMENT](https://echanges.dila.gouv.fr/OPENDATA/AVERTISSEMENT-Donnees_a_caractere_personnel.pdf).\n\n\n**Le réutilisateur s’oblige à prendre en compte les demandes de mise à jour de données publiées ponctuellement  par la DILA dans le forum de discussion du jeu de données sur data.gouv .fr**.\n\n\nVous pouvez nous écrire ou vous abonner à une alerte  par mail adressé à : **[donnees-dila@dila.gouv.fr](donnees-dila@dila.gouv.fr)**\n\n\n",
    "created_at": "2015-07-01T09:04:25.341000+00:00",
    "last_modified": "2023-09-27T14:21:37.243000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "boamp",
      "dila",
      "mapa",
      "marches-publics"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/559390f9c751df0139a453ba/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 6
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=559390f9c751df0139a453ba&page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "frequency": "punctual",
    "frequency_date": null,
    "extras": {
      "apigouvfr:apis": [
        {
          "title": "API Bulletin officiel des annonces des marchés publics (BOAMP)",
          "tagline": "Rechercher et consulter les annonces du Bulletin Officiel des Annonces de Marchés Publics",
          "path": "/les-api/api-annonces-marches-publics-boamp",
          "slug": "api-annonces-marches-publics-boamp",
          "openness": "open",
          "owner": "Direction de l'information légale et administrative",
          "owner_acronym": "DILA",
          "logo": "/images/api-logo/dila.png"
        }
      ]
    },
    "metrics": {
      "discussions": 33,
      "reuses": 10,
      "followers": 15,
      "views": 11347
    },
    "organization": {
      "name": "Première ministre",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/premiere-ministre/",
      "slug": "premiere-ministre",
      "page": "https://dev.data.gouv.fr/fr/organizations/premiere-ministre/",
      "logo": "https://dev-static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fffa5a3a7292c64a7809e",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2015-10-14",
      "end": "2035-07-01"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:departement"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/boamp/",
    "page": "https://dev.data.gouv.fr/fr/datasets/boamp/",
    "last_update": "2023-10-13T20:38:21.176186+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2015-07-01T09:04:25.341000+00:00",
      "last_modified_internal": "2023-09-27T14:21:37.243000+00:00"
    }
  },
  {
    "id": "61816c6e23197bb34835228e",
    "title": "Logements vacants du parc privé par ancienneté de vacance, par commune et par EPCI",
    "acronym": null,
    "slug": "logements-vacants-du-parc-prive-par-anciennete-de-vacance-par-commune-et-par-epci",
    "description": "**Contexte**\nDans le cadre du Plan national de lutte contre les logements vacants (https://www.ecologie.gouv.fr/plan-national-lutte-contre-logements-vacants), un jeu de données sur les logements vacants, les données LOVAC ont été mises en place par la DHUP en partenariat avec le CEREMA Hauts-de-France. \n\nIssu du croisement des fichiers 1767BISCOM et des Fichiers Fonciers retraités par le CEREMA (https://datafoncier.cerema.fr/lovac), le présent fichier est une extraction agrégée des données LOVAC désormais disponibles en open data par commune et par EPCI.\n\n**Présentation du jeu de données :**\nCes données permettent de dénombrer le nombre de logements du parc privé vacants par commune et par EPCI et par ancienneté de vacance. \nElles permettent ainsi de distinguer la vacance de courte durée, dite frictionnelle, de la vacance de longue durée, dite structurelle, cible du plan national de lutte contre les logements vacants.\n\nAu niveau national, au 01/01/2021, 3,008 millions de logements du parc privé sont vacants (9,3%) dont 1,873 million depuis moins de deux ans (5,8%) et 1,135 million depuis au moins deux ans (3,5%).\nLa majorité des logements vacants le sont donc pour une courte durée. Cette vacance dite frictionnelle correspond à la période de transition entre deux occupants, elle est nécessaire à la fluidité du marché du logement.\n\nLes indicateurs renseignent sur la vacance des logements du parc privé au 01/01/2021, à l’échelle de la commune et des EPCI (Établissement public de coopération intercommunale). Le champ couvert est la France entière. La géographie des communes et des EPCI est celle en vigueur au 1er janvier 2023.\n\nLe seuil de secrétisation est de 11 logements. Les communes comptant moins de 11 logements du parc privé vacants depuis moins de deux ans et moins de 11 logements du parc privé vacants depuis deux ans ou plus n'apparaissent pas dans ces données. Les EPCI ne figurant pas dans ces données sont ceux pour lesquels le nombre de logements vacants de courte ou longue durée est inférieur à 11 dans l'ensemble des communes non disponibles dans le fichier communal.\n\nLes champs disponibles sont les suivants : \n-Nombre de logements du parc privé\n-Nombre de logements vacants du parc privé\n-Nombre de logements du parc privé vacants depuis moins de deux ans\n-Nombre de logements du parc privé vacants depuis deux ans ou plus\n-Taux de logements vacants du parc privé\n-Taux de logements du parc privé vacants depuis moins de deux ans\n-Taux de logements du parc privé vacants depuis deux ans ou plus\n\n**Précautions d’emploi**\nLes données LOVAC sont issues des données fiscales qui surestiment légèrement la vacance par rapport au recensement de population.\nCette surestimation s’explique notamment par le fait qu'une partie des logements « fiscalement vacants » correspond à des logements non habitables (bâtiments à l’abandon, garages, etc.), détruits ou retirés du marché en vue de leur démolition pour lesquels l’information fiscale n’a pas encore été mise à jour.\nLes taux de vacance très faibles ou au contraire très élevés de certaines communes doivent être interprétés avec prudence. Ces valeurs extrêmes concernent généralement de faibles effectifs.\nLes évolutions du nombre de logements vacants d'une année sur l'autre sont également à interpréter avec prudence, en particulier lorsque les volumes de logements sont faibles.\n",
    "created_at": "2021-11-02T17:50:54.102000+00:00",
    "last_modified": "2023-03-30T08:42:27.318000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "logements",
      "logements-vacants",
      "lovac",
      "parc-prive"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/61816c6e23197bb34835228e/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=61816c6e23197bb34835228e&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "annual",
    "frequency_date": "2022-05-13T01:00:00+00:00",
    "extras": {},
    "metrics": {
      "discussions": 7,
      "reuses": 7,
      "followers": 14,
      "views": 23059
    },
    "organization": {
      "name": "Ministère de la Transition écologique",
      "acronym": "MTE",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-la-transition-ecologique/",
      "slug": "ministere-de-la-transition-ecologique",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-la-transition-ecologique/",
      "logo": "https://dev-static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff8da3a7292c64a77eee",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2019-01-01",
      "end": "2020-01-01"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:commune"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/logements-vacants-du-parc-prive-par-anciennete-de-vacance-par-commune-et-par-epci/",
    "page": "https://dev.data.gouv.fr/fr/datasets/logements-vacants-du-parc-prive-par-anciennete-de-vacance-par-commune-et-par-epci/",
    "last_update": "2023-03-30T08:42:27.309000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": false,
      "all_resources_available": true,
      "resources_documentation": false,
      "score": 0.7777777778
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2021-11-02T17:50:54.102000+00:00",
      "last_modified_internal": "2023-03-30T08:42:27.318000+00:00"
    }
  },
  {
    "id": "5ed1175ca00bbe1e4941a46a",
    "title": "OLD Taux d'incidence de l'épidémie de COVID-19",
    "acronym": "SI-DEP",
    "slug": "old-taux-dincidence-de-lepidemie-de-covid-19",
    "description": "### Les actions de Santé publique France\n\nSanté publique France a pour mission d'améliorer et de protéger la santé des populations. Durant la crise sanitaire liée à l'épidémie du COVID-19, Santé publique France se charge de surveiller et comprendre la dynamique de l'épidémie, d'anticiper les différents scénarii et de mettre en place des actions pour prévenir et limiter la transmission de ce virus sur le territoire national.\n\n### Le Système d’Informations de DEPistage (SI-DEP)\n\nLe nouveau système d’information de dépistage (SI-DEP), en déploiement depuis le 13 mai 2020, est une plateforme sécurisée où sont systématiquement enregistrés les résultats des laboratoires des tests réalisés par l’ensemble des laboratoires de ville et établissements hospitaliers concernant le SARS-COV2.\n\nLa création de ce système d'information est autorisée pour une durée de 6 mois à compter de la fin de l'état d'urgence sanitaire par application du [décret n° 2020-551 du 12 mai 2020](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000041869923) relatif aux systèmes d’information mentionnés à l’article 11 de la loi n° 2020-546 du 11 mai 2020 prorogeant l’état d’urgence sanitaire et complétant ses dispositions.\n\n### Description des données \n\nLe présent jeu de données renseigne à l'échelle départementale et régionale : \n- le taux d'incidence quotidien et hebdomadaire par classe d'âge ;\n- le taux d’incidence standardisé quotidien et hebdomadaire ; \n- le taux d'incidence standardisé glissant.\n\nLe présent jeu de données renseigne à l'échelle nationale :\n- le taux d'incidence quotidien et hebdomadaire par classe d'âge et sexe ;\n- le taux d’incidence standardisé quotidien et hebdomadaire ; \n- le taux d'incidence standardisé glissant.\n\nLe taux d'incidence correspond au nombre de tests positifs pour 100.000 habitants. Il est calculé de la manière suivante : \n(100000 * nombre de cas positif) / Population\n\n**Précision** : \n- A compter du 29/08, les indicateurs issus des données de laboratoires (SI-DEP) présentent des taux d’incidence, de positivité et de dépistage corrigés en fonction des dépistages réalisés dans les aéroports à l’arrivée des vols internationaux.\n- Pour en savoir plus consultez la note méthodologique disponible dans les ressources.\n**Limites** : \n- Seuls les tests biologiques des personnes pour lesquelles le département de résidence a pu être localisé sont représentés sur les cartes. Les personnes dont le département n’a pas pu être remonté dans les données SIDEP ne sont comptabilisées qu'au niveau France entière. De ce fait la somme des tests indiqués dans les départements ou régions est inférieure au nombre de tests indiqué en France.\n- Le délai de remontée des tests peut excéder 9 jours dans certains cas. Les indicateurs sont ajustés quotidiennement selon la réception des résultats.\n\n### Changements notables \n\nDepuis le 8 décembre, après avoir vérifié la qualité des données remontées, tous les résultats de tests RT-PCR ou Antigéniques, entrent dans la production des indicateurs épidémiologiques nationaux et territoriaux (taux d’incidence, taux de positivité et taux de dépistage) utiles au suivi de l’épidémie de COVID-19. Par ailleurs, l’épidémie se prolonge dans le temps et les capacités de dépistage ont augmenté, ce qui conduit à une fréquence croissante de personnes testées plusieurs fois. Ainsi, un ajustement des méthodes de dédoublonnage pour les patients bénéficiant de tests répétés et donc de la définition des personnes testées étaient nécessaires. Santé publique France, dans son approche épidémiologique centrée sur les patients, a donc adapté ses méthodes pour que ces indicateurs reflètent notamment au mieux la proportion de personnes infectées parmi la population testée. Ces évolutions n’ont pas d’impact sur les tendances et l’interprétation de la dynamique de l’épidémie, qui restent identiques. Des données plus précises relatives aux tests (incidence et positivité) sont également publiées par [Santé publique France](https://www.data.gouv.fr/fr/organizations/sante-publique-france/) (données SI-DEP).",
    "created_at": "2020-05-29T16:08:28.707000+00:00",
    "last_modified": "2023-02-21T19:09:17.573000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "coronavius",
      "covid-19",
      "covid19"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5ed1175ca00bbe1e4941a46a/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 23
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5ed1175ca00bbe1e4941a46a&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "unknown",
    "frequency_date": null,
    "extras": {
      "recommendations-externals": [
        {
          "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
          "score": 50,
          "source": "edito",
          "messages": {
            "en": {
              "title": "Do you want to monitor the COVID-19 pandemic evolution?",
              "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
              "button": "Visit the COVID-19 pandemic monitoring dashboard"
            },
            "fr": {
              "title": "Vous souhaitez suivre l’évolution de l’épidémie de COVID-19 ?",
              "message": "Le tableau de bord de suivi de l’épidémie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l’évolution de la situation sanitaire.",
              "button": "Consulter le tableau de bord de suivi de l’épidémie de COVID-19"
            }
          }
        }
      ],
      "recommendations:sources": [
        "edito"
      ]
    },
    "metrics": {
      "discussions": 22,
      "reuses": 13,
      "followers": 9,
      "views": 35915
    },
    "organization": {
      "name": "Santé publique France",
      "acronym": "SPF",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/sante-publique-france/",
      "slug": "sante-publique-france",
      "page": "https://dev.data.gouv.fr/fr/organizations/sante-publique-france/",
      "logo": "https://dev-static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "5e721a395d57f93d0bed451f",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": null,
    "spatial": null,
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/old-taux-dincidence-de-lepidemie-de-covid-19/",
    "page": "https://dev.data.gouv.fr/fr/datasets/old-taux-dincidence-de-lepidemie-de-covid-19/",
    "last_update": "2023-02-21T19:09:17.508000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": false,
      "spatial": false,
      "update_frequency": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 0.5555555556
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2020-05-29T16:08:28.707000+00:00",
      "last_modified_internal": "2023-02-21T19:09:17.573000+00:00"
    }
  },
  {
    "id": "53699ce7a3a729239d205ac3",
    "title": "PLF - Jaune - Associations subventionnées",
    "acronym": null,
    "slug": "plf-jaune-associations-subventionnees",
    "description": "Liste des associations subventionnées par l'Etat avec le montant des subventions par ministère et programme.",
    "created_at": "2013-12-03T16:07:42.913000+00:00",
    "last_modified": "2018-12-13T20:23:27+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "annexes-budgetaires",
      "budget-de-letat",
      "finances-publiques",
      "jaune-budgetaire-associations",
      "loi-de-finances",
      "plf-2012"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/53699ce7a3a729239d205ac3/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=53699ce7a3a729239d205ac3&page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "frequency": "unknown",
    "frequency_date": null,
    "extras": {
      "datagouv_ckan_id": "9e25d830-a8ed-435d-9238-de18840c4b85",
      "datagouv_ckan_last_sync": 1410861242
    },
    "metrics": {
      "discussions": 5,
      "reuses": 5,
      "followers": 14,
      "views": 4064
    },
    "organization": {
      "name": "Ministère de l'Économie, des Finances et de la Souveraineté industrielle et numérique",
      "acronym": "MEFSIN",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
      "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
      "logo": "https://dev-static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff8ea3a7292c64a77f02",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2010-01-01",
      "end": "2012-12-31"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "country"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/plf-jaune-associations-subventionnees/",
    "page": "https://dev.data.gouv.fr/fr/datasets/plf-jaune-associations-subventionnees/",
    "last_update": "2018-12-13T20:23:27+00:00",
    "archived": "2023-11-28T00:37:09.766000+00:00",
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": false,
      "dataset_description_quality": false,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": false,
      "score": 0.5555555556
    },
    "harvest": {
      "backend": "OpenDataSoft",
      "modified_at": "2018-12-13T20:23:27+00:00",
      "source_id": "5cd454758b4c4139d85b64f2",
      "remote_id": "plf-jaune-associations-subventionnees",
      "domain": "data.economie.gouv.fr",
      "last_update": "2023-11-20T00:12:15.907000+00:00",
      "remote_url": "https://data.economie.gouv.fr/explore/dataset/plf-jaune-associations-subventionnees/",
      "archived_at": "2023-11-28T00:37:09.766000+00:00",
      "archived": "not-on-remote",
      "ods_url": "https://data.economie.gouv.fr/explore/dataset/plf-jaune-associations-subventionnees/",
      "ods_references": "https://www.data.gouv.fr/fr/datasets/plf-jaune-associations-subventionnees/",
      "ods_has_records": false,
      "ods_geo": false
    },
    "internal": {
      "created_at_internal": "2013-12-03T16:07:42.913000+00:00",
      "last_modified_internal": "2018-12-13T20:23:27+00:00"
    }
  },
  {
    "id": "5ee9df5003284f565d561278",
    "title": "Indicateurs de suivi de l’épidémie de COVID-19",
    "acronym": null,
    "slug": "indicateurs-de-suivi-de-lepidemie-de-covid-19",
    "description": "### Présentation des indicateurs de suivi\n\nLe 28 mai 2020, le gouvernement a présenté dans le cadre de la deuxième étape du plan de déconfinement, la carte de synthèse des départements qui sert de référence pour les mesures différenciées appliquées depuis le 2 juin. \n\nCette carte est construite sur la base de 4 indicateurs et est complétée par une analyse de risques. Les indicateurs sont les suivants : \n\n**1. Activité épidémique (taux d'incidence)**\n\nLe taux d'incidence correspond au nombre de personnes testées positives (RT-PCR et test antigénique) pour la première fois depuis plus de 60 jours rapporté à la taille de la population. Il est exprimé pour 100 000 habitants et permet de comparer des zones géographiques entre elles.\n\nTrois niveaux ont été fixés pour cet indicateur : \n- vert : en dessous de 10 personnes testées positives sur 100.000 personnes testées, sur une semaine glissante ;\n- orange : au-delà de 10 personnes testées positives sur 100.000 personnes testées, sur une semaine glissante ;\n- rouge : au-delà de 50 personnes testées positives sur 100.000 personnes testées, sur une semaine glissante. \n\n**2. Taux de positivité des tests virologiques** \n\nLe taux de positivité correspond au nombre de personnes testées positives (RT-PCR et test antigénique) pour la première fois depuis plus de 60 jours rapporté au nombre total de personnes testées positives ou négatives sur une période donnée ; et qui n‘ont jamais été testées positives dans les 60 jours précédents.\n\nTrois niveaux ont été fixés pour cet indicateur :\n- vert : taux de positivité entre 0 et 5% ;\n- orange : taux de positivité entre 5 et 10% ;\n- rouge : taux de positivité supérieur à 10%.\n\n**3. Facteur de reproduction du virus (évolution du R0)**\n\nLe nombre de reproduction du virus : c’est le nombre moyen de personnes qu’une personne infectée peut contaminer. Si le R effectif est supérieur à 1, l’épidémie se développe ; s’il est inférieur à 1, l’épidémie régresse. Cet indicateur, arrêté le mardi et mis à jour le jeudi, est un indicateur de la situation épidémiologique environ 7 jours auparavant et doit être interprété à la lumière des activités de dépistage et de remontée des données. L'indicateur est mis à jour une fois par semaine\n\nTrois niveaux ont été fixés pour cet indicateur :\n- Vert : R0 entre 0 et 1 ;\n- Orange : R0 entre 1 et 1,5 ;\n- Rouge : R0 supérieur à 1,5.\n\n**4. Tension hospitalière sur la capacité en réanimation** \n\nCet indicateur reflète le niveau de sollicitation des réanimations mais aussi le niveau de tension sur les capacités hospitalières en réanimation. Il s’agit de la proportion de patients atteints de COVID-19 actuellement en réanimation, en soins intensifs, ou en unité de surveillance continue rapportée au total des lits en capacité initiale, c’est-à-dire avant d’augmenter les capacités de lits de réanimation dans un hôpital.\n\nTrois niveaux ont été fixés pour cet indicateur :\n- Vert : taux d’occupation compris entre 0 et 30% ;\n- Orange : taux d’occupation compris entre 30 et 60% ;\n- Rouge  : taux d'occupation supérieur à 60%.\n\n### Description des données \n\nLes données mises à disposition présentent la valeur quotidienne de ces 4 indicateurs au niveau national et départemental depuis le 15 mars 2020. \n\n**Fréquence de mise à jour des données** : quotidienne\n\n### Changements notables \n\nDepuis le 8 décembre, après avoir vérifié la qualité des données remontées, tous les résultats de tests RT-PCR ou Antigéniques, entrent dans la production des indicateurs épidémiologiques nationaux et territoriaux (taux d’incidence, taux de positivité et taux de dépistage) utiles au suivi de l’épidémie de COVID-19. Par ailleurs, l’épidémie se prolonge dans le temps et les capacités de dépistage ont augmenté, ce qui conduit à une fréquence croissante de personnes testées plusieurs fois. Ainsi, un ajustement des méthodes de dédoublonnage pour les patients bénéficiant de tests répétés et donc de la définition des personnes testées étaient nécessaires. Santé publique France, dans son approche épidémiologique centrée sur les patients, a donc adapté ses méthodes pour que ces indicateurs reflètent notamment au mieux la proportion de personnes infectées parmi la population testée. Ces évolutions n’ont pas d’impact sur les tendances et l’interprétation de la dynamique de l’épidémie, qui restent identiques. Des données plus précises relatives aux tests (incidence et positivité) sont également publiées par [Santé publique France](https://www.data.gouv.fr/fr/organizations/sante-publique-france/) (données SI-DEP).",
    "created_at": "2020-06-17T11:16:00.320000+00:00",
    "last_modified": "2022-08-30T18:45:47.663000+00:00",
    "deleted": null,
    "private": false,
    "tags": [],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5ee9df5003284f565d561278/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5ee9df5003284f565d561278&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "daily",
    "frequency_date": "2020-10-29T15:46:30+00:00",
    "extras": {
      "recommendations-externals": [
        {
          "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
          "score": 50,
          "source": "edito",
          "messages": {
            "en": {
              "title": "Do you want to monitor the COVID-19 pandemic evolution?",
              "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
              "button": "Visit the COVID-19 pandemic monitoring dashboard"
            },
            "fr": {
              "title": "Vous souhaitez suivre l’évolution de l’épidémie de COVID-19 ?",
              "message": "Le tableau de bord de suivi de l’épidémie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l’évolution de la situation sanitaire.",
              "button": "Consulter le tableau de bord de suivi de l’épidémie de COVID-19"
            }
          }
        }
      ],
      "recommendations:sources": [
        "edito",
        "matomo"
      ],
      "recommendations": [
        {
          "id": "5eaaf07f5abc47e306c5c258",
          "score": 27,
          "source": "matomo"
        },
        {
          "id": "5e7e104ace2080d9162b61d8",
          "score": 24,
          "source": "matomo"
        }
      ]
    },
    "metrics": {
      "discussions": 29,
      "reuses": 5,
      "followers": 9,
      "views": 25777
    },
    "organization": {
      "name": "Ministère des Solidarités et de la Santé",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-des-solidarites-et-de-la-sante/",
      "slug": "ministere-des-solidarites-et-de-la-sante",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-des-solidarites-et-de-la-sante/",
      "logo": "https://dev-static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff94a3a7292c64a77fc1",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": null,
    "spatial": null,
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/indicateurs-de-suivi-de-lepidemie-de-covid-19/",
    "page": "https://dev.data.gouv.fr/fr/datasets/indicateurs-de-suivi-de-lepidemie-de-covid-19/",
    "last_update": "2022-08-30T18:45:47.581000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": false,
      "spatial": false,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": false,
      "score": 0.5555555556
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2020-06-17T11:16:00.320000+00:00",
      "last_modified_internal": "2022-08-30T18:45:47.663000+00:00"
    }
  },
  {
    "id": "5e836644ca07c8558d91a6fc",
    "title": "Ma connexion internet",
    "acronym": "mci",
    "slug": "ma-connexion-internet",
    "description": "**[Ma connexion internet](https://maconnexioninternet.arcep.fr/), projet inédit développé par l’Arcep, est un moteur de recherche qui permet de connaître les technologies d’accès à internet disponibles à leur adresse et d’être mieux informés sur les déploiements de la fibre. Cet open data regroupe les données du site dans un format accessible et réutilisable. Vous pouvez trouver à la fin de cette page la [documentation de cet open data.](https://www.data.gouv.fr/en/datasets/ma-connexion-internet/#resource-8c21e6a5-ebcb-4eaf-b835-a687abce248d)**\n\n**Pour plus de renseignements sur Ma connexion internet, vous pouvez vous rendre sur la page de [documentation technique de Ma connexion internet](https://www.arcep.fr/cartes-et-donnees/nos-cartes/documentation-technique-ma-connexion-internet.html), ainsi que sur la page de [FAQ](http://www.arcep.fr/nos-sujets/ma-connexion-internet.html). Vous pouvez également vous inscrire à la [liste de diffusion \"Données et cartes de l'internet fixe\"](https://www.arcep.fr/actualites/nos-mails-dinformation/liste-de-diffusion-donnees-et-cartes-de-linternet-fixe.html) pour être tenus informés de l'actualité du projet.**\n\n## Date des données :\n\nLes données les plus récentes sont celles du **T1 2023** (31 mars 2023).\n\n## Tableaux de bord :\n\nDeux tableaux de bord sont disponibles aux échelles départementale, régionale et nationale d'une part et communale d'autre part. Ils permettent de consulter de manière interactive les statistiques d'éligibilité des locaux calculées à partir des données brutes de cet open data, telles qu'elles sont publiées sur [Ma connexion internet](https://maconnexioninternet.arcep.fr/).\n\nIls sont conçus pour être ouverts avec Excel. Il s'agit de fichiers en téléchargement direct.\n\n## Données brutes :\n\nLes ressources brutes sont des fichiers reprenant l’ensemble des données de Ma connexion internet (base immeuble, éligibilité des immeubles, fermeture du cuivre, données de référence, statistiques par maille administrative) au format csv.\n\nCes ressources sont stockées sur le serveur [https://files.data.gouv.fr/arcep_donnees//fixe/maconnexioninternet/](https://files.data.gouv.fr/arcep_donnees//fixe/maconnexioninternet/) dans quatre dossiers (base_imb, eligibilite, fermeture_cuivre, reference, statistiques), puis par millésime, sous la forme d'un couple année_trimestre (AAAA_tX).\n\nLes liens ci-dessous renvoient directement vers la dernière version des fichiers placés dans le répertoire \"/last\". Il est possible de naviguer dans l'arborescence des dossiers pour télécharger des données plus anciennes.\n\n**🔥 Attention : l'emplacement des données sur files.data.gouv.fr a changé : les données de MCI sont désormais dans le sous-répertoire /arcep_donnees/fixe/maconnexioninternet/. Les anciens chemins (/arcep/) sont néanmoins toujours fonctionnels**.\n\n*Schéma de l'organisation des millésime sur le serveur:*\n>   **Index of /arcep_donnees/fixe/base_imb/**                                  \n>   **┣ ...** <-------------------------------------------- *lien vers le répertoire parent (fixe)*\n>   **┣ 2022_t2/** <-------------------------------- *lien permanent vers chaque millésime publié*\n>   **┣ 2022_t3/**                                                                                   \n>   **┣ 2022_T4/**                                                                                    \n>   **┣ last/** <--------------------------------------- *lien permanent vers le dernier millésime publié (ici : 2022_T4)*\n>   **┗ documentation_sites.md** <------- *documentation des données*\n>\n>   Selon l'usage, deux manières d'accéder aux dernières données disponibles (ici : 2022_T4) :\n>   - files.data.gouv.fr/arcep_donnees/fixe/base_imb/2022_T4/\n>   - files.data.gouv.fr/arcep_donnees/fixe/base_imb/last/\n\n## Liste des données brutes publiées :\n\n**base_imb - données immeuble :**\n\n- base immeuble (`base_imb.csv`) : liste des immeubles version France entière ou par département\n\n**eligibilite - données de débit à l'immeuble :**\n\n- table d’éligibilité (`actuel.csv`) : triplet {immeuble;technologie;débit} version France entière ou par département\n\n**fermeture_cuivre - données spécifiques à la fermeture du cuivre :**\n- table des données relatives au plan de fermeture du cuivre (`base_imb_fc.csv`) : liste des immeubles avec indications sur l'état d'avancement du plan de fermeture du cuivre, version France entière ou par département \n\n**reference - données de référence :**\n\n- table opérateurs (`operateur.csv`) : liste des codes opérateurs et des opérateurs utilisés dans les données.\n  _Le lien vers ces données est dans la partie \"Documentation\"_.\n\n**statistiques - statistiques d'éligibilité des locaux :**\nCes données sont déclinées pour la France entière, les régions, les départements et les communes :\n\n- nombre de locaux (`{national,region,departement,commune}.csv`)\n- élibilité selon la classe de débit (`{national,region,departement,commune}_debit.csv`)\n- élibilité selon la classe de débit limitée aux technologies terrestres (DSL, câble, fibre, HD/THD radio, 4G fixe) (`{national,region,departement,commune}_debit_terrestre.csv`)\n- élibilité selon la classe de débit limitée aux technologies filaires (DSL, câble et fibre) (`{national,region,departement,commune}_debit_filaire.csv`)\n- élibilité selon la classe de débit limitée au DSL (`{national,region,departement,commune}_debit_dsl.csv`)\n- éligibilité selon la technologie (`{national,region,departement,commune}_techno.csv`)\n- éligibilité selon la technologie permettant le meilleur accès au très haut débit ou au bon haut débit (`{national,region,departement,commune}_meilleure_techno.csv`)\n- éligibilité selon la technologie permettant le meilleur accès au très haut débit (`{national,region,departement,commune}_meilleure_techno_thd.csv`)\n\n_Une visualisation des statistiques départementales de \"meilleur accès au très haut débit ou au bon haut débit\" est proposée sur le [site internet de l'Arcep](https://www.arcep.fr/cartes-et-donnees/nos-cartes/visualisations-ma-connexion-internet.html)._\n\n## Données de test :\n\nUne **base de données réduite** (`bdd-reduite-mci.tar`) permet de tester les scripts de production de Ma connexion internet, comme décrit en ligne sur le dépôt Github [algo_maconnexioninternet](https://github.com/ARCEP-dev/algo_maconnexioninternet). Ces données ne sont pas millésimées et ne sont pas sur le serveur ci-dessus.\n\n## Exploitation des données avec Microsoft Excel :\n\nPour afficher les caractères avec accents dans le logiciel Microsoft Excel, il est possible d'exécuter l’Assistant importation de texte en remplaçant l’extension de nom de fichier. csv par. txt avant de l’ouvrir. Vous pourrez alors sélectionner l’encodage UTF-8.\n",
    "created_at": "2020-03-31T17:48:20.705000+00:00",
    "last_modified": "2023-08-25T12:40:57.483000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "adresse",
      "adsl",
      "cable",
      "coax",
      "connexion",
      "dsl",
      "fibre",
      "fibre-optique",
      "ftth",
      "haut-debit",
      "satellite",
      "thd",
      "thd-radio",
      "vdsl",
      "xdsl"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5e836644ca07c8558d91a6fc/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 12
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5e836644ca07c8558d91a6fc&page=1&page_size=50",
      "type": "GET",
      "total": 1
    },
    "frequency": "quarterly",
    "frequency_date": "2020-07-31T06:00:00+00:00",
    "extras": {
      "recommendations-externals": [
        {
          "id": "https://maconnexioninternet.arcep.fr/",
          "score": 50,
          "source": "edito",
          "messages": {
            "en": {
              "title": "Are you seeking to know which fixed internet technologies and speeds are available at an address?",
              "message": "Ma connexion internet allows you to easily find information on the speeds offered in France by technology and operator.",
              "button": "Visit « Ma connexion internet »"
            },
            "fr": {
              "title": "Vous souhaitez savoir quelles sont les technologies et les débits de l’internet fixe disponibles à une adresse ?",
              "message": "Ma connexion internet vous permet de retrouver facilement les informations sur les débits proposés en France par technologie et opérateurs.",
              "button": "Consulter « Ma connexion internet »"
            }
          }
        }
      ],
      "recommendations:sources": [
        "edito"
      ]
    },
    "metrics": {
      "discussions": 8,
      "reuses": 5,
      "followers": 11,
      "views": 24225
    },
    "organization": {
      "name": "Autorité de régulation des communications électroniques, des postes et de la distribution de la presse (ARCEP)",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/autorite-de-regulation-des-communications-electroniques-des-postes-et-de-la-distribution-de-la-presse-arcep/",
      "slug": "autorite-de-regulation-des-communications-electroniques-des-postes-et-de-la-distribution-de-la-presse-arcep",
      "page": "https://dev.data.gouv.fr/fr/organizations/autorite-de-regulation-des-communications-electroniques-des-postes-et-de-la-distribution-de-la-presse-arcep/",
      "logo": "https://dev-static.data.gouv.fr/avatars/1f/047bb9cae647e9bf0bb222412f0dc3-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/1f/047bb9cae647e9bf0bb222412f0dc3-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff58a3a7292c64a77cf6",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2019-09-30",
      "end": "2021-06-30"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "other"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/ma-connexion-internet/",
    "page": "https://dev.data.gouv.fr/fr/datasets/ma-connexion-internet/",
    "last_update": "2023-07-14T21:58:12.496593+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": false,
      "resources_documentation": true,
      "score": 0.7777777778
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2020-03-31T17:48:20.705000+00:00",
      "last_modified_internal": "2023-08-25T12:40:57.483000+00:00"
    }
  },
  {
    "id": "62581fdf02e05e365ea227a1",
    "title": "Election présidentielle des 10 et 24 avril 2022 - Résultats définitifs du 1er tour",
    "acronym": null,
    "slug": "election-presidentielle-des-10-et-24-avril-2022-resultats-definitifs-du-1er-tour",
    "description": "Résultats du 1er tour de l’élection présidentielle 2022, France entière,métropole, outre-mer, par régions, départements, communes, circonscriptions législatives et bureaux de vote.\nCes résultats sont définitifs.\nLe détail des résultats par listes consulaires des Français de l'étranger est accessible depuis le site du ministère des affaires étrangères au lien suivant :[site du Ministère de l'Europe et des Affaires étrangère](https://www.diplomatie.gouv.fr/fr/services-aux-francais/voter-a-l-etranger/resultats-des-elections/article/election-presidentielle-2022-resultats-du-1er-tour-pour-les-francais-de-l)",
    "created_at": "2022-04-14T15:21:35.194000+00:00",
    "last_modified": "2022-04-19T11:44:16.818000+00:00",
    "deleted": null,
    "private": false,
    "tags": [],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/62581fdf02e05e365ea227a1/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 16
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=62581fdf02e05e365ea227a1&page=1&page_size=50",
      "type": "GET",
      "total": 10
    },
    "frequency": "unknown",
    "frequency_date": null,
    "extras": {},
    "metrics": {
      "discussions": 7,
      "reuses": 7,
      "followers": 7,
      "views": 26374
    },
    "organization": {
      "name": "Ministère de l'Intérieur et des Outre-Mer",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-linterieur-et-des-outre-mer/",
      "slug": "ministere-de-linterieur-et-des-outre-mer",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-linterieur-et-des-outre-mer/",
      "logo": "https://dev-static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff91a3a7292c64a77f53",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": null,
    "spatial": null,
    "license": "notspecified",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/election-presidentielle-des-10-et-24-avril-2022-resultats-definitifs-du-1er-tour/",
    "page": "https://dev.data.gouv.fr/fr/datasets/election-presidentielle-des-10-et-24-avril-2022-resultats-definitifs-du-1er-tour/",
    "last_update": "2022-04-14T15:26:17.908000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": false,
      "spatial": false,
      "update_frequency": false,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": false,
      "score": 0.4444444444
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2022-04-14T15:21:35.194000+00:00",
      "last_modified_internal": "2022-04-19T11:44:16.818000+00:00"
    }
  },
  {
    "id": "53698ecca3a729239d203579",
    "title": "Aires géographiques des AOC/AOP",
    "acronym": null,
    "slug": "aires-geographiques-des-aoc-aop",
    "description": "Aires géographiques des appellations d'origine contrôlées (AOC)/protégées (AOP).\r\nLe fichier liste pour chaque commune, identifiée par son département, son nom et son code INSEE, les aires géographiques des appellations AOC/AOP qui se situent sur la commune",
    "created_at": "2013-07-08T16:04:30.642000+00:00",
    "last_modified": "2023-10-02T10:21:04.858000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "aire-geographique",
      "aoc",
      "aop",
      "appellation-d-origine"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/53698ecca3a729239d203579/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 1
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=53698ecca3a729239d203579&page=1&page_size=50",
      "type": "GET",
      "total": 0
    },
    "frequency": "punctual",
    "frequency_date": null,
    "extras": {
      "Date de production des données": "13/12/2013",
      "Langue": "français",
      "datagouv_ckan_id": "de677d2a-9abb-4ceb-8c6d-41c46f3468bb",
      "datagouv_ckan_last_sync": 1410925178
    },
    "metrics": {
      "discussions": 1,
      "reuses": 11,
      "followers": 22,
      "views": 13710
    },
    "organization": {
      "name": "Institut national de l'origine et de la qualité (INAO)",
      "acronym": null,
      "uri": "https://dev.data.gouv.fr/api/1/organizations/institut-national-de-l-origine-et-de-la-qualite-inao/",
      "slug": "institut-national-de-l-origine-et-de-la-qualite-inao",
      "page": "https://dev.data.gouv.fr/fr/organizations/institut-national-de-l-origine-et-de-la-qualite-inao/",
      "logo": "https://dev-static.data.gouv.fr/avatars/e4/a2fe7b52ad475892124bb80fb77a0d-original.png",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/e4/a2fe7b52ad475892124bb80fb77a0d-100.png",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff80a3a7292c64a77e54",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2013-12-13",
      "end": "2014-05-20"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:commune"
    },
    "license": "fr-lo",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/aires-geographiques-des-aoc-aop/",
    "page": "https://dev.data.gouv.fr/fr/datasets/aires-geographiques-des-aoc-aop/",
    "last_update": "2023-10-02T10:20:33.623000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2013-07-08T16:04:30.642000+00:00",
      "last_modified_internal": "2023-10-02T10:21:04.858000+00:00"
    }
  },
  {
    "id": "5fc7bd499a1944cb674fd064",
    "title": "\"Carte des loyers\" - Indicateurs de loyers d'annonce par commune en 2018",
    "acronym": null,
    "slug": "carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2018",
    "description": "**Une version plus récente de ces indicateurs est consultable sur cette page : https://www.data.gouv.fr/fr/datasets/carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2022/\nDu fait d'évolution de la méthodologie et du maillage communal, les versions successives des indicateurs ne peuvent pas être comparés pour fournir des informations sur l'évolution des loyers.**\n\n### Contexte du projet\n\nLa connaissance du niveau des loyers est importante pour garantir le bon fonctionnement du marché locatif et la conduite des politiques nationales et locales de l’habitat. La Direction Générale de l’Aménagement, du Logement et de la Nature (DGALN) a lancé en 2018 le projet de « carte des loyers » en s’associant d’une part à une équipe de recherche en économie d’Agrosup Dijon et de l’Institut national de la recherche en agronomique (INRAE), et d’autre part à SeLoger, leboncoin et PAP. \n\nCe partenariat innovant a permis de reconstituer une base de données avec plus de 9 millions d’annonces locatives. A partir de ces données, l’équipe de recherche a développé une méthodologie d’estimation d’indicateurs, à l’échelle communale, du loyer (charges comprises) par m² pour les appartements et maisons. \n\nCes indicateurs expérimentaux sont mis en ligne afin d’être utilisable par tous : services de l’Etat, collectivités territoriales, professionnels de l’immobiliers, particuliers bailleurs et locataires. Dans une deuxième phase du projet, la méthodologie devra être consolidée et pérennisée, pour prévoir une actualisation à intervalle régulier de ces indicateurs. \n\nCe projet fournit une information complémentaire à celle offerte par les Observatoires Locaux des Loyers (OLL), déployés depuis 2013 et renforcés depuis 2018 par la loi Elan. Aujourd’hui, ce réseau associatif de 30 OLL publie chaque année des informations précises sur les loyers pratiqués dans 51 des principales agglomérations françaises.\n\n### Présentation du jeu de données\n\nLes données diffusées sont des indicateurs de loyers d’annonces, à l’échelle de la commune. Le champ couvert est la France entière, hors Mayotte. La géographie des communes est celle en vigueur au 1er janvier 2017.\n\nLes indicateurs de loyers sont calculés grâce à l’utilisation des données d’annonces parues sur leboncoin, SeLoger et PAP sur la période 2015-2019.\n\nLes indicateurs de loyers sont fournis charges comprises pour des biens types mis en location au 3ème trimestre 2018 avec les caractéristiques de référence suivantes :\n- Pour un appartement : surface de 49 m² et surface moyenne par pièce de 22,1 m²\n- Pour une maison : surface de 92 m² et surface moyenne par pièce de 22,5 m²\n\n### Conditions d’utilisation des données\n\nCes indicateurs sont utilisables librement, sous réserve de mentionner la source sous la forme suivante : _« Estimations UMR 1041 CESAER (AgroSup Dijon-INRAE) à partir des données SeLoger, leboncoin, PAP »_.\n\n### Précautions d’emploi\n\nLes indicateurs de loyers sont calculés charges comprises, sur des données d’annonces, donc mesurent des loyers de flux uniquement. Les données ont été dédoublonnées mais sans pouvoir s’appuyer sur des photos et des caractéristiques très discriminantes. Pour les communes n’ayant aucun logement mis en location via une annonce sur au moins un des 3 sites sur la période considérée, l’indicateur de loyer est celui estimé pour une maille plus grande comprenant des communes voisines présentant des caractéristiques similaires.\n\nPar ailleurs, les données ne permettant pas de distinguer avec certitude les locations meublées et touristiques, des biais dans les indicateurs de loyers peuvent être observés localement.\n\n**Les utilisateurs sont invités à considérer avec prudence les indicateurs de loyer dans les communes où le coefficient de détermination (R2) est inférieur à 0,5, le nombre d’observations dans la commune est inférieur à 30 ou l’intervalle de prédiction est très large.**\n\n",
    "created_at": "2020-12-02T17:14:01.579000+00:00",
    "last_modified": "2023-01-10T12:55:05.251000+00:00",
    "deleted": null,
    "private": false,
    "tags": [
      "commune",
      "immobilier",
      "logement",
      "loyer"
    ],
    "badges": [],
    "resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/2/datasets/5fc7bd499a1944cb674fd064/resources/?page=1&page_size=50",
      "type": "GET",
      "total": 4
    },
    "community_resources": {
      "rel": "subsection",
      "href": "https://dev.data.gouv.fr/api/1/datasets/community_resources/?dataset=5fc7bd499a1944cb674fd064&page=1&page_size=50",
      "type": "GET",
      "total": 2
    },
    "frequency": "punctual",
    "frequency_date": null,
    "extras": {},
    "metrics": {
      "discussions": 8,
      "reuses": 4,
      "followers": 11,
      "views": 16951
    },
    "organization": {
      "name": "Ministère de la Transition écologique",
      "acronym": "MTE",
      "uri": "https://dev.data.gouv.fr/api/1/organizations/ministere-de-la-transition-ecologique/",
      "slug": "ministere-de-la-transition-ecologique",
      "page": "https://dev.data.gouv.fr/fr/organizations/ministere-de-la-transition-ecologique/",
      "logo": "https://dev-static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-original.jpg",
      "logo_thumbnail": "https://dev-static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-100.jpg",
      "badges": [
        {
          "kind": "public-service"
        },
        {
          "kind": "certified"
        }
      ],
      "id": "534fff8da3a7292c64a77eee",
      "class": "Organization"
    },
    "owner": null,
    "temporal_coverage": {
      "start": "2018-07-01",
      "end": "2018-09-30"
    },
    "spatial": {
      "geom": null,
      "zones": [],
      "granularity": "fr:commune"
    },
    "license": "lov2",
    "uri": "https://dev.data.gouv.fr/api/1/datasets/carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2018/",
    "page": "https://dev.data.gouv.fr/fr/datasets/carte-des-loyers-indicateurs-de-loyers-dannonce-par-commune-en-2018/",
    "last_update": "2020-12-03T11:46:19.622000+00:00",
    "archived": null,
    "quality": {
      "license": true,
      "temporal_coverage": true,
      "spatial": true,
      "update_frequency": true,
      "update_fulfilled_in_time": true,
      "dataset_description_quality": true,
      "has_resources": true,
      "has_open_format": true,
      "all_resources_available": true,
      "resources_documentation": true,
      "score": 1
    },
    "harvest": null,
    "internal": {
      "created_at_internal": "2020-12-02T17:14:01.579000+00:00",
      "last_modified_internal": "2023-01-10T12:55:05.251000+00:00"
    }
  }
]);

export const DefaultSearch = {
  render: (args) => ({
    components: { Search },
    setup() {
      return { args };
    },
    template: ` <Search v-bind="args" />`,
  }),
  args: {},
};

export const WithoutFirstSearch = {
  render: (args) => ({
    components: { Search },
    setup() {
      return { disableFirstSearch: true, sampleResults };
    },
    template: ` <Search :disableFirstSearch="true" :data-results="sampleResults" :data-total-results="20" />`,
  }),
  args: {},
};

