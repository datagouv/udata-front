<template>
  <DatasetCard
    :dataset
    :style
    :show-metrics="showMetrics"
    :dataset-url="dataset.page"
    :organization-url="dataset.organization?.page"
  />
</template>

<script setup lang="ts">
import { DatasetCard, type Dataset, type DatasetV2 } from '@etalab/data.gouv.fr-components';
import type { StyleValue } from "vue";

withDefaults(defineProps<{
  dataset: Dataset | DatasetV2,
  style?: StyleValue,
  showMetrics?: boolean,
}>(), {
  showMetrics: true,
});


</script>
