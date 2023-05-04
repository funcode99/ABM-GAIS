<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
</script>

<template>
  <label for="modal-edit-job" class="cursor-pointer"
    ><img :src="editicon" class="w-6 h-6"
  /></label>

  <input type="checkbox" id="modal-edit-job" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="modal-edit-job"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit Job Band
        </p>
      </nav>

      <main class="modal-box-inner-jobband pb-14">
        <form class="pt-4">
          <div class="mb-6 mr-6 text-start">
            <label
              for="jobband"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Job Band<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="jobband"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Job Band"
              required
            />
          </div>

          <div class="mb-6 mr-6 text-start">
            <label
              for="hotel"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Hotel Fare<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="hotel"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Hotel Fare"
              required
            />
          </div>

          <div class="mb-6 mr-6 text-start">
            <label
              for="meal"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Meals Rate<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="meal"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Meals Rate"
              required
            />
          </div>
          <div class="mb-6 mr-6 text-start">
            <label
              for="flight"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Flight Class<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="flight"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Flight Class"
              required
            />
          </div>
        </form>

        <!-- INNER TABLE -->
        <h1 class="text-base font-JakartaSans font-bold py-2 text-start">
          TLK
        </h1>
        <table class="table table-zebra table-compact border w-full rounded-lg">
          <thead class="text-center font-JakartaSans text-sm font-bold">
            <tr>
              <th class="relative">
                <span class="flex justify-center">TLK</span>
                <button class="absolute right-0 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="relative">
                <span class="flex justify-center">Cross/Hari</span>
                <button class="absolute right-1 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="flex justify-center">Actions</th>
            </tr>
          </thead>

          <tbody class="bg-[#F5F5F5]">
            <tr class="font-JakartaSans font-normal text-sm">
              <td>A</td>
              <td>241.000</td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class="font-JakartaSans font-normal text-sm">
              <td>B</td>
              <td>219.000</td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class="font-JakartaSans font-normal text-sm">
              <td>C</td>
              <td>219.000</td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class="font-JakartaSans font-normal text-sm">
              <td>D</td>
              <td>153.000</td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class="font-JakartaSans font-normal text-sm">
              <td>E</td>
              <td>128.000</td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <label
            for="modal-edit-job"
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

.modal-box-inner-jobband {
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
