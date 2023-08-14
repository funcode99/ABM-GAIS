<script setup>
import { ref } from "vue";
import moment from "moment";
import userImg from "@/assets/3-user.png";

const props = defineProps({
  dataApproval: Array,
  currentLevel: Number,
  type: String,
});

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("dddd, MMMM Do YYYY");
  }
};

const openDoc = (path) => {
  window.open(path, "_blank");
};

let historyApproval = ref(props.dataApproval);
let level = ref(props.currentLevel);
let typeApproval = ref(props.type);

let classDone =
  "absolute flex items-center justify-center rounded-full w-8 h-8 ring-4 bg-blue";
let classWaiting =
  "absolute flex items-center justify-center rounded-full w-8 h-8 ring-0 bg-slate-200";
</script>

<template>
  <div class="container my-[30px] px-[30px]" v-if="historyApproval">
    <div class="flex" v-for="(data, index) in historyApproval" :key="data.id">
      <div class="flex flex-col items-center mr-4">
        <div>
          <div
            class="flex items-center justify-center w-10 h-10 border rounded-full"
            v-if="typeApproval == 'ATK'"
          >
            <span :class="classDone">
              <img :src="userImg" class="w-4 h-4" alt="" />
              <polyline
                fill="none"
                stroke-miterlimit="10"
                points="19,15 12,22 5,15"
              ></polyline>
            </span>
          </div>

          <div
            class="flex items-center justify-center w-10 h-10 border rounded-full"
            v-else
          >
            <span :class="index < level ? classDone : classWaiting">
              <img :src="userImg" class="w-4 h-4" alt="" />
              <polyline
                fill="none"
                stroke-miterlimit="10"
                points="19,15 12,22 5,15"
              ></polyline>
            </span>
          </div>
        </div>

        <div
          class="w-px h-full bg-gray-300"
          v-if="index != historyApproval.length - 1"
        ></div>
      </div>

      <div class="bg-blue bg-opacity-10 p-4 rounded-lg mb-5">
        <div v-if="typeApproval == 'ATK'">
          <p class="mb-2">
            <span v-if="data.code_status_doc == 9" class="font-bold"
              >Rejected By:
            </span>
            <span v-else>Approved by:</span>
            <span class="font-normal">{{ data.name_approved }}</span>
          </p>
          <p class="mb-2">
            <span v-if="data.code_status_doc == 9" class="font-bold"
              >Rejected at:
            </span>
            <span v-else>Approved at:</span>
            <span v-if="data.updated_at" class="font-normal">
              {{ format_date(data.updated_at.split(" ")[0]) }}
            </span>
            <span v-if="data.updated_at" class="ml-1 font-normal">
              {{ data.updated_at.split(" ")[1] }}
            </span>
          </p>
          <p class="text-gray-700 mt-1">
            <span class="font-bold">Notes: </span
            ><span class="font-normal">{{ data.notes }}</span>
          </p>
        </div>

        <div v-else>
          <p class="mb-2 text-lg font-bold">{{ data.text }}</p>
          <p class="text-gray-500" v-if="data.date">
            {{ format_date(data.date.split(" ")[0]) }}
          </p>
          <p class="text-gray-500" v-if="data.date">
            {{ data.date.split(" ")[1] }}
          </p>
          <p class="text-gray-700 mt-1" v-if="data.date">
            Notes: {{ data.notes }}
          </p>
          <p class="text-gray-700 mt-1" v-if="data.date">
            Attachment:
            <a @click="openDoc(data.path)" class="text-blue cursor-pointer">
              {{ data.file }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p class="text-center p-4">No Approval Log</p>
  </div>
</template>
<style></style>
