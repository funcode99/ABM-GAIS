<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref } from "vue";

const emits = defineEmits(["unlockScrollbar", "city-saved"]);
let isOpenModal = ref(false);
let CityCode = ref("");
let CityName = ref("");

const saveCity = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    await Api.post(`/city/store`, {
      city_code: CityCode.value,
      city_name: CityName.value,
    });

    // Reset the input values
    CityCode.value = "";
    CityName.value = "";

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    emits("city-saved");
    isOpenModal.value = !isOpenModal.value;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input
    type="checkbox"
    id="my-modal-3"
    class="modal-toggle"
    v-model="isOpenModal"
  />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New City
        </p>
      </nav>

      <main class="modal-box-inner-city">
        <form class="pt-4" @submit.prevent="saveCity">
          <div class="mb-6 w-full px-4">
            <label
              for="city_code"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >City Code<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="city_code"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="City Code"
              required
              v-model="CityCode"
            />
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="city_name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >City Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="city_name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="City Name"
              required
              v-model="CityName"
            />
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
                for="my-modal-3"
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

.modal-box-inner-city {
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
