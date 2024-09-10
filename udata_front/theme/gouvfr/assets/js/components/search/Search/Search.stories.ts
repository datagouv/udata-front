import { apiv2 } from "@datagouv/components";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import { delay, http, HttpResponse } from "msw";
import Search from "./Search.vue";

const requestFn = fn();

apiv2.interceptors.request.use(function (request) {
  requestFn(request.params.organization);
  return request;
});

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/2/datasets/search/*', async () => {
          await delay();
          return HttpResponse.json({
            "data": [
              {
                "id": "5b7ffc618b4c4169d30727e0",
                "title": "Base Sirene des entreprises et de leurs \u00e9tablissements (SIREN, SIRET)",
                "acronym": null,
                "slug": "base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret",
                "description": "\u2022 Pour vous abonner \u00e0 notre lettre d'information **Sirene open data actualit\u00e9s**, cliquez **[ici](https://insee.fr/fr/information/1405555)**\n\u2022 Pour consulter nos lettres d'information **Sirene open data actualit\u00e9s**, cliquez **[ici](https://insee.fr/fr/information/3711739)**\n\n**Fichiers stock**\n\n> - **Au 1er Mai**, un **nouveau fichier mensuel stockDoublons** est propos\u00e9, il se compose de la liste des siren et de leurs doublons avec la date de dernier traitement toujours en format CSV.\n> - Les fichiers stock d\u00e9finitifs au format 3.11 sont **publi\u00e9s le 26 mars 2024** en lieu et place des pr\u00e9c\u00e9dents fichiers 3.9.\n\n\nSix fichiers stock mensuels compact\u00e9s (format ZIP) sont mis \u00e0 disposition :\n- le fichier stock des unit\u00e9s l\u00e9gales (unit\u00e9s l\u00e9gales actives et cess\u00e9es dans leur \u00e9tat courant au r\u00e9pertoire)\n- le fichier stock des valeurs historis\u00e9es des unit\u00e9s l\u00e9gales\n- le fichier stock des \u00e9tablissements (\u00e9tablissements actifs et ferm\u00e9s dans leur \u00e9tat courant au r\u00e9pertoire)\n- le fichier stock des valeurs historis\u00e9es des \u00e9tablissements\n- le fichier stock des liens de succession des \u00e9tablissements\n- le fichier stock des siren en doublons \n\nChaque fichier compact\u00e9 (Format ZIP) contient un fichier de donn\u00e9es en format CSV.\nLes fichiers mis en ligne \u00e0 partir du 1er du mois sont une image du r\u00e9pertoire Sirene \u00e0 la date du dernier jour du mois pr\u00e9c\u00e9dent.\nUn fichier stock d\u2019un mois donn\u00e9 remplace celui du mois pr\u00e9c\u00e9dent.\nLes unit\u00e9s l\u00e9gales cess\u00e9es et les \u00e9tablissements ferm\u00e9s y figurent, offrant ainsi l\u2019acc\u00e8s aux donn\u00e9es Sirene depuis 1973.\n\n**Mises \u00e0 jour**\n\nLes mises \u00e0 jour infra mensuelles de ces fichiers, y compris quotidiennes, sont possibles :\n- en utilisant l\u2019**[API Sirene](https://api.insee.fr/catalogue/site/themes/wso2/subthemes/insee/pages/item-info.jag?name=Sirene&version=V3.11&provider=insee)** disponible sur le catalogue des API de l\u2019Insee. Avec l\u2019API, vous acc\u00e9dez en effet \u00e0 des variables indiquant, tant pour les \u00e9tablissements que pour les unit\u00e9s l\u00e9gales, la date du dernier traitement effectu\u00e9. Il s\u2019agit des variables dateDernierTraitementUniteLegale et dateDernierTraitementEtablissement. D\u00e8s lors que cette date est diff\u00e9rente de celle du m\u00eame enregistrement dans votre fichier stock, vous savez qu\u2019une mise \u00e0 jour a \u00e9t\u00e9 effectu\u00e9e. La documentation sur les variables et les services de l'API Sirene est disponible sur l\u2019**[API Sirene](https://api.insee.fr/catalogue/site/themes/wso2/subthemes/insee/pages/item-info.jag?name=Sirene&version=V3.11&provider=insee)**, onglet Documentation ;\n- en utilisant \u00ab\u00a0Constituer une liste\u00a0\u00bb sur **[sirene.fr](https://www.sirene.fr/sirene/public/creation-fichier#date-maj)** (s\u00e9lectionner l'onglet Date de mise \u00e0 jour) pour pouvoir t\u00e9l\u00e9charger des fichiers constitu\u00e9s des mises \u00e0 jour quotidiennes.\nVous pouvez consulter \u00e0 ce sujet [la lettre Sirene open data actualit\u00e9s n\u00b02](https://insee.fr/fr/information/3897526#titre-bloc-22).\n\n**La base Sirene contenant des donn\u00e9es \u00e0 caract\u00e8re personnel, l'Insee attire votre attention sur les obligations l\u00e9gales qui en d\u00e9coulent :**\n\n- Le traitement de ces donn\u00e9es rel\u00e8ve notamment des obligations du r\u00e8glement g\u00e9n\u00e9ral sur la protection des donn\u00e9es (**[RGPD](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)**), de la Loi 78-17 du 6 janvier 1978 modifi\u00e9e, dite **[Loi CNIL](https://www.cnil.fr/fr/loi-78-17-du-6-janvier-1978-modifiee)**\n- Selon votre usage du jeu de donn\u00e9es, il est ainsi de votre responsabilit\u00e9 de tenir compte du statut de diffusion le plus r\u00e9cent de chaque personne physique, qui tient compte des oppositions formul\u00e9es par certaines d'entre elles, \u00e0 la consultation ou l'utilisation de leurs donn\u00e9es Sirene par des tiers autres que les administrations ou organismes habilit\u00e9s.\n- Les unit\u00e9s l\u00e9gales ou les \u00e9tablissements qui ont un statut de diffusion cod\u00e9 \u00ab\u00a0P\u00a0\u00bb (resp. statutDiffusionUniteLegale ou statutDiffusionEtablissement)\u00a0font l\u2019objet d\u2019une diffusion partielle des donn\u00e9es cons\u00e9cutive \u00e0 une demande d\u2019opposition. Pour une opposition de personne physique, l\u2019identit\u00e9 de l\u2019entrepreneur (nom, pr\u00e9noms\u2026), l\u2019adresse dans la commune et la g\u00e9olocalisation seront masqu\u00e9es (c\u2019est-\u00e0-dire non diffus\u00e9es par l\u2019API Sirene). Pour une opposition de repr\u00e9sentants l\u00e9gaux d\u2019une personne morale, l\u2019adresse de l\u2019\u00e9tablissement dans la commune et sa g\u00e9olocalisation seront masqu\u00e9es. Il est entendu que les donn\u00e9es relatives aux repr\u00e9sentants l\u00e9gaux ne sont pas diffus\u00e9es par l\u2019Insee en Open Data, m\u00eame en l\u2019absence d\u2019opposition, et ce conform\u00e9ment \u00e0 l\u2019**[article R 123-232](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043291593)** du Code de commerce. \n\n**Si vous \u00eates une entreprise :**\n\n- ATTENTION , pour toute demande de cr\u00e9ation, de modification ou de changement concernant votre situation administrative, nous vous invitons \u00e0 contacter le **[Guichet Unique](https://formalites.entreprises.gouv.fr)**\n- ATTENTION, aucune demande de ce type parvenant sur ce site ne pourra \u00eatre satisfaite.",
                "created_at": "2018-08-24T14:38:57.262000+00:00",
                "last_modified": "2024-09-01T06:41:23.766000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "association",
                  "companies",
                  "entreprises",
                  "entreprises-et-propriete-dentreprises",
                  "etablissements",
                  "hvd",
                  "register",
                  "registre",
                  "repertoire",
                  "siren",
                  "sirene",
                  "siret"
                ],
                "badges": [
                  {
                    "kind": "spd"
                  }
                ],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5b7ffc618b4c4169d30727e0/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 18
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5b7ffc618b4c4169d30727e0&page=1&page_size=50",
                  "type": "GET",
                  "total": 9
                },
                "frequency": "monthly",
                "frequency_date": "2018-10-03T18:00:00+00:00",
                "extras": {
                  "recommendations-reuses": [
                    {
                      "id": "5fbf724d677c5e31fdedea88",
                      "score": 50,
                      "source": "edito"
                    }
                  ],
                  "recommendations:sources": [
                    "edito"
                  ],
                  "recommendations-externals": [
                    {
                      "id": "https://annuaire-entreprises.data.gouv.fr/",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Are you looking for your SIRET number?",
                          "message": "L'Annuaire des Entreprises allows you to easily find SIRET numbers from the INSEE base.",
                          "button": "Visit l'Annuaire des Entreprises"
                        },
                        "fr": {
                          "title": "Vous cherchez votre num\u00e9ro SIRET ?",
                          "message": "L'Annuaire des Entreprises vous permet de facilement retrouver des num\u00e9ros de SIRET depuis la base de l'INSEE.",
                          "button": "Consulter l'Annuaire des Entreprises"
                        }
                      }
                    }
                  ],
                  "apigouvfr:apis": [
                    {
                      "title": "API Conventions collectives",
                      "tagline": "Retrouvez les conventions collectives d'une entreprise \u00e0 partir de son num\u00e9ro SIRET",
                      "path": "/les-api/api-conventions-collectives",
                      "slug": "api-conventions-collectives",
                      "openness": "open",
                      "owner": "Minist\u00e8re du Travail, de l'Emploi et de l'Insertion",
                      "owner_acronym": "MTEI",
                      "logo": "/images/api-logo/logo-mtei.png"
                    },
                    {
                      "title": "API Recherche d\u2019entreprises",
                      "tagline": "Rechercher une entreprise fran\u00e7aise, par sa d\u00e9nomination, ou son adresse",
                      "path": "/les-api/api-recherche-entreprises",
                      "slug": "api-recherche-entreprises",
                      "openness": "open",
                      "owner": "Direction Interminist\u00e9rielle du Num\u00e9rique",
                      "owner_acronym": "DINUM",
                      "logo": "/images/api-logo/dinum.png"
                    },
                    {
                      "title": "API Sirene",
                      "tagline": "Acc\u00e9der aux informations concernant les entreprises et les \u00e9tablissements immatricul\u00e9s au r\u00e9pertoire interadministratif Sirene de l'Insee",
                      "path": "/les-api/sirene_v3",
                      "slug": "sirene_v3",
                      "openness": "semi_open",
                      "owner": "Institut national de la statistique et des \u00e9tudes \u00e9conomiques",
                      "owner_acronym": "Insee",
                      "logo": "/images/api-logo/Logo_Insee.svg"
                    }
                  ]
                },
                "metrics": {
                  "discussions": 591,
                  "reuses": 54,
                  "followers": 136,
                  "views": 883378,
                  "resources_downloads": 979534
                },
                "organization": {
                  "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
                  "page": "https://www.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "logo": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
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
                  "start": "1973-01-01",
                  "end": "2023-12-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "other"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/",
                "page": "https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/",
                "last_update": "2024-09-01T06:41:18+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2018-08-24T14:38:57.262000+00:00",
                  "last_modified_internal": "2024-09-01T06:41:23.766000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5c4ae55a634f4117716d5656",
                "title": "Demandes de valeurs fonci\u00e8res",
                "acronym": "DVF",
                "slug": "demandes-de-valeurs-foncieres",
                "description": "### Propos liminaires\n\nConform\u00e9ment au d\u00e9cret n\u00b0\u00a02018\u20111350 du 28\u00a0d\u00e9cembre\u00a02018 relatif \u00e0 la publication sous forme \u00e9lectronique des informations portant sur les valeurs fonci\u00e8res d\u00e9clar\u00e9es \u00e0 l\u2019occasion des mutations immobili\u00e8res, le pr\u00e9sent fichier DVF est d\u00e9sormais disponible en open data.\nLa publication de ces donn\u00e9es r\u00e9pond \u00e0 l\u2019objectif de transparence des march\u00e9s fonciers et immobiliers.\n\n**Le fichier DVF contient des donn\u00e9es \u00e0 caract\u00e8re personnel et la DGFiP attire votre attention sur les obligations l\u00e9gales qui en d\u00e9coulent :**\n    \u2022 L\u2019article R112 A-3 du Livre des proc\u00e9dures fiscales pr\u00e9voit que l\u2019utilisation de ces fichiers ne doit pas permettre la r\u00e9-identification des personnes concern\u00e9es, de mani\u00e8re indirecte.\n    \u2022 La r\u00e9utilisation des donn\u00e9es ne doit pas permettre l\u2019indexation des donn\u00e9es depuis les moteurs de recherche externes.\n\nVeuillez lire attentivement les Conditions g\u00e9n\u00e9rales d\u2019utilisation.\n\n### Qu\u2019est-ce que DVF\u00a0?\n\nLe pr\u00e9sent jeu de donn\u00e9es \u00ab\u00a0Demandes de valeurs fonci\u00e8res\u00a0\u00bb, publi\u00e9 et produit par la direction g\u00e9n\u00e9rale des finances publiques, permet de conna\u00eetre les transactions immobili\u00e8res intervenues au cours des cinq derni\u00e8res ann\u00e9es sur le territoire m\u00e9tropolitain et les DOM-TOM, **\u00e0 l\u2019exception de l\u2019Alsace, de la Moselle et de Mayotte**. Les donn\u00e9es contenues sont issues des actes notari\u00e9s et des informations cadastrales\n\n### Pr\u00e9sentation des fichiers\n\nLes fichiers correspondant chacun \u00e0 un mill\u00e9sime sont mis \u00e0 disposition au format.txt. sur cinq ans. Ils peuvent \u00eatre lus par deux logiciels\u00a0:\n    \u2022 Notepad++\n    \u2022 Classeur excel ou calc avec le s\u00e9parateur suivant\u00a0: | (CTRL 6)\nUne notice explicative accompagne les fichiers, ainsi que les conditions g\u00e9n\u00e9rales d\u2019utilisation et un document d\u2019information \u00e0 l\u2019attention des acqu\u00e9reurs.\n\n\u26a0 Attention, les fichiers sont volumineux.\n\n### Mise \u00e0 jour des fichiers\n\nLes fichiers mis \u00e0 disposition font l\u2019objet d\u2019une mise \u00e0 jour semestrielle, en avril et en octobre.\nChaque mise \u00e0 jour supprime puis remplace la totalit\u00e9 des fichiers pr\u00e9c\u00e9demment publi\u00e9s.\n\n\u26a0 Point d\u2019attention\u00a0: les fichiers sont aliment\u00e9s par les donn\u00e9es saisies dans les services de la publicit\u00e9 fonci\u00e8re de la DGFiP et \u00e0 chaque mise \u00e0 jour de nouvelles transactions sont susceptibles d\u2019\u00eatre ajout\u00e9es dans tous les mill\u00e9simes en fonction de la date de mutation.\n\nLa derni\u00e8re mise \u00e0 jour date du **08 avril 2024**.\n\n### Contact\n\nPour toute demande d\u2019information ou toute erreur d\u00e9tect\u00e9e, veuillez contacter le bureau GF-3B de la DGFiP \u00e0 l\u2019adresse suivante\u00a0: **bureau.gf3b-dvf[at]dgfip.finances.gouv.fr**",
                "created_at": "2019-01-25T11:30:50.573000+00:00",
                "last_modified": "2024-04-08T13:07:58.362000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "foncier",
                  "foncier-sol-mutation-fonciere",
                  "fonciere",
                  "mutations",
                  "mutations-a-titre-onereux",
                  "valeur-fonciere"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5c4ae55a634f4117716d5656/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 9
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5c4ae55a634f4117716d5656&page=1&page_size=50",
                  "type": "GET",
                  "total": 5
                },
                "frequency": "semiannual",
                "frequency_date": "2022-04-08T16:00:00+00:00",
                "extras": {
                  "recommendations-externals": [
                    {
                      "id": "https://explore.data.gouv.fr/immobilier",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Are you looking for a property\u2019s sale price\u00a0?",
                          "message": "The \u00ab\u00a0Donn\u00e9es de valeur fonci\u00e8re (DVF)\u00a0\u00bb app allows you to easily find information on sold properties from the Direction g\u00e9n\u00e9rale des finances publiques base.",
                          "button": "Visit the \u00ab\u00a0Demandes de valeur fonci\u00e8re (DVF)\u00a0\u00bb app"
                        },
                        "fr": {
                          "title": "Vous cherchez le prix de vente d\u2019un bien immobilier\u00a0ou d\u2019un terrain ?",
                          "message": "L\u2019application \u00ab\u00a0Donn\u00e9es de valeur fonci\u00e8re (DVF)\u00a0\u00bb vous permet d\u2019acc\u00e9der \u00e0 une information claire sur les biens vendus issus de la base de la Direction g\u00e9n\u00e9rale des finances publiques.",
                          "button": "Consulter l\u2019application \u00ab\u00a0Donn\u00e9es de valeur fonci\u00e8re (DVF)\u00a0\u00bb"
                        }
                      }
                    },
                    {
                      "id": "https://app.dvf.etalab.gouv.fr/",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Are you looking for a property\u2019s sale price\u00a0?",
                          "message": "The \u00ab\u00a0Donn\u00e9es de valeur fonci\u00e8re (DVF)\u00a0\u00bb app allows you to easily find information on sold properties from the Direction g\u00e9n\u00e9rale des finances publiques base.",
                          "button": "Visit the \u00ab\u00a0Demandes de valeur fonci\u00e8re (DVF)\u00a0\u00bb app"
                        },
                        "fr": {
                          "title": "Vous cherchez le prix de vente d\u2019un bien immobilier\u00a0ou d\u2019un terrain ?",
                          "message": "L\u2019application \u00ab\u00a0Donn\u00e9es de valeur fonci\u00e8re (DVF)\u00a0\u00bb vous permet d\u2019acc\u00e9der \u00e0 une information claire sur les biens vendus issus de la base de la Direction g\u00e9n\u00e9rale des finances publiques.",
                          "button": "Consulter l\u2019application \u00ab\u00a0Donn\u00e9es de valeur fonci\u00e8re (DVF)\u00a0\u00bb"
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
                      "id": "5cc1b94a634f4165e96436c1",
                      "score": 45,
                      "source": "matomo"
                    }
                  ]
                },
                "metrics": {
                  "discussions": 29,
                  "reuses": 88,
                  "followers": 154,
                  "views": 837602,
                  "resources_downloads": 167757
                },
                "organization": {
                  "name": "Minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique",
                  "acronym": "MEFSIN",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "logo": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
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
                  "start": "2019-01-01",
                  "end": "2023-12-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "poi"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/demandes-de-valeurs-foncieres/",
                "page": "https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/",
                "last_update": "2024-04-08T13:07:58.347000+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2019-01-25T11:30:50.573000+00:00",
                  "last_modified_internal": "2024-04-08T13:07:58.362000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "58e5924b88ee3802ca255566",
                "title": "Plan Cadastral Informatis\u00e9",
                "acronym": "PCI",
                "slug": "plan-cadastral-informatise",
                "description": "Le plan cadastral est un assemblage d\u2019environ **600 000 feuilles** ou planches repr\u00e9sentant chacune une section ou une partie d\u2019une section cadastrale.\n\n\nIl couvre la France enti\u00e8re, \u00e0 l\u2019exception de la ville de Strasbourg et de quelques communes voisines, pour des raisons historiques li\u00e9e \u00e0 l\u2019occupation de l\u2019Alsace-Moselle par l\u2019Allemagne entre 1871 et 1918.\n\n#### \n\n#### PCI Vecteur et PCI Image\n\n#### \n\nPour des questions pratiques et techniques, le Plan Cadastral Informatis\u00e9 existe sous la forme de **deux produits compl\u00e9mentaires** : le PCI Vecteur et le PCI Image.\n\nLe **PCI Vecteur** regroupe les feuilles qui ont \u00e9t\u00e9 num\u00e9ris\u00e9es et couvre l\u2019essentiel du territoire.\n\nLe **PCI Image** regroupe les feuilles qui n\u2019ont \u00e9t\u00e9 que scann\u00e9es, et compl\u00e8te la couverture.\n\n#### \n\n#### Couverture\n\n#### \n\n **34 700 communes** sont couvertes par le PCI Vecteur, sur un total de pr\u00e8s de 35 000. Les plans des autres communes sont disponibles dans le PCI Image.\n\nStrasbourg et les communes limitrophes ne sont actuellement pas g\u00e9r\u00e9es au format PCI.\n\nLes collectivit\u00e9s d\u2019outre-mer de Saint-Martin et de Saint-Barthelemy sont pr\u00e9sentes et historiquement int\u00e9gr\u00e9es dans le d\u00e9partement de la Guadeloupe (971).\n\n#### \n\n#### Formats disponibles\n\n#### \n\nLes donn\u00e9es du PCI Vecteur sont disponibles dans plusieurs formats :\n\n  * Format [EDIG\u00c9O](https://www.data.gouv.fr/s/resources/plan-cadastral-informatise/20170906-150737/standard_edigeo_2013.pdf) en projection Lambert 93 ;\n  * Format [EDIG\u00c9O](https://www.data.gouv.fr/s/resources/plan-cadastral-informatise/20170906-150737/standard_edigeo_2013.pdf) en projection Lambert CC 9 zones ;\n  * Format DXF-PCI en projection Lambert 93 ;\n  * Format DXF-PCI en projection Lambert CC 9 zones.\n\n\n\nLes donn\u00e9es du PCI Image sont disponibles au format TIFF.\n\n#### \n\n#### Mod\u00e8le de donn\u00e9es\n\n#### \n\nChaque commune est subdivis\u00e9e en sections, elles-m\u00eames subdivis\u00e9es en feuilles (ou planches). Une feuille cadastrale comporte des parcelles, qui peuvent supporter des b\u00e2timents, ainsi que de nombreux autres objets d\u2019habillage ou de gestion.  \nPour plus de pr\u00e9cision, veuillez vous reporter \u00e0 la documentation du standard [EDIG\u00c9O](https://www.data.gouv.fr/s/resources/plan-cadastral-informatise/20170906-150737/standard_edigeo_2013.pdf).\n\n#### \n\n#### Mise \u00e0 disposition\n\n#### \n\nLes donn\u00e9es sont mises \u00e0 disposition de deux mani\u00e8res :\n\n  * En t\u00e9l\u00e9chargement direct \u00e0 la feuille ou en archive d\u00e9partementale. Ce sont ces URL qu\u2019il faut utiliser si vous souhaitez automatiser la r\u00e9cup\u00e9ration des donn\u00e9es et b\u00e9n\u00e9ficier des meilleures performances.\n  * Via un outil en ligne pour les archives communales. Les donn\u00e9es sont alors produites \u00e0 la vol\u00e9e.\n\n\n\nLes deux modes de mise \u00e0 disposition sont accessibles sur [cadastre.data.gouv.fr](https://cadastre.data.gouv.fr/datasets/plan-cadastral-informatise).\n\n#### \n\n#### Mill\u00e9simes disponibles :\n\n#### \n\n  * 13 f\u00e9vrier 2017\n  * 14 mai 2017\n  * 6 juillet 2017\n  * 12 octobre 2017\n  * 2 janvier 2018\n  * 3 avril 2018\n  * 29 juin 2018\n  * 1er octobre 2018\n  * 1er janvier 2019\n  * 1er avril 2019\n  * 1er juillet 2019\n  * 1er octobre 2019\n  * 1er janvier 2020\n  * 1er juillet 2020\n  * 1er octobre 2020\n  * 1er f\u00e9vrier 2021\n  * 1er avril 2021\n  * 1er juillet 2021\n  * 1er octobre 2021\n  * 1er janvier 2022\n  * 1er avril 2022\n  * 1er juillet 2022\n  * 1er octobre 2022\n  * 1er janvier 2023\n  * 1er avril 2023\n  * 1er juillet 2023\n  * 1er octobre 2023\n  * 1er janvier 2024\n  * 1er avril 2024\n  * 1er juillet 2024\n",
                "created_at": "2017-04-06T02:56:43.520000+00:00",
                "last_modified": "2024-07-22T16:04:24.610000+00:00",
                "deleted": null,
                "private": false,
                "tags": [],
                "badges": [
                  {
                    "kind": "spd"
                  }
                ],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/58e5924b88ee3802ca255566/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 3
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=58e5924b88ee3802ca255566&page=1&page_size=50",
                  "type": "GET",
                  "total": 11
                },
                "frequency": "quarterly",
                "frequency_date": "2024-07-01T00:00:00+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 26,
                  "reuses": 10,
                  "followers": 74,
                  "views": 140709,
                  "resources_downloads": 24535
                },
                "organization": {
                  "name": "Minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique",
                  "acronym": "MEFSIN",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "logo": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
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
                  "start": "2017-09-30",
                  "end": "2024-07-01"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "other"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/plan-cadastral-informatise/",
                "page": "https://www.data.gouv.fr/fr/datasets/plan-cadastral-informatise/",
                "last_update": "2024-07-22T16:03:57.027610+00:00",
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
                  "resources_documentation": false,
                  "score": 0.8888888888888888
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2017-04-06T02:56:43.520000+00:00",
                  "last_modified_internal": "2024-07-22T16:04:24.610000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5c34c4d1634f4173183a64f1",
                "title": "R\u00e9pertoire national des \u00e9lus",
                "acronym": "RNE",
                "slug": "repertoire-national-des-elus-1",
                "description": "Le R\u00e9pertoire National des \u00c9lus (RNE) a pour finalit\u00e9 le suivi des titulaires d\u2019un mandat \u00e9lectoral. Il est renseign\u00e9 et tenu \u00e0 jour par les pr\u00e9fectures et hauts commissariats et par les services du minist\u00e8re de l'int\u00e9rieur, notamment sur la base des \u00e9l\u00e9ments fournis par les \u00e9lus lors de la phase d\u2019enregistrement des candidatures.\n\nLes donn\u00e9es du RNE sont structur\u00e9es par mandat. Ce jeu de donn\u00e9es comprend douze fichiers :\n\n1- les conseillers d'arrondissement ;\n2- les conseillers municipaux ;\n3- les conseillers communautaires ;\n4- les conseillers d\u00e9partementaux ;\n5- les conseillers r\u00e9gionaux ;\n6- les membres des assembl\u00e9es des collectivit\u00e9s \u00e0 statut particulier ;\n7- les repr\u00e9sentants au Parlement europ\u00e9en ;\n8- les s\u00e9nateurs ;\n9- les d\u00e9put\u00e9s ;\n10- les maires ;\n11- les conseillers des Fran\u00e7ais de l'\u00e9tranger ;\n12- les membres de l'Assembl\u00e9e des Fran\u00e7ais de l'\u00e9tranger.\n\nUn \u00e9lu qui dispose de plusieurs mandats figurera dans plusieurs fichiers. Un \u00e9lu qui dispose de plusieurs fonctions apparaitra plusieurs fois au sein du m\u00eame fichier (exemple : un \u00e9lu adjoint au maire et maire d\u00e9l\u00e9gu\u00e9 apparaitra deux fois au sein du fichier des conseillers municipaux).\n\nLes fichiers mis en ligne sont actualis\u00e9s trimestriellement.\n\nLes donn\u00e9es relatives \u00e0 la profession sont d\u00e9claratives. Le r\u00e9f\u00e9rentiel des codes professions correspond au r\u00e9f\u00e9rentiel de l'INSEE.\n\nLes demandes de rectification doivent \u00eatre adress\u00e9es directement par courriel \u00e0 la pr\u00e9fecture territorialement comp\u00e9tente (pref-rne-contact@nom-du-departement.gouv.fr). Aucune demande de rectification adress\u00e9e sur la plateforme www.data.gouv.fr ne sera prise en compte. Les rectifications apport\u00e9es dans le RNE ne seront pas report\u00e9es imm\u00e9diatement sur la plate-forme www.data.gouv.fr, mais seront prises en compte pour la publication suivante.\n\nMise \u00e0 jour du 30/07/2024. Le s\u00e9parateur utilis\u00e9 dans les fichiers est d\u00e9sormais le point-virgule, et non plus la virgule.",
                "created_at": "2019-01-08T16:42:09.929000+00:00",
                "last_modified": "2024-07-31T14:24:59.737000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "conseillers-communautaires",
                  "conseillers-departementaux",
                  "conseillers-des-francais-de-letranger",
                  "conseillers-municipaux",
                  "conseillers-regionaux",
                  "deputes",
                  "elections",
                  "elections-cantonales",
                  "elections-europeennes",
                  "elections-legislatives",
                  "elections-municipales",
                  "elections-regionales",
                  "elus",
                  "maires",
                  "membre-de-lassemblee-des-francais-de-letranger",
                  "membre-dune-assemblee",
                  "rne",
                  "senateurs"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5c34c4d1634f4173183a64f1/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 12
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5c34c4d1634f4173183a64f1&page=1&page_size=50",
                  "type": "GET",
                  "total": 3
                },
                "frequency": "quarterly",
                "frequency_date": "2019-04-08T20:00:00+00:00",
                "extras": {
                  "apigouvfr:apis": [
                    {
                      "title": "API Recherche d\u2019entreprises",
                      "tagline": "Rechercher une entreprise fran\u00e7aise, par sa d\u00e9nomination, ou son adresse",
                      "path": "/les-api/api-recherche-entreprises",
                      "slug": "api-recherche-entreprises",
                      "openness": "open",
                      "owner": "Direction Interminist\u00e9rielle du Num\u00e9rique",
                      "owner_acronym": "DINUM",
                      "logo": "/images/api-logo/dinum.png"
                    }
                  ],
                  "recommendations": [
                    {
                      "id": "53699924a3a729239d205175",
                      "score": 29,
                      "source": "matomo"
                    }
                  ],
                  "recommendations:sources": [
                    "matomo"
                  ]
                },
                "metrics": {
                  "discussions": 115,
                  "reuses": 21,
                  "followers": 76,
                  "views": 134966,
                  "resources_downloads": 1589614
                },
                "organization": {
                  "name": "Minist\u00e8re de l'Int\u00e9rieur et des Outre-Mer",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-linterieur-et-des-outre-mer/",
                  "slug": "ministere-de-linterieur-et-des-outre-mer",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-linterieur-et-des-outre-mer/",
                  "logo": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-100.png",
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
                  "start": "2024-07-30",
                  "end": "2024-07-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:commune"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/repertoire-national-des-elus-1/",
                "page": "https://www.data.gouv.fr/fr/datasets/repertoire-national-des-elus-1/",
                "last_update": "2024-07-31T14:24:59.717000+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2019-01-08T16:42:09.929000+00:00",
                  "last_modified_internal": "2024-07-31T14:24:59.737000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "53699d0ea3a729239d205b2e",
                "title": "Population",
                "acronym": null,
                "slug": "population",
                "description": "Ce jeu de donn\u00e9es permet d'acc\u00e9der aux r\u00e9sultats des recensements de la population, \u00e0 des s\u00e9ries chronologiques de la Banque de Donn\u00e9es Macro-\u00e9conomiques de l'Insee sur le th\u00e8me de la population et \u00e0 d'autres donn\u00e9es issues notamment des statistiques de l'\u00e9tat civil. \n\nLe recensement de la population permet de conna\u00eetre la diversit\u00e9 et l'\u00e9volution de la population de la France. L'Insee fournit ainsi des statistiques sur les habitants et les logements, leur nombre et leurs caract\u00e9ristiques : r\u00e9partition par sexe et \u00e2ge, professions, dipl\u00f4mes-formation, conditions de logement, modes de transport, d\u00e9placements domicile-travail, etc.\n\nLa BDM est la principale base de donn\u00e9es de s\u00e9ries et indices sur l'ensemble des domaines \u00e9conomiques et sociaux. \n\n",
                "created_at": "2013-08-23T08:43:28.560000+00:00",
                "last_modified": "2024-06-07T14:30:50.450000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "deces",
                  "demographie",
                  "etat-civil",
                  "famille",
                  "hvd",
                  "mariages",
                  "menages",
                  "naissances",
                  "population",
                  "recensement",
                  "statistiques"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/53699d0ea3a729239d205b2e/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 8
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=53699d0ea3a729239d205b2e&page=1&page_size=50",
                  "type": "GET",
                  "total": 1
                },
                "frequency": "monthly",
                "frequency_date": null,
                "extras": {
                  "datagouv_ckan_id": "81ba9cac-f837-419e-835e-bb538a92ea54",
                  "datagouv_ckan_last_sync": "2014-09-16T09:54:48.768000"
                },
                "metrics": {
                  "discussions": 10,
                  "reuses": 34,
                  "followers": 56,
                  "views": 90027,
                  "resources_downloads": 27132
                },
                "organization": {
                  "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
                  "page": "https://www.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "logo": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
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
                "temporal_coverage": null,
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:commune"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/population/",
                "page": "https://www.data.gouv.fr/fr/datasets/population/",
                "last_update": "2024-09-01T17:43:52.827073+00:00",
                "archived": null,
                "quality": {
                  "license": true,
                  "temporal_coverage": false,
                  "spatial": true,
                  "update_frequency": true,
                  "update_fulfilled_in_time": true,
                  "dataset_description_quality": true,
                  "has_resources": true,
                  "has_open_format": true,
                  "all_resources_available": true,
                  "resources_documentation": true,
                  "score": 0.8888888888888888
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2013-08-23T08:43:28.560000+00:00",
                  "last_modified_internal": "2024-06-07T14:30:50.450000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5e7e104ace2080d9162b61d8",
                "title": "Donn\u00e9es hospitali\u00e8res relatives \u00e0 l'\u00e9pid\u00e9mie de COVID-19",
                "acronym": "SIVIC",
                "slug": "donnees-hospitalieres-relatives-a-lepidemie-de-covid-19",
                "description": "**Dans un contexte d\u2019\u00e9pid\u00e9mie favorable, \u00e0 compter du 1er juillet 2023, le cadre juridique actuellement en cours pr\u00e9voit l\u2019arr\u00eat du traitement des donn\u00e9es personnelles issues de SI-DEP. Par cons\u00e9quent, apr\u00e8s une p\u00e9riode transitoire d\u2019ajustement de deux semaines, les nouveaux indicateurs de surveillance virologique seront publi\u00e9s aux niveaux national, r\u00e9gional et d\u00e9partemental) \u00e0 une fr\u00e9quence hebdomadaire. \nLes consignes de saisie sp\u00e9cifiques dans SI-VIC seront lev\u00e9es \u00e0 partir de cette date, les indicateurs hospitaliers ne seront plus disponibles. \nSant\u00e9 publique France maintient la surveillance de l\u2019\u00e9pid\u00e9mie \u00e0 travers son dispositif multi-sources. Les indicateurs relatifs \u00e0 la surveillance g\u00e9nomique, aux recours aux associations SOS M\u00e9decins, aux urgences hospitali\u00e8res et aux d\u00e9c\u00e8s resteront disponibles.**\n\n**04/04/2023**\nSuite aux adaptations des consignes de saisie des donn\u00e9es observ\u00e9es par les \u00e9tablissements de sant\u00e9, Sant\u00e9 publique France publie fait \u00e9voluer sa restitution des indicateurs de la surveillance hospitali\u00e8re de COVID-19 issus de SIVIC tel que : \n-\tsont suspendus les indicateurs calcul\u00e9s par date de d\u00e9claration \n-\tsont maintenus les indicateurs calcul\u00e9s par date d\u2019admission \u00e0 un rythme bihebdomadaire, les mardi et vendredi.\n\nLes ressources toujours actualis\u00e9es :\n- covid_hosp_txad_fra\n- covid_hosp_ad_age\n- covid_hosp_txad_reg\n- covid_hosp_txad_age_fra\n\n\n**08/06/2022** Compte tenu de la tendance actuelle favorable et la baisse des principaux indicateurs, \u00e0 partir du 11 juin 2022, les indicateurs COVID-19 produits par Sant\u00e9 publique France seront actualis\u00e9s sur G\u00e9odes et data.gouv.fr tous les jours \u00e0 l\u2019exception des week-end et des jours f\u00e9ri\u00e9s. \n\n**Information 11/03/2022**\nLe **nom de fichiers** a \u00e9t\u00e9 modifi\u00e9, suite \u00e0 la mise \u00e0 jour du syst\u00e8me informatique :\n _donnees-hospitalieres-covid19_ devient covid_hospit\n _donnees-hospitalieres-etablissements-covid19_ devient covid_hospit_etab\n _donnees-hospitalieres-nouveaux-covid19_ devient covid_hospit_incid\n _donnees-hospitalieres-classe-age-covid19_ devient covid_hospit_clage10\n _donnees-hospitalieres-classe-age-hebdo-covid19_ devient covid_hosp_ad_age\n\n**Information 04/02/2022**\nDepuis mardi 1er f\u00e9vrier, les formats des fichiers d\u00e9c\u00e8s dans SIVIC ont \u00e9t\u00e9 modifi\u00e9s en amont de Sant\u00e9 publique France. Certaines donn\u00e9es n\u2019ont pas \u00e9t\u00e9 dans nos indicateurs, entrainant une sous-estimation des indicateurs hospitaliers les 2 et 3 f\u00e9vrier. \n\nLes nombres de nouvelles hospitalisations, admissions en soins critiques et d\u00e9c\u00e8s d\u00e9clar\u00e9s le 4 F\u00e9vrier 2022 int\u00e8grent un rattrapage de donn\u00e9es et sont donc surestim\u00e9s.\n\n**Information 31/01/2022**\nAjout de la variable `pouravec` dans les fichiers _covid-hosp-txad-fra.csv_, _covid-hosp-txad-reg.csv_ et _covid-hosp-txad-age-fra.csv_\nCette variable permet une s\u00e9lection selon le lien de l'hospitalisation avec la COVID-19 :\n\n`0` =\tHospitalisations avec infection SARS-CoV-2 (quelque soit le motif de l'hospitalisation)\n`1` =\tHospitalisations pour COVID-19\n`2` =\tHospitalisations pour autre motif, avec infection SARS-CoV-2\n\n(la modalit\u00e9 \"0\" est la somme des modalit\u00e9s \"1\" et \"2\")\n\n_SI-VIC est un outil administratif de gestion hospitali\u00e8re et ne contient aucune information m\u00e9dicale. Les **d\u00e9c\u00e8s** notifi\u00e9s dans SI-VIC ne comprennent donc aucune information concernant l'imputabilit\u00e9 de la Covid-19 au d\u00e9c\u00e8s. La distinction des patients d\u00e9c\u00e9d\u00e9s au cours d'une hospitalisation pour COVID-19 de ceux d\u00e9c\u00e9d\u00e9s au cours d'une hospitalisation pour un autre motif mais avec une infection SARS-CoV-2 ne peut donc \u00eatre faite en se basant sur les donn\u00e9es SI-VIC_\n\n**Information 26/11/2021**\nAjout de ressources donnant acc\u00e8s aux donn\u00e9es hebdomadaires r\u00e9gionales et nationales d'hospitalisation et en fonction de **la date d'admission.**\n\nLes variables pour _covid-hosp-txad-fra.csv_ et _covid-hosp-txad-reg.csv_ \n`tx_indic_7J_DC` = Taux de personnes d\u00e9c\u00e9d\u00e9es durant les 7 derniers jours  (pour 100 000 hab.) \n`tx_indic_7J_hosp` = Taux de nouvelles hospitalisation lors des 7 derniers jours  (pour 100 000 hab.) \n`tx_indic_7J_SC` = Taux de nouvelles hospitalisation en soins critiques lors des 7 derniers jours  (pour 100 000 hab.) \n`tx_prev_hosp` = Taux personnes hospitalis\u00e9es  (pour 100 000 hab.) \n`tx_prev_SC` = Taux de personnes en soins critiques  (pour 100 000 hab.) \n\nEn plus pour _covid-hosp-txad-age-fra.csv_ :\n`cl_age90` = Classe d'\u00e2ge\n\n### Les actions de Sant\u00e9 publique France\n\nSant\u00e9 publique France a pour mission d'am\u00e9liorer et de prot\u00e9ger la sant\u00e9 des populations. Durant la crise sanitaire li\u00e9e \u00e0 l'\u00e9pid\u00e9mie du COVID-19, Sant\u00e9 publique France se charge de surveiller et comprendre la dynamique de l'\u00e9pid\u00e9mie, d'anticiper les diff\u00e9rents sc\u00e9narii et de mettre en place des actions pour pr\u00e9venir et limiter la transmission de ce virus sur le territoire national.\n\n### Description du jeu de donn\u00e9es\n\nLe pr\u00e9sent jeu de donn\u00e9es renseigne sur la situation hospitali\u00e8res concernant l'\u00e9pid\u00e9mie de COVID-19.\n\nCinq fichiers sont propos\u00e9s : \n\n- **Les donn\u00e9es hospitali\u00e8res relatives \u00e0 l'\u00e9pid\u00e9mie du COVID-19 par d\u00e9partement et sexe du patient** : nombre de patients hospitalis\u00e9s, nombre de personnes actuellement en r\u00e9animation ou soins intensifs, nombre de personnes actuellement en Soins de Suite et de R\u00e9adaptation (SSR) ou Unit\u00e9s de Soins de Longue Dur\u00e9e(USLD), nombre de personnes actuellement en hospitalisation conventionnelle, nombre actuellement de personnes hospitalis\u00e9es dans un autre type de service ou nombre cumul\u00e9 de personnes retourn\u00e9es \u00e0 domicile, nombre cumul\u00e9 de personnes d\u00e9c\u00e9d\u00e9es.\n\n- **Les donn\u00e9es hospitali\u00e8res relatives \u00e0 l'\u00e9pid\u00e9mie du COVID-19 par r\u00e9gion, et classe d'\u00e2ge du patient** : nombre de patients hospitalis\u00e9s, nombre de personnes actuellement en r\u00e9animation ou soins intensifs, nombre de personnes actuellement en Soins de Suite et de R\u00e9adaptation (SSR) ou Unit\u00e9s de Soins de Longue Dur\u00e9e(USLD), nombre de personnes actuellement en hospitalisation conventionnelle, nombre actuellement de personnes hospitalis\u00e9es dans un autre type de service, nombre cumul\u00e9 de personnes retourn\u00e9es \u00e0 domicile, nombre cumul\u00e9 de personnes d\u00e9c\u00e9d\u00e9es.\nLe codage des classes d'\u00e2ges est le suivant :\n0\t= tous \u00e2ges\n09\t= 0-9 ans\n19\t= 10-19 ans\n29\t= 20-29 ans\n39\t= 30-39 ans\n49\t= 40-49 ans\n59\t= 50-59 ans\n69\t= 60-69 ans\n79\t= 70- 79 ans\n89\t= 80-89 ans\n90\t= 90 ans et plus\n\n- **Les donn\u00e9es hospitali\u00e8res quotidiennes relatives \u00e0 l'\u00e9pid\u00e9mie du COVID-19 par d\u00e9partement** : nombre quotidien de personnes nouvellement hospitalis\u00e9es, nombre quotidien de nouvelles admissions en r\u00e9animation, nombre quotidien de personnes nouvellement d\u00e9c\u00e9d\u00e9es, nombre quotidien de nouveaux retours \u00e0 domicile.\n\n- **Les donn\u00e9es relatives aux \u00e9tablissements hospitaliers par d\u00e9partement** : nombre cumul\u00e9 de services ayant d\u00e9clar\u00e9 au moins un cas.\n\n- **Les donn\u00e9es relatives \u00e0 les nouvelles admissions en r\u00e9animation par r\u00e9gion** : nombre de nouveaux patients admis en r\u00e9animation dans les 24 derni\u00e8res heures.\n\n\n### Anomalies d\u00e9tect\u00e9es dans les fichiers\n\nAttention, certains fichiers peuvent comporter des anomalies du fait des difficult\u00e9s de collecte des donn\u00e9es.\n\nDes rapports d'erreurs sont publi\u00e9s tous les jours par Etalab dans la rubrique ressources communautaires :\n- [Rapport d'erreurs pour les donn\u00e9es hospitali\u00e8res](https://www.data.gouv.fr/fr/datasets/r/f19775db-15c0-4261-a8a6-255034e94dbf) ;\n- [Rapport d'erreurs pour les \u00e9tablissements hospitaliers](https://www.data.gouv.fr/fr/datasets/r/8b55024d-6128-4fef-ae03-08692597dd94).\n\n\u00c0 noter que : \n- Le syst\u00e8me de d\u00e9claration des cas n'est pas exhaustif et le nombre d'\u00e9tablissements d\u00e9clarant varie au cours du temps ;\n- Certains patients, pr\u00e9sents dans la base de donn\u00e9es hospitali\u00e8res \u00e0 un moment donn\u00e9, sont retir\u00e9s de la base de donn\u00e9es par les \u00e9tablissements de sant\u00e9 lorsque le r\u00e9sultat biologique du patient est n\u00e9gatif par rapport au COVID-19 ; \n- Pour certains patients, la classe d'\u00e2ge n'a pas \u00e9t\u00e9 identifi\u00e9e dans la base de donn\u00e9es. Ce qui peut induire un d\u00e9calage entre la somme de toutes les classes d'\u00e2ge d'un indicateur et le nombre total de cet indicateur ; \n- Pour certains patients, le sexe n'a pas \u00e9t\u00e9 identifi\u00e9 dans la base de donn\u00e9es. Ce qui peut induire un d\u00e9calage entre la somme H/F  d'un indicateur et le nombre total de cet indicateur. \n\nN\u2019h\u00e9sitez pas \u00e0 signaler d'autres anomalies en commentaire. Ces remarques seront communiqu\u00e9es \u00e0 l'\u00e9quipe en charge de la collecte et diffusion des donn\u00e9es. \n\n### Autres donn\u00e9es disponibles\n\n[Sant\u00e9 publique France](https://www.data.gouv.fr/fr/organizations/sante-publique-france/) publie \u00e9galement les [donn\u00e9es des urgences hospitali\u00e8res et de SOS m\u00e9decins relatives \u00e0 l'\u00e9pid\u00e9mie de COVID-19](https://www.data.gouv.fr/fr/datasets/donnees-des-urgences-hospitalieres-et-de-sos-medecins-relatives-a-lepidemie-de-covid-19/) et les donn\u00e9es relatives aux [tests de d\u00e9pistage de COVID-19 r\u00e9alis\u00e9s en laboratoire de ville](https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-tests-de-depistage-de-covid-19-realises-en-laboratoire-de-ville/).",
                "created_at": "2020-03-27T15:40:10.048000+00:00",
                "last_modified": "2023-07-04T15:11:16.551000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "coronavius",
                  "covid-19",
                  "covid19",
                  "covid19france"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5e7e104ace2080d9162b61d8/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 15
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5e7e104ace2080d9162b61d8&page=1&page_size=50",
                  "type": "GET",
                  "total": 43
                },
                "frequency": "fourTimesAWeek",
                "frequency_date": null,
                "extras": {
                  "recommendations-externals": [
                    {
                      "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Do you want to monitor the COVID-19 pandemic\u00a0evolution?",
                          "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
                          "button": "Visit the COVID-19 pandemic monitoring dashboard"
                        },
                        "fr": {
                          "title": "Vous souhaitez suivre l\u2019\u00e9volution de l\u2019\u00e9pid\u00e9mie de COVID-19\u00a0?",
                          "message": "Le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l\u2019\u00e9volution de la situation sanitaire.",
                          "button": "Consulter le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19"
                        }
                      }
                    }
                  ],
                  "recommendations:sources": [
                    "edito"
                  ]
                },
                "metrics": {
                  "discussions": 331,
                  "reuses": 142,
                  "followers": 67,
                  "views": 287270,
                  "resources_downloads": 1097628
                },
                "organization": {
                  "name": "Sant\u00e9 publique France",
                  "acronym": "SPF",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/sante-publique-france/",
                  "slug": "sante-publique-france",
                  "page": "https://www.data.gouv.fr/fr/organizations/sante-publique-france/",
                  "logo": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
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
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:departement"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/",
                "page": "https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/",
                "last_update": "2023-06-30T16:29:23.644000+00:00",
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
                  "score": 0.7777777777777778
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2020-03-27T15:40:10.048000+00:00",
                  "last_modified_internal": "2023-07-04T15:11:16.551000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "53699fe4a3a729239d206227",
                "title": "Service-public.fr - Annuaire de l\u2019administration - Base de donn\u00e9es locales",
                "acronym": null,
                "slug": "service-public-fr-annuaire-de-l-administration-base-de-donnees-locales",
                "description": "La Base de donn\u00e9es locales r\u00e9f\u00e9rence plus de 63 000 guichets publics locaux (mairies, organismes sociaux, services de l'\u00e9tat, etc.). Elle fournit leurs coordonn\u00e9es (adresses, t\u00e9l\u00e9phones, site internet, horaires d'ouverture, coordonn\u00e9es de g\u00e9olocalisation). En compl\u00e9ment, sont index\u00e9s plus de 36 000 fichiers des communes (conformes au Code Officiel G\u00e9ographique de l\u2019INSEE), pr\u00e9cisant la comp\u00e9tence g\u00e9ographique des guichets. \n\nLa liste des types d'organismes r\u00e9f\u00e9renc\u00e9s dans la base est consultable dans le fichier PDF joint ci-dessous.\n\nLe sch\u00e9ma et sa documentation sont disponibles \u00e0 l'adresse : [Specifications-datagouv-base-de-donnees-locales-Service-public_V1.2.pdf](https://echanges.dila.gouv.fr/OPENDATA/Base_donn%c3%a9es_locales/DILA_Sp%c3%a9cifications-datagouv-base-de-donnees-locales-Service-public_V1.2_20240712.pdf)\n\n\nLes donn\u00e9es sont au format json.\n\n\n**Conditions de r\u00e9utilisation :**\n\nLes donn\u00e9es sont r\u00e9utilisables gratuitement sous [licence ouverte v2.0](https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf).\n\nLes r\u00e9utilisateurs s\u2019obligent \u00e0 mentionner :\n\n- la paternit\u00e9 des donn\u00e9es (Service-Public.fr/DILA) ;\n- l\u2019url d\u2019acc\u00e8s longue de t\u00e9l\u00e9chargement ;\n- le nom du fichier t\u00e9l\u00e9charg\u00e9 ainsi que la date du fichier.\n\nLe r\u00e9utilisateur s\u2019oblige \u00e0 prendre en compte les demandes de mise \u00e0 jour de donn\u00e9es publi\u00e9es ponctuellement par la DILA dans le forum de discussion du jeu de donn\u00e9es sur data.gouv.fr.\n\n\n**_A NOTER:_ Une nouvelle \"API Annuaire administration : comp\u00e9tence g\u00e9ographique des services locaux\" sera mise en service par la DILA sur API.gouv en septembre 2024. Elle est compl\u00e9mentaire \u00e0 celle mise en service en d\u00e9cembre 2023 [\"API Annuaire de l'administration et des services publics\"](https://api.gouv.fr/les-api/api-annuaire-administration-services-publics). La nouvelle API permet de conna\u00eetre le p\u00e9rim\u00e8tre de comp\u00e9tence g\u00e9ographique des services locaux. Elle fournit une r\u00e9ponse pour chaque commune et type de service. Pour plus d'informations, consulter [cette fiche](https://echanges.dila.gouv.fr/OPENDATA/Base_donn%c3%a9es_locales/DILA-Base-donnees-locales-Service-public-fr-Info-nouvelle-API-annuaire-local-et-comp-geo-20240717.pdf)**\n\nSi vous souhaitez \u00eatre inform\u00e9 des \u00e9volutions des API Annuaire de Service-public.fr et/ou la base de donn\u00e9es locales, adresser un message \u00e0 [donnees-dila@dila.gouv.fr](donnees-dila@dila.gouv.fr)\n\nVous pouvez acc\u00e9der \u00e0 l'**[API Annuaire de l'administration et des services publics](https://api-lannuaire.service-public.fr/explore/dataset/api-lannuaire-administration/api/)**.\n\nVous pouvez nous \u00e9crire ou vous abonner \u00e0 une alerte par mail adress\u00e9 \u00e0 : [donnees-dila@dila.gouv.fr](donnees-dila@dila.gouv.fr)\n\n",
                "created_at": "2013-07-08T11:02:40.861000+00:00",
                "last_modified": "2024-08-16T13:00:07.627000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "administration-locale",
                  "administration-publique",
                  "annuaire",
                  "annuaire-de-services",
                  "base-donnees-locales",
                  "base-donnees-locales-service-public-fr",
                  "communes",
                  "competence-geographique-services-locaux",
                  "coordonnees",
                  "coordonnees-geographiques",
                  "dila",
                  "donnees",
                  "donnees-locales",
                  "geolocalisation",
                  "guichets",
                  "mairie",
                  "organisme-public",
                  "services-d-utilite-publique-et-s"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/53699fe4a3a729239d206227/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 4
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=53699fe4a3a729239d206227&page=1&page_size=50",
                  "type": "GET",
                  "total": 4
                },
                "frequency": "punctual",
                "frequency_date": null,
                "extras": {
                  "Langue": "fran\u00e7ais",
                  "Type de donn\u00e9es": "base de donn\u00e9es",
                  "datagouv_ckan_id": "b1d754c2-62ae-4643-b478-ff7cf1d167d5",
                  "datagouv_ckan_last_sync": "2014-09-16T10:09:57.406000",
                  "recommendations-externals": [
                    {
                      "id": "https://lannuaire.service-public.fr/",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Are you looking for a public service, an administration or a contact point?",
                          "message": "L\u2019Annuaire de l\u2019administration allows you to easily find all the contacts for your relations with public services (town hall, prefecture, ministry, etc.).",
                          "button": "Visit \u00ab\u00a0l\u2019Annuaire de l\u2019administration\u00a0\u00bb"
                        },
                        "fr": {
                          "title": "Vous cherchez un service public, une administration ou un contact\u00a0?",
                          "message": "L\u2019Annuaire de l\u2019administration vous permet de retrouver facilement tous les contacts pour vos relations avec les services publics (mairie, pr\u00e9fecture, minist\u00e8re, etc.).",
                          "button": "Consulter \u00ab\u00a0l\u2019Annuaire de l\u2019administration\u00a0\u00bb"
                        }
                      }
                    }
                  ],
                  "recommendations:sources": [
                    "edito"
                  ],
                  "apigouvfr:apis": [
                    {
                      "title": "API Annuaire de l\u2019administration et des services publics",
                      "tagline": "Consultez les donn\u00e9es publiques de l\u2019annuaire de l\u2019administration \u2013 Service-public.fr.",
                      "path": "/les-api/api-annuaire-administration-services-publics",
                      "slug": "api-annuaire-administration-services-publics",
                      "openness": "open",
                      "owner": "Direction de l'information l\u00e9gale et administrative",
                      "owner_acronym": "DILA",
                      "logo": "/images/api-logo/dila.png"
                    },
                    {
                      "title": "Annuaire des \u00e9tablissements publics de l'administration",
                      "tagline": "L\u2019API qui r\u00e9f\u00e9rence les guichets publics locaux",
                      "path": "/les-api/api_etablissements_publics",
                      "slug": "api_etablissements_publics",
                      "openness": "open",
                      "owner": "Direction Interminist\u00e9rielle du Num\u00e9rique",
                      "owner_acronym": "DINUM",
                      "logo": "/images/api-logo/dinum.png"
                    }
                  ]
                },
                "metrics": {
                  "discussions": 71,
                  "reuses": 18,
                  "followers": 86,
                  "views": 70922,
                  "resources_downloads": 33991
                },
                "organization": {
                  "name": "Premier ministre",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/premier-ministre/",
                  "slug": "premier-ministre",
                  "page": "https://www.data.gouv.fr/fr/organizations/premier-ministre/",
                  "logo": "https://static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/9a/b212bd561b4e54af775c49390f9f24-100.png",
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
                  "start": "2012-03-06",
                  "end": "2036-05-05"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr",
                    "country-subset:fr:dromcom"
                  ],
                  "granularity": "fr:commune"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/service-public-fr-annuaire-de-l-administration-base-de-donnees-locales/",
                "page": "https://www.data.gouv.fr/fr/datasets/service-public-fr-annuaire-de-l-administration-base-de-donnees-locales/",
                "last_update": "2024-08-28T06:05:35+00:00",
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
                  "all_resources_available": false,
                  "resources_documentation": true,
                  "score": 0.8888888888888888
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2013-07-08T11:02:40.861000+00:00",
                  "last_modified_internal": "2024-08-16T13:00:07.627000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "53698f4ca3a729239d2036df",
                "title": "Bases de donn\u00e9es annuelles des accidents corporels de la circulation routi\u00e8re - Ann\u00e9es de 2005 \u00e0 2022",
                "acronym": null,
                "slug": "bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2022",
                "description": "Pour chaque accident corporel (soit un accident survenu sur une voie ouverte \u00e0 la circulation publique, impliquant au moins un v\u00e9hicule et ayant fait au moins une victime ayant n\u00e9cessit\u00e9 des soins), des saisies d\u2019information d\u00e9crivant l\u2019accident sont effectu\u00e9es par l\u2019unit\u00e9 des forces de l\u2019ordre (police, gendarmerie, etc.) qui est intervenue sur le lieu de l\u2019accident. Ces saisies sont rassembl\u00e9es dans une fiche intitul\u00e9e bulletin d\u2019analyse des accidents corporels. L\u2019ensemble de ces fiches constitue le fichier national des accidents corporels de la circulation dit \u00ab Fichier BAAC \u00bb administr\u00e9 par l\u2019Observatoire national interminist\u00e9riel de la s\u00e9curit\u00e9 routi\u00e8re \"ONISR\".\n\nLes bases de donn\u00e9es, extraites du fichier BAAC, r\u00e9pertorient l'int\u00e9gralit\u00e9 des accidents corporels de la circulation, intervenus durant une ann\u00e9e pr\u00e9cise en France m\u00e9tropolitaine, dans les d\u00e9partements d\u2019Outre-mer (Guadeloupe, Guyane, Martinique, La R\u00e9union et Mayotte depuis 2012) et dans les autres territoires d\u2019outre-mer (Saint-Pierre-et-Miquelon, Saint-Barth\u00e9lemy, Saint-Martin, Wallis-et-Futuna, Polyn\u00e9sie fran\u00e7aise et Nouvelle-Cal\u00e9donie ; disponible qu\u2019\u00e0 partir de 2019 dans l\u2019open data) avec une description simplifi\u00e9e. Cela comprend des informations de localisation de l\u2019accident, telles que renseign\u00e9es ainsi que des informations concernant les caract\u00e9ristiques de l\u2019accident et son lieu, les v\u00e9hicules impliqu\u00e9s et leurs victimes.\n\nPar rapport aux bases de donn\u00e9es agr\u00e9g\u00e9es 2005-2010 et 2006-2011 actuellement disponibles sur le site www.data.gouv.fr, les bases de donn\u00e9es de 2005 \u00e0 2022 sont d\u00e9sormais annuelles et compos\u00e9es de 4 fichiers (Caract\u00e9ristiques \u2013 Lieux \u2013 V\u00e9hicules \u2013 Usagers) au format csv.\n\nCes bases occultent n\u00e9anmoins certaines donn\u00e9es sp\u00e9cifiques relatives aux usagers et aux v\u00e9hicules et \u00e0 leur comportement dans la mesure o\u00f9 la divulgation de ces donn\u00e9es porterait atteinte \u00e0 la protection de la vie priv\u00e9e des personnes physiques ais\u00e9ment identifiables ou ferait appara\u00eetre le comportement de telles personnes alors que la divulgation de ce comportement pourrait leur porter pr\u00e9judice (avis de la CADA \u2013 2 janvier 2012).\n\nAvertissement : Les donn\u00e9es sur la qualification de bless\u00e9 hospitalis\u00e9 depuis l\u2019ann\u00e9e 2018 ne peuvent \u00eatre compar\u00e9es aux ann\u00e9es pr\u00e9c\u00e9dentes suite \u00e0 des modifications de process de saisie des forces de l\u2019ordre. L\u2019indicateur \u00ab bless\u00e9 hospitalis\u00e9 \u00bb n\u2019est plus labellis\u00e9 par l\u2019autorit\u00e9 de la statistique publique depuis 2019.\n\nLa validit\u00e9 des exploitations statistiques qui peuvent \u00eatre faites \u00e0 partir de cette base d\u00e9pend des modes de v\u00e9rifications propres dans le domaine d\u2019application de la s\u00e9curit\u00e9 routi\u00e8re et notamment d\u2019une connaissance pr\u00e9cise des d\u00e9finitions aff\u00e9rentes \u00e0 chaque variable utilis\u00e9e. Pour toute exploitation, il est important de prendre notamment connaissance de la structure de la fiche BAAC jointe ainsi que du guide d\u2019utilisation de la codification du bulletin d\u2019analyse des accidents corporels de la circulation.\n\nRappelons qu\u2019un certain nombre d\u2019indicateurs issus de cette base font l\u2019objet d\u2019une labellisation, par l\u2019autorit\u00e9 de la statistique publique (arr\u00eat\u00e9 du 27 novembre 2019). \nLa liste est disponible \u00e0 l\u2019adresse : https://www.onisr.securite-routiere.gouv.fr/outils-statistiques/indicateurs-labellises \n",
                "created_at": "2013-07-08T15:26:21.064000+00:00",
                "last_modified": "2023-10-09T14:03:43.153000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "accident",
                  "accident-de-la-route",
                  "accidents-de-la-route",
                  "baac",
                  "circulation",
                  "circulation-routiere",
                  "passagers",
                  "velo",
                  "voiture"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/53698f4ca3a729239d2036df/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 95
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=53698f4ca3a729239d2036df&page=1&page_size=50",
                  "type": "GET",
                  "total": 9
                },
                "frequency": "annual",
                "frequency_date": "2022-10-24T15:40:58+00:00",
                "extras": {
                  "Date de production des donn\u00e9es": "06/07/2012",
                  "Langue": "fran\u00e7ais",
                  "Type de donn\u00e9es": "base de donn\u00e9es",
                  "datagouv_ckan_id": "c2dabe14-df04-49de-9494-242d9af36ac0",
                  "datagouv_ckan_last_sync": "2014-09-17T03:42:49.924000"
                },
                "metrics": {
                  "discussions": 88,
                  "reuses": 50,
                  "followers": 56,
                  "views": 115181,
                  "resources_downloads": 370391
                },
                "organization": {
                  "name": "Minist\u00e8re de l'Int\u00e9rieur et des Outre-Mer",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-linterieur-et-des-outre-mer/",
                  "slug": "ministere-de-linterieur-et-des-outre-mer",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-linterieur-et-des-outre-mer/",
                  "logo": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-100.png",
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
                  "start": "2005-01-01",
                  "end": "2022-12-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "poi"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2022/",
                "page": "https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2022/",
                "last_update": "2023-10-09T14:03:43.114000+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2013-07-08T15:26:21.064000+00:00",
                  "last_modified_internal": "2023-10-09T14:03:43.153000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "605d268f4661cf23272817c3",
                "title": "Fichiers des locaux et des parcelles des personnes morales",
                "acronym": null,
                "slug": "fichiers-des-locaux-et-des-parcelles-des-personnes-morales",
                "description": "Les fichiers des personnes morales recensent au niveau d\u00e9partemental les personnes morales qui apparaissent dans la documentation cadastrale, en situation du 1er janvier de l'ann\u00e9e de r\u00e9f\u00e9rence (n ou n-1 selon la date de t\u00e9l\u00e9chargement), comme d\u00e9tentrices de droits r\u00e9els sur des immeubles, \u00e0 l'exception des soci\u00e9t\u00e9s unipersonnelles et des entrepreneurs individuels.\n\nLes fichiers des propri\u00e9t\u00e9s b\u00e2ties (locaux) restituent les r\u00e9f\u00e9rences cadastrales et l'adresse des locaux, compl\u00e9t\u00e9s du code droit, de la d\u00e9nomination et de la forme juridique des personnes morales propri\u00e9taires.\n\nLes fichiers des propri\u00e9t\u00e9s non b\u00e2ties (parcelles) restituent les r\u00e9f\u00e9rences cadastrales, l'adresse, la contenance et la nature de culture des parcelles, compl\u00e9t\u00e9es du code droit, de la d\u00e9nomination et de la forme juridique des personnes morales propri\u00e9taires.",
                "created_at": "2021-03-25T09:31:57+00:00",
                "last_modified": "2021-03-25T09:31:57+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "2019",
                  "2020",
                  "2021",
                  "2022",
                  "2023",
                  "administration",
                  "cadastre",
                  "locaux",
                  "parcelles",
                  "personnes-morales"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/605d268f4661cf23272817c3/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 29
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=605d268f4661cf23272817c3&page=1&page_size=50",
                  "type": "GET",
                  "total": 3
                },
                "frequency": "annual",
                "frequency_date": null,
                "extras": {},
                "metrics": {
                  "discussions": 5,
                  "reuses": 16,
                  "followers": 40,
                  "views": 65335,
                  "resources_downloads": 25199
                },
                "organization": {
                  "name": "Minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique",
                  "acronym": "MEFSIN",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "logo": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
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
                "temporal_coverage": null,
                "spatial": null,
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/fichiers-des-locaux-et-des-parcelles-des-personnes-morales/",
                "page": "https://www.data.gouv.fr/fr/datasets/fichiers-des-locaux-et-des-parcelles-des-personnes-morales/",
                "last_update": "2023-12-13T00:03:33.724000+00:00",
                "archived": null,
                "quality": {
                  "license": true,
                  "temporal_coverage": false,
                  "spatial": false,
                  "update_frequency": true,
                  "update_fulfilled_in_time": true,
                  "dataset_description_quality": true,
                  "has_resources": true,
                  "has_open_format": true,
                  "all_resources_available": false,
                  "resources_documentation": true,
                  "score": 0.6666666666666666
                },
                "harvest": {
                  "backend": "DCAT",
                  "created_at": "2021-03-25T09:31:57+00:00",
                  "modified_at": "2021-03-25T09:31:57+00:00",
                  "source_id": "5cd454758b4c4139d85b64f2",
                  "remote_id": "https://data.economie.gouv.fr/explore/dataset/fichiers-des-locaux-et-des-parcelles-des-personnes-morales/",
                  "domain": "data.economie.gouv.fr",
                  "last_update": "2024-09-02T00:08:06.665000+00:00",
                  "remote_url": "https://data.economie.gouv.fr/explore/dataset/fichiers-des-locaux-et-des-parcelles-des-personnes-morales/",
                  "uri": "https://data.economie.gouv.fr/explore/dataset/fichiers-des-locaux-et-des-parcelles-des-personnes-morales/",
                  "dct_identifier": "https://data.economie.gouv.fr/explore/dataset/fichiers-des-locaux-et-des-parcelles-des-personnes-morales/"
                },
                "internal": {
                  "created_at_internal": "2021-03-26T01:10:55.853000+00:00",
                  "last_modified_internal": "2021-03-25T09:31:57+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5a5f4f6c88ee387da4d252a3",
                "title": "Base des permis de construire et autres autorisations d'urbanisme (Sitadel)",
                "acronym": null,
                "slug": "base-des-permis-de-construire-et-autres-autorisations-durbanisme-sitadel",
                "description": "Tout p\u00e9titionnaire projetant une construction neuve ou la transformation d\u2019une construction n\u00e9cessitant le d\u00e9p\u00f4t d\u2019un permis de construire, doit remplir un formulaire relatif \u00e0 son projet et le transmettre \u00e0 la mairie de la commune de localisation des travaux. Le projet de permis est trait\u00e9 par les services instructeurs (\u00c9tat, collectivit\u00e9 territoriale) dont rel\u00e8ve la commune. Les informations du formulaire alimentent l'application Sitadel via les centres instructeurs. Les mouvements relatifs \u00e0 la vie du permis (d\u00e9p\u00f4ts, autorisations, annulations, modificatifs, mises en chantier, ach\u00e8vements des travaux) sont transmis mensuellement au service de la donn\u00e9e et des \u00e9tudes statistiques (SDES) qui exploite les donn\u00e9es \u00e0 des fins statistiques. \n\nDans le cadre de l\u2019ouverture des donn\u00e9es publiques, le Service des donn\u00e9es et \u00e9tudes statistiques met \u00e0 disposition du public une large partie des informations concernant les autorisations d\u2019urbanisme renseign\u00e9es dans la base de donn\u00e9es Sitadel. L\u2019essentiel des donn\u00e9es de cette base, aliment\u00e9e par les collectivit\u00e9s territoriales et les directions d\u00e9partementales du territoire, est diffus\u00e9 chaque mois en m\u00eame temps que les statistiques sur la construction neuve (logements et locaux).\nSont mises \u00e0 disposition :\n- les autorisations d\u2019urbanisme d\u00e9livr\u00e9es depuis 2013, qu\u2019il s\u2019agisse de permis de construire (PC) et de d\u00e9clarations pr\u00e9alables (DP) cr\u00e9ant au moins un logement ;\n- de permis de construire et de d\u00e9clarations pr\u00e9alables de cr\u00e9ation ou d\u2019extension de locaux non r\u00e9sidentiels ;\n- de permis d\u2019am\u00e9nager (PA) ;\n- ou encore de permis de d\u00e9molir (PD).\n\n_**Avertissement**_ : \u00c0 compter de septembre 2023, la diffusion des listes sur les permis de construire et autres autorisations d'urbanisme est report\u00e9e sur l'application de diffusion des donn\u00e9es du SDES, Dido. L'organisation des fichiers de donn\u00e9es change, chaque type de fichiers comporte d\u00e9sormais l'ensemble des donn\u00e9es depuis 2013.\n\nRetrouvez les **listes des permis de construire et autres autorisations d\u2019urbanisme**, **mises \u00e0 jour chaque mois**, sur le site _**Donn\u00e9es et \u00e9tudes statistiques**_ via le lien suivant :\n\n- **[Liste des permis de construire et autres autorisations d\u2019urbanisme](https://www.statistiques.developpement-durable.gouv.fr/liste-des-permis-de-construire-et-autres-autorisations-durbanisme)**\n\n**_Mise \u00e0 jour mensuelle_.**",
                "created_at": "2018-01-17T14:28:12.305000+00:00",
                "last_modified": "2024-06-28T07:54:21.821000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "locaux",
                  "logements",
                  "permis-de-construire",
                  "permisdeconstruire",
                  "sdes",
                  "sitadel"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5a5f4f6c88ee387da4d252a3/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 10
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5a5f4f6c88ee387da4d252a3&page=1&page_size=50",
                  "type": "GET",
                  "total": 2
                },
                "frequency": "monthly",
                "frequency_date": "2021-10-30T00:00:00+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 137,
                  "reuses": 14,
                  "followers": 38,
                  "views": 280566,
                  "resources_downloads": 114026
                },
                "organization": {
                  "name": "Minist\u00e8re de la Transition \u00e9cologique",
                  "acronym": "MTE",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-la-transition-ecologique/",
                  "slug": "ministere-de-la-transition-ecologique",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-la-transition-ecologique/",
                  "logo": "https://static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/61/7e6ce6a2b648a8b13472c8ba84b05b-100.jpg",
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
                  "start": "2013-12-01",
                  "end": "2024-05-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "poi"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/base-des-permis-de-construire-et-autres-autorisations-durbanisme-sitadel/",
                "page": "https://www.data.gouv.fr/fr/datasets/base-des-permis-de-construire-et-autres-autorisations-durbanisme-sitadel/",
                "last_update": "2024-08-30T12:26:58+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2018-01-17T14:28:12.305000+00:00",
                  "last_modified_internal": "2024-06-28T07:54:21.821000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "58da72bbc751df38734d8658",
                "title": "Imp\u00f4ts locaux : fichier de recensement des \u00e9l\u00e9ments d'imposition \u00e0 la fiscalit\u00e9 directe locale (REI)",
                "acronym": null,
                "slug": "impots-locaux-fichier-de-recensement-des-elements-dimposition-a-la-fiscalite-directe-locale-rei-3",
                "description": "Le fichier de recensement des \u00e9l\u00e9ments d\u2019imposition \u00e0 la fiscalit\u00e9 directe locale (REI) est un fichier agr\u00e9g\u00e9 au niveau communal. \nIl d\u00e9taille l'ensemble des donn\u00e9es de fiscalit\u00e9 directe locale par taxe et par collectivit\u00e9 b\u00e9n\u00e9ficiaire (commune, syndicats et assimil\u00e9s, intercommunalit\u00e9, d\u00e9partement, r\u00e9gion).\nCes donn\u00e9es concernent exclusivement les impositions primitives, c\u2019est-\u00e0-dire ne tiennent pas compte des impositions suppl\u00e9mentaires cons\u00e9cutives \u00e0 des omissions ou insuffisances de l'imposition initiale.\nCe fichier contient notamment les informations relatives aux principaux imp\u00f4ts locaux suivants :\n- la taxe fonci\u00e8re sur les propri\u00e9t\u00e9s non b\u00e2ties (TFPNB) ;\n- la taxe fonci\u00e8re sur les propri\u00e9t\u00e9s b\u00e2ties (TFPB) ;\n- la taxe d'habitation (TH) ;\n- la cotisation fonci\u00e8re des entreprises (CFE) ;\n- la cotisation sur la valeur ajout\u00e9e des entreprises (CVAE) ;\n- la taxe sp\u00e9ciale d'\u00e9quipement au profit de la r\u00e9gion d'\u00cele-de-France et d'\u00e9tablissements publics (TSE) ;\n- la taxe d'enl\u00e8vement des ordures m\u00e9nag\u00e8res (TEOM) ;\n- les impositions forfaitaires sur les entreprises de r\u00e9seaux (Ifer) ;\n- la taxe sur les surfaces commerciales (Tascom).\n\nIl comprend aussi les informations concernant les taxes annexes au profit des chambres d'agriculture, de la caisse d'assurance des accidents agricoles, des chambres de commerce et d'industrie et des chambres des m\u00e9tiers.\n",
                "created_at": "2017-03-28T16:27:07.231000+00:00",
                "last_modified": "2023-07-03T13:04:28.557000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "dgfip",
                  "dgfip-rei-fdl",
                  "fdl",
                  "fiscalite-locale",
                  "impots-locaux",
                  "rei",
                  "taxe-fonciere",
                  "taxe-habitation"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/58da72bbc751df38734d8658/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 41
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=58da72bbc751df38734d8658&page=1&page_size=50",
                  "type": "GET",
                  "total": 8
                },
                "frequency": "annual",
                "frequency_date": "2018-03-28T16:28:32+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 41,
                  "reuses": 4,
                  "followers": 29,
                  "views": 59812,
                  "resources_downloads": 25915
                },
                "organization": {
                  "name": "Minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique",
                  "acronym": "MEFSIN",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "logo": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
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
                  "start": "1982-01-01",
                  "end": "2021-12-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:commune"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/impots-locaux-fichier-de-recensement-des-elements-dimposition-a-la-fiscalite-directe-locale-rei-3/",
                "page": "https://www.data.gouv.fr/fr/datasets/impots-locaux-fichier-de-recensement-des-elements-dimposition-a-la-fiscalite-directe-locale-rei-3/",
                "last_update": "2023-07-03T13:04:28.507000+00:00",
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
                  "score": 0.8888888888888888
                },
                "harvest": {
                  "remote_id": "impots-locaux-fichier-de-recensement-des-elements-dimposition-a-la-fiscalite-dir",
                  "domain": "data.economie.gouv.fr"
                },
                "internal": {
                  "created_at_internal": "2017-03-28T16:27:07.231000+00:00",
                  "last_modified_internal": "2023-07-03T13:04:28.557000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5530fbacc751df5ff937dddb",
                "title": "Base Adresse Nationale",
                "acronym": "BAN",
                "slug": "base-adresse-nationale",
                "description": "La **Base Adresse Nationale** est l\u2019une des neuf bases de donn\u00e9es du [service public des donn\u00e9es de r\u00e9f\u00e9rence](https://www.data.gouv.fr/fr/reference). C'est le r\u00e9f\u00e9rentiel d'adresses **officiellement reconnu par l\u2019administration**.\n\n**Service num\u00e9rique d'int\u00e9r\u00eat national sur lequel sont adoss\u00e9es de nombreuses politiques publiques, la BAN fait partie de l'infrastructure socle du **syst\u00e8me d\u2019information et de communication de l\u2019\u00c9tat** et est \u00e0 ce titre plac\u00e9e sous la **responsabilit\u00e9 du Premier ministre**.\n\nSous co-pilotage **DINUM**, **IGN** et **ANCT**, sa construction est assur\u00e9e en premier lieu par les **communes**, **seules autorit\u00e9s comp\u00e9tentes en terme d\u2019adressage**.\n\nLa Base Adresse Nationale est accessible sous forme de fichiers et d\u2019API.\n\nUn [service de g\u00e9ocodage gratuit](https://adresse.data.gouv.fr/api) est mis \u00e0 disposition par Etalab.\n",
                "created_at": "2015-04-17T14:25:16.900000+00:00",
                "last_modified": "2024-08-28T09:47:04.599000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "adresse",
                  "adresses",
                  "ban",
                  "geospatiales",
                  "spd"
                ],
                "badges": [
                  {
                    "kind": "spd"
                  }
                ],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5530fbacc751df5ff937dddb/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 1
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5530fbacc751df5ff937dddb&page=1&page_size=50",
                  "type": "GET",
                  "total": 2
                },
                "frequency": "daily",
                "frequency_date": "2024-08-29T13:42:10+00:00",
                "extras": {
                  "recommendations-externals": [
                    {
                      "id": "https://adresse.data.gouv.fr/",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Would you like to search for an address in the National Address Database, or manage your own addresses?",
                          "message": "The national address website \u00ab\u00a0adresse.data.gouv.fr\u00a0\u00bb references all addresses in France and make them usable for all.",
                          "button": "Visit adresse.data.gouv.fr"
                        },
                        "fr": {
                          "title": "Vous souhaitez chercher une adresse dans la Base Adresse Nationale ou, pour les communes, g\u00e9rer vos adresses\u00a0?",
                          "message": "Le site national des adresses, adresse.data.gouv.fr, r\u00e9f\u00e9rence l\u2019int\u00e9gralit\u00e9 des adresses du territoire et les rend utilisables par toutes et tous.",
                          "button": "Consulter adresse.data.gouv.fr"
                        }
                      }
                    }
                  ],
                  "transport:url": "https://transport.data.gouv.fr/datasets/base-adresse-nationale",
                  "apigouvfr:apis": [
                    {
                      "title": "API Adresse (Base Adresse Nationale - BAN)",
                      "tagline": "Interrogez la Base Adresse Nationale, base de donn\u00e9es de l\u2019int\u00e9gralit\u00e9 des adresses du territoire fran\u00e7ais",
                      "path": "/les-api/base-adresse-nationale",
                      "slug": "base-adresse-nationale",
                      "openness": "open",
                      "owner": "Direction Interminist\u00e9rielle du Num\u00e9rique",
                      "owner_acronym": "DINUM",
                      "logo": "/images/api-logo/dinum.png"
                    }
                  ],
                  "recommendations:sources": [
                    "edito",
                    "matomo"
                  ],
                  "recommendations": [
                    {
                      "id": "538071a9a3a7297e4d35d6ce",
                      "score": 37,
                      "source": "matomo"
                    }
                  ]
                },
                "metrics": {
                  "discussions": 81,
                  "reuses": 41,
                  "followers": 70,
                  "views": 181071,
                  "resources_downloads": 11048
                },
                "organization": {
                  "name": "Base Adresse Nationale",
                  "acronym": "BAN",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/base-adresse-nationale/",
                  "slug": "base-adresse-nationale",
                  "page": "https://www.data.gouv.fr/fr/organizations/base-adresse-nationale/",
                  "logo": "https://static.data.gouv.fr/avatars/40/05f4e0291e4ad49a9321071c195cce-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/40/05f4e0291e4ad49a9321071c195cce-100.jpg",
                  "badges": [
                    {
                      "kind": "public-service"
                    },
                    {
                      "kind": "certified"
                    }
                  ],
                  "id": "58e555f5c751df205d54e76b",
                  "class": "Organization"
                },
                "owner": null,
                "temporal_coverage": null,
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr",
                    "country-subset:fr:dromcom"
                  ],
                  "granularity": "country"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/base-adresse-nationale/",
                "page": "https://www.data.gouv.fr/fr/datasets/base-adresse-nationale/",
                "last_update": "2024-08-28T12:17:10.618977+00:00",
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
                  "score": 0.7777777777777778
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2015-04-17T14:25:16.900000+00:00",
                  "last_modified_internal": "2024-08-28T09:47:04.599000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "6010206e7aa742eb447930f7",
                "title": "Donn\u00e9es relatives aux personnes vaccin\u00e9es contre la Covid-19",
                "acronym": "VAC-SI",
                "slug": "donnees-relatives-aux-personnes-vaccinees-contre-la-covid-19-1",
                "description": "\ud83c\udd95**24/11/2022**\nPublication de nouveaux indicateurs \u00e0 compter de ce jour :\n1. Couverture vaccinale du vaccin contre la COVID-19, personnes vaccin\u00e9es avec trois doses de rappel (`n_3_rappel`, `couv_3_rappel`)\n2. Couverture vaccinale du vaccin contre la COVID-19, personnes vaccin\u00e9es avec un rappel adapt\u00e9 aux variants Omicron (`n_rappel_biv`, `n_cum_rappel_biv`, `couv__rappel_biv`)  \n\nSant\u00e9 publique France met \u00e0 jour les r\u00e9f\u00e9rentiels g\u00e9ographiques et de population, utilis\u00e9s pour la production et la diffusion des indicateurs de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19. Cette actualisation sera effective le **7 juillet 2022** . Elle est amen\u00e9e \u00e0 \u00eatre renouvel\u00e9e chaque ann\u00e9e.\n\n**MAJ 01/07/2021**\nCes ressources ne sont actualis\u00e9es que les **jours ouvr\u00e9s**.\n\n### Vaccination contre la COVID-19 \n\nD\u00e8s le lancement de la campagne de vaccination, les autorit\u00e9s sanitaires ont dispos\u00e9 d\u2019informations permettant un suivi quotidien de l\u2019avanc\u00e9e et du d\u00e9ploiement de la campagne sur le territoire. Celles-ci, recueillies aupr\u00e8s des \u00e9tablissements pour personnes \u00e2g\u00e9es et des centres de vaccination, \u00e9taient transmises par les Agences r\u00e9gionales de sant\u00e9. \n\nParall\u00e8lement, l\u2019Assurance maladie a \u00e9labor\u00e9 le syst\u00e8me d\u2019information Vaccin Covid (VAC-SI), qui est depuis pleinement op\u00e9rationnel apr\u00e8s un travail d\u2019analyse de l\u2019exhaustivit\u00e9 et de la compl\u00e9tude des donn\u00e9es.\n\nLe syst\u00e8me d\u2019information Vaccin Covid est aliment\u00e9 par les professionnels de sant\u00e9 r\u00e9alisant les vaccinations. \n\nSur la base de l\u2019exploitation de ces donn\u00e9es, Sant\u00e9 Publique France publie en open data les indicateurs de couverture vaccinale sur data.gouv, sur [Geodes](https://geodes.santepubliquefrance.fr/#c=home) ainsi que sur un dashboard disponible sur le site de sant\u00e9 Publique France : [InfoCovidFrance](https://www.santepubliquefrance.fr/dossiers/coronavirus-covid-19/coronavirus-chiffres-cles-et-evolution-de-la-covid-19-en-france-et-dans-le-monde)\n\n#### Quelles donn\u00e9es ? \n\nLes donn\u00e9es issues du syst\u00e8me d\u2019information Vaccin Covid permettent de d\u00e9nombrer en temps quasi r\u00e9el (J-1), le nombre de personnes ayant re\u00e7u une injection de vaccin anti-covid en tenant compte du nombre de doses re\u00e7ues, du vaccin, de l\u2019\u00e2ge, du sexe ainsi que du niveau g\u00e9ographique (national, r\u00e9gional et d\u00e9partemental). Les donn\u00e9es sont disponibles par lieu de r\u00e9sidence.\n\n#### Pr\u00e9caution d\u2019usage des donn\u00e9es\nIl existe des rattrapages de saisies dans Vaccin Covid et pour un jour donn\u00e9, toutes les injections n\u2019ont pas forc\u00e9ment \u00e9t\u00e9 saisies en temps r\u00e9el et peuvent \u00eatre saisies dans les jours suivant. Les fichiers par date permettent de rendre compte de ce rattrapage. \n\nDans les fichiers d\u00e9partementaux, si une ligne pour un nombre de vaccin\u00e9s \u00e0 une date donn\u00e9e est absente, c\u2019est qu\u2019il n\u2019y a pas eu de vaccin\u00e9 ce jour-l\u00e0 dans le d\u00e9partement.\n\nLes variables des diff\u00e9rents jeux de donn\u00e9es sont les suivantes :\n* `jour` : date de l\u2019injection\n* `fra`, `dep`, `reg` : niveau g\u00e9ographique\n* `clage_vacsi` : classes d\u2019\u00e2ge\n* `vaccin` : type de vaccin\n* `sexe` : sexe\n* `n_dose1` : Nombre de personnes ayant re\u00e7u une 1ere injection de vaccin  \n* `n_dose2` : Nombre de personnes ayant re\u00e7u une 2e  injection de vaccin\n* `n_dose3` : Nombre de personnes ayant re\u00e7u une 3e injection de vaccin\n* `n_dose4` : Nombre de personnes ayant re\u00e7u une 4e injection de vaccin \n* `n_complet` : Nombre de personnes ayant une primo-vaccination compl\u00e8te. Cette information est directement fournie par la base Vaccin Covid, \u00e0 l\u2019issue d\u2019un algorithme propre \u00e0 la Cnam ou par d\u00e9claration par le professionnel de sant\u00e9 injecteur. Les personnes avec une primo-vaccination compl\u00e8te sont notamment : personnes vaccin\u00e9es par deux doses par les vaccins n\u00e9cessitant deux doses (ex : vaccins Pfizer, Moderna ou Astra-Zeneca), personnes vaccin\u00e9es par une dose par les vaccins n\u00e9cessitant une seule dose (ex : vaccin Janssen), personnes vaccin\u00e9es par une dose par les vaccins Pfizer, Moderna ou Astra-Zeneca en cas d\u2019ant\u00e9c\u00e9dent de COVID-19, personnes immunod\u00e9prim\u00e9es pouvant recevoir 3 \u00e0 4 doses.\n* `n_rappel` : Nombre de personnes avec une primo-vaccination compl\u00e8te ayant re\u00e7u au moins une dose avec un motif de rappel d\u00e9fini par le professionnel de sant\u00e9 vaccinateur en population g\u00e9n\u00e9rale ou sp\u00e9cifique\n* `n_2_rappel` : Nombre de personnes avec une primo-vaccination compl\u00e8te et une premi\u00e8re dose de rappel ayant re\u00e7u une seconde dose avec un motif rappel d\u00e9fini par le professionnel de sant\u00e9 vaccinateur\n* `n_3_rappel` : Nombre de personnes avec une primo-vaccination compl\u00e8te et deux doses de rappel ayant re\u00e7u une troisi\u00e8me dose avec un motif rappel d\u00e9fini par le professionnel de sant\u00e9 vaccinateur\n* `n_rappel_biv` : Nombre de personnes vaccin\u00e9es avec rappel adapt\u00e9 aux variants Omicron.\n* `n_cum_dose1` : Nombre cumul\u00e9 de personnes ayant re\u00e7u 1 injection de vaccin\n* `n_cum_dose2` : Nombre cumul\u00e9 de personnes ayant re\u00e7u 2 injections de vaccin\n* `n_cum_dose3` :  Nombre cumul\u00e9 de personnes ayant re\u00e7u 3 injections de vaccin\n* `n_cum_dose4` :  Nombre cumul\u00e9 de personnes ayant re\u00e7u 4 injections de vaccin\n* `n_cum_complet` : Nombre cumul\u00e9 de personnes ayant une primovaccination compl\u00e8te sch\u00e9ma vaccinal complet. Cette information est directement fournie par la base Vaccin Covid, \u00e0 l\u2019issue d\u2019un algorithme propre \u00e0 la Cnam ou par d\u00e9claration par le professionnel de sant\u00e9 injecteur. Les personnes avec une primo-vaccination compl\u00e8te sont notamment : personnes vaccin\u00e9es par deux doses par les vaccins n\u00e9cessitant deux doses (ex : vaccins Pfizer, Moderna ou Astra-Zeneca), personnes vaccin\u00e9es par une dose par les vaccins n\u00e9cessitant une seule dose (ex : vaccin Janssen), personnes vaccin\u00e9es par une dose par les vaccins Pfizer, Moderna ou Astra-Zeneca en cas d\u2019ant\u00e9c\u00e9dent de COVID-19, personnes immunod\u00e9prim\u00e9es pouvant recevoir 3 \u00e0 4 doses.\n* `n_cum_rappel` : Nombre cumul\u00e9 de personnes avec une primo-vaccination compl\u00e8te ayant re\u00e7u au moins une dose avec un motif de rappel d\u00e9fini par le professionnel de sant\u00e9 vaccinateur en population g\u00e9n\u00e9rale ou sp\u00e9cifique\n* `n_cum_rappel_biv` : Nombre cumul\u00e9 de personnes vaccin\u00e9es avec rappel adapt\u00e9 aux variants Omicron.\n* `couv_dose1` : Couverture vaccinale dans la population de la premi\u00e8re dose de  vaccin contre la COVID-19 (= couverture vaccinale au  moins une dose = n_cum_dose1/pop).\n* `couv_complet` : Couverture vaccinale dans la population de la primovaccination compl\u00e8te du  vaccin contre la COVID-19 (ie nombre de personnes compl\u00e8tement primovaccin\u00e9es / population  = n_cum_complet/pop). Les personnes avec une primo-vaccination compl\u00e8te sont notamment : personnes vaccin\u00e9es par deux doses par les vaccins n\u00e9cessitant deux doses (ex : vaccins Pfizer, Moderna ou Astra-Zeneca), personnes vaccin\u00e9es par une dose par les vaccins n\u00e9cessitant une seule dose (ex : vaccin Janssen), personnes vaccin\u00e9es par une dose par les vaccins Pfizer, Moderna ou Astra-Zeneca en cas d\u2019ant\u00e9c\u00e9dent de COVID-19, personnes immunod\u00e9prim\u00e9es pouvant recevoir 3 \u00e0 4 doses.\n* `couv_rappel` : Couverture vaccinale dans la population du 1er rappel du vaccin contre la COVID-19, (ie couverture primo-vaccination COVID19 compl\u00e8te et avec une dose de rappel = n_cum_rappel/pop)\n* `couv_2_rappel` : Couverture vaccinale dans la population du second rappel du vaccin contre la COVID-19, (ie couverture primo-vaccination COVID19 compl\u00e8te et deux doses de rappel = n_cum_2_ rappel/pop)\n* `couv_3_rappel` : Couverture vaccinale dans la population du troisi\u00e8me rappel du vaccin contre la COVID-19\n* `couv__rappel_biv` : Couverture vaccinale du vaccin contre la COVID-19, personnes vaccin\u00e9es avec un rappel adapt\u00e9 aux variants Omicron\n\nLa population de r\u00e9f\u00e9rence utilis\u00e9e est issue de l\u2019Insee : Estimations localis\u00e9es de population, donn\u00e9es Insee du 1er janvier 2020  pour les donn\u00e9es de 2020, donn\u00e9es Insee du 1er janvier 2021 pour les donn\u00e9es de 2021, donn\u00e9es Insee du 1er janvier 2022 pour les donn\u00e9es de 2022.\n\nLes classes d'\u00e2ge utilis\u00e9es sont les suivantes : \n* `0` : Tous \u00e2ges\n* `04` : 0-4\n* `09` : 5-9\n* `11` : 10-11\n* `17` : 12-17\n* `24` : 18-24\n* `29` : 25-29\n* `39` : 30-39\n* `49` : 40-49\n* `59` : 50-59\n* `64` : 60-64\n* `69` : 65-69\n* `74` : 70-74\n* `79` : 75-79\n* `80` : 80 et +\n\n\nLe sexe est codifi\u00e9 de la fa\u00e7on suivante : \n* `0` : hommes + femmes + Non renseign\u00e9\n* `1` : homme\n* `2` : femme\n\nLa r\u00e9gion (colonne \u00ab reg \u00bb) suit la codification du [Code Officiel G\u00e9ographique de l\u2019INSEE](https://www.insee.fr/fr/information/4316069), elle est codifi\u00e9e de la mani\u00e8re suivante : \n* `01` : Guadeloupe\n* `02` : Martinique\n* `03` : Guyane\n* `04` : La R\u00e9union\n* `11` : Ile-de-France\n* `24` : Centre-Val de Loire\n* `27` : Bourgogne-Franche-Comt\u00e9\n* `28` : Normandie\n* `32` : Hauts-de-France\n* `44` : Grand Est\n* `52` : Pays de la Loire\n* `53` : Bretagne\n* `75` : Nouvelle-Aquitaine\n* `76` : Occitanie\n* `84` : Auvergne-Rh\u00f4ne-Alpes\n* `93` : Provence-Alpes-C\u00f4te d\u2019Azur\n* `94` : Corse\n* `05` : Saint-Pierre-et-Miquelon\n* `06` : Mayotte\n* `07` : Saint-Barth\u00e9lemy\n* `08` : Saint-Martin\n\n\nLes vaccins sont codifi\u00e9s de la fa\u00e7on suivante : \n* `0` : Tous vaccins\n* `1` : COMIRNATY-30-adulte (Pfizer/BioNTech)\n* `2` : Spikevax (Moderna)\n* `3` : Vaxzevria (AstraZeneca)\n* `4` : Janssen (Johnson&Johnson)\n* `5` : COMIRNATY-10-enfant (Pfizer/BioNTech)\n* `6` : NUVAXOVID (Novavax)\n* `9` : Spikevax Bivalent (Moderna)\n* `10` : Sanofi VidPrevtyn Beta\n* `11` : COMIRNATY-3 p\u00e9diatrique 6 m-4a (Pfizer/BioNTech)\n* `12` : Spikevax Bivalent Ori/Omi BA.5 (Moderna)\n\n\nUn certain nombre de ressources sont disponibles sur ce jeu de donn\u00e9es. Il est list\u00e9 ci-dessous le contenu de chacun d\u2019entre eux : \n\n#### Donn\u00e9es globales\n\nFichiers avec le nombre de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses, 4 doses, une dose de rappel ou compl\u00e8tement vaccin\u00e9es, arr\u00eat\u00e9 \u00e0 la derni\u00e8re date disponible  :\n- vacsi-tot-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-tot-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-tot-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale)\n\nFichiers avec le nombre quotidien de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses, 4 doses, une dose de rappel ou par date d\u2019injection :\n- vacsi-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale).\n\n#### Donn\u00e9es par \u00e2ge et sexe\nFichiers avec la couverture vaccinale et le nombre (journalier et cumul\u00e9) de personnes ayant re\u00e7u au moins une dose, une dose de rappel, une deuxi\u00e8me dose de rappel ou compl\u00e8tement vaccin\u00e9es, par sexe (Hommes = _h ; Femmes = _f ; Tous sexes confondus = _e) et par classes d\u2019\u00e2ge, arr\u00eat\u00e9 \u00e0 la derni\u00e8re date disponible :\n- vacsi-s-a-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-s-a-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-s-a-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale)\n\n\n#### Donn\u00e9es par sexe\nFichiers avec le nombre de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses, 4 doses, une dose de rappel ou compl\u00e8tement vaccin\u00e9es, par sexe, arr\u00eat\u00e9 \u00e0 la derni\u00e8re date disponible :\n- vacsi-tot-s-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-tot-s-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-tot-s-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale)\n\nFichiers avec le nombre quotidien de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses, 4 doses, une dose de rappel ou compl\u00e9tement vaccin\u00e9s par sexe, et par date d\u2019injection :\n- vacsi-s-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-s-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-s-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale).\n\n#### Donn\u00e9es par classes d'\u00e2ge\n\nFichiers avec le nombre de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses, 4 doses, une dose de rappel ou compl\u00e8tement vaccin\u00e9es, par classes d\u2019\u00e2ge, arr\u00eat\u00e9 \u00e0 la derni\u00e8re date disponible :\n- vacsi-tot-a-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-tot-a-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-tot-a-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale)\n\nFichiers avec le nombre de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses, 4 doses, une dose de rappel ou compl\u00e8tement vaccin\u00e9es, par classes d\u2019\u00e2ge, et par date d\u2019injection :\n- vacsi-a-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-a-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-a-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale).\n\n#### Donn\u00e9es par vaccin\n\nFichiers avec le nombre de personnes ayant re\u00e7u au moins une dose, ou deux doses, ou trois doses par vaccin, arr\u00eat\u00e9 \u00e0 la derni\u00e8re date disponible :\n- vacsi-tot-v-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-tot-v-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-tot-v-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale)\n\nFichiers avec le nombre quotidien de personnes ayant re\u00e7u au moins une dose, 2 doses, 3 doses ou 4 doses par vaccin, et par date d\u2019injection :\n- vacsi-v-fra-YYYY-MM-DD-HHhmm.csv (\u00e9chelle nationale)\n- vacsi-v-reg-YYYY-MM-DD-HHhmm.csv (\u00e9chelle r\u00e9gionale)\n- vacsi-v-dep-YYYY-MM-DD-HHhmm.csv (\u00e9chelle d\u00e9partementale).\n\n\nRemarques :\n* Des troisi\u00e8mes doses de vaccin sont saisies dans vaccin COVID \u00e0 une date ant\u00e9rieure \u00e0 la recommandation de vaccination des personnes immunod\u00e9prim\u00e9es. II ne peut \u00eatre d\u00e9termin\u00e9 si les donn\u00e9es ainsi saisies correspondent \u00e0 des erreurs de saisie ou \u00e0 de v\u00e9ritables injections de vaccin en troisi\u00e8me dose.\n* L\u2019analyse des donn\u00e9es issues de vaccin COVID rapporte des seconde ou troisi\u00e8me doses de vaccin comme ayant \u00e9t\u00e9 r\u00e9alis\u00e9es avec un vaccin Janssen. Pour les personnes concern\u00e9es, le vaccin administr\u00e9 en premi\u00e8re dose \u00e9tait un vaccin autre que Janssen (AstraZeneca, Pfizer ou Moderna). Le vaccin Janssen est un vaccin monodose. Il ne peut \u00eatre d\u00e9termin\u00e9 si les donn\u00e9es ainsi saisies correspondent \u00e0 des erreurs de saisie ou \u00e0 de v\u00e9ritables injections de vaccin Janssen en seconde dose.\n* Les vaccinations observ\u00e9es chez les enfants de moins de 5 ans correspondent probablement \u00e0 des enfants \u00e0 tr\u00e8s haut risque de forme grave de COVID. Il ne peut cependant \u00eatre exclu des erreurs de saisies sur certains dossiers.\n\nSant\u00e9 publique France ne r\u00e9alise aucun retraitement de donn\u00e9es issues de la base Vaccin Covid :  les informations disponibles dans la base ne permettent pas de connaitre les diff\u00e9rentes situations personnelles des personnes recevant des injections, ni les raisons de ces derni\u00e8res (personnes immunod\u00e9prim\u00e9es, personnes ayant eu la covid\u2026).\n",
                "created_at": "2021-01-26T15:00:14.172000+00:00",
                "last_modified": "2023-07-13T13:52:25.102000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "coronavirus",
                  "covid",
                  "covid19",
                  "vac-si",
                  "vaccination",
                  "vaccins"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/6010206e7aa742eb447930f7/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 30
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=6010206e7aa742eb447930f7&page=1&page_size=50",
                  "type": "GET",
                  "total": 7
                },
                "frequency": "weekly",
                "frequency_date": "2023-07-20T15:25:56+00:00",
                "extras": {
                  "recommendations-externals": [
                    {
                      "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Do you want to monitor the COVID-19 pandemic\u00a0evolution?",
                          "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
                          "button": "Visit the COVID-19 pandemic monitoring dashboard"
                        },
                        "fr": {
                          "title": "Vous souhaitez suivre l\u2019\u00e9volution de l\u2019\u00e9pid\u00e9mie de COVID-19\u00a0?",
                          "message": "Le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l\u2019\u00e9volution de la situation sanitaire.",
                          "button": "Consulter le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19"
                        }
                      }
                    }
                  ],
                  "recommendations:sources": [
                    "edito"
                  ]
                },
                "metrics": {
                  "discussions": 110,
                  "reuses": 45,
                  "followers": 28,
                  "views": 88423,
                  "resources_downloads": 1265057
                },
                "organization": {
                  "name": "Sant\u00e9 publique France",
                  "acronym": "SPF",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/sante-publique-france/",
                  "slug": "sante-publique-france",
                  "page": "https://www.data.gouv.fr/fr/organizations/sante-publique-france/",
                  "logo": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
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
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:departement"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/donnees-relatives-aux-personnes-vaccinees-contre-la-covid-19-1/",
                "page": "https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-personnes-vaccinees-contre-la-covid-19-1/",
                "last_update": "2023-07-13T15:52:24.758000+00:00",
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
                  "score": 0.7777777777777778
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2021-01-26T15:00:14.172000+00:00",
                  "last_modified_internal": "2023-07-13T13:52:25.102000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "61d5e2d372a52d9f9411ff88",
                "title": "G\u00e9olocalisation des \u00e9tablissements du r\u00e9pertoire SIRENE-pour les \u00e9tudes statistiques",
                "acronym": null,
                "slug": "geolocalisation-des-etablissements-du-repertoire-sirene-pour-les-etudes-statistiques",
                "description": "**La g\u00e9olocalisation des \u00e9tablissements du r\u00e9pertoire Sirene, pour les \u00e9tudes statistiques** est mise \u00e0 disposition des utilisateurs. Les donn\u00e9es concernent le g\u00e9ocodage des \u00e9tablissements (coordonn\u00e9es X,Y) avec leur g\u00e9or\u00e9f\u00e9rencement dans les zonages infra-communaux (IRIS, QPV, ZUS, QVA, voir la documentation associ\u00e9e).\n\n\n> * \u00c0 compter du mois d\u2019ao\u00fbt 2024, le g\u00e9or\u00e9f\u00e9rencement en QPV 2024 d\u00e9fini par le d\u00e9cret n\u00b0 2024-806 du 13 juillet 2024 (https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049964604) est fourni pour la France m\u00e9tropolitaine. \n> * \u00c0 compter du mois de novembre 2023, les codes commune et les \u00celots regroup\u00e9s pour l\u2019information statistique (IRIS) utilisent les informations g\u00e9ographiques de 2023.\n> * \u00c0 compter du mois de mars 2024, le g\u00e9or\u00e9f\u00e9rencement en ZFU n\u2019est plus fourni. \n\n\n* Le fichier **mensuel** correspond aux \u00e9tablissements dont **les donn\u00e9es sont diffusibles** et pr\u00e9sents **dans la base Sirene au 1er du mois**.\n* Il est **mis en ligne le 21 du mois** avec les informations g\u00e9ographiques suivantes\u00a0: siret, coordonn\u00e9es (X,Y), code commune, variables de qualit\u00e9 de la g\u00e9olocalisation, positionnement dans les zonages (IRIS, QPV, ZUS, QVA).\n* La g\u00e9olocalisation concerne **le territoire fran\u00e7ais hors Mayotte** (M\u00e9tropole, Guadeloupe, Martinique, Guyane, La R\u00e9union). Le codage utilis\u00e9 pour la m\u00e9tropole suit le syst\u00e8me g\u00e9od\u00e9sique RGF93 Lambert 93, pour les Dom le syst\u00e8me est diff\u00e9rent (voir la documentation associ\u00e9e).\n* La g\u00e9olocalisation est r\u00e9alis\u00e9e par une application de **g\u00e9ocodage automatique** d\u00e9velopp\u00e9e \u00e0 l\u2019Insee. Celle-ci est adoss\u00e9e \u00e0 un r\u00e9f\u00e9rentiel d\u2019adresses g\u00e9olocalis\u00e9es construit \u00e0 partir du R\u00e9pertoire d\u2019Immeubles Localis\u00e9s (RIL), qui int\u00e8gre **les coordonn\u00e9es g\u00e9ographiques des adresses positionn\u00e9es \u00e0 l\u2019acc\u00e8s du b\u00e2timent** pour les besoins du Recensement de la Population dans les communes de plus de 10\u00a0000 habitants, et de **la g\u00e9olocalisation des parcelles cadastrales.**\n* La g\u00e9olocalisation **des \u00e9tablissements actifs de 200 salari\u00e9s ou plus** a \u00e9t\u00e9 syst\u00e9matiquement **v\u00e9rifi\u00e9e** par des gestionnaires de reprise de g\u00e9olocalisation, ainsi que celle **des \u00e9tablissements de 20 \u00e0 199 salari\u00e9s** pour lesquels la g\u00e9olocalisation automatique est incertaine.  \n",
                "created_at": "2022-01-05T19:26:27.679000+00:00",
                "last_modified": "2024-08-21T13:37:41.747000+00:00",
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
                  "href": "https://www.data.gouv.fr/api/2/datasets/61d5e2d372a52d9f9411ff88/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 2
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=61d5e2d372a52d9f9411ff88&page=1&page_size=50",
                  "type": "GET",
                  "total": 0
                },
                "frequency": "monthly",
                "frequency_date": "2022-02-05T23:10:34+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 18,
                  "reuses": 4,
                  "followers": 22,
                  "views": 32026,
                  "resources_downloads": 13324
                },
                "organization": {
                  "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
                  "page": "https://www.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "logo": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
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
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "other"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/geolocalisation-des-etablissements-du-repertoire-sirene-pour-les-etudes-statistiques/",
                "page": "https://www.data.gouv.fr/fr/datasets/geolocalisation-des-etablissements-du-repertoire-sirene-pour-les-etudes-statistiques/",
                "last_update": "2024-08-21T13:28:11.216000+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2022-01-05T19:26:27.679000+00:00",
                  "last_modified_internal": "2024-08-21T13:37:41.747000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "548acaf2c751df1eac4120e7",
                "title": "Base permanente des \u00e9quipements",
                "acronym": null,
                "slug": "base-permanente-des-equipements-1",
                "description": "La base permanente des \u00e9quipements (BPE) est une source statistique qui fournit le niveau d'\u00e9quipements et de services rendus \u00e0 la population sur un territoire. Les r\u00e9sultats sont propos\u00e9s sous forme de bases de donn\u00e9es dans diff\u00e9rents formats et pour deux niveaux g\u00e9ographiques : les communes et les Iris. L'offre comprend \u00e9galement des bases de donn\u00e9es o\u00f9 de nombreux \u00e9quipements sont g\u00e9olocalis\u00e9s.\n\nDepuis septembre 2018, des donn\u00e9es concernant la BPE sont d\u00e9sormais diffus\u00e9es en \u00e9volution. Elles portent sur un nombre restreint d\u2019\u00e9quipements et sur deux ann\u00e9es espac\u00e9es d\u2019un pas quinquennal.\n\n",
                "created_at": "2014-12-12T12:01:06.889000+00:00",
                "last_modified": "2024-08-20T10:49:40.579000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "action-sociale",
                  "commerce",
                  "culture",
                  "enseignement",
                  "fonctions-medicales-et-paramedicales",
                  "loisirs",
                  "services-aux-particuliers",
                  "services-de-sante",
                  "sports",
                  "tourisme-et-transport"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/548acaf2c751df1eac4120e7/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 1
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=548acaf2c751df1eac4120e7&page=1&page_size=50",
                  "type": "GET",
                  "total": 4
                },
                "frequency": "annual",
                "frequency_date": "2019-06-27T00:00:00+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 12,
                  "reuses": 18,
                  "followers": 21,
                  "views": 25665,
                  "resources_downloads": 7029
                },
                "organization": {
                  "name": "Institut National de la Statistique et des Etudes Economiques (Insee)",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "slug": "institut-national-de-la-statistique-et-des-etudes-economiques-insee",
                  "page": "https://www.data.gouv.fr/fr/organizations/institut-national-de-la-statistique-et-des-etudes-economiques-insee/",
                  "logo": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/db/fbfd745ae543f6856ed59e3d44eb71-100.jpg",
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
                "temporal_coverage": null,
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:iris"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/base-permanente-des-equipements-1/",
                "page": "https://www.data.gouv.fr/fr/datasets/base-permanente-des-equipements-1/",
                "last_update": "2024-08-20T10:51:24.302311+00:00",
                "archived": null,
                "quality": {
                  "license": true,
                  "temporal_coverage": false,
                  "spatial": true,
                  "update_frequency": true,
                  "update_fulfilled_in_time": true,
                  "dataset_description_quality": true,
                  "has_resources": true,
                  "has_open_format": true,
                  "all_resources_available": true,
                  "resources_documentation": true,
                  "score": 0.8888888888888888
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2014-12-12T12:01:06.889000+00:00",
                  "last_modified_internal": "2024-08-20T10:49:40.579000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5e74ecf52eb7514f2d3b8845",
                "title": "Donn\u00e9es des urgences hospitali\u00e8res et de SOS m\u00e9decins relatives \u00e0 l'\u00e9pid\u00e9mie de COVID-19 ",
                "acronym": null,
                "slug": "donnees-des-urgences-hospitalieres-et-de-sos-medecins-relatives-a-lepidemie-de-covid-19",
                "description": "### INFORMATION IMPORTANTE\n\n**Ce jeudi 4 Novembre 2021**, le format de la variable **sursaud_cl_age_corona** sera modifi\u00e9 :\n\n**Nouveau codage :**\n0 = \"Tous \u00e2ges\"\n1 = \"0-4 ans\" \n2 = \"5-14 ans\"\n3 = \"15-44 ans\"\n4 = \"45-64 ans\"\n5 = \"65-74 ans\"\n6 = \"75 ans ou plus\"\n\n**Ancien actuel :**\n0 = \"Tous \u00e2ges\"\nA = \"moins de 15ans\" \nB = \"15-44 ans\"\nC = \"45-64 ans\"\nD = \"65-74 ans\"\nE = \"75 ans ou plus\"\n\n\n### Les actions de Sant\u00e9 publique France\n\nSant\u00e9 publique France a pour mission d'am\u00e9liorer et de prot\u00e9ger la sant\u00e9 des populations. Durant la crise sanitaire li\u00e9e \u00e0 l'\u00e9pid\u00e9mie du COVID-19, Sant\u00e9 publique France se charge de surveiller et comprendre la dynamique de l'\u00e9pid\u00e9mie, d'anticiper les diff\u00e9rents sc\u00e9narii et de mettre en place des actions pour pr\u00e9venir et limiter la transmission de ce virus sur le territoire national.\n\n### Description du jeu de donn\u00e9es\n\nDeux fichiers sont propos\u00e9s :\n\n- **Les donn\u00e9es quotidiennes de SOS m\u00e9decins et des urgences hospitali\u00e8res par d\u00e9partement, sexe et tranche d\u2019\u00e2ge des patients** : nombre de passages aux urgences pour suspicion de COVID-19, nombre total de passages aux urgences avec un diagnostic m\u00e9dical renseign\u00e9, nombre d\u2019hospitalisations parmi les passages aux urgences pour suspicion de COVID-19, nombre total d\u2019actes m\u00e9dicaux SOS M\u00e9decins pour suspicion de COVID-19, nombre total d\u2019actes m\u00e9dicaux SOS M\u00e9decins avec un diagnostic m\u00e9dical renseign\u00e9.\n\n- **Les donn\u00e9es quotidiennes de SOS m\u00e9decins et des urgences hospitali\u00e8res par r\u00e9gion, sexe et tranches d\u2019\u00e2ge des patients** : nombre de passages aux urgences pour suspicion de COVID-19, nombre total de passages aux urgences avec un diagnostic m\u00e9dical renseign\u00e9, nombre d\u2019hospitalisations parmi les passages aux urgences pour suspicion de COVID-19, nombre d\u2019actes m\u00e9dicaux SOS M\u00e9decins pour suspicion de COVID-19, nombre total d\u2019actes m\u00e9dicaux SOS M\u00e9decins avec un diagnostic m\u00e9dical renseign\u00e9. Le code r\u00e9gion correspond au [code INSEE](https://fr.wikipedia.org/wiki/R\u00e9gion_fran\u00e7aise#Niveau_national) publi\u00e9 par l\u2019INSEE sur [www.data.gouv.fr](https://www.data.gouv.fr/fr/datasets/code-officiel-geographique-cog/#resource-c2a54903-513e-41b9-a108-3d9cb2104217).\n\n### Anomalies d\u00e9tect\u00e9es dans les fichiers\n\nAttention, certains fichiers peuvent comporter des anomalies du fait des difficult\u00e9s de collecte des donn\u00e9es.\n\nDes rapports d'erreurs sont publi\u00e9s tous les jours par Etalab dans la rubrique ressources communautaires :\n- [Rapport d'erreurs pour le fichier quotidien](https://static.data.gouv.fr/resources/donnees-des-urgences-hospitalieres-et-de-sos-medecins-relatives-a-lepidemie-de-covid-19/20200402-160328/sursaud-covid19-quotidien-incoherence-01042020.xlsx) ;\n- [Rapport d'erreurs pour le fichier hebdomadaire](https://static.data.gouv.fr/resources/donnees-des-urgences-hospitalieres-et-de-sos-medecins-relatives-a-lepidemie-de-covid-19/20200402-160350/sursaud-covid19-hebdomadaire-incoherence-01042020.xlsx).\n\n\u00c0 noter que : \n- Pour certains patients, la classe d\u2019\u00e2ge n\u2019a pas \u00e9t\u00e9 identifi\u00e9e dans la base de donn\u00e9es. Ce qui peut induire un d\u00e9calage entre la somme de toutes les classes d\u2019\u00e2ge d\u2019un indicateur et le nombre total de cet indicateur ;\n- Pour certains patients, le sexe n\u2019a pas \u00e9t\u00e9 identifi\u00e9 dans la base de donn\u00e9es. Ce qui peut induire un d\u00e9calage entre la somme H/F d\u2019un indicateur et le nombre total de cet indicateur.\n\n\nN\u2019h\u00e9sitez pas \u00e0 signaler d'autres anomalies en commentaire. Ces remarques seront communiqu\u00e9es \u00e0 l'\u00e9quipe en charge de la collecte et diffusion des donn\u00e9es. \n\n### Autres donn\u00e9es disponibles\n\n[Sant\u00e9 publique France](https://www.data.gouv.fr/fr/organizations/sante-publique-france/) publie \u00e9galement les [donn\u00e9es hospitali\u00e8res relatives \u00e0 l\u2019\u00e9pid\u00e9mie de COVID-19](https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/).\n",
                "created_at": "2020-03-20T17:19:01.201000+00:00",
                "last_modified": "2024-08-28T16:00:12.446000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "coronavirus",
                  "covid-19",
                  "covid19"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/5e74ecf52eb7514f2d3b8845/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 7
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5e74ecf52eb7514f2d3b8845&page=1&page_size=50",
                  "type": "GET",
                  "total": 8
                },
                "frequency": "unknown",
                "frequency_date": "2020-03-21T17:18:23+00:00",
                "extras": {
                  "recommendations-externals": [
                    {
                      "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Do you want to monitor the COVID-19 pandemic\u00a0evolution?",
                          "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
                          "button": "Visit the COVID-19 pandemic monitoring dashboard"
                        },
                        "fr": {
                          "title": "Vous souhaitez suivre l\u2019\u00e9volution de l\u2019\u00e9pid\u00e9mie de COVID-19\u00a0?",
                          "message": "Le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l\u2019\u00e9volution de la situation sanitaire.",
                          "button": "Consulter le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19"
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
                      "id": "5e7e104ace2080d9162b61d8",
                      "score": 63,
                      "source": "matomo"
                    }
                  ]
                },
                "metrics": {
                  "discussions": 62,
                  "reuses": 50,
                  "followers": 31,
                  "views": 35496,
                  "resources_downloads": 83210
                },
                "organization": {
                  "name": "Sant\u00e9 publique France",
                  "acronym": "SPF",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/sante-publique-france/",
                  "slug": "sante-publique-france",
                  "page": "https://www.data.gouv.fr/fr/organizations/sante-publique-france/",
                  "logo": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
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
                  "granularity": "fr:departement"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/donnees-des-urgences-hospitalieres-et-de-sos-medecins-relatives-a-lepidemie-de-covid-19/",
                "page": "https://www.data.gouv.fr/fr/datasets/donnees-des-urgences-hospitalieres-et-de-sos-medecins-relatives-a-lepidemie-de-covid-19/",
                "last_update": "2024-08-28T18:00:12.315000+00:00",
                "archived": null,
                "quality": {
                  "license": true,
                  "temporal_coverage": false,
                  "spatial": true,
                  "update_frequency": false,
                  "dataset_description_quality": true,
                  "has_resources": true,
                  "has_open_format": true,
                  "all_resources_available": true,
                  "resources_documentation": true,
                  "score": 0.6666666666666666
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2020-03-20T17:19:01.201000+00:00",
                  "last_modified_internal": "2024-08-28T16:00:12.446000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "621df2954fa5a3b5a023e23c",
                "title": "Bases statistiques communale, d\u00e9partementale et r\u00e9gionale de la d\u00e9linquance enregistr\u00e9e par la police et la gendarmerie nationales ",
                "acronym": "base",
                "slug": "bases-statistiques-communale-departementale-et-regionale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales",
                "description": "Dans le cadre de leur activit\u00e9 judiciaire, les forces de s\u00e9curit\u00e9 (services de police et unit\u00e9s de gendarmerie) sont amen\u00e9es \u00e0 r\u00e9diger des proc\u00e9dures relatives \u00e0 des infractions, avant de les transmettre \u00e0 l\u2019autorit\u00e9 judiciaire qui est susceptible de les requalifier par la suite. Ces infractions ont pu \u00eatre constat\u00e9es suite \u00e0 une plainte d\u00e9pos\u00e9e par une victime, \u00e0 un signalement, un t\u00e9moignage, un flagrant d\u00e9lit, une d\u00e9nonciation, etc., mais aussi sur l\u2019initiative des forces de s\u00e9curit\u00e9.\n\nDepuis 1972, les services de s\u00e9curit\u00e9 (police et gendarmerie) se sont dot\u00e9es d\u2019un outil standardis\u00e9 de mesure de l\u2019activit\u00e9 judiciaire des services bas\u00e9 sur des comptages mensuels, appel\u00e9 \u00ab \u00c9tat 4001 \u00bb. Ce document administratif porte sur les crimes et les d\u00e9lits (\u00e0 l\u2019exclusion des contraventions et des d\u00e9lits routiers), enregistr\u00e9s pour la premi\u00e8re fois par les forces de s\u00e9curit\u00e9 et port\u00e9s \u00e0 la connaissance de l\u2019institution judiciaire. Les infractions y sont class\u00e9es en 107 cat\u00e9gories (appel\u00e9s \u00ab index \u00bb), tr\u00e8s h\u00e9t\u00e9rog\u00e8nes par la nature et la gravit\u00e9 des faits, mais aussi par le nombre d\u2019infractions constat\u00e9es chaque mois. Selon l\u2019index, l\u2019unit\u00e9 de compte retenue peut varier : elle peut \u00eatre la victime par exemple en mati\u00e8re de violence sexuelle, l\u2019auteur par exemple en mati\u00e8re d\u2019usage ou d\u2019usage revente de stup\u00e9fiants ou encore le v\u00e9hicule en mati\u00e8re de vol de v\u00e9hicule, etc. Cela implique qu\u2019il n\u2019est pas pertinent de constituer des agr\u00e9gats regroupant des index n\u2019ayant pas la m\u00eame unit\u00e9 de compte.\n\nDepuis sa cr\u00e9ation fin 2014, le Service statistique minist\u00e9riel de la s\u00e9curit\u00e9 int\u00e9rieure ([SSMSI](https://www.interieur.gouv.fr/Interstats/Qui-sommes-nous)) expertise et fiabilise ces diff\u00e9rents index et diffuse des indicateurs choisis et construits \u00e0 partir de regroupements de ces index. \n\nLa disponibilit\u00e9, depuis le printemps 2016, de bases de donn\u00e9es d\u00e9taill\u00e9es sur les infractions constat\u00e9es a permis la construction de cat\u00e9gories statistiques plus fines que celles de \u00ab l\u2019\u00e9tat 4001\u00bb (comptages historiques suivis par le minist\u00e8re de l\u2019Int\u00e9rieur) : rep\u00e9rage des violences intrafamiliales, analyses par types de victimes ou selon la localisation des faits (par exemple dans les transports en commun).\n\n**Afin de favoriser l\u2019ouverture des donn\u00e9es sur la d\u00e9linquance et l\u2019ins\u00e9curit\u00e9, le SSMSI met \u00e0 disposition, 3 bases de donn\u00e9es annuelles (communale, d\u00e9partementale et r\u00e9gionale) sur les principaux indicateurs des crimes et d\u00e9lits enregistr\u00e9s par la police et la gendarmerie nationales, depuis 2016, toutes les trois selon le lieu de commission.** \nCes bases ont vocation \u00e0 \u00eatre enrichies au fur et \u00e0 mesure que les donn\u00e9es pour d\u2019autres indicateurs seront fiabilis\u00e9es.\n\n_Calendrier des enrichissements/modifications :\n   Mars 2022 : cr\u00e9ation des bases communale et d\u00e9partementale ;\n   Juin 2022: rectification de la valeur de certains taux d\u00e9partementaux de d\u00e9linquance pour 1000 habitants/logements. Pour les d\u00e9partements de Paris, du Rh\u00f4ne et des Bouches-du-Rh\u00f4ne, les       habitants/logements de Paris, Lyon et Marseille ont \u00e9t\u00e9 compt\u00e9s en double (en sommant la population de la commune et celle de ses arrondissements). Ceci a induit une erreur dans les taux de d\u00e9linquance pour 1 000 habitants/logements de ces d\u00e9partements ;\n   Septembre 2022 : int\u00e9gration de la g\u00e9ographie des communes connue au 1er janvier 2022 ;\n   Mars 2023 : ajout de l\u2019indicateur relatif aux destructions et d\u00e9gradations volontaires, extension du champ g\u00e9ographique aux DROM et ajout des arrondissements de Paris, Lyon et Marseille;\n   Juillet 2023 : ajouts des indicateurs relatifs \u00e0 l\u2019usage et au trafic de stup\u00e9fiants, int\u00e9gration de la g\u00e9ographie des communes connue au 1er janvier 2023, int\u00e9gration de la g\u00e9ographie des communes connue au 1er janvier 2023 ;\n   Janvier 2024 : ajouts des indicateurs relatifs aux homicides et aux escroqueries \u00e0 l\u2019\u00e9chelon d\u00e9partemental (pour plus de d\u00e9tails cf. Interstats Analyse num\u00e9ro 65 : [Geographie-departementale-de-la-delinquance-en-2023-Interstats-Analyse-n-65](https://www.interieur.gouv.fr/Interstats/Actualites/Geographie-departementale-de-la-delinquance-en-2023-Interstats-Analyse-n-65)) ;\n   F\u00e9vrier 2024: ajout de la base communale au format Parquet; r\u00e9vision du fichier d\u00e9partemental sur les destructions et d\u00e9gradations volontaires en 2023 (ajout de remont\u00e9es d\u2019informations tardives);\n   Mars 2024: ajout des arrondissements de Paris, Lyon et Marseille pour les indicateurs usage et trafic de stup\u00e9fiants dans la base communale; cr\u00e9ation d'une base r\u00e9gionale pour l'ensemble des indicateurs de la d\u00e9linquance disponibles;\n  Juillet 2024 : int\u00e9gration de la g\u00e9ographie des communes connue au 1er janvier 2024._\n \nLes donn\u00e9es diffus\u00e9es sont limit\u00e9es aux communes pour lesquelles plus de 5 faits ont \u00e9t\u00e9 enregistr\u00e9s pendant 3 ann\u00e9es successives. Cette pr\u00e9caution est motiv\u00e9e : d\u2019une part par la fragilit\u00e9 des estimations sur des communes qui enregistrent peu de faits de d\u00e9linquance ([Interstats Analyse n\u00b066, mars 2024](https://www.interieur.gouv.fr/Interstats/Publications/Interstats-Analyse)), d\u2019autre part par le secret statistique qui ne doit pas permettre, par le croisement de multiples sources, de d\u00e9duire des informations individuelles sur les personnes concern\u00e9es dans ces proc\u00e9dures. Cette pr\u00e9caution doit notamment \u00eatre appr\u00e9ci\u00e9e au regard de la sensibilit\u00e9 de certaines atteintes comme les violences sexuelles. La base de donn\u00e9es diffus\u00e9e fournit \u00e9galement l'information sur l'absence de faits enregistr\u00e9s lorsqu\u2019elle se reproduit sur 3 ann\u00e9es successives. Les donn\u00e9es communales de d\u00e9linquance ventil\u00e9es par lieu de commission en 2014 et en 2015 n\u2019\u00e9tant pas disponibles, les donn\u00e9es communales de 2016 et de 2017 sont diffus\u00e9es si les crit\u00e8res de diffusion pour l\u2019ann\u00e9e 2018 sont v\u00e9rifi\u00e9s. \n\nOutre les indicateurs des crimes et d\u00e9lits, la base communale comporte des donn\u00e9es informatives relatives \u00e0 la commune o\u00f9 se sont produits les faits, telles que les codes officiels g\u00e9ographiques de la commune, du d\u00e9partement et de la r\u00e9gion d\u2019appartenance, leurs libell\u00e9s respectifs, les populations r\u00e9sidentes correspondantes,\u2026 (pour plus de d\u00e9tails se r\u00e9f\u00e9rer \u00e0 l\u2019espace Documentation ci-dessous)\n\n\n**Derni\u00e8re mise \u00e0 jour :** juillet 2024\n\n",
                "created_at": "2022-03-01T11:16:53.477000+00:00",
                "last_modified": "2024-07-18T15:41:03.686000+00:00",
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
                  "href": "https://www.data.gouv.fr/api/2/datasets/621df2954fa5a3b5a023e23c/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 7
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=621df2954fa5a3b5a023e23c&page=1&page_size=50",
                  "type": "GET",
                  "total": 3
                },
                "frequency": "annual",
                "frequency_date": "2023-03-01T23:15:12+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 0,
                  "reuses": 13,
                  "followers": 19,
                  "views": 86357,
                  "resources_downloads": 64377
                },
                "organization": {
                  "name": "Minist\u00e8re de l'Int\u00e9rieur et des Outre-Mer",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-linterieur-et-des-outre-mer/",
                  "slug": "ministere-de-linterieur-et-des-outre-mer",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-linterieur-et-des-outre-mer/",
                  "logo": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/64/efa546af334b4cbf07e36f694db4fe-100.png",
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
                  "end": "2023-12-31"
                },
                "spatial": {
                  "geom": null,
                  "zones": [
                    "country-subset:fr:metro"
                  ],
                  "granularity": "fr:commune"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/bases-statistiques-communale-departementale-et-regionale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/",
                "page": "https://www.data.gouv.fr/fr/datasets/bases-statistiques-communale-departementale-et-regionale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/",
                "last_update": "2024-07-18T15:05:05.416000+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2022-03-01T11:16:53.477000+00:00",
                  "last_modified_internal": "2024-07-18T15:41:03.686000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "60190d00a7273a8100dd4d38",
                "title": "Synth\u00e8se des indicateurs de suivi de l\u2019\u00e9pid\u00e9mie COVID-19",
                "acronym": null,
                "slug": "synthese-des-indicateurs-de-suivi-de-lepidemie-covid-19",
                "description": "**Dans un contexte d\u2019\u00e9pid\u00e9mie favorable, \u00e0 compter du 1er juillet 2023, le cadre juridique actuellement en cours pr\u00e9voit l\u2019arr\u00eat du traitement des donn\u00e9es personnelles issues de SI-DEP. Par cons\u00e9quent, apr\u00e8s une p\u00e9riode transitoire d\u2019ajustement de deux semaines, les nouveaux indicateurs de surveillance virologique seront publi\u00e9s aux niveaux national, r\u00e9gional et d\u00e9partemental) \u00e0 une fr\u00e9quence hebdomadaire. \nLes consignes de saisie sp\u00e9cifiques dans SI-VIC seront lev\u00e9es \u00e0 partir de cette date, les indicateurs hospitaliers ne seront plus disponibles. \nSant\u00e9 publique France maintient la surveillance de l\u2019\u00e9pid\u00e9mie \u00e0 travers son dispositif multi-sources. Les indicateurs relatifs \u00e0 la surveillance g\u00e9nomique, aux recours aux associations SOS M\u00e9decins, aux urgences hospitali\u00e8res et aux d\u00e9c\u00e8s resteront disponibles.** \n\n\n### INFORMATION 25/01/2023\n\nSuite \u00e0 une erreur de saisie, le nombre de d\u00e9c\u00e8s survenus en semaine 03 en ESMS a \u00e9t\u00e9 revu \u00e0 la baisse. Les corrections n\u00e9cessaires ont \u00e9t\u00e9 apport\u00e9es et expliquent la baisse artificielle du nombre de d\u00e9c\u00e8s total survenus depuis le d\u00e9but de l\u2019\u00e9pid\u00e9mie.\n\n\u26a0\ufe0f  **15/11/2022** Suite \u00e0 la suspension de l\u2019activit\u00e9 par une partie des Laboratoires de biologie m\u00e9dicale priv\u00e9s depuis le 14 novembre, le nombre de \u00ab Nouveaux cas confirm\u00e9s depuis la veille \u00bb est sous-estim\u00e9 \u00e0 compter du mardi 15/11. De m\u00eame le taux d\u2019incidence et le taux de d\u00e9pistage seront sous-estim\u00e9s \u00e0 compter du jeudi 17/11. Les \u00e9quipes de Sant\u00e9 publique France restent mobilis\u00e9es pour assurer le suivi de l\u2019\u00e9pid\u00e9mie qui repose sur une surveillance multi-sources. \n\n**08/06/2022**\n**Compte tenu de la tendance actuelle favorable et la baisse des principaux indicateurs, \u00e0 partir du 11 juin 2022, les indicateurs COVID-19 produits par Sant\u00e9 publique France seront actualis\u00e9s sur G\u00e9odes et data.gouv.fr tous les jours \u00e0 l\u2019exception des week-end et des jours f\u00e9ri\u00e9s.**\n\n\n### Description du jeu de donn\u00e9es\n\n**Ce jeu de donn\u00e9es comprends l'essentiel des indicateurs de synth\u00e8se permettant le suivi de l'\u00e9pid\u00e9mie de COVID-19 en France.** Un inventaire des donn\u00e9es relatives au COVID-19 sur data.gouv.fr est disponible [ici](https://www.data.gouv.fr/fr/pages/donnees_covid).\n\nCes donn\u00e9es sont notamment expos\u00e9es sur l'onglet *vue d'ensemble* du [tableau de bord de suivi de l'\u00e9pid\u00e9mie disponible sur gouvernement.fr](https://www.gouvernement.fr/info-coronavirus/carte-et-donnees). Ce dernier pr\u00e9sente depuis le 28 mars 2020 les donn\u00e9es relatives \u00e0 l\u2019\u00e9pid\u00e9mie de COVID-19 en France. \n\nCet outil dont le [code source est libre](https://github.com/etalab/covid19-dashboard), a \u00e9t\u00e9 d\u00e9velopp\u00e9 sous l\u2019impulsion d\u2019Etalab et avec la collaboration de la soci\u00e9t\u00e9 civile. Il propose une vision consolid\u00e9e des donn\u00e9es officielles disponibles. \n\n## Description des donn\u00e9es\n\nLes donn\u00e9es contenues dans le jeu de donn\u00e9es sont publi\u00e9es quotidiennement. \n\n### Donn\u00e9es contextuelles : \n- ```'date'``` = Date \n\n- ```'dep'```= D\u00e9partement\n\n- ```'reg'```= R\u00e9gion\n\n- ```'lib_dep'```= libell\u00e9 d\u00e9partement \n\n- ```'lib_reg'```= libell\u00e9 r\u00e9gion \n\n### Donn\u00e9es relatives \u00e0 la situation hospitali\u00e8re \n- ```'hosp'```= Nombre de patients actuellement hospitalis\u00e9s pour COVID-19.\n-  ```'incid_hosp'```= Nombre de nouveaux patients hospitalis\u00e9s au cours des derni\u00e8res 24h.\n\n- ```'rea'```= Nombre de patients actuellement en r\u00e9animation ou en soins intensifs.\n- ```'incid_rea'```= Nombre de nouveaux patients admis en r\u00e9animation au cours des derni\u00e8res 24h.\n\n- ```'rad'```= Nombre cumul\u00e9 de patients ayant \u00e9t\u00e9 hospitalis\u00e9s pour COVID-19 et de retour \u00e0 domicile en raison de l'am\u00e9lioration de leur \u00e9tat de sant\u00e9.\n- ```'incid_rad'```= Nouveaux retours \u00e0 domicile au cours des derni\u00e8res 24h.\n\n### Donn\u00e9es relatives au d\u00e9c\u00e8s pour cause de COVID-19\n\n- ```'dchosp'```= D\u00e9c\u00e8s \u00e0 l\u2019h\u00f4pital\n-  ```'incid_dchosp'```= Nouveaux patients d\u00e9c\u00e9d\u00e9s \u00e0 l\u2019h\u00f4pital au cours des derni\u00e8res 24h.\n\n- ```'esms_dc'```= D\u00e9c\u00e8s en ESMS\n\n- ```'dc_tot'```= Cumul des d\u00e9c\u00e8s (cumul des d\u00e9c\u00e8s constat\u00e9s \u00e0 l'h\u00f4pital et en EMS)\n\n### Donn\u00e9es relatives aux tests\n- ```'conf'```= Nombre de cas confirm\u00e9s\n- ```'conf_j1'```= Nombre de nouveaux cas confirm\u00e9s (J-1 date de r\u00e9sultats)\n- ```'pos'```= Nombre de personnes d\u00e9clar\u00e9es positives (J-3 date de pr\u00e9l\u00e8vement)\n- ```'pos_7j'``` = Nombre de personnes d\u00e9clar\u00e9es positives sur une semaine (J-3 date de pr\u00e9l\u00e8vement)\n\n- ```'esms_cas'``` = Cas confirm\u00e9s en ESMS\n\n### Donn\u00e9es relatives aux indicateurs de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19\n\n- ```'tx_pos'```= **Taux de positivit\u00e9** des tests virologiques (Le taux de positivit\u00e9 correspond au nombre de personnes test\u00e9es positives (RT-PCR et test antig\u00e9nique) pour la premi\u00e8re fois depuis plus de 60 jours rapport\u00e9 au nombre total de personnes test\u00e9es positives ou n\u00e9gatives sur une p\u00e9riode donn\u00e9e ; et qui n\u2018ont jamais \u00e9t\u00e9 test\u00e9es positive dans les 60 jours pr\u00e9c\u00e9dents.)\n\n- ```'tx_incid'```= **Taux d'incidence** (activit\u00e9 \u00e9pid\u00e9mique : Le taux d'incidence correspond au nombre de personnes test\u00e9es positives (RT-PCR et test antig\u00e9nique) pour la premi\u00e8re fois depuis plus de 60 jours rapport\u00e9 \u00e0 la taille de la population. Il est exprim\u00e9 pour 100 000 habitants)\n\n- ```'TO'```= **Taux d'occupation** : tension hospitali\u00e8re sur la capacit\u00e9 en r\u00e9animation (Proportion de patients atteints de COVID-19 actuellement en r\u00e9animation, en soins intensifs, ou en unit\u00e9 de surveillance continue rapport\u00e9e au total des lits en capacit\u00e9 initiale, c\u2019est-\u00e0-dire avant d\u2019augmenter les capacit\u00e9s de lits de r\u00e9animation dans un h\u00f4pital).\n\n- ```'R'```= **Facteur de reproduction du virus** (\u00e9volution du R0 : Le nombre de reproduction du virus : c\u2019est le nombre moyen de personnes qu\u2019une personne infect\u00e9e peut contaminer. Si le R effectif est sup\u00e9rieur \u00e0 1, l\u2019\u00e9pid\u00e9mie se d\u00e9veloppe ; s\u2019il est inf\u00e9rieur \u00e0 1, l\u2019\u00e9pid\u00e9mie r\u00e9gresse) \n\n\n---\n**Points d'attentions**  : \n- Les m\u00e9thodes de collecte des donn\u00e9es ont \u00e9volu\u00e9es dans le temps ; \n- Au cours de l'\u00e9t\u00e9 2020, les donn\u00e9es n'ont pas \u00e9t\u00e9 publi\u00e9es durant les week-end et jours f\u00e9ri\u00e9s. \n\n### **Ressources**\n- **[Consulter le tableau de bord](https://www.gouvernement.fr/info-coronavirus/carte-et-donnees)** \n- **[Consulter l'inventaire des donn\u00e9es relatives au COVID-19 sur data.gouv.fr](https://www.data.gouv.fr/fr/pages/donnees_covid)** \n- **[Consulter les donn\u00e9es de Sant\u00e9 publique France](https://www.data.gouv.fr/fr/organizations/sante-publique-france/)** \n- **[Consulter les donn\u00e9es du minist\u00e8re des Solidarit\u00e9s et de la Sant\u00e9](https://www.data.gouv.fr/fr/organizations/ministere-des-solidarites-et-de-la-sante/)** ",
                "created_at": "2021-02-02T09:27:44.214000+00:00",
                "last_modified": "2023-09-13T15:40:16.875000+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "coronavirus",
                  "covid",
                  "covid19"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/60190d00a7273a8100dd4d38/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 2
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=60190d00a7273a8100dd4d38&page=1&page_size=50",
                  "type": "GET",
                  "total": 0
                },
                "frequency": "daily",
                "frequency_date": "2021-02-16T14:06:48+00:00",
                "extras": {
                  "recommendations-externals": [
                    {
                      "id": "https://www.gouvernement.fr/info-coronavirus/carte-et-donnees",
                      "score": 50,
                      "source": "edito",
                      "messages": {
                        "en": {
                          "title": "Do you want to monitor the COVID-19 pandemic\u00a0evolution?",
                          "message": "The COVID-19 pandemic monitoring dashboard allows you to find all the essential information about the evolution of the health situation.",
                          "button": "Visit the COVID-19 pandemic monitoring dashboard"
                        },
                        "fr": {
                          "title": "Vous souhaitez suivre l\u2019\u00e9volution de l\u2019\u00e9pid\u00e9mie de COVID-19\u00a0?",
                          "message": "Le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19 vous permet de retrouver toutes les informations essentielles sur l\u2019\u00e9volution de la situation sanitaire.",
                          "button": "Consulter le tableau de bord de suivi de l\u2019\u00e9pid\u00e9mie de COVID-19"
                        }
                      }
                    }
                  ],
                  "recommendations:sources": [
                    "edito"
                  ]
                },
                "metrics": {
                  "discussions": 27,
                  "reuses": 16,
                  "followers": 10,
                  "views": 2439795,
                  "resources_downloads": 1985473
                },
                "organization": {
                  "name": "Sant\u00e9 publique France",
                  "acronym": "SPF",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/sante-publique-france/",
                  "slug": "sante-publique-france",
                  "page": "https://www.data.gouv.fr/fr/organizations/sante-publique-france/",
                  "logo": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/76/69d8ead7684d25a80c9fa97d943b06-100.png",
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
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "fr:departement"
                },
                "license": "lov2",
                "uri": "https://www.data.gouv.fr/api/1/datasets/synthese-des-indicateurs-de-suivi-de-lepidemie-covid-19/",
                "page": "https://www.data.gouv.fr/fr/datasets/synthese-des-indicateurs-de-suivi-de-lepidemie-covid-19/",
                "last_update": "2023-06-30T17:59:10.362000+00:00",
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
                  "score": 0.6666666666666666
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2021-02-02T09:27:44.214000+00:00",
                  "last_modified_internal": "2023-09-13T15:40:16.875000+00:00"
                },
                "contact_point": null
              },
              {
                "id": "53698f50a3a729239d2036f5",
                "title": "Base de donn\u00e9es publique des m\u00e9dicaments (base officielle)",
                "acronym": null,
                "slug": "base-de-donnees-publique-des-medicaments-base-officielle",
                "description": "La base de donn\u00e9es publique des m\u00e9dicaments permet au grand public et aux professionnels de sant\u00e9 d'acc\u00e9der \u00e0 des donn\u00e9es et documents de r\u00e9f\u00e9rence sur les m\u00e9dicaments commercialis\u00e9s ou ayant \u00e9t\u00e9 commercialis\u00e9s durant les deux derni\u00e8res ann\u00e9es en France.\r\n\r\nCette base de donn\u00e9es administratives et scientifiques sur les traitements et le bon usage des produits de sant\u00e9 est mise en \u0153uvre par l'Agence nationale de s\u00e9curit\u00e9 du m\u00e9dicament et des produits de sant\u00e9 (ANSM), en liaison avec la Haute Autorit\u00e9 de sant\u00e9 (HAS) et l'Union nationale des caisses d'assurance maladie (UNCAM), sous l'\u00e9gide du minist\u00e8re des Affaires sociales et de la sant\u00e9.\r\n",
                "created_at": "2013-12-12T15:48:39.611000+00:00",
                "last_modified": "2016-03-16T23:34:38+00:00",
                "deleted": null,
                "private": false,
                "tags": [
                  "base",
                  "donnee",
                  "medicament",
                  "medicaments",
                  "publique",
                  "sante",
                  "substances"
                ],
                "badges": [],
                "resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/2/datasets/53698f50a3a729239d2036f5/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 1
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=53698f50a3a729239d2036f5&page=1&page_size=50",
                  "type": "GET",
                  "total": 0
                },
                "frequency": "unknown",
                "frequency_date": null,
                "extras": {
                  "datagouv_ckan_id": "894a6d06-e701-4dd2-be2b-631d8a4dfbe9",
                  "datagouv_ckan_last_sync": "2014-09-17T03:42:56.724000"
                },
                "metrics": {
                  "discussions": 9,
                  "reuses": 13,
                  "followers": 27,
                  "views": 47683,
                  "resources_downloads": 8078
                },
                "organization": {
                  "name": "Minist\u00e8re des Solidarit\u00e9s et de la Sant\u00e9",
                  "acronym": null,
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-des-solidarites-et-de-la-sante/",
                  "slug": "ministere-des-solidarites-et-de-la-sante",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-des-solidarites-et-de-la-sante/",
                  "logo": "https://static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-original.png",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/3c/2a35d973814c2681b6941e11810ff3-100.png",
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
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "country"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/base-de-donnees-publique-des-medicaments-base-officielle/",
                "page": "https://www.data.gouv.fr/fr/datasets/base-de-donnees-publique-des-medicaments-base-officielle/",
                "last_update": "2024-06-24T00:11:37.722180+00:00",
                "archived": null,
                "quality": {
                  "license": true,
                  "temporal_coverage": false,
                  "spatial": true,
                  "update_frequency": false,
                  "dataset_description_quality": true,
                  "has_resources": true,
                  "has_open_format": true,
                  "all_resources_available": false,
                  "resources_documentation": true,
                  "score": 0.5555555555555556
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2013-12-12T15:48:39.611000+00:00",
                  "last_modified_internal": "2016-03-16T23:34:38+00:00"
                },
                "contact_point": null
              },
              {
                "id": "5cd57bf68b4c4179299eb0e9",
                "title": "Donn\u00e9es essentielles de la commande publique - fichiers consolid\u00e9s",
                "acronym": "DECP",
                "slug": "donnees-essentielles-de-la-commande-publique-fichiers-consolides",
                "description": "L\u2019[arr\u00eat\u00e9](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038318675) du 22 mars 2019 relatif aux donn\u00e9es essentielles pr\u00e9voit l\u2019obligation pour tous les acheteurs publics fran\u00e7ais (collectivit\u00e9s territoriales, minist\u00e8res, h\u00f4pitaux publics, \u00e9tablissements publics, etc.) et toutes les autorit\u00e9s conc\u00e9dantes fran\u00e7aises de publier les donn\u00e9es essentielles de leurs march\u00e9s publics et de leurs contrats de concession sur leur profil d'acheteur pendant une dur\u00e9e de cinq ans.         \nIl est \u00e9galement possible de les publier sur le portail national des donn\u00e9es ouvertes [data.gouv.fr](https://www.data.gouv.fr/fr/)\n\nA compter du 1er Janvier 2024, les donn\u00e9es essentielles des march\u00e9s publics et des contrats de concession doivent \u00eatre publi\u00e9es par les acheteurs et les autorit\u00e9s conc\u00e9dantes directement sur [data.gouv.fr](https://www.data.gouv.fr/fr/) et devront \u00eatre conformes aux exigences fix\u00e9es par les arr\u00eat\u00e9s modifi\u00e9s du 22 d\u00e9cembre 2022 ([arr\u00eat\u00e9 march\u00e9s publics](https://www.legifrance.gouv.fr/loda/id/LEGIARTI000048876437/2024-01-01/) & [arr\u00eat\u00e9 concessions](https://www.legifrance.gouv.fr/loda/id/LEGIARTI000048916375/2024-01-01/))\nAfin de faciliter l\u2019utilisation de ces donn\u00e9es \u00e0 l'\u00e9chelle nationale, un fichier unique agr\u00e9geant et retraitant les diff\u00e9rentes sources en provenance de [data.gouv.fr](https://www.data.gouv.fr/fr/) est mis \u00e0 disposition.\n\nLes sources de donn\u00e9es utilis\u00e9es sont les suivantes :\n\u2022\tdonn\u00e9es issues du PES March\u00e9 de la DGFiP\n\u2022\tdonn\u00e9es issues de l'API DUME de l'AIFE\n\u2022\tdonn\u00e9es issues de l\u2019\u00e9diteur AWS \n\u2022\tdonn\u00e9es issues de l\u2019\u00e9diteur Atexo\n\u2022\tdonn\u00e9es issues de l\u2019\u00e9diteur Dematis\n\u2022\tdonn\u00e9es issues du profil d\u2019acheteur M\u00e9galis Bretagne\n\u2022\tdonn\u00e9es issues du profil d\u2019acheteur Territoires Num\u00e9riques-BFC\n\u2022\tdonn\u00e9es issues du profil d\u2019acheteur marches-publics. info\n\u2022\tdonn\u00e9es issues du Grand Lyon\n\u2022\tdonn\u00e9es issues de la R\u00e9gion Bretagne\n\n**Bon \u00e0 savoir**\n\nLes donn\u00e9es issues de l\u2019arr\u00eat\u00e9 du 22 mars 2019 relatif aux donn\u00e9es essentielles de la commande publique sont visualisables dans 4 jeux de donn\u00e9es disponibles au lien [suivant](https://data.economie.gouv.fr/pages/donnees-essentielles-de-la-commande-publique/).\n",
                "created_at": "2019-05-10T15:26:14.659000+00:00",
                "last_modified": "2024-09-02T02:30:40.061000+00:00",
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
                  "href": "https://www.data.gouv.fr/api/2/datasets/5cd57bf68b4c4179299eb0e9/resources/?page=1&page_size=50",
                  "type": "GET",
                  "total": 1572
                },
                "community_resources": {
                  "rel": "subsection",
                  "href": "https://www.data.gouv.fr/api/1/datasets/community_resources/?dataset=5cd57bf68b4c4179299eb0e9&page=1&page_size=50",
                  "type": "GET",
                  "total": 5
                },
                "frequency": "daily",
                "frequency_date": "2021-04-17T05:10:15+00:00",
                "extras": {},
                "metrics": {
                  "discussions": 19,
                  "reuses": 5,
                  "followers": 17,
                  "views": 74142,
                  "resources_downloads": 2642430
                },
                "organization": {
                  "name": "Minist\u00e8re de l'\u00c9conomie, des Finances et de la Souverainet\u00e9 industrielle et num\u00e9rique",
                  "acronym": "MEFSIN",
                  "uri": "https://www.data.gouv.fr/api/1/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "slug": "ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique",
                  "page": "https://www.data.gouv.fr/fr/organizations/ministere-de-leconomie-des-finances-et-de-la-souverainete-industrielle-et-numerique/",
                  "logo": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-original.jpg",
                  "logo_thumbnail": "https://static.data.gouv.fr/avatars/3b/06ce9c1027460a87364418789747b6-100.jpg",
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
                  "zones": [
                    "country:fr"
                  ],
                  "granularity": "poi"
                },
                "license": "fr-lo",
                "uri": "https://www.data.gouv.fr/api/1/datasets/donnees-essentielles-de-la-commande-publique-fichiers-consolides/",
                "page": "https://www.data.gouv.fr/fr/datasets/donnees-essentielles-de-la-commande-publique-fichiers-consolides/",
                "last_update": "2024-09-02T05:24:08.227911+00:00",
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
                  "score": 1.0
                },
                "harvest": null,
                "internal": {
                  "created_at_internal": "2019-05-10T15:26:14.659000+00:00",
                  "last_modified_internal": "2024-09-02T02:30:40.061000+00:00"
                },
                "contact_point": null
              }
            ],
            "page": 1,
            "page_size": 20,
            "total": 10000,
            "next_page": "https://www.data.gouv.fr/api/2/datasets/search/?viewMode=story&id=components-search--default-search&page_size=20&page=2",
            "previous_page": null
          });
        }),
      ],
    },
  },
} satisfies Meta<typeof Search>;

export default meta;

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

export const DefaultSearch: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Search },
    setup() {
      return { args };
    },
    template: ` <Search v-bind="args" />`,
  }),
  args: {},
};

export const SearchWithOrgProps: StoryObj<typeof meta> = {
  play:  async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("A user fills the search input", async () => {
      const input = canvas.getByTestId("search-input");
      await userEvent.type(input as HTMLInputElement, "some string");
    });
    await waitFor(async () => {
      await expect(requestFn).toHaveBeenCalled();
      await expect(requestFn).toHaveBeenCalledWith(args.organization);
    });
  },
  render: (args) => ({
    components: { Search },
    setup() {
      return { args };
    },
    template: ` <Search v-bind="args" />`,
  }),
  args: {
    organization: '534fff81a3a7292c64a77e5c'
  },
};

export const WithoutFirstSearch: StoryObj<typeof meta> = {
  render: (_args) => ({
    components: { Search },
    setup() {
      return { disableFirstSearch: true, sampleResults };
    },
    template: ` <Search :disableFirstSearch="true" :data-results="sampleResults" :data-total-results="20" />`,
  }),
  args: {},
};

