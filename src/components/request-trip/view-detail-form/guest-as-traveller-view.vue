<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    const status = defineProps({
        isEditing: Boolean,
        currentIndex: Number,
        typeOfSubmitData: String
    })

    const props = inject('travellerDataView')
    const emits = defineEmits('fetchGuestTraveller', 'resetTypeOfSubmitData')

    let name = ref()
    let department = ref()
    let flightClass = ref()
    let sn = ref()
    let company = ref()
    let gender = ref()
    let type = ref()
    let contactNo = ref()
    let maxHotelFare = ref()
    let nik = ref()

    let travellerTypeData = ref()

    const assignValue = () => {
        name.value = props.value[status.currentIndex].name_guest
        department.value = props.value[status.currentIndex].departement
        flightClass.value = props.value[status.currentIndex].flight_class
        sn.value = props.value[status.currentIndex]
        company.value = props.value[status.currentIndex].company
        gender.value = props.value[status.currentIndex].gender
        type.value = props.value[status.currentIndex].id_type_traveller
        contactNo.value = props.value[status.currentIndex].contact_no
        maxHotelFare.value = props.value[status.currentIndex].hotel_fare
        nik.value = props.value[status.currentIndex].nik
    }

    const resetValue = () => {
        name.value = ''
        department.value = ''
        sn.value = ''
        company.value = ''
        gender.value = ''
        type.value = ''
        contactNo.value = ''
        maxHotelFare.value = ''
        nik.value = ''
    }

    watch(status, () => {
        if (status.typeOfSubmitData === 'Edit') {
            updateTravelGuest()
        }
        else if (status.typeOfSubmitData === 'Submit Add') {
            addTravelGuest()
        }
        else if (status.typeOfSubmitData === 'Delete') {
            deleteTravelGuest()
        }
        else if (status.typeOfSubmitData === 'Add') {
            resetValue()
        }
        else {
            assignValue()
        }
    })

    watch(props, () => {

        if(props.value[0].name_guest !== undefined) {
           name.value = props.value[0].name_guest
           department.value = props.value[0].departement
           flightClass.value = props.value[0].flight_class
           sn.value = props.value[0]
           company.value = props.value[0].company
           gender.value = props.value[0].gender
           type.value = props.value[0].id_type_traveller
           contactNo.value = props.value[0].contact_no
           maxHotelFare.value = props.value[0].hotel_fare
        } else {
            assignValue()
        }

    })

    if(props.value[0].name_guest !== undefined) {
           name.value = props.value[0].name_guest
           department.value = props.value[0].departement
           flightClass.value = props.value[0].flight_class
           sn.value = props.value[0]
           company.value = props.value[0].company
           gender.value = props.value[0].gender
           type.value = props.value[0].id_type_traveller
           contactNo.value = props.value[0].contact_no
           maxHotelFare.value = props.value[0].hotel_fare
           nik.value = props.value[0].nik
    }

    const addTravelGuest = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/travel_guest/store`, {
            // notes: props.value[status.currentIndex].notes,
            gender: gender.value,
            company: company.value,
            name_guest: name.value,
            hotel_fare: maxHotelFare.value,
            departement: department.value,
            contact_no: contactNo.value,
            id_type_traveller: type.value,
            nik: props.value[status.currentIndex].nik,
            id_flight_class: props.value[status.currentIndex].id_flight_class,
            id_request_trip: props.value[status.currentIndex].id_request_trip,
            id_company: props.value[status.currentIndex].id_company,
            id_employee: props.value[status.currentIndex].id_employee
        })
        emits('fetchGuestTraveller')
        emits('resetTypeOfSubmitData', 'Add')
    }

    const updateTravelGuest = async () => {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/travel_guest/update_data/${props.value[status.currentIndex].id}`, {
            nik: props.value[status.currentIndex].nik,
            notes: props.value[status.currentIndex].notes,
            gender: gender.value,
            company: company.value,
            name_guest: name.value,
            hotel_fare: maxHotelFare.value,
            departement: department.value,
            contact_no: contactNo.value,
            id_type_traveller: type.value,
            id_flight_class: props.value[status.currentIndex].id_flight_class,
            id_request_trip: props.value[status.currentIndex].id_request_trip,
            id_company: props.value[status.currentIndex].id_company,
            id_employee: props.value[status.currentIndex].id_employee
        })
        emits('fetchGuestTraveller')
        emits('resetTypeOfSubmitData', 'Edit')

    }

    const deleteTravelGuest = async() => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/travel_guest/delete_data/${props.value[status.currentIndex].id}`)
        emits('fetchGuestTraveller')
        emits('resetTypeOfSubmitData')
    }

    // buat dropdown type
    const getTravellerType = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/travel_guest/get_type_traveller')
        travellerTypeData.value = api.data.data
    }

    onBeforeMount(() => {
        getTravellerType()
    })

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
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
                        Department<span class="text-red-star">*</span>
                    </label>

                    <input
                        v-model="department"
                        type="text"
                        placeholder="Department"
                        :class="inputStylingClass"
                        required
                        :disabled="!status.isEditing"
                    />

                </div>

            </div>

            <div :class="columnClass">

                <div class="w-full">
                    
                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                    Flight Class <span class="text-red-star">*</span>
                    </label>
                    
                    <input
                        v-model="flightClass"
                        type="text"
                        placeholder="Flight Class"
                        :class="inputStylingClass"
                        required
                        :disabled="!status.isEditing"
                    />

                </div>

            </div>

        </div>

        <div :class="rowClass">

            <!-- SN -->
            <div :class="columnClass">
                <div class="w-full">
                    
                    <label :class="labelStylingClass">
                        SN<span class="text-red-star">*</span>
                    </label>

                    <input 
                        type="text"
                        placeholder="SN"
                        :class="inputStylingClass"
                        disabled
                        />
                        <!-- required -->

                </div>
            </div>

            <!-- Company -->
            <div :class="columnClass">

                <div class="w-full">

                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Company<span class="text-red-star">*</span>
                    </label>

                    <input
                        v-model="company"
                        type="text"
                        :class="inputStylingClass"
                        placeholder="Company"
                        required
                        :disabled="!status.isEditing"
                    />

                </div>

            </div>

            <!-- NIK -->
            <div :class="columnClass">
            
                <div class="w-full">

                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        NIK<span class="text-red-star">*</span>
                    </label>

                    <input
                        v-model="nik"
                        type="text"
                        :class="inputStylingClass"
                        placeholder="NIK"
                        required
                        :disabled="!status.isEditing"
                    />

                </div>

            </div>

        </div>

        <div :class="rowClass">

            <!-- Gender -->
            <div :class="columnClass">

                <div class="w-full">
                    
                    <label :class="labelStylingClass">
                        Gender<span class="text-red-star">*</span>
                    </label>

                    <select :class="inputStylingClass" v-model="gender" :disabled="!status.isEditing">
                        <option value="L">
                            Male
                        </option>
                        <option value="P">
                            Female
                        </option>
                    </select>

                </div>

            </div>

            <!-- Traveller Type -->
            <div :class="columnClass">

                <div class="w-full">
                    
                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Type<span class="text-red-star">*</span>
                    </label>

                    <select                         
                        v-model="type"
                        :class="inputStylingClass"
                        :disabled="!status.isEditing"
                        required
                    >
                        <option v-for="data in travellerTypeData" :key="data.id" :value="data.id">
                            {{ data.type_traveller }}
                        </option>
                    </select>

                    <!-- <input 
                        v-model="type"
                        type="text"
                        placeholder="Type"
                        :class="inputStylingClass"
                        required
                        :disabled="!status.isEditing"
                    /> -->

                </div>

            </div>

            <div :class="columnClass"></div>

        </div>

        <div :class="rowClass">

        <div :class="columnClass">
        <div class="w-full">
            <label :class="labelStylingClass">
                Contact No<span class="text-red-star">*</span>
            </label>
            <input 
                type="text" 
                :class="inputStylingClass" 
                placeholder="Contact No" 
                v-model="contactNo"
                :disabled="!status.isEditing"
            />
        </div>
        </div>

        <div :class="columnClass">

            <div class="w-full">
                <label :class="labelStylingClass">
                    Max Hotel Fare<span class="text-red-star">*</span>
                </label>
                <input
                    type="text" 
                    placeholder="Notes"
                    :class="inputStylingClass" 
                    v-model="maxHotelFare"
                    :disabled="!status.isEditing" 
                />
            </div>

        </div>

        <div :class="columnClass"></div>

        </div>

    </div>
</template>