<script setup>
import { ref, watch, computed, onBeforeMount } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg"

import arrow from '@/assets/arrow-multi-step-form.png'
import check from '@/assets/step-done-check.png'

import Airline1 from '@/assets/airlines-1.png'
import Airline2 from '@/assets/airlines-2.png'

import modalHeader from '@/components/molecules/modalHeader.vue'
import confirmationButton from '@/components/molecules/confirmationButton.vue'
import checkButton from '@/components/molecules/checkButton.vue'

import Api from '@/utils/Api'

import { Modal } from 'usemodal-vue3'

import { Switch } from '@headlessui/vue'
  
    const enabled = ref(false)

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
      const api = await Api.get('/site')
      optionDataSiteLocation.value = api.data.data
    }

    const fetchCity = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/city')
      optionDataCity.value = api.data.data
    }

    const fetchZona = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/zona/get')
      optionDataZona.value = api.data.data
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
      optionDataJobBand.value = api.data.data
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
      console.log(travellerGuestTable.value)
    }

    onBeforeMount(() => {
      fetchDocumentCode()
      fetchEmployeeRequestor()
      fetchSiteLocation()
      fetchCity()
      fetchZona()
      fetchCompany()
      fetchFlight()
      fetchJobBand()
      fetchTypeOfTransportation()

      fetchTravellerGuest()
      fetchTravellerType()
    })

    let isVisibleGuest = ref(false)
    let isVisibleAirlines = ref(false)
    let isVisibleTaxiVoucher = ref(false)
    let isVisibleOtherTransportation = ref(false)
    let isVisibleAccomodation = ref(false)
    let isVisibleCashAdvance = ref(false)

    let type = '' 
    let modalPaddingHeight = 50

    let formStep = ref(0)

    let requestType = ref([null, 'Company Business'])
    let stepCounter = ref(7)

    watch(requestType, (newValue, oldValue) => {

      if(newValue == 'Company Business') {
        stepCounter.value = 7
      } else if(newValue == 'Site Visit') {
        stepCounter.value = 7
      } else if (newValue == 'Field Break') {
        stepCounter.value = 4
      } else if (newValue == 'Taxi Voucher') {
        stepCounter.value = 3
      }

    })

    const tableHeadAirlines = [
      {id: 1, title: 'Airline'},
      {id: 2, title: 'Flight No'},
      {id: 3, title: 'Depart'},
      {id: 4, title: 'Arrival'},
      {id: 5, title: 'Stops'},
      {id: 6, title: 'Class'},
      {id: 7, title: 'Price'},
      {id: 8, title: 'Confirm'},
    ]

    const airlinesDummy = [
      {
        id: 1,
        Airline: Airline1,
        flightNo: 'QG-121',
        Depart: 'Jakarta',
        Arrival: 'Surabaya',
        Stops: '2h 30m',
        StopsMethod: 'Direct',
        Class: 'Economy',
        Price: '832.000'
      },
      {
        id: 2,
        Airline: Airline2,
        flightNo: 'QG-121',
        Depart: 'Jakarta',
        Arrival: 'Surabaya',
        Stops: '2h 30m',
        StopsMethod: 'Direct',
        Class: 'Economy',
        Price: '832.000'
      }
    ]

    const tableHeadAccomodation = [
      {id: 1, title: 'Hotel Name'},
      {id: 2, title: 'Location'},
      {id: 3, title: 'Hotel Rating'},
      {id: 4, title: 'Room Type'},
      {id: 5, title: 'Price'},
      {id: 6, title: 'Confirm'}
    ]

    const accomodationDummy = [
    {
        id: 1,
        HotelName: 'Aston',
        Location: 'Gubeng, Surabaya',
        HotelRating: 'Jakarta',
        RoomType: 'Surabaya',
        Price: '950.000',
      },
      {
        id: 2,
        HotelName: 'Harris Hotel',
        Location: 'Entalsewu, Surabaya',
        HotelRating: 'Jakarta',
        RoomType: 'Surabaya',
        Price: '1.104.000',
      }
    ]

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

    const inputStylingWithoutWidthClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
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
          const api = await Api.post('/request_trip/store', {
            id_employee: requestor.value,
            no_request_trip: '',
            code_document: requestType.value[0],
            id_site: locationId.value,
            notes: notesToPurposeOfTrip.value,
            id_city_from: fromCity.value,
            id_city_to: toCity.value,
            date_departure: departureDate.value,
            date_arrival: returnDate.value,
            id_zona: zona.value,
            tlk_per_day: TLKperDay.value,
            total_tlk: totalTLK
          })
          console.log(api)
      }
    })

    watch(selectedRequestor, (newValue) => {
      requestor.value = newValue[0]
      locationId.value = optionDataEmployeeRequestor.value[newValue[1]].id_site
      location.value = optionDataEmployeeRequestor.value[newValue[1]].company_name
      sn.value = optionDataEmployeeRequestor.value[newValue[1]].sn_employee
      telephone.value = optionDataEmployeeRequestor.value[newValue[1]].phone_number
    })

  const submitGuestTraveller = () => {

  }

</script>

<template>

    <!-- trigger button to open modal -->
    <label
      for="company-business-trip-request-modal"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
      + Add New
    </label>

    <input type="checkbox" id="company-business-trip-request-modal" class="modal-toggle" />

    <!-- modal trip request -->
    <div class="modal font-JakartaSans">
      
      <div class="modal-box min-h-[500px] relative">

        <!-- modal title -->
        <nav class="sticky p-4 top-0 z-50 bg-[#015289]">
          <label @click="resetRef" for="company-business-trip-request-modal" class="cursor-pointer absolute right-4">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold text-white">New Request Trip</p>
        </nav>

        <!-- step circle -->
        <div class="flex justify-center pt-3 gap-x-[19px] modal-inner">

          <!-- step 1 circle -->
          <div :class="[formStep > 0 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">Requester Info</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 0 ? 'block' : 'hidden'">
          </div>

          <!-- step 2 circle -->
          <div :class="[formStep > 1 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
            <h1 class="mt-11 w-11 font-medium text-[10px]">Purpose of Trip</h1>
            <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
            <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 1 ? 'block' : 'hidden'">
          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType[1] == 'Company Business'">

            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>
  
            <!-- lebar div harus sama kaya text biar lingkarannya gak gepeng -->
            <!-- step 4 circle airlines -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 5 circle taxi voucher -->
            <div :class="[formStep > 4 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 4 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 6 circle other transportation -->
            <div :class="[formStep > 5 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 5 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 7 circle -->
            <div :class="[formStep > 6 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Accomodation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 6 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 8 circle -->
            <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Cash Advance</h1>
              <!-- <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt=""> -->
            </div>

          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType[1] == 'Site Visit'">

            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>

            <!-- lebar div harus sama kaya text biar lingkarannya gak gepeng -->
            <!-- step 4 circle airlines -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
            </div>

            <!-- step 5 circle taxi voucher -->
            <div :class="[formStep > 4 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 4 ? 'block' : 'hidden'">
            </div>

            <!-- step 6 circle other transportation -->
            <div :class="[formStep > 5 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 5 ? 'block' : 'hidden'">
            </div>

            <!-- step 7 circle -->
            <div :class="[formStep > 6 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Accomodation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 6 ? 'block' : 'hidden'">
            </div>

            <!-- step 8 circle -->
            <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Cash Advance</h1>
              <!-- <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt=""> -->
            </div>

          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType[1] == 'Field Break'">
             
            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 4 circle airlines -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
            </div>

            <!-- step 5 circle other transportation -->
            <div :class="[formStep > 4 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 5 ? 'block' : 'hidden'">
            </div>

          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType[1] == 'Taxi Voucher'">
             
            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>

            <!-- step 4 circle taxi voucher -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 4 ? 'block' : 'hidden'">
            </div>

          </div>


        </div>

        <!-- modal body -->
        <div class="modal-box-inner mt-[30px]">

            <form>
              <!-- step 1 form Requestor Info -->
              <div class="text-left" :class="formStep == 0 ? 'block' : 'hidden'">
  
              <div :class="rowClass">
  
                <div :class="columnClass">
                  <div class="w-full">
                    <span>Requestor <span class="text-[#f5333f]">*</span></span>
                    <select :class="inputStylingClass" v-model="selectedRequestor" required>
                      <option v-for="(data, index) in optionDataEmployeeRequestor" :value="[data.id, index]">
                        {{ data.employee_name }}
                      </option>
                    </select>
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
                    <span class="block">SN <span class="text-red-star">*</span></span>
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
  
              <!-- step 2 form -->
              <div class="text-left px-4 pb-[60px] flex flex-col" :class="formStep == 1 ? 'block' : 'hidden'">
  
                <div :class="columnClass + ' mx-4'">
          
                    <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>

                    <select v-model="requestType" :class="inputStylingWithoutWidthClass" required>
                      <option v-for="data in optionDataPurposeofTrip" :value="[data.id, data.document_name]">
                        {{ data.document_name }}
                      </option>
                    </select>
              
                </div>
  
                <div :class="columnClass + ' mx-4 my-3'">
  
                  <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                  <input type="text" class="border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2 px-4 py-2" placeholder="Notes" required v-model="notesToPurposeOfTrip">
  
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
                      <span>Zona<span class="text-red-star">*</span></span>
                      <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="Zona" v-model="zona" required>
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
                    <span>Date Departure<span class="text-red-star">*</span> {{ formattedDepartureDate }}</span>
                    <input v-model="departureDate" type="date" :class="inputStylingClass" :min="minDate" :max="returnDate" required>
                  </div>
  
                    <!-- Total TLK -->
                  <div :class="columnClass">
                    <span class="">Total TLK<span class="text-red-star">*</span></span>
                    <input type="text" disabled v-model="totalTLK" :class="inputStylingClass" placeholder="Total" required>
                  </div>
  
                </div>
  
                <div :class="rowClass">
                    <!-- Return date -->
                    <div :class="columnClass">
                        <span class="">Return Date<span class="text-red-star">*</span> {{ formattedReturnDate }} </span>
                        <input v-model="returnDate" :min="departureDate == '' ? minDate : departureDate" type="date" :class="inputStylingClass" placeholder="Date" required>
                    </div>
                    <div :class="columnClass">
                    </div>
                </div>
                
              </div>
            </form>

            <div v-if="requestType[1] == 'Company Business'">

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

              <!-- step 5 form Taxi Voucher -->
              <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

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
                    </tr>
                  </tbody>
                </table>
              </div>

              </div>

              <!-- step 6 form Other Transportation -->
              <div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">

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
                    </tr>
                  </tbody>
                </table>
              </div>

              </div>

              <!-- step 7 form Accomodation -->
              <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">

              <button @click="isVisibleAccomodation = !isVisibleAccomodation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                + Add Accomodation
              </button>

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

              <button @click="isVisibleCashAdvance = !isVisibleCashAdvance" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                + Add Cash Advance
              </button>

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

            <div v-if="requestType[1] == 'Site Visit'">

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

                <!-- step 5 form Taxi Voucher -->
                <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

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
                      </tr>
                    </tbody>
                  </table>
                </div>

                </div>

                <!-- step 6 form Other Transportation -->
                <div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">

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
                      </tr>
                    </tbody>
                  </table>
                </div>

                </div>

                <!-- step 7 form Accomodation -->
                <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">

                <button @click="isVisibleAccomodation = !isVisibleAccomodation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                  + Add Accomodation
                </button>

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

                <button @click="isVisibleCashAdvance = !isVisibleCashAdvance" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                  + Add Cash Advance
                </button>

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

            <div v-if="requestType[1] == 'Field Break'">

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
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

            </div>

            <div v-if="requestType[1] == 'Taxi Voucher'">

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
      </tr>
    </tbody>
  </table>
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

              <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                Next
              </button>

            </div>
        </div>

      </div>
      
    </div>

    <!-- Modal step 3 form modal Add Guest as Traveller -->
    <Modal type="clean" v-model:visible="isVisibleGuest" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleGuest = false" :title="'Guest as Traveller'" />

    <!-- pb-28 -->
    <div class="px-3 text-left modal-box-inner">

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Type of Traveller<span class="text-red-star">*</span>
              </label>
              <select v-model="typeOfTraveller" :class="inputStylingClass">
                <option v-for="data in optionDataTravellerType" :value="data.id">
                  {{ data.type_traveller }}
                </option>
              </select>
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
                v-model="department"
                required
            />
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Name<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="name">
                  <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                    {{ data.employee_name }}
                  </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Company<span class="text-red-star">*</span>
            </label>
            <select :class="inputStylingClass" v-model="company">
                <option v-for="data in optionDataCompany" :key="data.id" :value="data.company_code">
                    {{ data.company_name }}
                </option>
            </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Gender<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="gender">
                <option selected>
                  Male
                </option>
                <option>
                  Female
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Hotel Fare<span class="text-red-star">*</span>
            </label>
            <select :class="inputStylingClass" v-model="hotelFare">
                <option v-for="data in optionDataJobBand" :key="data.id">
                  {{ data.hotel_fare }}
                </option>
              </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  NIK<span class="text-red-star">*</span>
              </label>
              <input type="text" placeholder="NIK" :class="inputStylingClass" v-model="NIK">
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Flight Class<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass" v-model="flightClassGuestAsATraveller">
                <option v-for="data in optionDataFlightClass" :value="data.id">
                    {{ data.flight_class }}
                </option>
              </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Contact No<span class="text-red-star">*</span>
              </label>
              <input :class="inputStylingClass" type="text" placeholder="Contact No" v-model="contactNumber">
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label :class="labelStylingClass">
              Notes<span class="text-red-star">*</span>
            </label>
            <input type="text" placeholder="Notes" :class="inputStylingClass" v-model="notesGuestAsTraveller">
          </div>
        </div>

      </div>


    </div>

    <confirmationButton @save-data="submitGuestTraveller" @cancel-click="isVisibleGuest = false" />

    </Modal>

    <!-- Modal step 4 form modal Add Airlines -->
    <Modal type="clean" v-model:visible="isVisibleAirlines" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleAirlines = false" :title="'Airlines'" />

    <div class="px-3 text-left modal-box-inner pb-4">

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Traveller<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="traveller">
                  <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                    {{ data.employee_name }}
                  </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Departure<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass" v-model="departure">
              <option v-for="data in optionDataCity" :value="data.id">
                {{ data.city_name }}
              </option>
            </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Departure Date<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="departureDateAirlines">
                <option selected hidden disabled>
                  Date
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Return Date<span class="text-red-star">*</span>
            </label>
            <input type="date" v-model="returnDateAirlines" :class="inputStylingClass" />
          </div>
        </div>

      </div>

      <div class="flex justify-between mx-4 items-start gap-2 my-6">

        <div :class="columnClass">

          <div class="w-full">

              <label :class="labelStylingClass">
                  Flight Class<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="flightClassAirlines">
                <option selected hidden disabled>
                  Class
                </option>
              </select>

          </div>

        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Vendor<span class="text-red-star">*</span>
            </label>
            <div>
              <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor">
              <label class="ml-4">Antavaya</label>
            </div>
            <div>
              <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor">
              <label class="ml-4">Aerowisata</label>
            </div>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <h1 class="text-center">Round Trip</h1>
          <div class="py-1 flex justify-center">
              <Switch
                v-model="enabled"
                :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
                class="relative inline-flex h-[40px] w-[80px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" >
                <span
                  aria-hidden="true"
                  :class="enabled ? 'translate-x-10' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-[35px] w-[35px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
              </Switch>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Arrival<span class="text-red-star">*</span>
            </label>
            <select :class="inputStylingClass" v-model="arrival">
                <option v-for="data in optionDataCity" :value="data.id">
                    {{ data.city_name }}
                </option>
            </select>
          </div>
        </div>

      </div>

      <checkButton />

      <h1 class="mt-4 text-center text-sm font-bold">Flight Schedule</h1>
      <hr class="w-full border border-black">

      <div class="overflow-x-auto block">
        <table class="table">
          <thead>
            <tr>
              <th v-for="data in tableHeadAirlines" :key="data.id">
                {{ data.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in airlinesDummy" :key="data.id">
              <td>
                <img :src="data.Airline">
              </td>
              <td>
                {{ data.flightNo }}
              </td>
              <td>
                {{ data.Depart }}
              </td>
              <td>
                {{ data.Arrival }}
              </td>
              <td>
                {{ data.Stops }}
                {{ data.StopsMethod}}
              </td>
              <td>
                {{ data.Class }}
              </td>
              <td>
                {{ data.Price }}
              </td>
              <td>
                <button class="bg-green text-white rounded-lg px-4 py-3 font-bold">
                  Select
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>

    <confirmationButton @cancel-click="isVisibleAirlines = false" />

    </Modal>

    <!-- Modal step 5 form modal Add Taxi Voucher -->
    <Modal type="clean" v-model:visible="isVisibleTaxiVoucher" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleTaxiVoucher = false" :title="'Taxi Voucher'" />

    <div class="px-3 text-left modal-box-inner pb-4">

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Name<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="nameTaxiVoucher">
                <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                  {{ data.employee_name }}
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"> 
              Date<span class="text-red-star">*</span>
            </label>
            <input v-model="dateTaxiVoucher" type="date" :class="inputStylingClass" :min="minDate" required>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                   Departure<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="departureTaxiVoucher">
                <option v-for="data in optionDataCity" :value="data.id">
                  {{ data.city_name }}
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Arrival<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass" v-model="arrivalTaxiVoucher">
              <option v-for="data in optionDataCity" :value="data.id">
                {{ data.city_name }}
              </option>
            </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Amount<span class="text-red-star">*</span>
              </label>
              <input type="text" :class='inputStylingClass' placeholder="Amount" v-model="amountTaxiVoucher">
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  <span>Remarks</span>
              </label>
              <input type="text" :class='inputStylingClass' placeholder="Remarks" v-model="remarksTaxiVoucher">
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  <span>Account Name</span>
              </label>
              <input type="text" :class='inputStylingClass' placeholder="Account Name" v-model="accountNameTaxiVoucher">
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  <span>Voucher Code</span>
              </label>
              <input type="text" :class='inputStylingClass' placeholder="Voucher Code" v-model="voucherCodeTaxiVoucher">
          </div>
        </div>

      </div>

    </div>

    <confirmationButton @cancel-click="isVisibleTaxiVoucher = false" />

    </Modal>

    <!-- Modal step 6 form modal Add Other Transportation -->
    <Modal type="clean" v-model:visible="isVisibleOtherTransportation" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleOtherTransportation = false" :title="'Other Transportation'" />


    <div class="px-3 text-left modal-box-inner pb-4">

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Traveller<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="travellerOtherTransportation">
                <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                  {{ data.employee_name }}
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
            <select :class="inputStylingClass" v-model="cityOtherTransportation">
                <option v-for="data in optionDataCity" :value="data.id">
                  {{ data.city_name }}
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
              <select :class="inputStylingClass" v-model="typeOfTransportationOtherTransportation">
                <option v-for="data in optionDataTransportationType" :key=data.id>
                  {{ data.type_transportation }}
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Quantity<span class="text-red-star">*</span>
            </label>
            <input type="text" placeholder="Quantity" :class=inputStylingClass v-model="quantityOtherTransportation">
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  From Date<span class="text-red-star">*</span>
              </label>
              <input v-model="fromDateOtherTransportation" type="date" :class="inputStylingClass" :min="minDate" required>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Remarks<span class="text-red-star">*</span>
            </label>
            <input type="text" placeholder="Remarks" :class=inputStylingClass v-model="remarksOtherTransportation">
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">

          <div class="w-full">
            
            <label :class="labelStylingClass">
              To Date<span class="text-red-star">*</span>
            </label>
            <input v-model="toDateOtherTransportation" type="date" :class="inputStylingClass" :min="minDate" required>

          </div>

        </div>

      </div>

    </div>

    <confirmationButton @cancel-click="isVisibleOtherTransportation = false" />

    </Modal>

    <!-- Modal step 7 form modal Add Accomodation -->
    <Modal type="clean" v-model:visible="isVisibleAccomodation" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

      <modalHeader @close-click="isVisibleAccomodation = false" :title="'Accomodation'" />

      <div class="px-3 text-left modal-box-inner pb-4">

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
                <label :class="labelStylingClass">
                    Traveller<span class="text-red-star">*</span>
                </label>
                <select :class="inputStylingClass" v-model="travellerAccomodation">
                  <option v-for="(data, index) in optionDataEmployeeRequestor" :value="data.id">
                    {{ data.employee_name }}
                  </option>
                </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Gender
              </label>
              <select :class="inputStylingClass" v-model="genderAccodomation">
                <option>
                  Male
                </option>
                <option>
                  Female
                </option>
              </select>
            </div>
          </div>

        </div>

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Hotel Fare
              </label>
              <input type="text" placeholder="Max Fare" :class="inputStylingClass" v-model="hotelFareAccomodation">
            </div>
          </div>

        </div>

        <h1 class="mt-2 font-bold text-center">Requested Accomodation</h1>
        <hr class="border border-black">

        <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">City</label>
                <select :class="inputStylingClass" v-model="cityOtherTransportation">
                  <option v-for="data in optionDataCity" :value="data.id">
                    {{ data.city_name }}
                  </option>
                </select>
              </div>
            </div>

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">Remarks</label>
                <input :class="inputStylingClass" placeholder="Remarks">
              </div>
            </div>

        </div>

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">
                Check In
              </label>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  Date
                </option>
              </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full ">
              <div class="flex gap-2 items-center ml-2 mb-2">
                <input type="checkbox" class="w-5 h-5 rounded-2xl">
                <label>Sharing with</label>
              </div>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  Name
                </option>
              </select>
            </div>
          </div>
        </div>

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">
                Check Out
              </label>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  Date
                </option>
              </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="flex flex-col gap-2">
              <span :class="labelStylingClass">Create GL?</span>
              <div>
                <input type="checkbox" class="w-5 h-5 rounded-2xl ml-2 mb-2">
                <label class="ml-2">Yes</label>
              </div>
            </div>
          </div>

        </div>

        <div class="flex justify-between mx-4 items-start gap-2 my-6">

          <div :class="columnClass">
            <label :class="labelStylingClass">
              Accomodation Type
            </label>
            <select :class="inputStylingClass">
              <option selected hidden disabled>
                Type
              </option>
            </select>
          </div>

          <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Vendor<span class="text-red-star">*</span></label
            >
            <div class="pb-3 flex items-center">
              <input class="w-6 h-6" type="radio" name="vendor">
              <label class="ml-4">Antavaya</label>
            </div>
            <div class="flex items-center">
              <input class="w-6 h-6" type="radio" name="vendor">
              <label class="ml-4">Aerowisata</label>
            </div>
          </div>
          </div>

        </div>

        <checkButton />

        <h1 class="mt-2 font-bold text-center">Accomodation Availability</h1>
        <hr class="border border-black">

        <div class="overflow-x-auto block">
          <table class="table">
            <thead>
              <tr>
                <th v-for="data in tableHeadAccomodation" :key=data.id>
                  {{ data.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in accomodationDummy" :key=data.id>
                <td>
                  {{ data.HotelName }}
                </td>
                <td>
                  {{ data.Location }}
                </td>
                <td>
                  {{ data.HotelRating }}
                </td>
                <td>
                  {{ data.RoomType }}
                </td>
                <td>
                  {{ data.Price }}
                </td>
                <td>
                  <button class="bg-green text-white rounded-lg px-4 py-3 font-bold">
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <confirmationButton @cancel-click="isVisibleAccomodation = false" />

    </Modal>

    <!-- Modal step 8 form modal Add Cash Advance -->
    <Modal type="clean" v-model:visible="isVisibleCashAdvance" v-model:title="type" v-model:offsetTop="modalPaddingHeight">

      <modalHeader @close-click="isVisibleCashAdvance = false" :title="'Cash Advance'" />

      <div class="px-3 text-left modal-box-inner pb-4">
          
          <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Traveller <span class="text-red-star">*</span>
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
                <label :class=labelStylingClass>
                  Nominal <span class="text-red-star">*</span>
                </label>
                <input type="text" placeholder="Nominal" :class="inputStylingClass">
              </div>
            </div>

          </div>

          <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Item <span class="text-red-star">*</span>
                </label>
                <select :class="inputStylingClass">
                  <option selected hidden disabled>
                    Item
                  </option>
                </select>
              </div>
            </div>

            <div :class="columnClass">
              <div class="w-full">  
                <label :class=labelStylingClass>
                  Total
                </label>
                <input type="text" placeholder="Total" :class="inputStylingClass">
              </div>
            </div>

          </div>

          <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Frequency <span class="text-red-star">*</span>
                </label>
                <input type="text" placeholder="Frequency" :class="inputStylingClass">
              </div>
            </div>

            <div :class="columnClass">
              <div class="w-full">  
                <label :class=labelStylingClass>
                  Remarks
                </label>
                <input type="text" placeholder="Remarks" :class="inputStylingClass">
              </div>
            </div>

          </div>

          <div :class="rowClass">
            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Currency <span class="text-red-star">*</span>
                </label>
                <select :class="inputStylingClass">
                  <option>
                    Currency
                  </option>
                </select>
              </div>
            </div>
          </div>

      </div>

      <confirmationButton @cancel-click="isVisibleCashAdvance = false" />

    </Modal>

</template>

<style scoped>

.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
  max-width: 600px;
}

.modal-inner {
  --tw-scale-x: 0.90;
  --tw-scale-y: 0.90;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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

</style>
