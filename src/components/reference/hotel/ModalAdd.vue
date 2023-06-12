<script setup>
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "hotel-saved"]);

let selectedType = ref("Type");
let selectedCity = ref("City");
let selectedRating = ref("Rating");
let HotelCode = ref("");
let HotelName = ref("");
let Address = ref("");
let Email = ref("");
let phoneNumber = ref("");
let Rating = ref("");
let HotelType = ref("");
let City = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

//for get hotel type in select
const fetchGetHotelType = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/hotel/get_by_type");
  HotelType.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get city in select
const fetchGetCity = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/city/");
  City.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetHotelType();
  fetchGetCity();
});

const saveHotel = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await Api.post(`/hotel/store`, {
      code_hotel: HotelCode.value,
      hotel_name: HotelName.value,
      address: Address.value,
      id_type_hotel: selectedType.value,
      id_city: selectedCity.value,
      email: Email.value,
      phone_number: phoneNumber.value,
      rating: Rating.value,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("hotel-saved");
  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  HotelCode.value = "";
  HotelName.value = "";
  Address.value = "";
  selectedType.value = "Type";
  selectedCity.value = "City";
  Email.value = "";
  phoneNumber.value = "";
  Rating.value = "";
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
      <modalHeader @closeVisibility="isVisible = false" title="New Hotel" />

      <form class="pt-4 modal-box-inner-hotel" @submit.prevent="saveHotel">
        <div class="mb-6 px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Name"
            required
            v-model="HotelCode"
          />
        </div>

        <div class="mb-6 px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Name"
            required
            v-model="HotelName"
          />
        </div>

        <div class="mb-6 px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Address<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="address"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Address"
            required
            v-model="Address"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Type<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedType"
          >
            <option value="" disabled selected hidden>Type</option>
            <option v-for="hotel in HotelType" :value="hotel.id">
              {{ hotel.type_accomodation }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >City<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCity"
          >
            <option value="" disabled selected hidden>City</option>
            <option v-for="hotel in City" :value="hotel.id">
              {{ hotel.city_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Email<span class="text-red">*</span></label
          >
          <input
            type="email"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Email"
            required
            v-model="Email"
          />
        </div>

        <div class="mb-6 px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Phone Number<span class="text-red">*</span></label
          >
          <input
            type="number"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Phone Number"
            required
            v-model="phoneNumber"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Rating<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="Rating"
          >
            <option disabled selected value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <modalFooter @closeEdit="isVisible = false" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
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
