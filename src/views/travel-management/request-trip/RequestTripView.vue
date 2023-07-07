<script setup>
    import { ref, onBeforeMount, provide, watch } from 'vue'
    
    import miniABM from '@/assets/mini-abm.png'
    import userImg from '@/assets/3-user.png'
    import deleteDocumentIcon from '@/assets/delete_document_icon.png'

    import Api from '@/utils/Api'

    import buttonAddFormView from '@/components/atomics/buttonAddFormView.vue'
    
    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import multiStepCircleVertical from '@/components/molecules/multiStepCircleVertical.vue'
    import detailsFormHeader from '@/components/organisms/detailsFormHeader.vue'

    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonSaveFormView from '@/components/atomics/buttonSaveFormView.vue'

    import guestAsTravellerFormView from '@/components/request-trip/view-detail-form/guest-as-traveller-view.vue'
    import airlinesFormView from '@/components/request-trip/view-detail-form/airlines-view.vue'
    import taxiVoucherFormView from '@/components/request-trip/view-detail-form/taxi-voucher-view.vue'
    import otherTransportationFormView from '@/components/request-trip/view-detail-form/other-transportation-view.vue'
    import accomodationFormView from '@/components/request-trip/view-detail-form/accomodation-view.vue'
    import cashAdvanceFormView from '@/components/request-trip/view-detail-form/cash-advance-view.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    let isEditing = ref(false)

    let tab = ref('details')
    let headerTitle = ref('Traveller')
    let currentIndex = 0
    let typeOfSubmitToProps = ref('none')

    let purposeOfTripData = ref([{}])
    let travellerGuestData = ref([{}])
    let airlinesData = ref([{}])
    let taxiVoucherData = ref([{}])
    let otherTransportationData = ref([{}])
    let accomodationData = ref([{}])
    let cashAdvanceData = ref([{}])
    let approvalStatusData = ref([{}])

    let file = ref()
    let notes = ref()
    let dataIndex = ref(0)
    let currentSelectedData = ref(travellerGuestData.value)

    provide('travellerDataView', travellerGuestData)
    provide('airlinesDataView', airlinesData)
    provide('taxiVoucherDataView', taxiVoucherData)
    provide('otherTransportationDataView', otherTransportationData)
    provide('accomodationDataView', accomodationData)
    provide('cashAdvanceDataView', cashAdvanceData)

    const getPurposeOfTrip = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/request_trip/get/${localStorage.getItem('tripIdView')}`)      
        purposeOfTripData.value = api.data.data
      } catch (error) {
        console.log(error)
        purposeOfTripData.value = [{}]
      }      
    }

    const getTravellerGuest = async () => {
      
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/travel_guest/get_by_travel_id/trip_id/${localStorage.getItem('tripIdView')}`)
        travellerGuestData.value = api.data.data
      } catch (error) {
        console.log(error)
        travellerGuestData.value = [{}]
      }

    }

    const getAirlines = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/flight_trip/get_by_travel_id/trip_id/${localStorage.getItem('tripIdView')}`)      
        airlinesData.value = api.data.data
      } catch (error) {
        console.log(error)
        airlinesData.value = [{}]
      }
    }
 
    const getTaxiVoucher = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/taxi_voucher/get_by_travel_id/trip_id/${localStorage.getItem('tripIdView')}`)      
        taxiVoucherData.value = api.data.data
      } catch (error) {
        console.log(error)
        taxiVoucherData.value = [{}]
      }
    }

    const getOtherTransportation = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/other_transport/get_by_travel_id/trip_id/${localStorage.getItem('tripIdView')}`)      
        otherTransportationData.value = api.data.data
      } catch (error) {
        console.log(error)
        otherTransportationData.value = [{}]
      }
    }

    const getAccomodation = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/accomodation_trip/get_by_travel_id/trip_id/${localStorage.getItem('tripIdView')}`)      
        accomodationData.value = api.data.data
      } catch (error) {
        console.log(error)
        accomodationData.value = [{}]
      }
    }

    const getCashAdvance = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/cash_advance/get_by_trip_id/${localStorage.getItem('tripIdView')}`)    
        cashAdvanceData.value = api.data.data
      } catch (error) {
        console.log(error)
        cashAdvanceData.value = [{}]
      }
    }

    const getApprovalStatus = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/request_trip/get_history_approval/${localStorage.getItem('tripIdView')}`)    
        approvalStatusData.value = api.data.data
      } catch (error) {
        console.log(error)
        approvalStatusData.value = [{}]
      }
    }

    const submitRequestTrip = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.post(`/request_trip/submit/${localStorage.getItem("tripId")}`)
    }

    const submitPurposeOfTrip = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      const api = await Api.post(`/request_trip/update_data/${localStorage.getItem("tripId")}`, {
        id_employee: purposeOfTripData.value[0].id_employee,
        no_request_trip: purposeOfTripData.value[0].no_request_trip,
        code_document: purposeOfTripData.value[0].code_document,
        id_site: purposeOfTripData.value[0].id_site,
        notes: notes.value,
        file: file.value,
        id_city_from: purposeOfTripData.value[0].id_city_from,
        id_city_to: purposeOfTripData.value[0].id_city_to,
        date_departure: purposeOfTripData.value[0].date_departure,
        date_arrival: purposeOfTripData.value[0].date_arrival,
        id_zona: purposeOfTripData.value[0].id_zona,
        tlk_per_day: purposeOfTripData.value[0].tlk_per_day,
        total_tlk: purposeOfTripData.value[0].total_tlk
      })

    }

    const changeSelected = (title) => {
      headerTitle.value = title
    }

    const assignSelectedData = () => {
      headerTitle.value === 'Traveller' ? currentSelectedData.value = travellerGuestData.value 
      : headerTitle.value === 'Airlines' ? currentSelectedData.value = airlinesData.value 
      : headerTitle.value === 'Taxi Voucher' ? currentSelectedData.value = taxiVoucherData.value 
      : headerTitle.value === 'Other Transportation' ? currentSelectedData.value = otherTransportationData.value
      : headerTitle.value === 'Accomodation' ? currentSelectedData.value = accomodationData.value
      : headerTitle.value === 'Cash Advance' ? currentSelectedData.value = cashAdvanceData.value
      : travellerGuestData.value
    }

    const increment = () => {
      assignSelectedData()
      dataIndex.value + 1 !== currentSelectedData.value.length ? dataIndex.value++ : dataIndex.value
    }

    const decrement = () => {
      assignSelectedData()
      dataIndex.value > 0 ? dataIndex.value-- : dataIndex.value
    }

    onBeforeMount(() => {
      getPurposeOfTrip()
      getTravellerGuest()
      getAirlines()
      getTaxiVoucher()
      getOtherTransportation()
      getAccomodation()
      getCashAdvance()
      getApprovalStatus()
    })

    watch(purposeOfTripData, () => {
      notes.value = purposeOfTripData.value[currentIndex].notes
    })

    watch(headerTitle, () => {
      assignSelectedData()
      dataIndex.value = 0
    })

    watch(travellerGuestData, () => {
      currentSelectedData.value = travellerGuestData.value
    })

    const changeType = (typeOfSubmit) => {
      typeOfSubmitToProps.value = typeOfSubmit
    }

    const resetTypeOfSubmit = () => {
      typeOfSubmitToProps.value = 'none'
    }

</script>

<template>

    <div class="flex flex-col w-full this h-[100vh]">

        <Navbar />

        <div class="flex w-screen content mt-[115px]">

            <Sidebar class="flex-none" />

            <div class="bg-[#e4e4e6] pb-20 pt-10 px-8 w-screen clean-margin duration-500 ease-in-out"
            :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']">
          

                <div class="bg-white rounded-xl pb-3 relative py-9 px-5">

                    <div class="flex items-center gap-2">

                      <router-link to="/request">
                        <img :src="arrow" class="w-3 h-3" alt="">
                      </router-link>

                      <h1 class="text-blue font-semibold">
                        Request Trip<span class="text-[#0a0a0a]"> / {{ purposeOfTripData[currentIndex].no_request_trip }}</span>
                      </h1>

                      <div class="flex-1"></div>

                      <div class=" min-w-[114px] h-[42px] text-center text-base font-bold rounded-t-lg rounded-bl-3xl rounded-br-lg border flex items-center justify-center border-black px-3">
                        {{ purposeOfTripData[currentIndex].status }}
                      </div>
                      
                    </div>

                    <div class="flex gap-4 mt-6 mb-3 ml-5">
                        
                      <buttonEditFormView v-if="!isEditing" @click="isEditing = true" />
                      <buttonSaveFormView v-if="isEditing" @click="submitPurposeOfTrip" />
                        
                      <button @click="submitRequestTrip" v-if="!isEditing" class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                        Submit
                      </button>
                        
                      <button v-if="isEditing" @click="isEditing = false" class="bg-red-star text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                        Cancel
                      </button>

                    </div>

                    <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">

                        <div class="flex flex-col gap-2">
                                <span>Date Created <span class="text-[#f5333f]">*</span></span>
                                <input 
                                  type="text" 
                                  disabled 
                                  :value="purposeOfTripData[currentIndex].created_at" 
                                  class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                                />
                        </div>

                        <div class="flex flex-col gap-2">
                              <span>File Attachment <span class="text-[#f5333f]">*</span></span>
                              <input 
                                type="text" 
                                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                                :disabled="!isEditing" 
                              />
                        </div>

                        <div class="flex flex-col gap-2">
                                <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input
                                  type="text" 
                                  :value="purposeOfTripData[currentIndex].document_name" 
                                  class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                                />
                        </div>

                        <div class="flex flex-col gap-2">
                                <span>Requestor <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled :value="purposeOfTripData[currentIndex].employee_name"  class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                        </div>

                        <div class="flex flex-col gap-2">
                                <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input 
                                  v-model="notes"
                                  type="text" 
                                  :disabled="!isEditing" 
                                  class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                                />
                        </div>

                    </div>

                    <div class="bg-blue rounded-lg pt-2">
                            <button @click="tab = 'details'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'details' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                Details
                            </button>
                            <button @click="tab = 'tlk'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'tlk' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                TLK Info
                            </button>
                            <button @click="tab = 'approval'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'approval' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                Approval
                            </button>
                    </div>

                    <div v-if="tab == 'details'" class="flex">
                                          
                        <!-- step circle -->
                        <div>

                            <div class="py-12 px-4">
                                <multiStepCircleVertical number="1" title="Traveller" 
                                @change-header="changeSelected('Traveller')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="2" title="Airlines" 
                                @change-header="changeSelected('Airlines')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="3" title="Taxi Voucher" @change-header="changeSelected('Taxi Voucher')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="4" title="Other Transportation" @change-header="changeSelected('Other Transportation')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="5" title="Accomodation" @change-header="changeSelected('Accomodation')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="6" title="Cash Advance" @change-header="changeSelected('Cash Advance')" limit="6" :selectedTitle="headerTitle" />
                            </div>

                        </div>

                        <!-- details form -->
                        <form class="flex-1" @submit.prevent="">
                            
                          <detailsFormHeader :title="headerTitle">

                            <buttonEditFormView v-if="isEditing" @click="changeType('Edit')" />
                            <buttonAddFormView v-if="isEditing" @click="changeType('Add')" />

                            <!-- <button class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                              Issued Ticket
                            </button> -->

                            <button v-if="purposeOfTripData[currentIndex].status === 'Confirmed'" class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                              Revise
                            </button>

                            <div class="flex gap-4">
                              
                                <button @click="decrement">
                                  Back
                                </button>

                                  Data {{ dataIndex+1 }} of {{ currentSelectedData.length }}
                              
                                <button @click="increment">
                                  Next
                                </button>

                            </div>

                            <button v-if="isEditing" class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold absolute right-8 flex gap-2" @click="changeType('Delete')">
                              <img :src="deleteDocumentIcon" class="w-6 h-6" />
                              Delete
                            </button>

                          </detailsFormHeader>

                          <!-- form Step 3 -->
                          <guestAsTravellerFormView
                            @fetchGuestTraveller="getTravellerGuest"
                            @resetTypeOfSubmitData = "resetTypeOfSubmit"
                            v-if="headerTitle == 'Traveller'" 
                            class="ml-8" 
                            :isEditing="isEditing" 
                            :currentIndex="dataIndex" 
                            :typeOfSubmitData="typeOfSubmitToProps"
                          />

                          <!-- form Step 4 -->
                          <airlinesFormView v-if="headerTitle == 'Airlines'" class="ml-8" :isEditing="isEditing" :currentIndex="dataIndex" />

                          <!-- form Step 5 -->
                          <taxiVoucherFormView v-if="headerTitle == 'Taxi Voucher'" class="ml-8" :isEditing="isEditing" :currentIndex="dataIndex" />

                          <!-- form Step 6 -->
                          <otherTransportationFormView v-if="headerTitle == 'Other Transportation'" class="ml-8" :isEditing="isEditing" :currentIndex="dataIndex" />

                          <!-- form Step 7 -->
                          <accomodationFormView v-if="headerTitle == 'Accomodation'" class="ml-8" :isEditing="isEditing" :currentIndex="dataIndex" />

                          <!-- form Step 8 -->
                          <cashAdvanceFormView v-if="headerTitle == 'Cash Advance'" class="ml-8" :isEditing="isEditing" :currentIndex="dataIndex" />

                        </form>

                    </div>
                        
                    <div v-else-if="tab == 'tlk'">

                            <h1>TLK</h1>
                            <hr class="border-black border-2">

                            <div class="flex flex-col mt-3">
                                <span>Requestor <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="Gavin McFarland" disabled>
                            </div>

                            <div class="flex flex-col mt-3">
                                <span>Job Band <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="B" disabled>
                            </div>

                            <div class="flex flex-col mt-3">
                                <span>TLK <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="A" disabled>
                            </div>

                            <div class="flex flex-col mt-3">
                                <span>Total TLK <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="569.000" disabled>
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

                        <multiStepCircleVertical :image="userImg" v-for="(data, index) in approvalStatusData" :key="data.level" :data="data.text" :stop="data.level === approvalStatusData.length ? true : false" />

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