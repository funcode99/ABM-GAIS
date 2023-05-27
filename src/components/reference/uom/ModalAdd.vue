<script setup>
import modalHeaderEdit from "@/components/modal/edit/ModalHeaderEdit.vue";
import ModalFooterEdit from "@/components/modal/edit/ModalFooterEdit.vue";

import { Modal } from "usemodal-vue3";
import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "uom-saved"]);

let UomName = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const resetInput = () => {
  UomName.value = "";
};

const saveUom = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    await Api.post(`/uom/store`, {
      uom_name: UomName.value,
    });

    resetInput();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    emits("uom-saved");
  } catch (error) {
    console.log(error);
  }
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }
});
</script>

<template>
  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeaderEdit @closeVisibility="isVisible = false" title="New UOM" />

      <form class="pt-4" @submit.prevent="saveUom">
        <div class="mb-6 w-full px-4">
          <label
            for="uom"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >UOM Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="uom"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="UOM Name"
            required
            v-model="UomName"
          />
        </div>

        <ModalFooterEdit @closeEdit="isVisible = false" />
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
