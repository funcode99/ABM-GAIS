<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";

import { ref } from "vue";

const emits = defineEmits(["unlockScrollbar"]);
const imageUrl = ref(null);

//for change image
function onFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

let dtToday = new Date();
let month = dtToday.getMonth() + 1;
let day = dtToday.getDate();
let year = dtToday.getFullYear();
if (month < 10) month = "0" + month.toString();
if (day < 10) day = "0" + day.toString();
let minDate = year + "-" + month + "-" + day;
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
          New Employee
        </p>
      </nav>

      <main class="modal-box-inner-employee">
        <form>
          
          <!-- photo icon -->
          <div class="flex justify-center items-center">
            <div class="avatar">
              <div class="w-[100px] h-[100px] rounded-full bg-[#D9D9D9]">
                <div class="flex justify-center items-center">
                  <label for="file-input" class="cursor-pointer">
                    <img
                      v-if="!imageUrl"
                      :src="iconPlus"
                      class="w-[37px] h-[37px] py-8"
                    />
                    <img v-if="imageUrl" :src="imageUrl" class="" />
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    class="hidden"
                    required
                    @change="onFileChange"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- photo text -->
          <p
            class="font-JakartaSans font-medium text-sm flex justify-center items-center pt-4 mb-6"
          >
            Foto
          </p>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
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
            <div class="mb-6 w-full">
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

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
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
            <div class="mb-6 w-full">
              <label
                for="date_start"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Date of Hire<span class="text-red">*</span></label
              >
              <input
                type="date"
                name="date_start"
                :min="minDate"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
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
            <div class="mb-6 w-full">
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

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="dob"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >
                DOB<span class="text-red">*</span>
              </label>
              <input
                type="date"
                name="dob"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Company</option>
                <option>Company A</option>
                <option>Company B</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
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
            <div class="mb-6 w-full">
              <label
                for="location"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Location<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Location</option>
                <option>Location A</option>
                <option>Location B</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="departement"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Departement<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Departement</option>
                <option>Departement A</option>
                <option>Departement B</option>
              </select>
            </div>
            <div class="mb-6 w-full">
              <label
                for="job"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Job Band<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Job Band</option>
                <option>Job Band A</option>
                <option>Job Band B</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
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

          <div class="sticky bottom-0 bg-white">

            <div class="flex justify-end gap-4 mr-6">

              <label
                @click="this.$emit('unlockScrollbar')"
                for="my-modal-3"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >
                Cancel
              </label>

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

.modal-box-inner-employee {
  height: 500px;
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
