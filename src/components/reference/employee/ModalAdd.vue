<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
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
          New Employee
        </p>
      </nav>

      <main class="modal-box-inner pb-4 lg:pb-16">
        <div class="flex justify-center items-center">
          <div class="avatar">
            <div class="w-[104px] h-[100px] rounded-full bg-[#D9D9D9]">
              <div class="flex justify-center items-center py-8">
                <label for="file-input" class="cursor-pointer">
                  <img :src="iconPlus" class="w-[37px] h-[37px]" />
                </label>
                <input type="file" id="file-input" class="hidden" required />
              </div>
            </div>
          </div>
        </div>
        <p
          class="font-JakartaSans font-medium text-sm flex justify-center items-center pt-4"
        >
          Foto
        </p>

        <form class="py-4">
          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="name"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Name<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Employee Name"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="sn"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Phone Number<span class="text-red">*</span></label
              >
              <input
                type="number"
                name="phone_number"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="SN"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >SN<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="SN"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="SN"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Email<span class="text-red">*</span></label
              >
              <input
                type="email"
                name="email"
                class="font-JakartaSans block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="NIK"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >NIK<span class="text-red">*</span></label
              >
              <input
                type="number"
                name="NIK"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="NIK"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="date_start"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Begin Date<span class="text-red">*</span></label
              >
              <input
                type="date"
                name="date_start"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              />
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="dob"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >DOB<span class="text-red">*</span></label
              >
              <input
                type="date"
                name="dob"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="date_end"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >End Date<span class="text-red">*</span></label
              >
              <input
                type="date"
                name="date_end"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              />
            </div>
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-around items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="gender"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Gender<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
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
          </div>

          <div
            class="flex justify-between mx-4 lg:mx-0 lg:justify-between lg:px-4 items-center gap-2"
          >
            <div class="mb-6">
              <label
                for="departement"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Departement<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 lg:mr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Departement</option>
                <option>Departement A</option>
                <option>Departement B</option>
              </select>
            </div>
          </div>
        </form>
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
