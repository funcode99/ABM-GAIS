<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'
    let cityData = ref()

    onBeforeMount(() => {
        fetchCityUtils(cityData)
    })

    const status = defineProps({
        isEditing: Boolean,
        currentIndex: Number,
        typeOfSubmitData: String
    })

    const props = inject('taxiVoucherDataView')
    const emits = defineEmits('fetchTaxiVoucher', 'resetTypeOfSubmitData')

    let name = ref()
    let departure = ref()
    let arrival = ref()
    let departureId = ref()
    let arrivalId = ref()
    let date = ref()
    let amount = ref()
    let remarks = ref()
    let voucherCode = ref()
    let accountName = ref()

    const assignValue = () => {
        name.value = localStorage.getItem('username')
        departure.value = props.value[status.currentIndex].name_departure_city
        departureId.value = props.value[status.currentIndex].id_departure_city
        arrival.value = props.value[status.currentIndex].name_arrival_city
        arrivalId.value = props.value[status.currentIndex].id_arrival_city
        date.value = props.value[status.currentIndex].date
        amount.value = props.value[status.currentIndex].amount
        voucherCode.value = props.value[status.currentIndex].code_voucher
        accountName.value = props.value[status.currentIndex].account_name
        remarks.value = props.value[status.currentIndex].remarks
    }

    const resetValue = () => {
        departureId.value = props.value[status.currentIndex].id_departure_city
        arrivalId.value = props.value[status.currentIndex].id_arrival_city
        date.value = ''
        amount.value = ''
        voucherCode.value = ''
        accountName.value = ''
        remarks.value = ''
    }

    const defaultValue = () => {
        name.value = localStorage.getItem('username')
        departure.value = props.value[0].name_departure_city
        departureId.value = props.value[0].id_departure_city
        date.value = props.value[0].date
        arrival.value = props.value[0].name_arrival_city
        arrivalId.value = props.value[0].id_arrival_city
        amount.value = props.value[0].amount
        voucherCode.value = props.value[0].code_voucher
        accountName.value = props.value[0].account_name
        remarks.value = props.value[0].remarks
    }

    watch(status, () => {
        if (status.typeOfSubmitData === 'Edit') {
            updateTaxiVoucher()
        }
        else if (status.typeOfSubmitData === 'Submit Add') {
            addTaxiVoucher()
        }
        else if (status.typeOfSubmitData === 'Delete') {
            deleteTaxiVoucher()
        }
        else if (status.typeOfSubmitData === 'Add') {
            resetValue()
        }
        else {
            assignValue()
        }
    })

    watch(props, () => {
        if(props.value[0].amount !== undefined) {
            defaultValue()
        }
        else {
            assignValue()
        }
    })

    if(props.value[0].amount !== undefined) {
        defaultValue()
    }

    const addTaxiVoucher = async () => {
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        
        try {

        const api = await Api.post(`/taxi_voucher/store`, {
            id_request_trip: localStorage.getItem('tripIdView'),
            amount: amount.value,
            account_name: accountName.value,
            remarks: remarks.value,
            id_departure_city: departureId.value,
            id_arrival_city: arrivalId.value,
            date: date.value,
            code_voucher: voucherCode.value
        })
        
        console.log(api)
        emits('fetchTaxiVoucher')
        emits('resetTypeOfSubmitData', 'Add')

        } catch (error) {
            console.log(error)
        }

    }

    const updateTaxiVoucher = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/taxi_voucher/update_data/${props.value[status.currentIndex].id}`, {
            id_request_trip: localStorage.getItem('tripIdView'),
            amount: amount.value,
            account_name: accountName.value,
            remarks: remarks.value,
            id_departure_city: departureId.value,
            id_arrival_city: arrivalId.value,
            date: date.value,
            code_voucher: voucherCode.value
        })
        console.log(api)
        emits('fetchTaxiVoucher')
        emits('resetTypeOfSubmitData', 'Edit')
    }

    const deleteTaxiVoucher = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/taxi_voucher/delete_data/${props.value[status.currentIndex].id}`)
        console.log(api)
        emits('fetchTaxiVoucher')
        emits('resetTypeOfSubmitData')
    }

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const rowClassStart = 'flex justify-between mx-4 items-start gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>
    
    <form @submit.prevent="">

        <div :class="rowClass">

            <div :class="columnClass">

                <div class="w-full">
                    
                <label :class="labelStylingClass">
                    Name<span class="text-red-star">*</span>
                </label>
                    
                <input 
                    v-model="name"
                    type="text"
                    placeholder="Name"
                    :class="inputStylingClass"
                    :disabled="!status.isEditing"
                    required
                /> 

                </div>

            </div>

            <div :class="columnClass">

                <div class="w-full">
                
                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                    Departure<span class="text-red-star">*</span>
                </label>

                <input
                    v-if="!status.isEditing"
                    v-model="departure"
                    type="text"
                    placeholder="Departure"
                    :class="inputStylingClass"
                    :disabled="!status.isEditing"
                />

                <select
                    v-if="status.isEditing"
                    v-model="departureId" 
                    :class="inputStylingClass" 
                    required
                >
                    <option v-for="data in cityData" :key="data.id" :value="data.id">
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
                        Date<span class="text-red-star">*</span>
                    </label>

                    <input 
                        v-if="!status.isEditing"
                        v-model="date"
                        type="text"
                        placeholder="Date"
                        :class="inputStylingClass"
                        :disabled="!status.isEditing"
                    />

                    <input 
                        v-if="status.isEditing"
                        v-model="date"
                        type="date"
                        :class="inputStylingClass"
                        :required="status.isEditing ? true : false"
                    />

                </div>

            </div>

            <div :class="columnClass">

                <div class="w-full">
                    
                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Arrival<span class="text-red-star">*</span>
                    </label>
                    
                    <input 
                        v-if="!status.isEditing"
                        v-model="arrival"
                        type="text"
                        placeholder="City"
                        :class="inputStylingClass"
                        required
                        :disabled="!status.isEditing"
                    />

                    <select
                        v-if="status.isEditing" 
                        v-model="arrivalId"
                        :class="inputStylingClass" 
                        required
                    >
                        <option v-for="data in cityData" :key="data.id" :value="data.id">
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
                <input
                    v-model="amount"
                    type="text" 
                    :class='inputStylingClass' 
                    :disabled="!status.isEditing"
                    placeholder="Amount"
                    required
                />
            </div>
            </div>

            <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        <span>Voucher Code</span>
                    </label>
                    <input 
                        v-model="voucherCode" 
                        type="text" 
                        :class='inputStylingClass' 
                        placeholder="Voucher" 
                        :disabled="!status.isEditing"
                    />
                </div>
            </div>

        </div>

        <div :class="rowClassStart">

            <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        <span>Account Name</span><span class="text-red-star">*</span>
                    </label>
                    <input
                        v-model="accountName" 
                        type="text" 
                        :class='inputStylingClass' 
                        placeholder="Account Name"
                        required
                        :disabled="!status.isEditing"
                    />
                </div>
            </div>

            <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        Remarks
                    </label>
                    <textarea 
                        :disabled="!status.isEditing"
                        v-model="remarks" 
                        :class="inputStylingClass" 
                        placeholder="Remarks"
                    ></textarea>
                </div>
            </div>

        </div>

    </form>

</template>