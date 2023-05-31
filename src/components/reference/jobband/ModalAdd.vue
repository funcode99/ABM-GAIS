<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "jobband-saved"]);

let selectedCompany = ref("Company");
let selectedFlightClass = ref("Flight Class");
let jobBandName = ref("");
let hotelFare = ref("");
let mealsRate = ref("");
let Company = ref("");
let FlightClass = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get site in select
const fetchGetFlightClass = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/flight_class/");
  FlightClass.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
  fetchGetFlightClass();
});

const saveJobBand = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await Api.post(`/warehouse/store`, {
      band_job_name: jobBandName.value,
      hotel_fare: hotelFare.value,
      meals_rate: mealsRate.value,
      id_company: selectedCompany.value,
      id_flight_class: selectedFlightClass.value,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("jobband-saved");
  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  jobBandName.value = "";
  hotelFare.value = "";
  mealsRate.value = "";
  selectedCompany.value = "Company";
  selectedFlightClass.value = "Flight";
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }
});
</script>

<template>
  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader @closeVisibility="isVisible = false" title="New Job Band" />

      <form class="pt-4 modal-box-inner-jobband" @submit.prevent="saveJobBand">
        <div class="mb-6 w-full px-4">
          <label
            for="company"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCompany"
          >
            <option disabled selected>Company</option>
            <option v-for="company in Company" :value="company.id">
              {{ company.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="jobband"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="jobband"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Job Band"
            required
            v-model="jobBandName"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="hotel"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Fare<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="hotel"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Fare"
            required
            v-model="hotelFare"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="meal"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Meals Rate<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="meal"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Meal Rate"
            required
            v-model="meals_rate"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="flight"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Flight<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedFlightClass"
          >
            <option disabled selected>Flight</option>
            <option v-for="flight in FlightClass" :value="flight.id">
              {{ flight.flight_class }}
            </option>
          </select>
        </div>

        <!-- INNER TABLE -->
        <h1 class="text-base font-JakartaSans font-bold py-2 px-4">TLK</h1>
        <div class="px-4 pb-10">
          <table
            class="table table-zebra table-compact border w-full rounded-lg"
          >
            <thead class="text-center font-JakartaSans text-sm font-bold">
              <tr>
                <th class="relative">
                  <span class="flex justify-center">Zona</span>
                  <button class="absolute right-0 top-0 bottom-0">
                    <img :src="arrowicon" class="w-[9px] h-3" />
                  </button>
                </th>
                <th class="relative">
                  <span class="flex justify-center">Gross/Hari</span>
                  <button class="absolute right-1 top-0 bottom-0">
                    <img :src="arrowicon" class="w-[9px] h-3" />
                  </button>
                </th>
                <th class="flex justify-center">Actions</th>
              </tr>
            </thead>

            <tbody class="bg-[#F5F5F5]">
              <tr class="font-JakartaSans font-normal text-sm">
                <td>A</td>
                <td>569.000</td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <button>
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                </td>
              </tr>

              <tr class="font-JakartaSans font-normal text-sm">
                <td>B</td>
                <td></td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <button>
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                </td>
              </tr>

              <tr class="font-JakartaSans font-normal text-sm">
                <td>C</td>
                <td></td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <button>
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                </td>
              </tr>

              <tr class="font-JakartaSans font-normal text-sm">
                <td>D</td>
                <td></td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <button>
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                </td>
              </tr>

              <tr class="font-JakartaSans font-normal text-sm">
                <td>E</td>
                <td></td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <button>
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <modalFooter @closeEdit="isVisible = false" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
.modal-box-inner-jobband {
  height: 360px;
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}
</style>
