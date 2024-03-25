<script setup lang="ts">
import { type DatasetV2, InformationPanel, type License, type Quality, type Resource, ResourceAccordion } from "../src";
import { ref } from "vue";

const resource = ref<Resource>({
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
    id: "e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
    last_modified: "2023-11-15T10:40:22.461000+00:00",
    latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    metrics: {views: 0},
    mime: "text/csv",
    preview_url: "https://explore.data.gouv.fr/?url=https%3A%2F%2Fwww.data.gouv.fr%2Ffr%2Fdatasets%2Fr%2Fe2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    schema: {name: "etalab/schema-indice-reparabilite", version: "0.1.2"},
    title: "tondeuse_batterie_fr.csv",
    type: "main",
    owner: { id: "someId", first_name: "john", last_name: "Doe" },
    organization: null,
    url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
  });

  const resourceWithoutSchema = ref<Resource>({
    checksum: {type: "sha1", value: "54d0f3a4847c546c1cc4865f5ca54a1f8fc3f9af"},
    created_at: "2023-11-15T10:40:22.288000+00:00",
    description: ``,
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
    owner: { id: "someId", first_name: "john", last_name: "Doe" },
    organization: null,
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
      zones: [],
      granularity: "other"
    },
    extras: {},
    created_at: "2023-10-26T13:34:50.156000+00:00",
    last_modified: "2023-12-07T16:51:02.937000+00:00",
    last_update: "2023-11-03T08:55:42.847000+00:00",
    uri: "https://demo.data.gouv.fr/api/1/datasets/donnees-changement-climatique-sqr/",
    slug: "donnees-changement-climatique-sqr",
    quality: quality,
    metrics: { discussions: 12, followers: 25, reuses: 8, views: 59 },
    title: "Données changement climatique - SQR",
    acronym: null,
    archived: null,
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    tags: null,
    license: "lov2",
    frequency: "Unknown",
    temporal_coverage: "Test",
    frequency_date: null,
    private: false,
    badges: [],
    organization: {
      id: "some_id",
      acronym: null,
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
  }
</script>

<template>
  <h1>
    data.gouv.fr Components
  </h1>
  <ResourceAccordion dataset-id="someId" :resource="resource" :expanded-on-mount="false" />
  <ResourceAccordion dataset-id="someId" :resource="resourceWithoutSchema" :expanded-on-mount="false" />
  <InformationPanel :dataset="dataset" :license="license" />
</template>
