<script setup>

    import { onBeforeMount, ref } from 'vue'
    import { Modal } from "usemodal-vue3"

    import iconPlus from "@/assets/navbar/icon_plus.svg"
    import deleteicon from "@/assets/navbar/delete_icon.svg"

    import Api from '@/utils/Api'

    import modalHeader from "@/components/modal/modalHeader.vue"
    import modalFooter from "@/components/modal/modalFooter.vue"

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'
    
    let isVisible = ref(false)

    let departureDate = ref(new Date().toJSON().slice(0, 10))
    let returnDate = ref(new Date().toJSON().slice(0, 10))
    let fromCity = ref('City')
    let toCity = ref('City')
    let idZona = ref(0)
    let tlkRate = ref(0)

    let arrayDetail = ref([])
    let activitiesDetail = ref([])

    let activitiesTableHead = ref([
        {title: 'Date'},
        {title: 'Activity'},
        {title: 'Actions'}
    ])

    let cityData = ref([{}])

    const addDataToArrayDetail = () => {

        let margin = new Date(returnDate.value) - new Date(departureDate.value)
        let totalDays = Math.ceil((margin/(1000*3600*24))+1)

        // console.log(totalDays)
        console.log(idZona.value)
        
        let params = {
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            id_city_from: fromCity.value[0],
            id_city_to: toCity.value[0],
            city_from: fromCity.value[1],
            city_to: toCity.value[1],
            id_zona: idZona.value,
            tlk_rate: tlkRate.value
        }

        arrayDetail.value.push(params)

        departureDate.value = null
        returnDate.value = null
        fromCity.value = 'City'
        toCity.value = 'City'
        idZona.value = 0
        tlkRate.value = 0

    }

    const submitActualizationTrip = async () => {

        if(arrayDetail.value.length === 0) {
            alert('Silahkan isi trip info terlebih dahulu')
        } else {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.post('/actual_trip/store', {
                id_employee: localStorage.getItem('id_employee'),
                id_request_trip: localStorage.getItem('tripIdView'),
                array_trip: arrayDetail.value,
                array_activities: activitiesDetail.value,
                notes: notes.value,
                purpose: purpose.value,
                total_tlk: totalTLK.value,
            })
        }

    }



    onBeforeMount(() => {
        fetchCityUtils(cityData)
        fetchEmployeeByLogin()
    })

    const addField = (fieldType) => {

        fieldType.push({
            act_date: new Date().toJSON().slice(0, 10),
            activities: ''        
        })

    }

    const removeField = (index, fieldType) => {
        fieldType.splice(index, 1)
    }

    let optionDataZona = ref()

    const fetchZonaByCity = async (fieldType, index) => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/zona/get_by_city/${toCity.value[0]}`)
      optionDataZona.value = api.data.data
      console.log(api)
      idZona.value = optionDataZona.value[0].id_zona
    }

    const fetchEmployeeByLogin = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/employee/get_by_login')
        console.log(api)
        localStorage.setItem('jobBandId', api.data.data[0].id_job_band)
    }

    const fetchTLKByJobBand = async () => {
      let jobBandId = localStorage.getItem('jobBandId')
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/zona_job/get_by_job/${jobBandId}`)
      filterData.value = api.data.data
    //   TLKperDay.value = filterData.value[0].tlk_rate
    }

    let purpose = ref('')
    let totalTLK = ref(0)
    let notes = ref('')

    const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

    <button
        @click="isVisible = true"
        class="bg-orange text-white rounded-lg py-[5px] px-[18px] font-bold"  
    >
        Actualization
    </button>

  <Modal v-model:visible="isVisible">

    {{ arrayDetail }}

    <main>
        
        <modalHeader @closeVisibility="isVisible = false" title="Actualization Trip" />

        <div class="trip pt-5 px-5">
            Trip Info
            <div class="flex gap-5 mt-2" v-if="arrayDetail.length > 0" v-for="(data, index) in arrayDetail">
                <div class="flex items-center justify-center rounded-full w-10 h-10 bg-blue text-white text-center">
                    {{index+1}}
                </div>
                <div>
                    <div>
                        {{ data.date_departure }} - {{ data.date_arrival }}, {{ data.city_from }} -> {{ data.city_to }}
                    </div>
                    <ul>
                        <li>
                            Zona: {{  }}
                        </li>
                        <li>
                            TLK Per Day: {{  }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <form class="pt-2 px-5" @submit.prevent="addDataToArrayDetail">
            
            
            
            <div class="flex gap-5 my-2">
                <div class="w-full">
                    <label 
                        :class="labelStylingClass" 
                        for="departure"
                    >
                        Date Departure<span class="text-red">*</span>
                    </label>
                    <input
                        v-model="departureDate"
                        id="departure" 
                        :class="inputStylingClass" 
                        type="date" 
                        required 
                    />
                </div>
                <div class="w-full">
                    <label 
                        :class="labelStylingClass"
                        for="return"
                    >
                        Date Return<span class="text-red">*</span>
                    </label>
                    <input 
                        v-model="returnDate"
                        id="return"
                        :class="inputStylingClass" 
                        type="date" 
                        required 
                    />
                </div>
            </div>

            <div class="flex gap-5 my-2">

                <div class="w-full">
                    
                    <label :class="labelStylingClass">
                        From<span class="text-red">*</span>
                    </label>

                    <select
                        :class="inputStylingClass"
                        required
                        v-model="fromCity"
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

                    <label :class="labelStylingClass">
                        To<span class="text-red">*</span>                     
                    </label>

                    <select
                    :class="inputStylingClass"
                    required
                    v-model="toCity"
                    @change="fetchZonaByCity(activitiesDetail, index)"
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

        <form class="py-5 px-5" @submit.prevent="submitActualizationTrip">

            <div class="mt-2">
                
                <label :class="labelStylingClass">
                    Purpose <span class="text-red">*</span>
                </label>

                <input 
                    :class="inputStylingClass"
                    v-model="purpose" 
                    required 
                />

            </div>

            <div class="mt-2">
                
                <span>Activities</span>
                
                <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">
                    <thead class="text-center font-JakartaSans text-sm font-bold h-10">
                        <tr>
                            <th v-for="data in activitiesTableHead">
                                {{ data.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="data in activitiesDetail">
                            <td>
                                <input type="date" v-model="data.act_date" />
                            </td>
                            <td>
                                <input type="text" v-model="data.activities" />
                            </td>
                            <td class="flex justify-center">
                                <button type="button" @click="removeField(index, activitiesDetail)">
                                    <img :src="deleteicon" class="w-6 h-6" />
                                </button>
                            </td>
                        </tr>
                        
                        <tr class='text-center'>

                            <td></td>
                            <td></td>
                            <td class="flex justify-center">
                                <img @click="addField(activitiesDetail)" class="cursor-pointer" :src="iconPlus" alt="">
                            </td>

                        </tr>

                    </tbody>
                </table>

            </div>

            <div>
                <label :class="labelStylingClass">
                    Total TLK<span class="text-red">*</span>
                </label>
                <input 
                    :class="inputStylingClass" 
                    placeholder="TLK"
                    v-model="totalTLK" 
                />
            </div>

            <div>
                <label :class="labelStylingClass">
                    Notes<span class="text-red">*</span>
                </label>
                <input 
                    :class="inputStylingClass" 
                    placeholder="Notes" 
                    v-model="notes"    
                />
            </div>

            <modalFooter
                class="mt-6 pt-5"
                @closeEdit="isVisible = false"
            />

        </form>

    </main>

  </Modal>

</template>

<style scoped>
    tr th {
        background-color: #015289;
        text-transform: capitalize;
        color: white;
    }
</style>