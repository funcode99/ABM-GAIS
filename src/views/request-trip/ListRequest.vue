<script setup>
    import { ref } from 'vue'

    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import CompanyBusinessRequestTripModal from '@/components/request-trip/CompanyBusinessRequestTripModal.vue'

    let requestTripType = ref('Company Business')

</script>

<template>
       <div class="flex flex-col basis-full grow-0 shrink-0 w-full h-full this font-JakartaSans">
        
        <Navbar />
    
        <div class="flex w-screen mt-[115px]">

            <Sidebar class="flex-none fixed" />

                <div class="bg-[#e4e4e6] flex-1 py-5 px-[5%] h-screen width ml-[260px] ">

                    <div class="bg-white rounded-t-xl pb-3 relative">

                        <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
                        <div class="flex flex-wrap gap-y-2 items-center justify-between mx-4 py-2">
                        <p class="font-Poppins text-base capitalize text-[#0A0A0A] font-semibold">
                            Request Trip 
                            <!-- {{ requestTripType }} -->
                        </p>
                        <div class="flex gap-4">
                            <CompanyBusinessRequestTripModal />
                            <button
                            class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                            >
                            <img :src="icon_receive" class="w-6 h-6" />
                            </button>
                        </div>
                        </div>

                        <!-- SORT & SEARCH -->
                        <div class="flex flex-wrap items-center px-4 py-2 gap-y-2">

                        <div class="flex flex-wrap md:grid md:grid-flow-col md:auto-cols-max items-center gap-x-2 sm:gap-4 gap-y-4">
                            
                            <!-- sort company filter -->
                            <div class="flex justify-between items-center gap-4">

                            <p class="capitalize font-Fira text-xs text-black font-medium">
                                Purpose of Trip
                            </p>

                            <!-- <div class="dropdown dropdown-bottom bg-white rounded-lg h-9 border">
                                <button tabindex="0">
                                    <div tabindex="0" class="collapse collapse-arrow">
                                        <div class="collapse-title min-h-max py-3">
                                            <p
                                            class="flex justify-center items-center capitalize font-Fira text-xs text-black font-medium"
                                            >
                                            Company Business
                                            </p>
                                        </div>
                                    </div>
                                </button>
                                <ul
                                    tabindex="0"
                                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 capitalize"
                                >
                                    <li><a>Company Business</a></li>
                                    <li><a>Site Visit</a></li>
                                    <li><a>Field Break</a></li>
                                    <li><a>Taxi Voucher Only</a></li>
                                </ul>
                            </div> -->

                            <select v-model="requestTripType">
                                <option>Company Business</option>
                                <option>Site Visit</option>
                                <option>Field Break</option>
                                <option>Taxi Voucher Only</option>
                            </select>

                            </div>

                            <!-- filter & reset button -->
                            <div class="flex gap-4 flex-wrap items-center">
                                <button
                                class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                                >
                                <span>
                                    <img :src="icon_filter" class="w-5 h-5" />
                                </span>
                                Filter
                                </button>
                                <button
                                class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                                >
                                <span>
                                    <img :src="icon_reset" class="w-5 h-5" />
                                </span>
                                Reset
                                </button>
                            </div>

                        </div>

                        <div class="sm:flex-1"></div>
                        
                        <!-- searchbar -->
                        <form class="py-2 flex justify-center items-center">
                            <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                            >
                                <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                class="input input-bordered input-info w-36 sm:w-full px-12 h-9"
                                v-model="search"
                                @keyup="filteredItems(search)"
                            />
                            </div>
                        </form>

                        </div>

                        <!-- SHOWING -->
                        <div class="flex items-center gap-1 pt-2 pb-4 px-4 h-4">
                        <h1 class="text-xs">Showing</h1>
                        <select class="border-2 border-black rounded-lg w-15" name="" id="">
                            <option value="">10</option>
                            <option value="">25</option>
                            <option value="">50</option>
                            <option value="">75</option>
                            <option value="">100</option> 
                        </select>
                        </div>

                    </div>

                </div>

            <Footer class="fixed bottom-0 left-0 right-0" />

        </div>
       
    </div>
</template>