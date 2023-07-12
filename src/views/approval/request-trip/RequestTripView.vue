<script setup>
  import { onBeforeMount, provide, ref, watch } from "vue"
  import { useSidebarStore } from "@/stores/sidebar.js"
  import { useRoute } from "vue-router"

  import Api from '@/utils/Api'

  import miniABM from '@/assets/mini-abm.png'
  import userImg from '@/assets/3-user.png'

  import Navbar from "@/components/layout/Navbar.vue"
  import Sidebar from "@/components/layout/Sidebar.vue"
  import Footer from "@/components/layout/Footer.vue"
  import multiStepCircleVertical from '@/components/molecules/multiStepCircleVertical.vue'
  import detailsFormHeader from '@/components/organisms/detailsFormHeader.vue'

  import guestAsTravellerFormView from '@/components/request-trip/view-detail-form/guest-as-traveller-view.vue'
  import airlinesFormView from '@/components/request-trip/view-detail-form/airlines-view.vue'
  import taxiVoucherFormView from '@/components/request-trip/view-detail-form/taxi-voucher-view.vue'
  import otherTransportationFormView from '@/components/request-trip/view-detail-form/other-transportation-view.vue'
  import accomodationFormView from '@/components/request-trip/view-detail-form/accomodation-view.vue'
  import cashAdvanceFormView from '@/components/request-trip/view-detail-form/cash-advance-view.vue'

  import ModalApprove from "@/components/approval/request-trip/ModalApprove.vue"
  import ModalReject from "@/components/approval/request-trip/ModalReject.vue"

  import arrow from "@/assets/request-trip-view-arrow.png"

  // import expandArrow from "@/assets/ExpandArrow.png"
  // import editicon from "@/assets/navbar/edit_icon.svg"
  // import deleteicon from "@/assets/navbar/delete_icon.svg"
  // import iconplus from "@/assets/navbar/icon_plus.svg"

  const route = useRoute()
  const sidebar = useSidebarStore()
  let requestTripId = route.params.id
  let approvalId = route.params.approvalid

  let isEditing = ref(false)
  let isAdding = ref(false)

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
  let detailIndex = ref(0)
  let currentSelectedData = ref(travellerGuestData.value)

  let showingValue = ref(1)

  provide('travellerDataView', travellerGuestData)
  provide('airlinesDataView', airlinesData)
  provide('taxiVoucherDataView', taxiVoucherData)
  provide('otherTransportationDataView', otherTransportationData)
  provide('accomodationDataView', accomodationData)
  provide('cashAdvanceDataView', cashAdvanceData)

  let purposeOfTripName = ref('')

    const getPurposeOfTrip = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/request_trip/get/${requestTripId}`)      
        purposeOfTripData.value = api.data.data
        file.value = purposeOfTripData.value[currentIndex].file
        purposeOfTripName.value = purposeOfTripData.value[currentIndex].document_name
      } catch (error) {
        console.log(error)
        purposeOfTripData.value = [{}]
      }      
    }

    const getTravellerGuest = async () => {
      
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/travel_guest/get_by_travel_id/trip_id/${requestTripId}`)
        travellerGuestData.value = api.data.data
      } catch (error) {
        console.log(error)
        travellerGuestData.value = [{}]
      }

    }

    const getAirlines = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        let api = await Api.get(`/flight_trip/get_by_travel_id/trip_id/${requestTripId}`)      
        airlinesData.value = api.data.data
      } catch (error) {
        console.log(error)
        airlinesData.value = [{}]
      }
    }
 
    const getTaxiVoucher = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        let api = await Api.get(`/taxi_voucher/get_by_travel_id/trip_id/${requestTripId}`)      
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
        let api = await Api.get(`/other_transport/get_by_travel_id/trip_id/${requestTripId}`)      
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
        let api = await Api.get(`/accomodation_trip/get_by_travel_id/trip_id/${requestTripId}`)      
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
        let api = await Api.get(`/cash_advance/get_by_trip_id/${requestTripId}`)    
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
        let api = await Api.get(`/request_trip/get_history_approval/${requestTripId}`)    
        approvalStatusData.value = api.data.data
      } catch (error) {
        console.log(error)
        approvalStatusData.value = [{}]
      }
    }

onBeforeMount(() => {
  
  getSessionForSidebar()
  getPurposeOfTrip()
  getTravellerGuest()
  getAirlines()
  getTaxiVoucher()
  getOtherTransportation()
  getAccomodation()
  getCashAdvance()
  getApprovalStatus()

})

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"))
}

// let tab = ref("details")
// let showTraveller = ref(true)
// let showAirlines = ref(true)
// let showTaxiVoucher = ref(true)
// let showOtherTransportation = ref(true)
// let showAccomodation = ref(true)
// let showCashAdvance = ref(true)

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
      if(typeOfSubmit === 'Add') {
        isAdding.value = true
      }
    }

    const resetTypeOfSubmit = () => {
      typeOfSubmitToProps.value = 'none'
    }

    const onChangePage = (pageOfItem) => {
      assignSelectedData()
      if(dataIndex.value-1 !== currentSelectedData.value.length) {
        dataIndex.value = pageOfItem-1
      }
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

          <!-- HEADER -->
          <div class="flex items-center gap-2">
            <router-link to="/approvalrequesttrip" class="flex items-center gap-2 py-4 mx-4">
              <img :src="arrow" class="w-3 h-3" alt="" />
            </router-link>
            
            <h1 class="text-blue text-2xl font-semibold font-JakartaSans">
              Request Trip
              <span class="text-black text-2xl font-semibold font-JakartaSans">
                / TRV-ABM/1232/23.04
              </span>
            </h1>
          </div>

          <!-- APPROVE & REJECT BUTTON -->
          <div class="flex flex-wrap justify-start gap-4 px-[70px]">
            <ModalApprove :approvalId="approvalId" />
            <ModalReject :approvalId="approvalId" />
          </div>

          <!-- FORM READ ONLY-->
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
                      v-model="file"
                      v-if="!isEditing"
                      type="text"
                      class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] cursor-pointer" 
                      :disabled="!isEditing"                                 
                    />

                  <input 
                    v-if="isEditing"
                    type="file"
                    class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                  />
            </div>

            <div class="flex flex-col gap-2">
                    <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                    <input
                      type="text" 
                      :value="purposeOfTripData[currentIndex].document_name" 
                      class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                      disabled
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

          <!-- TAB & TABLE-->
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

          <!-- TAB -->
          <div v-if="tab == 'details'" class="flex">
                                          
              <!-- step circle -->
              <div>

                            <div class="py-12 px-4" v-if="purposeOfTripName === 'Field Break'">
                                <multiStepCircleVertical number="1" title="Traveller" 
                                @change-header="changeSelected('Traveller')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="2" title="Airlines" 
                                @change-header="changeSelected('Airlines')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="3" title="Other Transportation" @change-header="changeSelected('Other Transportation')" :selectedTitle="headerTitle" limit="3"  />
                            </div>

                            <div class="py-12 px-4" v-else-if="purposeOfTripName === 'Taxi Voucher'">
                              <multiStepCircleVertical number="1" title="Traveller" 
                                @change-header="changeSelected('Traveller')" :selectedTitle="headerTitle" />
                                <multiStepCircleVertical number="2" title="Taxi Voucher" @change-header="changeSelected('Taxi Voucher')" :selectedTitle="headerTitle" limit="2"  />
                            </div>

                            <div class="py-12 px-4" v-else>
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
                            
                          <detailsFormHeader :title="headerTitle" v-if="!isAdding">

                            <div class="ml-7"></div>
                            <div class="flex gap-2">

                              <buttonEditFormView v-if="isEditing" @click="changeType('Edit')" />
                              <buttonAddFormView v-if="isEditing" @click="changeType('Add')" />
  
                              <button class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold" v-if="isEditing == 'R'">
                                Issued Ticket
                              </button>
  
                              <button v-if="purposeOfTripData[currentIndex].status === 'Confirmed'" class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                                Revise
                              </button>
  
                              <div class="flex gap-2 justify-between items-center mx-1 py-2">
  
                                <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
                                  Showing {{ showingValue }} 
                                  of {{ currentSelectedData.length }} entries
                                </p>
  
                                <vue-awesome-paginate
                                  :total-items="currentSelectedData.length"
                                  :items-per-page="1"
                                  :on-click="onChangePage"
                                  v-model="showingValue"
                                  :max-pages-shown="3"
                                  :show-breakpoint-buttons="false"
                                  :show-jump-buttons="true"
                                />
  
                              </div>

                            </div>

                            <div class="flex-1"></div>
                            
                            <button v-if="isEditing" class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold items-center flex gap-2 mr-3" @click="changeType('Delete')">
                              <img :src="deleteDocumentIcon" class="w-6 h-6" />
                              Delete
                            </button>

                          </detailsFormHeader>

                          <detailsFormHeader :title="headerTitle" v-if="isAdding">
                            <buttonAddFormView @click="changeType('Submit Add')" />
                          </detailsFormHeader>

                          <!-- form Step 3 -->
                          <guestAsTravellerFormView
                            v-if="headerTitle == 'Traveller'"
                            @fetchGuestTraveller="getTravellerGuest"
                            @resetTypeOfSubmitData = "resetTypeOfSubmit"
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
                          <cashAdvanceFormView v-if="headerTitle == 'Cash Advance'" class="ml-8" :isEditing="isEditing" :currentIndex="dataIndex" :currentDetailIndex="detailIndex" />

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

                          <multiStepCircleVertical :image="userImg" v-for="data in approvalStatusData" :key="data.level" :data="data.text" :stop="data.level === approvalStatusData.length ? true : false" />

                        </div>

                        <div>

                        </div>

                      </div>

          </div>

        </div>

      </div>

      <Footer class="fixed bottom-0 left-0 right-0" />


    </div>

  </div>

</template>

<style scoped>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}
</style>
