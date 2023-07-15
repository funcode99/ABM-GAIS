<script setup>
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  data: {
    type: Array,
    default: () => {},
  },
});

const series = ref();
const chartConfig = ref({
  chart: {
    type: "bar",
    height: 300,
  },
  labels: [],
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
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      distributed: true,
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
      newLabel.push(item.city_name);
    });

    chartConfig.value.labels = newLabel;
    series.value = [
      {
        data: newSeries,
      },
    ];
  }
);
</script>

<template>
  <div class="w-full rounded-lg outline-slate-400 p-5">
    <div class="font-bold mb-5">Top 5 Travel Routes</div>

    <div id="chart">
      <VueApexCharts
        type="bar"
        width="100%"
        :options="chartConfig"
        :series="series"
      ></VueApexCharts>
    </div>
  </div>
</template>
