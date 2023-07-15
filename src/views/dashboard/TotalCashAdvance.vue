<script setup>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

import { numberFilter } from "@/utils/filters.js";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const series = ref([
  {
    data: [],
  },
]);

const chartConfig = ref({
  chart: {
    type: "bar",
    height: "100%",
  },
  dataLabels: {
    enabled: true,
    formatter: function (value, series) {
      return numberFilter(value);
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      distributed: true,
    },
  },
  xaxis: {
    categories: [],
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
      formatter: function (value, series) {
        return numberFilter(value);
      },
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
      newLabel.push(item.type.replace("_", " ").toUpperCase());
    });

    chartConfig.value.xaxis.categories = newLabel;
    series.value = [
      {
        data: newSeries,
      },
    ];
  }
);
</script>

<template>
  <div class="w-full rounded-lg outline outline-slate-200 p-5">
    <div class="font-bold mb-5">Total Cash Advance</div>

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
