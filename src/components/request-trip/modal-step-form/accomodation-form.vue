<script setup>
    import { Modal } from 'usemodal-vue3'
    import modalHeader from '@/components/modal/modalHeader.vue'
    import confirmationButton from '@/components/molecules/confirmationButton.vue'
    import modalFooter from '@/components/modal/modalFooter.vue'

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
    
    const props = defineProps({
        isOpen: Boolean        
    })
    let modalPaddingHeight = '15vh'
    const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
</script>

<template>

    <Modal v-model:visible="props.isOpen" v-model:offsetTop="modalPaddingHeight">

        <main>
            <modalHeader @closeVisibility="$emit('changeVisibility')" :title="'Accomodation'" />
    
            <form class="px-3 text-left modal-box-inner-inner" @submit.prevent="">
    
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
    
                <modalFooter
                    @closeEdit="$emit('changeVisibility')"
                    class="py-5"
                />
    
            </form>
        </main>


    <!-- <confirmationButton @cancel-click="isVisibleAccomodation = false" /> -->

    </Modal>

</template>

<style scoped>

    :deep(.modal-vue3-content) {
            width: fit-content !important;
            max-height: 550px !important;
    }

    .modal-box-inner-inner {
        max-height: 450px !important;
        --tw-scale-x: 0.9;
        --tw-scale-y: 0.9;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y))
            rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
            scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        overflow-y: auto !important;
    }

</style>