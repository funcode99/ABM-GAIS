<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import iconUpload from "@/assets/icon_upload.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
</script>

<template>
  <label
    for="my-modal-claim"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input type="checkbox" id="my-modal-claim" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="my-modal-claim"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2"
        >
          New Claim Reimbursement
        </p>
      </nav>

      <main class="modal-box-inner-claim pb-8">
        <form class="pt-4">
          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6 w-full">
              <label
                for="requestor"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Requestor<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Requestor"
                required
              />
            </div>
            <div class="mb-6 w-full">
              <div
                for="attachment"
                class="block mb-2 font-JakartaSans font-medium text-sm cursor-default"
              >
                Attachment
                <span class="text-red">*</span>
              </div>
              <div
                class="relative border border-slate-300 rounded-lg py-2 mr-6"
              >
                <input
                  type="file"
                  name="attachment"
                  id="attachment"
                  class="hidden border"
                />
                <label for="attachment">
                  <span
                    class="font-JakartaSans font-medium text-sm cursor-pointer mx-4"
                    >Attachment</span
                  >
                  <img
                    :src="iconUpload"
                    class="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6 w-full">
              <label
                for="reimbursement_type"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Reimbursement Type<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Type</option>
                <option>Meals</option>
                <option>Transport</option>
                <option>Bensin</option>
              </select>
            </div>
            <div class="mb-6 w-full">
              <label
                for="nominal"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Nominal<span class="text-red">*</span></label
              >
              <input
                type="number"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Nominal"
                required
              />
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6 w-full">
              <label
                for="travel"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Travel<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Type</option>
                <option>CA Travel</option>
                <option>CA Non Travel</option>
              </select>
            </div>
            <div class="mb-6 w-full">
              <label
                for="remarks"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Remarks<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="remarks"
                required
              />
            </div>
          </div>

          <div class="flex justify-center py-2">
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
            >
              Add
            </button>
          </div>
        </form>

        <!-- INNER TABLE -->
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <thead class="font-JakartaSans font-bold text-xs">
              <tr class="bg-blue text-white h-8">
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Requestor
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Type
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Nominal
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Attachment
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Remarks
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16">
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]">
                  <div class="flex flex-wrap justify-center items-center gap-2">
                    <button>
                      <img :src="editicon" class="w-6 h-6" />
                    </button>
                    <button>
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
          >
            Draft
          </button>
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-claim {
  height: 450px;
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
