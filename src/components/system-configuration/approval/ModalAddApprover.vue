<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
 
// tiap kali scrollTop error pasti itu karena ref nya belum di import
import { ref, onBeforeMount } from 'vue'

import { useFormAddStore } from '@/stores/add-modal.js'

import Api from '@/utils/Api'

  const formState = useFormAddStore()

  const inputStylingClass ='py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

  let isOpenModal = ref(false)

  let authorities = ref('')

  // ini fieldType nya
  let approverLines = ref([])

  let level = 0
  let authoritiesValue = ''
  let approverName = ''

  // for get Menu Dropdown
  let instanceArray = []
  let addMenuData = ref([])
  let addCompanyData = ref([])
  let addDocumentData = ref([])
  let addAuthoritiesData = ref([])

  let matrixName = ref('')
  let menu = ref()
  let document = ref()
  let company = ref()

  const fetchApproverAuthorities = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/approval/get_approval_type')
      instanceArray = api.data.data 
      // console.log(instanceArray) 
      addAuthoritiesData.value = instanceArray
      authorities.value = addAuthoritiesData.value[0].auth_name
      // console.log(authorities.value)
  }

  const fetchMenu = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/menu/get')      
      instanceArray = api.data.data.data
      addMenuData.value = instanceArray
      menu.value = addMenuData.value[0].id
  }

  const fetchCompany = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get("/company/get");
    // console.log(res)
    instanceArray = res.data.data;
    // console.log(instanceArray)
    addCompanyData.value = instanceArray;
    // console.log(addCompanyData.value)
    company.value = addCompanyData.value[0].id
};

const fetchDocument = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get("/request_trip/get_document_code");
    // console.log(res)
    instanceArray = res.data.data;
    // console.log(instanceArray)
    addDocumentData.value = instanceArray;
    // console.log(addDocumentData.value)
    document.value = addDocumentData.value[0].id
};

  onBeforeMount(() => {
  fetchMenu()
  fetchCompany()
  fetchDocument()
  fetchApproverAuthorities()
  })

  const addField = (fieldType) => {
          fieldType.push({
            level : 1,
            id_approval_auth : authorities.value,
            // approverName : ''
  })
  }

  const removeField = (index, fieldType) => {
          fieldType.splice(index, 1)
  }

  const saveField = () => {
          // console.log(approverLines.value)

          formState.approval.matrixName = matrixName.value
          formState.approval.companyId = company.value
          formState.approval.menuId = menu.value
          formState.approval.codeDocumentId = document.value
          formState.approval.arrayDetail = approverLines.value

          isOpenModal.value = !isOpenModal.value
  }

</script>

<template>

  <label
    for="add-approver-modal"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
    + Add New
  </label>

  <input type="checkbox" id="add-approver-modal" class="modal-toggle" v-model="isOpenModal" />

  <div class="modal">
    <div class="modal-box relative">

      <div class="sticky top-0 w-full z-50 bg-white py-4">
        <label for="add-approver-modal" class="cursor-pointer absolute right-0">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold">New Matrix</p>
        <div className="divider m-0"></div>
      </div>

      <div class="mb-3 px-8 text-left modal-box-inner">
        
        <!-- bagian atas -->
        <div class="mb-3">
          <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm">
            Nama Matrix<span class="text-red">*</span>
          </label>
          <input
            v-model="matrixName"
            type="text"
            id="name"
            placeholder="Nama Matrix"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-3 flex items-center">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Menu<span class="text-red">*</span>
            </label>
            <select v-model="menu" :class="inputStylingClass">
              <option v-for="data in addMenuData" :key="data.id" :value="data.id">
                {{ data.menu }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3 flex items-center">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Document<span class="text-red">*</span>
            </label>
            <select v-model="document" :class="inputStylingClass">
              <option v-for="data in addDocumentData" :key="data.id" :value="data.id">
                {{ data.document_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3 flex items-center">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Company<span class="text-red">*</span>
            </label>
            <select v-model="company" :class="inputStylingClass">
              <option v-for="data in addCompanyData" :key="data.id" :value="data.id">
                {{ data.company_name }}
              </option>
            </select>
          </div>
        </div>

        <!-- bagian bawah -->
        <h1 class="font-medium">Approver Lines <span>*</span></h1>
        <hr class="border border-black">

        <!-- scroll nya di dalam kalau semua konten masuk di container ini -->
        <div class="overflow-x-auto">
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
                <td v-if="input.id_approval_auth === 1 ? input.level = 1 : ''">
                    1
                </td>
                <td v-if="input.id_approval_auth === 2 ? input.level = 2 : ''" >
                  2
                </td>
                <td v-if="input.id_approval_auth === 3 ? input.level = 3 : ''">
                  3
                </td>
                <td v-if="input.id_approval_auth === 4 ? input.level = 4 : ''">
                  4
                </td>
                <td v-if="input.id_approval_auth === 5 ? input.level = 5 : ''">
                  5
                </td>
                <td v-if="input.id_approval_auth === 6 ? input.level = 6 : ''">
                  6
                </td>
  
                <td>
                  <select v-model="input.id_approval_auth">
                    <option v-for="data in addAuthoritiesData" :key="data.id" :value="data.id">
                      {{ data.auth_name }}
                    </option>
                  </select>
                </td>
  
                <td>
                  <!-- <input type="text" class="px-2" v-model="input.approverName" /> -->
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

      </div>

      <div class="sticky bottom-0 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <label
            for="add-approver-modal"
            class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
            Cancel
          </label>
          <button @click="saveField">
            <button @click="$emit('addApprover')" class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
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
  max-width: 30rem 
  /* 512px */;
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
