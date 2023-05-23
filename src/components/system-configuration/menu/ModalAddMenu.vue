<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
// cuma gara2 lupa import ref sidebar gua error terus anjing
import { ref, onBeforeMount } from 'vue'
import Api from '@/utils/Api'

import { useFormAddStore } from '@/stores/add-modal.js'
let formState = useFormAddStore()

let menuName = ref('')
let url = ref('')
let idStatusMenu = ref(0)
let idParent = ref(1)
let sort = ref(1)
let sequence = ref(0)
const file = ref({})

// buat ngisi dropdown status
let statusMenu = ref(null)

const updatePhoto = (event) => {
  file.value = event.target.files[0]
}

let isOpenModal = ref(false)

const submit = () => {

  try {     
      if(sequence) {
        sequence.value = 1
      } else {
        sequence.value = 0
      }

      formState.menu.menuName = menuName.value
      formState.menu.sort = sort.value
      formState.menu.sequence = sequence.value
      formState.menu.url = url.value
      formState.menu.icon = file.value

      // active / disable only value
      formState.menu.idStatusMenu = idStatusMenu.value
      // formState.menu.parentId = idParent.value
      
      isOpenModal.value = !isOpenModal.value

  } catch (error) {
      console.error(error)
  }
}

  onBeforeMount(() => {
    getMenuStatus()
  })

const getMenuStatus = async () => {
      const status = await Api.get('/menu/get_status/status')
      let getStatus = status.data.data
      statusMenu.value = getStatus
}

const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<template>
  
    <label for="add-menu-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add New
    </label>

  <input type="checkbox" id="add-menu-modal" class="modal-toggle" v-model="isOpenModal" />
  
  <div class="modal">

    <div class="modal-box relative">
      
        <div class="sticky top-0 z-50 bg-white py-4">
            <label for="add-menu-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">New Menu</p>
            <div className="divider m-0"></div>
        </div>

        <div class="mb-3 ">

          <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              Menu Name<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            v-model="menuName" type="text" id="name" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
          </div>

          <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              URL<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            v-model="url" type="text" id="name" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
          </div>

          <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              Icon<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            @change="updatePhoto" type="file" accept="image/*" id="name" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
          </div>

          <div class="mb-3 text-left">
              <h1>Parent Menu</h1>
              <select :class="inputStylingClass">
                  <option>Travel Management System</option>
                  <option>Option A</option>
              </select>
          </div>

          <div class="mb-3 text-left">
            <h1>Status</h1>
            <select :class="inputStylingClass" v-model="idStatusMenu">
                <option v-for="data in statusMenu" :key="data.id" :value="data.code">
                  {{ data.status }}
                </option>
            </select>
          </div>

          <div class="mb-3 text-left">
              <h1>Sort</h1>
              <select :class="inputStylingClass" v-model="sort">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
              </select>
          </div>

          <div class="flex gap-2 mb-3">
              <input type="checkbox" v-model="sequence">
              <h1>Use Sequence</h1>
          </div>

        </div>

        <div class="sticky bottom-0 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <label
            for="add-menu-modal"
            class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
            Cancel
            </label>
          <button @click="submit">
            <button
            @click="$emit('addMenu')"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
              Save
            </button>
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
