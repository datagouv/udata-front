<template>
  <div>
    <canvas
      ref="canvas"
      width="120"
      height="30"
    ></canvas>
    <div class="fr-grid-row justify-between">
      <p class="text-xxs fr-m-0 text-mention-grey">{{ startDate }}</p>
      <p class="text-xxs fr-m-0 text-mention-grey">{{ endDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, type ChartOptions } from 'chart.js/auto';
import { computed, onMounted, ref, useTemplateRef, watchEffect } from 'vue';
import { formatDate } from '../../helpers/index';

const LIGHT_COLOR = "#B6CFFB";
const COLOR = "#3558A2";

const props = defineProps<{
  data: Record<string, number>,
  type: "line" | "bar",
}>();

const canvas = useTemplateRef('canvas');
const context = ref<CanvasRenderingContext2D | null>(null);
const chart = ref<Chart | null>(null);
const months = computed(() => Object.keys(props.data))
const values = computed(() => Object.values(props.data))

const additionalDatasetConfig = computed(() => {
  if (props.type === 'bar') {
    return {
      barPercentage: 1,
      categoryPercentage: 0.9,
      // Change the color of the last bar only
      backgroundColor: months.value.map((_value, index) => index === months.value.length - 1 ? COLOR : LIGHT_COLOR),
    };
  }

  return {};
});

const startDate = computed(() => months.value.length ? formatDate(months.value[0], "MM/YY") : null);
const endDate = computed(() => months.value.length ? formatDate(months.value[months.value.length - 1], "MM/YY") : null);

const OPTIONS = {
  animation: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    bar: {
      backgroundColor: LIGHT_COLOR,
      borderRadius: 2,
      hoverBackgroundColor: COLOR,
    },
    line: {
      backgroundColor: COLOR,
      borderColor: COLOR,
      borderJoinStyle: "round",
      tension: 0.35,
    },
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      display: false,
      grid: { display: false },
      ticks: { display: false }
    },
    y: {
      display: false,
      grid: { display: false },
      ticks: { display: false }
    },
  },
  layout: {
    padding: {
      top: 1.5 // half border width
    }
  },
} satisfies ChartOptions

onMounted(() => {
  context.value = canvas.value ? canvas.value.getContext("2d") : null;
})

watchEffect(() => {
  if (! context.value) return;
  if (chart.value) chart.value.destroy();
  
  chart.value = new Chart(context.value, {
    data: {
      labels: months.value,
      datasets: [ { data: values.value, type: props.type, ...additionalDatasetConfig.value } ],
    },
    options: OPTIONS,
  })
})
</script>
