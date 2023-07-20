<script setup>

    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonAddFormView from '@/components/atomics/buttonAddFormView.vue'

    import deleteDocumentIcon from '@/assets/delete_document_icon.png'

    const status = defineProps({
      isEditing: Boolean,
      currentIndex: Number,
      typeOfSubmitData: String
    })

    const props = inject('cashAdvanceDataView')
    const emits = defineEmits('fetchCashAdvance', 'resetTypeOfSubmitData')

    let currentDetailIndex = ref(1)

    let name = localStorage.getItem('username')
    let grandTotal = ref()
    let notes = ref()

    let item = ref()
    let itemId = ref(1)
    let nominal = ref()
    let frequency = ref()
    let total = ref()
    let currency = ref()
    let remarks = ref()

    let caId = ref()
    let caDetailData = ref([{}])
    let currentAPIfetchData = ref()

    onBeforeMount(() => {
      fetchCashAdvanceDetailByRequestTripId()
    })

    const fetchCurrency = async () => {

      const token = JSON.parse(localStorage.getItem("token"))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get("currency")
      listCurrency.value = api.data.data

    }

    const fetchCashAdvanceDetailByRequestTripId = async () => {
      const token = JSON.parse(localStorage.getItem("token"))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/cash_advance/get_by_trip_id/${localStorage.getItem('tripIdView')}`)
      currentAPIfetchData.value = api
      caId.value = currentAPIfetchData.value.data.data[status.currentIndex].id
    }

    const fetchCashAdvanceDetailByCashAdvanceId = async () => {

      const token = JSON.parse(localStorage.getItem("token"))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/cash_advance/get_by_cash_id/${caId.value}`)
      caDetailData.value = api.data.data

    }

    // jangan pakai caId.value coeg
    watch(caId, () => {
      fetchCashAdvanceDetailByCashAdvanceId()
    })

    const assignValue = () => {
        // CA Travel Header
        grandTotal.value = props.value[status.currentIndex].grand_total
        // notes.value = caDetailData.value[status.currentIndex]

        // CA Detail by CA ID (CA ID nya berubah)
        caId.value = currentAPIfetchData.value.data.data[status.currentIndex].id
    }

      let idItemCA = ref()
      let idCA = ref()
      let idCostCenter = ref()
  
      let currentDetailNumber = ref(0)

    const assignDetailValue = (ItemNumber) => {

        // ini untuk ganti CA Detail dengan CA ID yang sama
        // console.log(caDetailData.value)
        ItemNumber === 0 ? currentDetailNumber.value = ItemNumber : currentDetailNumber.value = ItemNumber-1
        item.value = caDetailData.value[currentDetailNumber.value].nama_item
        nominal.value = caDetailData.value[currentDetailNumber.value].nominal
        frequency.value = caDetailData.value[currentDetailNumber.value].frequency
        total.value = caDetailData.value[currentDetailNumber.value].total
        currency.value = caDetailData.value[currentDetailNumber.value].currency_name
        remarks.value = caDetailData.value[currentDetailNumber.value].remarks
        selectedCADetailId.value = caDetailData.value[currentDetailNumber.value].id
        idCA.value = caDetailData.value[currentDetailNumber.value].id_ca
        idItemCA.value = caDetailData.value[currentDetailNumber.value].id_item_ca
        idCostCenter.value = caDetailData.value[currentDetailNumber.value].id_cost_center

    }

    const resetValue = () => {
      grandTotal.value = props.value[0].grand_total
      // notes.value = props.value[0]
    }

    let selectedCADetailId = ref()

    const resetDetailValue = () => {
      
      item.value = caDetailData.value[0].nama_item
      nominal.value = caDetailData.value[0].nominal
      frequency.value = caDetailData.value[0].frequency
      total.value = caDetailData.value[0].total
      currency.value = caDetailData.value[0].currency_name
      remarks.value = caDetailData.value[0].remarks
      selectedCADetailId.value = caDetailData.value[0].id
      idItemCA.value = caDetailData.value[0].id_item_ca
      idCA.value = caDetailData.value[0].id_ca
      // idCostCenter.value = caDetailData.value[0].id_cost_center

    }

    watch(status, () => {
        
        if (status.typeOfSubmitData === 'Edit') {
            updateCashAdvance()
        }
        else if (status.typeOfSubmitData === 'Submit Add') {
            addCashAdvance()
        }
        else if (status.typeOfSubmitData === 'Delete') {
            deleteCashAdvance()
        }
        else if (status.typeOfSubmitData === 'Add') {
            resetValue()
        }
        else {
            assignValue()
        }

    })

    const addCADetail = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      
      const api = await Api.post(`/cash_advance/store_detail`, {
        
        id_ca: idCA.value,
        id_item_ca: idItemCA.value,
        frequency: frequency.value,
        nominal: nominal.value,
        total: total.value,
        remarks: remarks.value

      })

      console.log(api)
      emits('fetchCashAdvance')
      emits('resetTypeOfSubmitData')
      fetchCashAdvanceDetailByCashAdvanceId()

    }

    const editCADetail = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      const api = await Api.post(`/cash_advance/update_data_detail/${selectedCADetailId.value}`, {

        id_ca: idCA.value,
        id_item_ca: idItemCA.value,
        frequency: frequency.value,
        nominal: nominal.value,
        total: total.value,
        remarks: remarks.value

      })

      console.log(api)
      emits('fetchCashAdvance')
      emits('resetTypeOfSubmitData')
      fetchCashAdvanceDetailByCashAdvanceId()

    }

    const emptyCADetail = async () => {

      frequency.value = 0
      nominal.value = 0
      total.value = 0
      remarks.value = ''

    }

    const deleteCADetail = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/cash_advance/delete_data_detail/${selectedCADetailId.value}`)

      console.log(api)
      emits('fetchCashAdvance')
      emits('resetTypeOfSubmitData')
      fetchCashAdvanceDetailByRequestTripId()
      fetchCashAdvanceDetailByCashAdvanceId()

    }

    watch(props, () => {
      if(props.value[0].grand_total !== undefined) {


      } else {
        assignValue()
      }
    })

    watch(caDetailData, () => {
      
      if(caDetailData.value[0].nominal !== undefined) {
        resetDetailValue()
      } else {
        assignValue()
      }
      
    })

    if(props.value[0].grand_total !== undefined) {
        grandTotal.value = props.value[0].grand_total
        // notes.value = props.value[0]
    }

    let isAddingDetail = ref(false)
    watch(isAddingDetail, () => {
      isAddingDetail.value === true ? emptyCADetail() : assignDetailValue(currentDetailNumber.value)
    })

    watch(frequency, () => {
      
        // console.log(typeof frequency.value)
        
        if(typeof frequency.value === 'string') {
          frequency.value = frequency.value.replace(/\D/g, "")
        }
        
        if(typeof nominal.value === 'string' && typeof frequency.value === 'string') {
            total.value = nominal.value * frequency.value
        }

    })    

    watch(nominal, () => {
        
        if(typeof nominal.value === 'string') {
          nominal.value = nominal.value.replace(/\D/g, "")
        }

        if(typeof nominal.value === 'string' && typeof frequency.value === 'string') {
            total.value = nominal.value * frequency.value
        }

    })

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const rowClassStart = 'flex justify-between mx-4 items-start gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
    
</script>

<template>

      <div>
  
        <div :class="rowClass">
          
          <div :class="columnClass">
            <label>Traveller</label>
            <input 
              v-model="name" 
              :class="inputStylingClass" 
              placeholder="Name" 
              :disabled="!status.isEditing"
              />
          </div>
  
          <div :class="columnClass">
            <label>Grand Total</label>
            <input 
              v-model="grandTotal" 
              :class="inputStylingClass" 
              placeholder="Grand Total"
              disabled
            />
          </div>
  
          <div :class="columnClass">
            
          </div>
  
        </div>
  
        <div :class="rowClass">
          
          <div :class="columnClass">
            
            <label :class="labelStylingClass">
              Notes  
            </label>
            
            <textarea 
              :class="inputStylingClass" 
              placeholder="Notes" 
              :disabled="!status.isEditing"></textarea>
          
          </div>
  
          <div></div>
          <div></div>
  
        </div>

        <!-- {{ caDetailData }} -->
  
        <div class="mx-4 flex items-center">
            
          <h1 class="font-medium mr-10">Details Item</h1>

          <div class="flex gap-2">

            <buttonEditFormView @click="editCADetail" v-if="!isAddingDetail && status.isEditing" />
            <buttonAddFormView @click="isAddingDetail = true" v-if="!isAddingDetail && status.isEditing" />

            <buttonAddFormView v-if="isAddingDetail" @click="addCADetail" />

            <button

              v-if="isAddingDetail" 
              @click="isAddingDetail = false" 
              class="bg-red-star text-white rounded-lg text-base py-[5px] px-[18px] font-bold"

            >
              Cancel
            </button>

            <div class="flex items-center gap-4 ml-8">
              <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
                Showing {{ currentDetailIndex }} 
                of {{ caDetailData.length }} entries
              </p>
  
              <vue-awesome-paginate
                :total-items="caDetailData.length"
                :items-per-page="1"
                :on-click="assignDetailValue"
                v-model="currentDetailIndex"
                :max-pages-shown="3"
                :show-breakpoint-buttons="false"
                :show-jump-buttons="true"
              />
            </div>
            
          </div>

          <div class="flex-1"></div>

          <button 
            class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold items-center flex gap-2"
            @click="deleteCADetail"
          >
            <img :src="deleteDocumentIcon" class="w-6 h-6" />
            Delete
          </button>

          <hr class="border border-black" />
          
        </div>
  
        <form @submit.prevent="">
  
          <div :class="rowClass">
            
            <div :class="columnClass">
              
              <label :class="labelStylingClass">
                Item <span class="text-red-star">*</span>
              </label>
              
              <input 
                :class="inputStylingClass" 
                placeholder="Item" 
                v-if="!status.isEditing"
                v-model="item"
                disabled
              />

              <select v-if="status.isEditing" :class="inputStylingClass" v-model="itemId">
                
                <option value="1">Meals</option>
                <option value="2">Transport</option>
                <option value="3">Others</option>

              </select>

            </div>
            
            <div :class="columnClass">
              <label :class="labelStylingClass">
                Nominal <span class="text-red-star">*</span>
              </label>
              <input 
                :class="inputStylingClass" 
                placeholder="Nominal"
                :disabled="!status.isEditing"
                v-model="nominal"
              />
            </div>
  
            <div :class="columnClass"></div>
  
          </div>
          
          <div :class="rowClass">
          
            <div :class="columnClass">
              <label :class="labelStylingClass">
                Frequency<span class="text-red-star">*</span>
              </label>
              <input 
                :class="inputStylingClass" 
                placeholder="Frequency"
                :disabled="!status.isEditing"
                v-model="frequency"
              />
            </div>
            
            <div :class="columnClass">
              <label :class="labelStylingClass">
                Total
              </label>
              <input 
                :class="inputStylingClass" 
                placeholder="Total" 
                disabled
                v-model="total"
              />
            </div>
  
            <div :class="columnClass"></div>
  
          </div>
          
          <div :class="rowClassStart">
          
            <div :class="columnClass">
  
              <label :class="labelStylingClass">
                Currency<span class="text-red-star">*</span>
              </label>
  
              <!-- <select :class="inputStylingClass" :disabled="!status.isEditing" v-model="currency">
                <option :value="currency">
                  
                </option>
              </select> -->

              <input :class="inputStylingClass" v-model="currency" type="text" disabled />
            
            </div>
  
            <div :class="columnClass">
              
              <label :class="labelStylingClass">
                Remarks<span class="text-red-star">*</span>
              </label>
  
              <textarea 
                :class="inputStylingClass" 
                placeholder="Remarks" 
                :disabled="!status.isEditing"
                v-model="remarks"
                ></textarea>
  
            </div>
  
            <div :class="columnClass"></div>
  
          </div>
  
        </form>
  
      </div>

</template>

<style scoped>

</style>