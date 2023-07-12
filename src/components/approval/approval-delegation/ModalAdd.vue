<script setup>
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";
import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, watch, onBeforeMount } from "vue";

const emits = defineEmits(["unlockScrollbar", "approvaldelegation-saved"]);

let Delegator = localStorage.getItem("username");
let selectedDelegateTo = ref("DelegateTo");
let DelegateTo = ref("");
const DateStart = ref();
const DateEnd = ref();

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const resetInput = () => {
  selectedDelegateTo.value = "";
  DateStart.value = "";
  DateEnd.value = "";
};

const saveApprovalDelegation = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const getDelegatorTo = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const id_employee = localStorage.getItem("id_employee");

  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  const res = await Api.get(`/employee/get_delegation/${id_employee}`);
  DelegateTo.value = res.data.data;
};

const callAddApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const id_employee = localStorage.getItem("id_employee");
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    await Api.post(`/approval_delegation/store`, {
      id_employee: id_employee,
      id_employee_to: selectedDelegateTo.value,
      start_date: DateStart.value,
      end_date: DateEnd.value,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("approvaldelegation-saved");
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(() => {
  getDelegatorTo();
});

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
        title="New Approval Delegation"
      />

      <form
        class="pt-4 modal-box-inner"
        @submit.prevent="saveApprovalDelegation"
      >
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Delegator<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Name"
            required
            v-model="Delegator"
            disabled
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Delegate To<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedDelegateTo"
          >
            <option disabled selected>Delegate To</option>
            <option v-for="data in DelegateTo" :value="data.id">
              {{ data.employee_name }}
            </option>
          </select>
        </div>

        <div class="flex justify-between px-4 items-center">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Active From<span class="text-red">*</span></label
            >
            <input
              type="date"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name"
              required
              v-model="DateStart"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Active To<span class="text-red">*</span></label
            >
            <input
              type="date"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name"
              required
              v-model="DateEnd"
            />
          </div>
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-2" />
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
