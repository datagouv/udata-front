<script setup lang="ts">
import { DatasetCard, type DatasetV2, DataserviceCard, type Dataservice, InformationPanel, type License, Pagination, type Quality, QualityComponent, QualityComponentInline, QualityItem, QualityScore, ReadMore, type Reuse, ReuseCard, type Resource, ResourceAccordion, Toggletip, Well } from "../src";
import { ref } from "vue";
import editIcon from "../../templates/svg/illustrations/edit.svg";

const resource = ref<Resource>({
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
  schema: {name: "etalab/schema-indice-reparabilite", version: "0.1.2"},
  internal: {
    "created_at_internal": "2022-07-13T02:11:56.414000+00:00",
    "last_modified_internal": "2024-01-09T06:59:37.726000+00:00"
  },
});

const resourceWithoutSchema = ref<Resource>({
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

  "Smartypants, double quotes" and 'single quotes'`,
  extras: {"check:available": true, "check:date": "2023-11-15T10:40:27.222278+00:00", "check:headers:content-type": "text/csv", "check:status": 200, "check:timeout": false, "publish_source": "publier.etalab.studio"},
  filesize: 9167,
  filetype: "file",
  format: "csv",
  harvest: null,
  id: "e2sdfsfdfsdfbc9b7c-4598-4bdb-92c3-9109a16f288c",
  internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
  last_modified: "2023-11-15T10:40:22.461000+00:00",
  latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
  metrics: {views: 0},
  mime: "text/csv",
  preview_url: "https://explore.data.gouv.fr/?url=https%3A%2F%2Fwww.data.gouv.fr%2Ffr%2Fdatasets%2Fr%2Fe2bc9b7c-4598-4bdb-92c3-9109a16f288c",
  schema: null,
  title: "tondeuse_batterie_fr.csv",
  type: "main",
  url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
});

const quality : Quality = {
  all_resources_available: false,
  dataset_description_quality: false,
  has_open_format: true,
  has_resources: false,
  license: false,
  resources_documentation: true,
  score: 0.9,
  spatial: false,
  temporal_coverage: false,
  update_frequency: false,
  update_fulfilled_in_time: false,
};

const dataset : DatasetV2 = {
  id: "653a6afa18f9f98d2ffdadee",
  page: "https://demo.data.gouv.fr/fr/datasets/donnees-changement-climatique-sqr/",
  resources: {
    rel: "subsection",
    href: "https://demo.data.gouv.fr/api/1/datasets/community_resources/?dataset=653a6afa18f9f98d2ffdadee&page=1&page_size=50",
    total: 12,
    type: "GET"
  },
  community_resources: {
    rel: "subsection",
    href: "https://demo.data.gouv.fr/api/2/datasets/653a6afa18f9f98d2ffdadee/resources/?page=1&page_size=50",
    total: 0,
    type: "GET"
  },
  harvest: {
    backend: "OpenDataSoft",
    modified_at: "2023-10-22T23:07:04.601000+00:00",
    source_id: "5cd454758b4c4139d85b64f2",
    remote_id: "prix-carburants-fichier-instantane-test-ods-copie",
    domain: "data.economie.gouv.fr",
    last_update: "2023-10-23T00:11:46.796000+00:00",
    remote_url: "https://data.economie.gouv.fr/explore/dataset/prix-carburants-fichier-instantane-test-ods-copie/",
    archived_at: "2023-10-31T00:24:10.854000+00:00",
    archived: "not-on-remote",
    ods_url: "https://data.economie.gouv.fr/explore/dataset/prix-carburants-fichier-instantane-test-ods-copie/",
    ods_references: "https://donnees.roulez-eco.fr/opendata/instantane",
    ods_has_records: true,
    ods_geo: true
  },
  spatial: {
    zones: [
      'country:fr'
    ],
    granularity: "other"
  },
  extras: {
    "analysis:checksum": "0e367f91ba1f8b82db36c919185948dcc4cc7c1f",
    "analysis:content-length": 639100,
    "analysis:last-modified-at": "2024-03-25T08:35:45+00:00",
    "analysis:last-modified-detection": "last-modified-header",
    "analysis:mime-type": "text/plain",
    "analysis:parsing:finished_at": "2024-03-25T09:16:13.598201+00:00",
    "analysis:parsing:started_at": "2024-03-25T09:16:08.602954+00:00",
    "check:available": true,
    "check:date": "2024-03-25T08:37:11.016079+00:00",
    "check:headers:content-type": "text/csv",
    "check:status": 200,
    "check:timeout": false
  },
  created_at: "2023-10-26T13:34:50.156000+00:00",
  last_modified: "2023-12-07T16:51:02.937000+00:00",
  last_update: "2023-11-03T08:55:42.847000+00:00",
  uri: "https://demo.data.gouv.fr/api/1/datasets/donnees-changement-climatique-sqr/",
  slug: "donnees-changement-climatique-sqr",
  quality: quality,
  metrics: { discussions: 12, followers: 25, reuses: 8, views: 59, resources_downloads:	18705 },
  title: "Données changement climatique - SQR",
  acronym: "DCC",
  archived: false,
  description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  tags: null,
  license: "lov2",
  frequency: "Unknown",
  temporal_coverage: "Test",
  frequency_date: null,
  private: false,
  badges: [],
  owner: null,
  organization: {
    id: "some_id",
    acronym: null,
    business_number_id: null,
    description: "",
    url: "",
    created_at: "2023-10-26T13:34:50.156000+00:00",
    last_modified: "2023-12-07T16:51:02.937000+00:00",
    last_update: "2023-12-07T16:51:02.937000+00:00",
    deleted: null,
    members: [],
    metrics: {
      datasets: 3,
      followers: 4,
      members: 0,
      reuses: 1,
      views: 2,
    },
    logo: "https://demo-static.data.gouv.fr/avatars/a2/b135634de04fb8a76c8ec3100e5e4b.png",
    logo_thumbnail:"https://demo-static.data.gouv.fr/avatars/a2/b135634de04fb8a76c8ec3100e5e4b-100.png",
    page: "https://demo.data.gouv.fr/fr/organizations/test-meteo-france/",
    badges: [],
    name: "[TEST] Météo France",
    slug: "test-meteo-france",
    uri: "https://demo.data.gouv.fr/api/1/organizations/test-meteo-france/"
  }
};

const license : License = {
  title: "Licence Ouverte",
  url: "https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf",
  alternate_titles: [],
  alternate_urls: [],
  flags: [
    "okd_compliant",
    "domain_content"
  ],
  id: "cc-by",
  maintainer: null,
};

const reuse : Reuse = {
  id: "someId",
  description: "Some description",
  created_at: (new Date()).toDateString(),
  last_update: (new Date()).toDateString(),
  page: "https://www.data.gouv.fr",
  url: "https://www.data.gouv.fr",
  archived: false,
  deleted: false,
  private: true,
  datasets: [],
  slug: "some-slug",
  topic: "housing_and_development",
  type: "application",
  tags: [],
  owner: {
    id: "someUserId",
    first_name: "First",
    last_name: "Last",
    page: "https://demo.data.gouv.fr/en/users/antonin-garrone/",
  },
  metrics: {
    datasets: 3,
    discussions: 7,
    followers: 12,
    views: 36
  },
  organization: null,
  title: "My new reuse",
  image: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
  image_thumbnail: "https://static.data.gouv.fr/images/aa/c1f583251a4697850bd01e2cc95877.png",
}

const dataservice: Dataservice = {
  acronym: "API",
  archived_at: null,
  authorization_request_url: null,
  availability: 99.9,
  base_api_url: null,
  contact_point: {
    email: "",
    id: "someId",
    name: "Contact",
    organization: null,
    owner: "John Doe",
  },
  created_at: (new Date()).toDateString(),
  datasets: [
    {
      class: "",
      id: "someId2",
      acronym: "",
      page: "",
      title: "",
      uri: "",
    }
  ],
  deleted_at: null,
  description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  endpoint_description_url: null,
  extras: {},
  format: "json",
  harvest: {},
  has_token: false,
  id: "653a6afa18f9f98d2ffdadee",
  is_restricted: false,
  license: "lov2",
  metadata_modified_at: (new Date()).toDateString(),
  metrics: { discussions: 12, followers: 25, reuses: 8, views: 59 },
  organization: {
    id: "some_id",
    created_at: "",
    last_modified: "",
    last_update: "",
    deleted: null,
    members: [],
    metrics: {
      datasets: 0,
      followers: 0,
      members: 0,
      reuses: 0,
      views: 0
    },
    acronym: null,
    logo: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
    logo_thumbnail: "https://static.data.gouv.fr/avatars/09/1ba932cbfa48dc8c158981de6c700a-100.jpeg",
    page: "https://demo.data.gouv.fr/fr/organizations/test-meteo-france/",
    business_number_id: "",
    description: "",
    badges: [{kind: 'certified'}, {kind: 'public-service'}],
    name: "Météo France",
    slug: "test-meteo-france",
    uri: "https://demo.data.gouv.fr/api/1/organizations/test-meteo-france/",
    url: ""
  },
  owner: null,
  private: false,
  rate_limiting: "",
  self_api_url: "",
  self_web_url: "",
  slug: "",
  tags: [],
  title: "That Awesome API",
};
</script>

<template>
  <h1>
    data.gouv.fr Components
  </h1>
  <div>
    <ResourceAccordion dataset-id="someId" :resource="resource" :expanded-on-mount="false" class="fr-mb-2v" />
    <ResourceAccordion dataset-id="someId" :resource="resource" :expanded-on-mount="false" class="fr-mb-2v" />
    <ResourceAccordion dataset-id="someId" :resource="resourceWithoutSchema" :expanded-on-mount="false" />
  </div>
  <InformationPanel :dataset="dataset" :license="license" />
  <QualityScore :score="0.5" class="w-100"></QualityScore>
  <QualityItem :passed="true" message-passed="Oui" message-failed="Non"></QualityItem>
  <Toggletip>
    Toggle
    <template #toggletip>
      <h5 class="fr-text--sm fr-my-0">
      {{$t("Metadata quality:")}}
      </h5>
      <QualityItem :passed="true" message-passed="Oui" message-failed="Non"></QualityItem>
    </template>
  </Toggletip>
  <QualityComponent
    :quality="quality"
  ></QualityComponent>
  <QualityComponentInline
    :quality="quality"
  ></QualityComponentInline>
  <ReadMore>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet, justo vitae facilisis lobortis, turpis velit suscipit urna, vel rutrum arcu lacus vitae felis. Proin ac orci et tellus auctor sodales. Cras eleifend a lacus tempor tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer mi urna, tempor vel feugiat eget, aliquet quis eros. Sed nisi tortor, fringilla vitae orci vel, faucibus imperdiet mauris. Maecenas nunc eros, dapibus vitae orci ut, semper ultricies sem.

    Pellentesque nulla ex, condimentum quis urna quis, ultrices vehicula risus. Duis facilisis nisl massa, et consequat nisi tristique ultricies. Praesent aliquam bibendum urna, non fermentum augue tempor ac. Sed tincidunt nibh sapien, a posuere risus mollis sit amet. Cras lorem massa, fringilla pulvinar dapibus ac, pharetra eu enim. Nam arcu ante, consequat vitae ultricies non, posuere vitae quam. Etiam imperdiet, ligula non venenatis suscipit, dolor leo mattis quam, dignissim sodales tortor felis vitae turpis. Ut sed congue tellus, fringilla scelerisque leo. Fusce viverra varius convallis. Aliquam faucibus odio nunc, malesuada gravida sem gravida sed. Vivamus sollicitudin dolor euismod libero aliquam, at cursus sapien auctor.

    Pellentesque nulla ex, condimentum quis urna quis, ultrices vehicula risus. Duis facilisis nisl massa, et consequat nisi tristique ultricies. Praesent aliquam bibendum urna, non fermentum augue tempor ac. Sed tincidunt nibh sapien, a posuere risus mollis sit amet. Cras lorem massa, fringilla pulvinar dapibus ac, pharetra eu enim. Nam arcu ante, consequat vitae ultricies non, posuere vitae quam. Etiam imperdiet, ligula non venenatis suscipit, dolor leo mattis quam, dignissim sodales tortor felis vitae turpis. Ut sed congue tellus, fringilla scelerisque leo. Fusce viverra varius convallis. Aliquam faucibus odio nunc, malesuada gravida sem gravida sed. Vivamus sollicitudin dolor euismod libero aliquam, at cursus sapien auctor.</p>
  </ReadMore>
  <Well color="blue-cumulus" weight="regular" class="fr-my-2w">
    <div class="fr-grid-row">
      <div class="fr-col-auto fr-mr-3v">
        <img :src="editIcon" alt="" />
      </div>
      <div class="fr-col">
        <p class="fr-m-0 fr-text--bold">What is a dataset?</p>
        <p class="fr-m-0 fr-text--xs">On udata-front, a dataset is a set of files.</p>
      </div>
    </div>
  </Well>
  <Well class="fr-my-2w">
    Simple Well
  </Well>
  <div>
    <DatasetCard
      :dataset="dataset"
      dataset-url="/datasets/6571faa17f46a65ee05c4d17"
      organization-url=""
    />
    <DatasetCard
      :dataset="dataset"
      dataset-url="/datasets/6571faa17f46a65ee05c4d17"
      organization-url="/organizations/another-url-easier-to-distinguish"
    />
    <DatasetCard
      :dataset="dataset"
      dataset-url="/datasets/6571faa17f46a65ee05c4d17"
      organization-url=""
    />
    <DatasetCard
      :dataset="dataset"
      dataset-url="/datasets/6571faa17f46a65ee05c4d17"
      organization-url=""
    />
  </div>
  <div class="fr-grid-row">
    <ReuseCard
      class="fr-col-4"
      :reuse="reuse"
      reuse-url="/datasets/6571faa17f46a65ee05c4d17"
    />
    <ReuseCard
      class="fr-col-4"
      :reuse="reuse"
      reuse-url="/datasets/6571faa17f46a65ee05c4d17"
    />
    <ReuseCard
      class="fr-col-4"
      :reuse="reuse"
      reuse-url="/datasets/6571faa17f46a65ee05c4d17"
    />
  </div>
  <div>
    <DataserviceCard
      :dataservice="dataservice"
      dataservice-url="/dataservices/6571faa17f46a65ee05c4d17"
      :show-description="false"
    />
    <DataserviceCard
      :dataservice="dataservice"
      dataservice-url="/dataservices/6571faa17f46a65ee05c4d17"
      organization-url="/organizations/another-url-easier-to-distinguish"
      :show-description="false"
    />
    <DataserviceCard
      :dataservice="dataservice"
      dataservice-url="/dataservices/6571faa17f46a65ee05c4d17"
    />
    <DataserviceCard
      :dataservice="dataservice"
      dataservice-url="/dataservices/6571faa17f46a65ee05c4d17"
      organization-url="/organizations/another-url-easier-to-distinguish"
    />
  </div>
  <Pagination class="fr-mt-3v" :total-results="52" @change="p => console.log(p)" />
</template>
