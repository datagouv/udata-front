import { withActions } from '@storybook/addon-actions/decorator';
import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ResourceAccordion } from '.';
import { AvailablePreview } from './Preview/Preview.stories';
import * as OrganizationStories from "../Organization/OrganizationNameWithCertificate.stories";
import type { CommunityResource, Resource } from '../../types/resources';

const meta = {
  title: "Components/Resource/Resource",
  component: ResourceAccordion,
  decorators: [withActions],
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click a'],
    },
    docs: {
      description: {
        component: "The ResourceAccordion accordion shows a all resource information in a tabbed view."
      }
    }
  },
} satisfies Meta<typeof ResourceAccordion>;

export default meta;

const args = {
  datasetId: "someId",
  resource: {
    checksum: {type: "sha1", value: "54d0f3a4847c546c1cc4865f5ca54a1f8fc3f9af"},
    created_at: "2023-11-15T10:40:22.288000+00:00",
    description: `# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---
 and 'single quotes'

| Item | Price | Quantity |
|————–|——-|———-|
| Apple | $1 | 5 |
| Bread | $2 | 2 |

 `,
    extras: {},
    filesize: 9167,
    filetype: "file",
    format: "csv",
    harvest: null,
    id: "e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
    last_modified: "2023-11-15T10:40:22.461000+00:00",
    latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    metrics: {views: 0},
    mime: "text/csv",
    preview_url: "",
    schema: null,
    title: "tondeuse_batterie_fr.csv",
    type: "main",
    url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
  } satisfies Resource
};

const argsWithSchema = {
  datasetId: "someId",
  resource: {
    checksum: {type: "sha1", value: "54d0f3a4847c546c1cc4865f5ca54a1f8fc3f9af"},
    created_at: "2023-11-15T10:40:22.288000+00:00",
    description: ``,
    extras: {"check:available": true, "check:date": "2023-11-15T10:40:27.222278+00:00", "check:headers:content-type": "text/csv", "check:status": 200, "check:timeout": false, "publish_source": "publier.etalab.studio"},
    filesize: 9167,
    filetype: "file",
    format: "csv",
    harvest: null,
    id: "e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
    last_modified: "2023-11-15T10:40:22.461000+00:00",
    latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    metrics: {views: 15000000},
    mime: "text/csv",
    preview_url: "https://explore.data.gouv.fr/?url=https%3A%2F%2Fwww.data.gouv.fr%2Ffr%2Fdatasets%2Fr%2Fe2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    schema: {name: "etalab/schema-indice-reparabilite", version: "0.1.2"},
    title: "tondeuse_batterie_fr.csv",
    type: "main",
    url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
  } satisfies Resource
};

const validataErrors = [{"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `contact_operateur` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `contact_operateur` est manquante.", "rowPositions": [0], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `nom_enseigne` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `nom_enseigne` est manquante.", "rowPositions": [1], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `id_station_itinerance` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `id_station_itinerance` est manquante.", "rowPositions": [2], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `nom_station` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `nom_station` est manquante.", "rowPositions": [3], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `implantation_station` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `implantation_station` est manquante.", "rowPositions": [4], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `adresse_station` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `adresse_station` est manquante.", "rowPositions": [5], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `coordonneesXY` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `coordonneesXY` est manquante.", "rowPositions": [6], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `id_pdc_itinerance` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `id_pdc_itinerance` est manquante.", "rowPositions": [8], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `puissance_nominale` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `puissance_nominale` est manquante.", "rowPositions": [9], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `prise_type_ef` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `prise_type_ef` est manquante.", "rowPositions": [10], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `prise_type_2` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `prise_type_2` est manquante.", "rowPositions": [11], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `prise_type_combo_ccs` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `prise_type_combo_ccs` est manquante.", "rowPositions": [12], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `prise_type_chademo` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `prise_type_chademo` est manquante.", "rowPositions": [13], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `prise_type_autre` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `prise_type_autre` est manquante.", "rowPositions": [14], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `paiement_acte` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `paiement_acte` est manquante.", "rowPositions": [15], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `condition_acces` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `condition_acces` est manquante.", "rowPositions": [16], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `reservation` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `reservation` est manquante.", "rowPositions": [17], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `horaires` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `horaires` est manquante.", "rowPositions": [18], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `accessibilite_pmr` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `accessibilite_pmr` est manquante.", "rowPositions": [19], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `restriction_gabarit` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `restriction_gabarit` est manquante.", "rowPositions": [20], "tags": ["#head", "#structure"]}, {"code": "missing-required-header", "description": "", "labels": ["n_amenageur", "n_operateur", "n_enseigne", "id_station", "n_station", "ad_station", "code_insee", "Xlongitude", "Ylatitude", "nbre_pdc", "id_pdc", "puiss_max", "type_prise", "acces_recharge", "accessibilit\u00e9", "observations", "date_maj"], "message": "La colonne obligatoire `station_deux_roues` est manquante.", "name": "Colonne obligatoire manquante", "note": "La colonne obligatoire `station_deux_roues` est manquante.", "rowPositions": [21], "tags": ["#head", "#structure"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 1, "rowPosition": 2, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 2, "rowPosition": 3, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 3, "rowPosition": 4, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 4, "rowPosition": 5, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 5, "rowPosition": 6, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 6, "rowPosition": 7, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 7, "rowPosition": 8, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 8, "rowPosition": 9, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 9, "rowPosition": 10, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 10, "rowPosition": 11, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 11, "rowPosition": 12, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 12, "rowPosition": 13, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/21", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 13, "rowPosition": 14, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 14, "rowPosition": 15, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 15, "rowPosition": 16, "tags": ["#table", "#row", "#cell"]}, {"cell": "2020/09/10", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 16, "rowPosition": 17, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/21", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 17, "rowPosition": 18, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 18, "rowPosition": 19, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 19, "rowPosition": 20, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 20, "rowPosition": 21, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 21, "rowPosition": 22, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/21", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 22, "rowPosition": 23, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/21", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 23, "rowPosition": 24, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/21", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 24, "rowPosition": 25, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 25, "rowPosition": 26, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 26, "rowPosition": 27, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 27, "rowPosition": 28, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 28, "rowPosition": 29, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 29, "rowPosition": 30, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 30, "rowPosition": 31, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 31, "rowPosition": 32, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 32, "rowPosition": 33, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 33, "rowPosition": 34, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 34, "rowPosition": 35, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 35, "rowPosition": 36, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 36, "rowPosition": 37, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 37, "rowPosition": 38, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 38, "rowPosition": 39, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 39, "rowPosition": 40, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 40, "rowPosition": 41, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 41, "rowPosition": 42, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 42, "rowPosition": 43, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/14", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 43, "rowPosition": 44, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 44, "rowPosition": 45, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 45, "rowPosition": 46, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 46, "rowPosition": 47, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 47, "rowPosition": 48, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 48, "rowPosition": 49, "tags": ["#table", "#row", "#cell"]}, {"cell": "2021/01/18", "code": "type-error", "description": "The value does not match the schema type and format for this field.", "fieldName": "date_maj", "fieldNumber": 17, "fieldPosition": 17, "message": "La date doit \u00eatre \u00e9crite sous la forme `aaaa-mm-jj`.", "name": "Format de date incorrect", "note": "type is \"date/%Y-%m-%d\"", "rowNumber": 49, "rowPosition": 50, "tags": ["#table", "#row", "#cell"]}];

export const SimpleResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args,
};

export const ResourceWithSchema: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: argsWithSchema,
};

export const ResourceWithInvalidSchema: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: { ...argsWithSchema, resource: { ...argsWithSchema.resource, extras: { ...argsWithSchema.resource.extras, ...{
    "validation-report:errors": validataErrors,
    "validation-report:nb_errors": 70,
    "validation-report:schema_name": "etalab/schema-irve-statique",
    "validation-report:schema_type": "tableschema",
    "validation-report:schema_version": "2.2.0",
    "validation-report:valid_resource": false,
    "validation-report:validation_date": "2024-02-06T05:04:59.309518+00:00",
    "validation-report:validator": "validata",
  } } } },
};


export const ResourceZip: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: { ...argsWithSchema, resource: { ...argsWithSchema.resource, format: "zip", title: "tondeuse_batterie_fr.zip",
  } },
};


export const ResourceBinary: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: { ...argsWithSchema, resource: { ...argsWithSchema.resource, format: "octet-stream", title: "tondeuse_batterie_fr.binary",
  } },
};


export const ResourceUrl: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: { ...argsWithSchema, resource: { ...argsWithSchema.resource, format: "url", title: "External documentation",
  } },
};

export const OpenedResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    expandedOnMount: true,
  },
};


export const EditableResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    canEdit: true,
  },
};


export const ResourceWithInteractions: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Expand Resource', async () => {
      await userEvent.click(canvas.getByTestId("expand-button"));
    });

    await step('Close Resource', async () => {
      await userEvent.click(canvas.getByTestId("expand-button"));
    });

    expect(canvas.getByTestId("expand-button")).toHaveAttribute("aria-expanded", "false");
  },
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    canEdit: true,
  },
};

export const ResourceWithPreview: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    resource: AvailablePreview.args.resource,
  },
};

export const AvailableResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    resource: {
      ...args.resource,
      extras: {
        'check:available': true,
      }
    },
  },
};

export const UnavailableResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    resource: {
      ...args.resource,
      extras: {
        'check:available': false,
      }
    },
  },
};

export const SimpleCommunityResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    resource: {
      ...args.resource,
      owner: null,
      organization: OrganizationStories.CertifiedPublicServiceName.args.organization,
    } as CommunityResource,
    isCommunityResource: true,
  },
};


export const EditableCommunityResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    resource: {
      ...args.resource,
      owner: null,
      organization: OrganizationStories.CertifiedPublicServiceName.args.organization,
    } as CommunityResource,
    isCommunityResource: true,
    canEdit: true,
  },
};
