<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/city/edit-modal.js";
let formEditState = useFormEditStore();

const emits = defineEmits([
  "unlockScrollbar",
  "changeCity",
  "changeCityCode",
  "changeCityName",
]);
let isVisible = ref(false);
let modalPaddingHeight = 150;

const props = defineProps({
  formContent: Array,
});

const currentCityCode = ref(props.formContent[0]);
const originalCityCode = ref(props.formContent[0]);
const currentCityName = ref(props.formContent[1]);
const originalCityName = ref(props.formContent[1]);

const submitEdit = () => {
  if (!formEditState.city) {
    formEditState.city = {}; // Inisialisasi objek flight jika belum ada
  }
  formEditState.city.cityCode = currentCityCode.value;
  formEditState.city.cityName = currentCityName.value;

  // Update original saat penyimpanan
  originalCityCode.value = currentCityCode.value;
  originalCityName.value = currentCityName.value;

  isVisible.value = !isVisible.value;
};

const resetForm = () => {
  currentCityCode.value = originalCityCode.value;
  currentCityName.value = originalCityName.value;
};

const inputStylingClass =
  "font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <button
    @click="
      resetForm();
      isVisible = !isVisible;
    "
  >
    <img :src="editicon" alt="" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <div class="sticky top-0 z-50 bg-[#015289]">
        <button
          @click="isVisible = false"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
        <p
          class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit City
        </p>
      </div>

      <div class="pt-4">
        <div class="mb-6 mr-6 text-start w-full px-4">
          <label
            for="city_code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Code<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeCity')"
            v-model="currentCityCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 mr-6 text-start w-full px-4">
          <label
            for="city_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeCity')"
            v-model="currentCityName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="sticky bottom-0 bg-white">
          <div class="flex justify-end gap-4 mr-6">
            <label
              @click="
                resetForm();
                isVisible = !isVisible;
              "
              for="modal-edit-pagu"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >Cancel</label
            >
            <button
              @click="
                submitEdit();
                $emit('changeCity');
              "
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 300px !important;
}
</style>
