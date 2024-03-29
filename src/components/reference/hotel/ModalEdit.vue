<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/hotel/edit-modal.js";
import { useReferenceFetchResult } from "@/stores/fetch/reference.js";

let formEditState = useFormEditStore();
const referenceFetch = useReferenceFetchResult();

const emits = defineEmits(["unlockScrollbar", "changeHotel"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let selectedType = ref("Type");
let selectedCity = ref("City");
let HotelType = ref("");
let City = ref("");
let HotelCode = ref("");
let hotelName = ref("");
let hotelAddress = ref("");
let hotelIdTypeHotel = ref("");
let hotelIdCity = ref();
let hotelEmail = ref();
let hotelPhoneNumber = ref();
let hotelRating = ref();

let selectedHotelTypeId = ref(props.formContent[2] || null);
let selectedCityId = ref(props.formContent[3] || null);
let selectedRating = ref(props.formContent[6]);

const props = defineProps({
  formContent: Array,
});

const currenthotelName = ref(props.formContent[0]);
const originalhotelName = ref(props.formContent[0]);
const currenthotelAddress = ref(props.formContent[1]);
const originalhotelAddress = ref(props.formContent[1]);
const currenthotelIdTypeHotel = ref(props.formContent[2]);
const originalhotelIdTypeHotel = ref(props.formContent[2]);
const currenthotelIdCity = ref(props.formContent[3]);
const originalhotelIdCity = ref(props.formContent[3]);
const currenthotelEmail = ref(props.formContent[4]);
const originalhotelEmail = ref(props.formContent[4]);
const currenthotelPhoneNumber = ref(props.formContent[5]);
const originalhotelPhoneNumber = ref(props.formContent[5]);
const currenthotelRating = ref(props.formContent[6]);
const originalhotelRating = ref(props.formContent[6]);
const currenthotelCode = ref(props.formContent[7]);
const originalhotelCode = ref(props.formContent[7]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.hotel) {
    formEditState.hotel = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.hotel.hotelName = currenthotelName.value;
  formEditState.hotel.hotelAddress = currenthotelAddress.value;
  formEditState.hotel.hotelIdTypeHotel = selectedHotelTypeId.value;
  formEditState.hotel.hotelIdCity = selectedCityId.value;
  formEditState.hotel.hotelEmail = currenthotelEmail.value;
  formEditState.hotel.hotelPhoneNumber = currenthotelPhoneNumber.value;
  formEditState.hotel.hotelRating = selectedRating.value;
  formEditState.hotel.hotelCode = currenthotelCode.value;

  isVisible.value = false;
  emits("changeHotel"); // Memanggil event 'changeBrand'
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    currenthotelName.value = props.formContent[0];
    currenthotelAddress.value = props.formContent[1];
    selectedHotelTypeId.value = props.formContent[2];
    selectedCityId.value = props.formContent[3];
    currenthotelEmail.value = props.formContent[4];
    currenthotelPhoneNumber.value = props.formContent[5];
    currenthotelRating.value = props.formContent[6];
    currenthotelCode.value = props.formContent[7];
  }

  City.value = referenceFetch.fetchCityResult;
  HotelType.value = referenceFetch.fetchTypeOfHotelResult;
});

const resetForm = () => {
  currenthotelName.value = originalhotelName.value;
  currenthotelAddress.value = originalhotelAddress.value;
  selectedHotelTypeId.value = originalhotelIdTypeHotel.value;
  selectedCityId.value = originalhotelIdCity.value;
  currenthotelEmail.value = originalhotelEmail.value;
  currenthotelPhoneNumber.value = originalhotelPhoneNumber.value;
  currenthotelRating.value = originalhotelRating.value;
  currenthotelCode.value = originalhotelCode.value;
};
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="
          isVisible = false;
          resetForm();
        "
        title="Edit Hotel"
      />

      <form class="pt-4 modal-box-inner-hotel" @submit.prevent="submitEdit">
        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Code<span class="text-red">*</span></label
          >
          <input
            v-model="currenthotelCode"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Name<span class="text-red">*</span></label
          >
          <input
            v-model="currenthotelName"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Address<span class="text-red">*</span></label
          >
          <input
            v-model="currenthotelAddress"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Type<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedHotelTypeId"
          >
            <option disabled selected>Type</option>
            <option v-for="hotel in HotelType" :value="hotel.id">
              {{ hotel.type_accomodation }}
            </option>
          </select>
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >City<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCityId"
          >
            <option disabled selected>City</option>
            <option v-for="hotel in City" :value="hotel.id">
              {{ hotel.city_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Email<span class="text-red">*</span></label
          >
          <input
            v-model="currenthotelEmail"
            type="email"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Phone Number<span class="text-red">*</span></label
          >
          <input
            v-model="currenthotelPhoneNumber"
            type="number"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Rating<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedRating"
          >
            <option disabled selected>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <modalFooter
          @closeEdit="
            isVisible = false;
            resetForm();
          "
        />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 410px !important;
  max-width: 510px !important;
}

.modal-box-inner-hotel {
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
</style>
