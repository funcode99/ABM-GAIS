<script setup>
    import {
        ref,
        onBeforeMount,
        provide,
        watch
    } from 'vue'

    import iconClose from "@/assets/navbar/icon_close.svg"
    import Api from '@/utils/Api'

    import checkButton from '@/components/molecules/checkButton.vue'
    import fetchCityUtils from "@/utils/Fetch/Reference/fetchCity";
    import fetchEmployeeByLoginUtils from "@/utils/Fetch/Reference/fetchEmployeeByLogin";
    import {
        useSidebarStore
    } from "@/stores/sidebar.js"
    import {
        useRequestTripStore
    } from "@/stores/requesttrip.js";
    const requestTrip = useRequestTripStore();
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

    let lockScrollbarEdit = ref(false)

    let notesName = ref('')
    let cityData = ref();
    let flightClassAirlines = ref("");
    let traveller = ref("");
    let employeeLoginData = ref();
    let flightIdAirlines = ref(0);
    let adult = ref("");
    let infant = ref("");
    let child = ref("");
    let adults = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let enabled = ref();
    let returnDateAirlines = ref("");
    let airlinesDatas = ref();
    let bundleData = ref([0, 0]);
    let vendor = ref("");
    provide('travellerDataView', travellerGuestData)
    provide('airlinesDataView', airlinesData)
    provide('taxiVoucherDataView', taxiVoucherData)
    provide('otherTransportationDataView', otherTransportationData)
    provide('accomodationDataView', accomodationData)
    provide('cashAdvanceDataView', cashAdvanceData)

    let listOfFormDataProps = [travellerGuestData, airlinesData, taxiVoucherData, otherTransportationData,
        accomodationData, cashAdvanceData
    ]
    const tableHeadAirlines = [{
            id: 1,
            title: "Airline"
        },
        {
            id: 2,
            title: "Flight No"
        },
        {
            id: 3,
            title: "Depart"
        },
        {
            id: 4,
            title: "Arrival"
        },
        {
            id: 5,
            title: "Stops"
        },
        {
            id: 6,
            title: "Class"
        },
        {
            id: 7,
            title: "Price"
        },
        {
            id: 8,
            title: "Confirm"
        },
    ];
    const emits = defineEmits(["fetchAirlines", "changeVisibility"]);
    const getAirlines = async () => {

        try {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`;
            let api = await Api.get(
                `/flight_trip/get_by_travel_id/trip_id/${localStorage.getItem('tripIdView')}`)
            airlinesData.value = api.data.data
        } catch (error) {
            console.log(error)
            airlinesData.value = [{}]
        }

    }
    const submitAirlines = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        //   const api = await Api.post("/flight_trip/store", {
        //     id_request_trip: localStorage.getItem("tripId"),
        //     id_vendor: vendor.value,
        //     flight_no: bundleData.value[0],
        //     code_airlines: flightIdAirlines.value,
        //     ticket_price: bundleData.value[1],
        //   });
        emits('submitData', {
            id_vendor: vendor.value,
            flight_no: bundleData.value[0],
            code_airlines: flightIdAirlines.value,
            ticket_price: bundleData.value[1],
        })

        // emits("fetchAirlines");
        // emits("changeVisibility");
    };
    const fetchAirlines = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get("/flight_schedule");
        airlinesDatas.value = api.data.data;
    };

    const changeSelected = (title) => {
        headerTitle.value = title
    }

    const showModal = () => {
        lockScrollbarEdit.value = true
    }

    const assignSelectedData = () => {
        headerTitle.value === 'Traveller' ? currentSelectedData.value = travellerGuestData.value :
            headerTitle.value === 'Airlines' ? currentSelectedData.value = airlinesData.value :
            headerTitle.value === 'Taxi Voucher' ? currentSelectedData.value = taxiVoucherData.value :
            headerTitle.value === 'Other Transportation' ? currentSelectedData.value = otherTransportationData
            .value :
            headerTitle.value === 'Accomodation' ? currentSelectedData.value = accomodationData.value :
            headerTitle.value === 'Cash Advance' ? currentSelectedData.value = cashAdvanceData.value :
            travellerGuestData.value
    }

    let actualizationData = ref([])

    const getActualizationByTripId = async () => {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get(`/actual_trip/get_by_id_trip/${localStorage.getItem("tripIdView")}`)
        actualizationData.value = api.data.data

    }

    onBeforeMount(() => {
        console.log(employeeLoginData)
        getAirlines()
        fetchCityUtils(cityData);
        fetchEmployeeByLoginUtils(employeeLoginData);
    })
    watch(employeeLoginData, () => {
        traveller.value = employeeLoginData.value[0].employee_name;
        flightClassAirlines.value = employeeLoginData.value[0].flight_class;
    });
    watch(purposeOfTripData, () => {
        notes.value = purposeOfTripData.value[currentIndex].notes
    })

    let propsCheck = ref(null)

    const assignToCheckProps = () => {
        if (headerTitle.value === 'Traveller') {
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

        if (headerTitle.value === 'Cash Advance') {
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
        if (count.value === 7) {
            currentSelectedData.value = travellerGuestData.value
        }
    })

    watch(currentSelectedData, () => {
        dataIndex.value = 0
        showingValue.value = 1
    })

    watch(isEditing, () => {
        file.value = purposeOfTripData.value[currentIndex].file
        if (isEditing.value === false) {
            typeOfSubmitToProps.value = 'none'
            isAdding.value = false
        }
    })

    const changeType = (typeOfSubmit) => {

        if (typeOfSubmit === 'Check Props') {
            JSON.stringify(propsCheck.value) === '[{}]' ? typeOfSubmit = 'Submit Add' : typeOfSubmit = 'Add'
        }

        typeOfSubmitToProps.value = typeOfSubmit

        if (typeOfSubmit === 'Add') {
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
        dataIndex.value = pageOfItem - 1
    }

    const changeViewLayout = (layout) => {
        viewLayout.value = layout
    }

    const enterNewTab = () => {
        if (JSON.stringify(file.value) === "{}") {
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

    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass =
        'w-full md:w-full lg:w-full py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
</script>
<template>
    <label for="my_modal_6"
                    
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-red hover:border-red hover:text-white">
                    Revise
                  </label>


            <input type="checkbox" id="my_modal_6" class="modal-toggle" />
            <div class="modal">
                <div class="modal-dialog bg-white w-3/5 h-[700px] overflow-y-auto rounded-2xl ">
                    <nav class="sticky top-0 bg-[#015289] rounded-t-2xl">
                        <label for="my_modal_6" class="cursor-pointer absolute right-3 top-3">
                            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
                        </label>
                        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
                            Airlines
                        </p>
                    </nav>
                    <main>
                        <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="submitAirlines">

                            <div :class="rowClass">

                                <div :class="columnClass">

                                    <div class="w-full">
                                        <label :class="labelStylingClass">
                                            Traveller<span class="text-red-star">*</span>
                                        </label>
                                        <input :class="inputStylingClass" id="flight-class" disabled
                                            v-model="traveller" />
                                    </div>

                                </div>

                                <div :class="columnClass">

                                    <div class="w-full">
                                        <label :class="labelStylingClass" for="flight-class">
                                            Departure<span class="text-red-star">*</span>
                                        </label>

                                        <select :class="inputStylingClass" id="flight-class" required
                                            v-model="departure">
                                            <option v-for="data in cityData" :value="data.id" :key="data.id">
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
                                            <!-- {{ dateDeparture }} {{ dateArrival }} -->
                                            Departure Date<span class="text-red-star">*</span>
                                        </label>
                                        <input type="date" :min="requestTrip.dateDeparture"
                                            :max="requestTrip.dateArrival" :class="inputStylingClass"
                                            v-model="departureDateAirlines" />
                                    </div>
                                </div>

                                <div :class="columnClass">
                                    <div class="w-full">
                                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                            Arrival Date<span class="text-red-star">*</span>
                                        </label>
                                        <input type="date" :class="inputStylingClass" v-model="arrival" />
                                    </div>
                                </div>

                            </div>

                            <div class="flex justify-between mx-4 items-start gap-2 my-6">

                                <!-- Departure Location -->
                                <div :class="columnClass">
                                    <div class="w-full">
                                        <label class="block mb-2 font-JakartaSans font-medium text-sm">Flight
                                            Class<span class="text-red-star">*</span></label>
                                        <select :class="inputStylingClass" v-model="flightIdAirlines">
                                            <option v-for="data in flightClassAirlines" :value="data.id_flight_class">
                                                {{ data.flight_class }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div :class="columnClass">
                                    <div class="w-full">
                                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                            Passengers<span class="text-red-star">*</span>
                                        </label>
                                        <select :class="inputStylingClass" v-model="adult">
                                            <option v-for="data in adults" :value="data">
                                                {{ data }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div :class="rowClass">

                                <div :class="columnClass">
                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Round Trip<span class="text-red-star">*</span>
                                    </label>
                                    <div class="py-1 flex justify-left">
                                        <Switch :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
                                            class="relative inline-flex h-[30px] w-[70px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-45">
                                            <span aria-hidden="true"
                                                :class="enabled ? 'translate-x-10' : 'translate-x-0'"
                                                class="pointer-events-none inline-block h-[25px] w-[35px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                        </Switch>
                                    </div>
                                </div>

                                <div :class="columnClass">
                                    <div class="w-full">
                                        <label :class="labelStylingClass" for="flight-class">
                                            Infant<span class="text-red-star">*</span>
                                        </label>
                                        <select :class="inputStylingClass" v-model="infant">
                                            <option v-for="data in adults" :value="data">
                                                {{ data }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div :class="rowClass">

                                <div :class="columnClass">
                                    <div class="w-full">

                                        <label :class="labelStylingClass">
                                            <!-- {{ dateDeparture }} {{ dateArrival }} -->
                                            Return Date<span class="text-red-star">*</span>
                                        </label>
                                        <input type="date" :class="inputStylingClass" :min="requestTrip.dateDeparture"
                                            :max="requestTrip.dateArrival" v-model="returnDateAirlines" />
                                    </div>
                                </div>

                                <div :class="columnClass">
                                    <div class="w-full">
                                        <label :class="labelStylingClass" for="flight-class">
                                            Childs<span class="text-red-star">*</span>
                                        </label>
                                        <select :class="inputStylingClass" v-model="child">
                                            <option v-for="data in adult" :value="data">
                                                {{ data }}
                                            </option>
                                        </select>

                                    </div>
                                </div>

                            </div>
                            <div :class="rowClass">
                                <div :class="columnClass">
                                    <div class="w-full">
                                        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                            Vendor<span class="text-red-star">*</span>
                                        </label>
                                        <div>
                                            <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor"
                                                :value="1">
                                            <label class="ml-4">Antavaya</label>
                                        </div>
                                        <div>
                                            <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor"
                                                :value="2">
                                            <label class="ml-4">Aerowisata</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <checkButton @click="fetchAirlines" />

                            <h1 class="mt-4 text-center text-sm font-bold">Flight Schedule</h1>


                            <hr class="w-full border border-black">

                            <div class="overflow-x-auto">
                                <table class="table w-full">
                                    <thead>
                                        <tr>
                                            <th v-for="data in tableHeadAirlines" :key="data.id">
                                                {{ data.title }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in airlinesDatas" :key="data.id">
                                            <td>
                                                <!-- <img class="w-20 h-[18px]" :src="data.Airline"> -->
                                                {{ data.airlines }}
                                            </td>
                                            <td>
                                                {{ data.flight_no }}
                                            </td>
                                            <td>
                                                {{ data.depart }}
                                            </td>
                                            <td>
                                                {{ data.arrival }}
                                            </td>
                                            <td>
                                                {{ data.stops }}
                                                <!-- {{ data.StopsMethod}} -->
                                            </td>
                                            <td>
                                                {{ data.class }}
                                            </td>
                                            <td>
                                                {{ data.price }}
                                            </td>
                                            <td @click="bundleData = [data.flight_no, data.price]">
                                                <button type="button" :class="
                      bundleData[0] === data.flight_no ? 'bg-blue' : 'bg-green'
                    " class="text-white rounded-lg px-4 py-3 font-bold">
                                                    Select
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- <modalFooter @closeEdit="$emit('changeVisibility')" class="py-5" /> -->


                            <div class="sticky bottom-0 bg-white py-2">
                                <div class="flex justify-end gap-4 mr-6">
                                    <label for="my_modal_6"
                                        class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red">Cancel</label>
                                    <button
                                        class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
                                        type="submit">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
</template>