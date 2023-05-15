<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import { ref } from "vue";

import { useFormEditStore } from "@/stores/reference/uom/edit-modal.js";
let formEditState = useFormEditStore();

let isVisible = ref(false);

const emits = defineEmits(["unlockScrollbar", "changeUom"]);

const props = defineProps({
  formContent: Array,
});

const currentUomName = ref(props.formContent[0]);

const submitEdit = () => {
  formEditState.uom.uomName = currentUomName.value;
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="modal-edit-uom"
    class="cursor-pointer"
    ><img :src="editicon" class="w-6 h-6"
  /></label>

  <input
    type="checkbox"
    id="modal-edit-uom"
    class="modal-toggle"
    v-model="isVisible"
  />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="modal-edit-uom"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit UOM
        </p>
      </nav>

      <main class="modal-box-inner-uom">
        <div>
          <div class="mb-6 text-start w-full px-4">
            <label
              for="uom"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >UOM Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="uom"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="UOM Name"
              required
              v-model="currentUomName"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changeUomName')"
            />
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
                for="modal-edit-uom"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button @click="submitEdit">
                <button
                  @click="$emit('changeUom')"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Save
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

.modal-box-inner-uom {
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

th {
  padding: 2px;
  text-align: left;
  position: relative;
}

tr td {
  text-align: center;
  white-space: nowrap;
}

tr th {
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}
</style>
