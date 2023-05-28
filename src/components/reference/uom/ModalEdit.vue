<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";
import { useFormEditStore } from "@/stores/reference/uom/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeUom"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const props = defineProps({
  formContent: Array,
});

const uomName = ref(props.formContent[0]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.uom) {
    formEditState.uom = {}
  }

  formEditState.uom.uomName = uomName.value;

  isVisible.value = false;
  emits("changeUom"); // Memanggil event 'changeUom'
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    uomName.value = props.formContent[0];
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
        title="Edit UOM"
      />

      <form @submit.prevent="submitEdit" class="pt-4">
        <div class="mb-6 text-start w-full px-4">
          <label
            for="uom"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >UOM Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="uomName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <!-- @submitEditForm="submitEdit()" -->
        <modalFooter
          @closeEdit="isVisible = false"
        />

      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 210px !important;
  max-width: 510px !important;
}
</style>
