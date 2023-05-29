<script setup>
  import { Modal } from 'usemodal-vue3'
  
  import iconPlus from "@/assets/navbar/icon_plus.svg";
  import editIcon from "@/assets/navbar/edit_icon.svg";
  import deleteicon from "@/assets/navbar/delete_icon.svg";
  import checkIcon from '@/assets/checkmark.png'
  import closeIcon from '@/assets/close-window.png'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"
 
  // tiap kali scrollTop error pasti itu karena ref nya belum di import
  import { ref, onBeforeMount } from 'vue'

  import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'

  import Api from '@/utils/Api'

  const formEditState = useFormEditStore()

  const props = defineProps({
    formContent: Array
  })

  let isVisible = ref(false)
  let modalPaddingHeight = '25vh'

  let matrixName = ref(props.formContent[0])
  let company = ref(props.formContent[1])
  let menu = ref(props.formContent[2])
  let document = ref(props.formContent[3])
  let idMatrix = props.formContent[4]
  let indexNumber = ref(props.formContent[5])
  let idMatrixActual = ref(null)
  
    if(props.formContent[4] == undefined) {
      console.log('array detail tidak ada')
    } else {
        idMatrixActual.value = idMatrix[0].id_matrix
        // 3, 26 adalah id_detail nya
        console.log(idMatrixActual.value)
    }

  let authorities = ref('')
  const emits = defineEmits('fetchApproval')

  let approverLines = ref(props.formContent[4] || [])
  let addAuthoritiesData = ref([])

  let levelValue = ref()

  let dropdownRemoveList = ref([])

  let instanceArrayFetch = []

  const fetch = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/approval/get_approval')
        instanceArrayFetch = api.data.data
        // approverLines.value = instanceArray
  }

  const fetchApproverAuthorities = async () => {

    const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/approval/get_approval_type')
      instanceArray = api.data.data 
      addAuthoritiesData.value = instanceArray
      authorities.value = addAuthoritiesData.value[0].level
      levelValue.value = addAuthoritiesData.value[0].level
  }

  const saveField = () => {
      formEditState.approval.matrixName = matrixName.value
      formEditState.approval.companyId = company.value
      formEditState.approval.menuId = menu.value
      formEditState.approval.codeDocumentId = document.value
      // isVisible.value = !isVisible.value
  }

  const saveApproverLines = async (data, idx, matrixId) => {

    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.post('/approval/store_approval_detail', {
      id_matrix: matrixId,
      level: data[idx].level,
      id_approval_auth: data[idx].id_approval_auth
    })

    data[idx].isPosted = undefined
    console.log('approval telah ditambahkan!')

  }

  const editApproverLines = async () => {
    console.log('masuk ke edit approver lines')
    // emits('editApprover')
  }

  let currentAuthoritiesId = ref()

  const addField = (fieldType, isi) => {

          if(isi) {
            dropdownRemoveList.value.push(isi)
          }

          fieldType.push({
            id_approval_auth : authorities.value,
            level: levelValue.value,
            isPosted: false
            // approverName : ''
          })

  }

  const removeField = async (index, fieldType) => {

    // console.log(fieldType[index].id_detail)
    // console.log(props.formContent[4])

    if(fieldType[index].id_detail) {
      
      console.log('masuk ke api')
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/approval/delete_data_approval_detail/${fieldType[index].id_detail}`)

      console.log('approval berhasil dihapus')
      
    }

    fetch()

    fieldType.splice(index, 1)
    dropdownRemoveList.value.splice(index-1, 1)
    dropdownRemoveList.value.splice(index+1, 1)

    // emits('fetchApproval')
    // console.log(props.formContent[4])
  
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
    fetchApproverAuthorities()
  })

</script>

<template>
  
  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="edit icon">
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight"> 
  
    <main>

      <modalHeader
            @closeVisibility="isVisible = false"
            title="Edit Matrix"
      />

      <form class="modal-box-inner-inner px-3" @submit.prevent="saveField">

        <div class="my-3 text-left">
            
          <div class="mb-3 text-left w-full">
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
          
        </div>

        <!-- approver lines area -->
        <div>

          <h1 class="font-medium text-left">Approver Lines <span>*</span> </h1>
          <hr class="border border-black">
  
          <div class="overflow-x-auto">
            <table
              class="table table-zebra table-compact border rounded-lg w-full"
              :class="approverLines.length == 0 ? 'w-full' : ''"
            >
    
              <thead class="text-center font-Montserrat text-sm font-bold">
                <tr class="">
                  <th class="relative">
                    <span class="flex justify-center">Level</span>
                  </th>
                  <th class="relative">
                    <span class="flex justify-center">Authorities</span>
                    <button class="absolute right-0 top-0 bottom-0">
                      <!-- <img :src="arrowicon" class="w-[9px] h-3" /> -->
                    </button>
                  </th>
                  <th class="relative">
                    <span class="flex justify-center">Approver Name</span>
                    <button class="absolute right-1 top-0 bottom-0">
                      <!-- <img :src="arrowicon" class="w-[9px] h-3" /> -->
                    </button>
                  </th>
                  <th class="flex justify-center">Actions</th>
                </tr>
              </thead>
    
              <tbody class="bg-[#F5F5F5]">
    
                <tr class="text-center" v-for="(input, index) in approverLines" :key="`${index}`">
  
                  <td v-if="input.level != 0 ? input.level = input.id_approval_auth : ''">
                    {{ input.level }} 
                  </td>
  
                  <!-- sudah betul -->
                  <td v-if="input.level == undefined">
                    0
                  </td>
    
                  <!-- event listener gak ngaruh di option -->
                  <td>
                    <select v-model="input.id_approval_auth" :id="index" :disabled="approverLines.length-1 > index ? true : false"  >
                      <option v-for="data in addAuthoritiesData" :key="data.id" :value="data.id" :hidden="dropdownRemoveList.includes(data.id) ? true : false">
                          {{ data.auth_name }}
                      </option>
                    </select>
                  </td>
    
                  <td v-if="input.level != 'R' ? currentAuthoritiesId = input.id_approval_auth : ''" class="hidden">
    
                  </td>
    
                  <td>
                    <input type="text" class="px-2" v-model="input.approverName" />
                  </td>
 
                  <!-- jika sudah ada maka pasang ke isEdit untuk mengganti value -->
                  <td v-if="input.isPosted === undefined && input.isEdit != false" class="flex flex-wrap gap-4 justify-center">
                    edit
                    <button @click="input.isEdit = false">
                      <img :src="editIcon" class="w-6 h-6" />
                    </button>
                    <button  @click="removeField(index, approverLines)">
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
                  </td>

                  <!-- jika belum ada maka pasang ke isPosted untuk menambah value baru -->
                  <td v-if="input.isPosted === false" class="flex flex-wrap gap-4 justify-center">
                    add
                    <button @click="input.isPosted = true">
                      <img :src="editIcon" class="w-6 h-6" />
                    </button>
                    <button @click="removeField(index, approverLines)">
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
                  </td>

                  <!-- berisi fungsi untuk mengganti -->
                  <td v-if="input.isEdit === false" class="flex flex-wrap gap-4 justify-center">
                    fungsi edit
                    <button @click="editApproverLines() ">
                      <img :src="checkIcon" class="w-5 h-5" />
                    </button>
                    <button @click="removeField(index, approverLines)">
                      <img :src="closeIcon" class="w-5 h-5" />
                    </button>
                  </td>

                  <!-- berisi fungsi untuk menambahkan -->
                  <td v-if="input.isPosted === true" class="flex flex-wrap gap-4 justify-center">
                    fungsi add
                    <button @click="saveApproverLines(approverLines, index, idMatrixActual)">
                      <img :src="checkIcon" class="w-5 h-5" />
                    </button>
                    <button @click="removeField(index, approverLines)">
                      <img :src="closeIcon" class="w-5 h-5" />
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
          
        </div>

        <modalFooter
          class="mt-3 pt-2 pb-5"
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
  max-width: 600px !important; 
}

</style>
