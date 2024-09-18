<template>
  <div :class="{
    'text-mention-grey': !changesThisYear && !summary,
  }">
    <h3 class="fr-text--sm fr-m-0">{{ title }}</h3>
    <div class="fr-grid-row fr-grid-row--middle">
        <p class="h1 line-height-1 fr-m-0">
            {{ summarize(summary, 2) }}
        </p>
        <div class="fr-ml-1w" v-if="changesThisYear">
          <SmallChart :type :data />
        </div>
    </div>
      <p class="fr-mt-1w fr-text--regular text-transform-none fr-badge fr-badge--no-icon fr-badge--success" v-if="lastValue && lastMonth">
          <strong class='fr-mr-1v'>
            {{ lastValue }}
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

const props = defineProps<{
  title: string;
  data: Record<string, number>,
  type: "line" | "bar",
  summary: number;
}>();

const { t } = useI18n(); 

const months = computed(() => Object.keys(props.data));
const values = computed(() => Object.values(props.data));
const lastValue = computed(() => values.value[values.value.length - 1])
const lastMonth = computed(() => months.value[months.value.length - 1])

const changesThisYear = computed(() => Math.max(...values.value) > 0);
</script>
