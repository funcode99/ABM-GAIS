<script setup>
    import { ref, onBeforeMount } from 'vue'
    
    import miniABM from '@/assets/mini-abm.png'
    import userImg from '@/assets/3-user.png'

    import Api from '@/utils/Api'
    
    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import multiStepCircleVertical from '@/components/molecules/multiStepCircleVertical.vue'
    import detailsFormHeader from '@/components/organisms/detailsFormHeader.vue'

    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonSaveFormView from '@/components/atomics/buttonSaveFormView.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    let isEditing = ref(false)

    let tab = ref('details')
    let showTravel = ref(true)
    let showAirlines = ref(true)
    let headerTitle = ref('Traveller')

    let purposeOfTripData = ref()
    let travellerGuestData = ref()
    let airlinesData = ref()
    let taxiVoucherData = ref()
    let otherTransportationData = ref()
    let accomodationData = ref()
    let cashAdvanceData = ref()

    const getPurposeOfTrip = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/request_trip/get/${localStorage.getItem('tripIdView')}`)      
        purposeOfTripData.value = api.data.data
      } catch (error) {
        console.log(error)
        purposeOfTripData.value = ''
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
        travellerGuestData.value = ''
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
        airlinesData.value = ''
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
        taxiVoucherData.value = ''
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
        otherTransportationData.value = ''
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
        accomodationData.value = ''
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
        cashAdvanceData.value = ''
      }
    }

    onBeforeMount(() => {

      getPurposeOfTrip()
      getTravellerGuest()
      getAirlines()
      getTaxiVoucher()
      getOtherTransportation()
      getAccomodation()
      getCashAdvance()

    })

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const rowClassStart = 'flex justify-between mx-4 items-start gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

    const closeBar = ref(true)
    const changeSelected = (title) => {
      headerTitle.value = title
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
                        Request Trip<span class="text-[#0a0a0a]"> / TRV-ABM/1232/23.04</span>
                      </h1>

                      <div class="flex-1"></div>

                      <div class="bg-[#8b8b8b] min-w-[114px] h-[42px] text-center text-base font-bold rounded-t-lg rounded-bl-3xl rounded-br-lg border flex items-center justify-center border-black">
                        {{ purposeOfTripData[0].status }}
                      </div>
                      
                    </div>

                    <div class="flex gap-4 mt-6 mb-3 ml-5">
                        <buttonEditFormView @click="isEditing = true" />
                        <buttonSaveFormView />
                    </div>

                    <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">

                        <div class="flex flex-col gap-2">
                                <span>Date Created <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled :value="purposeOfTripData[0].created_at" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                        </div>

                        <div class="flex flex-col gap-2">
                              <span>File Attachment <span class="text-[#f5333f]">*</span></span>
                              <input type="text" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" disabled />
                        </div>

                        <div class="flex flex-col gap-2">
                                <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled :value="purposeOfTripData[0].document_name" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                        </div>

                        <div class="flex flex-col gap-2">
                                <span>Requestor <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled :value="purposeOfTripData[0].employee_name"  class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                        </div>

                        <div class="flex flex-col gap-2">
                                <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled :value="purposeOfTripData[0].notes"  class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
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
                        <div class="flex-1">
                            
                          <detailsFormHeader :title="headerTitle">

                            <button class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                              Issued Ticket
                            </button>

                            <button class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                              Revise
                            </button>

                          </detailsFormHeader>

                          <div v-if="headerTitle == 'Traveller'" class="ml-8">

                              <div :class="rowClass">

                                    <div :class="columnClass">
                                        <div class="w-full">
                                          
                                          <label :class="labelStylingClass">
                                              Name <span class="text-red-star">*</span>
                                          </label>
                                          
                                          <input
                                            type="text"
                                            placeholder="Name"
                                            :class="inputStylingClass"
                                            required
                                          />

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
                                            required
                                        />

                                      </div>

                                    </div>

                                    <div :class="columnClass">

                                      <div class="w-full">
                                        
                                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                          Flight Class <span class="text-red-star">*</span>
                                        </label>
                                        
                                        <input 
                                          type="text"
                                          placeholder="Flight Class"
                                          :class="inputStylingClass"
                                          required
                                        />

                                      </div>

                                    </div>

                              </div>

                              <div :class="rowClass">

                                    <div :class="columnClass">
                                      <div class="w-full">
                                          
                                          <label :class="labelStylingClass">
                                              SN<span class="text-red-star">*</span>
                                          </label>

                                          <input 
                                            type="text"
                                            placeholder="SN"
                                            :class="inputStylingClass"
                                            required
                                          />

                                      </div>
                                    </div>

                                    <div :class="columnClass">

                                      <div class="w-full">

                                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                            Company<span class="text-red-star">*</span>
                                        </label>

                                        <input 
                                            type="text"
                                            :class="inputStylingClass"
                                            placeholder="Company"
                                            required
                                        />

                                        <!-- <select :class="inputStylingClass">
                                            <option selected hidden disabled>
                                              Company
                                            </option>
                                        </select> -->

                                      </div>

                                    </div>

                                    <div :class="columnClass"></div>

                              </div>

                              <div :class="rowClass">

                                    <div :class="columnClass">
                                      <div class="w-full">
                                          <label :class="labelStylingClass">
                                              Gender<span class="text-red-star">*</span>
                                          </label>
                                          <select :class="inputStylingClass">
                                            <option selected hidden disabled>
                                              Male
                                            </option>
                                            <option selected hidden disabled>
                                              Female
                                            </option>
                                          </select>
                                      </div>
                                    </div>

                                    <div :class="columnClass">
                                      <div class="w-full">
                                        <label
                                            class="block mb-2 font-JakartaSans font-medium text-sm"
                                            >Hotel Fare<span class="text-red-star">*</span></label
                                        >
                                        <select :class="inputStylingClass">
                                            <option selected hidden disabled>
                                              Fare
                                            </option>
                                          </select>
                                      </div>
                                    </div>

                                    <div :class="columnClass"></div>

                              </div>

                              <div :class="rowClass">

                                    <div :class="columnClass">
                                      <div class="w-full">
                                          <label :class="labelStylingClass">
                                              NIK<span class="text-red-star">*</span>
                                          </label>
                                          <input type="text" placeholder="NIK" :class="inputStylingClass">
                                      </div>
                                    </div>

                                    <div :class="columnClass">
                                      <div class="w-full">
                                        <label
                                            class="block mb-2 font-JakartaSans font-medium text-sm"
                                            >Flight Entitlement<span class="text-red-star">*</span></label
                                        >
                                        <select :class="inputStylingClass">
                                            <option selected hidden disabled>
                                              Flight Entitlement
                                            </option>
                                          </select>
                                      </div>
                                    </div>

                                    <div :class=columnClass></div>

                              </div>

                              <div :class="rowClass">

                                    <div :class="columnClass">
                                      <div class="w-full">
                                          <label :class="labelStylingClass">
                                              Contact No<span class="text-red-star">*</span>
                                          </label>
                                          <input :class="inputStylingClass" type="text" placeholder="Contact No">
                                      </div>
                                    </div>

                                    <div :class="columnClass">
                                      <div class="w-full">
                                        <label
                                            :class="labelStylingClass"
                                            >Notes<span class="text-red-star">*</span></label
                                        >
                                        <input type="text" placeholder="Notes" :class="inputStylingClass">
                                      </div>
                                    </div>

                                    <div :class="columnClass"></div>

                              </div>

                          </div>

                          <div v-if="headerTitle == 'Airlines'" class="ml-8">
                            
                            <div :class="rowClass">

                              <div :class="columnClass">
                                    
                                <div class="w-full">
                                        
                                        <label :class="labelStylingClass">
                                            Name<span class="text-red-star">*</span>
                                        </label>

                                        <input 
                                            :class="inputStylingClass"
                                            placeholder="Name"
                                            required
                                        />

                                        <!-- <select :class="inputStylingClass">
                                          <option selected hidden disabled>
                                            Name
                                          </option>
                                        </select> -->

                                </div>

                              </div>

                              <div :class="columnClass">

                                <div class="w-full">
                                        
                                    <label :class="labelStylingClass">
                                      Domestic/International<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      :class="inputStylingClass"
                                      placeholder="Domestic/International"
                                      required
                                    />

                                </div>

                              </div>

                              <div :class="columnClass"></div>

                            </div>

                            <div :class="rowClass">

                              <div :class="columnClass">
                                  
                                  <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Departure<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Departure"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                              </div>

                              <div :class="columnClass">

                                <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                      Price<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Price"
                                      :class="inputStylingClass"
                                      required
                                    />

                                </div>

                              </div>

                              <div :class="columnClass"></div>

                            </div>

                            <div :class="rowClass">

                              <div :class="columnClass">
                                  
                                  <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Arrival<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Arrival"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                              </div>

                              <div :class="columnClass">
                                  
                                  <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Status<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Status"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                              </div>

                              <div :class="columnClass"></div>

                            </div>

                            <div class="flex justify-between mx-4 items-start gap-2 my-6">

                                <div :class="columnClass">
                                  
                                  <div class="w-full">
                                      
                                    <label :class="labelStylingClass">
                                      Flight Number<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Flight Number"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                                </div>

                                <!-- <div :class="columnClass">
                                  <div class="w-full">
                                    <label
                                        class="block mb-2 font-JakartaSans font-medium text-sm"
                                        >Vendor<span class="text-red-star">*</span></label
                                    >
                                    <div>
                                      <input class="w-6 h-6" type="radio" name="vendor">
                                      <label class="ml-4">Antavaya</label>
                                    </div>
                                    <div>
                                      <input class="w-6 h-6" type="radio" name="vendor">
                                      <label class="ml-4">Aerowisata</label>
                                    </div>
                                  </div>
                                </div> -->

                                <div :class="columnClass"></div>

                            </div>

                          </div>

                          <div v-if="headerTitle == 'Taxi Voucher'" class="ml-8">

                              <div :class="rowClass">

                                <div :class="columnClass">

                                  <div class="w-full">
                                      
                                    <label :class="labelStylingClass">
                                      Name<span class="text-red-star">*</span>
                                    </label>
                                      
                                    <input 
                                      type="text"
                                      placeholder="Name"
                                      :class="inputStylingClass"
                                      required
                                    /> 
                                    
                                    <!-- <select :class="inputStylingClass">
                                        <option selected hidden disabled>
                                          Name
                                        </option>
                                      </select> -->



                                  </div>

                                </div>

                                <div :class="columnClass">

                                  <div class="w-full">
                                    
                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                      Departure<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Departure"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                                </div>

                              </div>

                              <div :class="rowClass">

                              <div :class="columnClass">
                                <div class="w-full">
                                    
                                  <label :class="labelStylingClass">
                                    Date<span class="text-red-star">*</span>
                                  </label>

                                  <input 
                                    type="text"
                                    placeholder="Date"
                                    :class="inputStylingClass"
                                    required
                                  />

                                    <!-- <select :class="inputStylingClass">
                                      <option selected hidden disabled>
                                        City
                                      </option>
                                    </select> -->

                                </div>
                              </div>

                              <div :class="columnClass">
                                <div class="w-full">
                                  <label
                                      class="block mb-2 font-JakartaSans font-medium text-sm"
                                      >Arrival<span class="text-red-star">*</span></label
                                  >
                                  <!-- <select :class="inputStylingClass">
                                      <option selected hidden disabled>
                                        City
                                      </option>
                                    </select> -->
                                    
                                    <input 
                                      type="text"  
                                      placeholder="City"
                                      :class="inputStylingClass"
                                      required
                                    />

                                </div>
                              </div>

                              </div>

                              <div :class="rowClass">

                              <div :class="columnClass">
                                <div class="w-full">
                                    <label :class="labelStylingClass">
                                        Amount<span class="text-red-star">*</span>
                                    </label>
                                    <input type="text" :class='inputStylingClass' placeholder="Amount">
                                </div>
                              </div>

                              <div :class="columnClass">
                                <div class="w-full">
                                    <label :class="labelStylingClass">
                                        <span>Voucher Code</span>
                                    </label>
                                    <input type="text" :class='inputStylingClass' placeholder="Voucher">
                                </div>
                              </div>

                              </div>

                              <div :class="rowClassStart">

                              <div :class="columnClass">
                                <div class="w-full">
                                    <label :class="labelStylingClass">
                                        <span>Account Name</span><span class="text-red-star">*</span>
                                    </label>
                                    <input type="text" :class='inputStylingClass' placeholder="Account Name">
                                </div>
                              </div>

                              <div :class="columnClass">
                                <div class="w-full">
                                  <label :class="labelStylingClass">
                                    Remarks
                                  </label>
                                  <textarea :class="inputStylingClass" placeholder="Remarks"></textarea>
                                </div>
                              </div>

                              </div>

                          </div>

                          <div v-if="headerTitle == 'Other Transportation'" class="ml-8">
                              
                            <div :class="rowClass">

<div :class="columnClass">
  <div class="w-full">
      <label :class="labelStylingClass">
          Traveller<span class="text-red-star">*</span>
      </label>
      <select :class="inputStylingClass">
        <option selected hidden disabled>
          Name
        </option>
      </select>
  </div>
</div>

<div :class="columnClass">
  <div class="w-full">
    <label
        class="block mb-2 font-JakartaSans font-medium text-sm"
        >City<span class="text-red-star">*</span></label
    >
    <select :class="inputStylingClass">
        <option selected hidden disabled>
          City
        </option>
      </select>
  </div>
</div>

                            </div>

                            <div :class="rowClass">

                            <div :class="columnClass">
                              <div class="w-full">
                                  <label :class="labelStylingClass">
                                      Type of Transportation<span class="text-red-star">*</span>
                                  </label>
                                  <select :class="inputStylingClass">
                                    <option selected hidden disabled>
                                      City
                                    </option>
                                    <option>
                                      RWA HO Office Car
                                    </option>
                                    <option>
                                      Rent Car
                                    </option>
                                    <option>
                                      TIA Site Car
                                    </option>
                                    <option>
                                      CK MIFA Site Car
                                    </option>
                                    <option>
                                      TIA HO Car
                                    </option>
                                    <option>
                                      SSB Pool Car
                                    </option>
                                  </select>
                              </div>
                            </div>

                            <div :class="columnClass">
                              <div class="w-full">
                                <label
                                    class="block mb-2 font-JakartaSans font-medium text-sm"
                                    >Quantity<span class="text-red-star">*</span></label
                                >
                                <input type="text" placeholder="Quantity" :class=inputStylingClass>
                              </div>
                            </div>

                            </div>

                            <div :class="rowClass">

                              <div :class="columnClass">
                              <div class="w-full">
                              <label :class="labelStylingClass">
                                From Date<span class="text-red-star">*</span>
                              </label>
                              <select :class="inputStylingClass">
                              <option selected hidden disabled>
                                Date
                              </option>
                              </select>
                              </div>
                              </div>

                              <div :class="columnClass">
                              <div class="w-full">
                              <label
                                class="block mb-2 font-JakartaSans font-medium text-sm"
                                >Remarks<span class="text-red-star">*</span></label
                              >
                              <input type="text" placeholder="Remarks" :class=inputStylingClass>
                              </div>
                              </div>

                            </div>

                            <div :class="rowClass">

                            <div :class="columnClass">
                              <div class="w-full">
                                <label :class="labelStylingClass">
                                  To Date<span class="text-red-star">*</span>
                                </label>
                                <select :class="inputStylingClass">
                                <option selected hidden disabled>
                                  Date
                                </option>
                                </select>
                              </div>
                            </div>

                            </div>

                          </div>

                          <div v-if="headerTitle == 'Accomodation'" class="ml-8">
                              
                              <div :class="rowClass">
  
                                <div :class="columnClass">

                                  <div class="w-full">
                                      
                                    <label :class="labelStylingClass">
                                      Name<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Name"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                                </div>
                                
                                <div :class="columnClass">
                                  <div class="w-full">
                                    
                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        City<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="City"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>
                                </div>
  
                              </div>
  
                              <div :class="rowClass">
  
                                <div :class="columnClass">

                                  <div class="w-full">
                                      
                                    <label :class="labelStylingClass">
                                      Hotel Name<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Hotel Name"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                                </div>
    
                                <div :class="columnClass">
                                  
                                  <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Type<span class="text-red-star">*</span>
                                    </label>

                                    <input type="text" placeholder="Type" :class=inputStylingClass>
                                  
                                  </div>

                                </div>
  
                              </div>
  
                              <div :class="rowClass">
  
                                <div :class="columnClass">
                                  
                                  <div class="w-full">

                                    <label :class="labelStylingClass">
                                      Check In<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="date"
                                      :class="inputStylingClass"
                                      placeholder="Date"
                                      required
                                    />

                                  </div>

                                </div>
  
                                <div :class="columnClass">

                                  <div class="w-full">
                                    
                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                      Sharing With
                                    </label>

                                    <input type="text" placeholder="Sharing With" :class=inputStylingClass>
                                  
                                  </div>

                                </div>
  
                              </div>
  
                              <div :class="rowClass">
  
                                <div :class="columnClass">
                                  <div class="w-full">

                                    <label :class="labelStylingClass">
                                      To Date<span class="text-red-star">*</span>
                                    </label>

                                    <!-- <select :class="inputStylingClass">
                                    <option selected hidden disabled>
                                      Date
                                    </option>
                                    </select> -->

                                    <input 
                                      type="date"
                                      :class="inputStylingClass"
                                      placeholder="Date"
                                      required
                                    />

                                  </div>
                                </div>
  
                              </div>
  
                          </div>

                          <div v-if="headerTitle == 'Cash Advance'" class="ml-8">

                              <div :class="rowClass">
                                
                                <div :class="columnClass">
                                  <label>Traveller</label>
                                  <input :class="inputStylingClass" placeholder="Name" />
                                </div>

                                <div :class="columnClass">
                                  <label>Total</label>
                                  <input :class="inputStylingClass" placeholder="Total" />
                                </div>

                                <div :class="columnClass">
                                  
                                </div>

                              </div>

                              <div :class="rowClass">
                                
                                <div :class="columnClass">
                                  
                                  <label :class="labelStylingClass">
                                    Notes  
                                  </label>
                                  
                                  <textarea :class="inputStylingClass" placeholder="Notes"></textarea>
                                
                                </div>

                                <div></div>
                                <div></div>
                                
                              </div>

                              <div class="mx-4">
                                <h1 class="font-medium">Details Item</h1>
                                <hr class="border border-black" />
                              </div>

                              <form @submit.prevent="">

                                <div :class="rowClass">
                                  
                                  <div :class="columnClass">
                                    <label :class="labelStylingClass">
                                      Item <span class="text-red-star">*</span>
                                    </label>
                                    <input :class="inputStylingClass" placeholder="Item" />
                                  </div>
                                  
                                  <div :class="columnClass">
                                    <label :class="labelStylingClass">
                                      Nominal <span class="text-red-star">*</span>
                                    </label>
                                    <input :class="inputStylingClass" placeholder="Nominal" />
                                  </div>

                                  <div :class="columnClass"></div>

                                </div>
                                
                                <div :class="rowClass">
                                
                                  <div :class="columnClass">
                                    <label :class="labelStylingClass">
                                      Frequency<span class="text-red-star">*</span>
                                    </label>
                                    <input :class="inputStylingClass" placeholder="Frequency" />
                                  </div>
                                  
                                  <div :class="columnClass">
                                    <label :class="labelStylingClass">
                                      Total
                                    </label>
                                    <input :class="inputStylingClass" placeholder="Total" />
                                  </div>

                                  <div :class="columnClass"></div>

                                </div>
                                
                                <div :class="rowClassStart">
                                
                                  <div :class="columnClass">

                                    <label :class="labelStylingClass">
                                      Currency<span class="text-red-star">*</span>
                                    </label>

                                    <select :class="inputStylingClass">
                                      <option>
                                        Currency
                                      </option>
                                    </select>
                                  
                                  </div>

                                  <div :class="columnClass">
                                    
                                    <label :class="labelStylingClass">
                                      Remarks<span class="text-red-star">*</span>
                                    </label>

                                    <textarea :class="inputStylingClass" placeholder="Remarks"></textarea>

                                  </div>

                                  <div :class="columnClass"></div>

                                </div>

                              </form>

                          </div>

                        </div>

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

                        <!-- harus refresh page dulu baru props nya masuk -->
                        <multiStepCircleVertical :image="userImg" formType="traveller"  />
                        <multiStepCircleVertical :image="userImg" formType="airlines" />
                        <multiStepCircleVertical :image="userImg" formType="taxi-voucher" />
                        <multiStepCircleVertical :image="userImg" formType="other-transportation" />
                        <multiStepCircleVertical :image="userImg" formType="accomodation" />
                        <!-- closeBar isi nya true -->
                        <multiStepCircleVertical :image="userImg" formType="cash-advance" :stop="closeBar" />

                      </div>

                    <div>

</div>


                    </div>

                    </div>

                    <!-- diluar approval -->

                </div>

            </div>

        </div>

    </div>

    <Footer />

</template>

<style scoped>

</style>