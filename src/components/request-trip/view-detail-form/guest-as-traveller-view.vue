<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'

    const props = inject('travellerDataView')

    let name = ref()
    let department = ref()
    let flightClass = ref()
    let sn = ref()
    let company = ref()
    let gender = ref()
    let type = ref()
    let contactNo = ref()
    let maxHotelFare = ref()

    watch(props, () => {
        name.value = props.value[0].name_guest
        department.value = props.value[0].departement
        flightClass.value = props.value[0].flight_class
        sn.value = props.value[0]
        company.value = props.value[0].company
        gender.value = props.value[0].gender
        type.value = props.value[0].type_traveller
        contactNo.value = props.value[0].contact_no
        maxHotelFare.value = props.value[0].hotel_fare
    })

    if(props.value[0].name_guest !== undefined) {
        name.value = props.value[0].name_guest
        department.value = props.value[0].departement
        flightClass.value = props.value[0].flight_class
        sn.value = props.value[0]
        company.value = props.value[0].company
        gender.value = props.value[0].gender
        type.value = props.value[0].type_traveller
        contactNo.value = props.value[0].contact_no
        maxHotelFare.value = props.value[0].hotel_fare
    }

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const rowClassStart = 'flex justify-between mx-4 items-start gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>
    <div>
        
        <div :class="rowClass">

            <div :class="columnClass">
                
                <div class="w-full">
                    
                    <label :class="labelStylingClass">
                        Name<span class="text-red-star">*</span>
                    </label>
                    
                    <input
                        v-model="name"
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
                        v-model="department"
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
                    v-model="flightClass"
                    type="text"
                    placeholder="Flight Class"
                    :class="inputStylingClass"
                    required
                    />

                </div>

            </div>

        </div>

        <div :class="rowClass">

            <!-- SN -->
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

            <!-- Company -->
            <div :class="columnClass">

                <div class="w-full">

                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Company<span class="text-red-star">*</span>
                    </label>

                    <input
                        v-model="company"
                        type="text"
                        :class="inputStylingClass"
                        placeholder="Company"
                        required
                    />

                </div>

            </div>

            <div :class="columnClass"></div>

        </div>

        <div :class="rowClass">

            <!-- Gender -->
            <div :class="columnClass">

                <div class="w-full">
                    
                    <label :class="labelStylingClass">
                        Gender<span class="text-red-star">*</span>
                    </label>

                    <select :class="inputStylingClass" v-model="gender">
                        <option value="L" selected hidden disabled>
                        Male
                        </option>
                        <option value="P" selected hidden disabled>
                        Female
                        </option>
                    </select>

                </div>

            </div>

            <!-- Traveller Type -->
            <div :class="columnClass">

                <div class="w-full">
                    
                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Type<span class="text-red-star">*</span>
                    </label>

                    <input 
                        v-model="type"
                        type="text"
                        placeholder="Type"
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
            <label :class="labelStylingClass">
                Contact No<span class="text-red-star">*</span>
            </label>
            <input :class="inputStylingClass" type="text" placeholder="Contact No" v-model="contactNo">
        </div>
        </div>

        <div :class="columnClass">

            <div class="w-full">
                <label :class="labelStylingClass">
                    Max Hotel Fare<span class="text-red-star">*</span>
                </label>
                <input type="text" placeholder="Notes" :class="inputStylingClass" v-model="maxHotelFare">
            </div>

        </div>

        <div :class="columnClass"></div>

        </div>

    </div>
</template>