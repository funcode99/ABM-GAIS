<script setup>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const series = ref([
  {
    label: "Total Trips",
    data: [],
  },
]);
const chartConfig = ref({
  chart: {
    type: "bar",
    height: "100%",
  },
  labels: ["Total Trip"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },

  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return "";
        },
      },
    },
  },
});

watch(
  () => props.data,
  () => {
    series.value = [
      {
        data: [props?.data?.total || 0],
      },
    ];
  }
);
</script>

<template>
  <div class="w-full rounded-lg outline-slate-400 p-5">
    <div class="font-bold mb-5">Total Trip</div>

    <div id="chart">
      <VueApexCharts
        type="bar"
        width="100%"
        :key="data"
        :options="chartConfig"
        :series="series"
      ></VueApexCharts>
    </div>
  </div>
</template>
