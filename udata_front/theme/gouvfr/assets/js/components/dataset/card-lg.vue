<template>
  <DatasetCard :dataset :style :show-metrics :dataset-url="dataset.page" />
</template>

<script setup lang="ts">
import { DatasetCard, type Dataset, type DatasetV2 } from '@datagouv/components';
import type { StyleValue } from "vue";

defineProps<{
  dataset: Dataset | DatasetV2,
  style?: StyleValue,
  showMetrics?: boolean,
}>();
</script>
