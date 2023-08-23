<script setup>
    import { ref, onBeforeMount, provide, watch } from 'vue'
    
    import miniABM from '@/assets/mini-abm.png'
    import userImg from '@/assets/3-user.png'
    import deleteDocumentIcon from '@/assets/delete_document_icon.png'

    import Api from '@/utils/Api'

    import buttonAddFormView from '@/components/atomics/buttonAddFormView.vue'
    import buttonCancelFormView from '@/components/atomics/buttonCancelFormView.vue'
    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonSaveFormView from '@/components/atomics/buttonSaveFormView.vue'

    import AddActualizationTripModal from '@/components/travel-management/actualization-trip/AddActualizationTrip.vue'
    import EditActualizationTripModal from '@/components/travel-management/actualization-trip/EditActualizationTrip.vue'
    
    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import multiStepCircleVertical from '@/components/molecules/multiStepCircleVertical.vue'
    import detailsFormHeader from '@/components/organisms/detailsFormHeader.vue'

    import guestAsTravellerFormView from '@/components/request-trip/view-detail-form/guest-as-traveller-view.vue'
    import airlinesFormView from '@/components/request-trip/view-detail-form/airlines-view.vue'
    import taxiVoucherFormView from '@/components/request-trip/view-detail-form/taxi-voucher-view.vue'
    import otherTransportationFormView from '@/components/request-trip/view-detail-form/other-transportation-view.vue'
    import accomodationFormView from '@/components/request-trip/view-detail-form/accomodation-view.vue'
    import cashAdvanceFormView from '@/components/request-trip/view-detail-form/cash-advance-view.vue'

    import guestAsTravellerTableView from '@/components/request-trip/table-step-form/guest-as-traveller-table.vue'
    import airlinesTableView from '@/components/request-trip/table-step-form/airlines-table.vue'
    import taxiVoucherTableView from '@/components/request-trip/table-step-form/taxi-voucher-table.vue'
    import otherTransportationTableView from '@/components/request-trip/table-step-form/other-transportation-table.vue'
    import accomodationTableView from '@/components/request-trip/table-step-form/accomodation-table.vue'
    import cashAdvanceTableView from '@/components/request-trip/table-step-form/cash-advance-table.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    let headerCAData = ref(true)

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
    let filename = ref()
    let fileSend = ref(null)
    let notes = ref()
    let dataIndex = ref(0)
    let detailIndex = ref(0)
    let currentSelectedData = ref(travellerGuestData.value)

    let showingValue = ref(1)
    let viewLayout = ref('document')
    let purposeOfTripName = ref('')

    provide('travellerDataView', travellerGuestData)
    provide('airlinesDataView', airlinesData)
    provide('taxiVoucherDataView', taxiVoucherData)
    provide('otherTransportationDataView', otherTransportationData)
    provide('accomodationDataView', accomodationData)
    provide('cashAdvanceDataView', cashAdvanceData)

    let listOfFormDataProps = [travellerGuestData, airlinesData, taxiVoucherData, otherTransportationData, accomodationData, cashAdvanceData] 

    const getPurposeOfTrip = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/request_trip/get/${localStorage.getItem('tripIdView')}`)      
        purposeOfTripData.value = api.data.data
        file.value = purposeOfTripData.value[currentIndex].file
        filename.value = purposeOfTripData.value[currentIndex].file_name
        purposeOfTripName.value = purposeOfTripData.value[currentIndex].document_name
      } catch (error) {
        console.log(error)
        purposeOfTripData.value = [{}]
      }      
    }

    const getTravellerGuest = async () => {
      
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
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
      console.log('masuk ke get cash advance')
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/cash_advance/get_by_trip_id/${localStorage.getItem('tripIdView')}`)    
        cashAdvanceData.value = api.data.data
        headerCAData.value = true
        console.log(headerCAData.value)
      } catch (error) {
        console.log(error)
        cashAdvanceData.value = [{}]
        headerCAData.value = false
        console.log(headerCAData.value)
      }
    }

    const getApprovalStatus = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
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
      
      try {
        const api = await Api.post(`/request_trip/submit/${localStorage.getItem("tripIdView")}`)
        console.log(api)
      } catch (error) {
        console.log(error)
      }

    }

    const submitPurposeOfTrip = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      const payload = {
        id_site: purposeOfTripData.value[0].id_site,
        id_employee: purposeOfTripData.value[0].id_employee,
        code_document: purposeOfTripData.value[0].id_document,
        no_request_trip: purposeOfTripData.value[0].no_request_trip,
        notes: notes.value,
        id_city_from: purposeOfTripData.value[0].id_city_from,
        id_city_to: purposeOfTripData.value[0].id_city_to,
        date_departure: purposeOfTripData.value[0].date_departure,
        date_arrival: purposeOfTripData.value[0].date_arrival,
        id_zona: purposeOfTripData.value[0].id_zona,
        tlk_per_day: purposeOfTripData.value[0].tlk_per_day,
        total_tlk: purposeOfTripData.value[0].total_tlk,
      }

      if(fileSend !== null) {
        payload.file = fileSend.value
      }

      const api = await Api.post(`/request_trip/update_data/${localStorage.getItem("tripIdView")}`, payload)

      delete payload.file
      fileSend.value = null
      isEditing.value = false

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

    let actualizationData = ref([])

    const getActualizationByTripId = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/actual_trip/get_by_id_trip/${localStorage.getItem("tripIdView")}`)
      actualizationData.value = api.data.data

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
      getActualizationByTripId()
    })

    watch(purposeOfTripData, () => {
      notes.value = purposeOfTripData.value[currentIndex].notes
    })

    let propsCheck = ref(null)

    const assignToCheckProps = () => {
      if(headerTitle.value === 'Traveller') {
        propsCheck.value = travellerGuestData.value
      } else if (headerTitle.value === 'Airlines') {
        propsCheck.value = airlinesData.value
      } else if (headerTitle.value === 'Taxi Voucher') {
        propsCheck.value = taxiVoucherData.value  
      } else if (headerTitle.value === 'Other Transportation') {
        propsCheck.value = otherTransportationData.value    
      } else if (headerTitle.value === 'Accomodation') {
        propsCheck.value = accomodationData.value      
      } else if (headerTitle.value === 'Accomodation') {
        propsCheck.value = cashAdvanceData.value        
      }
    }

    watch(headerTitle, () => {
      
      assignToCheckProps()

      assignSelectedData()
      dataIndex.value = 0
      showingValue.value = 1

      if(headerTitle.value === 'Cash Advance') {
        getCashAdvance()
      }

    })

    watch(listOfFormDataProps, () => {
      assignToCheckProps()
    })

    let count = ref(1)

    // watch semua fetch data biar ui nya ke update, asu tenan
    // bentrok assignment value nya kampret
    watch(travellerGuestData, () => {
      currentSelectedData.value = travellerGuestData.value
      count.value < 7 ? count.value++ : count.value
    })

    watch(airlinesData, () => {
      currentSelectedData.value = airlinesData.value
      count.value < 7 ? count.value++ : count.value
    })

    watch(taxiVoucherData, () => {
      currentSelectedData.value = taxiVoucherData.value
      count.value < 7 ? count.value++ : count.value
    })

    watch(otherTransportationData, () => {
      currentSelectedData.value = otherTransportationData.value
      count.value < 7 ? count.value++ : count.value
    })

    watch(accomodationData, () => {
      currentSelectedData.value = accomodationData.value
      count.value < 7 ? count.value++ : count.value
    })

    watch(cashAdvanceData, () => {
      currentSelectedData.value = cashAdvanceData.value
      count.value < 7 ? count.value++ : count.value
    })

    watch(count, () => {
      if(count.value === 7) {
        currentSelectedData.value = travellerGuestData.value
      }
    })

    watch(currentSelectedData, () => {
      dataIndex.value = 0
      showingValue.value = 1
    })

    watch(isEditing, () => {
      file.value = purposeOfTripData.value[currentIndex].file
      if(isEditing.value === false) {
        typeOfSubmitToProps.value = 'none'
        isAdding.value = false
      }
    })

    const changeType = (typeOfSubmit) => {

      if(typeOfSubmit === 'Check Props') {
        JSON.stringify(propsCheck.value) === '[{}]' ? typeOfSubmit = 'Submit Add' : typeOfSubmit = 'Add'
      }

      typeOfSubmitToProps.value = typeOfSubmit

      if(typeOfSubmit === 'Add') {
        isAdding.value = true
      }

    }

    const resetTypeOfSubmit = (Type) => {
      typeOfSubmitToProps.value = 'none'
      Type === 'Add' ? isAdding.value = false : ''
    }

    const onChangePage = (pageOfItem) => {
      typeOfSubmitToProps.value = 'none'
      assignSelectedData()
      dataIndex.value = pageOfItem-1
    }

    const changeViewLayout = (layout) => {
      viewLayout.value = layout
    }

    const enterNewTab = () => {
      if(JSON.stringify(file.value) === "{}") {
        return 0
      } else {
        window.open(file.value, '_blank')
      }
    }

    const updatePhoto = (event) => {
      fileSend.value = event.target.files[0]
    }

    const showCreateNewCAHeader = ref(false)
    const submitNewCA = ref(false)

    let currentlyEditCAHeader = ref(false)

    // manggil localstorage harus banget pake kutip dua
    let roleName = ref(JSON.parse(localStorage.getItem("id_role")))

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

                    <!-- SUBMIT & EDIT BUTTON FOR REQUEST TRIP HEADER -->
                    <div class="flex gap-4 mt-6 mb-3 ml-5" 
                  
                    >
                        
                      <div 
                      v-if="purposeOfTripData[currentIndex].status === 'Draft' || purposeOfTripData[currentIndex].status === 'Revision'"
                      >
                        <buttonEditFormView v-if="!isEditing" @click="isEditing = true" />
                        <buttonSaveFormView v-if="isEditing" @click="submitPurposeOfTrip" />
                      </div>
                        
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

                      <div>
                        panjang = {{ actualizationData.length }}
                      </div>

                      <AddActualizationTripModal 
                          v-if="actualizationData.length === 0" 
                          @submit-success=getActualizationByTripId
                      />

                      <div class="flex-1"></div>

                      <EditActualizationTripModal v-if="actualizationData.length > 0"  />

                    </div>



                    <!-- FORM READ ONLY -->
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

                          <div @click="enterNewTab">

                                  <input
                                    v-model="filename"
                                    v-if="!isEditing"
                                    type="text"
                                    class="px-4 py-3 border border-[#e0e0e0] rounded-lg min-w-[80%] cursor-pointer" 
                                    :disabled="!isEditing"                                 
                                  />

                          </div>
                              
                          <input 
                              @change="updatePhoto" 
                              v-if="isEditing"
                              type="file"
                              class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                          />

                        </div>

                        <div class="flex flex-col gap-2">
                                <span>
                                  Purpose of Trip <span class="text-[#f5333f]">*</span>
                                </span>
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
                              v-if="roleName !== 'EMPLY'"
                              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative"
                              @click="tab = 'tlk'" 
                            >

                                <div 
                                  class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
                                  :class="tab == 'tlk' ? 'block' : 'hidden'" 
                                  ></div>
                                TLK Info

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
                                          
                        <!-- step circle -->
                        <div>

                            <div class="py-12 px-4" v-if="purposeOfTripName === 'Field Break'">
                                
                                <multiStepCircleVertical 
                                  number="1" 
                                  title="Traveller"                                
                                  @change-header="changeSelected('Traveller')" 
                                  :selectedTitle="headerTitle" 
                                />

                                <multiStepCircleVertical 
                                  number="2" 
                                  title="Airlines" 
                                  @change-header="changeSelected('Airlines')" 
                                  :selectedTitle="headerTitle" 
                                />

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



                        <!-- UNTUK MELIHAT DOCUMENT DETAIL DARI TIAP STEP REQUEST TRIP -->
                        <form class="flex-1" @submit.prevent="">

                          <!-- {{ currentSelectedData }} -->

                          <!-- DISINI UNTUK NON CASH ADVANCE -->
                          
                          <!-- BUTTON INI MUNCUL UNTUK MENGEDIT DOCUMENT REQUEST TRIP YANG SUDAH ADA (READ, UPDATE, DELETE) -->
                          <detailsFormHeader 
                            v-if="!isAdding & headerTitle !== 'Cash Advance' " 
                            :title="headerTitle" 
                            @changeView="changeViewLayout"
                          >

                            <div class="ml-7" v-if="viewLayout === 'document'"></div>

                            <div class="flex gap-2 " :class="viewLayout === 'document' ? 'visible' : 'invisible'">

                              <buttonEditFormView
                              v-if="isEditing & headerTitle !== 'Cash Advance' && JSON.stringify(propsCheck) !== '[{}]'" 
                              @click="changeType('Edit')"
                               />

                               <buttonAddFormView 
                                title="Add"
                                v-if="isEditing & headerTitle !== 'Cash Advance' " 
                                @click="changeType('Check Props')"
                                />
  
                              <!-- Issued Ticket Button -->
                              <button 
                                class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold" 
                                v-if="$route.path === '/approvalrequesttrip'"
                              >
                                Issued Ticket
                              </button>
  
                              <!-- Revise Button -->
                              <button 
                                class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold"
                                v-if="purposeOfTripData[currentIndex].status === 'Confirmed' & $route.path === '/approvalrequesttrip'" 
                              >
                                Revise
                              </button>
  
                              <!-- Showing data quantity -->
                              <div 
                                class="flex gap-2 justify-between items-center mx-1 py-2"
                              >
  
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

                            <div class="flex-1" v-if="viewLayout === 'document'"></div>
                            
                            <!-- DELETE BUTTON -->
                            <button 
                              @click="changeType('Delete')"
                              v-if="isEditing && viewLayout === 'document' && JSON.stringify(propsCheck) !== '[{}]'" 
                              class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold items-center flex gap-2 mr-3"
                            >

                              <img :src="deleteDocumentIcon" class="w-6 h-6" />
                              Delete

                            </button>

                          </detailsFormHeader>

                          <!-- BUTTON INI MUNCUL UNTUK MENAMBAH DOCUMENT REQUEST TRIP (Add) -->
                          <detailsFormHeader 
                            :title="headerTitle"
                            v-if="isAdding & headerTitle !== 'Cash Advance'"
                            @changeView="changeViewLayout"
                          >

                            <buttonAddFormView 
                              title="Confirm Add"
                              @click="changeType('Submit Add')"
                              class="mx-7"
                            />
                            
                            <buttonCancelFormView 
                              @click="isAdding = false, changeType('none')"  
                            />

                          </detailsFormHeader>


                          <!-- form Step 3 -->
                          <guestAsTravellerFormView
                            v-if="headerTitle === 'Traveller' && viewLayout === 'document'"
                            class="ml-8" 
                            :isEditing="isEditing" 
                            :currentIndex="dataIndex" 
                            :typeOfSubmitData="typeOfSubmitToProps"
                            @fetchGuestTraveller="getTravellerGuest"
                            @resetTypeOfSubmitData = "resetTypeOfSubmit"
                          />

                          <!-- table Step 3 -->
                          <guestAsTravellerTableView
                            v-if="headerTitle === 'Traveller' && viewLayout === 'table'"
                            class="ml-8"
                          />

                          <!-- form Step 4 -->
                          <airlinesFormView 
                            v-if="headerTitle === 'Airlines' && viewLayout === 'document'" 
                            class="ml-8" 
                            :isEditing="isEditing" 
                            :currentIndex="dataIndex" 
                            :typeOfSubmitData="typeOfSubmitToProps"
                            @fetchAirlines="getAirlines"
                            @resetTypeOfSubmitData = "resetTypeOfSubmit"
                          />

                          <!-- table Step 4 -->
                          <airlinesTableView 
                            v-if="headerTitle === 'Airlines' && viewLayout === 'table'"
                            class="ml-8"
                          />

                          <!-- form Step 5 -->
                          <taxiVoucherFormView 
                            v-if="headerTitle === 'Taxi Voucher' && viewLayout === 'document'" 
                            class="ml-8" 
                            :isEditing="isEditing" 
                            :currentIndex="dataIndex" 
                            :typeOfSubmitData="typeOfSubmitToProps"
                            @fetchTaxiVoucher="getTaxiVoucher"
                            @resetTypeOfSubmitData = "resetTypeOfSubmit"
                          />

                          <!-- table Step 5 -->
                          <taxiVoucherTableView
                            v-if="headerTitle === 'Taxi Voucher' && viewLayout === 'table'"
                            class="ml-8"
                          />

                          <!-- form Step 6 -->
                          <otherTransportationFormView 
                            v-if="headerTitle === 'Other Transportation' && viewLayout === 'document'" 
                            class="ml-8" 
                            :isEditing="isEditing"
                            :currentIndex="dataIndex"
                            :typeOfSubmitData="typeOfSubmitToProps"
                            @fetchOtherTransportation="getOtherTransportation"
                            @resetTypeOfSubmitData = "resetTypeOfSubmit"
                          />

                          <!-- table Step 6 -->
                          <otherTransportationTableView 
                            v-if="headerTitle === 'Other Transportation' && viewLayout === 'table'" 
                            class="ml-8"
                          />

                          <!-- form Step 7 -->
                              <accomodationFormView 
                                v-if="headerTitle === 'Accomodation' && viewLayout === 'document'" 
                                class="ml-8" 
                                :isEditing="isEditing" 
                                :currentIndex="dataIndex"
                                :typeOfSubmitData="typeOfSubmitToProps"
                                @fetchAccomodation="getAccomodation"
                                @resetTypeOfSubmitData = "resetTypeOfSubmit"
                              />

                          <!-- table Step 7 -->
                          <accomodationTableView 
                            v-if="headerTitle === 'Accomodation' && viewLayout === 'table'" 
                            class="ml-8"
                          />

                          <!-- form Step 8 -->
                          <cashAdvanceFormView 
                            
                            v-if="headerTitle === 'Cash Advance' && viewLayout === 'document'" 
                            class="ml-8" 
                            :isAddingFromRequestTrip="isAdding"
                            :isEditingFromRequestTrip="isEditing"
                            :currentIndex="dataIndex" 
                            :currentDetailIndex="detailIndex"
                            :isHeaderExist="headerCAData"
                            :typeOfSubmitData="typeOfSubmitToProps"
                            
                            :showCreateCAHeader="showCreateNewCAHeader"
                            
                            @fetchCashAdvance="getCashAdvance"
                            @resetTypeOfSubmitData="resetTypeOfSubmit"

                            :currentlyEditCAHeader="currentlyEditCAHeader"
                            @resetEditCAHeaderState="currentlyEditCAHeader = false"
                            
                            >

                            <!-- {{headerCAData}} -->

                            <!-- UNTUK CASH ADVANCE -->
                          
                          <!-- Button khusus CA, muncul tombol add saja saat CA Header nya kosong -->
                          <detailsFormHeader v-if="headerTitle === 'Cash Advance' & !headerCAData"
                            :title="headerTitle" 
                            @changeView="changeViewLayout"
                            >

                            <!-- muncul saat Cash Advance Header nya kosong -->
                            <div 
                              class="flex gap-2"
                              >

                              <div class="ml-7"></div>

                              <!-- saat CA Header kosong muncul Create -->
                              <buttonAddFormView
                                title="Create New CA Document"
                                v-if="isEditing & !showCreateNewCAHeader"
                                @click="showCreateNewCAHeader = true" 
                              />

                              <!-- saat klik create, maka akan muncul menu submit -->
                              <buttonAddFormView 
                                title="Add CA from empty header"
                                v-if="isEditing & showCreateNewCAHeader"
                                @click="changeType('Add')"
                                />
  
                              <!-- button cancel untuk membatalkan create -->
                              <buttonCancelFormView 
                                v-if="isEditing & showCreateNewCAHeader"
                                @click="showCreateNewCAHeader = false"               
                              />

                            </div>

                          </detailsFormHeader>

                          <!-- Button khusus CA, untuk Add saat data CA header sudah ada -->
                          <detailsFormHeader v-if="headerTitle === 'Cash Advance' & headerCAData & showCreateNewCAHeader" :title=headerTitle>
                            
                            <div
                              class="flex gap-2"
                            >
                              <buttonAddFormView
                                title="Add CA from not empty header"
                                v-if="isEditing"
                                @click="changeType('Add')"
                              />

                              <buttonCancelFormView 
                                v-if="isEditing"
                                @click="showCreateNewCAHeader = false; changeType('Reset')"               
                              />
                            </div>

                          </detailsFormHeader>

                          <!-- Button khusus CA, untuk RUD muncul saat ada data CA Header -->
                          <detailsFormHeader v-if="headerTitle === 'Cash Advance' & headerCAData & !showCreateNewCAHeader" :title=headerTitle>

                            <!-- muncul saat Cash Advance Header nya ada -->
                            <div
                              class="flex gap-2"
                            >

                                  <div class="flex gap-2 " :class="viewLayout === 'document' ? 'visible' : 'invisible'">

                                    <buttonEditFormView 
                                      v-if="isEditing & !currentlyEditCAHeader"
                                      @click="currentlyEditCAHeader = !currentlyEditCAHeader"
                                    />

                                    <buttonEditFormView
                                      v-if="currentlyEditCAHeader" 
                                      @click="changeType('Edit')"
                                    />

                                    <buttonCancelFormView 
                                      v-if="currentlyEditCAHeader"
                                      @click="currentlyEditCAHeader = !currentlyEditCAHeader"
                                    />

                                    <buttonAddFormView
                                      title="Add Cash Advance"
                                      v-if="isEditing & !currentlyEditCAHeader"
                                      @click="showCreateNewCAHeader = true; changeType('Empty')"
                                    />

                                    <!-- Issued Ticket Button -->
                                    <button 
                                      class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold" 
                                      v-if="$route.path === '/approvalrequesttrip'"
                                    >
                                      Issued Ticket
                                    </button>

                                    <!-- Revise Button -->
                                    <button 
                                      class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold"
                                      v-if="purposeOfTripData[currentIndex].status === 'Confirmed' & $route.path === '/approvalrequesttrip'" 
                                    >
                                      Revise
                                    </button>

                                    <!-- Showing data quantity -->
                                    <div 
                                      v-if="!currentlyEditCAHeader"
                                      class="flex gap-2 justify-between items-center mx-1 py-2"
                                    >

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
                                  
                                </div>
                                
                                <div class="flex-1" v-if="viewLayout === 'document'"></div>

                                <!-- DELETE BUTTON, IT WORKS -->
                                <button 
                                  @click="changeType('Delete')"
                                  v-if="isEditing & viewLayout === 'document' & !currentlyEditCAHeader" 
                                  class="bg-red-star text-white rounded-lg text-base py-[5px] px-[12px] font-bold items-center flex gap-2 mr-3"
                                >

                                  <img :src="deleteDocumentIcon" class="w-6 h-6" />
                                  Delete

                                </button>

                          </detailsFormHeader>

                          </cashAdvanceFormView>

                          <!-- table Step 8 -->
                          <cashAdvanceTableView 
                          v-if="headerTitle === 'Cash Advance' && viewLayout === 'table'" 
                            class="ml-8"
                          />

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