<script setup lang="ts">
import { Pagination, ResourceAccordion, QualityComponent, QualityComponentInline, QualityItem, QualityScore, ReadMore, Toggletip, Well } from "../src";
import { ref } from "vue";
import type { Resource } from "../src";
import type { Quality } from "../src/types/datasets";
import editIcon from "../../templates/svg/illustrations/edit.svg";

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

  const quality = ref<Quality>({
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
  });
  const id = "12";
</script>

<template>
  <h1>
    data.gouv.fr Components
  </h1>
  <ResourceAccordion dataset-id="someId" :resource="resource" :expanded-on-mount="false" />
  <ResourceAccordion dataset-id="someId" :resource="resourceWithoutSchema" :expanded-on-mount="false" />

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
  <Pagination class="fr-mt-3v" :total-results="52" @change="p => console.log(p)" />
</template>
