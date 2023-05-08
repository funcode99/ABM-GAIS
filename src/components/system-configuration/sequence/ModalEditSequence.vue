<script setup>
  import { ref } from 'vue'
  import { Modal } from 'usemodal-vue3'
  import iconClose from "@/assets/navbar/icon_close.svg"
  import editIcon from "@/assets/navbar/edit_icon.svg";

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = 50

</script>

<template>
  

    <button @click="isVisible = !isVisible" class="cursor-pointer">
        <img :src="editIcon" class="w-6 h-6" />
    </button>

    <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

          <div class="sticky left-0 right-0 top-0 z-50 bg-white py-4">
            <label for="edit-sequence-modal" class="cursor-pointer absolute right-0">
              <img @click="isVisible = false" :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">Edit Sequence</p>
            <div className="divider m-0"></div>
          </div>
  
          <div class="modal-box-inner px-4 text-left">
  
            <div class="flex gap-2">
  
              <div class="mb-6 flex-1">
                <label
                  class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                  >Nama<span class="text-red">*</span></label
                >
                <input
                  type="text"
                  placeholder="Nama Sequence"
                  class="max-w-[100%] input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                  required
                />
              </div>
  
              <div class="mb-6 flex-1">
                <label
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Next Value<span class="text-red">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  placeholder="Next Value"
                  class="max-w-[100%] input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                  required
                />
              </div>
  
            </div>
  
            <div class="flex gap-2">

              <div class="mb-6 flex-1">
                <div class="w-full">
                  <label
                    for="company"
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    id="company"
                    >Menu<span class="text-red">*</span></label
                  >
                  <select class="select select-accent w-full" required>
                    <option disabled selected hidden>Menu</option>
                    <option>Administrator</option>
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Receptionist</option>
                    <option>Employee</option>
                    <option>Driver</option>
                  </select>
                </div>
              </div>
  
              <div class="mb-6 flex-1">
                <label
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Sequence Size<span class="text-red">*</span></label
                >
                <input
                  type="text"
                  placeholder="Sequence Size"
                  class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                  required
                />
              </div>
            </div>
  
            <div class="flex gap-2">
              
              <div class="mb-6 flex-1">
                <div class="w-full">
                  <label
                    for="company"
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    id="company"
                    >Recycle by<span class="text-red">*</span></label
                  >
                  <select class="select select-accent w-full" required>
                    <option disabled selected hidden>Month</option>
                    <option>Administrator</option>
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Receptionist</option>
                    <option>Employee</option>
                    <option>Driver</option>
                  </select>
                </div>
              </div>
              
              <div class="mb-6 flex-1">
                <label
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Prefix<span class="text-red">*</span></label
                >
                <input
                  type="text"
                  placeholder="Prefix"
                  class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                  required
                />
              </div>
  
            </div>
    
            <div class="flex gap-2">
              
              <div class="mb-6 flex-1">
                <label
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Suffix<span class="text-red">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  placeholder="Suffix"
                  class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                  required
                />
              </div>

              <div class="w-full flex-1">
              </div>

            </div>
  
          </div>
          
          <div class="sticky left-0 right-0 bottom-0 z-50 bg-white px-4 py-4">
                    <div className="divider m-0 pb-4"></div>
                    <div class="flex justify-end gap-4">
                      <label
                      @click="isVisible = false"
                        for="edit-sequence-modal"
                        class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
                        >
                        Cancel
                      </label>
                      <button class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                        Save
                      </button>
                    </div>
          </div>
        

    </Modal>

</template>

<style scoped>
.modal-box {
  max-height: calc(100vh - 5em);
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 32rem /* 512px */;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-top-left-radius: var(--rounded-box, 1rem);
  border-top-right-radius: var(--rounded-box, 1rem);
  border-bottom-left-radius: var(--rounded-box, 1rem);
  border-bottom-right-radius: var(--rounded-box, 1rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.modal-box-inner {
  max-height: 1000px;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.btn:hover {
  background-color: white;
}

</style>
