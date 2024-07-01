import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/vue3';
import Preview from '.';
import Loader from './Loader.vue';
import { Resource } from '../../../types/resources';

const meta = {
  title: "Components/Resource/Internals/Preview",
  component: Preview,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Preview shows a smaller version of explore.data.gouv.fr to the user."
      }
    }
  },
  decorators: [withActions],
} satisfies Meta<typeof Preview>;

export default meta;

const resource: Resource = {
  id: "cf3cc17f-955a-42bb-a4ef-77f59e703940",
  title: "bornes-de-recharge-de-vehicules-electriques-irve-copie.csv",
  description: "Liste des points de charge pour véhicules électriques (csv)",
  filetype: "remote",
  type: "main",
  format: "csv",
  url: "https://www.opendata56.fr/api/explore/v2.1/catalog/datasets/bornes-de-recharge-de-vehicules-electriques-irve-copie/exports/csv",
  latest: "https://www.data.gouv.fr/fr/datasets/r/cf3cc17f-955a-42bb-a4ef-77f59e703940",
  checksum: null,
  filesize: null,
  mime: "text/csv",
  created_at: "2024-06-16T22:00:27+00:00",
  last_modified: "2024-06-16T22:00:27+00:00",
  metrics: {
    views: 441
  },
  harvest: {
    "created_at": "2024-06-16T22:00:27+00:00",
    "modified_at": "2024-06-16T22:00:27+00:00",
    "uri": "https://www.opendata56.fr/api/explore/v2.1/catalog/datasets/bornes-de-recharge-de-vehicules-electriques-irve-copie/exports/csv"
  },
  extras: {
    "analysis:checksum": "00e7c63bf3c6046872ce74d93e14f16065e6aca1",
    "analysis:content-length": 177619,
    "analysis:last-modified-at": "2023-05-28T22:00:10+00:00",
    "analysis:last-modified-detection": "harvest-resource-metadata",
    "analysis:mime-type": "text/plain",
    "check:available": true,
    "check:date": "2024-01-17T11:22:01.043778+00:00",
    "check:headers:content-type": "text/csv",
    "check:status": 200,
    "check:timeout": false,
    "validation-report:errors": [
      {
        "code": "missing-required-header",
        "description": "",
        "labels": [
          "nom_amenageur",
          "siren_amenageur",
          "contact_amenageur",
          "nom_operateur",
          "contact_operateur",
          "telephone_operateur",
          "nom_enseigne",
          "id_station_itinerance",
          "id_station_local",
          "nom_station",
          "implantation_station",
          "adresse_station",
          "code_insee_commune",
          "coordonneesxy",
          "nbre_pdc",
          "id_pdc_itinerance",
          "id_pdc_local",
          "puissance_nominale",
          "prise_type_ef",
          "prise_type_2",
          "prise_type_combo_ccs",
          "prise_type_chademo",
          "prise_type_autre",
          "gratuit",
          "paiement_acte",
          "paiement_cb",
          "paiement_autre",
          "tarification",
          "condition_acces",
          "reservation",
          "horaires",
          "accessibilite_pmr",
          "restriction_gabarit",
          "station_deux_roues",
          "raccordement",
          "num_pdl",
          "date_mise_en_service",
          "observations",
          "date_maj",
          "cable_t2_attache"
        ],
        "message": "La colonne obligatoire `coordonneesXY` est manquante.",
        "name": "Colonne obligatoire manquante",
        "note": "La colonne obligatoire `coordonneesXY` est manquante.",
        "rowPositions": [
          6
        ],
        "tags": [
          "#head",
          "#structure"
        ]
      }
    ],
    "validation-report:nb_errors": 1,
    "validation-report:schema_name": "etalab/schema-irve-statique",
    "validation-report:schema_type": "tableschema",
    "validation-report:schema_version": "2.2.0",
    "validation-report:valid_resource": false,
    "validation-report:validation_date": "2024-01-09T05:06:32.422371+00:00",
    "validation-report:validator": "validata",
    "analysis:parsing:finished_at": "2024-06-04T20:05:18.968805+00:00",
    "analysis:parsing:started_at": "2024-06-04T20:05:17.151069+00:00"
  },
  preview_url: "https://explore.data.gouv.fr/fr/resources/cf3cc17f-955a-42bb-a4ef-77f59e703940",
  "schema": {
    "name": null,
    "version": null,
    "url": null
  },
  internal: {
    "created_at_internal": "2022-07-13T02:11:56.414000+00:00",
    "last_modified_internal": "2024-01-09T06:59:37.726000+00:00"
  },
}

export const AvailablePreview: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Preview },
    setup() {
      return { args };
    },
    template: '<Preview v-bind="args" />',
  }),
  args: {
    resource,
  }
};

export const LoadingPreview: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Loader },
    setup() {
      return { args };
    },
    template: '<Loader />',
  }),
  args: {
    resource,
  }
};

export const UnavailablePreview: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Preview },
    setup() {
      return { args };
    },
    template: '<Preview v-bind="args" />',
  }),
  args: {
    resource: {
      ...resource,
      id: "someId",
    },
  }
};
