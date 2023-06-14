<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_jurnal from "@/assets/icon_jurnal.svg";

const emits = defineEmits(["unlockScrollbar"]);
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    type="button"
    class="btn btn-sm border-none mx-4 pa-3 capitalize"
  >
    <span> <img :src="icon_jurnal" class="w-5 h-5 mr-2" /> </span>Jurnal
  </label>

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
          Jurnal
        </p>
      </nav>

      <main class="modal-box-inner pb-4 lg:pb-16">
        <div
          class="flex justify-between mx-2 lg:mx-0 lg:justify-around items-center gap-2"
        >
          <div class="mb-6">
            <label
              for="event"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Number</label
            >
            <input
              type="text"
              name="event"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Event"
              disabled
            />
          </div>
          <div class="mb-6">
            <label
              for="event"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Currency</label
            >
            <input
              type="text"
              name="event"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Event"
              disabled
            />
          </div>
        </div>
        <div
          class="flex justify-between mx-2 lg:mx-0 lg:justify-around items-center gap-2"
        >
          <div class="mb-6">
            <label
              for="date"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Date</label
            >
            <input
              type="date"
              name="date_start"
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              disabled
            />
          </div>
          <div class="mb-6">
            <label
              for="event"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company Code</label
            >
            <input
              type="text"
              name="event"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Event"
              disabled
            />
          </div>
        </div>
        <div
          class="flex justify-between mx-2 lg:mx-0 lg:justify-around items-center gap-2"
        >
          <div class="mb-6">
            <label
              for="date"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Ref Doc</label
            >
            <input
              type="text"
              name="event"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Event"
              disabled
            />
          </div>
          <div class="mb-6">
            <label
              for="event"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Posting Date</label
            >
            <input
              type="date"
              name="date_start"
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              disabled
            />
          </div>
        </div>

        <!-- TABLE -->
        <table class="mt-6 w-full overflow-auto">
          <thead class="font-JakartaSans font-bold text-xs">
            <tr class="bg-blue text-white h-8">
              <th class="border border-[#B9B9B9]">Key</th>
              <th class="border border-[#B9B9B9]">Account</th>
              <th class="border border-[#B9B9B9]">Descrption</th>
              <th class="border border-[#B9B9B9]">G/L Account</th>
              <th class="border border-[#B9B9B9]">Amount</th>
              <th class="border border-[#B9B9B9]">Text</th>
              <th class="border border-[#B9B9B9]">Cost Ctr</th>
              <th class="border border-[#B9B9B9]">Profit Ctr</th>
              <th class="border border-[#B9B9B9]">Posting Date</th>
            </tr>
          </thead>
          <tbody class="font-JakartaSans font-normal text-xs">
            <tr class="h-16">
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
              <td class="border border-[#B9B9B9]"></td>
            </tr>
          </tbody>
        </table>
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
