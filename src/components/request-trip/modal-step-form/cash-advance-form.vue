<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from '@/components/modal/modalFooter.vue'

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'

    let listCurrency = ref([])
    let employeeLoginData = ref([])
    const props = defineProps({
        isOpen: Boolean        
    })

    const fetchCurrency = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get("currency")
        listCurrency.value = api.data.data
    }

    onBeforeMount(() => {
        fetchEmployeeByLoginUtils(employeeLoginData)
        fetchCurrency()
    })

    watch(employeeLoginData, () => {
        traveller.value = employeeLoginData.value[0].employee_name
        // hotelFare.value = employeeLoginData.value[0].hotel_fare
        // gender.value = employeeLoginData.value[0].jenkel
    })

    // Cash Advance
    let traveller = ref('')
    let nominal = ref('')
    let item = ref('')
    let total = ref('')
    let frequency = ref('')
    let remarks = ref('')
    let currency = ref('')

    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const rowClassNotes = 'flex justify-between mx-4 items-start gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const inputBlackStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm bg-[#4e4e4e] text-[#b8b8b8]'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
</script>

<template>
    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>

            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Cash Advance'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">
                
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
                            <input type="text" placeholder="Grand Total" :class="inputBlackStylingClass">
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClassNotes">

                    <div :class="columnClass">
                        <div class="w-full">
                        <label :class="labelStylingClass">
                            Currency <span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass">
                            <option v-for="data in listCurrency" :key="data.id">
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
                            <textarea placeholder="Notes" :class="inputStylingClass"></textarea>
                        </div>
                    </div>
    
                </div>

                <form @submit.prevent="">

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
                                <input :class="inputStylingClass" v-model="item" placeholder="Item" />
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
                                Frequency <span class="text-red-star">*</span>
                            </label>
                            <input type="text" placeholder="Frequency" :class="inputStylingClass">
                            </div>
                        </div>
    
                        <!-- Total -->
                        <div :class="columnClass">
                            <div class="w-full">  
                                <label :class=labelStylingClass>
                                    Total
                                </label>
                                <input type="text" placeholder="Total" :class="inputBlackStylingClass">
                            </div>
                        </div>
    
                    </div>
    
                    <div :class="rowClass">
                        <div :class="columnClass">
                            <div class="w-full">  
                            <label :class=labelStylingClass>
                                Remarks <span class="text-red-star">*</span>
                            </label>
                            <textarea placeholder="Notes" :class="inputStylingClass"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button class="bg-blue-button text-white font-bold text-center px-11 py-3 rounded-lg">
                            Add
                        </button>
                    </div>

                </form>
    
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

</style>