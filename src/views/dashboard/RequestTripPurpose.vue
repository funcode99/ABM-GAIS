<script setup>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

import { APEX_COLORS } from "@/utils/variables";

const props = defineProps({
  data: {
    type: Object,
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
    textAnchor: "start",
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
      show: true,
    },
  },
  xaxis: {
    categories: [],
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      distributed: true,
      dataLabels: {
        position: "bottom",
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

      newLabel.push(item.type.replace("_", " ").toUpperCase());
    });

    chartConfig.value.xaxis.categories = newLabel;
    series.value = [{ data: newSeries }];
  }
);
</script>

<template>
  <div class="rounded-lg outline outline-slate-200 p-5">
    <div class="font-bold mb-5">Request Trip Purpose</div>

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
