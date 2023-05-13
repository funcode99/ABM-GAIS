<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import { ref } from "vue";

let UpdateFlight = ref("");
let isOpenModal = ref(false);

const props = defineProps({
  currentValue: String,
});

UpdateFlight = props.currentValue;

const emits = defineEmits([
  "unlockScrollbar",
  "changeEdit",
  "assignEditFlight",
]);

const omitModal = () => {
  setTimeout(vanishModal, 3000)
}

const vanishModal = () => {
  isOpenModal.value = !isOpenModal.value
}

</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="modal-edit-flight"
    class="cursor-pointer"
    ><img :src="editicon" class="w-6 h-6"
  /></label>

  <input
    type="checkbox"
    id="modal-edit-flight"
    class="modal-toggle"
    v-model="isOpenModal"
  />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="modal-edit-flight"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit Flight Class
        </p>
      </nav>

      <main class="modal-box-inner-flight">
        <div class="pt-4">
          <div class="mb-6 text-start px-4 w-full">
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
              v-model="UpdateFlight"
            />
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
                for="modal-edit-flight"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button @click="omitModal">
                <button @click="$emit('assignEditFlight', UpdateFlight)">
                  <button
                    type="submit"
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                    @click="$emit('changeEdit')"
                  >
                    Save
                  </button>
                </button>
              </button>
            </div>
          </div>
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

.modal-box-inner-flight {
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
