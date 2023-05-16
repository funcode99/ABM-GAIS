<script setup>
  import { Modal } from 'usemodal-vue3'
  let isVisible = ref(false)
  let type = ''
  let modalPaddingHeight = 50
  
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
import editIcon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
 
// tiap kali scrollTop error pasti itu karena ref nya belum di import
import { ref, onBeforeMount } from 'vue'

import { useFormEditStore } from '@/stores/edit-modal.js'

import Api from '@/utils/Api'

  const formEditState = useFormEditStore()

  const props = defineProps({
    formContent: Array
  })

  let matrixName = ref(props.formContent[0])
  let company = ref(props.formContent[1])
  let menu = ref(props.formContent[2])
  let document = ref(props.formContent[3])

  let authorities = ref('PM')

  let approverLines = ref([])

  const saveField = () => {
          // console.log(approverLines.value)
          formEditState.approval.matrixName = matrixName.value
          formEditState.approval.companyId = company.value
          formEditState.approval.menuId = menu.value
          formEditState.approval.codeDocumentId = document.value
          isVisible.value = !isVisible.value
  }

  const addField = (fieldType) => {
          fieldType.push({
            level: 1,
            authorities: authorities.value,
            approverName : ''
          })
  }

  const removeField = (index, fieldType) => {
          fieldType.splice(index, 1)
  }

  const inputStylingClass ='py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'


  const responseExample = [
      {
        id_role: 1,
        role_name: 'Admin',
        write_menu : ['Request Trip', 'Settlement', 'Cash Advance Travel', 'Cash Advance Non Travel', 'Claim/Reimbursement', 'Pool Car Management', 'List Pool Car'],
        delete_menu : ['Cash Advance Non Travel', 'Claim/Reimbursement', 'Pool Car Management', 'List Pool Car'],
      }
  ]

  // for get Menu Dropdown
  let instanceArray = []
  let addData = ref([])

  const fetchMenu = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      // Set authorization for api
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/menu/get')      
      instanceArray = api.data.data.data
      addData.value = instanceArray
  }

  onBeforeMount(() => {
  fetchMenu()
  })

</script>

<template>
  
  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="">
  </button>

  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight"> 
  
    <div class="px-5">
      <div class="sticky top-0 z-50 bg-white py-4">
          <button @click="isVisible = false" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </button>
          <p class="font-JakartaSans text-2xl font-semibold text-left">Edit Matrix</p>
          <div className="divider m-0"></div>
      </div>
  
      <div class="mb-3 px-8 modal-box-inner">
          
        <div class="mb-3 text-left">
            <label
            class="block mb-2 font-JakartaSans font-medium text-sm"
              >Nama Matrix<span class="text-red">*</span></label
            >
            <input
              v-model="matrixName"
              type="text"
              placeholder="Nama Matrix"
              :class="inputStylingClass"
              required
            />
        </div>
  
        <div class="mb-3 flex items-center text-left">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Menu<span class="text-red">*</span>
            </label>
            <select v-model="menu" :class="inputStylingClass">
              <option v-for="data in addData" :key="data.id" :value="data.id">
                {{ data.menu }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3 flex items-center text-left">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Document<span class="text-red">*</span>
            </label>
            <select v-model="document" :class="inputStylingClass">
              <option>
                1
              </option>
              <option>
                2
              </option>
              <option>
                3
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3 flex items-center text-left">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Company<span class="text-red">*</span>
            </label>
            <select v-model="company" :class="inputStylingClass">
              <option>
                1
              </option>
              <option>
                2
              </option>
              <option>
                3
              </option>
            </select>
          </div>
        </div>
  
        <h1 class="font-medium text-left">Approver Lines <span>*</span></h1>
        <hr class="border border-black">
  
        <table
          class="table table-zebra table-compact border w-full rounded-lg"
        >

          <thead class="text-center font-Montserrat text-sm font-bold">
            <tr class="">
              <th class="relative">
                <span class="flex justify-center">Level</span>
                <button class="absolute right-0 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="relative">
                <span class="flex justify-center">Authorities</span>
                <button class="absolute right-0 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="relative">
                <span class="flex justify-center">Approver Name</span>
                <button class="absolute right-1 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="flex justify-center">Actions</th>
            </tr>
          </thead>

          <tbody class="bg-[#F5F5F5]">

            <tr class="text-center" v-for="(input, index) in approverLines" :key="`phoneInput-${index}`">
              
              <!-- nilai awalnya PM -->
              <td v-if="input.authorities === 'PM' ? input.level = 1 : ''">
                  1
              </td>
              <td v-if="input.authorities === 'GA' ? input.level = 2 : ''" >
                2
              </td>
              <td v-if="input.authorities === 'HR' ? input.level = 3 : ''">
                3
              </td>
              <td v-if="input.authorities === 'Atasan Langsung' ? input.level = 4 : ''">
                4
              </td>
              <td v-if="input.authorities === 'Accounting' ? input.level = 5 : ''">
                5
              </td>
              <td v-if="input.authorities === 'Treasury' ? input.level = 6 : ''">
                6
              </td>

              <td>
                <select v-model="input.authorities">
                  <option>PM</option>
                  <option>GA</option>
                  <option>HR</option>
                  <option>Atasan Langsung</option>
                  <option>Accounting</option>
                  <option>Treasury</option>
                </select>
              </td>

              <td>
                <input type="text" class="px-2" v-model="input.approverName" />
              </td>

              <td class="flex flex-wrap gap-4 justify-center">
                <button  @click="removeField(index, approverLines)">
                  <img :src="deleteicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class='text-center'>
              <td></td>
              <td></td>
              <td></td>
              <td class="flex justify-center">
                <img @click="addField(approverLines)" class="cursor-pointer" :src="iconPlus" alt="">
              </td>
            </tr>

          </tbody>
          
        </table>
        
      </div>
  
      <div class="sticky bottom-0 bg-white py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <button
            @click="isVisible = false"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >
              Cancel
            </button>
            <button @click="saveField">
              <button @click="$emit('editApprover')" class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                Save
              </button>
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

th span {
    text-transform: capitalize;
}

</style>
