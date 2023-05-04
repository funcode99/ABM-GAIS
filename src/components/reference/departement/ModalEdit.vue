<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

//code for tags
import { ref } from "vue";

const tags = ref([]);

function addTag(event) {
  if (event.code === "Comma" || event.code === "Enter") {
    event.preventDefault();
    var val = event.target.value.trim();

    if (val.length > 0) {
      tags.value.push(val);
      event.target.value = "";
    }
  }
}

function removeTag(index) {
  tags.value.splice(index, 1);
}

function removeLastTag(event) {
  if (event.target.value.length === 0) {
    removeTag(tags.value.length - 1);
  }
}
</script>

<template>
  <label for="modal-edit-departement" class="cursor-pointer">
    <img :src="editicon" class="w-6 h-6"
  /></label>

  <input type="checkbox" id="modal-edit-departement" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="modal-edit-departement"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit Departement
        </p>
      </nav>

      <main class="modal-box-inner-departement pb-14">
        <form class="py-4">
          <div class="w-full">
            <div class="mb-6 mr-6 text-start">
              <label
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Company</option>
                <option>Company A</option>
                <option>Company B</option>
              </select>
            </div>
          </div>

          <div class="mb-6 mr-6 text-start">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name Departement"
              required
            />
          </div>

          <div class="flex justify-between items-center gap-2">
            <div class="mb-6 w-full text-start">
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
            <div class="mb-6 w-full text-start">
              <label
                for="status"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Status<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Status</option>
                <option>Active</option>
                <option>Non Active</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between items-center gap-2">
            <div class="mb-6 w-full text-start">
              <label
                for="glaccount"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >GL Account<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Account</option>
                <option>Account A</option>
                <option>Account B</option>
              </select>
            </div>
            <div class="mb-6 w-full text-start">
              <label
                for="profit"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Profit Center<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Profit Center</option>
                <option>Profit A</option>
                <option>Profit B</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between items-start gap-2">
            <div class="mb-6 w-full text-start">
              <label
                for="Division"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Division<span class="text-red">*</span></label
              >
              <div
                class="block bg-white w-full lg:w-[220px] md:w-56 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              >
                <div
                  v-for="(tag, index) in tags"
                  :key="tag"
                  class="h-[30px] bg-[#e4e4e4] my-1 rounded-md text-center items-center font-JakartaSans font-medium text-sm mx-2"
                >
                  <p class="pt-1">
                    {{ tag }}
                    <span
                      @click="removeTag(index)"
                      class="items-center cursor-pointer pl-10"
                      >x</span
                    >
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Input Division"
                  class="tag-input__text px-2 text-sm font-medium leading-[38px] font-JakartaSans"
                  @keydown="addTag"
                  @keydown.delete="removeLastTag"
                />
              </div>
            </div>

            <div class="mb-6 w-full text-start">
              <label
                for="departementhead"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Departemen Head<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Nama</option>
                <option>Nama A</option>
                <option>Nama B</option>
              </select>
            </div>
          </div>
        </form>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <label
            for="modal-edit-departement"
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

.modal-box-inner-departement {
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

.tag-input__text {
  border: none;
  outline: none;
}
</style>
