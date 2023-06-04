<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/gl-account/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeGl"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const props = defineProps({
  formContent: Array,
});

const glAccountCode = ref(props.formContent[0]);
const glAccountName = ref(props.formContent[1]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.glAccount) {
    formEditState.glAccount = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.glAccount.glAccountCode = glAccountCode.value;
  formEditState.glAccount.glAccountName = glAccountName.value;

  isVisible.value = false;
  emits("changeGl"); // Memanggil event 'changeGl'
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    glAccountCode.value = props.formContent[0];
    glAccountName.value = props.formContent[1];
  }
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit GL Account"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Account<span class="text-red">*</span></label
          >
          <input
            v-model="glAccountCode"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Name<span class="text-red">*</span></label
          >
          <input
            v-model="glAccountName"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-2" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 300px !important;
  max-width: 510px !important;
}
</style>
