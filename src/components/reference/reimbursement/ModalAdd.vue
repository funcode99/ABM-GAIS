<script setup>
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import Multiselect from "@vueform/multiselect";

import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "reimbursementSaved"]);

let reimbursementType = ref("");
let parentType = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let jobBandData = ref(null);
let jobBandIdArray = ref(null);

//for get city in input
const fetchJobBand = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/job_band/");
  jobBandData = res.data.data;
  // console.log("ini data jobBandData" + JSON.stringify(res.data.data));
  jobBandData.map((item) => {
    item.value = item.id;
  });
  // console.log("Data jobBandData setelah perubahan:", jobBandData);
};

onMounted(() => {
  fetchJobBand();
});

const saveReimbursement = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await Api.post(`/reimbursement/store`, {
      reimbursement_type: reimbursementType.value,
      reimbursement_parent: parentType.value,
      id_band_job: jobBandIdArray.value.join(","),
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("reimbursementSaved");
  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  reimbursementType.value = "";
  parentType.value = "";
  jobBandIdArray.value = [];
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
        title="New Reimbursement Type"
      />

      <form
        class="pt-4 modal-box-inner-reimbursement"
        @submit.prevent="saveReimbursement"
      >
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Reimbursement Type<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Reimbursement Type"
            required
            v-model="reimbursementType"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Parent Type<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Reimbursement Type"
            required
            v-model="parentType"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <Multiselect
            v-model="jobBandIdArray"
            mode="tags"
            placeholder="Select Job Band"
            track-by="band_job_name"
            label="band_job_name"
            :close-on-select="false"
            :searchable="true"
            :options="jobBandData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.band_job_name }}
                <span
                  v-if="!disabled"
                  class="multiselect-tag-remove"
                  @click="handleTagRemove(option, $event)"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
          </Multiselect>
        </div>

        <modalFooter @closeEdit="isVisible = false" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}
.modal-box-inner-reimbursement {
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
