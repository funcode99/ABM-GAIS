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

            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Guest as Traveller'" />
    
            <!-- HARUS FORM BIAR BISA DI SCROLL -->
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Type of Traveller<span class="text-red-star">*</span>
                            </label>
                            <select v-model="typeOfTraveller" :class="inputStylingClass">
                            <option v-for="data in optionDataTravellerType" :value="data.id">
                                {{ data.type_traveller }}
                            </option>
                            </select>
                        </div>
                    </div>
        
                    <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Department<span class="text-red-star">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Department"
                                :class="inputStylingClass"
                                v-model="department"
                                required
                            />
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Name<span class="text-red-star">*</span>
                            </label>
                            <select :class="inputStylingClass" v-model="name">
                                <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                                {{ data.employee_name }}
                                </option>
                            </select>
                        </div>
                    </div>
        
                    <div :class="columnClass">
                        <div class="w-full">
                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                            Company<span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass" v-model="company">
                            <option v-for="data in optionDataCompany" :key="data.id" :value="data.company_code">
                                {{ data.company_name }}
                            </option>
                        </select>
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Gender<span class="text-red-star">*</span>
                            </label>
                            <select :class="inputStylingClass" v-model="gender">
                                <option selected>
                                    Male
                                </option>
                                <option>
                                    Female
                                </option>
                            </select>
                        </div>
                    </div>
        
                    <div :class="columnClass">
                        <div class="w-full">
                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                            Hotel Fare<span class="text-red-star">*</span>
                        </label>
                        <select :class="inputStylingClass" v-model="hotelFare">
                            <option v-for="data in optionDataJobBand" :key="data.id">
                                {{ data.hotel_fare }}
                            </option>
                            </select>
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                NIK<span class="text-red-star">*</span>
                            </label>
                            <input type="text" placeholder="NIK" :class="inputStylingClass" v-model="NIK">
                        </div>
                    </div>
        
                    <div :class="columnClass">
                        <div class="w-full">
                        <label
                            class="block mb-2 font-JakartaSans font-medium text-sm"
                            >Flight Class<span class="text-red-star">*</span></label
                        >
                        <select :class="inputStylingClass" v-model="flightClassGuestAsATraveller">
                            <option v-for="data in optionDataFlightClass" :value="data.id">
                                {{ data.flight_class }}
                            </option>
                            </select>
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            Contact No<span class="text-red-star">*</span>
                        </label>
                        <input :class="inputStylingClass" type="text" placeholder="Contact No" v-model="contactNumber">
                    </div>
                </div>
    
                <div :class="columnClass">
                    <div class="w-full">
                    <label :class="labelStylingClass">
                        Notes<span class="text-red-star">*</span>
                    </label>
                    <input type="text" placeholder="Notes" :class="inputStylingClass" v-model="notesGuestAsTraveller">
                    </div>
                </div>
    
                </div>

                <modalFooter
                    @closeEdit="$emit('changeVisibility')"
                    class="py-5"
                />
                
            </form>

            <!-- <confirmationButton @save-data="submitGuestTraveller" @cancel-click="$emit('changeVisibility')" /> -->
           
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