<script setup>
import { ref, watch } from "vue";

import declineIcon from "@/assets/dashboard/decline.svg";
import plusIcon from "@/assets/dashboard/plus.svg";
import timeIcon from "@/assets/dashboard/time.svg";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const widgetData = ref({
  Approved: {
    icon: plusIcon,
    value: 107,
    color: "green",
    textColor: "white",
  },
  Waiting: {
    icon: timeIcon,
    value: 107,
    color: "yellow-400",
    textColor: "black",
  },
  Rejected: {
    icon: declineIcon,
    value: 107,
    color: "red",
    textColor: "white",
  },
});

watch(
  () => props.data,
  () => {
    widgetData.value.Approved.value = props.data[0].total;
    widgetData.value.Waiting.value = props.data[1].total;
    widgetData.value.Rejected.value = props.data[2].total;
  }
);
</script>

<template>
  <div class="w-full p-5">
    <div class="font-bold mb-5">Trip Status</div>
    <div class="grid gap-4 grid-cols-3">
      <div
        v-for="(item, key) in widgetData"
        :class="`bg-${item.color}`"
        class="w-full h-[100px] rounded-lg p-3 flex flex-wrap align-middle justify-space-between content-center"
      >
        <div class="basis-1/2 grid place-content-center">
          <div class="rounded-lg h-[60px] w-[60px] flex align-middle">
            <img :src="item.icon" :class="`stroke-${item.textColor}`" alt="" />
          </div>
        </div>
        <div class="basis-1/2 content-center">
          <div
            class="text-lg mb-2 font-semibold"
            :class="`text-${item.textColor}`"
          >
            {{ key }}
          </div>
          <div class="text-3xl font-bold" :class="`text-${item.textColor}`">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
