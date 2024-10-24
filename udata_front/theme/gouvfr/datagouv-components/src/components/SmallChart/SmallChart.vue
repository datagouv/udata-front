<template>
  <div>
    <canvas
      ref="canvasRef"
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
const COLOR_WITH_OPACITY = 'rgba(53, 88, 162, 0.7)'
const LIGHT_COLOR_WITH_OPACITY = 'rgba(182, 207, 251, 0.7)'

const props = withDefaults(defineProps<{
  data: Record<string, number>,
  type: "line" | "bar",
  lastWithLowEmphasis?: boolean;
}>(), {
  lastWithLowEmphasis: false,
});

const last = (ctx, value) => {
  return ctx.p1DataIndex === months.value.length - 1 ? value : null
};

const canvas = useTemplateRef('canvasRef');
const context = ref<CanvasRenderingContext2D | null>(null);
const chart = ref<Chart | null>(null);

const data = computed(() => {
  const months = Object.keys(props.data);
  months.sort();
  let orderedData: Record<string, number> = {};
  for (const month of months) {
    orderedData[month] = props.data[month];
  }
  return orderedData;
});
const months = computed(() => Object.keys(data.value))
const values = computed(() => Object.values(data.value))

const additionalDatasetConfig = computed(() => {
  if (props.type === 'bar') {
    return {
      barPercentage: 1,
      categoryPercentage: 0.9,
      // Change the color of the last bar only
      backgroundColor: months.value.map((_value, index) => index === months.value.length - 1 ? (props.lastWithLowEmphasis ? LIGHT_COLOR_WITH_OPACITY : COLOR) : LIGHT_COLOR),
    };
  }

  if (props.type === 'line' && props.lastWithLowEmphasis) {
    return {
      segment: {
        borderColor: ctx => last(ctx, COLOR_WITH_OPACITY) || COLOR,
        borderDash: ctx => last(ctx, [3, 3]) || [6, 0],
      },
    }
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
