<template>
  <div class="bg-alt-green-tilleul-verveine fr-p-3v fr-mb-2w" v-if="hasError">
    <p class="fr-grid-row fr-m-0">
      <span class="fr-icon-warning-line" aria-hidden="true"></span>
      {{ $t("The data structure of this file failed to load.") }}
    </p>
  </div>
  <Loader v-else-if="loading" />
  <div v-else class="fr-grid-row fr-grid-row--gutters">
    <div class="bg-alt-green-tilleul-verveine fr-p-3v fr-mb-2w" v-if="!hasColumnInfo">
      <p class="fr-grid-row fr-m-0">
        <span class="fr-icon-warning-line" aria-hidden="true"></span>
        {{ $t("No data structure found for this file.") }}
      </p>
    </div>
    <div v-if="hasColumnInfo" class="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-col-lg-3" v-for="column in columns">
      <h5 class="fr-text--sm fr-text--bold fr-mt-0 fr-mb-1v">{{column}}</h5>
      <code class="code">
        {{ columnsInfo[column].format }}
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from "../../../types/resources";
import Loader from "../Preview/Loader.vue";
import useTabularApiProfile from "../../../composables/preview/useTabularApiProfile";

const props = defineProps<{ resource: Resource }>();

const {
  loading,
  hasError,
  hasColumnInfo,
  columns,
  columnsInfo,
} = useTabularApiProfile(() => props.resource);
</script>
