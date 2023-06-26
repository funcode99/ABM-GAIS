<script setup>
    import { ref } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from "@/components/modal/modalFooter.vue"
    const props = defineProps({
        isOpen: Boolean        
    })

    // Taxi Voucher
    let nameTaxiVoucher = ref('')
    let dateTaxiVoucher = ref('')
    let departureTaxiVoucher = ref('')
    let arrivalTaxiVoucher = ref('')
    let amountTaxiVoucher = ref('')
    let remarksTaxiVoucher = ref('')
    let accountNameTaxiVoucher = ref('')
    let voucherCodeTaxiVoucher = ref('')

    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>
    
    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Taxi Voucher'" />

        <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">

            <div :class="rowClass">

                <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        Name<span class="text-red-star">*</span>
                    </label>
                    <select :class="inputStylingClass" v-model="nameTaxiVoucher">
                        <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                        {{ data.employee_name }}
                        </option>
                    </select>
                </div>
                </div>

                <div :class="columnClass">
                <div class="w-full">
                    <label class="block mb-2 font-JakartaSans font-medium text-sm"> 
                    Date<span class="text-red-star">*</span>
                    </label>
                    <input v-model="dateTaxiVoucher" type="date" :class="inputStylingClass" :min="minDate" required>
                </div>
                </div>

            </div>

            <div :class="rowClass">

                <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        Departure<span class="text-red-star">*</span>
                    </label>
                    <select :class="inputStylingClass" v-model="departureTaxiVoucher">
                        <option v-for="data in optionDataCity" :value="data.id">
                        {{ data.city_name }}
                        </option>
                    </select>
                </div>
                </div>

                <div :class="columnClass">
                <div class="w-full">
                    <label
                        class="block mb-2 font-JakartaSans font-medium text-sm"
                        >Arrival<span class="text-red-star">*</span></label
                    >
                    <select :class="inputStylingClass" v-model="arrivalTaxiVoucher">
                    <option v-for="data in optionDataCity" :value="data.id">
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
                    <input type="text" :class='inputStylingClass' placeholder="Amount" v-model="amountTaxiVoucher">
                </div>
                </div>

                <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        <span>Remarks</span>
                    </label>
                    <input type="text" :class='inputStylingClass' placeholder="Remarks" v-model="remarksTaxiVoucher">
                </div>
                </div>

            </div>

            <div :class="rowClass">

                <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        <span>Account Name</span>
                    </label>
                    <input type="text" :class='inputStylingClass' placeholder="Account Name" v-model="accountNameTaxiVoucher">
                </div>
                </div>

                <div :class="columnClass">
                <div class="w-full">
                    <label :class="labelStylingClass">
                        <span>Voucher Code</span>
                    </label>
                    <input type="text" :class='inputStylingClass' placeholder="Voucher Code" v-model="voucherCodeTaxiVoucher">
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