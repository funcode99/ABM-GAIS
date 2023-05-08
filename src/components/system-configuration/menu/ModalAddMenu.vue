<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
// cuma gara2 lupa import ref sidebar gua error terus anjing
import { ref } from 'vue'
import Api from '@/utils/Api'

let menuName = ref('')
let idStatusMenu = ref('Active')

const submit = async () => {
  // salah di front-end berarti wkwk string gabisa diubah jadi number
      if(idStatusMenu === 'Active') {
        idStatusMenu.value = 1
        console.log(idStatusMenu.value)
      }
      // console.log(idStatusMenu)
      const token = JSON.parse(localStorage.getItem('token'))
      // Set authorization for api
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.post('/menu/store', {
        menu_name: menuName.value,
        id_status_menu: 1
      })
    }

    const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<template>
  
    <label for="add-menu-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add New
    </label>

  <input type="checkbox" id="add-menu-modal" class="modal-toggle" />
  
  <div class="modal">

    <div class="modal-box relative">
      
        <div class="sticky top-0 z-50 bg-white py-4">
            <label for="add-menu-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">New Menu</p>
            <div className="divider m-0"></div>
        </div>

        <div class="mb-3">
        
          <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              Menu Name<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            v-model="menuName" type="text" id="name" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
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
              <select :class="inputStylingClass" v-model="idStatusMenu">
                  <option>Active</option>
                  <option>Option A</option>
              </select>
          </div>

          <div class="flex gap-2 mb-3">
              <input type="checkbox">
              <h1>Use Sequence</h1>
          </div>

        <!-- <div class="text-left mb-3">
            <h1>Permission <span>*</span></h1>
            <table class="text-center table">
                <thead>
                    <tr>
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

        <div class="sticky bottom-0 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <label
            for="add-menu-modal"
            class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
            >Cancel</label
          >
          <button
          @click="submit"
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
            Save
          </button>
        </div>
        </div>

    </div>

  </div>
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
