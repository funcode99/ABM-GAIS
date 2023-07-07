<script setup>
import { computed, ref, onMounted, watch } from "vue"
import { Modal } from "usemodal-vue3"
import Multiselect from "@vueform/multiselect"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"
import FieldTitle from "@/components/atomics/FieldTitle.vue"

import CurrencyInput from "@/components/atomics/CurrencyInput.vue"

import { fetchDriverCarCheckupByRequesId } from "@/utils/Api/travel-management/poolCar"

import {
  fetchCarType,
  fethDrivers,
  saveCarData,
} from "@/utils/Api/travel-management/poolCar.js"

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: false,
  data: Object,
  checkupList: Array,
})

const form = ref({
  driver: null,
  id_driver: null,
  odometer: null,
  data: {},
})

const references = ref({
  company: [],

  driver: [],
})

watch(
  () => props.checkupList,
  () => {
    props.checkupList
      .filter(({ detail_name }) => detail_name)
      .forEach(({ id_detail, value }) => {
        form.value.data[id_detail] = value
      })
  }
)

onMounted(async () => {
  references.value.driver = await fethDrivers()
})
</script>

<template>
  <Modal
    width="50vw"
    offsetTop="10vh"
    :visible="modelValue"
    @onUnVisible="emits('update:modelValue', $event)"
    @update:visible="emits('update:modelValue', $event)"
  >
    <modalHeader
      @closeVisibility="modelValue = false"
      title="Formulir Pemeriksaan Kendaraan Harian"
    />
    <main class="overflow-y-scroll">
      <form @submit.prevent="saveForm" class="p-5">
        <div class="grid grid-cols-2 gap-3 h-auto pb-5">
          <div>
            <FieldTitle class="text-start" label="Plate" mandatory />

            <input
              class="v-text-field"
              :value="data.plate"
              type="text"
              placeholder="Input Plate"
              disabled
            />
          </div>
          <div>
            <FieldTitle class="text-start" label="Driver" mandatory />

            <Multiselect
              v-model="data.id_drivers"
              mode="single"
              placeholder="Select Driver"
              :options="references.driver"
              track-by="id"
              label="name"
              valueProp="id"
              required
              clear
              searchable
              disabled
            >
            </Multiselect>
          </div>

          <div class="text-start gap-3">
            <FieldTitle label="Odometer" mandatory />

            <CurrencyInput
              class="v-text-field"
              v-model="form.odometer"
              placeholder="Input Odometer"
            />
          </div>
        </div>
        <div class="lg:h-[40vh] overflow-auto">
          <!-- <div v-for="matrix in checkupList" class="grid grid-cols-4 gap-5"> -->
          <!-- <div class="flex">
              <div v-if="matrix.header_name">
                {{ matrix.header_name }}<span class="text-error">*</span>
              </div>
              <div v-else class="">{{ matrix.detail_name }}</div>
            </div>

            <div>
              <input
                v-if="matrix.detail_name"
                :name="item"
                type="radio"
                class="radio"
              />
            </div>
            <div>
              Good
            </div>
            <div>
              <input
                v-if="matrix.detail_name"
                :name="item"
                type="radio"
                class="radio"
              />
            </div>
            <div>
              <input
                v-if="matrix.detail_name"
                :name="item"
                type="radio"
                class="radio"
              />
            </div>
          </div> -->
          <table width="100%" class="my-5">
            <tr v-for="matrix in checkupList">
              <th
                v-if="matrix.header_name"
                width="100px"
                class="text-center bg-whtie"
              >
                {{ matrix.header_name }}
                <span class="text-error">*</span>
              </th>
              <th align="start" class="bg-white text-sm font-normal" v-else>
                {{ matrix.detail_name }}
              </th>
              <th v-if="matrix.header_name">Good</th>
              <th v-else>
                <input
                  type="radio"
                  :name="matrix.id_detail"
                  :value="1"
                  class="radio radio-primary"
                  v-model="form.data[matrix.id_detail]"
                />
              </th>

              <th v-if="matrix.header_name">Bad</th>
              <th v-else>
                <input
                  type="radio"
                  :name="matrix.id_detail"
                  :value="2"
                  class="radio radio-primary"
                  v-model="form.data[matrix.id_detail]"
                />
              </th>

              <th v-if="matrix.header_name">N/A</th>
              <th v-else>
                <input
                  type="radio"
                  :name="matrix.id_detail"
                  :value="3"
                  class="radio radio-primary"
                  v-model="form.data[matrix.id_detail]"
                />
              </th>
            </tr>
          </table>
        </div>
      </form>
    </main>
    <modalFooter @closeEdit="emits('update:modelValue', false)" class="py-3" />
  </Modal>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  background-color: white !important;
}
</style>
