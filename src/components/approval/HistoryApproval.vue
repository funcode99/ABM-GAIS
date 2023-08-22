<script setup>
import { ref } from "vue"
import moment from "moment"
import userImg from "@/assets/3-user.png"

const props = defineProps({
  dataApproval: Array,
  currentLevel: Number,
  type: String,
})

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("dddd, MMMM Do YYYY")
  }
}

const openDoc = (path) => {
  window.open(path, "_blank")
}

let historyApproval = ref(props.dataApproval)
let level = ref(props.currentLevel)
let typeApproval = ref(props.type)

let classDone =
  "absolute flex items-center justify-center rounded-full w-8 h-8 ring-4 bg-blue"
let classWaiting =
  "absolute flex items-center justify-center rounded-full w-8 h-8 ring-0 bg-slate-200"
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

      <div class="bg-blue bg-opacity-10 p-4 rounded-lg mb-5 w-full">
        <div v-if="typeApproval == 'ATK'">
          <div>
            <div class="mb-2">
              <div v-if="data?.name_rejected" class="font-bold">
                <span>Rejected By:</span>
                <span class="font-normal">{{ data.name_delivered }}</span>
              </div>

              <div v-if="data?.name_delivered" class="font-bold">
                <span>Delivered By:</span>
                <span class="font-normal">{{ data.name_delivered }}</span>
              </div>

              <div v-if="data?.name_approved">
                <span>Approved by: </span>
                <span class="font-normal">{{ data.name_approved }}</span>
              </div>
            </div>
            <div class="mb-2">
              <div v-if="data?.rejected_at">
                <span>Rejected at: </span>
                <span v-if="data.rejected_at" class="font-normal">
                  {{ format_date(data.rejected_at.split(" ")[0]) }}
                </span>
                <span v-if="data.rejected_at" class="ml-1 font-normal">
                  {{ data.rejected_at.split(" ")[1] }}
                </span>
              </div>

              <div v-if="data?.delivered_at">
                <span>Delivered at: </span>
                <span v-if="data.delivered_at" class="font-normal">
                  {{ format_date(data.delivered_at.split(" ")[0]) }}
                </span>
                <span v-if="data.delivered_at" class="ml-1 font-normal">
                  {{ data.delivered_at.split(" ")[1] }}
                </span>
              </div>
              <!-- <span v-if="data.code_status_doc == 9" class="font-bold"
                >Rejected at:
              </span> -->
              <div v-if="data?.approved_at">
                <span>Approved at: </span>
                <span v-if="data.approved_at" class="font-normal">
                  {{ format_date(data.approved_at.split(" ")[0]) }}
                </span>
                <span v-if="data.approved_at" class="ml-1 font-normal">
                  {{ data.approved_at.split(" ")[1] }}
                </span>
              </div>
            </div>
            <div class="text-gray-700 mt-1">
              <div v-if="data?.notes_rejected">
                <div class="font-bold">Notes Rejected:</div>
                <div style="white-space: pre" class="font-normal">
                  {{ data.notes_rejected }}
                </div>
              </div>

              <div v-if="data?.notes_delivered">
                <div class="font-bold">Notes Delivery:</div>
                <div style="white-space: pre" class="font-normal">
                  {{ data.notes_delivered }}
                </div>
              </div>

              <div v-if="data?.notes">
                <div class="font-bold">Notes:</div>
                <div style="white-space: pre" class="font-normal">
                  {{ data.notes }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="mb-2 text-lg font-bold">{{ data.text }}</p>
          <p class="text-gray-500" v-if="data.date">
            {{ format_date(data.date.split(" ")[0]) }}
          </p>
          <p class="text-gray-500" v-if="data.date">
            {{ data.date.split(" ")[1] }}
          </p>
          <div class="text-gray-700 mt-1" v-if="data.date">
            Notes:
            <div>
              <span style="white-space: pre">{{ data.notes }}</span>
            </div>
          </div>
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
