<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconUpload from "@/assets/icon_upload.svg";
import iconview from "@/assets/view_icon.svg";

//code for tags
// import { ref } from "vue";

// const tags = ref([]);

// function addTag(event) {
//   if (event.code === "Comma" || event.code === "Enter") {
//     event.preventDefault();
//     var val = event.target.value.trim();

//     if (val.length > 0) {
//       tags.value.push(val);
//       event.target.value = "";
//     }
//   }
// }

// function removeTag(index) {
//   tags.value.splice(index, 1);
// }

// function removeLastTag(event) {
//   if (event.target.value.length === 0) {
//     removeTag(tags.value.length - 1);
//   }
// }

const emits = defineEmits(["unlockScrollbar"]);
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="modal-view-company"
    class="cursor-pointer"
    ><img :src="iconview" class="w-6 h-6"
  /></label>

  <input type="checkbox" id="modal-view-company" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="modal-view-company"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start">
          Company
        </p>
      </nav>

      <main class="modal-box-inner-company">
        <form>
          <div class="mb-6 text-start">
            <label
              for="code"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Code<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="code"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              value="2382193892"
              disabled
            />
          </div>
          <div class="mb-6 text-start">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              value="PT Tunas Inti Abadi"
              disabled
            />
          </div>
          <div class="mb-6 text-start">
            <label
              for="parent_company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Parent Company<span class="text-red">*</span></label
            >
            <select
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              disabled
            >
              <option disabled selected>Company</option>
              <option>Company A</option>
              <option>Company B</option>
            </select>
          </div>

          <div class="mb-6 text-start">
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
                disabled
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

          <div class="mb-6 text-start">
            <label
              for="Site"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Site<span class="text-red">*</span></label
            >
            <div
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm px-4 font-medium sm:text-sm cursor-default"
            >
              <!-- <div
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
              </div> -->
              <input
                type="text"
                placeholder="Enter a site"
                class="tag-input__text"
                disabled
              />
              <!-- @keydown="addTag"
                @keydown.delete="removeLastTag" -->
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

.modal-box-inner-company {
  height: 470px;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

/* .tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #e4e4e4;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
} */

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
