<script setup>
import Swal from "sweetalert2"
import { computed, ref, onMounted, watch } from "vue"
import { Modal } from "usemodal-vue3"
import { useRoute } from "vue-router"

import Multiselect from "@vueform/multiselect"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"
import FieldTitle from "@/components/atomics/FieldTitle.vue"

import CurrencyInput from "@/components/atomics/CurrencyInput.vue"

import {
  fetchDriverCarCheckupByRequesId,
  saveCarInspection,
} from "@/utils/Api/travel-management/poolCar"

import {
  fetchCarType,
  fethDrivers,
  saveCarData,
  fetchP2hHistory,
  setPoolRequestStatus,
} from "@/utils/Api/travel-management/poolCar.js"

const emits = defineEmits(["update:modelValue", "success"])

const route = useRoute()

const props = defineProps({
  modelValue: false,
  data: Object,
  isEditable: Boolean,
  status: Number,
})

const form = ref({
  driver: null,
  id_driver: null,
  odometer: null,
  id_pool_car: null,
  is_usable: 1,
  data: {},
  notes: "",
  files: {},
  // data: [
  //   {
  //     id_detail_check: 1,
  //     value: 1,
  //   },
  // ],
})

const checkupList = ref([])
const dataExisting = ref({})
const userRole = localStorage.getItem("id_role")

const isDriver = computed(() => {
  return userRole == "DRVR"
})

const references = ref({
  company: [],

  driver: [],
})

watch(
  () => checkupList.value,
  () => {
    checkupList.value
      .filter(({ detail_name }) => detail_name)
      .forEach(({ id_detail, value }) => {
        form.value.data[id_detail] = value
      })
  }
)

const doneRequestTrip = async () => {
  const requestId = route.params.id
  const res = await setPoolRequestStatus(requestId)

  if (res.data.data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success to Update Car Request Status",
      showConfirmButton: false,
      timer: 1500,
    })
    emits("success")
  }
}

const getFormData = async () => {
  let res
  const requestId = route.params.id

  if (props.data.is_history) {
    const params = {
      status: props.status,
      id_car: props.data.id_car,
      id_pool_car: props.data.id_pool_car,
    }
    res = await fetchP2hHistory(params)
  } else {
    res = await fetchDriverCarCheckupByRequesId(requestId, {
      status: props.status,
      id_car: props.data.id_car,
    })
  }

  checkupList.value = res.data.data
  dataExisting.value = res.data.data_existing

  form.value = { ...form.value, ...dataExisting.value }
}

const saveForm = async () => {
  let progress = 0
  const body = {
    id_pool_car: route.params.id,
    odometer: form.value.odometer,
    is_usable: form.value.is_usable,
    notes: form.value.notes,
    status: props.status,
  }

  const data = Object.entries(form.value.data).map((item) => {
    return {
      id_detail_check: item[0],
      value: item[1],
      ...(form.value?.files[item[0]] && { file: form.value?.files[item[0]] }),
    }
  })

  var form_data = new FormData()

  for (var key in body) {
    if (body[key] != null) form_data.append(key, body[key])
  }

  data.forEach((item, index) => {
    for (var key in item) {
      form_data.append(`data[${index}][${key}]`, item[key])
    }
  })

  Swal.fire({
    title: "Saving Data",
    html: "Progress <b></b> %",
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: () => {
      const b = Swal.getHtmlContainer().querySelector("b")
      b.textContent = progress
    },
  })

  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent
    progress = Math.floor((loaded * 100) / total)
  }

  // const res = await saveCarData(form_data, onUploadProgress)
  const res = await saveCarInspection(form_data, onUploadProgress)

  if (res.data.success) {
    if (props.status == 2) await doneRequestTrip()
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success to Save Car Inspection",
      showConfirmButton: false,
      timer: 1500,
    })

    emits("update:modelValue", false)

    emits("success")
  }
}

const openImgUrl = (url) => {
  window.open(url)
}

const triggerInputById = (elementId) => {
  document.getElementById(elementId).click()
}

onMounted(async () => {
  references.value.driver = await fethDrivers()
  await getFormData()
})
</script>

<template>
  <Modal
    width="60vw"
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
      <form @submit.prevent="saveForm()" class="p-5">
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
              :value="form.odometer"
              placeholder="Input Odometer"
              :disabled="!isEditable"
              required
            />
          </div>
        </div>
        <div class="lg:h-[40vh] overflow-auto">
          <table width="100%" class="my-5">
            <tr v-for="(matrix, index) in checkupList">
              <th
                v-if="matrix.header_name"
                width="auto"
                class="text-center bg-whtie"
              >
                {{ matrix.header_name }}
                <span class="text-error">*</span>
              </th>
              <th align="start" class="bg-white text-sm font-normal" v-else>
                {{ matrix.detail_name }}
              </th>
              <th v-if="matrix.header_name" width="75">Good</th>
              <th v-else width="75">
                <input
                  type="radio"
                  :name="matrix.id_detail"
                  :value="1"
                  class="radio radio-primary"
                  v-model="form.data[matrix.id_detail]"
                  :disabled="!isEditable"
                />
              </th>

              <th v-if="matrix.header_name" width="75">Bad</th>
              <th v-else width="75">
                <input
                  type="radio"
                  :name="matrix.id_detail"
                  :value="2"
                  class="radio radio-primary"
                  v-model="form.data[matrix.id_detail]"
                  :disabled="!isEditable"
                />
              </th>

              <th v-if="matrix.header_name" width="75">N/A</th>
              <th v-else width="75">
                <input
                  type="radio"
                  :name="matrix.id_detail"
                  :value="3"
                  class="radio radio-primary"
                  v-model="form.data[matrix.id_detail]"
                  :disabled="!isEditable"
                />
              </th>
              <th
                width="125px"
                v-if="!matrix.header_name && form.data[matrix.id_detail] == 2"
              >
                <div class="indicator">
                  <span
                    class="indicator-top indicator-start indicator-item rounded-full"
                  >
                    <button
                      v-if="form.files[matrix.id_detail]"
                      class="rounded-full bg-error hover:bg-red"
                      type="button"
                      @click="
                        () => {
                          form.files[matrix.id_detail] = null
                          delete form.files[matrix.id_detail]
                        }
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-[25px] w-[25px] text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </span>
                  <button
                    v-if="isEditable"
                    type="button"
                    class="p-2 relative rounded-lg w-[150px] flex justify-around bg-white border border-primary text-primary"
                    @click="triggerInputById(`inputForm${index}`)"
                    :disabled="form.files[matrix.id_detail]"
                  >
                    <span
                      v-if="form.files?.[matrix.id_detail]"
                      class="truncate overflow-hidden text-xs text-slate-600"
                    >
                      {{ form.files[matrix.id_detail].name }}
                    </span>

                    <span v-else class="w-full flex justify-around">
                      Evidence
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                        />
                      </svg>
                    </span>
                  </button>

                  <button
                    v-if="matrix.path"
                    type="button"
                    class="p-2 relative rounded-lg w-[150px] flex justify-around bg-white border border-primary text-primary"
                    @click="openImgUrl(matrix.path)"
                  >
                    <span
                      class="w-[100px] truncate overflow-hidden text-xs text-slate-600"
                    >
                      {{ matrix.file }}
                    </span>
                  </button>
                </div>

                <input
                  :id="`inputForm${index}`"
                  type="file"
                  accept="image/*"
                  @change="
                    form.files[matrix.id_detail] = $event.target.files[0]
                  "
                  hidden
                />
              </th>
            </tr>

            <tr>
              <th>
                Kendaraan Layak Digunakan? <span class="text-error">*</span>
              </th>
            </tr>
            <tr>
              <td align="start">
                <div>Ya</div>
              </td>
              <td>
                <input
                  type="radio"
                  name="is_usable"
                  :value="1"
                  class="radio radio-primary"
                  v-model="form.is_usable"
                  :disabled="!isEditable"
                  required
                />
              </td>
            </tr>
            <tr>
              <td align="start">
                <div>Tidak</div>
              </td>
              <td width="">
                <input
                  type="radio"
                  name="is_usable"
                  :value="0"
                  class="radio radio-primary"
                  v-model="form.is_usable"
                  :disabled="!isEditable"
                  required
                />
              </td>
            </tr>

            <tr>
              <td colspan="100%">
                <div class="text-start py-3">
                  <div class="font-semibold">
                    Catatan <span class="text-error">*</span>
                  </div>
                  <div>
                    Masukan catatan untuk kondisi pengecekan yang memerlukan
                    tindakan perbaikan
                  </div>
                </div>
                <textarea
                  type="text"
                  rows="5"
                  v-model="form.notes"
                  class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Notes"
                  :disabled="!isEditable"
                  required
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
        <modalFooter
          v-if="isEditable"
          @closeEdit="emits('update:modelValue', false)"
          class="py-3"
          :noSaveBtn="!isEditable"
        />
      </form>
    </main>
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
