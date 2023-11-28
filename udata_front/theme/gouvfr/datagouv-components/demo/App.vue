<script setup lang="ts">
import { ResourceAccordion } from "../src";
import { ref } from "vue";
import type { Resource } from "../src";

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
    schema: {},
    title: "tondeuse_batterie_fr.csv",
    type: "main",
    owner: { id: "someId", first_name: "john", last_name: "Doe" },
    organization: null,
    url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
  });
</script>

<template>
  <h1>
    data.gouv.fr Components
  </h1>
  <ResourceAccordion dataset-id="someId" :resource="resource" :expanded-on-mount="false" />
  <ResourceAccordion dataset-id="someId" :resource="resourceWithoutSchema" :expanded-on-mount="false" />

  <div class="fr-tabs">
    <ul class="fr-tabs__list" role="tablist" aria-label="[A modifier | nom du système d'onglet]">
        <li role="presentation">
            <button id="tabpanel-404" class="fr-tabs__tab fr-icon-checkbox-line fr-tabs__tab--icon-left" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-404-panel">Label Tab 1</button>
        </li>
        <li role="presentation">
            <button id="tabpanel-405" class="fr-tabs__tab fr-icon-checkbox-line fr-tabs__tab--icon-left" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-405-panel">Label Tab 2</button>
        </li>
        <li role="presentation">
            <button id="tabpanel-406" class="fr-tabs__tab fr-icon-checkbox-line fr-tabs__tab--icon-left" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-406-panel">Label Tab 2</button>
        </li>
    </ul>
    <div id="tabpanel-404-panel" class="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="tabpanel-404" tabindex="0">
        <!-- données de test -->
        <ResourceAccordion dataset-id="someId" :resource="resourceWithoutSchema" :expanded-on-mount="false" />
        <ResourceAccordion dataset-id="someId" :resource="resourceWithoutSchema" :expanded-on-mount="false" />
    </div>
    <div id="tabpanel-405-panel" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-405" tabindex="0">
        <!-- données de test -->
        <p>Contenu 2</p>
    </div>
    <div id="tabpanel-406-panel" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-406" tabindex="0">
        <!-- données de test -->
        <p>Contenu 3</p>
    </div>
</div>
</template>
