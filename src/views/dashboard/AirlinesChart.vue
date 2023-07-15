<script setup>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

import { APEX_COLORS } from "@/utils/variables";

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
    type: "bar",
  },
  dataLabels: {
    enabled: true,
  },
  colors: APEX_COLORS,
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
  yaxis: {
    labels: {
      show: false,
    },
  },
  xaxis: {
    categories: [],
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      distributed: false,
      dataLabels: {
        position: "bottom",
      },
    },
  },
});

watch(
  () => props.data,
  () => {
    const prices = [];
    const total = [];
    const newLabel = [];

    props.data.forEach((item) => {
      prices.push(item.price);
      total.push(item.total);
      newLabel.push(item.airlines_name.replace("_", " ").toUpperCase());
    });

    chartConfig.value.xaxis.categories = newLabel;
    series.value = [
      {
        name: "Price",
        data: prices,
      },
      {
        name: "total",
        data: total,
      },
    ];
  }
);
</script>

<template>
  <div class="rounded-lg outline-slate-400 p-5">
    <div class="font-bold mb-5">Airlines</div>

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
