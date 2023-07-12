<script setup>
import { Modal } from "usemodal-vue3";
import { onMounted, ref, watch } from "vue";

import Swal from "sweetalert2";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";
import Multiselect from "@vueform/multiselect";

import FieldTitle from "@/components/atomics/FieldTitle.vue";

import {
  fetchCarType,
  fethDrivers,
  saveCarData,
  updateCarData,
} from "@/utils/Api/travel-management/poolCar.js";
import fetchCompanyRefs from "@/utils/Fetch/Reference/fetchCompany";
import fetchSiteRefs from "@/utils/Fetch/Reference/fetchSite";
import CurrencyInput from "@/components/atomics/CurrencyInput.vue";

const emits = defineEmits(["success", "resetData"]);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const references = ref({
  company: [],
  site: [],
  carType: [],
  status: [
    { label: "Active", value: 1 },
    { label: "Under Maintenance", value: 0 },
  ],
  driver: [],
});

const dialog = ref(false);
const form = ref({});

const setForm = () => {
  form.value = {
    car_name: null,
    id_company: null,
    id_site: null,
    plate: null,
    id_car_type: null,
    id_driver: null,
    odometer: null,
    transmision: null,
    transmisi: null,
    status: null,
  };
};

const saveCar = async () => {
  try {
    let res;

    const body = { ...form.value };

    var form_data = new FormData();

    for (var key in body) {
      if (body[key]) form_data.append(key, body[key]);
    }

    if (body.id) {
      res = await updateCarData(form_data);
    } else {
      res = await saveCarData(form_data);
    }

    if (res.data.success) {
      dialog.value = false;

      emits("success");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Succeess to Save Car Data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

watch(dialog, () => {
  setForm();

  if (props.data.id) {
    Object.assign(form.value, props.data);
  }
});

defineExpose({ dialog });

onMounted(async () => {
  references.value.company = await fetchCompanyRefs();
  references.value.site = await fetchSiteRefs();
  references.value.carType = await fetchCarType();
  references.value.driver = await fethDrivers();
});
</script>

<template>
  <button
    @click="dialog = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal v-model:visible="dialog" @onUnVisible="emits('resetData')">
    <modalHeader
      @closeVisibility="dialog = false"
      :title="data.id ? 'Update Car' : 'New Car'"
    />
    <main class="overflow-y-scroll">
      <form @submit.prevent="saveCar()">
        <div class="p-5 grid gap-3 h-auto">
          <div>
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

          <div>
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

          <div>
            <FieldTitle label="Car Name" mandatory />

            <input
              class="v-text-field"
              v-model="form.car_name"
              type="text"
              placeholder="Input Car Name"
              required
            />
          </div>

          <div>
            <FieldTitle label="Plate" mandatory />

            <input
              class="v-text-field"
              v-model="form.plate"
              type="text"
              placeholder="Input Plate"
              required
            />
          </div>

          <div>
            <FieldTitle label="Odometer" mandatory />

            <!-- <input
              v-model="form.odometer"
              type="number"
              placeholder="Input Odometer"
              required
            /> -->

            <CurrencyInput
              class="v-text-field"
              v-model="form.odometer"
              placeholder="Input Odometer"
            />
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
        </div>
        <modalFooter @closeEdit="dialog = false" class="py-3" />
      </form>
    </main>
  </Modal>
</template>

<style scoped></style>
