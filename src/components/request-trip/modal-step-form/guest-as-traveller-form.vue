<script setup>
    import { onBeforeMount, ref, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from "@/components/modal/modalFooter.vue"
    const props = defineProps({
        isOpen: Boolean        
    })

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'

    let optionDataTravellerType = ref([])
    let employeeLoginData = ref([])

    let emits = defineEmits(['fetchTravellerGuest', 'changeVisibility'])

    // Guest as a traveller
    let typeOfTraveller = ref('')
    let department = ref('')
    let name = ref('')
    let company = ref('')
    let gender = ref('')
    let hotelFare = ref('')
    let NIK = ref('')
    let flightClassGuestAsATraveller = ref('')
    let contactNumber = ref('')
    let notesGuestAsTraveller = ref('')
    let flightId = ref(0)

    const fetchTravellerType = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/travel_guest/get_type_traveller')
        optionDataTravellerType.value = api.data.data
    }

    const submitGuestTraveller = async () => {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post('/travel_guest/store', {
            nik: NIK.value,
            notes: notesGuestAsTraveller.value,
            gender: gender.value,
            company: company.value,
            name_guest: name.value,
            hotel_fare: hotelFare.value,
            departement: department.value,
            contact_no: contactNumber.value,
            id_type_traveller: typeOfTraveller.value,
            id_flight_class: flightId.value,
            id_request_trip: localStorage.getItem('tripId')
        })
        
        emits('fetchTravellerGuest')
        emits('changeVisibility')

    }

    onBeforeMount(() => {
        fetchTravellerType()
        fetchEmployeeByLoginUtils(employeeLoginData)
    })

    watch(employeeLoginData, () => {
        flightId.value = employeeLoginData.value[0].id_flight_class
        flightClassGuestAsATraveller.value = employeeLoginData.value[0].flight_class
    })

    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>

            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Guest as Traveller'" />
    
            <!-- HARUS FORM BIAR BISA DI SCROLL -->
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitGuestTraveller">
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label for="typeOfTraveller" :class="labelStylingClass">
                                Type of Traveller<span class="text-red-star">*</span>
                            </label>
                            <select id="typeOfTraveller" v-model="typeOfTraveller" :class="inputStylingClass">
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
                            <input :class="inputStylingClass" type="text" v-model="name" placeholder="Name" />
                        </div>
                    </div>
        
                    <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Company<span class="text-red-star">*</span>
                            </label>
                            <input :class="inputStylingClass" type="text" v-model="company" placeholder="Company" />
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label for="gender" :class="labelStylingClass">
                                Gender<span class="text-red-star">*</span>
                            </label>
                            <select id="gender" :class="inputStylingClass" v-model="gender">
                                <option selected value="L">
                                    Male
                                </option>
                                <option value="P">
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
                            <input type="text" :class="inputStylingClass" v-model="hotelFare" />
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
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Flight Class<span class="text-red-star">*</span>
                            </label>
                            <input :class="inputStylingClass" type="text" v-model="flightClassGuestAsATraveller" />
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            Contact No<span class="text-red-star">*</span>
                        </label>
                        <input :class="inputStylingClass" type="text" placeholder="Contact No" v-model="contactNumber" required>
                    </div>
                </div>
    
                <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            Notes
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