<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted } from "vue";

let selectedType = ref("Type");
let selectedCity = ref("City");
let selectedRating = ref("Rating");
let HotelName = ref("");
let Address = ref("");
let Email = ref("");
let phoneNumber = ref("");
let Rating = ref("");

let HotelType = ref("");
let City = ref("");

let isOpenModal = ref(false);

const emits = defineEmits(["unlockScrollbar", "hotel-saved"]);

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
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const payload = {
      hotel_name: HotelName.value,
      address: Address.value,
      id_type_hotel: selectedType.value,
      id_city: selectedCity.value,
      email: Email.value,
      phone_number: phoneNumber.value,
      rating: Rating.value,
    };

    await Api.post(`/hotel/store`, payload);

    // Reset nilai input
    HotelName.value = "";
    Address.value = "";
    selectedType.value = "";
    selectedCity.value = "";
    Email.value = "";
    phoneNumber.value = "";
    Rating.value = "";

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    emits("hotel-saved");
    isOpenModal.value = !isOpenModal.value;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-hotel"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input
    type="checkbox"
    id="my-modal-hotel"
    class="modal-toggle"
    v-model="isOpenModal"
  />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-hotel"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New Hotel
        </p>
      </nav>

      <main class="modal-box-inner-hotel">
        <form class="pt-4" @submit.prevent="saveHotel">
          <div class="mb-6 px-4 w-full">
            <label
              for="hotel_name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Hotel Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="hotel_name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Hotel Name"
              required
              v-model="HotelName"
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
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Address"
              required
              v-model="Address"
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
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Phone Number"
              required
              v-model="phoneNumber"
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
              v-model="selectedRating"
            >
              <option disabled selected>Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
                for="my-modal-hotel"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button
                type="submit"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-hotel {
  height: 500px;
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
