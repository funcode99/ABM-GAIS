<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import Api from "@/utils/Api";

import { ref, onMounted } from "vue";

import { useFormEditStore } from "@/stores/reference/hotel/edit-modal.js";

let formEditState = useFormEditStore();
let isVisible = ref(false);

let selectedType = ref("Type");
let selectedCity = ref("City");
let selectedRating = ref("Rating");

let HotelType = ref("");
let City = ref("");

let hotelName = ref("");
let hotelAddress = ref("");
let hotelIdTypeHotel = ref("");
let hotelIdCity = ref();
let hotelEmail = ref();
let hotelPhoneNumber = ref();
let hotelRating = ref();

let selectedHotelTypeId = ref(null);
let selectedCityId = ref(null);

const emits = defineEmits(["unlockScrollbar", "change-hotel"]);

const props = defineProps({
  formContent: Array,
});

const currenthotelName = ref(props.formContent[0]);
const currenthotelAddress = ref(props.formContent[1]);
const currenthotelIdTypeHotel = ref(props.formContent[2]);
const currenthotelIdCity = ref(props.formContent[3]);
const currenthotelEmail = ref(props.formContent[4]);
const currenthotelPhoneNumber = ref(props.formContent[5]);
const currenthotelRating = ref(props.formContent[6]);

const submitEdit = () => {
  formEditState.hotel.hotelName = currenthotelName.value;
  formEditState.hotel.hotelAddress = currenthotelAddress.value;
  formEditState.hotel.hotelIdTypeHotel = selectedHotelTypeId.value;
  formEditState.hotel.hotelIdCity = selectedCityId.value;
  formEditState.hotel.hotelEmail = currenthotelEmail.value;
  formEditState.hotel.hotelPhoneNumber = currenthotelPhoneNumber.value;
  formEditState.hotel.hotelRating = currenthotelRating.value;
  isVisible.value = !isVisible.value;
};

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
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-edit-hotel"
    class="cursor-pointer"
    ><img :src="editicon" class="w-6 h-6"
  /></label>

  <input
    type="checkbox"
    id="my-modal-edit-hotel"
    class="modal-toggle"
    v-model="isVisible"
  />

  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-edit-hotel"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Edit Hotel
        </p>
      </nav>

      <main class="modal-box-inner-hotel-edit">
        <div class="pt-4">
          <div class="mb-6 px-4 w-full text-start">
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
              v-model="currenthotelName"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changehotelName')"
            />
          </div>

          <div class="mb-6 px-4 w-full text-start">
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
              v-model="currenthotelAddress"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changehotelAddress')"
            />
          </div>

          <div class="mb-6 px-4 w-full text-start">
            <label
              for="type"
              class="block mb-2 font-JakartaSans font-medium text-sm"
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
            <label
              for="city"
              class="block mb-2 font-JakartaSans font-medium text-sm"
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
            <label
              for="email"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Email<span class="text-red">*</span></label
            >
            <input
              type="email"
              name="email"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email"
              required
              v-model="currenthotelEmail"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changehotelEmail')"
            />
          </div>

          <div class="mb-6 px-4 w-full text-start">
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
              v-model="currenthotelPhoneNumber"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changehotelPhoneNumber')"
            />
          </div>

          <div class="mb-6 px-4 w-full text-start">
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
                for="my-modal-edit-hotel"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button @click="submitEdit">
                <button
                  @click="$emit('change-hotel')"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Save
                </button>
              </button>
            </div>
          </div>
        </div>
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

.modal-box-inner-hotel-edit {
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
