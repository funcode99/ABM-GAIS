<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Multiselect from "@vueform/multiselect";

import { ref, watch, computed } from "vue";
import { useFormEditStore } from "@/stores/reference/jobband/edit-modal.js";
import { useReferenceFetchResult } from '@/stores/fetch/reference'

const emits = defineEmits(["unlockScrollbar", "changeJobband", "fetchJobband"]);

const formEditState = useFormEditStore()
const referenceFetch = useReferenceFetchResult()

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let FlightClass = ref();
let jobBandName = ref(props.formContent[0]);
let hotelFare = ref(props.formContent[1]);
let mealsRate = ref(props.formContent[2]);
let selectedFlightClass = ref(props.formContent[4]);

let addZona = ref([]);
let tlkRatevalue = ref([]);
let idZonaValue = ref();
let inputValues = ref(props.formContent[5]);

inputValues.value.forEach((item, index) => {
  tlkRatevalue.value[index] = item.tlk_rate;
  idZonaValue.value = item.id_zona;
});

let companyData = ref(null);
let companyIdArray = ref([]);
let companyIdObject = ref(`[${props.formContent[3]}]`)
companyIdArray.value = JSON.parse(companyIdObject.value)

const props = defineProps({
  formContent: Array,
})

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.jobBand) {
    formEditState.jobBand = {};
  }

  formEditState.jobBand.jobBandIdCompany = companyIdArray.value;
  formEditState.jobBand.jobBandName = jobBandName.value;
  formEditState.jobBand.jobBandHotelFare = hotelFare.value;
  formEditState.jobBand.jobBandMealrate = mealsRate.value;
  formEditState.jobBand.jobBandIdFlight = selectedFlightClass.value;

  const length = addZona.length;
  tlkRatevalue.value = tlkRatevalue.value.slice(0, length);

  const arrayDetail = addZona.map((item, index) => {
    return {
      id_zona: item.id_zona,
      tlk_rate: tlkRatevalue.value[index] || "",
    };
  });

  formEditState.jobBand.arrayDetail = arrayDetail

  isVisible.value = false
  emits("changeJobband")

}

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

const resetInput = () => {
  jobBandName.value = props.formContent[0];
  hotelFare.value = props.formContent[1];
  mealsRate.value = props.formContent[2];
  let companyIdObject = ref(`[${props.formContent[3]}]`)
  companyIdArray.value = JSON.parse(companyIdObject.value)
  selectedFlightClass.value = props.formContent[4];
}

watch(isVisible, (newValue) => {

  if (newValue) {
    resetInput();
  }

  addZona.value = referenceFetch.fetchZonaIdResult
  FlightClass.value = referenceFetch.fetchFlightClassResult
  companyData.value = referenceFetch.fetchCompanyResult
  companyData.value.map((item) => {
    item.value = item.id
  })

})

const formattedHotelFare = computed({
  get() {
    return hotelFare.value
      ? parseFloat(hotelFare.value.replace(/\D/g, ""))
          .toLocaleString("id-ID", { minimumFractionDigits: 0 })
          .replaceAll(",", ".")
      : "";
  },
  set(value) {
    hotelFare.value = value;
  },
})

const formattedMealsRate = computed({
  get() {
    return mealsRate.value
      ? parseFloat(mealsRate.value.replace(/\D/g, ""))
          .toLocaleString("id-ID", { minimumFractionDigits: 0 })
          .replaceAll(",", ".")
      : "";
  },
  set(value) {
    mealsRate.value = value;
  },
})

const formattedGrossHari = computed(() => {
  if (tlkRatevalue.value && tlkRatevalue.value.length > 0) {
    return tlkRatevalue.value.map((value) => {
      if (value === undefined || value === null || value === "") {
        return "";
      } else {
        return parseFloat(value).toLocaleString("id-ID", {
          minimumFractionDigits: 0,
        });
      }
    });
  } else {
    return [];
  }
})

const updateGrossHari = (event, index) => {
  const formattedValue = event.target.value
    .replace(/[^\d.]/g, "")
    .replaceAll(".", "");

  if (formattedValue === "") {
    tlkRatevalue.value[index] = "";
  } else {
    tlkRatevalue.value[index] = formattedValue;
  }
}

const updateHotelFare = (event) => {
  const formattedValue = event.target.value
    .replace(/[^\d.]/g, "")
    .replaceAll(".", "");

  hotelFare.value = formattedValue;
}

const updateMealsRate = (event) => {
  const formattedValue = event.target.value
    .replace(/[^\d.]/g, "")
    .replaceAll(".", "");

  mealsRate.value = formattedValue;
}

const formatCurrency = () => {
  hotelFare.value = hotelFare.value.replace(/\D/g, "");
  mealsRate.value = mealsRate.value.replace(/\D/g, "");

  if (hotelFare.value === "" || hotelFare.value === "0") {
    hotelFare.value = "";
  } else {
    const formattedHotelFare = parseFloat(hotelFare.value.replace(/\./g, ""));
    hotelFare.value = formattedHotelFare.toString();
  }

  if (mealsRate.value === "" || mealsRate.value === "0") {
    mealsRate.value = "";
  } else {
    const formattedMealsRate = parseFloat(mealsRate.value.replace(/\./g, ""));
    mealsRate.value = formattedMealsRate.toString();
  }

  inputValues.value.forEach((item, index) => {
    tlkRatevalue.value[index] = item.tlk_rate;
  });
}

</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main class="modal-box-inner-jobband">
      <modalHeader @closeVisibility="isVisible = false" title="Edit Job Band" />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 w-full px-4 text-start">

          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Company<span class="text-red">*</span> 
          </label>

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

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Job Band"
            required
            v-model="jobBandName"
            :class="inputStylingClass"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Fare<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Hotel Fare"
            required
            :value="formattedHotelFare"
            :class="inputStylingClass"
            @input="updateHotelFare"
            @blur="formatCurrency"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Meals Rate<span class="text-red">*</span>
          </label>
          <input
            type="text"
            placeholder="Meal Rate"
            required
            :value="formattedMealsRate"
            :class="inputStylingClass"
            @input="updateMealsRate"
            @blur="formatCurrency"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
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
        <h1 class="text-base font-JakartaSans font-bold py-2 px-4 text-start">
          TLK
        </h1>
        <div class="px-4 pb-10">
          <table
            class="table table-zebra table-compact border w-full rounded-lg"
          >
            <thead class="text-center font-JakartaSans text-sm font-bold">
              <tr>
                <th class="relative bg-[#e5e7eb]">
                  <span class="text-black text-center items-center capitalize"
                    >Zona</span
                  >
                </th>
                <th class="relative bg-[#e5e7eb]">
                  <span class="text-center items-center text-black capitalize"
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
                    v-model="formattedGrossHari[index]"
                    @input="updateGrossHari($event, index)"
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
