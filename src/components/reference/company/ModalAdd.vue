<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconUpload from "@/assets/icon_upload.svg";

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
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New Company
        </p>
      </nav>

      <main class="modal-box-inner-company">
        <form>
          <div class="mb-6 w-full px-4">
            <label
              for="code"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Code<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="code"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Code"
              required
            />
          </div>
          <div class="mb-6 w-full px-4">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name Company"
              required
            />
          </div>
          <div class="mb-6 w-full px-4">
            <label
              for="parent_company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Parent Company<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
            >
              <option disabled selected>Company</option>
              <option>Company A</option>
              <option>Company B</option>
            </select>
          </div>

          <div class="mb-6 w-full px-4">
            <div
              for="logo_company"
              class="block mb-2 font-JakartaSans font-medium text-sm cursor-default"
            >
              Logo Company
              <span class="text-red">*</span>
            </div>
            <div class="relative border border-slate-300 rounded-lg py-2">
              <input
                type="file"
                name="logo_company"
                id="logo_company"
                class="hidden border"
              />
              <label for="logo_company">
                <span
                  class="font-JakartaSans font-medium text-sm cursor-pointer mx-4"
                  >Logo Company</span
                >
                <img
                  :src="iconUpload"
                  class="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="vendor"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Vendor Airlines<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
            >
              <option disabled selected>Vendor</option>
              <option>Vendor A</option>
              <option>Vendor B</option>
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
  max-height: calc(84vh - 5em);
}

.modal-box-inner-company {
  height: 400px;
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
