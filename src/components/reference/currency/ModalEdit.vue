<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";
import { useFormEditStore } from "@/stores/reference/currency/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeCurrency"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const props = defineProps({
  formContent: Array,
});

const currencyName = ref(props.formContent[0]);
const currencySymbol = ref(props.formContent[1]);
const currencyCode = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.currency) {
    formEditState.currency = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.currency.currencyName = currencyName.value;
  formEditState.currency.currencySymbol = currencySymbol.value;
  formEditState.currency.currencyCode = currencyCode.value;

  isVisible.value = false;
  emits("changeCurrency"); // Memanggil event 'changeCurrency'
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    currencyName.value = props.formContent[0];
    currencySymbol.value = props.formContent[1];
    currencyCode.value = props.formContent[2];
  }
});
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>

      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit Currency"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start px-4 w-full">
          <label
            for="currency"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Currency<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="currencyName"
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
            v-model="currencySymbol"
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
            v-model="currencyCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooter
          @closeEdit="isVisible = false"
        />

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
