<script setup>
    import { ref, onBeforeMount, provide, watch } from 'vue'
    import Api from '@/utils/Api'

    import multiStepCircleVertical from '@/components/molecules/multiStepCircleVertical.vue'
    import miniABM from '@/assets/mini-abm.png'
    import userImg from '@/assets/3-user.png'
    import deleteDocumentIcon from '@/assets/delete_document_icon.png'

    import { useRoute } from 'vue-router'
    const location = useRoute();

    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'

    import iconPlus from "@/assets/navbar/icon_plus.svg"
    import editIcon from "@/assets/navbar/edit_icon.svg"
    import deleteicon from "@/assets/navbar/delete_icon.svg"

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    import { useActualizationStore } from "@/stores/actualization.js"
    let actualization = useActualizationStore()

    let activitiesTableHead = ref([
        {title: 'Date'},
        {title: 'Activity'},
        {title: 'Actions'}
    ])

    let cityData = ref([{}])
    let createdBy = ref()
    let tripInfoDetail = ref()
    let activitiesDetail = ref()

    const fetchUserName = async () => {
        
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get(`/users/${location.params.created_by}`)
            createdBy.value = api?.data?.data[0]?.employee_name            
        } catch (error) {
            console.log(error)
        }

    }

    const fetchTripInfoByActId = async () => {
        
      try {            
            
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get(`/actual_trip/get_trip_by_id/${location.params.id}`)
            console.log(api)
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

    const fetchActivitiesByActId = async () => {

try {
    
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    
    const api = await Api.get(`/actual_trip/get_activities_by_id/${location.params.id}`)

    activitiesDetail.value = api.data.data
    activitiesDetail.value.map((item) => {
        item.act_date = new Date(item.act_date).toJSON().slice(0, 10)
        item.from_fetch = true
    })

} catch (error) {
    activitiesDetail.value = []
}

    }

    let approvalStatusData = ref()
    
    const fetchHistoryApproval = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/actual_trip/get_history/${location.params.id}`)
      console.log(api)
      approvalStatusData.value = api.data.data

    }

    onBeforeMount(() => {
      fetchUserName()
      fetchActivitiesByActId()
      fetchTripInfoByActId()
      fetchHistoryApproval()
      fetchCityUtils(cityData)
    })

    let tab = ref('details')
    let noRequestTrip = localStorage.getItem('no_request_trip')

    const addActivitiesField = (fieldType) => {

      fieldType.push({
          act_date: new Date().toJSON().slice(0, 10),
          activities: '',
          from_fetch: false
      })

    }

    const editActivitiesField = async (activitiesDetail, index) => {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/actual_trip/update_activities/${activitiesDetail[index].id}`, {
            id_act: activitiesDetail[index].id_act,
            act_date: activitiesDetail[index].act_date,
            activities: activitiesDetail[index].activities
        })
        fetchActivitiesByActId()

    }

    const submitActivitiesField = async (activitiesDetail, index) => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.post(`/actual_trip/store_activities`, {
          id_act: location.params.id,
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

    let optionDataZona = ref()
    let tlkRate = ref(0)
    let tripInfoZona = ref()

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

</script>

<template>
    <div 
        class="flex flex-col w-full this h-[100vh]"
    >
        <Navbar />
        <div class="flex w-screen content mt-[115px]">
            <Sidebar class="flex-none" />
            <div class="bg-[#e4e4e6] pb-20 pt-10 px-8 w-screen clean-margin duration-500 ease-in-out"
            :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']">
          
                <div class="bg-white rounded-xl pb-3 relative py-9 px-5">

                    <div class="flex items-center gap-2">

                      <router-link to="/actualization">
                        <img :src="arrow" class="w-3 h-3" alt="">
                      </router-link>

                      <h1 class="text-blue font-semibold">
                        Actualization Trip<span class="text-[#0a0a0a]"> / {{ actualization.viewActualizationData.no_request_trip }}
                        </span>

                      </h1>

                      <div class="flex-1"></div>

                      <div class=" min-w-[114px] h-[42px] text-center text-base font-bold rounded-t-lg rounded-bl-3xl rounded-br-lg border flex items-center justify-center border-black px-3">
                        {{ location.params.status }}
                      </div>
                      
                    </div>

                    <!-- {{ actualization.viewActualizationData }} -->
                    <!-- {{ tripInfoDetail }} -->
                    {{ approvalStatusData }}

                    <!-- SUBMIT & EDIT BUTTON FOR REQUEST TRIP HEADER -->
                    <div class="flex gap-4 mt-6 mb-3 ml-5" >
                        
                      <buttonEditFormView />
                      <buttonSaveFormView />
                        
                      <!-- SUBMIT BUTTON -->
                      <button 
                        v-if="!isEditing" 
                        @click="submitRequestTrip" 
                        class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold"
                      >
                        Submit
                      </button>

                      <buttonCancelFormView
                        v-if="isEditing"
                        @click="isEditing = false; showCreateNewCAHeader = false"
                      />

                      <AddActualizationTripModal  />

                      <div class="flex-1"></div>

                      <EditActualizationTripModal  />



                    </div>

                    <!-- FORM READ ONLY -->
                    <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">

                        <div class="flex flex-col gap-2">
                            <span>Created Date <span class="text-[#f5333f]">*</span></span>
                            <input     
                                type="text" 
                                disabled
                                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]"
                                :value="location.params.created_date" 
                            />
                        </div>

                        <div class="flex flex-col gap-2">

                            <span>
                                Created By <span class="text-[#f5333f]">*</span>
                            </span>

                          <input
                            type="text"
                            class="px-4 py-3 border border-[#e0e0e0] rounded-lg min-w-[80%] cursor-pointer" 
                            disabled
                            :value="createdBy"                       
                          />

                        </div>

                        <div class="flex flex-col gap-2">
                            <span>
                                Reference <span class="text-[#f5333f]">*</span>
                            </span>
                            <input
                                type="text" 
                                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                                disabled
                                :value="noRequestTrip"
                            />
                        </div>

                    </div>

                    <!-- TAB BACKGROUND -->
                    <div class="bg-blue rounded-lg pt-2">
                            
                            <button @click="tab = 'details'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div
                                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg" 
                                :class="tab == 'details' ? 'block' : 'hidden'" 
                                ></div>
                                Details
                            </button>

                            <button 
                              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative"
                              @click="tab = 'approval'" 
                              >

                                <div 
                                  class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
                                  :class="tab == 'approval' ? 'block' : 'hidden'" 
                                  ></div>
                                Approval

                            </button>

                    </div>

                    <!-- TAB -->

                    <!-- DOCUMENT DETAIL -->
                    <div v-if="tab == 'details'" class="flex">

                      <div class="flex flex-col gap-y-5 py-5 px-5 flex-1">

                        Trip Info

                        <!-- Trip Info -->
                        <div
                            class="flex flex-col gap-y-5"
                            v-if="tripInfoDetail.length > 0" 
                            v-for="(data, index) in tripInfoDetail"
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
                                    @click="data.isEdit = true"
                                    type="button" 
                                  >
                                    <img :src="editIcon" class="w-6 h-6" />
                                  </button>

                                  <button 
                                    @click="deleteTripInfoField(tripInfoDetail, index)"
                                    type="button"
                                  >
                                    <img :src="deleteicon" class="w-6 h-6" />
                                  </button>
                                    
                                </div>

                            </div>

                            <form 
                              v-if="data.isEdit === true"  
                              @submit.prevent="editTripInfoField(data)"
                            >

                                <div class="flex gap-5 my-2">
                                    
                                    <div class="w-full">

                                        <label 
                                            :class="$labelStyling" 
                                            for="departure"
                                        >
                                            Date Departure<span class="text-red">*</span>
                                          </label>
                                          <input
                                          id="departure"
                                          :class="$inputStyling"
                                          type="date"
                                          v-model="data.date_departure"
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
                                        id="return"
                                        :class="$inputStyling"
                                        type="date"
                                        v-model="data.date_arrival"
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
                                            <option 
                                            v-for="data in cityData" 
                                            :value="data.id"
                                            >
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
                                        v-model="data.id_city_to"
                                        @change="fetchZonaByCity(data.id_city_to, data.id_zona)"
                                        required
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

                        <!-- Purpose -->
                        <div>

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
                        <div>
                            
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
                                        <td class="flex justify-center items-center h-full">
                                            <img 
                                                @click="addActivitiesField(activitiesDetail)" 
                                                class="cursor-pointer w-7 h-7" 
                                                :src="iconPlus" 
                                                alt=""
                                            />
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <!-- Total TLK -->
                        <div class="mt-5">

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
                        <div>

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

                      </div>

                    </div>

                    <div v-else-if="tab == 'approval'">

                      <div class="flex justify-start">

                        <div class="flex flex-col items-center">
                          <img :src="miniABM" class="h-[60px] w-60" />
                          <h1 class="text-2xl font-medium leading-7">Approval</h1>
                        </div>

                      </div>

                      <div class="flex justify-center">

                        <div class="py-12 px-4">

                          <multiStepCircleVertical 
                            :image="userImg" v-for="(data, index) in approvalStatusData" 
                            :key="index" 
                            :data="data.text" 
                            :stop="index+1 === approvalStatusData.length ? true : false" 
                            :any="data" 
                          />

                        </div>

                        <div>

                        </div>

                      </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>

    tr th {
        background-color: #015289;
        text-transform: capitalize;
        color: white;
    }

</style>