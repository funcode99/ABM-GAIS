<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import Api from '@/utils/Api'
import { Modal } from 'usemodal-vue3'
import { useReferenceFetchResult } from '@/stores/fetch/reference.js'

import iconClose from "@/assets/navbar/icon_close.svg"

import arrow from '@/assets/arrow-multi-step-form.png'
import check from '@/assets/step-done-check.png'


import modalHeader from '@/components/modal/modalHeader.vue'

import guestAsTravellerForm from '@/components/request-trip/modal-step-form/guest-as-traveller-form.vue'
import airlinesForm from '@/components/request-trip/modal-step-form/airlines-form.vue'
import taxiVoucherForm from '@/components/request-trip/modal-step-form/taxi-voucher-form.vue'
import otherTransportationForm from '@/components/request-trip/modal-step-form/other-transportation-form.vue'
import accomodationForm from '@/components/request-trip/modal-step-form/accomodation-form.vue'
import cashAdvanceForm from '@/components/request-trip/modal-step-form/cash-advance-form.vue'

// import { Switch } from '@headlessui/vue'
  
    const enabled = ref(false)
    let referenceFetch = useReferenceFetchResult()

    let instanceArray = []
    let optionDataPurposeofTrip = ref([])
    let optionDataEmployeeRequestor = ref([])
    let optionDataCity = ref([])
    let optionDataZona = ref([])
    let optionDataSiteLocation = ref([])
    let optionDataFlightClass = ref([])
    let optionDataTravellerType = ref([])
    let optionDataCompany = ref([])
    let optionDataJobBand = ref([])
    let optionDataTransportationType = ref([])

    let travellerGuestTable = ref([])

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
    watch(requestType, (newValue, oldValue) => {

      if(newValue[1] == 'Company Business') {
        stepCounter.value = 7
      } else if(newValue[1] == 'Site Visit') {
        stepCounter.value = 7
      } else if (newValue[1] == 'Field Break') {
        stepCounter.value = 4
      } else if (newValue[1] == 'Taxi Voucher') {
        stepCounter.value = 3
      }

    })

    const tableHeadTravellers = [
    {id: 1, title: 'Name'},
    {id: 2, title: 'SN'},
    {id: 3, title: 'Gender'},
    {id: 4, title: 'Contact No'},
    {id: 5, title: 'Department'},
    {id: 6, title: 'Company'},
    {id: 7, title: 'Type'},
    {id: 8, title: 'Max Hotel Fare'},
    {id: 9, title: 'Flight Class'},
    {id: 10, title: 'Action'}
    ]

    const tableBodyTravellers = [
      {
        id: 1,
        name: 'Gavin McFarland',
        sn: '212123',
        gender: 'Male',
        contactNo: '(820)340234-3294',
        department: 'IT',
        company: 'PT ABM',
        type: 'requestor',
        maxHotelFare: '700.000',
        flightClass: 'Economy'
      },
      {
        id: 2,
        name: 'Evelyn Reid',
        sn: '322232',
        gender: 'Female',
        contactNo: '(260)360274-3514',
        department: 'Sales',
        company: 'PT ABC',
        type: 'employee',
        maxHotelFare: '700.000',
        flightClass: 'Economy'
      },
    ]

    const tableHeadAirlinesRequestTrip = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Departure'},
      {id: 3, title: 'Arrival'},
      {id: 4, title: 'Flight Number'},
      {id: 5, title: 'Domestic/International'},
      {id: 6, title: 'Status'},
      {id: 7, title: 'Action'}
    ]

    const tableBodyAirlinesRequestTrip = [
      {
        id: 1,
        name: 'Gavin McFarland',
        departure: 'Jakarta',
        arrival: 'Surabaya',
        flightNumber: 'CL-212',
        flightRegion: 'Domestic',
        status: 'Pending'
      },
      {
        id: 2,
        name: 'Evelyn Reid',
        departure: 'Jakarta',
        arrival: 'Surabaya',
        flightNumber: 'CL-212',
        flightRegion: 'Domestic',
        status: 'Pending'
      },
    ]

    const tableHeadTaxiVoucher = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Date'},
      {id: 3, title: 'Departure'},
      {id: 4, title: 'Arrival'},
      {id: 5, title: 'Amount'},
      {id: 6, title: 'Account Name'},
      {id: 7, title: 'Remarks'},
      {id: 8, title: 'Status'},
      {id: 9, title: 'Action'},
    ]

    const tableBodyTaxiVoucher = [
      {
        id: 1,
        name: 'Gavin McFarland',
        date: '223/12/23',
        departure: 'Airport Sub',
        arrival: 'Site A',
        amount: '120.000',
        accountName: '',
        remarks: '',
        status: ''
      },
    ]

    const tableHeadOtherTransportation = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Type'},
      {id: 3, title: 'From Date'},
      {id: 4, title: 'To Date'},
      {id: 5, title: 'Quantity'},
      {id: 6, title: 'City'},
      {id: 7, title: 'Status'},
      {id: 8, title: 'Action'},
    ]

    const tableBodyOtherTransportation = [
      {
        id: 1,
        name: 'Gavin McFarland',
        type: 'Rent Car',
        fromDate: '23/4/23',
        toDate: '24/4/23',
        quantity: '1',
        city: 'Surabaya',
        status: 'Pending'
      }  
    ]

    const tableHeadAccomodationRequestTrip = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Hotel Name'},
      {id: 3, title: 'Check In'},
      {id: 4, title: 'Check Out'},
      {id: 5, title: 'City'},
      {id: 6, title: 'Type'},
      {id: 7, title: 'Sharing With'},
      {id: 8, title: 'Status'},
      {id: 9, title: 'Action'}
    ]

    const tableBodyAccomodationRequestTrip = [
      {
        id: 1,
        name: 'Gavin McFarland',
        hotelName: 'Aston',
        checkIn: '23/4/23',
        checkOut: '24/4/23',
        city: 'Surabaya',
        type: 'Hotel',
        sharingWith: 'Leo',
        status: 'Pending'
      }
    ]

    const tableHeadCashAdvance = [
      {id: 1, title: 'Cash Advance No'},
      {id: 2, title: 'Total'},
      {id: 3, title: 'Notes'},
      {id: 4, title: 'Status'},
      {id: 5, title: 'Action'}
    ]

    const tableBodyCashAdvance = [
      {
        id: 1,
        caNo: '230505',
        total: '800.000',
        notes: 'abc',
        status: 'Pending'
      }
    ]

    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'

    const inputStylingWithoutWidthClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
    const circleStepBasicStylingClass = 'rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative'

    // Purpose of Trip API
    let selectedRequestor = ref([])
    let requestor = ref('')
    let locationId = ref('')
    let location = ref('')
    let sn = ref('')
    let telephone = ref('')
    let purposeOfTrip = ref('')
    let notesToPurposeOfTrip = ref('')
    let fromCity = ref('')
    let toCity = ref('')
    let fromCityId = ref('')
    let toCityId = ref('')
    let zona = ref('')
    let TLKperDay = ref(0)
    let totalDays = ref()
    let totalTLK = ref(0)
    let departureDate = ref('')
    let returnDate = ref('')

    // Guest as a traveller
    let typeOfTraveller = ref('')
    let department = ref('')
    let name = ref('')
    let company = ref('')
    let gender = ref('')
    let hotelFare = ref('')
    let NIK = ref('')
    let flightClassGuestAsATraveller = ref('')
    let contactNumber = ref('')
    let notesGuestAsTraveller = ref('')

    // Airlines
    let traveller = ref('')
    let departure = ref('')
    let departureDateAirlines = ref('')
    let arrival = ref('')
    let flightClassAirlines = ref('')
    let vendor = ref('')

    // Taxi Voucher
    let nameTaxiVoucher = ref('')
    let dateTaxiVoucher = ref('')
    let departureTaxiVoucher = ref('')
    let arrivalTaxiVoucher = ref('')
    let amountTaxiVoucher = ref('')
    let remarksTaxiVoucher = ref('')
    let accountNameTaxiVoucher = ref('')
    let voucherCodeTaxiVoucher = ref('')

    // Other Transportation
    let travellerOtherTransportation = ref('')
    let cityOtherTransportation = ref('')
    let typeOfTransportationOtherTransportation = ref('')
    let quantityOtherTransportation = ref('')
    let fromDateOtherTransportation = ref('')
    let toDateOtherTransportation = ref('')
    let remarksOtherTransportation = ref('')

    // Accomodation
    let travellerAccomodation = ref('')
    let genderAccomodation = ref('')
    let hotelFareAccomodation = ref('')
    let cityRequestedAccomodation = ref('')
    let remarksRequestedAccomodation = ref('')
    let checkInRequestedAccomodation = ref('')
    let checkOutRequestedAccomodation = ref('')
    let createGLRequestedAccomodation = ref(false)
    let accomodationTypeRequestedAccomodation = ref('')
    let vendorRequestedAccomodation = ref('')

    // Cash Advance
    let travellerCashAdvance = ref('')
    let nominalCashAdvance = ref('')
    let itemCashAdvance = ref('')
    let totalCashAdvance = ref('')
    let frequency = ref('')
    let remarks = ref('')
    let currency = ref('')

    const resetRef = () => {
      
    }

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

    let date1 = ref()
    let date2 = ref('')
    let margin = ref()

    watch(departureDate, (newValue, oldValue) => {
      getDepartureDateYear = newValue.toString().substring(0,4)
      getDepartureDateMonth = newValue.toString().substring(5,7)
      getDepartureDateDay = newValue.toString().substring(8,10)
      formattedDepartureDate = getDepartureDateYear + '/' + getDepartureDateMonth + '/' + getDepartureDateDay
      date2 = new Date(formattedDepartureDate)
      if(date2.value !== '') {
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
        // yesss dapet hasil nya
        if(date2.value !== '') {
          margin = date1.getTime() - date2.getTime()
          totalDays = Math.ceil((margin/(1000*3600*24))+1)
          totalTLK = totalDays * TLKperDay.value
        }
    })

    watch(TLKperDay, () => {
      if(date2.value !== '') {
        margin = date1.getTime() - date2.getTime()
        totalDays = Math.ceil((margin/(1000*3600*24))+1)
        totalTLK = totalDays * TLKperDay.value
      }
    })

    watch(formStep, async () => {
      if (formStep.value === 2) {

          const token = JSON.parse(localStorage.getItem('token'))
          Api.defaults.headers.common.Authorization = `Bearer ${token}`
          // const api = await Api.post('/request_trip/store', {
          //   id_employee: requestor.value,
          //   no_request_trip: '',
          //   code_document: requestType.value[0],
          //   id_site: locationId.value,
          //   notes: notesToPurposeOfTrip.value,
          //   id_city_from: fromCity.value,
          //   id_city_to: toCity.value,
          //   date_departure: departureDate.value,
          //   date_arrival: returnDate.value,
          //   id_zona: zona.value,
          //   tlk_per_day: TLKperDay.value,
          //   total_tlk: totalTLK
          // })
          // console.log(api)
      }
    })

    watch(optionDataEmployeeRequestor, () => {
      
      // telephone.value = optionDataEmployeeRequestor.value[newValue[1]].phone_number

      requestor.value = optionDataEmployeeRequestor.value[0].id
      locationId.value = optionDataEmployeeRequestor.value[0].id_site
      location.value = optionDataEmployeeRequestor.value[0].company_name
      sn.value = optionDataEmployeeRequestor.value[0].sn_employee
      telephone.value = optionDataEmployeeRequestor.value[0].phone_number

    })

    const submitGuestTraveller = () => {

    }

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

    const fetchSiteLocation = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      // const api = await Api.get('/site')
      // optionDataSiteLocation.value = api.data.data
    }

    const fetchCity = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/city')
      optionDataCity.value = api.data.data
    }

    // const fetchZona = async () => {
    //   const token = JSON.parse(localStorage.getItem('token'))
    //   Api.defaults.headers.common.Authorization = `Bearer ${token}`
    //   const api = await Api.get('/zona/get')
    //   optionDataZona.value = api.data.data
    // }

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
    const fetchTravellerGuest = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/travel_guest/get')
      travellerGuestTable.value = api.data.data
      // console.log(travellerGuestTable.value)
    }

    onBeforeMount(() => {
      fetchDocumentCode()
      fetchEmployeeRequestor()
      fetchSiteLocation()
      fetchCity()
      // fetchZona()
      fetchCompany()
      fetchFlight()
      fetchJobBand()
      fetchTypeOfTransportation()

      fetchTravellerGuest()
      fetchTravellerType()
    })

    let isVisibleOpenModal = ref(false)

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


    let filterData = ref([])

    const fetchTLKByJobBand = async () => {
      let jobBandId = referenceFetch.fetchEmployeeByLoginResult[0].id_job_band
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/zona_job/get_by_job/${jobBandId}`)
      filterData.value = api.data.data
      console.log(filterData.value)
      TLKperDay.value = filterData.value[0].tlk_rate
    }

    const fetchZonaByCity = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/zona/get_by_city/${toCity.value}`)
      optionDataZona.value = api.data.data
      console.log(optionDataZona.value)
      zona.value = optionDataZona.value[0].id_zona
      console.log('ini adalah nilai zona')
      console.log(zona.value)
    }

    watch(zona, () => {
      fetchTLKByJobBand()
    })

    watch(toCity, () => {
      fetchZonaByCity()
    })


</script>

<template>

    <button 
      @click="isVisibleOpenModal = !isVisibleOpenModal" 
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
      + Add New
    </button>

    <Modal type="clean" v-model:visible="isVisibleOpenModal" v-model:offsetTop="modalPaddingHeight">
      
      <!-- modal title -->
      <modalHeader @closeVisibility="isVisibleOpenModal = !isVisibleOpenModal" :title="'New Request Trip'" />

      <!-- step circle -->
      <div>

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
  
  
        </div>

      </div>

      <!-- masih company business, harus dipecah ke form lain nya juga -->
      <!-- place all button add here -->
      <!-- button nya dikeluarin agar tidak ikut kena scroll overflow -->
      <button v-if="formStep == 2 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleGuest = !isVisibleGuest" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2">
          + Add Guest
      </button>

      <button v-if="formStep == 3 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleAirlines = !isVisibleAirlines" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2">
          + Add Airlines
      </button>

      <button v-if="formStep == 4 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleTaxiVoucher = !isVisibleTaxiVoucher" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2">
          + Add Taxi Voucher
      </button>

      <button v-if="formStep == 5 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2">
          + Add Other Transportation
      </button>

      <button v-if="formStep == 6 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleAccomodation = !isVisibleAccomodation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2">
          + Add Accomodation
      </button>

      <button v-if="formStep == 7 && (requestType[1] == 'Company Business' || requestType[1] == 'Site Visit') " @click="isVisibleCashAdvance = !isVisibleCashAdvance" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green ml-2">
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
                    <span>Requestor <span class="text-[#f5333f]">*</span></span>
                    <div>
                      <input disabled :class="inputStylingClass" type="text" v-for="(data, index) in optionDataEmployeeRequestor" :value="data.employee_name" />
                    </div>
                  </div>
                </div>
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span class="block">Location <span class="text-[#f5333f]">*</span></span>
                    <input disabled type="text" v-for="data in optionDataEmployeeRequestor" v-model="location" :class="inputStylingClass" placeholder="Location" required />
                  </div>
                </div>
  
              </div>
  
              <div :class="rowClass">
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span class="block">
                      SN <span class="text-red-star">*</span>
                    </span>
                    <input disabled type="text" v-for="data in optionDataEmployeeRequestor" v-model="sn" :class="inputStylingClass" placeholder="SN Number" required />
                  </div>
  
                </div>
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span class="block">Telephone <span class="text-red-star">*</span></span>
                    <input disabled type="text" v-for="data in optionDataEmployeeRequestor" v-model="telephone" :class="inputStylingClass" placeholder="Telephone" required>
                  </div>
                </div>
  
              </div>
  
              </div>
  
              <!-- Step 2 FORM -->
              <div class="text-left px-4 flex flex-col" :class="formStep == 1 ? 'block' : 'hidden'">
  
                <div :class="columnClass + ' mx-4'">
          
                    <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
  
                    <select v-model="requestType" :class="inputStylingWithoutWidthClass" required>

                      <option v-for="data in optionDataPurposeofTrip" :value="[data.id, data.document_name]">
                        {{ data.document_name }}
                      </option>

                    </select>
              
                </div>
  
                <div :class="columnClass + ' mx-4 my-3'">
  
                  <span>
                    Notes to Purpose of Trip
                  </span>

                  <input type="text" class="border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2 px-4 py-2" placeholder="Notes" v-model="notesToPurposeOfTrip">
  
                </div>
  
                <h1 class="mx-4 mt-6">Itinerary</h1>
                
                <div :class="rowClass">
  
                  <!-- From -->
                  <div class="w-full">
                    <div :class="columnClass">
                      <span>From<span class="text-red-star">*</span></span>
                      <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" v-model="fromCity" required>
                        <option v-for="data in optionDataCity" :value="data.id">
                        {{ data.city_name }}
                        </option>
                      </select>
                    </div>
                  </div>
  
                  <!-- Zona -->
                  <div class="w-full">

                    <div :class="columnClass">
                      
                      <span>
                        Zona<span class="text-red-star">*</span>
                      </span>
                      
                      <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" 
                      @change="fetchTLKByJobBand"
                      placeholder="Zona" 
                      v-model="zona" 
                      required>
                        <option v-for="data in optionDataZona" :value="data.id">
                          {{ data.zona_name }}
                        </option>
                      </select>

                    </div>

                  </div>
  
                </div>
  
                <div :class="rowClass">
  
                  <!-- To -->
                  <div :class="columnClass">
                    <span>To<span class="text-red-star">*</span></span>
                    <select :class="inputStylingClass" v-model="toCity" required>
                      <option v-for="data in optionDataCity" :value="data.id">
                        {{ data.city_name }}
                      </option>
                    </select>
                  </div>
                  
                  <!-- TLK/Day -->
                  <div :class="columnClass">
                    <span>TLK/Day<span class="text-red-star">*</span></span>
                    <input type="text" :class="inputStylingClass" placeholder="TLK/Day" v-model="TLKperDay" required>
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
  
                  <!-- Total TLK -->
                  <div :class="columnClass">
                    <span>
                      Total TLK<span class="text-red-star">*</span>
                    </span>
                    <input type="text" disabled v-model="totalTLK" :class="inputStylingClass" placeholder="Total" required>
                  </div>
  
                </div>
  
                <div :class="rowClass">

                  <!-- Return Date -->
                  <div :class="columnClass">
                      <span>
                        Return Date<span class="text-red-star">*</span>
                      </span>
                      <input v-model="returnDate" :min="departureDate == '' ? minDate : departureDate" type="date" :class="inputStylingClass" placeholder="Date" required>
                  </div>

                  <div :class="columnClass">
                  </div>

                </div>
                
              </div>

              <!-- Step 3 and so on, contain of TABLE -->
              <div class="pb-[80px]" v-if="requestType[1] == 'Company Business'">
  
                <!-- step 3 form Traveller -->
                <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">

                  <div class="overflow-x-auto mt-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadTravellers" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in travellerGuestTable" :key="data.id">
                          <td>
                            {{ data.employee_name }}
                          </td>
                          <td>
                            <!-- belom ada sn -->
                            {{ data.sn }} 
                          </td>
                          <td>
                            {{ data.gender }}
                          </td>
                          <td>
                            {{ data.contact_no }}
                          </td>
                          <td>
                            <!-- kenapa departement nya cuma id -->
                            {{ data.departement }}
                          </td>
                          <td>
                            {{ data.company_name }}
                          </td>
                          <td>
                            {{ data.type_traveller }}
                          </td>
                          <td>
                            {{ data.maxHotelFare }}
                          </td>
                          <td>
                            {{ data.flight_class }}
                          </td>
                          <td>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <!-- step 4 form Airlines -->
                <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">

                  <div class="overflow-x-auto mt-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in tableBodyAirlinesRequestTrip" :key="data.id">
                          <td>
                            {{ data.name }}
                          </td>
                          <td>
                            {{ data.departure }}
                          </td>
                          <td>
                            {{ data.arrival }}
                          </td>
                          <td>
                            {{ data.flightNumber }}
                          </td>
                          <td>
                            {{ data.flightRegion }}
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <!-- step 5 form Taxi Voucher -->
                <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

                  <div class="overflow-x-auto mt-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadTaxiVoucher" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in tableBodyTaxiVoucher" :key="data.id">
                            <td>
                              {{ data.name }}
                            </td>
                            <td>
                              {{ data.date }}
                            </td>
                            <td>
                              {{ data.departure }}
                            </td>
                            <td>
                              {{ data.arrival }}
                            </td>
                            <td>
                              {{ data.amount }}
                            </td>
                            <td>
                              {{ data.accountName }}
                            </td>
                            <td>
                              {{ data.remarks }}
                            </td>
                            <td>
                              {{ data.status }}
                            </td>
                            <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <!-- step 6 form Other Transportation -->
                <div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">

                  <div class="overflow-x-auto mt-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadOtherTransportation" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in tableBodyOtherTransportation" :key="data.id">
                          <td>
                            {{ data.name }}
                          </td>
                          <td>
                            {{ data.type }}
                          </td>
                          <td>
                            {{ data.fromDate }}
                          </td>
                          <td>
                            {{ data.toDate }}
                          </td>
                          <td>
                            {{ data.quantity }}
                          </td>
                          <td>
                            {{ data.city }}
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <td>
                              
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <!-- step 7 form Accomodation -->
                <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">

                  <div class="overflow-x-auto mt-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadAccomodationRequestTrip" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in tableBodyAccomodationRequestTrip" :key="data.id">
                          <td>
                            {{ data.name }}
                          </td>
                          <td>
                            {{ data.hotelName }}
                          </td>
                          <td>
                            {{ data.checkIn }}
                          </td>
                          <td>
                            {{ data.checkOut }}
                          </td>
                          <td>
                            {{ data.city }}
                          </td>
                          <td>
                            {{ data.type }}
                          </td>
                          <td>
                            {{ data.sharingWith }}
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <td>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                <!-- step 8 form Cash Advance -->
                <div class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">

                  <div class="overflow-x-auto mt-5 flex justify-center">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadCashAdvance" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in tableBodyCashAdvance" :key="data.id">
                          <td>
                            {{ data.caNo }}
                          </td>
                          <td>
                            {{ data.total }}
                          </td>
                          <td>
                            {{ data.notes }}
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <td>
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
  
              <div class="pb-[80px]" v-if="requestType[1] == 'Site Visit'">
  
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
    
                    <div class="overflow-x-auto mt-5">

                      <table class="table">

                        <thead>
                        <tr>
                        <th v-for="data in tableHeadTravellers" :key="data.id">
                        {{ data.title }}
                        </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="data in tableBodyTravellers" :key="data.id">
                        <td>
                        {{ data.name }}
                        </td>
                        <td>
                        {{ data.sn }}
                        </td>
                        <td>
                        {{ data.gender }}
                        </td>
                        <td>
                        {{ data.contactNo }}
                        </td>
                        <td>
                        {{ data.department }}
                        </td>
                        <td>
                        {{ data.company }}
                        </td>
                        <td>
                        {{ data.type }}
                        </td>
                        <td>
                        {{ data.maxHotelFare }}
                        </td>
                        <td>
                        {{ data.flightClass }}
                        </td>
                        <td>
        
                        </td>
                        </tr>
                        </tbody>
                        
                      </table>

                    </div>
  
                  </div>
  
                  <!-- step 4 form Airlines -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
    
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyAirlinesRequestTrip" :key="data.id">
                            <td>
                              {{ data.name }}
                            </td>
                            <td>
                              {{ data.departure }}
                            </td>
                            <td>
                              {{ data.arrival }}
                            </td>
                            <td>
                              {{ data.flightNumber }}
                            </td>
                            <td>
                              {{ data.flightRegion }}
                            </td>
                            <td>
                              {{ data.status }}
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
                  <!-- step 5 form Taxi Voucher -->
                  <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">
    
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadTaxiVoucher" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyTaxiVoucher" :key="data.id">
                              <td>
                                {{ data.name }}
                              </td>
                              <td>
                                {{ data.date }}
                              </td>
                              <td>
                                {{ data.departure }}
                              </td>
                              <td>
                                {{ data.arrival }}
                              </td>
                              <td>
                                {{ data.amount }}
                              </td>
                              <td>
                                {{ data.accountName }}
                              </td>
                              <td>
                                {{ data.remarks }}
                              </td>
                              <td>
                                {{ data.status }}
                              </td>
                              <td>

                              </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
                  <!-- step 6 form Other Transportation -->
                  <div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">
    
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadOtherTransportation" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyOtherTransportation" :key="data.id">
                            <td>
                              {{ data.name }}
                            </td>
                            <td>
                              {{ data.type }}
                            </td>
                            <td>
                              {{ data.fromDate }}
                            </td>
                            <td>
                              {{ data.toDate }}
                            </td>
                            <td>
                              {{ data.quantity }}
                            </td>
                            <td>
                              {{ data.city }}
                            </td>
                            <td>
                              {{ data.status }}
                            </td>
                            <td>

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
                  <!-- step 7 form Accomodation -->
                  <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">
  
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadAccomodationRequestTrip" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyAccomodationRequestTrip" :key="data.id">
                            <td>
                              {{ data.name }}
                            </td>
                            <td>
                              {{ data.hotelName }}
                            </td>
                            <td>
                              {{ data.checkIn }}
                            </td>
                            <td>
                              {{ data.checkOut }}
                            </td>
                            <td>
                              {{ data.city }}
                            </td>
                            <td>
                              {{ data.type }}
                            </td>
                            <td>
                              {{ data.sharingWith }}
                            </td>
                            <td>
                              {{ data.status }}
                            </td>
                            <td>
    
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
                  <!-- step 8 form -->
                  <div class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">
  
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadCashAdvance" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyCashAdvance" :key="data.id">
                            <td>
                              {{ data.caNo }}
                            </td>
                            <td>
                              {{ data.total }}
                            </td>
                            <td>
                              {{ data.notes }}
                            </td>
                            <td>
                              {{ data.status }}
                            </td>
                            <td>
                              
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
              </div>
  
              <div class="pb-[80px]" v-if="requestType[1] == 'Field Break'">
  
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleGuest = !isVisibleGuest" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                      + Add Guest
                    </button>
  
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadTravellers" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyTravellers" :key="data.id">
                            <td>
                              {{ data.name }}
                            </td>
                            <td>
                              {{ data.sn }}
                            </td>
                            <td>
                              {{ data.gender }}
                            </td>
                            <td>
                              {{ data.contactNo }}
                            </td>
                            <td>
                              {{ data.department }}
                            </td>
                            <td>
                              {{ data.company }}
                            </td>
                            <td>
                              {{ data.type }}
                            </td>
                            <td>
                              {{ data.maxHotelFare }}
                            </td>
                            <td>
                              {{ data.flightClass }}
                            </td>
                            <td>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
                  <!-- step 4 form Airlines -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
  
                  <button @click="isVisibleAirlines = !isVisibleAirlines" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                    + Add Airlines
                  </button>
  
                  <div class="overflow-x-auto mt-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in tableBodyAirlinesRequestTrip" :key="data.id">
                          <td>
                            {{ data.name }}
                          </td>
                          <td>
                            {{ data.departure }}
                          </td>
                          <td>
                            {{ data.arrival }}
                          </td>
                          <td>
                            {{ data.flightNumber }}
                          </td>
                          <td>
                            {{ data.flightRegion }}
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
  
                  </div>
  
                  <!-- step 5 form Other Transportation -->
                  <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                      + Add Other Transportation
                    </button>
  
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadOtherTransportation" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyOtherTransportation" :key="data.id">
                            <td>
                              {{ data.name }}
                            </td>
                            <td>
                              {{ data.type }}
                            </td>
                            <td>
                              {{ data.fromDate }}
                            </td>
                            <td>
                              {{ data.toDate }}
                            </td>
                            <td>
                              {{ data.quantity }}
                            </td>
                            <td>
                              {{ data.city }}
                            </td>
                            <td>
                              {{ data.status }}
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
              </div>
  
              <div class="pb-[80px]" v-if="requestType[1] == 'Taxi Voucher'">
  
                  <!-- step 3 form Traveller -->
                  <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleGuest = !isVisibleGuest" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                      + Add Guest
                    </button>
      
                      <div class="overflow-x-auto mt-5">
                          <table class="table">
                            <thead>
                              <tr>
                                <th v-for="data in tableHeadTravellers" :key="data.id">
                                  {{ data.title }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="data in tableBodyTravellers" :key="data.id">
                                <td>
                                  {{ data.name }}
                                </td>
                                <td>
                                  {{ data.sn }}
                                </td>
                                <td>
                                  {{ data.gender }}
                                </td>
                                <td>
                                  {{ data.contactNo }}
                                </td>
                                <td>
                                  {{ data.department }}
                                </td>
                                <td>
                                  {{ data.company }}
                                </td>
                                <td>
                                  {{ data.type }}
                                </td>
                                <td>
                                  {{ data.maxHotelFare }}
                                </td>
                                <td>
                                  {{ data.flightClass }}
                                </td>
                                <td>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>
  
                  </div>
  
                  <!-- step 4 form Taxi Voucher -->
                  <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">
  
                    <button @click="isVisibleTaxiVoucher = !isVisibleTaxiVoucher" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                      + Add Taxi Voucher
                    </button>
  
                    <div class="overflow-x-auto mt-5">
                      <table class="table">
                        <thead>
                          <tr>
                            <th v-for="data in tableHeadTaxiVoucher" :key="data.id">
                              {{ data.title }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in tableBodyTaxiVoucher" :key="data.id">
                              <td>
                                {{ data.name }}
                              </td>
                              <td>
                                {{ data.date }}
                              </td>
                              <td>
                                {{ data.departure }}
                              </td>
                              <td>
                                {{ data.arrival }}
                              </td>
                              <td>
                                {{ data.amount }}
                              </td>
                              <td>
                                {{ data.accountName }}
                              </td>
                              <td>
                                {{ data.remarks }}
                              </td>
                              <td>
                                {{ data.status }}
                              </td>
                              <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
  
                  </div>
  
              </div>
  
          </div>
          
      </div>

      <!-- change step button -->
      <div class="fixed left-0 right-0 bg-white bottom-0 px-5 py-2">

          <div class="flex justify-between font-bold">

              <button v-if="formStep > 0" @click="formStep--" class="border border-blue text-blue py-3 px-11 rounded-lg max-w-[141px]">
                Back
              </button>

              <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                Back
              </button>

              <button v-if="formStep < stepCounter" @click="formStep++" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                Next
              </button>

              <div class="flex gap-4" v-else>

                <button class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                  Draft
                </button>

                <button class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                  Submit
                </button>

              </div>

          </div>
          
      </div>

    </Modal>

    <!-- Step 3 Modal Add Guest as Traveller -->  
    <guestAsTravellerForm :isOpen="isVisibleGuest" @changeVisibility="isVisibleGuest = false" />

    <!-- Step 4 Modal Add Airlines -->
    <airlinesForm :isOpen="isVisibleAirlines" @changeVisibility="isVisibleAirlines = false" />

    <!-- Step 5 Modal Add Taxi Voucher -->
    <taxiVoucherForm :isOpen="isVisibleTaxiVoucher" @changeVisibility="isVisibleTaxiVoucher = false" />

    <!-- Step 6 Modal Add Other Transportation -->
    <otherTransportationForm :isOpen="isVisibleOtherTransportation" @changeVisibility="isVisibleOtherTransportation = false" />

    <!-- Step 7 Modal Add Accomodation -->
    <accomodationForm :isOpen="isVisibleAccomodation" @changeVisibility="isVisibleAccomodation = false" />

    <!-- Step 8 Modal Add Cash Advance -->
    <cashAdvanceForm :isOpen="isVisibleCashAdvance" @changeVisibility="isVisibleCashAdvance = false" />

</template>

<style scoped>

.table :where(th, td) {
  padding: .5rem !important;
}

.table th {
  background: #015289 !important;
  border-color: #b9b9b9 !important;
  border-width: 2px;
  color: white;
}

.table td {
  border-color: #b9b9b9 !important;
  border-width: 2px;
}

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
