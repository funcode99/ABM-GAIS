<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from "@/components/modal/modalFooter.vue"

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'
    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'

    const props = defineProps({
        isOpen: Boolean,
        purposeType: String  
    })

    const emits = defineEmits(['fetchOtherTransportation', 'changeVisibility'])
    
    const fetchTypeOfTransportation = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get("/other_transport/get_type_transport")
        typeOfTransportData.value = res.data.data
    }

    // Other Transportation
    let traveller = ref('')
    let city = ref('')
    let typeOfTransportation = ref('')
    let quantity = ref('')
    let fromDate = ref('')
    let toDate = ref('')
    let remarks = ref('')

    const submitOtherTransportation = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post('/other_transport/store', {
            id_request_trip: localStorage.getItem('tripId'),
            id_type_transportation: typeOfTransportation.value,
            from_date: fromDate.value,
            remarks: remarks.value,
            to_date: toDate.value,
            id_city: city.value,
            qty: quantity.value,
        })
        emits('fetchOtherTransportation')
        emits('changeVisibility')
    }

    let employeeLoginData = ref()
    let cityData = ref()
    let typeOfTransportData = ref()

    onBeforeMount(() => {
        fetchEmployeeByLoginUtils(employeeLoginData)
        fetchCityUtils(cityData)
        fetchTypeOfTransportation()
    })

    watch(employeeLoginData, () => {
        traveller.value = employeeLoginData.value[0].employee_name
    })

    watch(props, () => {
         city.value = ''
         typeOfTransportation.value = ''
         quantity.value = ''
         fromDate.value = ''
         toDate.value = ''
         remarks.value = ''
    })

    const modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>
    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>
            
            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Other Transportation'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitOtherTransportation">
    
                <div :class="rowClass">
    
                        <div :class="columnClass">
                            <div class="w-full">
                                <label :class="labelStylingClass">
                                    Traveller<span class="text-red-star">*</span>
                                </label>
                                <input :class="inputStylingClass" type="text" v-model="traveller" disabled required />
                            </div>
                        </div>
    
                        <div :class="columnClass">
                            <div class="w-full">
                                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                    City<span class="text-red-star">*</span>
                                </label>
                                <select :class="inputStylingClass" v-model="city" required>
                                    <option v-for="data in cityData" :value="data.id">
                                    {{ data.city_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
    
                </div>
    
                <div :class="rowClass">
    
                        <div :class="columnClass">
                            <div class="w-full">
                                
                                <label :class="labelStylingClass">
                                    Type of Transportation<span class="text-red-star">*</span>
                                </label>
                                <select :class="inputStylingClass" v-model="typeOfTransportation" required>
                                    <option 
                                        :class="props.purposeType === 'Company Business' & data.type_transportation === 'Rent Car' ? 'hidden' : ''"
                                        v-for="data in typeOfTransportData" 
                                        :key="data.id" 
                                        :value="data.id"
                                    >
                                    {{ data.type_transportation }}
                                    </option>
                                </select>
                            </div>
                        </div>
    
                        <div :class="columnClass">
                            <div class="w-full">
                                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Quantity<span class="text-red-star">*</span>
                                </label>
                                <input type="text" placeholder="Quantity" :class=inputStylingClass v-model="quantity" required>
                            </div>
                        </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                                <label :class="labelStylingClass">
                                    From Date<span class="text-red-star">*</span>
                                </label>
                                <input v-model="fromDate" type="date" :class="inputStylingClass" :min="minDate" required>
                        </div>
                    </div>
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Remarks
                            </label>
                            <input type="text" placeholder="Remarks" :class=inputStylingClass v-model="remarks">
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                        <div :class="columnClass">
    
                        <div class="w-full">
                            
                            <label :class="labelStylingClass">
                            To Date<span class="text-red-star">*</span>
                            </label>
                            <input v-model="toDate" type="date" :class="inputStylingClass" :min="minDate" required>
    
                        </div>
    
                        </div>
    
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
        width: fit-content !important;
        max-height: 500px !important;
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

</style>