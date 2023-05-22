<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editIcon from "@/assets/navbar/edit_icon.svg";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/flight/edit-modal.js";
let formEditState = useFormEditStore();

const emits = defineEmits([
  "unlockScrollbar",
  "flight-class-update",
  "changeFlight",
]);
let isVisible = ref(false);
let modalPaddingHeight = 200;

const props = defineProps({
  formContent: Array,
});

const currentFlightClassName = ref(props.formContent[0]);
const originalFlightClassName = ref(props.formContent[0]);

const submitEdit = () => {
  if (!formEditState.flight) {
    formEditState.flight = {}; // Inisialisasi objek flight jika belum ada
  }
  formEditState.flight.flightClassName = currentFlightClassName.value;

  // Update originalFlightClassName saat penyimpanan
  originalFlightClassName.value = currentFlightClassName.value;

  isVisible.value = !isVisible.value;
};

const resetForm = () => {
  currentFlightClassName.value = originalFlightClassName.value;
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
    <img :src="editIcon" alt="" />
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
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit Flight Class
        </p>
      </div>

      <div class="pt-4">
        <div class="mb-6 text-start px-4 w-full">
          <label
            for="flight"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Flight Class<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeFlight')"
            v-model="currentFlightClassName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>
      </div>

      <div class="sticky bottom-0 bg-white">
        <div class="flex justify-end gap-4 mr-4">
          <label
            @click="
              resetForm();
              isVisible = !isVisible;
            "
            for="add-user-modal"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
          >
            Cancel
          </label>
          <button
            @click="
              submitEdit();
              $emit('changeFlight');
            "
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 210px !important;
}
</style>
