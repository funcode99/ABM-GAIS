<script setup>
    import { inject, ref, onBeforeMount, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import modalFooter from '@/components/modal/modalFooter.vue'
    import checkButton from '@/components/molecules/checkButton.vue'

    import Multiselect from '@vueform/multiselect'

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'
    import fetchTypeOfHotelUtils from "@/utils/Fetch/Reference/fetchTypeOfHotel"
    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'

    import { useRequestTripStore } from "@/stores/requesttrip.js"
    const requestTrip = useRequestTripStore()

    const tableHeadAccomodation = [
      {id: 1, title: 'Hotel Name'},
      {id: 2, title: 'Location'},
      {id: 3, title: 'Hotel Rating'},
      {id: 4, title: 'Room Type'},
      {id: 5, title: 'Price'},
      {id: 6, title: 'Confirm'}
    ]
    const props = defineProps({
        isOpen: Boolean        
    })

    const checkGuest = inject('travellerDataView')

    const emits = defineEmits(['fetchAccomodation', 'changeVisibility'])

    // Accomodation
    let traveller = ref('')
    let gender = ref('')
    let hotelFare = ref('')
    let city = ref('')
    let remarks = ref('')
    let checkIn = ref('')
    let checkOut = ref('')
    let createGL = ref(false)
    let showSharingWith = ref(false)
    let sharingWith = ref([])
    let accomodationType = ref([0, ''])
    let vendor = ref('')
    let guestList = ref()

    let price = ref(0)
    let codeHotel = ref(0)

    let accomodationData = ref()

    const submitAccomodation = async () => {
        createGL.value === true ? createGL.value = 1 : createGL.value = 0
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post('/accomodation_trip/store', {
            id_request_trip: localStorage.getItem('tripId'),
            id_type_accomodation: accomodationType.value[0],
            id_vendor: vendor.value,
            check_in_date: checkIn.value,
            check_out_date: checkOut.value,
            use_gl: createGL.value,
            id_city: city.value,
            sharing_w_name: sharingWith.value,
            remarks: remarks.value,
            price: hotelFare.value,
            code_hotel: codeHotel.value
        })
        emits('fetchAccomodation')
        emits('changeVisibility')
    }

    const employeeLoginData = ref([])
    const typeOfHotelData = ref([])
    const cityData = ref([])

    onBeforeMount(() => {
        fetchEmployeeByLoginUtils(employeeLoginData)
        fetchTypeOfHotelUtils(typeOfHotelData)
        fetchCityUtils(cityData)
    })

    watch(employeeLoginData, () => {
        traveller.value = employeeLoginData.value[0].employee_name
        hotelFare.value = employeeLoginData.value[0].hotel_fare
        gender.value = employeeLoginData.value[0].jenkel
    })

    watch(showSharingWith, () => {
        if(showSharingWith.value === false) {
            sharingWith.value = []
        }
    })

    watch(props, () => {
        city.value = ''
        remarks.value = ''
        checkIn.value = ''
        checkOut.value = ''
        createGL.value = false
        showSharingWith.value = false
        sharingWith.value = []
        accomodationType.value = [0, '']
        vendor.value = ''
        codeHotel.value = 0

        if(checkGuest.value.length !== 0) {
            guestList.value = checkGuest.value.filter((item) => {
                return item.name_guest !== localStorage.getItem('username')
            })
            guestList.value.map((item) => {
                item.value = item.id
            })
        }

    })

    let dataLength = ref(0)
    let selectRoomAndPriceData = ref([])
    let bundleData = ref()

    const fetchAccomodation = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/get_hotel')
        accomodationData.value = api.data.data
        dataLength.value = accomodationData.value.length
        for(let i=0; i<accomodationData.value.length; i++) {
            selectRoomAndPriceData.value.push({})
        }
        for(let i=0; i<accomodationData.value.length; i++) {
            selectRoomAndPriceData.value[i] = accomodationData.value[i].room_type[0]
        }
    }

    const assignHotelData = (data, forPrice) => {
        codeHotel.value = data.code_hotel
        price.value = forPrice.price
    }

    const modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <!-- {{ checkGuest }} -->
        <!-- {{ guestList }} -->

        <main>
            
            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Accomodation'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitAccomodation">
    
                <div :class="rowClass">
    
                    <!-- Traveller -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Traveller<span class="text-red-star">*</span>
                            </label>
                            <input 
                                v-model="traveller" 
                                :class="inputStylingClass" 
                                type="text" 
                                disabled
                                required
                            />
                        </div>
                    </div>
    
                    <!-- Gender -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                            Gender<span class="text-red-star">*</span>
                            </label>
                            <select :class="inputStylingClass" v-model="gender" required disabled>
                                <option value="L">
                                    Male
                                </option>
                                <option value="P">
                                    Female
                                </option>
                            </select>
                        </div>
                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <!-- Hotel Fare -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Hotel Fare<span class="text-red-star">*</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Max Fare" 
                                :class="inputStylingClass" 
                                v-model="hotelFare"
                                disabled
                                required
                            />
                        </div>
                    </div>
    
                </div>
    
                <h1 class="mt-2 font-bold text-center">Requested Accomodation</h1>
                <hr class="border border-black">
    
                <div :class="rowClass">
    
                    <!-- City -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">City<span class="text-red-star">*</span></label>
                            <select :class="inputStylingClass" v-model="city" required>
                                <option v-for="data in cityData" :value="data.id">
                                {{ data.city_name }}
                                </option>
                            </select>
                        </div>
                    </div>
    
                    <!-- Remarks will show if accomodation type is hotel -->
                     <!-- v-if="accomodationType[1] == 'Hotel'" -->
                    <div :class="columnClass">

                        <div class="w-full">
                            <label :class="labelStylingClass">Remarks</label>
                            <input :class="inputStylingClass" placeholder="Remarks" v-model="remarks">
                        </div>

                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <!-- Check In -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Check In<span class="text-red-star">*</span>
                            </label>
                            <input 
                                :class="inputStylingClass" 
                                type="date" 
                                v-model="checkIn" 
                                required
                                :min="requestTrip.dateDeparture" 
                                :max="requestTrip.dateArrival" 
                            />
                        </div>
                    </div>
    
                    <!-- Sharing with is not required -->
                    <div :class="columnClass">

                        <div class="w-full" :class="checkGuest.length > 1 ? '' : 'hidden'">
                            
                            <div class="flex gap-2 items-center ml-2 mb-2">
                                <input type="checkbox" class="w-5 h-5 rounded-2xl" v-model="showSharingWith">
                                <label for="sharing_with">Sharing with</label>
                            </div>

                            <div v-if="showSharingWith">

                                <Multiselect
                                    id="sharing_with"
                                    v-model="sharingWith"
                                    mode="tags"
                                    placeholder="Select guest"
                                    track-by="name_guest"
                                    label="name_guest"
                                    :close-on-select="false"
                                    :searchable="true"
                                    :options="guestList"
                                    required
                                >
                      
                                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                        
                                        <div
                                        class="multiselect-tag is-user"
                                        :class="{
                                            'is-disabled': disabled
                                        }"
                                        >
                                        {{ option.name_guest }}
                                        <span
                                            v-if="!disabled"
                                            class="multiselect-tag-remove"
                                            @click="handleTagRemove(option, $event)"
                                        >
                                            <span class="multiselect-tag-remove-icon"></span>
                                        </span>
                                        </div>

                                    </template>

                                </Multiselect>

                            </div>

                        </div>

                    </div>

                </div>
    
                <div :class="rowClass">
    
                    <!-- Check Out -->
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Check Out<span class="text-red-star">*</span>
                            </label>
                            <input 
                                :class="inputStylingClass" 
                                type="date" 
                                v-model="checkOut"
                                required
                                :min="requestTrip.dateDeparture" 
                                :max="requestTrip.dateArrival" 
                            />
                        </div>
                    </div>
    
                    <!-- Create GL -->
                    <div :class="columnClass" class="hidden">
                        <div class="flex flex-col gap-2">
                            <span :class="labelStylingClass">Create GL?</span>
                            <div>
                                <input 
                                    type="checkbox" 
                                    class="w-5 h-5 rounded-2xl ml-2 mb-2" 
                                    v-model="createGL"
                                    required 
                                />
                                <label class="ml-2">Yes</label>
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <div class="flex justify-between mx-4 items-start gap-2 my-6">
    
                    <!-- Accomodation Type -->
                    <div :class="columnClass">
                        <label :class="labelStylingClass">
                            Accomodation Type<span class="text-red-star">*</span>
                        </label>
                        <select 
                            :class="inputStylingClass" 
                            v-model="accomodationType" 
                            required>
                            <option v-for="data in typeOfHotelData" :key="data.id" :value="[data.id, data.type_accomodation]">
                                {{ data.type_accomodation }}
                            </option>
                        </select>
                    </div>
    
                    <!-- Vendor -->
                    <div :class="columnClass">
                        <div class="w-full">

                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                Vendor<span class="text-red-star">*</span>
                            </label>
                            
                            <div class="pb-3 flex items-center">
                                <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor" value="1">
                                <label class="ml-4">Antavaya</label>
                            </div>

                            <div class="flex items-center">
                                <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor" value="2">
                                <label class="ml-4">Aerowisata</label>
                            </div>

                        </div>
                    </div>
    
                </div>
    
                <checkButton @click="fetchAccomodation" />
    
                <h1 class="mt-2 font-bold text-center">Accomodation Availability</h1>

                <hr class="border border-black">
    
                <div class="overflow-x-auto block">
                    
                    <table class="table">
    
                        <thead>
                            <tr>
                                <th v-for="data in tableHeadAccomodation" :key=data.id>
                                    {{ data.title }}
                                </th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <tr v-for="(data, index) in accomodationData">
                                <td>
                                    {{ data.hotel }}
                                </td>
                                <td>
                                    {{ data.location }}
                                </td>
                                <td class="text-center">
                                    {{ data.rating }}
                                </td>
                                <td>
                                    <select :id="index" v-model="selectRoomAndPriceData[index]">
                                        <option v-for="option in data.room_type" :value="option">
                                            {{ option.room }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    {{ selectRoomAndPriceData[index].price }}
                                </td>
                                <td @click="bundleData = data.code_hotel">
                                    <button @click="assignHotelData(data, selectRoomAndPriceData[index])" type="button" :class="bundleData === data.code_hotel ? 'bg-blue' : 'bg-green'" class="text-white rounded-lg px-4 py-3 font-bold">
                                        Select
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
    
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