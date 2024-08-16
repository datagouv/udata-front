<template>
  <p v-bind="$attrs" :aria-describedby="id" ref="contentRef">
    <QualityScore :score="dataset.quality.score" />
  </p>
  <div class="fr-tooltip fr-placement" :id="id" role="tooltip" aria-hidden="true">
    <QualityScoreTooltipContent :dataset="dataset" />
  </div>
</template>
<script setup lang="ts">
import type { Dataset, DatasetV2 } from '@datagouv/components';
import { getRandomId, QualityScore } from '@datagouv/components';
import QualityScoreTooltipContent from '../QualityScoreTooltipContent/QualityScoreTooltipContent.vue';

defineProps<{
  dataset: Dataset | DatasetV2;
}>();

defineOptions({
  inheritAttrs: false,
});

const id = getRandomId("tooltip");
</script>
