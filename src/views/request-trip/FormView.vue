<script setup>
    import { ref } from 'vue'
    import expandArrow from '@/assets/ExpandArrow.png'

    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    let tab = ref('details')
    let showTravel = ref(true)
    let showAirlines = ref(true)
</script>

<template>
    <div class="flex flex-col basis-full grow-0 shrink-0 w-full h-full this font-JakartaSans">
        <Navbar />
        <div class="flex w-screen mt-[115px]">
            <Sidebar class="flex-none" />
            <ExpandButton />
            <div class="bg-[#e4e4e6] py-5 px-8 w-screen h-full duration-500 ease-in-out"
            :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
            >
                <div class="bg-white rounded-xl pb-3 relative py-9 px-5">
                    <div class="flex items-center gap-2">
                        <img :src="arrow" class="w-3 h-3" alt="">
                        <h1 class="text-blue font-semibold">Request Trip<span class="text-[#0a0a0a]"> / TRV-ABM/1232/23.04</span> </h1>
                    </div>
                    <div class="flex gap-4 mt-6 mb-3 ml-5">
                            <button class="text-blue border border-blue rounded-lg text-base py-[5px] px-[18px] font-bold">Edit</button>
                            <button class="bg-green text-white rounded-lg text-base py-[5px] px-[18px] font-bold">
                                Save
                            </button>
                    </div>
                    <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">
                            <div class="flex flex-col gap-2">
                                <span>Date Created <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="13/5/2023" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                            <div class="flex flex-col gap-2">
                                <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="Company Business" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                            <div class="flex flex-col gap-2">
                                <span>Requestor <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="Gavin McFarland" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                    </div>
                    <div class="bg-blue rounded-lg pt-2">
                            <button @click="tab = 'details'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'details' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                Details
                            </button>
                            <button @click="tab = 'tlk'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'tlk' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                TLK Info
                            </button>
                    </div>
                   
                        <div v-if="tab == 'details'">

                            <div class="flex items-center cursor-pointer z-50" @click="showTravel = !showTravel">
                                <h1>Traveller</h1>
                                <img :src=expandArrow class="w-5 h-5" alt="">
                            </div>
                            <hr class="border-2 border-black z-50">
                            
                            <Transition name="fade">
                                <table v-if="showTravel" class="mt-4 w-full z-3">
                                    <thead>
                                        <tr class="bg-blue text-white h-8">
                                            <th class="border-2 border-[#8b8b8b]">Name</th>
                                            <th class="border-2 border-[#8b8b8b]">SN</th>
                                            <th class="border-2 border-[#8b8b8b]">Gender</th>
                                            <th class="border-2 border-[#8b8b8b]">Contact No</th>
                                            <th class="border-2 border-[#8b8b8b]">Department</th>
                                            <th class="border-2 border-[#8b8b8b]">Company</th>
                                            <th class="border-2 border-[#8b8b8b]">Type</th>
                                            <th class="border-2 border-[#8b8b8b]">Max Hotel Fare</th>
                                            <th class="border-2 border-[#8b8b8b]">Flight Entitlement</th>
                                            <th class="border-2 border-[#8b8b8b]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="h-16">
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Transition>

                            <div class="flex items-center cursor-pointer z-50" @click="showAirlines = !showAirlines">
                                <h1>Airlines</h1>
                                <img :src=expandArrow class="w-5 h-5" alt="">
                            </div>
                            <hr class="border-2 border-black z-50">
                            
                            <Transition name="fade">
                                <table v-if="showAirlines" class="mt-4 w-full z-3">
                                    <thead>
                                        <tr class="bg-blue text-white h-8">
                                            <th class="border-2 border-[#8b8b8b]">Name</th>
                                            <th class="border-2 border-[#8b8b8b]">SN</th>
                                            <th class="border-2 border-[#8b8b8b]">Gender</th>
                                            <th class="border-2 border-[#8b8b8b]">Contact No</th>
                                            <th class="border-2 border-[#8b8b8b]">Department</th>
                                            <th class="border-2 border-[#8b8b8b]">Company</th>
                                            <th class="border-2 border-[#8b8b8b]">Type</th>
                                            <th class="border-2 border-[#8b8b8b]">Max Hotel Fare</th>
                                            <th class="border-2 border-[#8b8b8b]">Flight Entitlement</th>
                                            <th class="border-2 border-[#8b8b8b]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="h-16">
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                            <td class="border-2 border-[#8b8b8b]"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Transition>
                           
                        </div>
                        
                        <div v-else-if="tab == 'tlk'">
                            <h1>TLK</h1>
                            <hr class="border-black border-2">
                            <div class="flex flex-col mt-3">
                                <span>Requestor <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="Gavin McFarland" disabled>
                            </div>
                            <div class="flex flex-col mt-3">
                                <span>Job Band <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="B" disabled>
                            </div>
                            <div class="flex flex-col mt-3">
                                <span>TLK <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="A" disabled>
                            </div>
                            <div class="flex flex-col mt-3">
                                <span>Total TLK <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="569.000" disabled>
                            </div>
                        </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

/* .fade-leave-active
{
  transition: transform .3s ease-out;
} */

.fade-enter-from
{   
    transform: translateY(-10px);
}

.fade-enter-active
{
  transition: transform .5s ease;
}

.fade-enter-to
{
   transform: translateY(0px);
}

/* .fade-leave-from
{
   transform: translateY(0px);
}

.fade-leave-to
{   
    transform: translateY(-10px);
} */
</style>