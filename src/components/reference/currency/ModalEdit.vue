<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeaderEdit from "@/components/modal/edit/ModalHeaderEdit.vue";
import ModalFooterEdit from "@/components/modal/edit/ModalFooterEdit.vue";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/currency/edit-modal.js";
let formEditState = useFormEditStore();

const emits = defineEmits(["unlockScrollbar", "changeCurrency"]);
let isVisible = ref(false);
let modalPaddingHeight = "19%";

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
    formEditState.currency = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.currency.currencyName = currentcurrencyName.value;
  formEditState.currency.currencySymbol = currentcurrencySymbol.value;
  formEditState.currency.currencyCode = currentcurrencyCode.value;

  // Update original saat penyimpanan
  originalcurrencyName.value = currentcurrencyName.value;
  originalcurrencySymbol.value = currentcurrencySymbol.value;
  originalcurrencyCode.value = currentcurrencyCode.value;

  isVisible.value = !isVisible.value;
  emits("changeCurrency"); // Memanggil event 'changeCurrency'
};

const resetForm = () => {
  currentcurrencyName.value = originalcurrencyName.value;
  currentcurrencySymbol.value = originalcurrencySymbol.value;
  currentcurrencyCode.value = originalcurrencyCode.value;
  isVisible.value = !isVisible.value;
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <button @click="resetForm()">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeaderEdit
        @closeVisibility="isVisible = false"
        title="Edit Currency"
      />

      <div class="pt-4">
        <div class="mb-6 text-start px-4 w-full">
          <label
            for="currency"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Currency<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
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
            v-model="currentcurrencyCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <ModalFooterEdit
          @closeEdit="resetForm()"
          @submitEditForm="
            submitEdit();
            $emit('changeCurrency');
          "
        />
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
