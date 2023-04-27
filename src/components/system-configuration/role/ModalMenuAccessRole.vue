<script setup>
  import iconClose from "@/assets/navbar/icon_close.svg"
  import iconPlus from "@/assets/navbar/icon_plus.svg"
  import deleteicon from "@/assets/navbar/delete_icon.svg"
  import roleIcon from '@/assets/menu-access-role.png'

  import { ref } from 'vue'
  import { Modal } from 'usemodal-vue3'

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = 50

const menuHeadTable = [
  {Id: 1, title: 'Create'},
  {Id: 2, title: 'Read'},
  {Id: 3, title: 'Update'},
  {Id: 4, title: 'Delete'}
]

const menuBodyTable = [
  {Id: 1, list: 'Request Trip'},
  {Id: 2, list: 'Settlement'},
  {Id: 3, list: 'Cash Advance Travel'},
  {Id: 4, list: 'Cash Advance Non Travel'},
  {Id: 5, list: 'Claim/Reimbursement'},
  {Id: 6, list: 'Pool Car Management'},
  {Id: 7, list: 'List Pool Car Request'}
]

</script>

<template class="font-JakartaSans">
 
  <button @click="isVisible = !isVisible">
    <img :src=roleIcon class="w-[27px] h-[27px]" alt="">
  </button>

  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">
        
    <nav class="sticky top-0 z-50 bg-white py-4">
        <button @click="isVisible = false" for="menu-access-role-modal" class="cursor-pointer absolute right-0">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
        <p class="font-JakartaSans text-2xl font-semibold text-left">Menu Access</p>
        <div className="divider m-0"></div>
    </nav>

    <div class="mb-3 block overflow-x-auto">
        <table class="table">
          
          <thead>
            <tr class="table-layout">
              <th></th>
              <th v-for="data in menuHeadTable" :key="data.Id">
                {{ data.title }}
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th class="text-[12px]">
                Travel Management System
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="data in menuBodyTable" :key="data.Id">
                <th>
                  {{ data.list }}
                </th>
                <th>
                  <input type="checkbox">
                </th>
                <th>
                  <input type="checkbox">
                </th>
                <th>
                  <input type="checkbox">
                </th>
                <th>
                  <input type="checkbox">
                </th>
              </tr>
          </tbody>
        </table>
    </div>

    <div class="fixed right-4 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <button
            @click="isVisible = false"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</button
          >
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
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
</style>
