<script setup>
    import { Modal } from 'usemodal-vue3'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import confirmationButton from '@/components/molecules/confirmationButton.vue'
    import modalFooter from '@/components/modal/modalFooter.vue'
    
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
            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Cash Advance'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">
                
                <div :class="rowClass">
    
                <div :class="columnClass">
                    <div class="w-full">
                    <label :class="labelStylingClass">
                        Traveller <span class="text-red-star">*</span>
                    </label>
                    <select :class="inputStylingClass">
                        <option selected hidden disabled>
                        Name
                        </option>
                    </select>
                    </div>
                </div>
    
                <div :class="columnClass">
                    <div class="w-full">  
                    <label :class=labelStylingClass>
                        Nominal <span class="text-red-star">*</span>
                    </label>
                    <input type="text" placeholder="Nominal" :class="inputStylingClass">
                    </div>
                </div>
    
                </div>
    
                <div :class="rowClass">
    
                <div :class="columnClass">
                    <div class="w-full">
                    <label :class="labelStylingClass">
                        Item <span class="text-red-star">*</span>
                    </label>
                    <select :class="inputStylingClass">
                        <option selected hidden disabled>
                        Item
                        </option>
                    </select>
                    </div>
                </div>
    
                <div :class="columnClass">
                    <div class="w-full">  
                    <label :class=labelStylingClass>
                        Total
                    </label>
                    <input type="text" placeholder="Total" :class="inputStylingClass">
                    </div>
                </div>
    
                </div>
    
                <div :class="rowClass">
    
                <div :class="columnClass">
                    <div class="w-full">
                    <label :class="labelStylingClass">
                        Frequency <span class="text-red-star">*</span>
                    </label>
                    <input type="text" placeholder="Frequency" :class="inputStylingClass">
                    </div>
                </div>
    
                <div :class="columnClass">
                    <div class="w-full">  
                    <label :class=labelStylingClass>
                        Remarks
                    </label>
                    <input type="text" placeholder="Remarks" :class="inputStylingClass">
                    </div>
                </div>
    
                </div>
    
                <div :class="rowClass">
                    <div :class="columnClass">
                        <div class="w-full">
                        <label :class="labelStylingClass">
                            Currency <span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass">
                            <option>
                            Currency
                            </option>
                        </select>
                        </div>
                    </div>
                </div>

                <modalFooter
                    @closeEdit="$emit('changeVisibility')"
                    class="py-5"
                />
    
            </form>
        </main>


        <!-- <confirmationButton @cancel-click="isVisibleCashAdvance = false" /> -->

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

</style>