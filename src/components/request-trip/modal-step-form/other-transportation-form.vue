<script setup>
    import { Modal } from 'usemodal-vue3'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import confirmationButton from '@/components/molecules/confirmationButton.vue'
    import modalFooter from "@/components/modal/modalFooter.vue"
    const props = defineProps({
        isOpen: Boolean        
    })

    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
</script>

<template>
    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>
            
            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Other Transportation'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">
    
                <div :class="rowClass">
    
                        <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Traveller<span class="text-red-star">*</span>
                            </label>
                            <select :class="inputStylingClass" v-model="travellerOtherTransportation">
                                <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                                {{ data.employee_name }}
                                </option>
                            </select>
                        </div>
                        </div>
    
                        <div :class="columnClass">
                        <div class="w-full">
                            <label
                                class="block mb-2 font-JakartaSans font-medium text-sm"
                                >City<span class="text-red-star">*</span></label
                            >
                            <select :class="inputStylingClass" v-model="cityOtherTransportation">
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
                                Type of Transportation<span class="text-red-star">*</span>
                            </label>
                            <select :class="inputStylingClass" v-model="typeOfTransportationOtherTransportation">
                                <option v-for="data in optionDataTransportationType" :key=data.id>
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
                            <input type="text" placeholder="Quantity" :class=inputStylingClass v-model="quantityOtherTransportation">
                        </div>
                        </div>
    
                </div>
    
                <div :class="rowClass">
    
                        <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                From Date<span class="text-red-star">*</span>
                            </label>
                            <input v-model="fromDateOtherTransportation" type="date" :class="inputStylingClass" :min="minDate" required>
                        </div>
                        </div>
    
                        <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Remarks<span class="text-red-star">*</span>
                            </label>
                            <input type="text" placeholder="Remarks" :class=inputStylingClass v-model="remarksOtherTransportation">
                        </div>
                        </div>
    
                </div>
    
                <div :class="rowClass">
    
                        <div :class="columnClass">
    
                        <div class="w-full">
                            
                            <label :class="labelStylingClass">
                            To Date<span class="text-red-star">*</span>
                            </label>
                            <input v-model="toDateOtherTransportation" type="date" :class="inputStylingClass" :min="minDate" required>
    
                        </div>
    
                        </div>
    
                </div>
    
                <modalFooter
                    @closeEdit="$emit('changeVisibility')"
                    class="py-5"
                />
    
            </form>

        </main>
        

        <!-- <confirmationButton @cancel-click="isVisibleOtherTransportation = false" /> -->

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