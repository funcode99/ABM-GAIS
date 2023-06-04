<script setup>
    import { Modal } from 'usemodal-vue3'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import confirmationButton from '@/components/molecules/confirmationButton.vue'
    import modalFooter from "@/components/modal/modalFooter.vue"
    import checkButton from '@/components/molecules/checkButton.vue'

    import Airline1 from '@/assets/airlines-1.png'
    import Airline2 from '@/assets/airlines-2.png'

    const props = defineProps({
        isOpen: Boolean        
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

    let modalPaddingHeight = '15vh'

    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

        <Modal type="clean" v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

            <main>

                <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Airlines'" />
    
                <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">
    
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
                    
                    <!-- :class="rowClass" -->
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
                                <img class="w-20 h-[18px]" :src="data.Airline">
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

                    <modalFooter
                        @closeEdit="$emit('changeVisibility')"
                        class="py-5"
                    />
    
                </form>
    
                <!-- <confirmationButton @cancel-click="isVisibleAirlines = false" /> -->
            
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