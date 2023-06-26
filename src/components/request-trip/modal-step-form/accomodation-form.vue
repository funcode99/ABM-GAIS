<script setup>
    import { ref, onBeforeMount, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import Api from '@/utils/Api'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import confirmationButton from '@/components/molecules/confirmationButton.vue'
    import modalFooter from '@/components/modal/modalFooter.vue'

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin'
    import fetchTypeOfHotelUtils from "@/utils/Fetch/Reference/fetchTypeOfHotel"
    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'

    const tableHeadAccomodation = [
      {id: 1, title: 'Hotel Name'},
      {id: 2, title: 'Location'},
      {id: 3, title: 'Hotel Rating'},
      {id: 4, title: 'Room Type'},
      {id: 5, title: 'Price'},
      {id: 6, title: 'Confirm'}
    ]
    const accomodationDummy = [
    {
        id: 1,
        HotelName: 'Aston',
        Location: 'Gubeng, Surabaya',
        HotelRating: 'Jakarta',
        RoomType: 'Surabaya',
        Price: '950.000',
      },
      {
        id: 2,
        HotelName: 'Harris Hotel',
        Location: 'Entalsewu, Surabaya',
        HotelRating: 'Jakarta',
        RoomType: 'Surabaya',
        Price: '1.104.000',
      }
    ]
    const props = defineProps({
        isOpen: Boolean        
    })

    const emits = defineEmits(['fetchAccomodation'])

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
    let sharingWith = ref('')
    let accomodationType = ref([0, ''])
    let vendor = ref('')
    let codeHotel = ref(0)


    watch(accomodationType, () => {
        console.log(accomodationType.value)
    })

    const submitAccomodation = async () => {

        createGL.value === true ? createGL.value = 1 : createGL.value = 0
        console.log(hotelFare.value)

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
        console.log(api)
        emits('fetchAccomodation')
    }

    let employeeLoginData = ref([])
    let typeOfHotelData = ref([])
    let cityData = ref([])

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

    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
</script>

<template>

    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>
            
            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Accomodation'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitAccomodation">
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                    <div class="w-full">
                        <label :class="labelStylingClass">
                            Traveller<span class="text-red-star">*</span>
                        </label>
                        <input :class="inputStylingClass" type="text" disabled v-model="traveller" />
                    </div>
                    </div>
    
                    <div :class="columnClass">
                    <div class="w-full">
                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Gender
                        </label>
                        <select :class="inputStylingClass" v-model="gender">
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
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                            Hotel Fare
                            </label>
                            <input type="text" placeholder="Max Fare" :class="inputStylingClass" v-model="hotelFare">
                        </div>
                    </div>
    
                </div>
    
                <h1 class="mt-2 font-bold text-center">Requested Accomodation</h1>
                <hr class="border border-black">
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                        <label :class="labelStylingClass">City</label>
                        <select :class="inputStylingClass" v-model="city">
                            <option v-for="data in cityData" :value="data.id">
                            {{ data.city_name }}
                            </option>
                        </select>
                        </div>
                    </div>
    
                    <div v-if="accomodationType[1] == 'Hotel'" :class="columnClass">

                        <div class="w-full">
                            <label :class="labelStylingClass">Remarks</label>
                            <input :class="inputStylingClass" placeholder="Remarks" v-model="remarks">
                        </div>

                    </div>
    
                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Check In
                            </label>
                            <input :class="inputStylingClass" type="date" v-model="checkIn" />
                        </div>
                    </div>
    
                    <div :class="columnClass">

                        <div class="w-full">
                            
                            <div class="flex gap-2 items-center ml-2 mb-2">
                                <input type="checkbox" class="w-5 h-5 rounded-2xl" v-model="showSharingWith">
                                <label>Sharing with</label>
                            </div>

                            <div v-if="showSharingWith">
                                <input :class="inputStylingClass" type="text" placeholder="Name" v-model="sharingWith" />
                            </div>


                        </div>

                    </div>

                </div>
    
                <div :class="rowClass">
    
                    <div :class="columnClass">
                        <div class="w-full">
                            <label :class="labelStylingClass">
                                Check Out
                            </label>
                            <input :class="inputStylingClass" type="date" v-model="checkOut" />
                        </div>
                    </div>
    
                    <div :class="columnClass">
                        <div class="flex flex-col gap-2">
                            <span :class="labelStylingClass">Create GL?</span>
                            <div>
                                <input type="checkbox" class="w-5 h-5 rounded-2xl ml-2 mb-2" v-model="createGL">
                                <label class="ml-2">Yes</label>
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <div class="flex justify-between mx-4 items-start gap-2 my-6">
    
                    <div :class="columnClass">
                        <label :class="labelStylingClass">
                            Accomodation Type
                        </label>
                        <select :class="inputStylingClass" v-model="accomodationType">
                            <option v-for="data in typeOfHotelData" :key="data.id" :value="[data.id, data.type_accomodation]">
                                {{ data.type_accomodation }}
                            </option>
                        </select>
                    </div>
    
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
    
                <checkButton />
    
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
                            <tr v-for="data in accomodationDummy" :key=data.id>
                            <td>
                                {{ data.HotelName }}
                            </td>
                            <td>
                                {{ data.Location }}
                            </td>
                            <td>
                                {{ data.HotelRating }}
                            </td>
                            <td>
                                {{ data.RoomType }}
                            </td>
                            <td>
                                {{ data.Price }}
                            </td>
                            <td>
                                <button class="bg-green text-white rounded-lg px-4 py-3 font-bold">
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