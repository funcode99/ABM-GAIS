<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { Modal } from "usemodal-vue3"
    import walletImg from '@/assets/wallet.png'
    import Api from '@/utils/Api'

    import iconPlus from "@/assets/navbar/icon_plus.svg"
    import editIcon from "@/assets/navbar/edit_icon.svg"
    import deleteicon from "@/assets/navbar/delete_icon.svg"

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'

    import modalHeader from "@/components/modal/modalHeader.vue"
    import modalFooter from "@/components/modal/modalFooter.vue"

    let isVisible = ref(false)

    let tlkRate = ref(0)
    let cityData = ref([{}])

    let purpose = ref('')
    let totalTLK = ref(0)
    let notes = ref('')
    let createdDate = ref(0)
    let userId = ref('')
    let createdBy = ref('')
    let noRequestTrip = ref()
    let noSequence = ref(0)

    let activitiesDetail = ref([])
    let tripInfoDetail = ref([])
    let optionDataZona = ref()
    let filterData = ref()

    let tripInfoDateDeparture = ref(new Date().toJSON().slice(0, 10))
    let tripInfoDateReturn = ref(new Date().toJSON().slice(0, 10))
    let tripInfoFromCity = ref()
    let tripInfoToCity = ref()
    let tripInfoZona = ref()

    let activitiesTableHead = ref([
        {title: 'Date'},
        {title: 'Activity'},
        {title: 'Actions'}
    ])

    onBeforeMount(() => {
        fetchCityUtils(cityData)
            if(!localStorage.getItem('jobBandId')) {
                console.log('jobBandId tidak ada, memanggil...')
                fetchEmployeeByLogin()
        }
        fetchByTripId()
    })

    const fetchZonaByCity = async (cityId, data) => {

        // console.log(data)

        // jika terpilih (number)
        if(typeof cityId !== 'object') {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get(`/zona/get_by_city/${cityId}`)
            optionDataZona.value = api.data.data
            tripInfoZona.value = optionDataZona.value[0].id_zona   
        } else {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get(`/zona/get_by_city/${tripInfoToCity.value[0]}`)
            optionDataZona.value = api.data.data
            tripInfoZona.value = optionDataZona.value[0].id_zona
        }

    }

    const fetchEmployeeByLogin = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/employee/get_by_login')
        localStorage.setItem('jobBandId', api.data.data[0].id_job_band)
        fetchTLKByJobBand()
    }

    const fetchTLKByJobBand = async () => {
        let jobBandId = localStorage.getItem('jobBandId')
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/zona_job/get_by_job/${jobBandId}`)
        filterData.value = api.data.data
        tlkRate.value = filterData.value[0].tlk_rate
    }

    let activitiesId = ref(0)
    let fetchByTripIdData = ref([]) 

    const fetchByTripId = async () => {
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/actual_trip/get_by_id_trip/${localStorage.getItem('tripIdView')}`)
        
        fetchByTripIdData.value = api?.data?.data[0]
        notes.value = fetchByTripIdData.value.notes
        purpose.value = fetchByTripIdData.value.purpose
        totalTLK.value = fetchByTripIdData.value.total_tlk
        createdDate.value = new Date(fetchByTripIdData.value.created_at).toJSON().slice(0, 10)
        activitiesId.value = api.data.data[0].id
        userId.value = fetchByTripIdData.value.created_by
        noRequestTrip.value = fetchByTripIdData.value.no_request_trip
        noSequence.value = fetchByTripIdData.value.no_act

        fetchUserName(userId)
        fetchActivitiesByActId()
        fetchTripInfoByActId()

    }

    const fetchUserName = async (Id) => {
        
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get(`/users/${Id.value}`)
            createdBy.value = api?.data?.data[0]?.employee_name            
        } catch (error) {
            console.log(error)
        }

    }

    const addActivitiesField = (fieldType) => {

            fieldType.push({
                act_date: new Date().toJSON().slice(0, 10),
                activities: '',
                from_fetch: false
            })

    }

    // TRIP INFO

    const fetchTripInfoByActId = async () => {
        try {            
            
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get(`/actual_trip/get_trip_by_id/${activitiesId.value}`)
            tripInfoDetail.value = api.data.data
            tripInfoDetail.value.map((item) => {
                item.date_departure = new Date(item.date_departure).toJSON().slice(0, 10)
                item.date_arrival = new Date(item.date_arrival).toJSON().slice(0, 10)
                item.isEdit = false
            })

        } catch (error) {
            tripInfoDetail.value = []
        }

    }

    const submitTripInfoField = async () => {
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        
        const api = await Api.post(`/actual_trip/store_trip_info`, {
            id_act: activitiesId.value,
            date_departure: tripInfoDateDeparture.value,
            date_arrival: tripInfoDateReturn.value,
            id_city_from: tripInfoFromCity.value[0],
            id_city_to: tripInfoToCity.value[0],
            id_zona: tripInfoZona.value,
            tlk_rate: tlkRate.value,
        })

        console.log(api)
        fetchTripInfoByActId()

    }

    const editTripInfoField = async (tripInfoDetail) => {

        console.log(tripInfoDetail)
        console.log(tripInfoDetail.id_act)

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`

        const api = await Api.post(`/actual_trip/update_trip_info/${tripInfoDetail.id}`, {
            id_act: tripInfoDetail.id_act,
            id_city_from: tripInfoDetail.id_city_from,
            id_city_to: tripInfoDetail.id_city_to,
            date_departure: tripInfoDetail.date_departure,
            date_arrival: tripInfoDetail.date_arrival,
        })

        console.log(api)
        fetchTripInfoByActId()

    }

    const deleteTripInfoField = async (tripInfoDetail, index) => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/actual_trip/delete_trip/${tripInfoDetail[index].id}`)
        fetchTripInfoByActId()
    }

    // ACTIVITIES

    const fetchActivitiesByActId = async () => {

        try {
            
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            
            const api = await Api.get(`/actual_trip/get_activities_by_id/${activitiesId.value}`)

            activitiesDetail.value = api.data.data
            activitiesDetail.value.map((item) => {
                item.act_date = new Date(item.act_date).toJSON().slice(0, 10)
                item.from_fetch = true
            })

        } catch (error) {
            activitiesDetail.value = []
        }

    }

    const editActivitiesField = async (activitiesDetail, index) => {

        console.log(activitiesDetail)

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/actual_trip/update_activities/${activitiesDetail[index].id_act}`, {
            id_act: activitiesDetail[index].id_act,
            act_date: activitiesDetail[index].act_date,
            activities: activitiesDetail[index].activities
        })
        fetchActivitiesByActId()
        console.log(api)
    }

    const submitActivitiesField = async (activitiesDetail, index) => {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/actual_trip/store_activities`, {
            id_act: activitiesId.value,
            act_date: activitiesDetail[index].act_date,
            activities: activitiesDetail[index].activities
        })

        fetchActivitiesByActId()
    }

    const removeActivitiesField = (index, fieldType) => {
        fieldType.splice(index, 1)
    }

    // gak bisa dihapus pakai id apapun, mirip kaya menu access detail kasus nya
    // berhasil pakai activitiesDetail[index].id, tapi saat fetch tetap ada (gak kehapus)
    const deleteActivitiesField = async (index, activitiesDetail) => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/actual_trip/delete_activities/${activitiesDetail[index].id}`)
        console.log(api)
        fetchActivitiesByActId()
    }

</script>

<template>

    <div class="absolute right-5">
        <button
            @click="isVisible = true" 
            class="flex gap-3 items-center bg-blue text-white rounded-lg font-bold py-[14px] px-[10px]">
            <img :src="walletImg" />
            Actualization
        </button>
    </div>

    <Modal v-model:visible="isVisible">

        <main class="pb-5 flex flex-col gap-y-3">

            <modalHeader @closeVisibility="isVisible = false" title="Actualization Trip" />

            
            <div class="px-5 font-bold text-lg">
                {{ noSequence }}
            </div>
            
            <div class="flex gap-5 px-5">
                

                <div class="w-full">
                    
                    <label 
                        :class="$labelStyling" 
                        for="departure"
                    >
                        Created Date<span class="text-red">*</span>
                    </label>

                    <input
                        v-model="createdDate"
                        id="departure" 
                        :class="$inputStyling" 
                        type="date" 
                        placeholder="Created Date"
                        disabled
                    />

                </div>

                <div class="w-full">   
                    
                    <label 
                        :class="$labelStyling" 
                        for="departure"
                    >
                        Created By<span class="text-red">*</span>
                    </label>

                    <input
                        v-model="createdBy"
                        id="departure" 
                        :class="$inputStyling" 
                        type="text" 
                        placeholder="Created By"
                        disabled
                    />

                </div>

            </div>

            <div class="px-5">

                <div class="w-full">
                    <label
                        :class="$labelStyling"
                        for="departure"
                    >
                        Reference<span class="text-red">*</span>
                    </label>
                    <input
                        v-model="noRequestTrip"
                        id="departure" 
                        :class="$inputStyling" 
                        type="text" 
                        placeholder="Reference"
                        disabled
                    />
                </div>

            </div>

            <div class="trip py-5 px-5">

                Trip Info
                
                <div
                    class="flex flex-col gap-y-5" 
                    v-if="tripInfoDetail.length > 0" v-for="(data, index) in tripInfoDetail"
                >
                    
                    <div class="flex gap-5 mt-2">
                        
                        <div 
                            class="flex items-center justify-center rounded-full w-10 h-10 bg-blue text-white text-center"
                        >
                            {{index+1}}
                        </div>
    
                        <div>
    
                            <div>
                                {{ data.date_departure }} - {{ data.date_arrival }}, {{ data.name_city_from }} -> {{ data.name_city_to }}
                            </div>
    
                            <ul>
                                <li>
                                    Zona: {{ data.zona_name }}
                                </li>
                                <li>
                                    TLK Per Day: {{ data.tlk_rate }}
                                </li>
                            </ul>
    
                        </div>
    
                        <div class="flex justify-center items-start gap-1">
                   
                            <button 
                                        type="button" 
                                        @click="data.isEdit = true"
                                        >
                                        <img :src="editIcon" class="w-6 h-6" />
                            </button>
    
                            <button 
                                        type="button"
                                        @click="deleteTripInfoField(tripInfoDetail, index)"
                                    >
                                        <img :src="deleteicon" class="w-6 h-6" />
                            </button>
                             
                        </div>

                    </div>

                    <form @submit.prevent="editTripInfoField(data)" v-if="data.isEdit === true">

                        <div class="flex gap-5 my-2">
                            
                            <div class="w-full">

                                <label 
                                    :class="$labelStyling" 
                                    for="departure"
                                >
                                    Date Departure<span class="text-red">*</span>
                                </label>
                                <input
                                    v-model="data.date_departure"
                                    id="departure"
                                    :class="$inputStyling"
                                    type="date"
                                    required
                                />
                            </div>

                            <div class="w-full">
                                <label 
                                    :class="$labelStyling"
                                    for="return"
                                >
                                    Date Return<span class="text-red">*</span>
                                </label>
                                <input
                                    v-model="data.date_arrival"
                                    id="return"
                                    :class="$inputStyling"
                                    type="date"
                                    required
                                />
                            </div>

                        </div>

                        <div class="flex gap-5 my-2">

                            <div class="w-full">
                                
                                <label :class="$labelStyling">
                                    From<span class="text-red">*</span>
                                </label>

                                <select
                                    :class="$inputStyling"
                                    required
                                    v-model="data.id_city_from"
                                >
                                    <option selected disabled hidden>
                                        City
                                    </option>
                                    <option v-for="data in cityData" :value="data.id">
                                        {{ data.city_name }}
                                    </option>
                                </select>

                            </div>

                            <div class="w-full">

                                <label :class="$labelStyling">
                                    To<span class="text-red">*</span>                     
                                </label>

                                <select
                                :class="$inputStyling"
                                required
                                v-model="data.id_city_to"
                                @change="fetchZonaByCity(data.id_city_to, data.id_zona)"
                                >
                                    <option selected disabled hidden>
                                        City
                                    </option>
                                    <option v-for="data in cityData" :value="data.id">
                                        {{ data.city_name }}
                                    </option>
                                </select>

                            </div>

                        </div>

                        <div class="flex gap-4 justify-center mt-5">
                            <button 
                            @click="data.isEdit = false"
                            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                            >
                                Cancel
                            </button>
                            <button
                            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                            >
                                Save
                            </button>
                        </div>

                    </form>

                </div>

            </div>

            <form class="pt-2 px-5" @submit.prevent="submitTripInfoField">          
                
                <div class="flex gap-5 my-2">
                    <div class="w-full">
                        <label 
                            :class="$labelStyling" 
                            for="departure"
                        >
                            Date Departure<span class="text-red">*</span>
                        </label>
                        <input
                            v-model="tripInfoDateDeparture"
                            id="departure" 
                            :class="$inputStyling" 
                            type="date" 
                            required 
                        />
                    </div>
                    <div class="w-full">
                        <label 
                            :class="$labelStyling"
                            for="return"
                        >
                            Date Return<span class="text-red">*</span>
                        </label>
                        <input 
                            v-model="tripInfoDateReturn"
                            id="return"
                            :class="$inputStyling" 
                            type="date" 
                            required 
                        />
                    </div>
                </div>

                <div class="flex gap-5 my-2">

                    <div class="w-full">
                        
                        <label :class="$labelStyling">
                            From<span class="text-red">*</span>
                        </label>

                        <select
                            :class="$inputStyling"
                            required
                            v-model="tripInfoFromCity"
                        >
                            <option selected disabled hidden>
                                City
                            </option>
                            <option v-for="data in cityData" :value="[data.id, data.city_name]">
                                {{ data.city_name }}
                            </option>
                        </select>

                    </div>

                    <div class="w-full">

                        <label :class="$labelStyling">
                            To<span class="text-red">*</span>                     
                        </label>

                        <select
                        :class="$inputStyling"
                        required
                        v-model="tripInfoToCity"
                        @change="fetchZonaByCity"
                        >
                            <option selected disabled hidden>
                                City
                            </option>
                            <option v-for="data in cityData" :value="[data.id, data.city_name]">
                                {{ data.city_name }}
                            </option>
                        </select>

                    </div>

                </div>

                <div class="flex justify-center">
                    <button
                        class="bg-blue text-white rounded-lg py-[5px] px-[36px] text-center mt-3"
                    >
                        Add
                    </button>
                </div>

            </form>

            <div class="px-5">

                <div class="w-full">
                    <label
                        :class="$labelStyling"
                        for="departure"
                    >
                        Purpose
                        <span class="text-red">*</span>
                    </label>
                    <input
                        v-model="purpose"
                        id="departure" 
                        :class="$inputStyling" 
                        type="text" 
                        placeholder="Purpose"
                        required
                    />
                </div>

            </div>

            <!-- Activities table -->
            <div class="px-5">
                
                <span :class="$labelStyling">Activities</span>
                
                <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">
                    
                    <thead class="text-center font-JakartaSans text-sm font-bold h-10">
                        <tr>
                            <th v-for="data in activitiesTableHead">
                                {{ data.title }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="(data, index) in activitiesDetail">
                            <td>
                                <input type="date" v-model="data.act_date" />
                            </td>
                            <td>
                                <input type="text" v-model="data.activities" />
                            </td>
                            <td class="flex justify-center gap-3">
                                <button 
                                    type="button" 
                                    @click="data.from_fetch === true ? 
                                        editActivitiesField(activitiesDetail, index) : 
                                        submitActivitiesField(activitiesDetail, index)"
                                    >
                                    <img :src="editIcon" class="w-6 h-6" />
                                </button>
                                <button 
                                    type="button"
                                    @click="data.from_fetch === true ? 
                                    deleteActivitiesField(index, activitiesDetail) : 
                                    removeActivitiesField(index, activitiesDetail)"
                                >
                                    <img :src="deleteicon" class="w-6 h-6" />
                                </button>
                            </td>
                        </tr>
                        
                        <tr class='text-center'>

                            <td></td>
                            <td></td>
                            <td class="flex justify-center">
                                <img 
                                    @click="addActivitiesField(activitiesDetail)" 
                                    class="cursor-pointer" 
                                    :src="iconPlus" 
                                    alt=""
                                />
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <!-- Total TLK -->
            <div class="px-5">

                <div class="w-full">
                    <label
                        :class="$labelStyling"
                        for="departure"
                    >
                        Total TLK
                        <span class="text-red">*</span>
                    </label>
                    <input
                        v-model="totalTLK"
                        id="departure" 
                        :class="$inputStyling" 
                        type="text" 
                        placeholder="Total TLK"
                        required
                    />
                </div>

            </div>

            <!-- Notes -->
            <div class="px-5">

                <div class="w-full">
                    
                    <label
                        :class="$labelStyling"
                        for="notes"
                    >
                        Notes
                        <span class="text-red">*</span>
                    </label>

                    <textarea
                        v-model="notes"
                        id="notes"
                        :class="$inputStyling"
                        placeholder="Notes"
                    ></textarea>

                </div>

            </div>

        </main>

    </Modal>

</template>

<style scoped>

    tr th {
        background-color: #015289;
        text-transform: capitalize;
        color: white;
    }

    :deep(.modal-vue3-content) {
        min-width: 700px !important;
    }

</style>