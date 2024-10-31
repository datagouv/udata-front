<template>
  <div :class="{
    'text-mention-grey': !changesThisYear && !summary,
  }">
    <h3 class="fr-text--sm fr-m-0">{{ title }}</h3>
    <div class="fr-grid-row fr-grid-row--middle">
        <ContentLoader
          :width="92"
          :height="32"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          v-if="summary === null"
        >
          <rect x="0" y="0" rx="3" ry="3" width="92" height="32" />
        </ContentLoader>
        <p class="h1 line-height-1 fr-m-0" v-else>
            {{ summarize(summary, 2) }}
        </p>
        <ContentLoader
          :width="120"
          :height="30"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          v-if="data === null"
          class="fr-ml-1w"
        >
          <rect x="0" y="0" rx="3" ry="3" width="120" height="30" />
        </ContentLoader>
        <div class="fr-ml-1w" v-else-if="changesThisYear">
          <SmallChart :type :data :lastWithLowEmphasis="true" />
        </div>
    </div>
      <p class="fr-mt-1w fr-text--regular text-transform-none fr-badge fr-badge--no-icon fr-badge--success" v-if="lastValue && lastMonth">
          <strong class='fr-mr-1v'>
            + {{ summarize(lastValue, 2) }}
          </strong>
          {{ t(" in ") }}
          {{ formatDate(lastMonth, 'MMM YYYY') }}
      </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SmallChart from '../SmallChart/SmallChart.vue';
import { useI18n } from 'vue-i18n';
import { summarize, formatDate } from '../../helpers';
import { ContentLoader } from 'vue-content-loader';

const props = defineProps<{
  title: string;
  data: Record<string, number> | null,
  type: "line" | "bar",
  summary: number | null;
}>();

const { t } = useI18n();

const months = computed(() => props.data ? Object.keys(props.data) : []);
const values = computed(() => props.data ? Object.values(props.data) : []);
const lastMonth = computed(() => months.value.length ? months.value.reduce((max, c) => c > max ? c : max) : null)
const lastMonthIndex = computed(() => lastMonth.value ? months.value.indexOf(lastMonth.value) : null)
const lastValue = computed(() => lastMonthIndex.value !== null ? values.value[lastMonthIndex.value] : null)

const changesThisYear = computed(() => Math.max(...values.value) > 0);
</script>
