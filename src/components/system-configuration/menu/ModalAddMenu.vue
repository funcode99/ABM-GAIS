<script setup>
import modalHeader from "@/components/modal/ModalHeader.vue"
import modalBody from "@/components/modal/ModalBody.vue"
import modalFooter from '@/components/modal/ModalFooter.vue'

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
let sequence = ref(false)
let sequenceCode = ref('')
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

  let tags = ref([])

  const addNewTagField = (newTags) => {
    tags.value = newTags
  }

</script>

<template>
  
    <label for="add-menu-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add New
    </label>

  <input type="checkbox" id="add-menu-modal" class="modal-toggle" v-model="isOpenModal" />
  
  <div class="modal">

    <div class="modal-box relative">
      
        <modalHeader title="New Menu" forLabel="add-menu-modal" />

        <modalBody>

            <div class="px-8">
    
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
                v-model="url" type="text" id="name" placeholder="URL" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
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
  
              <div class="mb-3 ">
                <h1>Company</h1>
                <vue3-tags-input 
                  :class="inputStylingClass"
                  @on-tags-changed="addNewTagField"
                  :tags="tags"
                  placeholder="input tags" 
                  />
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
    
              <div class="mb-3" v-if="sequence">
  
                <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                  Sequence Code<span class="text-red-star">*</span>
                </label>
  
                <input
                :class="inputStylingClass"
                v-model="sequenceCode" 
                type="text"
                maxlength="5" 
                placeholder="Sequence Code" 
                class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" 
                required 
                />
  
              </div>
    
            </div>
  
            <modalFooter forLabel="add-menu-modal" @add-something="$emit('addMenu')" @do-something="submit" />
          
        </modalBody>

    </div>

  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-menu {
  height: 500px;
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
