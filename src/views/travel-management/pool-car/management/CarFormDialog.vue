<script setup>
import { vMaska } from "maska"
import { Modal } from "usemodal-vue3"
import { computed, onMounted, ref, watch } from "vue"

import Swal from "sweetalert2"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"
import Multiselect from "@vueform/multiselect"

import FieldTitle from "@/components/atomics/FieldTitle.vue"

import {
  fetchCarType,
  fethDrivers,
  saveCarData,
  updateCarData,
} from "@/utils/Api/travel-management/poolCar.js"
import fetchCompanyRefs from "@/utils/Fetch/Reference/fetchCompany"
import fetchSiteRefs from "@/utils/Fetch/Reference/fetchSite"
import CurrencyInput from "@/components/atomics/CurrencyInput.vue"

const emits = defineEmits(["success", "resetData"])

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const references = ref({
  company: [],
  site: [],
  carType: [],
  status: [
    { label: "Active", value: 1 },
    { label: "Under Maintenance", value: 0 },
  ],
  type: [
    { label: "Assets", value: 1 },
    { label: "Kontrak", value: 2 },
  ],
  driver: [],
})

const dialog = ref(false)
const form = ref({})

const setForm = () => {
  form.value = {
    car_name: null,
    id_company: null,
    id_site: null,
    type: null,
    plate: null,
    hull_no: null,
    type_name: null,
    id_car_type: null,
    id_driver: null,
    odometer: null,
    transmision: null,
    transmisi: null,
    status: null,
  }
}

// watch(
//   () => form.value.type,
//   () => {
//     const typeId = form.value.type

//     const typeName = references.value.type.find(({ value }) => value == typeId)

//     form.value.type_name = typeName?.label || null
//   }
// )

const saveCar = async () => {
  try {
    let res

    const body = { ...form.value }

    var form_data = new FormData()

    for (var key in body) {
      if (body[key]) form_data.append(key, body[key])
    }

    if (body.id) {
      res = await updateCarData(form_data)
    } else {
      res = await saveCarData(form_data)
    }

    if (res.data.success) {
      dialog.value = false

      emits("success")

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Succeess to Save Car Data",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

watch(dialog, () => {
  setForm()

  if (props.data.id) {
    Object.assign(form.value, props.data)
  }
})

defineExpose({ dialog })

onMounted(async () => {
  references.value.company = await fetchCompanyRefs()
  references.value.site = await fetchSiteRefs()
  references.value.carType = await fetchCarType()
  references.value.driver = await fethDrivers()
})
</script>

<template>
  <button
    @click="dialog = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal
    width="600px"
    v-model:visible="dialog"
    @onUnVisible="emits('resetData')"
  >
    <modalHeader
      @closeVisibility="dialog = false"
      :title="data.id ? 'Update Car' : 'New Car'"
    />
    <form @submit.prevent="saveCar()">
      <main class="overflow-y-scroll max-h-[70vh]">
        <div class="p-5 grid gap-3 h-auto">
          <div class="flex gap-5">
            <div class="basis-1/2">
              <FieldTitle label="Company" mandatory />

              <Multiselect
                v-model="form.id_company"
                mode="single"
                placeholder="Select Company"
                :options="references.company"
                track-by="company_code"
                label="company_name"
                valueProp="id"
                required
                clear
                searchable
              >
              </Multiselect>
            </div>

            <div class="basis-1/2">
              <FieldTitle label="Site" mandatory />

              <Multiselect
                v-model="form.id_site"
                mode="single"
                placeholder="Select Site"
                :options="references.site"
                track-by="site_code"
                label="site_name"
                valueProp="id"
                required
                clear
                searchable
              >
              </Multiselect>
            </div>
          </div>

          <div class="basis-1/2">
            <FieldTitle label="Type" mandatory />

            <Multiselect
              v-model="form.type"
              mode="single"
              placeholder="Type"
              :options="references.type"
              track-by="value"
              label="label"
              valueProp="value"
              @change="form.type_name = null"
              required
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div v-if="form.type == '2'" class="flex gap-5 w-full">
            <div class="basis-1/2">
              <FieldTitle label="Start Date" mandatory />

              <VueDatePicker
                v-model="form.start_date"
                :enable-time-picker="false"
                format="dd/MM/yyyy"
                placeholder="Input Start Date"
                required
              />
            </div>

            <div class="basis-1/2">
              <FieldTitle label="End Date" mandatory />

              <VueDatePicker
                v-model="form.end_date"
                :enable-time-picker="false"
                format="dd/MM/yyyy"
                :min-date="form.start_date"
                placeholder="Input End Date"
                required
              />
            </div>
          </div>

          <div v-if="form.type == '1'">
            <FieldTitle label="Asset No" mandatory />
            <input
              v-maska
              data-maska-eager
              data-maska="A"
              data-maska-tokens="A:[0-9]:repeated"
              class="v-text-field"
              v-model="form.type_name"
              type="text"
              placeholder="Input Car Name"
              required
            />
          </div>

          <div v-if="form.type == '2'">
            <FieldTitle label="Vendor Name" mandatory />

            <input
              class="v-text-field"
              v-model="form.type_name"
              type="text"
              placeholder="Input Car Name"
              required
            />
          </div>

          <div class="flex gap-5">
            <div class="basis-1/2">
              <FieldTitle label="Car Name" mandatory />

              <input
                class="v-text-field"
                v-model="form.car_name"
                type="text"
                placeholder="Input Car Name"
                required
              />
            </div>

            <div class="basis-1/2">
              <FieldTitle label="Plate" mandatory />

              <input
                class="v-text-field"
                v-model="form.plate"
                type="text"
                placeholder="Input Plate"
                required
              />
            </div>
          </div>

          <div class="flex gap-5">
            <div class="basis-1/2">
              <FieldTitle label="Hull No" />

              <input
                class="v-text-field"
                v-model="form.hull_no"
                type="text"
                placeholder="Hull No"
                required
              />
            </div>

            <div class="basis-1/2">
              <FieldTitle label="Odometer" mandatory />

              <CurrencyInput
                class="v-text-field"
                v-model="form.odometer"
                placeholder="Input Odometer"
                required
              />
            </div>
          </div>

          <div class="flex gap-5">
            <div class="flex-1">
              <FieldTitle label="Car Type" mandatory />

              <Multiselect
                v-model="form.id_car_type"
                mode="single"
                placeholder="Select Car Type"
                :options="references.carType"
                track-by="type_car"
                label="type_car"
                valueProp="id"
                required
                clear
                searchable
              >
              </Multiselect>
            </div>

            <div class="flex-1">
              <FieldTitle label="Transmission" mandatory />

              <Multiselect
                v-model="form.transmisi"
                mode="single"
                placeholder="Select Transmision"
                :options="['Automatic', 'Manual']"
                required
                clear
                searchable
              >
              </Multiselect>
            </div>
          </div>

          <div class="flex gap-5">
            <div class="flex-1">
              <FieldTitle label="Status" mandatory />

              <Multiselect
                v-model="form.status"
                mode="single"
                placeholder="Select Status"
                :options="references.status"
                track-by="value"
                label="label"
                valueProp="value"
                required
                clear
                searchable
              >
              </Multiselect>
            </div>

            <div class="flex-1">
              <FieldTitle label="Driver" />

              <Multiselect
                v-model="form.id_driver"
                mode="single"
                placeholder="Select Driver"
                :options="references.driver"
                track-by="id"
                label="name"
                valueProp="id"
                clear
                searchable
              >
              </Multiselect>
            </div>
          </div>

          <div class="flex gap-5 w-full">
            <div class="basis-1/2">
              <FieldTitle label="Vehicle Registration Date" mandatory />

              <VueDatePicker
                v-model="form.start_date"
                :enable-time-picker="false"
                format="dd/MM/yyyy"
                placeholder="Registration Date"
                required
              />
            </div>

            <div class="basis-1/2">
              <FieldTitle label="Plate Registration Expired Date" mandatory />

              <VueDatePicker
                v-model="form.end_date"
                :enable-time-picker="false"
                format="dd/MM/yyyy"
                :min-date="form.start_date"
                placeholder="Plate Expiration Date"
                required
              />
            </div>
          </div>

          <div class="flex gap-5 w-full">
            <div class="basis-1/2">
              <FieldTitle label="KIR Registration" />

              <VueDatePicker
                v-model="form.start_date"
                :enable-time-picker="false"
                format="dd/MM/yyyy"
                placeholder="KIR Registration Date"
              />
            </div>

            <div class="basis-1/2">
              <FieldTitle label="Stickers Expired Date" mandatory />

              <VueDatePicker
                v-model="form.end_date"
                :enable-time-picker="false"
                format="dd/MM/yyyy"
                :min-date="form.start_date"
                placeholder="Stickers Expiration Date"
              />
            </div>
          </div>
        </div>
      </main>
      <modalFooter @closeEdit="dialog = false" class="py-3 b-white" />
    </form>
  </Modal>
</template>

<style scoped></style>
