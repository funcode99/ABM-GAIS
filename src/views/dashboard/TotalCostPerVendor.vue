<script setup>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

import { numberFilter } from "@/utils/filters.js";

const props = defineProps({
  data: {
    type: Array,
    default: () => {},
  },
});

const series = ref([]);
const chartConfig = ref({
  chart: {
    width: "100%",
    height: 300,
    type: "pie",
    toolbar: {
      show: true,
    },
  },
  labels: [],
  legend: {
    position: "bottom",
  },
  tooltip: {
    y: {
      formatter: function (value, series) {
        return numberFilter(value);
      },
    },
  },
});

watch(
  () => props.data,
  () => {
    const newSeries = [];
    const newLabel = [];

    props.data.forEach((item) => {
      newSeries.push(item.cost);
      newLabel.push(item.vendor);
    });

    chartConfig.value.labels = newLabel;
    series.value = newSeries;
  }
);
</script>

<template>
  <div class="w-full rounded-lg outline-slate-400 p-5">
    <div class="font-bold mb-5">Top Cost per Vendor</div>

    <div id="chart">
      <VueApexCharts
        type="pie"
        width="100%"
        :key="data"
        :options="chartConfig"
        :series="series"
      ></VueApexCharts>
    </div>
  </div>
</template>
