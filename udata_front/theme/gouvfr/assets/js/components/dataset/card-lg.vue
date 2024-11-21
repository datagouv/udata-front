<template>
  <DatasetCard
    :dataset
    :style
    :showDescription
    :dataset-url="dataset.page"
    :organization-url="dataset.organization?.page"
  />
</template>

<script setup lang="ts">
import { DatasetCard, type Dataset, type DatasetV2 } from '@datagouv/components/ts';
import type { StyleValue } from "vue";

withDefaults(defineProps<{
  dataset: Dataset | DatasetV2,
  style?: StyleValue,
  showDescription?: boolean,
}>(), {
  showDescription: true,
});
</script>
