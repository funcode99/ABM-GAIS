<script setup>
import { ref, watch, onBeforeMount, provide } from 'vue'
import { Modal } from 'usemodal-vue3'
import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
import Api from '@/utils/Api'
import Multiselect from "@vueform/multiselect"

import arrow from '@/assets/arrow-multi-step-form.png'
import check from '@/assets/step-done-check.png'

import modalHeader from '@/components/modal/modalHeader.vue'

import guestAsTravellerTable from '@/components/request-trip/table-step-form/guest-as-traveller-table.vue'
import airlinesTable from '@/components/request-trip/table-step-form/airlines-table.vue'
import taxiVoucherTable from '@/components/request-trip/table-step-form/taxi-voucher-table.vue'
import otherTransportationTable from '@/components/request-trip/table-step-form/other-transportation-table.vue'
import accomodationTable from '@/components/request-trip/table-step-form/accomodation-table.vue'
import cashAdvanceTable from '@/components/request-trip/table-step-form/cash-advance-table.vue'

import guestAsTravellerForm from '@/components/request-trip/modal-step-form/guest-as-traveller-form.vue'
import airlinesForm from '@/components/request-trip/modal-step-form/airlines-form.vue'
import taxiVoucherForm from '@/components/request-trip/modal-step-form/taxi-voucher-form.vue'
import otherTransportationForm from '@/components/request-trip/modal-step-form/other-transportation-form.vue'
import accomodationForm from '@/components/request-trip/modal-step-form/accomodation-form.vue'
import cashAdvanceForm from '@/components/request-trip/modal-step-form/cash-advance-form.vue'

    const emits = defineEmits('updateRequestTripTable')

    let employeeLoginData = ref([])
    let costCenterId = ref()

    const getEmployeeByLogin = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/employee/get_by_login')
      employeeLoginData.value = api.data.data
      costCenterId.value = employeeLoginData.value[0].id_cost_center

    }
  
    let referenceFetch = useReferenceFetchResult()

    let isVisibleOpenModal = ref(false)

    let filterData = ref([])
    let optionDataPurposeofTrip = ref([])
    let optionDataEmployeeRequestor = ref([])
    let optionDataCity = ref([])
    let optionDataSite = ref([])
    let optionDataZona = ref([])
    let optionDataFlightClass = ref([])
    let optionDataTravellerType = ref([])
    let optionDataCompany = ref([])
    let optionDataJobBand = ref([])
    let optionDataTransportationType = ref([])
    let optionDataCostCenter = ref([])

    let travellerGuestTableData = ref([])
    let airlinesTableData = ref([])
    let taxiVoucherTableData = ref([])
    let otherTransportationTableData = ref([])
    let accomodationTableData = ref([])
    let cashAdvanceTableData = ref([])

    provide('travellerDataView', travellerGuestTableData)
    provide('airlinesDataView', airlinesTableData)
    provide('taxiVoucherDataView', taxiVoucherTableData)
    provide('otherTransportationDataView', otherTransportationTableData)
    provide('accomodationDataView', accomodationTableData)
    provide('cashAdvanceDataView', cashAdvanceTableData)

    let isVisibleGuest = ref(false)
    let isVisibleAirlines = ref(false)
    let isVisibleTaxiVoucher = ref(false)
    let isVisibleOtherTransportation = ref(false)
    let isVisibleAccomodation = ref(false)
    let isVisibleCashAdvance = ref(false)

    let modalPaddingHeight = '10vh'

    let formStep = ref(0)

    let requestType = ref([null, 'Company Business'])
    let stepCounter = ref(7)

    // gara2 js nya error watch nya jadi ga jalan :(
    watch(requestType, (newValue) => {

      if(newValue[1] == 'Company Business') {
        stepCounter.value = 7
      } else if(newValue[1] == 'Site Visit') {
        stepCounter.value = 7
      } else if (newValue[1] == 'Field Break') {
        stepCounter.value = 4
      } else if (newValue[1] == 'Taxi Voucher') {
        stepCounter.value = 3
      } else if (newValue[1] == 'Crewing') {
        stepCounter.value = 4
      }

    })

    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'

    const inputStylingWithoutWidthClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
    const circleStepBasicStylingClass = 'rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative'

    // Purpose of Trip
    let requestor = ref('')
    let requestorName = ref('')
    let locationId = ref('')
    let location = ref('')
    let sn = ref('')
    let telephone = ref('')
    let notesToPurposeOfTrip = ref('')
    let fromCity = ref('')
    let toCity = ref('')
    let zona = ref('')
    let zonaName = ref('')
    let TLKperDay = ref(0)
    let totalDays = ref()
    let totalTLK = ref(0)
    let departureDate = ref('')
    let returnDate = ref('')
    let siteVisitLocation = ref('')
    let siteVisitAttachmentFile = ref('')

    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();
    let minDate = year + "-" + month + "-" + day;

    let getDepartureDateYear = ref()
    let getDepartureDateMonth = ref()
    let getDepartureDateDay = ref()

    let getReturnDateYear = ref()
    let getReturnDateMonth = ref()
    let getReturnDateDay = ref()
    
    let formattedDepartureDate = ref()
    let formattedReturnDate = ref()

    let date1 = ref('')
    let date2 = ref('')
    let margin = ref()

    watch(departureDate, (newValue) => {
      getDepartureDateYear = newValue.toString().substring(0,4)
      getDepartureDateMonth = newValue.toString().substring(5,7)
      getDepartureDateDay = newValue.toString().substring(8,10)
      formattedDepartureDate = getDepartureDateYear + '/' + getDepartureDateMonth + '/' + getDepartureDateDay
      date2 = new Date(formattedDepartureDate)
      if(date1.value !== '') {
        margin = date1.getTime() - date2.getTime()
        totalDays = Math.ceil((margin/(1000*3600*24))+1)
        totalTLK = totalDays * TLKperDay.value
      }
    })

    watch(returnDate, (newValue) => {
        getReturnDateYear = newValue.toString().substring(0,4)
        getReturnDateMonth = newValue.toString().substring(5,7)
        getReturnDateDay = newValue.toString().substring(8,10)
        formattedReturnDate = getReturnDateYear + '/' + getReturnDateMonth + '/' + getReturnDateDay
        date1 = new Date(formattedReturnDate)
        if(date2.value  !== '') {
          margin = date1.getTime() - date2.getTime()
          totalDays = Math.ceil((margin/(1000*3600*24))+1)
          totalTLK = totalDays * TLKperDay.value
        }
    })

    watch(TLKperDay, () => {
      if(date1.value !== '' && date2.value !== '') {
        margin = date1.getTime() - date2.getTime()
        totalDays = Math.ceil((margin/(1000*3600*24))+1)
        totalTLK = totalDays * TLKperDay.value
      }
    })

    const resetProgressData = () => {

      travellerGuestTableData.value = []
      airlinesTableData.value = []
      taxiVoucherTableData.value = []
      otherTransportationTableData.value = []
      accomodationTableData.value = []
      cashAdvanceTableData.value = []

    }

    const savePurposeOfTrip = async () => {
      
      // ternyata isi nya null cok
      if(localStorage.getItem("tripId") !== null) {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`

        if(requestType.value[1] == 'Site Visit') {

          const api = await Api.post(`/request_trip/update_data/${localStorage.getItem('tripId')}`, {
            id_zona: zona.value,
            id_city_to: toCity.value,
            id_employee: requestor.value,
            id_city_from: fromCity.value,
            code_document: requestType.value[0],
            notes: notesToPurposeOfTrip.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK,
            id_site: siteVisitLocation.value,
            file: siteVisitAttachmentFile.value,
          })

          // console.log(api)
          // console.log(api.data.data)
          localStorage.setItem('dateArrival', api.data.data.date_arrival)
          localStorage.setItem('dateDeparture', api.data.data.date_departure)
          console.log('membuat request trip site visit dengan id yang sudah ada')

        } 
        
        else if (requestType.value[1] == 'Field Break') {
          
          const api = await Api.post(`/request_trip/update_data/${localStorage.getItem('tripId')}`, {
            id_zona: zona.value,
            id_city_to: toCity.value,
            id_employee: requestor.value,
            id_city_from: fromCity.value,
            code_document: requestType.value[0],
            notes: notesToPurposeOfTrip.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK,
            file: siteVisitAttachmentFile.value,
            id_site: localStorage.getItem('id_site')
          })

          console.log(api)
          console.log(api.data.data)
          localStorage.setItem('dateArrival', api.data.data.date_arrival)
          localStorage.setItem('dateDeparture', api.data.data.date_departure)
          console.log('membuat request trip field break dengan id yang sudah ada')

        }
        
        else {

          const api = await Api.post(`/request_trip/update_data/${localStorage.getItem('tripId')}`, {
            id_zona: zona.value,
            id_city_to: toCity.value,
            id_employee: requestor.value,
            id_city_from: fromCity.value,
            code_document: requestType.value[0],
            notes: notesToPurposeOfTrip.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK,
            id_site: localStorage.getItem('id_site')
          })

          console.log(api)
          console.log(api.data.data)
          localStorage.setItem('dateArrival', api.data.data.date_arrival)
          localStorage.setItem('dateDeparture', api.data.data.date_departure)
          console.log('membuat request trip dengan id yang sudah ada')

        }

        formStep.value++
        resetProgressData()

      }

      else {
        
        if(requestType.value[1] == 'Site Visit') {

          const api = await Api.post('/request_trip/store', {
            id_zona: zona.value,
            id_city_to: toCity.value,
            id_employee: requestor.value,
            id_city_from: fromCity.value,
            code_document: requestType.value[0],
            notes: notesToPurposeOfTrip.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK,
            id_site: siteVisitLocation.value,
            file: siteVisitAttachmentFile.value,
          })

          console.log(api)
          console.log(api.data.data)
          localStorage.setItem('dateArrival', api.data.data.date_arrival)
          localStorage.setItem('dateDeparture', api.data.data.date_departure)
          console.log('membuat request trip site visit dengan id baru')
          localStorage.setItem('tripId', api.data.data.id)

        }

        else if (requestType.value[1] == 'Field Break') {

          const api = await Api.post('/request_trip/store', {
            id_zona: zona.value,
            id_city_to: toCity.value,
            id_employee: requestor.value,
            id_city_from: fromCity.value,
            code_document: requestType.value[0],
            notes: notesToPurposeOfTrip.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK,
            file: siteVisitAttachmentFile.value,
            id_site: localStorage.getItem('id_site')
          })

          console.log(api)
          console.log(api.data.data)
          localStorage.setItem('dateArrival', api.data.data.date_arrival)
          localStorage.setItem('dateDeparture', api.data.data.date_departure)
          console.log('membuat request trip field break dengan id baru')
          localStorage.setItem('tripId', api.data.data.id)

        }

        else {

          const api = await Api.post('/request_trip/store', {
            id_zona: zona.value,
            id_city_to: toCity.value,
            id_employee: requestor.value,
            id_city_from: fromCity.value,
            code_document: requestType.value[0],
            notes: notesToPurposeOfTrip.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK,
            id_site: localStorage.getItem('id_site')
          })

          console.log(api)
          localStorage.setItem('dateArrival', api.data.data.date_arrival)
          localStorage.setItem('dateDeparture', api.data.data.date_departure)
          console.log(api.data.data)

          if(api.data.message !== 'Already Has Draft Data') {
            console.log('membuat request trip dengan id baru')
            localStorage.setItem('tripId', api.data.data.id)
          } else {
            throw api.data.message
            // alert(api.data.message)
          }

        }

        formStep.value++
        resetProgressData()

      }

      emits('updateRequestTripTable')

    }

    const submitRequestTrip = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.post(`/request_trip/submit/${localStorage.getItem("tripId")}`)
      isVisibleOpenModal.value = !isVisibleOpenModal.value
    }

    watch(optionDataEmployeeRequestor, () => {
      requestor.value = optionDataEmployeeRequestor.value[0].id
      requestorName.value = optionDataEmployeeRequestor.value[0].employee_name
      locationId.value = optionDataEmployeeRequestor.value[0].id_site
      location.value = optionDataEmployeeRequestor.value[0].company_name
      sn.value = optionDataEmployeeRequestor.value[0].sn_employee
      telephone.value = optionDataEmployeeRequestor.value[0].phone_number
    })

    const fetchDocumentCode = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/request_trip/get_document_code')
      optionDataPurposeofTrip.value = api.data.data
    }

    const fetchEmployeeRequestor = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/employee/get_by_login')
      optionDataEmployeeRequestor.value = api.data.data
    }

    const fetchCity = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/city')
      optionDataCity.value = api.data.data
    }

    const fetchSite = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/site/get_data')
      optionDataSite.value = api.data.data
    }

    const fetchFlight = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/flight_class/')
      optionDataFlightClass.value = api.data.data
    }

    const fetchTravellerType = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/travel_guest/get_type_traveller')
      optionDataTravellerType.value = api.data.data
    }

    const fetchCompany = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/company/get')
      optionDataCompany.value = api.data.data
    }

    const fetchJobBand = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/job_band')
      optionDataJobBand.value = api.data.data.data
    }

    const fetchTypeOfTransportation = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/other_transport/get_type_transport')
      optionDataTransportationType.value = api.data.data
    }

    // for request trip table
    const fetchTravellerGuest = async (tripId) => {

      if(tripId) {
        try {
          const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/travel_guest/get_by_travel_id/trip_id/${tripId}`)
        travellerGuestTableData.value = api.data.data
        console.log('berhasil mengambil data traveller guest!')          
        } catch (error) {
          travellerGuestTableData.value = []
        }

      } else {
        try {
          const token = JSON.parse(localStorage.getItem('token'))
          Api.defaults.headers.common.Authorization = `Bearer ${token}`
          const api = await Api.get(`/travel_guest/get_by_travel_id/trip_id/${localStorage.getItem("tripId")}`)
          travellerGuestTableData.value = api.data.data
          console.log('berhasil mengambil data traveller guest!')          
        } catch (error) {
          console.log(error)
          travellerGuestTableData.value = []
        }

      }

    }

    // for airlines table
    const fetchAirlines = async () => {

      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/flight_trip/get_by_travel_id/trip_id/${localStorage.getItem("tripId")}`)
        airlinesTableData.value = api.data.data        
      } catch (error) {
        airlinesTableData.value = []
      }

    }
  
    // for taxi voucher table
    const fetchTaxiVoucher = async () => {

      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/taxi_voucher/get_by_travel_id/trip_id/${localStorage.getItem("tripId")}`)
        taxiVoucherTableData.value = api.data.data        
      } catch (error) {
        taxiVoucherTableData.value = []
      }

    }

    // for other transportation table
    const fetchOtherTransportation = async () => {
      
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/other_transport/get_by_travel_id/trip_id/${localStorage.getItem("tripId")}`)
        otherTransportationTableData.value = api.data.data        
      } catch (error) {
        otherTransportationTableData.value = []
      }

    }

    // for accomodation table
    const fetchAccomodation = async () => {

      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/accomodation_trip/get_by_travel_id/trip_id/${localStorage.getItem("tripId")}`)
        accomodationTableData.value = api.data.data        
      } catch (error) {
        accomodationTableData.value = []
      }

    }

    // for cash advance table
    const fetchCashAdvance = async () => {

      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/cash_advance/get_by_trip_id/${localStorage.getItem("tripId")}`)
        cashAdvanceTableData.value = api.data.data        
      } catch (error) {
        cashAdvanceTableData.value = []
      }

    }

    onBeforeMount(() => {

      fetchDocumentCode()
      fetchEmployeeRequestor()
      fetchCity()
      fetchSite()
      fetchCompany()
      fetchFlight()
      fetchJobBand()
      fetchTypeOfTransportation()

      fetchTravellerType()
      fetchCostCenter()
      getEmployeeByLogin()
      
    })

    const companyBusinessStepList = [
      {id: 2, title: 'Travellers' },
      {id: 3, title: 'Airlines' },
      {id: 4, title: 'Taxi Voucher' },
      {id: 5, title: 'Other Transportation' },
      {id: 6, title: 'Accomodation' },
      {id: 7, title: 'Cash Advance' },
    ]

    const fieldBreakStepList = [
      {id: 2, title: 'Travellers' },
      {id: 3, title: 'Airlines' },
      {id: 4, title: 'Other Transportation' }
    ]

    const taxiVoucherStepList = [
      {id: 2, title: 'Travellers'},
      {id: 3, title: 'Taxi Voucher'}
    ]

    const crewingStepList = [
      {id: 2, title: 'Traveller'},
      {id: 3, title: 'Airlines'},
      {id: 4, title: 'Accomodation'}
    ]

    const fetchTLKByJobBand = async () => {
      let jobBandId = referenceFetch.fetchEmployeeByLoginResult[0].id_job_band
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/zona_job/get_by_job/${jobBandId}`)
      filterData.value = api.data.data
      TLKperDay.value = filterData.value[0].tlk_rate
    }

    const fetchZonaByCity = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/zona/get_by_city/${toCity.value}`)
      optionDataZona.value = api.data.data
      zona.value = optionDataZona.value[0].id_zona
      zonaName.value = optionDataZona.value[0].zona_name
    }

    const fetchCostCenter = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/company/get_cost_center`)
      optionDataCostCenter.value = api.data.data
      optionDataCostCenter.value.map((item) => {
      item.value = item.id
    })
    }

    watch(zona, () => {
      fetchTLKByJobBand()
    })

    watch(toCity, () => {
      fetchZonaByCity()
    })

    watch(isVisibleOpenModal, () => {
      // resetInput()
      formStep.value = 0
      localStorage.removeItem('tripId')
      localStorage.removeItem('dateArrival')
      localStorage.removeItem('dateDeparture')
    })
    
    watch(isVisibleAccomodation, () => {
      if(isVisibleAccomodation.value) {
          fetchTravellerGuest()
      }
    })

    const updateFile = (event) => {
      siteVisitAttachmentFile.value = event.target.files[0]
    }

    const addButtonStylingClass = 'btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2'

</script>

<template>

    <button 
      @click="isVisibleOpenModal = !isVisibleOpenModal" 
      :class="addButtonStylingClass">
      + Add New
    </button>

    <Modal type="clean" v-model:visible="isVisibleOpenModal" v-model:offsetTop="modalPaddingHeight">
      
      <!-- modal title -->
      <modalHeader @closeVisibility="isVisibleOpenModal = !isVisibleOpenModal" :title="'New Request Trip'" />

      <!-- step circle -->
        <div class="flex justify-center pt-3 px-[10px] gap-x-[19px] h-[100px]">
  
          <!-- step 1 circle -->
          <div :class="[formStep > 0 ? 'bg-[#fff]' : formStep === 0 ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">Requester Info</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 0 ? 'block' : 'hidden'">
          </div>

          <!-- step 2 circle -->
          <div class="overflow-hidden" :class="[formStep > 1 ? 'bg-[#fff]' : formStep === 1 ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 1 ? 'block' : 'hidden'">
              <!-- absolute top-[14px] bottom-0 right-[-19px]  -->
              <h1 class="mt-11 w-11 font-medium text-[10px] text-black fixed">Purpose of Trip</h1>
          </div>

          <img :src="arrow" class="h-5 w-5 mt-[14px] mr-[-19px] ml-[-19px]">

          <div v-if="requestType[1] == 'Company Business'" v-for="data in companyBusinessStepList" :class="[formStep > data.id ? 'bg-[#fff]' : formStep === data.id ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">{{ data.title }}</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" :class="data.id == 7 ? 'hidden' : 'block'">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > data.id ? 'block' : 'hidden'">
          </div>

          <div v-if="requestType[1] == 'Site Visit'" v-for="data in companyBusinessStepList" :class="[formStep > data.id ? 'bg-[#fff]' : formStep === data.id ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">{{ data.title }}</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" :class="data.id == 7 ? 'hidden' : 'block'">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > data.id ? 'block' : 'hidden'">
          </div>

          <div v-if="requestType[1] == 'Field Break'" v-for="data in fieldBreakStepList" :class="[formStep > data.id ? 'bg-[#fff]' : formStep === data.id ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">{{ data.title }}</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" :class="data.id == 4 ? 'hidden' : 'block'">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > data.id ? 'block' : 'hidden'">
          </div>

          <div v-if="requestType[1] == 'Taxi Voucher'" v-for="data in taxiVoucherStepList" :class="[formStep > data.id ? 'bg-[#fff]' : formStep === data.id ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">{{ data.title }}</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" :class="data.id == 3 ? 'hidden' : 'block'">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > data.id ? 'block' : 'hidden'">
          </div>

          <div v-if="requestType[1] == 'Crewing'" v-for="data in crewingStepList" :class="[formStep > data.id ? 'bg-[#fff]' : formStep === data.id ? 'bg-[#d9d9d9]' : 'bg-white', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">{{ data.title }}</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" :class="data.id == 4 ? 'hidden' : 'block'">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > data.id ? 'block' : 'hidden'">
          </div>
  
        </div>

      <!-- add button for company business & site visit -->
      <button v-if="formStep == 2 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleGuest = !isVisibleGuest" :class="addButtonStylingClass">
          + Add Guest
      </button>

      <button v-if="formStep == 3 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleAirlines = !isVisibleAirlines" :class="addButtonStylingClass">
          + Add Airlines
      </button>

      <button v-if="formStep == 4 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleTaxiVoucher = !isVisibleTaxiVoucher" :class="addButtonStylingClass">
          + Add Taxi Voucher
      </button>

      <button v-if="formStep == 5 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" :class="addButtonStylingClass">
          + Add Other Transportation
      </button>

      <button v-if="formStep == 6 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleAccomodation = !isVisibleAccomodation" :class="addButtonStylingClass">
          + Add Accomodation
      </button>

      <button v-if="formStep == 7 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleCashAdvance = !isVisibleCashAdvance" :class="addButtonStylingClass">
        + Add Cash Advance
      </button>

      <!-- Step 1 & 2 FORM & Step x TABLE -->
      <div class="modal-box-inner-inner mt-4">
          <div :class="formStep == 0 ? 'h-[250px]' : 'max-h-[500px]' ">

              <!-- Step 1 Requestor Info FORM -->
              <div class="text-left" :class="formStep == 0 ? 'block' : 'hidden'">
  
              <div :class="rowClass">
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span>
                      Requestor <span class="text-[#f5333f]">*</span>
                    </span>
                    <div>
                      <input disabled :class="inputStylingClass" type="text" required v-model="requestorName" />
                    </div>
                  </div>
                </div>
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span class="block">
                      Location <span class="text-[#f5333f]">*</span>
                    </span>
                    <input disabled :class="inputStylingClass" type="text" required v-model="location" />
                  </div>
                </div>
  
              </div>
  
              <div :class="rowClass">
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span class="block">
                      SN <span class="text-red-star">*</span>
                    </span>
                    <input disabled :class="inputStylingClass" type="text" required v-model="sn" />
                  </div>
  
                </div>
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span class="block">Phone <span class="text-red-star">*</span></span>
                    <input disabled :class="inputStylingClass" type="text" required v-model="telephone" />
                  </div>
                </div>
  
              </div>
  
              </div>
  
              <!-- Step 2 FORM -->
              <form class="text-left px-4 flex flex-col" :class="formStep == 1 ? 'block' : 'hidden'" @submit.prevent="savePurposeOfTrip">
  
                <div :class="columnClass + ' mx-4'">

                    <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>

                    <select v-model="requestType" :class="inputStylingWithoutWidthClass" required>

                      <option v-for="data in optionDataPurposeofTrip" :value="[data.id, data.document_name]">
                        {{ data.document_name }}
                      </option>

                    </select>

                </div>

                <div v-if="requestType[1] == 'Site Visit'" :class="columnClass + ' mx-4 my-3'">
                  
                  <label for="site">
                    Site <span class="text-[#f5333f]">*</span>
                  </label>

                  <select id="site" v-model="siteVisitLocation" :class="inputStylingWithoutWidthClass" required>
                    <!-- :required="requestType[1] == 'Site Visit' ? true : false" -->
                    <option v-for="data in optionDataSite" :key="data.id" :value="data.id">
                      {{ data.site_name }}
                    </option>
                  </select>

                </div>

                <div :class="columnClass + ' mx-4 my-3'">

                  <label for="notesToTrip">
                    Notes to Purpose of Trip<span class="text-[#f5333f]">*</span>
                  </label>

                  <input 
                    id="notesToTrip" 
                    type="text" 
                    class="border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2 px-4 py-2" 
                    placeholder="Notes" 
                    v-model="notesToPurposeOfTrip"
                    required
                  />

                </div>

                <div :class="columnClass + ' mx-4 my-3'">
                  
                  <label for="attachment">File Attachment<span v-if="requestType[1] == 'Site Visit' || requestType[1] === 'Field Break'" class="text-[#f5333f]">*</span></label>
                  
                  <input 
                    type="file" 
                    id="attachment" 
                    @change="updateFile" 
                    :class="inputStylingWithoutWidthClass" 
                    :required="requestType[1] == 'Site Visit' || requestType[1] === 'Field Break'" 
                  />

                </div>

                <div :class="columnClass + ' mx-4 my-3'">
                    
                    <label for="cost_center">
                        Cost Center<span class="text-[#f5333f]">*</span>
                    </label>

                    <!-- <div>
                      {{ costCenterId }}
                    </div> -->

                    <!-- <select
                    v-model="costCenterId"
                    :class="inputStylingWithoutWidthClass" 
                    >
                      
                      <option v-for="data in optionDataCostCenter" :value="data.id">
                          {{ data.cost_center_code }} - {{ data.cost_center_name }}
                      </option>

                    </select> -->

                    <Multiselect
                      v-model="costCenterId"
                      mode="single"
                      placeholder="Select Cost Center"
                      track-by="cost_center_name"
                      label="cost_center_name"
                      :close-on-select="false"
                      :searchable="true"
                      :options="optionDataCostCenter"
                    >

                      <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div
                          class="multiselect-tag is-user"
                          :class="{
                            'is-disabled': disabled,
                          }"
                        >
                          {{ option.cost_center_name }}
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

                <h1 class="mx-4 mt-6">Itinerary</h1>
                
                <div :class="rowClass">

                  <!-- From -->
                  <div :class="columnClass">
                      <span>From<span class="text-red-star">*</span></span>
                      <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" v-model="fromCity" required>
                        <option v-for="data in optionDataCity" :value="data.id">
                        {{ data.city_name }}
                        </option>
                      </select>
                  </div>

                  <!-- To -->
                  <div :class="columnClass">
                    <span>To<span class="text-red-star">*</span></span>
                    <select :class="inputStylingClass" v-model="toCity" required>
                      <option v-for="data in optionDataCity" :value="data.id">
                        {{ data.city_name }}
                      </option>
                    </select>
                  </div>

                </div>

                <div :class="rowClass">

                  <!-- Date Departure -->
                  <div :class="columnClass">
                    <span>
                      Date Departure<span class="text-red-star">*</span>
                    </span>
                    <input v-model="departureDate" type="date" :class="inputStylingClass" :min="minDate" :max="returnDate" required>
                  </div>

                  <!-- Return Date -->
                  <div :class="columnClass">
                      <span>
                        Return Date<span class="text-red-star">*</span>
                      </span>
                      <input v-model="returnDate" :min="departureDate == '' ? minDate : departureDate" type="date" :class="inputStylingClass" placeholder="Date" required>
                  </div>

                  <!-- <div :class="columnClass">
                  </div> -->

                </div>

                <div :class="rowClass" class="hidden">

                  <!-- Zona -->
                  <div class="w-full invisible">

<div :class="columnClass">
  
  <span>
    Zona<span class="text-red-star">*</span>
  </span>
  
  <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" 
  @change="fetchTLKByJobBand"
  placeholder="Zona" 
  v-model="zonaName" 
  required>
    <option v-for="data in optionDataZona" :value="data.zona_name">
      {{ data.zona_name }}
    </option>
  </select>

</div>

                  </div>
                  
                  <!-- TLK/Day -->
                  <div :class="columnClass" class='invisible'>
                    <span>TLK/Day<span class="text-red-star">*</span></span>
                    <input type="text" :class="inputStylingClass" placeholder="TLK/Day" v-model="TLKperDay" required disabled />
                  </div>

                </div>

                <div :class="rowClass" class="hidden">

                  <!-- Total TLK -->
                  <div :class="columnClass" class="invisible">
                    <span>
                      Total TLK<span class="text-red-star">*</span>
                    </span>
                    <input type="text" disabled v-model="totalTLK" :class="inputStylingClass" placeholder="Total" required>
                  </div>

                </div>

                  <!-- change step button -->
                  <div class="sticky bottom-0 bg-white" v-if="formStep === 1">

                    <div class="flex justify-between font-bold py-2">

                        <button v-if="formStep > 0" @click="formStep--" class="border border-blue text-blue py-3 px-11 rounded-lg max-w-[141px]">
                          Back
                        </button>

                        <button v-if="formStep < stepCounter" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]" type="submit">
                          Next
                        </button>

                    </div>

                  </div>

              </form>

              <!-- Step 3 and so on, contain of TABLE -->
              <div :class="formStep === 1 ? '' : 'pb-[80px]'" v-if="requestType[1] == 'Company Business'">
  
                <!-- step 3 form Traveller -->
                <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
                  <guestAsTravellerTable @fetchTravellerGuest="fetchTravellerGuest" />
                </div>

                <!-- step 4 form Airlines -->
                <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
                  <airlinesTable @fetchAirlines="fetchAirlines" />
                </div>

                <!-- step 5 form Taxi Voucher -->
                <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">
                    <taxiVoucherTable @fetchTaxiVoucher="fetchTaxiVoucher" />
                </div>

                <!-- step 6 form Other Transportation -->
                <div 
                  class="px-2"
                  :class="formStep == 5 ? 'block' : 'hidden'"
                >
                    <otherTransportationTable @fetchOtherTransportation="fetchOtherTransportation" />
                </div>

                <!-- step 7 form Accomodation -->
                <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">
                  <accomodationTable @fetchAccomodation="fetchAccomodation" />
                </div>

                <!-- step 8 form Cash Advance -->
                <div class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">
                  <cashAdvanceTable @fetchCashAdvance="fetchCashAdvance" />
                </div>

              </div>
  
              <div :class="formStep === 1 ? '' : 'pb-[80px]'" v-if="requestType[1] == 'Site Visit'">
  
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
    
                    <guestAsTravellerTable @fetchTravellerGuest="fetchTravellerGuest" />
  
                  </div>
  
                  <!-- step 4 form Airlines -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
    
                    <airlinesTable />
  
                  </div>
  
                  <!-- step 5 form Taxi Voucher -->
                  <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">
    
                    <taxiVoucherTable />
  
                  </div>
  
                  <!-- step 6 form Other Transportation -->
                  <div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">
    
                    <otherTransportationTable />
  
                  </div>
  
                  <!-- step 7 form Accomodation -->
                  <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">
  
                    <accomodationTable />
  
                  </div>
  
                  <!-- step 8 form Cash Advance -->
                  <div class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">
  
                    <cashAdvanceTable />
  
                  </div>
  
              </div>
  
              <div :class="formStep === 1 ? '' : 'pb-[80px]'" v-if="requestType[1] == 'Field Break'">
  
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleGuest = !isVisibleGuest" :class="addButtonStylingClass">
                      + Add Guest
                    </button>
  
                    <guestAsTravellerTable @fetchTravellerGuest="fetchTravellerGuest" />
  
                  </div>
  
                  <!-- step 4 form Airlines -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
  
                  <button @click="isVisibleAirlines = !isVisibleAirlines" :class="addButtonStylingClass">
                    + Add Airlines
                  </button>
  
                  <airlinesTable />
  
                  </div>
  
                  <!-- step 5 form Other Transportation -->
                  <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" :class="addButtonStylingClass">
                      + Add Other Transportation
                    </button>
  
                    <otherTransportationTable />
  
                  </div>
  
              </div>
  
              <div :class="formStep === 1 ? '' : 'pb-[80px]'" v-if="requestType[1] == 'Taxi Voucher'">
  
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleGuest = !isVisibleGuest" :class="addButtonStylingClass">
                      + Add Guest
                    </button>
      
                    <guestAsTravellerTable @fetchTravellerGuest="fetchTravellerGuest" />
  
                  </div>
  
                  <!-- step 4 form Taxi Voucher -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleTaxiVoucher = !isVisibleTaxiVoucher" :class="addButtonStylingClass">
                      + Add Taxi Voucher
                    </button>
  
                    <taxiVoucherTable />
                    
                  </div>
  
              </div>

              <div :class="formStep === 1 ? '' : 'pb-[80px]'" v-if="requestType[1] == 'Crewing'">
                    
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
  
  <button @click="isVisibleGuest = !isVisibleGuest" :class="addButtonStylingClass">
    + Add Guest
  </button>

  <guestAsTravellerTable @fetchTravellerGuest="fetchTravellerGuest" />

                  </div>

                  <!-- step 4 form Airlines -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
  
                      <button @click="isVisibleAirlines = !isVisibleAirlines" :class="addButtonStylingClass">
                        + Add Airlines
                      </button>

                      <airlinesTable />

                  </div>

                  <!-- step 7 form Accomodation -->
                  <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

                    <button @click="isVisibleAccomodation = !isVisibleAccomodation" :class="addButtonStylingClass">
                      + Add Accomodation
                    </button>
  
                    <accomodationTable />

                  </div>

              </div>
  
          </div>
      </div>

      <!-- change step button -->
      <div v-if="formStep !== 1" class="fixed left-0 right-0 bg-white bottom-0 px-5 py-2">
  
            <div class="flex justify-between font-bold">
  
                <button v-if="formStep > 0" @click="formStep--" class="border border-blue text-blue py-3 px-11 rounded-lg max-w-[141px]">
                  Back
                </button>
  
                <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                  Back
                </button>
  
                <button v-if="formStep < stepCounter" @click="formStep++" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]" type="submit">
                  Next
                </button>
  
                <div class="flex gap-4" v-else>
  
                  <button @click="isVisibleOpenModal = !isVisibleOpenModal" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                    Draft
                  </button>
  
                  <button @click="submitRequestTrip" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                    Submit
                  </button>
  
                </div>
  
            </div>
            
      </div>
     
    </Modal>

    <!-- Step 3 Modal Add Guest as Traveller -->  
    <guestAsTravellerForm 
      :isOpen="isVisibleGuest" 
      @changeVisibility="isVisibleGuest = false" 
      @fetchTravellerGuest="fetchTravellerGuest" 
    />

    <!-- Step 4 Modal Add Airlines -->
    <airlinesForm :isOpen="isVisibleAirlines" @changeVisibility="isVisibleAirlines = false" @fetchAirlines="fetchAirlines" />

    <!-- Step 5 Modal Add Taxi Voucher -->
    <taxiVoucherForm :isOpen="isVisibleTaxiVoucher" @changeVisibility="isVisibleTaxiVoucher = false" @fetchTaxiVoucher="fetchTaxiVoucher" />

    <!-- Step 6 Modal Add Other Transportation -->
    <otherTransportationForm 
      :purposeType="requestType[1]"
      :isOpen="isVisibleOtherTransportation" 
      @changeVisibility="isVisibleOtherTransportation = false" 
      @fetchOtherTransportation="fetchOtherTransportation" 
    />

    <!-- Step 7 Modal Add Accomodation -->
    <accomodationForm :isOpen="isVisibleAccomodation" @changeVisibility="isVisibleAccomodation = false" @fetchAccomodation="fetchAccomodation" />

    <!-- Step 8 Modal Add Cash Advance -->
    <cashAdvanceForm :isOpen="isVisibleCashAdvance" @changeVisibility="isVisibleCashAdvance = false" @fetchCashAdvance="fetchCashAdvance" />

</template>

<style scoped>

:deep(.modal-vue3-content) {
  min-width: 650px !important;
  width: fit-content !important;
  height: fit-content !important;
}

.modal-box-inner-inner {
  height: 100% !important;
  max-height: 400px !important;
  padding: 0 20px;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

</style>
