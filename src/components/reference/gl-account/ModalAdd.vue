<script setup>
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";
import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "gl-saved"]);

let GlAccount = ref("");
let GlName = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const resetInput = () => {
  GlAccount.value = "";
  GlName.value = "";
};

const saveGlAccount = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    await Api.post(`/gl_account/store`, {
      gl_account: GlAccount.value,
      gl_name: GlName.value,
    });

    resetInput();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("gl-saved");
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
      <modalHeader
        @closeVisibility="isVisible = false"
        title="New GL Account"
      />

      <form class="pt-4" @submit.prevent="saveGlAccount">
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Account<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="GL Account"
            required
            v-model="GlAccount"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="GL Name"
            required
            v-model="GlName"
          />
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-2" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 320px !important;
  max-width: 510px !important;
}
</style>
