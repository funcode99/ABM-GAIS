<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import { ref } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/gl-account/edit-modal.js";
let formEditState = useFormEditStore();

let isVisible = ref(false);
let modalPaddingHeight = 160;

const emits = defineEmits(["unlockScrollbar", "changeGl"]);

const props = defineProps({
  formContent: Array,
});

const currentglAccountCode = ref(props.formContent[0]);
const originalglAccountCode = ref(props.formContent[0]);
const currentglAccountName = ref(props.formContent[1]);
const originalglAccountName = ref(props.formContent[1]);

const submitEdit = () => {
  if (!formEditState.glAccount) {
    formEditState.glAccount = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.glAccount.glAccountCode = currentglAccountCode.value;
  formEditState.glAccount.glAccountName = currentglAccountName.value;

  // Update original saat penyimpanan
  originalglAccountCode.value = currentglAccountCode.value;
  originalglAccountName.value = currentglAccountName.value;

  isVisible.value = !isVisible.value;
};

const resetForm = () => {
  currentglAccountCode.value = originalglAccountCode.value;
  currentglAccountName.value = originalglAccountName.value;
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
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <button
          @click="isVisible = false"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
        <p
          class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit GL Account
        </p>
      </nav>

      <div class="pt-4">
        <div class="mb-6 text-start w-full px-4">
          <label
            for="gl_account"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Account<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeGl')"
            v-model="currentglAccountCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>
        <div class="mb-6 text-start w-full px-4">
          <label
            for="gl_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            @keyup.enter="$emit('changeGl')"
            v-model="currentglAccountName"
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
              for="modal-edit-car"
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
  max-width: 510px !important;
}
</style>
