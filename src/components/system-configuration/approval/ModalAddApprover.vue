<script setup>
  import iconPlus from "@/assets/navbar/icon_plus.svg";
  import deleteicon from "@/assets/navbar/delete_icon.svg";
 
  import { ref, onBeforeMount, watch } from 'vue'
  import { Modal } from "usemodal-vue3"
  import Swal from "sweetalert2"
  import Api from '@/utils/Api'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
  const formState = useFormAddStore()

  let authorities = ref('')

  // ini fieldType nya
  let approverLines = ref([])

  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "15vh"
  const emits = defineEmits('addApprover')

  // for get Menu Dropdown
  let instanceArray = []
  let addMenuData = ref([])
  let addCompanyData = ref([])
  let addDocumentData = ref([])
  let addAuthoritiesData = ref([])

  let matrixName = ref('')
  let menu = ref('')
  let document = ref('')
  let company = ref('')
  let minCA = ref(0)
  let maxCA = ref(0)

  let dropdownRemoveList = ref([])

  const fetchApproverAuthorities = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/approval/get_approval_type')
      instanceArray = api.data.data 
      addAuthoritiesData.value = instanceArray
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
  }

  const fetchDocument = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get("/request_trip/get_document_code");
    instanceArray = res.data.data;
    addDocumentData.value = instanceArray;
    document.value = addDocumentData.value[0].id
  }

  onBeforeMount(() => {
    fetchMenu()
    fetchCompany()
    fetchDocument()
    fetchApproverAuthorities()
  })

  let currentAuthoritiesId = ref()

  const addField = (fieldType, isi) => {

    if(isi) {
      dropdownRemoveList.value.push(isi)
    }

      fieldType.push({
            level : 1,
            id_approval_auth : authorities.value,
            // approverName : ''
    })

}

  const removeField = (index, fieldType) => {
    fieldType.splice(index, 1)
    dropdownRemoveList.value.splice(index-1, 1)
    dropdownRemoveList.value.splice(index+1, 1)
  }

  const saveField = () => {

          isVisible.value = false

          formState.approval.matrixName = matrixName.value
          formState.approval.companyId = company.value
          formState.approval.menuId = menu.value
          formState.approval.codeDocumentId = document.value
          formState.approval.arrayDetail = approverLines.value

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          })

          emits('addApprover')

  }

  const resetInput = () => {
    matrixName.value = ''
    company.value = ''
    menu.value = ''
    document.value = ''
    approverLines.value = []
  }

  watch(isVisible, () => {
    if(isAdding.value == true) {
      isAdding.value = false
    } else {
      resetInput()
    }
  })

  const rowClass = 'flex justify-between items-center gap-3 my-3'
  const columnClass = 'flex flex-col flex-1'
  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<template>

  <button 
    @click="isVisible = true" 
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
    + Add New
  </button>


  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
        
      <main>

          <modalHeader
            @closeVisibility="isVisible = false"
            title="New Matrix"
          />

          <!-- px-8 -->
          <form class="pr-4 modal-box-inner-inner" @submit.prevent="saveField">

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
                  <select v-model="menu" :class="inputStylingClass" required>
                    <option v-for="data in addMenuData" :key="data.id" :value="data.id">
                      {{ data.menu }}
                    </option>
                  </select>
                </div>
              </div>
      
              <!-- Document -->
              <div class="mb-3 flex items-center">
                <div class="flex flex-col w-full">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm">
                    Document<span class="text-red">*</span>
                  </label>
                  <select v-model="document" :class="inputStylingClass" required>
                    <option v-for="data in addDocumentData" :key="data.id" :value="data.id">
                      {{ data.document_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div :class="rowClass">
                  <div :class="columnClass">
                    <label>
                      Minimum Amount (CA)
                    </label>
                    <input
                      v-model="minCA"
                      placeholder="Amount"
                      :class="inputStylingClass"
                    />
                  </div>
                  <div :class="columnClass">
                    <label>
                      Maximum Amount (CA)
                    </label>
                    <input 
                      v-model="maxCA"
                      placeholder="Amount"
                      :class="inputStylingClass"
                    />
                  </div>
              </div>
      
              <!-- Company -->
              <div class="mb-3 flex items-center">
                <div class="flex flex-col w-full">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm">
                    Company<span class="text-red">*</span>
                  </label>
                  <select v-model="company" :class="inputStylingClass" required>
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
              <div class="overflow-x-auto block">
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
                      
                      <td v-if="input.id_approval_auth == ''">
                        0
                      </td>

                      <td v-else>
                        {{ index + 1 }}
                      </td>
        
                      <td>
                        <select v-model="input.id_approval_auth" :id="index" :disabled="approverLines.length-1 > index ? true : false">
                          <option 
                            v-for="data in addAuthoritiesData" 
                            :key="data.id" 
                            :value="data.id" 
                            :hidden="dropdownRemoveList.includes(data.id) ? true : false"
                          >
                            {{ data.auth_name }}
                          </option>
                        </select>
                      </td>

                      <td v-if="input.level != 'R' ? currentAuthoritiesId = input.id_approval_auth : ''" class="hidden">
    
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
                        <img @click="addField(approverLines, currentAuthoritiesId)" class="cursor-pointer" :src="iconPlus" alt="">
                      </td>
                    </tr>
        
                  </tbody>
                  
                </table>
              </div>

              <modalFooter
                  class="mt-6 pt-5"
                  @closeEdit="isVisible = false"
              />

          </form>

      </main>

  </Modal>


</template>

<style scoped>

th span {
    text-transform: capitalize;
}

.modal-box-inner-inner {
  max-height: 500px !important;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}


:deep(.modal-vue3-content) {
  max-height: 550px !important;
}

</style>
