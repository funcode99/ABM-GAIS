<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_jurnal from "@/assets/icon_jurnal.svg";
</script>

<template>
  <label
    for="my-modal-jurnal"
    class="btn btn-sm bg-[#2970FF] border-none mx-4 capitalize hover:bg-[#004EEB]"
    ><img :src="icon_jurnal" class="w-6 h-6" />Jurnal</label
  >

  <input type="checkbox" id="my-modal-jurnal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="my-modal-jurnal"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2"
        >
          Jurnal
        </p>
      </nav>

      <main class="modal-box-inner-claim pb-8">
        <div>
          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="doc_number"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Doc Number<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans font-semibold text-base capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value="600003043"
                disabled
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="doc_currency"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Doc Currency<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value="IDR"
                disabled
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="doc_date"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Doc Date<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans font-semibold text-base capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value="23/2/2023"
                disabled
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="company_code"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company Code<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value="9900"
                disabled
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="ref_doc"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Ref Doc<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans font-semibold text-base capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value="CLM-ABM/1323/23.2"
                disabled
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="posting_date"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Posting Date<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value="28/2/2023"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- INNER TABLE -->
        <div class="overflow-x-auto mx-6">
          <table class="table table-compact w-full">
            <thead class="font-JakartaSans font-bold text-xs">
              <tr class="bg-blue text-white h-8">
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  No
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Item
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  PK
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Doc. Date
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  G/L Account
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Amount
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Text
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Cost Center
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Profit Center
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Posting Date
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16">
                <th>1</th>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  1
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  23
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  27.03.2023
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  7202002000
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  120.000
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  meals
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  902922
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  902922
                </td>
                <td
                  class="border border-[#B9B9B9] font-JakartaSans font-normal text-xs"
                >
                  902922
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

.modal-box-inner-claim {
  height: 450px;
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
