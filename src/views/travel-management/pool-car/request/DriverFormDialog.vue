<script setup>
import Swal from "sweetalert2";
import { computed, ref, onMounted, watch } from "vue";
import { Modal } from "usemodal-vue3";
import { useRoute } from "vue-router";

import Multiselect from "@vueform/multiselect";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";
import FieldTitle from "@/components/atomics/FieldTitle.vue";

import CurrencyInput from "@/components/atomics/CurrencyInput.vue";

import {
  fetchDriverCarCheckupByRequesId,
  saveCarInspection,
} from "@/utils/Api/travel-management/poolCar";

import {
  fetchCarType,
  fethDrivers,
  saveCarData,
} from "@/utils/Api/travel-management/poolCar.js";

const emits = defineEmits(["update:modelValue", "success"]);

const route = useRoute();

const props = defineProps({
  modelValue: false,
  data: Object,
  isEditable: Boolean,
});

const form = ref({
  driver: null,
  id_driver: null,
  odometer: null,
  id_pool_car: null,
  is_usable: 1,
  data: {},
  notes: "",
  // data: [
  //   {
  //     id_detail_check: 1,
  //     value: 1,
  //   },
  // ],
});

const checkupList = ref([]);
const dataExisting = ref({});
const userRole = localStorage.getItem("id_role");

const isDriver = computed(() => {
  return userRole == "DRVR";
});

const references = ref({
  company: [],

  driver: [],
});

watch(
  () => checkupList.value,
  () => {
    checkupList.value
      .filter(({ detail_name }) => detail_name)
      .forEach(({ id_detail, value }) => {
        form.value.data[id_detail] = value;
      });
  }
);

const getFormData = async () => {
  const requestId = route.params.id;

  const res = await fetchDriverCarCheckupByRequesId(requestId);

  checkupList.value = res.data.data;
  dataExisting.value = res.data.data_existing;

  form.value = { ...form.value, ...dataExisting.value };
};

const saveForm = async () => {
  const body = {
    id_pool_car: route.params.id,
    odometer: form.value.odometer,
    is_usable: form.value.is_usable,
    notes: form.value.notes,
    data: Object.entries(form.value.data).map((item) => {
      return { id_detail_check: item[0], value: item[1] };
    }),

    // {
    //     id_detail_check: 1,
    //     value: 1,
    //   },
  };

  const res = await saveCarInspection(body);

  if (res.data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success to Save Car Inspection",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("update:modelValue", false);

    emits("success");
  }
};

onMounted(async () => {
  references.value.driver = await fethDrivers();
  await getFormData();
});
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
                  :disabled="!isEditable"
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
                  :disabled="!isEditable"
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
                  :disabled="!isEditable"
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
