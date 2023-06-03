<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";
import iconceklis from "@/assets/checkmark.png";
import iconcancel from "@/assets/close-window.png";

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

//for inner table
let zonaTlk = ref("");

let editDataIdTlk = ref(null);
let editDataValue = ref(null);
let isEditing = ref(false);

const editData = (id, value) => {
  editDataIdTlk.value = id;
  editDataValue.value = value;
  isEditing.value = true;
};

const saveData = () => {
  // Lakukan logika penyimpanan data ke backend atau tindakan lain yang diperlukan untuk menyimpan perubahan data

  // Setelah berhasil menyimpan data, atur kembali variabel editDataIdTlk, editDataValue, dan isEditing ke nilai awal
  editDataIdTlk.value = null;
  editDataValue.value = null;
  isEditing.value = false;
};

const cancelEdit = () => {
  // Batalkan edit dan atur kembali variabel editDataIdTlk, editDataValue, dan isEditing ke nilai awal
  editDataIdTlk.value = null;
  editDataValue.value = null;
  isEditing.value = false;
};

//for get tlk data in table
const fetchGetTlk = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/zona_job/get/");
  zonaTlk.value = res.data.data;
  console.log("ini data tlk " + JSON.stringify(res.data.data));
};

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
  fetchGetTlk();
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
    <main class="modal-box-inner-jobband">
      <modalHeader @closeVisibility="isVisible = false" title="New Job Band" />

      <form class="pt-4" @submit.prevent="saveJobBand">
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
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
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Job Band"
            required
            v-model="jobBandName"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Fare<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Fare"
            required
            v-model="hotelFare"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Meals Rate<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Meal Rate"
            required
            v-model="meals_rate"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
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
      </form>

      <!-- INNER TABLE -->
      <h1 class="text-base font-JakartaSans font-bold py-2 px-4">TLK</h1>
      <div class="px-4 pb-10">
        <table class="table table-zebra table-compact border w-full rounded-lg">
          <thead class="text-center font-JakartaSans text-sm font-bold">
            <tr>
              <th class="relative bg-blue">
                <span class="text-center items-center text-white capitalize"
                  >Zona</span
                >
              </th>
              <th class="relative bg-blue">
                <span class="text-center items-center text-white capitalize"
                  >Gross/Hari</span
                >
              </th>
              <th class="relative bg-blue">
                <span class="text-center items-center text-white capitalize"
                  >Action</span
                >
              </th>
            </tr>
          </thead>

          <tbody class="bg-[#F5F5F5]">
            <tr
              class="font-JakartaSans font-normal text-sm"
              v-for="data in zonaTlk"
              :key="data.id"
            >
              <td class="text-center items-center" style="width: 20%">
                {{ data.zona_name }}
              </td>
              <td class="text-center items-center" style="width: 60%">
                <input
                  v-if="editDataIdTlk === data.id"
                  type="text"
                  v-model="editDataValue"
                  class="text-center items-center border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                />
                <span v-else>{{ data.tlk_rate }}</span>
              </td>
              <td class="flex justify-center items-center">
                <button
                  @click="
                    editDataIdTlk === data.id
                      ? saveData()
                      : editData(data.id, data.tlk_rate)
                  "
                >
                  <img
                    :src="editDataIdTlk === data.id ? iconceklis : editicon"
                    class="w-6 h-6"
                  />
                </button>
                <template v-if="editDataIdTlk === data.id">
                  <button @click="cancelEdit">
                    <img :src="iconcancel" class="w-6 h-6" />
                  </button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <modalFooter @closeEdit="isVisible = false" />
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
  max-height: 330px !important;
  max-width: 510px !important;
}

:deep(.modal-vue3-body) {
  margin-top: -4% !important;
}
</style>
