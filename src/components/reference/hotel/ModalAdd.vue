<script setup>
import modalHeaderEdit from "@/components/modal/edit/ModalHeaderEdit.vue";
import ModalFooterEdit from "@/components/modal/edit/ModalFooterEdit.vue";

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
      <modalHeaderEdit @closeVisibility="isVisible = false" title="New Hotel" />

      <form class="pt-4" @submit.prevent="saveHotel" @keydown.enter="saveHotel">
        <div class="mb-6 px-4 w-full">
          <label
            for="hotel_code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="hotel_code"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Name"
            required
            v-model="HotelCode"
            @keyup.enter="$emit('hotel-saved')"
          />
        </div>

        <div class="mb-6 px-4 w-full">
          <label
            for="hotel_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="hotel_name"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Name"
            required
            v-model="HotelName"
            @keyup.enter="$emit('hotel-saved')"
          />
        </div>

        <div class="mb-6 px-4 w-full">
          <label
            for="address"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Address<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="address"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Address"
            required
            v-model="Address"
            @keyup.enter="$emit('hotel-saved')"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="type"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Type<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedType"
          >
            <option disabled selected>Type</option>
            <option v-for="hotel in HotelType" :value="hotel.id">
              {{ hotel.type_accomodation }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="city"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCity"
          >
            <option disabled selected>City</option>
            <option v-for="hotel in City" :value="hotel.id">
              {{ hotel.city_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 px-4 w-full">
          <label
            for="email"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Email<span class="text-red">*</span></label
          >
          <input
            type="email"
            name="email"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Email"
            required
            v-model="Email"
            @keyup.enter="$emit('hotel-saved')"
          />
        </div>

        <div class="mb-6 px-4 w-full">
          <label
            for="phone_number"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Phone Number<span class="text-red">*</span></label
          >
          <input
            type="number"
            name="phone"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Phone Number"
            required
            v-model="phoneNumber"
            @keyup.enter="$emit('hotel-saved')"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="rating"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Rating<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="Rating"
          >
            <option disabled selected value="">Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <ModalFooterEdit @closeEdit="isVisible = false" class="pb-2" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}
</style>
