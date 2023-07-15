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
    height: "250",
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
      newSeries.push(item.total);
      newLabel.push(item.label.replace("_", " ").toUpperCase());
    });

    chartConfig.value.labels = newLabel;
    series.value = newSeries;
  }
);
</script>

<template>
  <div class="w-full rounded-lg outline outline-slate-200 p-5 h-full">
    <div class="font-bold mb-5">Stock In vs Stock Out</div>

    <div id="chart" class="mt-0.5">
      <VueApexCharts
        type="pie"
        height="300px"
        width="100%"
        :key="data"
        :options="chartConfig"
        :series="series"
      ></VueApexCharts>
    </div>
  </div>
</template>
