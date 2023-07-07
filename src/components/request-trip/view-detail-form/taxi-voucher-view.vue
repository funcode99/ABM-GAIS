<script setup>
    import { ref, inject, watch } from 'vue'
    
    const status = defineProps({
        isEditing: Boolean,
        currentIndex: Number
    })

    const props = inject('taxiVoucherDataView')

    let name = ref()
    let departure = ref()
    let date = ref()
    let arrival = ref()
    let amount = ref()
    let voucherCode = ref()
    let accountName = ref()
    let remarks = ref()

    const assignValue = () => {
        name.value = localStorage.getItem('username')
        departure.value = props.value[status.currentIndex].name_departure_city
        date.value = props.value[status.currentIndex].date
        arrival.value = props.value[status.currentIndex].name_arrival_city
        amount.value = props.value[status.currentIndex].amount
        voucherCode.value = props.value[status.currentIndex]
        accountName.value = props.value[status.currentIndex].account_name
        remarks.value = props.value[status.currentIndex].remarks
    }

    watch(status, () => {
        assignValue()
    })

    watch(props, () => {
        if(props.value[0].amount !== undefined) {
            name.value = localStorage.getItem('username')
            departure.value = props.value[0].name_departure_city
            date.value = props.value[0].date
            arrival.value = props.value[0].name_arrival_city
            amount.value = props.value[0].amount
            voucherCode.value = props.value[0]
            accountName.value = props.value[0].account_name
            remarks.value = props.value[0].remarks
        }
        else {
            assignValue()
        }
    })

    if(props.value[0].amount !== undefined) {
            name.value = localStorage.getItem('username')
            departure.value = props.value[0].name_departure_city
            date.value = props.value[0].date
            arrival.value = props.value[0].name_arrival_city
            amount.value = props.value[0].amount
            voucherCode.value = props.value[0]
            accountName.value = props.value[0].account_name
            remarks.value = props.value[0].remarks
    } 

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

                <div class="w-full">
                    
                <label :class="labelStylingClass">
                    Name<span class="text-red-star">*</span>
                </label>
                    
                <input 
                    v-model="name"
                    type="text"
                    placeholder="Name"
                    :class="inputStylingClass"
                    required
                    :disabled="!status.isEditing"
                /> 

                </div>

            </div>

            <div :class="columnClass">

                <div class="w-full">
                
                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                    Departure<span class="text-red-star">*</span>
                </label>

                <input
                    v-model="departure"
                    type="text"
                    placeholder="Departure"
                    :class="inputStylingClass"
                    required
                    :disabled="!status.isEditing"
                />

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
                    v-model="date"
                    type="text"
                    placeholder="Date"
                    :class="inputStylingClass"
                    required
                    :disabled="!status.isEditing"
                    />


                </div>
            </div>

            <div :class="columnClass">
                <div class="w-full">
                    
                    <label
                        class="block mb-2 font-JakartaSans font-medium text-sm"
                        >Arrival<span class="text-red-star">*</span></label
                    >
                    
                    <input 
                        v-model="arrival"
                        type="text"
                        placeholder="City"
                        :class="inputStylingClass"
                        required
                        :disabled="!status.isEditing"
                    />

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
                    placeholder="Amount"
                    required
                    :disabled="!status.isEditing"
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
                        required
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
                    placeholder="Remarks"></textarea>
                </div>
            </div>

        </div>

    </div>
</template>