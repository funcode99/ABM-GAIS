<script setup>
  import { Modal } from 'usemodal-vue3'
  
  import iconPlus from "@/assets/navbar/icon_plus.svg"
  import editIcon from "@/assets/navbar/edit_icon.svg"
  import deleteicon from "@/assets/navbar/delete_icon.svg"
  import checkIcon from '@/assets/checkmark.png'
  import closeIcon from '@/assets/close-window.png'

  import Multiselect from '@vueform/multiselect'

  import Api from '@/utils/Api'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"
 
  // tiap kali scrollTop error pasti itu karena ref nya belum di import
  import { ref, watch } from 'vue'

  import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
  import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
  import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
  import { useTravelManagementFetchResult } from "@/stores/fetch/travel-management"

  const formEditState = useFormEditStore()
  const referenceFetch = useReferenceFetchResult()
  const sysconfigFetch = useSysconfigFetchResult()
  const tmsFetch = useTravelManagementFetchResult()

  const props = defineProps({
    formContent: Array
  })

  let isVisible = ref(false)
  let modalPaddingHeight = '10vh'

  let matrixName = ref(props.formContent[0])
  let company = ref(props.formContent[1])
  let menu = ref(props.formContent[2])
  let document = ref(props.formContent[3])
  let idMatrix = props.formContent[4]
  let idMatrixActual = ref(null)
  let minCA = ref(props.formContent[6])
  let maxCA = ref(props.formContent[7])
  const emits = defineEmits(['changeMatrix', 'fetchApproval', 'editApprover'])
  
  let addCompanyData = ref([])
  let addDocumentData = ref([])
  let addAuthoritiesData = ref([])
  let addMenuData = ref([])

  
  const formattedMinCA = parseFloat(minCA.value)
  minCA.value = formattedMinCA.toLocaleString("id-ID")

  const formattedMaxCA = parseFloat(maxCA.value)
  maxCA.value = formattedMaxCA.toLocaleString("id-ID")
  
  let dropdownRemoveList = ref([])
  let authorities = ref('')
  let processedData = ref(props.formContent[4] || [])
  let approverLines = ref(processedData.value)

  let levelValue = ref()
  let currentAuthoritiesId = ref()  

  const rowClass = 'flex justify-between items-center gap-3 my-3'
  const columnClass = 'flex flex-col flex-1'
  const inputStylingClass ='py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

  // initialization for fetched approver lines with default property & value
    if(props.formContent[4] == undefined) {
      console.log('array detail tidak ada')
    } 
    else {
      idMatrix.map((item, index) => {
        item.isEdit = false
        item.fromFetch = true
        if(index == idMatrix.length-1) {
        }
        else {
          dropdownRemoveList.value.push(item.id_approval_auth)
        }
        if(item.is_flight === 1) {
          item.is_flight = true
        }
        else {
          item.is_flight = false
        }
        if(item.is_notif === 1) {
          item.is_notif = true
        }
        else {
          item.is_notif = false
        }
      })
      idMatrixActual.value = idMatrix[0].id_matrix
    }


    const saveField = () => {

        let minCAPost = minCA.value
        let maxCAPost = maxCA.value

        formEditState.approval.matrixName = matrixName.value
        formEditState.approval.companyId = company.value
        formEditState.approval.menuId = menu.value
        formEditState.approval.codeDocumentId = document.value
        formEditState.approval.minCA = minCAPost.replaceAll(".", "")
        formEditState.approval.maxCA = maxCAPost.replaceAll(".", "")

        isVisible.value = false
        
        emits('editApprover')

    }

    const saveApproverLines = async (data, idx, matrixId) => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.post('/approval/store_approval_detail', {
        id_matrix: matrixId,
        level: data[idx].level,
        id_approval_auth: data[idx].id_approval_auth,
        is_notif: data[idx].is_notif ? 1 : 0,
        is_flight: data[idx].is_flight ? 1 : 0
      })

      data[idx].forAdd = undefined
      console.log('approval telah ditambahkan!')
      emits('fetchApproval')

      const insertDefault = () => {
        approverLines.value = props.formContent[4]

        console.log(approverLines.value)

        if(props.formContent[4] == undefined) {
          console.log('array detail tidak ada')
        } 
        else {
          approverLines.value.map((item, index) => {

            item.isEdit = false
            item.fromFetch = true
              if(index == idMatrix.length-1) {
              }
              else {
                dropdownRemoveList.value.push(item.id_approval_auth) 
              }
          })
        }

      }
      setTimeout(insertDefault, 100)

    }

    const editApproverLines = async (data, idx, matrixId, id) => {
      console.log('masuk ke edit approver lines')

      const api = await Api.post(`/approval/update_data_approval_detail/${id}`, {
        id_matrix: matrixId,
        level: data[idx].level,
        id_approval_auth: data[idx].id_approval_auth,
        is_notif: data[idx].is_notif ? 1 : 0,
        is_flight: data[idx].is_flight ? 1 : 0
      })
      console.log(api)
      console.log('approval telah diubah!')
      emits('fetchApproval')
      console.log(approverLines.value)
      const insertDefault = () => {
        approverLines.value = props.formContent[4]

        if(props.formContent[4] == undefined) {
        console.log('array detail tidak ada')
        } 
        else {
        approverLines.value.map((item, index) => {
          item.isEdit = false
          item.fromFetch = true
            if(index == idMatrix.length-1) {
              // console.log('ini adalah index terakhir ' + index)
            }
            else {
              dropdownRemoveList.value.push(item.id_approval_auth) 
            }
        })
        // idMatrixActual.value = idMatrix[0].id_matrix
        }

      }
      setTimeout(insertDefault, 100)
    }

    const addField = (fieldType, isi) => {

            if(isi) {
              dropdownRemoveList.value.push(isi)
            }

            fieldType.push({
              id_approval_auth : authorities.value,
              level: levelValue.value,
              forAdd: false,
              is_notif: false,
              is_flight: false
              // approverName : ''
            })

    }

    const removeField = async (index, fieldType) => {

      if(fieldType[index].id_detail) {
        
        console.log('masuk ke api')
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/approval/delete_data_approval_detail/${fieldType[index].id_detail}`)

        console.log('approval berhasil dihapus')
        emits('fetchApproval')
        
      } else {
        console.log('tidak masuk ke api')
      }

      fieldType.splice(index, 1)
      dropdownRemoveList.value.splice(index-1, 1)
      dropdownRemoveList.value.splice(index+1, 1)
    
    }

    const formatCurrency = (argument) => {
        if(argument === 'a') {
          
          minCA.value = minCA.value.replace(/\D/g, "")

          if (minCA.value === "" || minCA.value === "0") {
          minCA.value = ""
          } else {
            const formattedMinCA = parseFloat(minCA.value.replace(/\./g, ""));
            minCA.value = formattedMinCA.toLocaleString("id-ID");
            }

        }
        if(argument === 'b') {
          
          maxCA.value = maxCA.value.replace(/\D/g, "")

          if (maxCA.value === "" || maxCA.value === "0") {
          maxCA.value = ""
          } else {
          const formattedMaxCA = parseFloat(maxCA.value.replace(/\./g, ""));
          maxCA.value = formattedMaxCA.toLocaleString("id-ID");
            }

        }
    }

    watch(isVisible, () => {

      fetchJobBand()

      addCompanyData.value = referenceFetch.fetchCompanyResult
      addMenuData.value = sysconfigFetch.fetchMenuResult
      addAuthoritiesData.value = sysconfigFetch.fetchApproverAuthoritiesResult
      addDocumentData.value = tmsFetch.fetchDocumentCodeResult
    
    })

    let jobBandData = ref([])
    let jobBandArray = ref(props.formContent[8])

    const fetchJobBand = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/company/get_band_job/${localStorage.getItem('id_company')}`)
      jobBandData.value = api.data.data
      jobBandData.value.map((item) => {
        item.value = item.band_job_name
      })

    }

</script>

<template>
  
  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="edit icon">
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight"> 
  
    <main>

      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit Matrix Approval"
      />

      <form class="modal-box-inner-inner px-3" @submit.prevent="saveField">

        <div class="my-3 text-left">
            
          <div class="mb-3 text-left w-full">
              <label
              for="matrix_name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
                >Nama Matrix<span class="text-red">*</span></label
              >
              <input
                id="matrix_name"
                v-model="matrixName"
                type="text"
                placeholder="Nama Matrix"
                :class="inputStylingClass"
                required
              />
          </div>
    
          <div class="mb-3 flex items-center text-left">
            <div class="flex flex-col w-full">
              <label for="menu" class="block mb-2 font-JakartaSans font-medium text-sm">
                Menu<span class="text-red">*</span>
              </label>
              <select id="menu" v-model="menu" :class="inputStylingClass">
                <option v-for="data in addMenuData" :key="data.id" :value="data.id">
                  {{ data.menu }}
                </option>
              </select>
            </div>
          </div>
  
          <div class="mb-3 flex items-center text-left">

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

          <!-- <div :class="rowClass">

              <div :class="columnClass">
                <label for="minCA">
                      Minimum Amount (CA)
                </label>
                <input
                  @input="formatCurrency('a')"
                  id="minCA"
                  v-model="minCA"
                  placeholder="Amount"
                  :class="inputStylingClass"
                />
              </div>

              <div :class="columnClass">
                <label for="maxCA">
                      Maximum Amount (CA)
                </label>
                <input
                  @input="formatCurrency('b')"
                  id="maxCA"
                  v-model="maxCA"
                  placeholder="Amount"
                  :class="inputStylingClass"
                />
              </div>

          </div> -->
  
          <div class="mb-3 flex items-center text-left">

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

          <div class="mb-3 flex items-center text-left">

            <div class="flex flex-col w-full">

              <label for="jobband" class="block mb-2 font-JakartaSans font-medium text-sm">
                Job Band<span class="text-red">*</span>
              </label>

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

          </div>

          
        </div>

        <!-- approver lines area -->
        <div>

          <h1 class="font-medium text-left">Approver Lines <span class="text-red-star">*</span> </h1>
          <hr class="border border-black">
  
          <div class="overflow-x-auto block">

            <table class="table table-zebra table-compact border w-full rounded-lg"
            >
    
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
  
                  <!-- sudah betul -->
                  <td v-if="input.level == undefined ? input.level = input.id_approval_auth : ''">
                    0
                  </td>

                  <td v-else>
                    {{ index + 1 }}
                  </td>

                  <td class="hidden h-full" v-if="index+1 != 1 ? input.level = index+1 : input.level = 1">
                  </td>

                  <td>
                    <select 
                      v-model="input.id_approval_auth" 
                      class="border border-black rounded-lg approver"
                      :id="index" 
                      :disabled="input.isEdit == false ? true : false"
                    >
                      <option v-for="data in addAuthoritiesData" :key="data.id" :value="data.id" :hidden="dropdownRemoveList.includes(data.id) ? true : false">
                          {{ data.auth_name }}
                      </option>
                    </select>
                  </td>
    
                  <td v-if="input.level != 'R' ? currentAuthoritiesId = input.id_approval_auth : ''" class="hidden h-full">
                  </td>
    
                  <td>
                    <!-- <input type="text" class="px-2 border border-black approver" v-model="input.approverName" /> -->


                    <select 
                      class="w-full border border-black rounded-lg approver" 
                      v-model="input.approverName"  
                    >
                      
                      <option
                        disabled
                        :class="inputStylingClass"
                        v-for="name in approverLines[index].employee"
                      >
                        {{ name }}
                      </option>

                    </select>
                    
                  </td>

                  <td>
                    <input 
                      :disabled="input.isEdit == false ? true : false"
                      v-model="approverLines[index].is_notif"
                      class="h-6 w-6" 
                      type="checkbox"
                      id="is_notif"
                    />
                  </td>
                  <td>
                    <input 
                      :disabled="input.isEdit == false ? true : false"
                      v-model="approverLines[index].is_flight"
                      class="h-6 w-6" 
                      type="checkbox"
                      id="is_flight"
                    />
                  </td>

                  <td>
                    <input 
                      class="border border-black rounded-lg limited p-1" 
                      @input="formatCurrency('a', input)"
                      id="minCA"
                      v-model="approverLines[index].min_ammount"
                      placeholder="Amount"
                      :disabled="input.isEdit == false ? true : false"
                    />
                  </td>

                  <td>
                    <input
                      class="border border-black rounded-lg limited p-1"
                      @input="formatCurrency('b', input)"
                      id="maxCA"
                      v-model="approverLines[index].max_ammount"
                      placeholder="Amount"
                      :disabled="input.isEdit == false ? true : false"
                    />
                  </td>

                  <td class="flex flex-wrap gap-4 justify-center" >

                    <div class="h-6"></div>

                    <button v-if="input.fromFetch == true && input.isEdit == false" type="button" 
                      :class="approverLines.length-1 > index ? 'hidden' : '' "
                      @click="input.isEdit = true" 
                    >
                      <img :src="editIcon" class="w-6 h-6" />
                    </button>
                    
                    <button v-if="input.fromFetch == true && input.isEdit == false" type="button" @click="removeField(index, approverLines)" :class="approverLines.length-1 > index ? 'hidden' : '' " >
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>

                    <!-- <h1 v-if="input.isEdit == true"> confirm for edit api</h1> -->
                    <button v-if="input.isEdit == true" type="button" @click="editApproverLines(approverLines, index, idMatrixActual, input.id_detail) ">
                      <img :src="checkIcon" class="w-5 h-5" />
                    </button>

                    <button v-if="input.isEdit == true" type="button" @click="input.isEdit = false">
                      <img :src="closeIcon" class="w-5 h-5" />
                    </button>

                    <!-- @click="input.forAdd = true" -->
                    <button 
                      v-if="input.forAdd == false" 
                      type="button"
                      @click="saveApproverLines(approverLines, index, idMatrixActual)"
                    >
                      <img :src="checkIcon" class="w-5 h-5" />
                  </button>
                  <!-- <img :src="editIcon" class="w-6 h-6" /> for Add false -->

                    <button 
                      v-if="input.forAdd == false" 
                      type="button"
                      @click="removeField(index, approverLines)"
                    >
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>

                    <!-- <h1 v-if="input.forAdd == true"> confirm for add api</h1> -->
                    <button 
                      v-if="input.forAdd == true" 
                      type='button'
                    >
                       for Add true
                    </button>

                    <button v-if="input.forAdd == true" type='button' 
                      @click="input.forAdd = false">
                      <img :src="closeIcon" class="w-5 h-5" />
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
  --tw-scale-x: 0.98;
  --tw-scale-y: 0.95;
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
  /* max-width: 600px !important;  */
}

.approver {
  width: 100px !important;
  padding: 4px;
}

.limited {
  width: 100px !important;
}

</style>
