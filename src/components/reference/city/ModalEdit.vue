<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeaderEdit from "@/components/modal/edit/ModalHeaderEdit.vue";
import ModalFooterEdit from "@/components/modal/edit/ModalFooterEdit.vue";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/city/edit-modal.js";
let formEditState = useFormEditStore();

const emits = defineEmits(["unlockScrollbar", "changeCity"]);
let isVisible = ref(false);
let modalPaddingHeight = "26%";

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
  emits("changeCity"); // Memanggil event 'changeCity'
};

const resetForm = () => {
  currentCityCode.value = originalCityCode.value;
  currentCityName.value = originalCityName.value;
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
      <modalHeaderEdit @closeVisibility="isVisible = false" title="Edit City" />

      <div class="pt-4">
        <div class="mb-6 text-start w-full px-4">
          <label
            for="city_code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Code<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="currentCityCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label
            for="city_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="currentCityName"
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
            $emit('changeCity');
          "
        />
      </div>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 300px !important;
  max-width: 510px !important;
}
</style>
