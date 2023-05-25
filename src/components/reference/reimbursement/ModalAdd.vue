<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

const emits = defineEmits(["unlockScrollbar"]);
</script>

<template>
  <label
  @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
        @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2"
        >
          New Reimbursement Type
        </p>
      </nav>

      <main class="modal-box-inner-reimbursement">
        <form class="pt-4">

          <div class="mb-6 w-full px-4">
            <label
              for="reimbursement_type"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Reimbursement Type<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="reimbursement_type"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Reimbursement Type"
              required
            />
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="parent_type"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Parent Type<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
            >
              <option disabled selected>Type</option>
              <option>Type A</option>
              <option>Type B</option>
            </select>
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="job_band"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Job Band<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
            >
              <option disabled selected>Job Band</option>
              <option>Job Band A</option>
              <option>Job Band B</option>
            </select>
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
              @click="this.$emit('unlockScrollbar')"
                for="my-modal-3"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              >
                Save
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
