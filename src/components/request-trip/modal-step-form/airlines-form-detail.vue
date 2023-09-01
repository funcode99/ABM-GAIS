<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { Modal } from "usemodal-vue3";
import Api from "@/utils/Api";
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";
import profileImage from '@/assets/profile.png'
import citilinkLogo from '@/assets/airlines-1.png'

import fetchEmployeeByLoginUtils from "@/utils/Fetch/Reference/fetchEmployeeByLogin";
import fetchCityUtils from "@/utils/Fetch/Reference/fetchCity";

import { useRequestTripStore } from "@/stores/requesttrip.js";
const requestTrip = useRequestTripStore();

const props = defineProps({
  isOpen: Boolean,
});
let titles = ref(['Mr','Mrs',"Mstr","Miss",'INF']);

const emits = defineEmits(["submitData"]);

const submitAirlines = async () => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   const api = await Api.post("/flight_trip/store", {
  //     id_request_trip: localStorage.getItem("tripId"),
  //     id_vendor: vendor.value,
  //     flight_no: bundleData.value[0],
  //     code_airlines: flightIdAirlines.value,
  //     ticket_price: bundleData.value[1],
  //   });
  emits('submitData',{
    'first_name'  : 'First Name',
    'last_name' : 'Last Name',
  })
  //   emits("changeVisibility");
};

let modalPaddingHeight = "15vh";
const rowClass = "flex justify-between mx-4 items-center gap-3 my-3";
const rowClassInLarge = "flex mx-4 items-center gap-3 my-3";
const columnClass = "w-2/6";
const columnClassLarge = "w-4/6";
const inputStylingClass =
  "w-full  py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer";
const labelStylingClass = "block mb-2 font-JakartaSans font-medium text-sm";
const inputStylingClassSmall =
  "py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer";
</script>

<template>
  <Modal
    type="clean"
    v-model:visible="props.isOpen"
    v-model:offsetTop="modalPaddingHeight"
  >
    <modalHeader
      @closeVisibility="$emit('changeVisibility')"
      :title="'Airlines'"
    />

    <form
      class="px-3 text-left modal-box-inner-inner"
      @submit.prevent="submitAirlines"
    >
      <div class="flex justify-between mx-4 gap-3 my-3">
        <div :class="columnClassLarge">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">Booking Contact</label>
          <div :class="rowClassInLarge">
            <div class="w-1/6">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Title<span class="text-red-star">*</span></label
                >
                <select :class="inputStylingClassSmall" v-model="departure">
                  <option v-for="data in titles" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-5/6">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >First Name<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/6">
            </div>
            <div class="w-5/6">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Last Name<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/6">
            </div>
            <div class="w-5/6">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Email<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/6">
            </div>
            <div class="w-5/6">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Home Phone<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/6">
            </div>
            <div class="w-5/6">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Mobile Phone<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
        </div>

        <div :class="columnClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"></label>
          <div class="w-full pt-5" >
            <table  class="w-full ">
                <tr>
                  <td colspan="3" style="text-align: center;" class="text-white bg-slate-700"> Flight Summary</td>
                </tr>
                <tr>
                  <td  colspan="2" style="text-align: center;" class="bg-slate-300"> Departure: Mon, 22 Aug</td>
                  <td  class=" bg-slate-300" > 
                    <button class="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded">
                      CHANGE
                    </button>
                  </td>
                </tr>
                <tr>
                  <td  colspan="2" style="text-align: center;" class="bg-slate-300"> 
                    <img :src="citilinkLogo" alt="" />
                    Citilink
                  </td>
                  <td style="text-align: center;" class=" bg-slate-300" > 
                    Economy <br>
                    Rp 699,390
                  </td>
                </tr>
                <tr>
                  <td colspan="3" style="text-align: left;" class="bg-slate-300"><img :src="profileImage" class="w-3 h-3" />Passengger</td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: left;" class="bg-slate-300">CGK - SUB
                    <br>
                    09:00 - 10:45</td>
                    <td colspan="1" style="text-align: left;" class="bg-slate-300">1h 45m Direct</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
      <div :class="rowClass">
        <div :class="columnClassLarge">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">Passengger 1 of 2</label>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Title<span class="text-red-star">*</span></label
                >
                <select :class="inputStylingClassSmall" v-model="departure">
                  <option v-for="data in titles" :value="data">
                    {{ data }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Type<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >First Name<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Last Name<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Birth Date<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Email<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Mobile Phone<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Title<span class="text-red-star">*</span></label
                >
                <div class="flex">
                  <select :class="inputStylingClassSmall" v-model="isktp">
                  <option v-for="data in ['KTP','SIM']" :value="data">
                    {{ data }}
                  </option>
                </select>
                  <input :class="inputStylingClass" type="text" required />
                </div>
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Nationaly<span class="text-red-star">*</span></label
                >
                <input :class="inputStylingClass" type="text" required />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div class="w-full">
                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                    Is Senior Citizen<span class="text-red-star">*</span>
                    </label>
                    <div class="flex">
                      <div class="flex mr-3">
                        <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor" :value="1">
                        <label class="ml-4">Yes</label>
                    </div>
                    <div class="flex">
                        <input class="w-6 h-6" type="radio" name="vendor" v-model="vendor" :value="2">
                        <label class="ml-4">No</label>
                    </div>
                    </div>
                </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Passport Number</label
                >
                <input :class="inputStylingClass" type="text"  />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Passport Origin</label
                >
                <input :class="inputStylingClass" type="text"  />
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Passport Expired</label
                >
                <input :class="inputStylingClass" type="text"  />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Emergency Full</label
                >
                <input :class="inputStylingClass" type="text"  />
              </div>
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Emergency Email</label
                >
                <input :class="inputStylingClass" type="text"  />
              </div>
            </div>
          </div>
          <div :class="rowClassInLarge">
            <div class="w-1/5">
            </div>
            <div class="w-2/5">
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Emergency Phone</label
                >
                <input :class="inputStylingClass" type="text"  />
              </div>
            </div>
            <div class="w-2/5">
            </div>
          </div>
          
        </div>
      </div>
      <modalFooter @closeEdit="$emit('changeVisibility')" class="py-5" />
    </form>
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
  width: 900px !important;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto !important;
}
</style>