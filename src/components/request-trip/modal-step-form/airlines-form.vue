<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { Modal } from "usemodal-vue3";
import Api from "@/utils/Api";
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";
import checkButton from "@/components/molecules/checkButton.vue";

import fetchEmployeeByLoginUtils from "@/utils/Fetch/Reference/fetchEmployeeByLogin";
import fetchCityUtils from "@/utils/Fetch/Reference/fetchCity";

import { useRequestTripStore } from "@/stores/requesttrip.js";
const requestTrip = useRequestTripStore();

const props = defineProps({
  isOpen: Boolean,
});

const tableHeadAirlines = [
  { id: 1, title: "Airline" },
  { id: 2, title: "Flight No" },
  { id: 3, title: "Depart" },
  { id: 4, title: "Arrival" },
  { id: 5, title: "Stops" },
  { id: 6, title: "Class" },
  { id: 7, title: "Price" },
  { id: 8, title: "Confirm" },
];

const emits = defineEmits(["fetchAirlines", "changeVisibility"]);

// Airlines
let traveller = ref("");
let arrival = ref("");
let departure = ref("");
let returnDateAirlines = ref("");
let departureDateAirlines = ref("");
let flightClassAirlines = ref("");
let flightIdAirlines = ref(0);
let vendor = ref("");
let bundleData = ref([0, 0]);

let employeeLoginData = ref();
let cityData = ref();

let adult = ref("");let infant = ref("");let child = ref("");
let adults = ref([1, 2, 4, 5, 6, 7, 8, 9]);

let airlinesData = ref();
let enabled = ref();

onBeforeMount(() => {
  fetchEmployeeByLoginUtils(employeeLoginData);
  fetchCityUtils(cityData);
});

const fetchAirlines = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("/flight_schedule");
  airlinesData.value = api.data.data;
};

watch(employeeLoginData, () => {
  traveller.value = employeeLoginData.value[0].employee_name;
  flightClassAirlines.value = employeeLoginData.value[0].flight_class;
});

watch(props, () => {
  arrival.value = "";
  departure.value = "";
  returnDateAirlines.value = "";
  departureDateAirlines.value = "";
  vendor.value = "";
});

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

let modalPaddingHeight = "15vh";
const rowClass = "flex justify-between mx-4 items-center gap-3 my-3";
const columnClass = "flex flex-col flex-1";
const inputStylingClass =
  "w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer";
const labelStylingClass = "block mb-2 font-JakartaSans font-medium text-sm";
</script>

<template>
  <Modal
    type="clean"
    v-model:visible="props.isOpen"
    v-model:offsetTop="modalPaddingHeight"
  >
    <main>
      <modalHeader
        @closeVisibility="$emit('changeVisibility')"
        :title="'Airlines'"
      />

      <form
        class="px-3 text-left modal-box-inner-inner"
        @submit.prevent="submitAirlines"
      >
        <div :class="rowClass">
          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">
                Traveller<span class="text-red-star">*</span>
              </label>
              <input
                :class="inputStylingClass"
                disabled
                type="text"
                v-model="traveller"
                required
              />
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Departure<span class="text-red-star">*</span></label
              >
              <select :class="inputStylingClass" v-model="departure">
                <option v-for="data in cityData" :value="data.id">
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
                {{ dateDeparture }} {{ dateArrival }} Departure Date<span
                  class="text-red-star"
                  >*</span
                >
              </label>
              <input
                type="date"
                :min="requestTrip.dateDeparture"
                :max="requestTrip.dateArrival"
                :class="inputStylingClass"
                v-model="departureDateAirlines"
              />
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Arrival<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass" v-model="arrival">
                <option v-for="data in cityData" :value="data.id">
                  {{ data.city_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-between mx-4 items-start gap-2 my-6">
          <!-- Departure Location -->
          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass" for="flight-class">
                Flight Class<span class="text-red-star">*</span>
              </label>

              <select
                :class="inputStylingClass"
                id="flight-class"
                required
                v-model="flightIdAirlines"
              >
                <option
                  v-for="data in flightClassAirlines"
                  :value="data.id_flight_class"
                >
                  {{ data.flight_class }}
                </option>
              </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass" for="flight-class">
                Passenggers<span class="text-red-star">*</span>
              </label>

              <select
                :class="inputStylingClass"
                id="flight-class"
                required
                v-model="adult"
              >
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
            <h1 class="">Round Trip</h1>
            <div class="py-1 flex">
              <!-- <toggle-button :value="false" color="#82C7EB" :sync="true" :labels="true"/> -->
              <Switch
                :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
                class="relative inline-flex h-[40px] w-[80px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <span
                  aria-hidden="true"
                  :class="enabled ? 'translate-x-10' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-[35px] w-[35px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
              </Switch>
            </div>
            </div>
            <div class="w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Return Date<span class="text-red-star">*</span>
              </label>
              <input
                type="date"
                :min="requestTrip.dateDeparture"
                :max="requestTrip.dateArrival"
                :class="inputStylingClass"
                v-model="returnDateAirlines"
              />
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass" for="flight-class">
                Infant<span class="text-red-star">*</span>
              </label>

              <select
                :class="inputStylingClass"
                id="flight-class"
                v-model="infant"
              >
                <option v-for="data in adults" :value="data">
                  {{ data }}
                </option>
              </select>
            </div>
            <div class="w-full">
              <label :class="labelStylingClass" for="flight-class">
                Childs<span class="text-red-star">*</span>
              </label>
              <select
                :class="inputStylingClass"
                id="flight-class"
                v-model="child"
              >
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
                        <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor" :value="1">
                        <label class="ml-4">Antavaya</label>
                    </div>
                    <div>
                        <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor" :value="2">
                        <label class="ml-4">Aerowisata</label>
                    </div>
                </div>
            </div>
            
        </div>

        <checkButton @click="fetchAirlines" />

        <h1 class="mt-4 text-center text-sm font-bold">Flight Schedule</h1>

        <hr class="w-full border border-black" />

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
              <tr v-for="data in airlinesData" :key="data.id">
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
                  <button
                    type="button"
                    :class="
                      bundleData[0] === data.flight_no ? 'bg-blue' : 'bg-green'
                    "
                    class="text-white rounded-lg px-4 py-3 font-bold"
                  >
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-3">
            <!-- ngirim emit dengan cara enter, kampret emang, gaboleh type submit emang nih button -->
            <button
                type="button"
                @click="$emit('changeVisibility')"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >
                Cancel
            </button>

            <button
                type="submit"
                class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]"
            >
                Next
            </button>
            </div>

            <slot> </slot>
        </div>

        <!-- <modalFooter @closeEdit="$emit('changeVisibility')" class="py-5" /> -->
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  width: fit-content !important;
  height: 700px !important;
  /* max-height: fit-content !important; */
}

.modal-box-inner-inner {
  /* height: 100% !important; */
  height: 700px !important;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto !important;
}
</style>