<script setup>
  import iconPlus from "@/assets/navbar/icon_plus.svg"
  import deleteicon from "@/assets/navbar/delete_icon.svg"
 
  import { ref, watch } from 'vue'
  import { Modal } from "usemodal-vue3"

  import Multiselect from '@vueform/multiselect'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import fetchApproverAuthoritiesNameUtils from '@/utils/Fetch/System-Configuration/fetchApproverAuthoritiesName'
  import Api from '@/utils/Api'

  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
  import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
  import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
  import { useTravelManagementFetchResult } from "@/stores/fetch/travel-management"

  const formState = useFormAddStore()
  const referenceFetch = useReferenceFetchResult()
  const sysconfigFetch = useSysconfigFetchResult()
  const tmsFetch = useTravelManagementFetchResult()

  let authorities = ref('')

  // ini fieldType nya
  let approverLines = ref([])

  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "10vh"
  const emits = defineEmits(['addApprover'])

  // for get Menu Dropdown
  let addMenuData = ref([])
  let addCompanyData = ref([])
  let addDocumentData = ref([])
  let addAuthoritiesData = ref([])
  let addAuthoritiesNameData = ref([])

  let matrixName = ref('')
  let menu = ref('')
  let document = ref('')
  let company = ref('')
  let minCA = ref('0')
  let maxCA = ref('0')
  let approverAuthoritiesName = ref('')

  let dropdownRemoveList = ref([])
  let currentAuthoritiesId = ref('')

  const addField = (fieldType, isi) => {

    if(isi) {
      dropdownRemoveList.value.push(isi)
    }

    fieldType.push({
      level : 1,
      id_approval_auth : authorities.value,
      approverName: '',
      show_min_ammount: 0,
      show_max_ammount: 0,
      min_ammount: 0,
      max_ammount: 0,
      is_flight: 0,
      is_notif: 0,
      is_notif_checkbox: false,
      is_flight_checkbox: false,
    })

  }

  const removeField = (index, fieldType) => {
    fieldType.splice(index, 1)
    dropdownRemoveList.value.splice(index-1, 1)
    dropdownRemoveList.value.splice(index+1, 1)
    currentAuthoritiesId.value = 0
  }

  const saveField = () => {

          isVisible.value = false

          formState.approval.matrixName = matrixName.value
          formState.approval.companyId = company.value
          formState.approval.menuId = menu.value
          formState.approval.codeDocumentId = document.value
          formState.approval.arrayDetail = approverLines.value
          formState.approval.jobBandId = jobBandArray.value

          currentAuthoritiesId.value = ''

          emits('addApprover')

  }

  const resetInput = () => {
    matrixName.value = ''
    company.value = ''
    menu.value = ''
    document.value = ''
    approverLines.value = []
    dropdownRemoveList.value = []
    jobBandArray.value = []
  }

  let jobBandData = ref([])
  let jobBandArray = ref([])

  const fetchJobBand = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.get(`/company/get_band_job/${localStorage.getItem('id_company')}`)
    jobBandData.value = api.data.data
    jobBandData.value.map((item) => {
      item.value = item.band_job_name
    })
  }

  watch(isVisible, () => {

    fetchJobBand()

    addCompanyData.value = referenceFetch.fetchCompanyResult
    addMenuData.value = sysconfigFetch.fetchMenuResult
    addAuthoritiesData.value = sysconfigFetch.fetchApproverAuthoritiesResult
    addDocumentData.value = tmsFetch.fetchDocumentCodeResult

    if(isAdding.value == true) {
      isAdding.value = false
    } else {
      resetInput()
    }

  })

  watch(company, () => {
    company.value != '' && typeof currentAuthoritiesId.value == 'number' ? fetchApproverAuthoritiesNameUtils(company.value, currentAuthoritiesId.value, addAuthoritiesNameData) : company
  })

  const fetchApproverName = () => {
    company.value != '' && typeof currentAuthoritiesId.value == 'number' ? fetchApproverAuthoritiesNameUtils(company.value, currentAuthoritiesId.value, addAuthoritiesNameData) : company
  }

  const formatCurrency = (argument, input) => {

    if(argument === 'a') {
      
      input.show_min_ammount = input.show_min_ammount.replace(/\D/g, "")

      if (input.show_min_ammount === "" || input.show_min_ammount === "0") {
      input.show_min_ammount = ""
      } else {
        const formattedMinCA = parseFloat(input.show_min_ammount.replace(/\./g, ""));
        input.show_min_ammount = formattedMinCA.toLocaleString("id-ID");
        }

      input.min_ammount = input.show_min_ammount.replaceAll(".", "")

    }

    if(argument === 'b') {

      input.show_max_ammount = input.show_max_ammount.replace(/\D/g, "")

      if (input.show_max_ammount === "" || input.show_max_ammount === "0") {
      input.show_max_ammount = ""
      } else {
      const formattedMaxCA = parseFloat(input.show_max_ammount.replace(/\./g, ""));
      input.show_max_ammount = formattedMaxCA.toLocaleString("id-ID");
        }

      input.max_ammount = input.show_max_ammount.replaceAll(".", "")

    }

  }

  const rowClass = 'flex justify-between items-center gap-3 my-3'
  const columnClass = 'flex flex-col flex-1'
  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

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
            title="New Matrix Approval"
          />

          <!-- px-8 -->
          <form class="modal-box-inner-inner w-[671px]" @submit.prevent="saveField">

              <!-- bagian atas -->
              <div class="mb-3">
                <label for="matrix_name" class="block mb-2 font-JakartaSans font-medium text-sm">
                  Nama Matrix<span class="text-red">*</span>
                </label>
                <input
                  v-model="matrixName"
                  type="text"
                  id="matrix_name"
                  placeholder="Nama Matrix"
                  :class="inputStylingClass"
                  required
                />
              </div>
      
              <div class="mb-3 flex items-center">
                <div class="flex flex-col w-full">
                  <label for="menu" class="block mb-2 font-JakartaSans font-medium text-sm">
                    Menu<span class="text-red">*</span>
                  </label>
                  <select id="menu" v-model="menu" :class="inputStylingClass" required>
                    <option v-for="data in addMenuData" :key="data.id" :value="data.id">
                      {{ data.menu }}
                    </option>
                  </select>
                </div>
              </div>
      
              <!-- Document -->
              <div class="mb-3 flex items-center">
                <div class="flex flex-col w-full">
                  <label for="document" class="block mb-2 font-JakartaSans font-medium text-sm">
                    Document
                  </label>
                  <select id="document" v-model="document" :class="inputStylingClass">
                    <option v-for="data in addDocumentData" :key="data.id" :value="data.id">
                      {{ data.document_name }}
                    </option>
                  </select>
                </div>
              </div>
      
              <!-- Company -->
              <div class="mb-3 flex items-center">

                <div class="flex flex-col w-full">
                  
                  <label for="company" class="block mb-2 font-JakartaSans font-medium text-sm">
                    Company<span class="text-red">*</span>
                  </label>
                  
                  <select id="company" v-model="company" :class="inputStylingClass" required>
                    <option v-for="data in addCompanyData" :key="data.id" :value="data.id">
                      {{ data.company_name }}
                    </option>
                  </select>

                </div>

              </div>

              <div> 
                  
                <label for="jobband" class="block mb-2 font-JakartaSans font-medium text-sm">
                    Job Band<span class="text-red">*</span>
                </label>

                <!-- {{ jobBandData }} -->
                <!-- {{ jobBandArray }} -->
 
                <Multiselect
                    id="jobband"
                    v-model="jobBandArray"
                    mode="tags"
                    placeholder="Select companies"
                    track-by="band_job_name"
                    label="band_job_name"
                    :close-on-select="false"
                    :searchable="true"
                    :options="jobBandData"
                    required
                  >
                      
                      <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        
                        <div
                          class="multiselect-tag is-user"
                          :class="{
                            'is-disabled': disabled
                          }"
                        >
                          {{ option.band_job_name }}
                          <span
                            v-if="!disabled"
                            class="multiselect-tag-remove"
                            @click="handleTagRemove(option, $event)"
                          >
                            <span class="multiselect-tag-remove-icon"></span>
                          </span>
                        </div>

                      </template>

                  
                
                </Multiselect>

              </div>

              <!-- bagian bawah -->
          <!-- {{ dropdownRemoveList }}
          {{ currentAuthoritiesId }} -->

              <h1 class="font-medium mt-3">
                Approver Lines <span class="text-red-star">*</span>
              </h1>
              <hr class="border border-black">
      
              <!-- scroll nya di dalam kalau semua konten masuk di container ini -->
              <div class="overflow-x-auto block">

                <table class="table table-zebra table-compact border w-full rounded-lg">
        
                  <thead class="text-center font-Montserrat text-sm font-bold">

                    <tr class="">

                      <th>
                        <span class="flex justify-center">Level</span>
                      </th>

                      <th>
                        <span class="flex justify-center">Authorities</span>
                      </th>

                      <th>
                        <span class="flex justify-center">Approver Name</span>
                      </th>

                      <th>
                        <span class="flex justify-center">Notif Only</span>
                      </th>

                      <th>
                        <span class="flex justify-center">Flight</span>
                      </th>

                      <th>
                        <span class="flex justify-center">Min Amount</span>
                      </th>

                      <th>
                        <span class="flex justify-center">Max Amount</span>
                      </th>
                      
                      <th class="flex justify-center">
                        Actions
                      </th>

                    </tr>

                  </thead>
        
                  <tbody class="bg-[#F5F5F5]">
        
                    <tr class="text-center" v-for="(input, index) in approverLines" :key="`${index}`">
                      
                      <td v-if="input.id_approval_auth == ''">
                        0
                      </td>

                      <td v-else>
                        {{ index + 1 }}
                      </td>

                      <td class="hidden h-full" v-if="index+1 != 1 ? input.level = index+1 : input.level = 1">
                      </td>
        
                      <td>
                        
                        <select 
                          @change="fetchApproverName"
                          class="border border-black rounded-lg approver"
                          v-model="input.id_approval_auth" 
                          :id="index" 
                          :disabled="approverLines.length-1 > index ? true : false"
                        >
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

                      <td>
                        
                        <select class="w-full border border-black rounded-lg approver" v-model="input.approverName">
                          <option
                            v-for="name in addAuthoritiesNameData"
                            :key="name.sn_employee"
                          >
                            {{ name.employee_name }}
                          </option>
                        </select>

                      </td>

                      <td>
                        <input class="h-6 w-6" type="checkbox" v-model="input.is_notif_checkbox" :value="input.is_notif_checkbox === false ? input.is_notif = 0 : input.is_notif = 1" />
                      </td>

                      <td>
                        <input class="h-6 w-6" type="checkbox" v-model="input.is_flight_checkbox" :value="input.is_flight_checkbox === false ? input.is_flight = 0 : input.is_flight = 1" />
                      </td>

                      <td>
                        <input 
                          class="border border-black rounded-lg limited p-1" 
                          @input="formatCurrency('a', input)"
                          id="minCA"
                          v-model="input.show_min_ammount"
                          placeholder="Amount"
                        />
                      </td>

                      <td>
                        <input
                          class="border border-black rounded-lg limited p-1"
                          @input="formatCurrency('b', input)"
                          id="maxCA"
                          v-model="input.show_max_ammount"
                          placeholder="Amount"
                         />
                      </td>

                      <!-- absolut true -->
                      <td 
                        v-if="input.level != 'R' ? currentAuthoritiesId = input.id_approval_auth : ''" class="hidden h-full"
                      >
                      </td>
        
                      <td v-if="index+1 === approverLines.length" class="flex flex-wrap gap-4 justify-center">
                        <button type="button" @click="removeField(index, approverLines)">
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button>
                      </td>

                    </tr>
        
                    <tr class='text-center'>

                      <td></td>
                      <td></td>
                      <td></td>
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
  width: fit-content !important;
}

.approver {
  width: 100px !important;
  padding: 4px;
}

.limited {
  width: 100px !important;
}

</style>
