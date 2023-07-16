<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import { ref } from "vue";

let notes = ref(null);
let payload = ref(null);

const props = defineProps({
  id: String,
});

const idData = ref(props.id)
const emits = defineEmits(["close", "reject"]);
let is_revision = ref(true);

const reject = () => {
  if (is_revision.value) {
    payload.value = {
      notes: notes.value,
      is_revision: is_revision.value,
    };
  } else {
    payload.value = {
      notes: notes.value,
      is_revision: false,
    };
  }
  emits("reject", payload.value, idData.value);
};
</script>

<template>
  <input type="checkbox" id="my-modal-reject" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <button
          for="my-modal-reject"
          class="cursor-pointer absolute right-3 top-3"
          @click="emits('close')"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Reject Reason
        </p>
      </nav>

      <main class="modal-box-inner-reject">
        <form class="pt-4">
          <div class="flex flex-wrap justify-start gap-2">
            <div class="form-control">
              <label class="label cursor-pointer gap-4">
                <input
                  @change="is_revision = false"
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-green"
                  checked
                />
                <span class="font-JakartaSans font-medium text-xs"
                  >Fully Rejected</span
                >
              </label>
            </div>
          </div>
          <div class="flex flex-wrap justify-start gap-2">
            <div class="form-control">
              <label class="label cursor-pointer gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-blue"
                  checked
                  @click="is_revision = true"
                />
                <span class="font-JakartaSans font-medium text-xs"
                  >Rejected With Noted</span
                >
              </label>
            </div>
          </div>
          <div>
            <p class="font-JakartaSans font-medium text-sm py-2 text-left">
              Notes<span class="text-red">*</span>
            </p>
            <input
              type="text"
              name="notes"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Notes"
              v-model="notes"
              required
            />
          </div>
        </form>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <label
            for="my-modal-reject"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</label
          >
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            @click="reject"
          >
            Confirm
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

.modal-box-inner-reject {
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
