<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from '@/components/modal/modalFooter.vue'

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'

    let listCurrency = ref([])
    let employeeLoginData = ref([])
    let emits = defineEmits(['fetchCashAdvance', 'changeVisibility'])
    const props = defineProps({
        isOpen: Boolean
    })

    const fetchCurrency = async () => {

        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get("currency")
        listCurrency.value = api.data.data

    }

    // Cash Advance
    let traveller = ref('')
    let nominal = ref()
    let frequency = ref()
    let item = ref(1)
    let total = ref(0)
    let remarks = ref('')
    let remarksNotes = ref('')
    let caId = ref(0)
    let currency = ref([0, ''])
    let grandTotal = ref(0)

    const CAItemData = ref([])

    const submitCashAdvance = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post('/cash_advance/store', {
            type_ca: 1,
            id_employee: localStorage.getItem('id_employee'),
            id_request_trip: localStorage.getItem('tripId'),
            remarks: remarks.value,
            id_currency: currency.value[0],
            grand_total: grandTotal.value,
            array_detail: arrayDetail.value
        })
        console.log(api)
        emits('fetchCashAdvance')
        emits('changeVisibility')
    }

    let arrayDetail = ref([])
    let arrayDetailForm = ref([])

    watch(props, () => {
        arrayDetail.value = []
    })

    watch(frequency, () => {
        frequency.value = frequency.value.replace(/\D/g, "")
        if(typeof nominal.value === 'string' && typeof frequency.value === 'string') {
            total.value = nominal.value * frequency.value
        }
    })    

    watch(nominal, () => {
        nominal.value = nominal.value.replace(/\D/g, "")
        if(typeof nominal.value === 'string' && typeof frequency.value === 'string') {
            total.value = nominal.value * frequency.value
        }
    })

    const fetchGetItemCA = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/cash_advance/get_type_item_ca')
        console.log(api)
        CAItemData.value = api.data.data
    }

    onBeforeMount(() => {
        fetchEmployeeByLoginUtils(employeeLoginData)
        fetchCurrency()
        fetchGetItemCA()
    })

    watch(employeeLoginData, () => {
        traveller.value = employeeLoginData.value[0].employee_name
        caId.value = employeeLoginData.value[0].id
    })

    const addToArrayDetail = () => {
        
        arrayDetailForm.value = {
            id_item_ca: item.value,
            frequency: frequency.value,
            nominal: nominal.value,
            total: total.value,
            remarks: remarks.value,
            currency: currency.value[1]
        }

        grandTotal.value += arrayDetailForm.value.total
        arrayDetail.value.push(arrayDetailForm.value)
        arrayDetailForm.value = {}

    }

    const tableHeadCashAdvance = [
        {id: 1, title: 'Item'},
        {id: 2, title: 'Frequency'},
        {id: 3, title: 'Currency'},
        {id: 4, title: 'Nominal'},
        {id: 5, title: 'Total'},
        {id: 6, title: 'Remarks'},
        {id: 7, title: 'Actions'}
    ]

    watch(props, () => {
        traveller.value = employeeLoginData.value[0].employee_name
        nominal.value = ''
        frequency.value = ''
        item.value = 1
        total.value = 0
        remarks.value = ''
        remarksNotes.value = ''
        caId.value = 0
        currency.value = [0, '']
        grandTotal.value = 0
    })

    const modalPaddingHeight = '15vh'
    const columnClass = 'flex flex-col flex-1'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const rowClassNotes = 'flex justify-between mx-4 items-start gap-3 my-3'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const inputBlackStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-[#4e4e4e] text-[#b8b8b8]'

</script>

<template>

    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>

            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Cash Advance'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitCashAdvance">
                
                <div :class="rowClass">
    
                    <!-- Traveller -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Traveller <span class="text-red-star">*</span>
                            </label>
                            <input disabled :class="inputBlackStylingClass" type="text" v-model="traveller" />
                        </div>
                    </div>

                    <!-- Grand Total -->
                    <div :class="columnClass">
                        <div class="w-full">  
                            <label :class=labelStylingClass>
                                Grand Total
                            </label>
                            <input 
                                type="text" 
                                placeholder="Grand Total" 
                                :class="inputBlackStylingClass" 
                                v-model="grandTotal" 
                                disabled 
                            />
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClassNotes">

                    <div :class="columnClass">
                        <div class="w-full">
                        <label :class="labelStylingClass">
                            Currency <span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass" v-model="currency">
                            <option v-for="data in listCurrency" :key="data.id" :value="[data.id, data.currency_name]">
                                {{ data.currency_name }}
                            </option>
                        </select>
                        </div>
                    </div>
    
                    <!-- Notes -->
                    <div :class="columnClass">
                        <div class="w-full">  
                            <label :class=labelStylingClass>
                                Notes
                            </label>
                            <textarea 
                                placeholder="Notes" 
                                :class="inputStylingClass" 
                                v-model="remarksNotes"></textarea>
                        </div>
                    </div>
    
                </div>

                <div>

                    <div class="mx-4">
                        <h1>Details Item</h1>
                        <hr class="border border-black" />
                    </div>

                    <div :class="rowClass">
    
                        <!-- Item -->
                        <div :class="columnClass">
                            <div class="w-full">

                                <label :class="labelStylingClass">
                                    Item <span class="text-red-star">*</span>
                                </label>

                                <select
                                    :class="inputStylingClass"
                                    v-model="item"
                                >
                                    <option
                                        v-for="data in CAItemData"
                                        :value="data.id"
                                    >   
                                    {{ data.item_name }}
                                    </option>
                                </select>

                            </div>
                        </div>
    
                        <!-- Nominal -->
                        <div :class="columnClass">
                            <div class="w-full">  
                                <label :class=labelStylingClass>
                                    Nominal <span class="text-red-star">*</span>
                                </label>
                                <input type="text" placeholder="Nominal" :class="inputStylingClass" v-model="nominal">
                            </div>
                        </div>
        
                    </div>
        
                    <div :class="rowClass">
    
                        <!-- Frequency -->
                        <div :class="columnClass">
                            <div class="w-full">
                            <label :class="labelStylingClass">
                                Days <span class="text-red-star">*</span>
                            </label>
                            <input type="text" placeholder="Days" :class="inputStylingClass" v-model="frequency">
                            </div>
                        </div>
    
                        <!-- Total -->
                        <div :class="columnClass">
                            <div class="w-full">  
                                <label :class=labelStylingClass>
                                    Total
                                </label>
                                <input type="text" placeholder="Total" :class="inputBlackStylingClass" disabled v-model="total">
                            </div>
                        </div>
    
                    </div>
    
                    <div :class="rowClass">
                        <div :class="columnClass">
                            <div class="w-full">  
                                <label :class=labelStylingClass>
                                    Remarks
                                </label>
                                <textarea placeholder="Remarks" :class="inputStylingClass" v-model="remarks"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button type="button" @click="addToArrayDetail" class="bg-blue-button text-white font-bold text-center px-11 py-3 rounded-lg">
                            Add
                        </button>
                    </div>

                </div>

                <div class="flex justify-center mt-3">

                    <table class="table">
                          
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
                                {{ data.id_item_ca }}
                              </td>
                              <td>
                                {{ data.frequency }}
                              </td>
                              <td>
                                {{ data.currency }}
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
                              <td>

                              </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
    
                <modalFooter
                    @closeEdit="$emit('changeVisibility')"
                    class="py-5"
                />
    
            </form>

        </main>

    </Modal>

</template>

<style scoped>

    :deep(.modal-vue3-content) {
        /* min-width: 700px !important; */
        max-height: 550px !important;
    }

    .modal-box-inner-inner {
        max-height: 450px !important;
        --tw-scale-x: 0.9;
        --tw-scale-y: 0.9;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y))
            rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
            scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        overflow-y: auto !important;
    }

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

