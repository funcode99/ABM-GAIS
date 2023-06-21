<script setup>
import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import { ref, onMounted, watch } from "vue"
import { Modal } from "usemodal-vue3"

import Multiselect from "@vueform/multiselect"
import Swal from "sweetalert2"
import Api from "@/utils/Api"

import { useReferenceFetchResult } from '@/stores/fetch/reference'
const referenceFetch = useReferenceFetchResult()

const emits = defineEmits(["unlockScrollbar", "jobband-saved"]);

let selectedFlightClass = ref("Flight Class");
let jobBandName = ref("");
let hotelFare = ref("");
let mealsRate = ref("");
let FlightClass = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const inputValues = ref([]);
const inputZonaValues = ref([]);
const initialInputValues = ref([]);

let companyData = ref(null);
let companyIdArray = ref(null);

let addZona = ref([]);
const arrayDetail = ref([]);

const saveJobBand = async () => {
  isAdding.value = true
  isVisible.value = !isVisible.value
  setTimeout(callAddApi, 500)
}

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    inputValues.value.map((item, index) => {
      arrayDetail.value[index].tlk_rate = item.replace(/\./g, "");
    });

    await Api.post(`/job_band/store`, {
      band_job_name: jobBandName.value,
      hotel_fare: hotelFare.value.replace(/\./g, ""),
      meals_rate: mealsRate.value.replace(/\./g, ""),
      id_company: companyIdArray.value,
      id_flight_class: selectedFlightClass.value,
      array_detail: arrayDetail.value,
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
}

const resetInputValues = () => {
  inputValues.value = [...initialInputValues.value];
}

const resetInput = () => {
  jobBandName.value = "";
  hotelFare.value = "";
  mealsRate.value = "";
  companyIdArray.value = [];
  selectedFlightClass.value = "Flight";
}

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
    resetInputValues();
  }

  FlightClass.value = referenceFetch.fetchFlightClassResult
  companyData.value = referenceFetch.fetchCompanyResult
  companyData.value.map((item) => {
    item.value = item.id
  })

  addZona.value = referenceFetch.fetchZonaIdResult
  inputZonaValues.value = referenceFetch.fetchZonaIdResult
  inputZonaValues.value = inputZonaValues.value.map((item) => {
    arrayDetail.value.push({
      id_zona: item.id_zona,
      tlk_rate: "",
    })
  })
})

function formatCurrency() {
  hotelFare.value = hotelFare.value.replace(/\D/g, "");
  mealsRate.value = mealsRate.value.replace(/\D/g, "");

  if (hotelFare.value === "" || hotelFare.value === "0") {
    hotelFare.value = "";
  } else {
    const formattedHotelFare = parseFloat(hotelFare.value.replace(/\./g, ""));
    hotelFare.value = formattedHotelFare.toLocaleString("id-ID");
  }

  if (mealsRate.value === "" || mealsRate.value === "0") {
    mealsRate.value = "";
  } else {
    const formattedMealsRate = parseFloat(mealsRate.value.replace(/\./g, ""));
    mealsRate.value = formattedMealsRate.toLocaleString("id-ID");
  }

  inputValues.value = inputValues.value.map((value) => {
    if (value === "" || value === "0") {
      return "";
    } else {
      const formattedValue = parseFloat(value.replace(/\./g, ""));
      return formattedValue.toLocaleString("id-ID");
    }
  });
}

onMounted(() => {
    inputValues.value = addZona.value.map(() => "")
  initialInputValues.value = [...inputValues.value]
})

</script>

<template>

  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
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
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="companyIdArray"
            mode="tags"
            placeholder="Select Company"
            track-by="company_name"
            label="company_name"
            :close-on-select="false"
            :searchable="true"
            :options="companyData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.company_name }}
                <span
                  v-if="!disabled"
                  class="multiselect-tag-remove"
                  @click="handleTagRemove(option, $event)"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
          </Multiselect>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
            @input="formatCurrency"
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
            v-model="mealsRate"
            @input="formatCurrency"
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

        <!-- INNER TABLE -->
        <h1 class="text-base font-JakartaSans font-bold py-2 px-4">TLK</h1>
        <div class="px-4 pb-10">
          <table
            class="table table-zebra table-compact border w-full rounded-lg"
          >
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
              </tr>
            </thead>

            <tbody class="bg-[#F5F5F5]">
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="(data, index) in addZona"
                :key="data.id_zona"
              >
                <td class="text-center justify-center">
                  <select
                    class="w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    disabled
                  >
                    <option :value="data.id_zona" selected>
                      {{ data.zona_name }}
                    </option>
                  </select>
                </td>
                <td class="text-center justify-center">
                  <input
                    type="text"
                    class="px-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    v-model="inputValues[index]"
                    @input="formatCurrency"
                  />
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
  max-height: 330px !important;
  max-width: 510px !important;
}

:deep(.modal-vue3-body) {
  margin-top: -4% !important;
}
</style>
