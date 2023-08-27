<script setup>
import { ref, onBeforeMount } from "vue";

import iconClose from "@/assets/navbar/icon_close.svg";
import icon_done from "@/assets/icon_done.svg";
import Api from "@/utils/Api";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  approvalId: Number,
  listEmployee: Array,
});

let notes = ref("");

const approveRequest = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    let api = await Api.post(
      `/approval_request_trip/approve/${props.approvalId}`,
      {
        notes: notes.value,
      }
    );
    router.push({
      path: "/approvalrequesttrip",
    });
  } catch (error) {}
};

let approverBehalfList = ref(props.listEmployee);

let role = JSON.parse(localStorage.getItem("id_role"));
</script>

<template>
  <label
    for="my-modal-approve-request"
    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-[#099250] hover:text-white hover:border-[#099250]"
  >
    <span>
      <img :src="icon_done" class="w-5 h-5" />
    </span>
    Approve
  </label>

  <input type="checkbox" id="my-modal-approve-request" class="modal-toggle" />

  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="my-modal-approve-request"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Approval Confirmation
        </p>
      </nav>

      <main class="modal-box-inner-approval-request">
        <p class="font-JakartaSans font-medium text-sm py-2">
          Are you sure want to approve this document?
        </p>

        <form class="pt-4">
          <div
            v-if="role === 'SUPADM'"
            class="flex flex-wrap justify-start gap-2"
          >
            <div class="form-control">
              <label class="label cursor-pointer gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-blue"
                  checked
                />
                <span class="font-JakartaSans font-medium text-xs"
                  >Approval On Behalf</span
                >
              </label>
            </div>
            <select
              class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              required
            >
              <option v-for="data in approverBehalfList" :key="data.id">
                {{ data.employee_name }}
              </option>
            </select>
          </div>

          <div class="flex flex-wrap justify-start">
            <div class="form-control">
              <label class="label cursor-pointer gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-green"
                  checked
                />
                <span class="font-JakartaSans font-medium text-xs"
                  >Fully Approve</span
                >
              </label>
            </div>
          </div>

          <p class="font-JakartaSans font-medium text-sm py-2">Attachment<span class="text-red">*</span></p>

          <input
            type="file"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Notes"
            required
          />

          <p class="font-JakartaSans font-medium text-sm py-2">Notes</p>

          <input
            v-model="notes"
            type="text"
            name="notes"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Notes"
            required
          />

          <div class="sticky bottom-0 right-0 bg-white pt-4 pb-2">
            <div class="flex justify-end gap-4">
              <label
                for="my-modal-approve-request"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >
                Cancel
              </label>

              <button
                type="button"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="approveRequest"
              >
                Approve
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-approval-request {
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
