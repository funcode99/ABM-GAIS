<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/currency/edit-modal.js";
let formEditState = useFormEditStore();

const emits = defineEmits(["unlockScrollbar", "changeCurrency"]);
let isVisible = ref(false);
let modalPaddingHeight = 118;

const props = defineProps({
  formContent: Array,
});

const currentcurrencyName = ref(props.formContent[0]);
const originalcurrencyName = ref(props.formContent[0]);
const currentcurrencySymbol = ref(props.formContent[1]);
const originalcurrencySymbol = ref(props.formContent[1]);
const currentcurrencyCode = ref(props.formContent[2]);
const originalcurrencyCode = ref(props.formContent[2]);

const submitEdit = () => {
  if (!formEditState.currency) {
    formEditState.currency = {}; // Inisialisasi objek flight jika belum ada
  }

  formEditState.currency.currencyName = currentcurrencyName.value;
  formEditState.currency.currencySymbol = currentcurrencySymbol.value;
  formEditState.currency.currencyCode = currentcurrencyCode.value;

  // Update original saat penyimpanan
  originalcurrencyName.value = currentcurrencyName.value;
  originalcurrencySymbol.value = currentcurrencySymbol.value;
  originalcurrencyCode.value = currentcurrencyCode.value;

  isVisible.value = !isVisible.value;
};

const resetForm = () => {
  currentcurrencyName.value = originalcurrencyName.value;
  currentcurrencySymbol.value = originalcurrencySymbol.value;
  currentcurrencyCode.value = originalcurrencyCode.value;
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
          Edit Currency
        </p>
      </div>

      <div class="pt-4">
        <div class="mb-6 text-start px-4 w-full">
          <label
            for="currency"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Currency<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeCurrency')"
            v-model="currentcurrencyName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="symbol"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Symbol<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeCurrency')"
            v-model="currentcurrencySymbol"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Code<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeCurrency')"
            v-model="currentcurrencyCode"
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
              for="modal-edit-currency"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >Cancel</label
            >
            <button
              @click="
                submitEdit();
                $emit('changeCurrency');
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
  max-height: 400px !important;
  max-width: 510px !important;
}
</style>
