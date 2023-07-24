<script setup>

    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonAddFormView from '@/components/atomics/buttonAddFormView.vue'
    import buttonCancelFormView from '@/components/atomics/buttonCancelFormView.vue'

    import deleteDocumentIcon from '@/assets/delete_document_icon.png'

    // submitNewCAStatus: Boolean,
    const status = defineProps({
      showCreateCAHeader: Boolean,
      isHeaderExist: Boolean,
      isAddingFromRequestTrip: Boolean,
      isEditingFromRequestTrip: Boolean,
      currentIndex: Number,
      typeOfSubmitData: String
    })

    const props = inject('cashAdvanceDataView')
    const emits = defineEmits(['fetchCashAdvance', 'resetTypeOfSubmitData'])

    let currentDetailIndex = ref(1)
    let caId = ref()
    let caDetailData = ref([{}])
    let currentAPIfetchData = ref()
    let idForSubmitCADetail = ref()
    let selectedCADetailId = ref()
    let isAddingDetail = ref(false)
    let idCA = ref()
    let idItemCA = ref()
    let currentDetailNumber = ref(0)
    let listCurrency = ref()

    let name = localStorage.getItem('username')
    let grandTotal = ref(0)

    let item = ref()
    let itemId = ref([1, 'Meals'])
    let nominal = ref()
    let frequency = ref()
    let total = ref()
    let currency = ref()
    let currencyId = ref([0, ''])
    let remarks = ref()
    let headerRemarks = ref()
    let headerId = ref(0)

    let arrayDetail = ref([])
    let arrayDetailForm = ref([])

    onBeforeMount(() => {

      fetchCashAdvanceDetailByRequestTripId()
      fetchCurrency()

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
      
        try {
          const api = await Api.get(`/cash_advance/get_by_trip_id/${localStorage.getItem('tripIdView')}`)
          currentAPIfetchData.value = api
          caId.value = currentAPIfetchData.value.data.data[status.currentIndex].id
        } catch (error) {
          console.log(error)
        }

    }

    const fetchCashAdvanceDetailByCashAdvanceId = async () => {

      const token = JSON.parse(localStorage.getItem("token"))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/cash_advance/get_by_cash_id/${caId.value}`)
      caDetailData.value = api.data.data

    }

    const assignValue = () => {

        console.log('masuk ke assign value')

        // CA Travel Header
        headerId.value = props.value[status.currentIndex].id
        grandTotal.value = props.value[status.currentIndex].grand_total
        headerRemarks.value = props.value[status.currentIndex].remarks
        currencyId.value[0] = props.value[status.currentIndex].id_currency
        currencyId.value[1] = props.value[status.currentIndex].currency_name

        // CA Detail by CA ID (CA ID nya berubah)
        if(currentAPIfetchData.value !== undefined) {
          caId.value = currentAPIfetchData.value.data.data[status.currentIndex].id
        } else {
          console.log('masuk ke assign value')
          // console.log('isi nya undefined')
          // console.log(props.value)
        }

    }

    const assignDetailValue = (ItemNumber) => {

        // ini untuk ganti CA Detail dengan CA ID yang sama
        // console.log(caDetailData.value)
        ItemNumber === 0 ? currentDetailNumber.value = ItemNumber : currentDetailNumber.value = ItemNumber-1
        item.value = caDetailData.value[currentDetailNumber.value].nama_item
        nominal.value = parseInt(caDetailData.value[currentDetailNumber.value].nominal)
        frequency.value = caDetailData.value[currentDetailNumber.value].frequency
        total.value = caDetailData.value[currentDetailNumber.value].total
        currency.value = caDetailData.value[currentDetailNumber.value].currency_name
        remarks.value = caDetailData.value[currentDetailNumber.value].remarks
        selectedCADetailId.value = caDetailData.value[currentDetailNumber.value].id
        idCA.value = caDetailData.value[currentDetailNumber.value].id_ca
        idItemCA.value = caDetailData.value[currentDetailNumber.value].id_item_ca
        idForSubmitCADetail.value = caDetailData.value[currentDetailNumber.value].id

    }

    const assignArrayDetailValue = (ItemNumber) => {
      // console.log(ItemNumber)
      currentArrayDetailIndex.value = ItemNumber
    }

    const resetValue = () => {
      
      headerId.value = props.value[0].id
      headerRemarks.value = props.value[0].remarks
      grandTotal.value = props.value[0].grand_total
      currencyId.value[0] = props.value[0].id_currency
      currencyId.value[1] = props.value[0].currency_name

    }

    const emptyCAHeader = () => {
      headerRemarks.value = ''
      grandTotal.value = 0
      currencyId.value = [0, '']
    }

    const resetDetailValue = () => {
      
      item.value = caDetailData.value[0].nama_item
      nominal.value = parseInt(caDetailData.value[0].nominal)
      frequency.value = caDetailData.value[0].frequency
      total.value = caDetailData.value[0].total
      currency.value = caDetailData.value[0].currency_name
      remarks.value = caDetailData.value[0].remarks
      selectedCADetailId.value = caDetailData.value[0].id
      idItemCA.value = caDetailData.value[0].id_item_ca
      idCA.value = caDetailData.value[0].id_ca

    }

    const addCAHeader = async () => {

      if(arrayDetail.value.length === 0) {
        alert('Tolong isi detail item Cash Advance di bawah ini')
      }
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      console.log('masuk ke add ca header')

      const api = await Api.post(`/cash_advance/store`, {
        type_ca: 1,
        id_employee: localStorage.getItem('id_employee'),
        id_request_trip: localStorage.getItem('tripIdView'),
        id_currency: currencyId.value[0],
        remarks: headerRemarks.value,
        grand_total: grandTotal.value,
        array_detail: arrayDetail.value,
      })

      console.log(api)
      emits('fetchCashAdvance')
      emits('resetTypeOfSubmitData')

    }

    const editCAHeader = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      // let value = 0

      // caDetailData.value.map((item) => {
      //   value += parseInt(item.total)
      // })

      // grandTotal.value = value

      const api = await Api.post(`/cash_advance/update_data/${headerId.value}` , {
        
        id_employee: localStorage.getItem('id_employee'),
        id_request_trip: localStorage.getItem('tripIdView'),
        id_currency: currencyId.value[0],
        remarks: headerRemarks.value,
        grand_total: grandTotal.value

      })

      console.log(api)

    }

    const deleteCAHeader = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/cash_advance/delete_data/${headerId.value}`)

      emits('fetchCashAdvance')
      emits('resetTypeOfSubmitData')
      fetchCashAdvanceDetailByRequestTripId()
      fetchCashAdvanceDetailByCashAdvanceId()

    }

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
      

      if(JSON.stringify(props) === '[{}]' ) {

      } else {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
  
        console.log(caDetailData.value.map((item) => {
          console.log(item.id)
          return item.id !== idForSubmitCADetail.value
        }))
      
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
        
        // editCAHeader()
      }


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
      
      editCAHeader()

    }

    // berguna saat ingin menambah ca detail baru
    const emptyCADetail = () => {

      frequency.value = 0
      nominal.value = 0
      total.value = 0
      remarks.value = ''
      
    }

    watch(status, () => {

        console.log('perubahan di status')
        
        if (status.typeOfSubmitData === 'Edit') {
            editCAHeader()
        }
        else if (status.typeOfSubmitData === 'Add') {
            addCAHeader()
        }
        else if (status.typeOfSubmitData === 'Delete') {
            deleteCAHeader()
        }
        else if (status.typeOfSubmitData === 'Empty') {
          console.log('masuk ke status empty')
            emptyCAHeader()
            emptyCADetail()
        }
        else if (status.typeOfSubmitData === 'Reset') {
            console.log('masuk ke status reset')
            resetValue()
            resetDetailValue()
        }
        else {
            assignValue()
        }

        if(status.showCreateCAHeader === false) {
          arrayDetail.value = []
        }

    })
    
    watch(props, () => {

      console.log('perubahan di props')
      
      if(props.value[0].grand_total !== undefined) {
        resetValue()
      }
      else {
        assignValue()
      } 

    })

    watch(caDetailData, () => {

      // console.log(caDetailData.value.length == 0)
      console.log('perubahan di caDetailData')
      
      if(caDetailData.value.length !== 0) {
        resetDetailValue()
      } else {
        assignValue()
      }
      
    })

    watch(isAddingDetail, () => {

      console.log('perubahan di isAddingDetail')

      isAddingDetail.value === true ? emptyCADetail() : assignDetailValue(currentDetailNumber.value)
    })

    // untuk menghitung total dari frequency & nominal
    watch(frequency, () => {

      console.log('perubahan di frequency')
        
        if(typeof nominal.value === 'number' && typeof frequency.value === 'number') {
            total.value = nominal.value * frequency.value
        }

    })    

    // untuk menghitung total dari frequency & nominal
    watch(nominal, () => {

      console.log('perubahan di nominal')

        if(typeof nominal.value === 'number' && typeof frequency.value === 'number') {
            total.value = nominal.value * frequency.value
        }

    })

    // jangan pakai caId.value coeg
    watch(caId, () => {

      console.log('perubahan di caId')

      fetchCashAdvanceDetailByCashAdvanceId()
    })

    if(props.value[0].grand_total !== undefined) {
       resetValue()
    }

    const addToArrayDetail = () => {

      console.log('masuk ke array detail')

      if(currencyId.value[1] === '') {
        alert('Silahkan pilih currency terlebih dahulu')
      } else {
        
        arrayDetailForm.value = {
              id_item_ca: itemId.value[0],
              item_name: itemId.value[1],
              frequency: frequency.value,
              nominal: nominal.value,
              total: total.value,
              remarks: remarks.value,
        }

        console.log(typeof grandTotal.value)
        
        if(grandTotal.value === 'NaN') {
          grandTotal.value = 0
        } else if (typeof grandTotal.value !== 'number') {
          grandTotal.value = 0
        }

        grandTotal.value += arrayDetailForm.value.total
        arrayDetail.value.push(arrayDetailForm.value)
        arrayDetailForm.value = {}

      }

    }

    const editArrayDetail = () => {
      
      arrayDetail.value[currentArrayDetailIndex.value-1] = {
        id_item_ca: itemId.value[0],
        item_name: itemId.value[1],
        frequency: frequency.value,
        nominal: nominal.value,
        total: total.value,
        remarks: remarks.value,
      }

    }

    const deleteArrayDetail = () => {
      arrayDetail.value.splice(currentArrayDetailIndex.value-1, 1)
    }

    let currentArrayDetailIndex = ref(1)

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const rowClassStart = 'flex justify-between mx-4 items-start gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

    const tableHeadCashAdvance = [
        {id: 1, title: 'Item'},
        {id: 2, title: 'Frequency'},
        {id: 3, title: 'Currency'},
        {id: 4, title: 'Nominal'},
        {id: 5, title: 'Total'},
        {id: 6, title: 'Remarks'}
    ]
    
</script>

<template>

      <div>

        <!-- {{ arrayDetail }} -->
        <!-- {{ grandTotal }} -->

        <!-- untuk Add ca header -->
        <form @submit.prevent="">

          <slot></slot>
          
          <!-- Abaikan, ini seharusnya semua disabled -->
          <div :class="rowClass">
            
            <!-- Traveller sudah seharusnya disabled -->
            <div :class="columnClass">
              
              <label :class="labelStylingClass">
                Traveller
              </label>
  
              <input 
                v-model="name" 
                :class="inputStylingClass" 
                placeholder="Name" 
                disabled
              />
  
            </div>

            <!-- Grand Total sudah seharusnya disabled -->
            <div :class="columnClass">
              <label :class="labelStylingClass">Grand Total {{ grandTotal }}</label>
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
            
            <!-- Notes Remarks Header -->
            <div :class="columnClass">
              
              <label for="notes" :class="labelStylingClass">
                Notes  
              </label>
              
              <textarea
                id="notes"
                v-model="headerRemarks"
                :class="inputStylingClass" 
                placeholder="Notes"
                :disabled="!status.showCreateCAHeader" 
                ></textarea>
                <!-- :disabled="!status.isEditingFromRequestTrip" -->
            
            </div>
    
            <!-- Currency -->
            <div :class="columnClass">
    
              <label for="currency" :class="labelStylingClass">
                Currency<span class="text-red-star">*</span> {{ currencyId }}
              </label>
  
              <select
                required
                id="currency"
                v-if="isAddingDetail || (status.isEditingFromRequestTrip && JSON.stringify(props[0]) === '{}')" 
                :class="inputStylingClass" 
                v-model="currencyId"
                :disabled="!status.showCreateCAHeader"
              >
  
                <option v-for="data in listCurrency" :key="data.id" :value="[data.id, data.currency_name]">
                    {{ data.currency_name }}
                </option>
  
              </select>

              <select
              required
                id="currency"
                v-if="isAddingDetail || (status.isEditingFromRequestTrip && JSON.stringify(props[0]) !== '{}')" 
                :class="inputStylingClass" 
                v-model="currencyId"
                :disabled="!status.showCreateCAHeader"
              >
                <option v-for="data in listCurrency" :key="data.id" :value="[data.id, data.currency_name]">
                  {{ data.currency_name }}
                </option>
              </select>
  
              <input v-if="!status.isEditingFromRequestTrip" :class="inputStylingClass" v-model="currency" type="text" disabled />
  
            </div>
  
            <div :class="columnClass"></div>
    
          </div>

        </form>
  
        <!-- untuk CRUD ca detail -->
        <form @submit.prevent="">

          <!-- Tempat Segala Button Ada disini -->
          <div class="mx-4 flex items-center">
            
            <h1 class="font-medium mr-10">Details Item</h1>
  
            <!-- tempat button CRUD detail -->
            <div class="flex gap-2">
  
              <!-- bisa di edit kalo header nya ga kosong, kalo header kosong pasti detail nya juga kosong -->
              <!-- menggunakan '&' dan '&&' hasil nya sama saja -->
              <buttonEditFormView 
              @click="editArrayDetail" 
              v-if="status.showCreateCAHeader & arrayDetail.length > 0"
              />

              <buttonEditFormView  
                @click="editCADetail"
                v-if="JSON.stringify(props) !== '[{}]' & !status.showCreateCAHeader"
              />

  
              <!-- untuk confirm add -->
              <buttonAddFormView
                title="Create CA Detail"
                v-if="status.showCreateCAHeader"
                @click=addToArrayDetail
              />
  
              <!-- untuk submit add detail saat header nya ada -->
              <buttonAddFormView 
              title="Add CA Detail"
              v-if="JSON.stringify(props) !== '[{}]' & !status.showCreateCAHeader" 
              @click="addCADetail"
              />
  
              <!-- untuk submit add detail saat header nya kosong -->
              <buttonAddFormView 
                title="Create Cash Advance Detail"
                v-if="isAddingDetail && JSON.stringify(props) === '[{}]' & status.isEditingFromRequestTrip" 
                @click="addToArrayDetail"
              />
  
              <buttonCancelFormView 
                v-if="isAddingDetail & status.isEditingFromRequestTrip" 
                @click="isAddingDetail = false"
              />
  
              <!-- v-if="!isAddingDetail && JSON.stringify(props) !== '[{}]' "  -->
              <div 
                v-if="JSON.stringify(props) !== '[{}]' "
                class="flex items-center gap-4 ml-8"
              >
  
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

              <div 
                v-if="JSON.stringify(props) === '[{}]' "
                class="flex items-center gap-4 ml-8"
              >
  
                <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
                  Showing {{ arrayDetail.length === 0 ? 0 : currentArrayDetailIndex }} 
                  of {{ arrayDetail.length }} entries
                </p>
    
                <vue-awesome-paginate
                  :total-items="arrayDetail.length"
                  :items-per-page="1"
                  v-model="currentArrayDetailIndex"
                  :on-click="assignArrayDetailValue"
                  :max-pages-shown="3"
                  :show-breakpoint-buttons="false"
                  :show-jump-buttons="true"
                />
  
              </div>
              
            </div>
  
            <div class="flex-1"></div>
  
            <!-- Delete Button -->
            <button 
              v-if="status.isEditingFromRequestTrip & !status.showCreateCAHeader & JSON.stringify(props) !== '[{}]'"
              class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold items-center flex gap-2"
              @click="deleteCADetail"
            >
              <img :src="deleteDocumentIcon" class="w-6 h-6" />
              Delete
            </button>

            <!-- Delete Button for Add -->
            <button 
              v-if="status.showCreateCAHeader & arrayDetail.length > 0"
              class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold items-center flex gap-2"
              @click="deleteArrayDetail"
            >
              <img :src="deleteDocumentIcon" class="w-6 h-6" />
              Delete
            </button>
  
            <hr class="border border-black" />
            
          </div>

          <!-- Button untuk urusan Add New CA Header/Detail -->
          <div>

          </div>
  
          <div :class="rowClass">
            
            <div :class="columnClass">
              
              <label for="item" :class="labelStylingClass">
                Item <span class="text-red-star">*</span>
              </label>
              
              <input 
                :class="inputStylingClass" 
                placeholder="Item" 
                v-if="!status.isEditingFromRequestTrip"
                v-model="item"
                disabled
              />

              <select 
                v-if="(status.isEditingFromRequestTrip & !isAddingDetail)" 
                id="item"
                :class="inputStylingClass" 
                :disabled="!status.showCreateCAHeader"
                v-model="itemId" 
                >
                <!-- :disabled="JSON.stringify(props) === '[{}]'" -->
                
                <option :value="[1, 'Meals']">Meals</option>
                <option :value="[2, 'Transport']">Transport</option>
                <option :value="[3, 'Others']">Others</option>

              </select>

              <!-- dia cuma bisa add kalo detail nya kosong, apalagi kalo header nya kosong -->
              <!-- <select v-if="status.isEditingFromRequestTrip & isAddingDetail" :class="inputStylingClass" v-model="itemId">
                <option value="1">Meals from isAddingDetail</option>
                <option value="2">Transport</option>
                <option value="3">Others</option>
              </select> -->

            </div>
            
            <div :class="columnClass">

              <label for="nominal" :class="labelStylingClass">
                Nominal <span class="text-red-star">*</span>
              </label>
              
              <input 
                required
                id="nominal"
                type="number"
                :class="inputStylingClass" 
                placeholder="Nominal"
                v-model="nominal"
                :disabled="!status.showCreateCAHeader"
                />
              
                <!-- :disabled="!status.isEditingFromRequestTrip || (!isAddingDetail & JSON.stringify(props) === '[{}]') " -->
            
            </div>
  
            <div :class="columnClass"></div>
  
          </div>
          
          <div :class="rowClass">
          
            <div :class="columnClass">
              <label for="frequency" :class="labelStylingClass">
                Frequency<span class="text-red-star">*</span>
              </label>
              <input
                required
                id="frequency"
                type="number"
                placeholder="Frequency"
                v-model="frequency"
                :class="inputStylingClass" 
                :disabled="!status.showCreateCAHeader"
                />
                <!-- :disabled="!status.isEditingFromRequestTrip || (!isAddingDetail & JSON.stringify(props) === '[{}]') " -->
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
              
              <label for="remarks" :class="labelStylingClass">
                Remarks
              </label>
  
              <textarea
                id="remarks"
                :class="inputStylingClass" 
                placeholder="Remarks" 
                v-model="remarks"
                :disabled="!status.showCreateCAHeader"
                ></textarea>
                <!-- :disabled="!status.isEditingFromRequestTrip || (!isAddingDetail & JSON.stringify(props) === '[{}]') " -->
  
            </div>
  
            <div :class="columnClass"></div>
  
          </div>
  
        </form>

        <table v-if="arrayDetail.length > 0" class="table">
                          
          <thead>
                              <tr>
                                <th v-for="data in tableHeadCashAdvance" :key="data.id">
                                  {{ data.title }}
                                </th>
                              </tr>
          </thead>
  
          <tbody>
            <tr v-for="data in arrayDetail" :key="data.id">
                                <td>
                                  {{ data.item_name }}
                                </td>
                                <td>
                                  {{ data.frequency }}
                                </td>
                                <td>
                                  <!-- {{ data.currency }} -->
                                  {{ currencyId[1] }}
                                </td>
                                <td>
                                  {{ data.nominal }}
                                </td>
                                <td>
                                  {{ data.total }}
                                </td>
                                <td>
                                  {{ data.remarks }}
                                </td>
            </tr>
          </tbody>
  
        </table>
  
      </div>

</template>

<style scoped>
      .table :where(th, td) {
  padding: .5rem !important;
    }

    .table th {
    background: #015289 !important;
    border-color: #b9b9b9 !important;
    border-width: 2px;
    color: white;
    }

    .table td {
    border-color: #b9b9b9 !important;
    border-width: 2px;
    }
</style>