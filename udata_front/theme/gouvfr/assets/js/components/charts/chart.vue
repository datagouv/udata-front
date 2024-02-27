<template>
  <canvas
    :id="id"
    width="120"
    height="30"
  ></canvas>
  <div class="fr-grid-row justify-between">
    <p class="text-xxs fr-m-0 text-mention-grey">{{ startDate }}</p>
    <p class="text-xxs fr-m-0 text-mention-grey">{{ endDate }}</p>
  </div>
</template>

<script>
import { Chart as ChartJS } from 'chart.js/auto';
import { defineComponent, onMounted } from 'vue';
import useUid from '../../composables/useUid';
import { lang } from '../../config';
import { formatDate } from '@etalab/data.gouv.fr-components';

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: /** @type {import("vue").PropType<import("chart.js").ChartType>} */(String),
      default: "bar"
    }
  },
  setup(props) {
    const { id } = useUid("bar-chart");
    const dates = Object.keys(props.data);
    const format = "MM/YY";
    const startDate = formatDate(dates.shift() || "", format);
    const endDate = formatDate(dates.pop() || "", format);
    onMounted(() => {
      const canvas = /** @type {HTMLCanvasElement | null} */(document.getElementById(id));
      const context = canvas?.getContext("2d");
      if(!context) {
        return;
      }
      const lightColor = "#B6CFFB";
      const color = "#3558A2";

      /** @type {import("chart.js").ChartDatasetCustomTypesPerDataset<typeof props.type>} */
      let config = { data: Object.values(props.data), type: props.type };

      if(props.type === "bar") {
        const barConfig =  /** @type {import("chart.js").ChartDatasetCustomTypesPerDataset<typeof props.type>} */(config);
        barConfig.barPercentage = 1;
        barConfig.categoryPercentage = 0.9;
        barConfig.backgroundColor = barConfig.data.map((value, index) => index === barConfig.data.length - 1 ? color : lightColor);
        config = barConfig;
      }

      new ChartJS(context, {
        data: {
          labels: Object.keys(props.data),
          datasets: [ config ],
        },
        /** @type {import("chart.js").ChartOptions<typeof props.type>} */
        options: {
          animation: false,
          responsive: true,
          locale: lang,
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
              backgroundColor: lightColor,
              borderRadius: 2,
              hoverBackgroundColor: color,
            },
            line: {
              backgroundColor: color,
              borderColor: color,
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
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              }
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              }
            },
          },
          layout: {
            padding: {
                top: 1.5 // half border width
            }
          },
        },
      });
    });
    return {
      id,
      startDate,
      endDate,
    };
  },
});
</script>
