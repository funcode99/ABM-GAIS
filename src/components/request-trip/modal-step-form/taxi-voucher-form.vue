<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from "@/components/modal/modalFooter.vue"

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'
    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'

    const props = defineProps({
        isOpen: Boolean        
    })

    let emits = defineEmits(['fetchTaxiVoucher', 'changeVisibility'])
    
    // Taxi Voucher
    let name = ref('')
    let date = ref('')
    let departure = ref('')
    let arrival = ref(0)
    let amount = ref(0)
    let remarks = ref('')
    let accountName = ref('')
    let voucherCode = ref('')

    const submitTaxiVoucher = async () => {
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        
        const api = await Api.post('/taxi_voucher/store', {
            id_request_trip: localStorage.getItem('tripId'),
            amount: amount.value,
            account_name: accountName.value,
            remarks: remarks.value,
            id_departure_city: departure.value,
            id_arrival_city: arrival.value,
            date: date.value
        })

        emits('fetchTaxiVoucher')
        emits('changeVisibility')

    }

    let employeeLoginData = ref()
    let cityData = ref()

    onBeforeMount(() => {
        fetchEmployeeByLoginUtils(employeeLoginData)
        fetchCityUtils(cityData)
    })

    watch(employeeLoginData, () => {
        name.value = employeeLoginData.value[0].employee_name
    })

    watch(props, () => {
        date.value = ''
        departure.value = 0
        arrival.value = 0
        amount.value = ''
        remarks.value = ''
        accountName.value = ''
        voucherCode.value = ''
    })

    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

    const dateDeparture = ref(localStorage.getItem('dateDeparture'))
    const dateArrival = ref(localStorage.getItem('dateArrival'))

</script>

<template>
    
    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Taxi Voucher'" />

        <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitTaxiVoucher">

            <div :class="rowClass">

                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            Name<span class="text-red-star">*</span>
                        </label>
                        <input type="text" :class="inputStylingClass" v-model="name" required disabled />
                    </div>
                </div>

                <div :class="columnClass">
                    <div class="w-full">
                        <label :class=labelStylingClass> 
                            Date<span class="text-red-star">*</span>
                        </label>
                        <input v-model="date" type="date" :class="inputStylingClass" :min="dateDeparture" :max="dateArrival" required />
                    </div>
                </div>

            </div>

            <div :class="rowClass">

                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            Departure<span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass" v-model="departure" required>
                            <option v-for="data in cityData" :value="data.id">
                            {{ data.city_name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div :class="columnClass">
                    <div class="w-full">
                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                            Arrival<span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass" v-model="arrival" required>
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
                        Amount<span class="text-red-star">*</span>
                    </label>
                    <input type="text" :class='inputStylingClass' placeholder="Amount" v-model="amount" required>
                </div>
                </div>

                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            <span>Remarks</span>
                        </label>
                        <input type="text" :class='inputStylingClass' placeholder="Remarks" v-model="remarks">
                    </div>
                </div>

            </div>

            <div :class="rowClass">

                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            <span>Account Name</span>
                        </label>
                        <input type="text" :class='inputStylingClass' placeholder="Account Name" v-model="name" disabled>
                    </div>
                </div>

                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            <span>Voucher Code</span>
                        </label>
                        <input type="text" :class='inputStylingClass' placeholder="Voucher Code" v-model="voucherCode">
                    </div>
                </div>

            </div>

            <modalFooter
                @closeEdit="$emit('changeVisibility')"
                class="py-5"
            />

        </form>

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