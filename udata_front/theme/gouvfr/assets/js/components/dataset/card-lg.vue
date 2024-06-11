<template>
  <DatasetCard :dataset :style :show-metrics :dataset-url="dataset.page" />
</template>

<script setup lang="ts">
import { DatasetCard, type Dataset, type DatasetV2 } from '@etalab/data.gouv.fr-components';
import type { StyleValue } from "vue";

defineProps<{
  dataset: Dataset | DatasetV2,
  style?: StyleValue,
  showMetrics?: boolean,
}>();
</script>
