<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
</script>

<template>
  <label
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label for="my-modal-3" class="cursor-pointer absolute right-3 top-3">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New CA Non Travel
        </p>
      </nav>

      <main class="modal-box-inner pb-4 lg:pb-16">
        <div class="flex justify-center items-center">
          <div
            class="w-[44px] h-[44px] rounded-full bg-[#9E9E9E] border-[1px] border-black"
          ></div>
        </div>
        <p
          class="font-JakartaSans font-medium text-xs flex justify-center items-center pt-4"
        >
          Details
        </p>

        <form class="py-4">
          <div
            class="flex justify-between mx-2 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="event"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Event<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="event"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Event"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="date"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Date<span class="text-red">*</span></label
              >
              <input
                type="date"
                name="date_start"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              />
            </div>
          </div>

          <div class="mx-3">
            <p class="font-JakartaSans font-medium text-sm pb-2">
              Details Item
            </p>
            <hr class="h-px bg-[#8B8B8B] border-0" />
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2 pt-4"
          >
            <div class="mb-6">
              <label
                for="item"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Item<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="item"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Item"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="nominal"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Nominal<span class="text-red">*</span></label
              >
              <input
                type="number"
                name="nominal"
                class="font-JakartaSans block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Nominal"
                required
              />
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="cost_center"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Cost Center<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Cost Center</option>
                <option>Cost Center A</option>
                <option>Cost Center B</option>
              </select>
            </div>
            <div class="mb-6">
              <label
                for="remarks"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Remarks<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="remarks"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Remarks"
                required
              />
            </div>
          </div>

          <div class="flex justify-center items-center">
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
            >
              Add
            </button>
          </div>
        </form>

        <!-- TABLE -->
        <table class="mt-6 w-full overflow-auto">
          <thead class="font-JakartaSans font-bold text-xs">
            <tr class="bg-blue text-white h-8">
              <th class="border border-[#B9B9B9]">Item</th>
              <th class="border border-[#B9B9B9]">Cost Center</th>
              <th class="border border-[#B9B9B9]">Nominal</th>
              <th class="border border-[#B9B9B9]">Attachment</th>
              <th class="border border-[#B9B9B9]">Remarks</th>
              <th class="border border-[#B9B9B9]">Action</th>
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
                <div class="flex justify-center items-center">
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
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <label
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
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner {
  height: 500px;
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
