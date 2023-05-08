<script setup>
  import iconClose from "@/assets/navbar/icon_close.svg";
  import editIcon from "@/assets/navbar/edit_icon.svg";

  import { ref } from 'vue'
  import { Modal } from 'usemodal-vue3'

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = 50

  const props = defineProps({
    identity: Array
  })

  let menu = ref(props.identity[1])
  let idStatusMenu = ref(props.identity[2])

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<!-- komponen ini mendapat warisan styling dari komponen parent nya (listMenu) -->
<template class="font-JakartaSans">

  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="">
  </button>
      
  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">


    <div class="px-8">
      <nav class="sticky top-0 z-50 bg-white py-4">
            <button @click="isVisible = false" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </button>
            <p class="font-JakartaSans text-2xl font-semibold">Edit Menu</p>
            <div className="divider m-0"></div>
      </nav>
  
      <div class="mb-3">
        
        <div class="mb-3">
          <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm text-left"
            >Menu Name<span class="text-red">*</span></label>
          <input
          v-model="menu"
            type="text"
            id="name"
            placeholder="Nama Menu"
            :class="inputStylingClass"
            required
          />
        </div>
  
        <div class="mb-3 text-left">
            <h1>Parent Menu</h1>
            <select :class="inputStylingClass">
                <option selected hidden disabled value="">Travel Management System</option>
                <option value="">Option A</option>
            </select>
        </div>
  
        <div class="mb-3 text-left">
            <h1>Status</h1>
            <select v-model="idStatusMenu" :class="inputStylingClass">
                <option selected hidden disabled value="">Active</option>
                <option value="">Option A</option>
            </select>
        </div>
  
        <div class="flex gap-2 mb-3">
            <input type="checkbox">
            <h1>Use Sequence</h1>
        </div>
  
        <!-- <div class="text-left mb-3">
            <h1>Permission <span>*</span></h1>
            <table class="text-center">
                <thead>
                    <tr class="text-center">
                        <th></th>
                        <th>Create</th>
                        <th>Read</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center">
                        <td>Permission</td>
                        <td><input type="checkbox"></td>
                        <td><input type="checkbox"></td>
                        <td><input type="checkbox"></td>
                        <td><input type="checkbox"></td>
                    </tr>
                </tbody>
            </table>
        </div> -->
  
      </div>
  
      <!-- <div class="sticky bottom-0 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <button
          @click="isVisible = false"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red">
            Cancel
          </button>
          <button
          @click="$emit('changeMenu', [props.identity[0], menu, idStatusMenu])"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
            Save
          </button>
        </div>
      </div> -->

      <div class="sticky bottom-0 bg-white py-8">
          <div className="divider m-0 pb-4 w-full"></div>
          <div class="flex justify-end gap-4">
            <label @click="isVisible = !isVisible" class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
              Cancel
            </label>
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
            >
              Save
            </button>
          </div>
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
  width: 91.666667%;
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

 .height {
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 4px 8px;
}
</style>
