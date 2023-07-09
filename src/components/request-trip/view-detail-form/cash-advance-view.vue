<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    const props = inject('cashAdvanceDataView')
    const status = defineProps({
      isEditing: Boolean,
      currentIndex: Number,
      currentDetailIndex: Number
    })

    let name = localStorage.getItem('username')
    let grandTotal = ref()
    let notes = ref()

    let item = ref()
    let nominal = ref()
    let frequency = ref()
    let total = ref()
    let currency = ref()
    let remarks = ref()

    let caId = ref()
    let caDetailData = ref([])
    let currentAPIfetchData = ref()

    onBeforeMount(() => {
      fetchCashAdvanceDetailByRequestTripId()
    })

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
        
        grandTotal.value = props.value[status.currentIndex].grand_total
        // notes.value = caDetailData.value[status.currentIndex]

        item.value = caDetailData.value[status.currentIndex].item_name
        nominal.value = caDetailData.value[status.currentIndex].nominal
        frequency.value = caDetailData.value[status.currentIndex].frequency
        total.value = caDetailData.value[status.currentIndex].total
        currency.value = caDetailData.value[status.currentIndex].currency_name
        remarks.value = caDetailData.value[status.currentIndex].remarks
        caId.value = currentAPIfetchData.value.data.data[status.currentIndex].id
    }

    const assignDetailValue = () => {

    }

    watch(status, () => {
      assignValue()
      assignDetailValue()
    })

    watch(props, () => {
      if(props.value[0].grand_total !== undefined) {
        grandTotal.value = props.value[0].grand_total
        // notes.value = props.value[0]
      } else {
        assignValue()
      }
    })

    watch(caDetailData, () => {
      if(caDetailData.value[0].nominal !== undefined) {
        item.value = caDetailData.value[0].item_name
        nominal.value = caDetailData.value[0].nominal
        frequency.value = caDetailData.value[0].frequency
        total.value = caDetailData.value[0].total
        currency.value = caDetailData.value[0].currency_name
        remarks.value = caDetailData.value[0].remarks
        // caId.value = currentAPIfetchData.value.data.data[0].id
      } else {
        assignValue()
      }
    })

    if(props.value[0].grand_total !== undefined) {
        grandTotal.value = props.value[0].grand_total
        // notes.value = props.value[0]
    }

    // if(caDetailData.value[0].nominal !== undefined) {
    //     item.value = caDetailData.value[0].item_name
    //     nominal.value = caDetailData.value[0].nominal
    //     frequency.value = caDetailData.value[0].frequency
    //     total.value = caDetailData.value[0].total
    //     currency.value = caDetailData.value[0].currency_name
    //     remarks.value = caDetailData.value[0].remarks
    //     caId.value = currentAPIfetchData.value.data.data[0].id
    // }

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
              :disabled="!status.isEditing"
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
  
        <div class="mx-4">

          <h1 class="font-medium">Details Item</h1>

          <!-- <div>
            {{ caDetailData }}
          </div> -->

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
                :disabled="!status.isEditing"
                v-model="item"
              />
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
                :disabled="!status.isEditing"
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