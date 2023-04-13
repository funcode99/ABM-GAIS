<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

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
          New TLK
        </p>
      </nav>

      <main class="modal-box-inner">
        <form class="pt-4">
          <div class="mb-6 mr-6">
            <label
              for="tlk"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >TLK<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="tlk"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="TLK"
              required
            />
          </div>

          <div class="mb-6 mr-6">
            <label
              for="location"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Location<span class="text-red">*</span></label
            >
            <div
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm px-4 font-medium sm:text-sm"
            >
              <div
                v-for="(tag, index) in tags"
                :key="tag"
                class="tag-input__tag"
              >
                {{ tag }}
                <span
                  @click="removeTag(index)"
                  class="text-xs items-center cursor-pointer"
                  >x</span
                >
              </div>
              <input
                type="text"
                placeholder="Enter a site"
                class="tag-input__text"
                @keydown="addTag"
                @keydown.delete="removeLastTag"
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              for="company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-[335px] lg:w-[490px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              required
            >
              <option disabled selected>Company</option>
              <option>Company A</option>
              <option>Company B</option>
            </select>
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
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #e4e4e4;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
