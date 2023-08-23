<script setup>
    import { ref, onBeforeMount, provide, watch } from 'vue'
    import Api from '@/utils/Api'

    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
</script>

<template>
    <div 
        class="flex flex-col w-full this h-[100vh]"
    >
        <Navbar />
        <div class="flex w-screen content mt-[115px]">
            <Sidebar class="flex-none" />
            <div class="bg-[#e4e4e6] pb-20 pt-10 px-8 w-screen clean-margin duration-500 ease-in-out"
            :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']">
          
                <div class="bg-white rounded-xl pb-3 relative py-9 px-5">

                    <div class="flex items-center gap-2">

                      <router-link to="/actualization">
                        <img :src="arrow" class="w-3 h-3" alt="">
                      </router-link>

                      <h1 class="text-blue font-semibold">
                        Actualization Trip<span class="text-[#0a0a0a]"> / 
                            <!-- {{ purposeOfTripData[currentIndex].no_request_trip }} -->
                        </span>

                      </h1>

                      <div class="flex-1"></div>

                      <div class=" min-w-[114px] h-[42px] text-center text-base font-bold rounded-t-lg rounded-bl-3xl rounded-br-lg border flex items-center justify-center border-black px-3">
                        <!-- {{ purposeOfTripData[currentIndex].status }} -->
                      </div>
                      
                    </div>

                    <!-- SUBMIT & EDIT BUTTON FOR REQUEST TRIP HEADER -->
                    <div class="flex gap-4 mt-6 mb-3 ml-5" >
                        
                      <buttonEditFormView />
                      <buttonSaveFormView />
                        
                      <!-- SUBMIT BUTTON -->
                      <button 
                        v-if="!isEditing" 
                        @click="submitRequestTrip" 
                        class="bg-orange text-white rounded-lg text-base py-[5px] px-[18px] font-bold"
                      >
                        Submit
                      </button>

                      <buttonCancelFormView
                        v-if="isEditing"
                        @click="isEditing = false; showCreateNewCAHeader = false"
                      />

                      <AddActualizationTripModal  />

                      <div class="flex-1"></div>

                      <EditActualizationTripModal  />



                    </div>

                    <!-- FORM READ ONLY -->
                    <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">

                        <div class="flex flex-col gap-2">
                            <span>Created Date <span class="text-[#f5333f]">*</span></span>
                            <input     
                                type="text" 
                                disabled
                                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                            />
                        </div>

                        <div class="flex flex-col gap-2">

                            <span>
                                Created By <span class="text-[#f5333f]">*</span>
                            </span>

                          <input
                            type="text"
                            class="px-4 py-3 border border-[#e0e0e0] rounded-lg min-w-[80%] cursor-pointer" 
                            disabled                                 
                          />

                        </div>

                        <div class="flex flex-col gap-2">
                            <span>
                                Reference <span class="text-[#f5333f]">*</span>
                            </span>
                            <input
                                type="text" 
                                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]" 
                                disabled
                            />
                        </div>

                    </div>

                    <!-- TAB BACKGROUND -->
                    <div class="bg-blue rounded-lg pt-2">
                            
                            <button @click="tab = 'details'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div
                                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg" 
                                :class="tab == 'details' ? 'block' : 'hidden'" 
                                ></div>
                                Details
                            </button>

                            <button 
                              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative"
                              @click="tab = 'approval'" 
                              >

                                <div 
                                  class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
                                  :class="tab == 'approval' ? 'block' : 'hidden'" 
                                  ></div>
                                Approval

                            </button>

                    </div>

                    <!-- TAB -->


                    <!-- DOCUMENT DETAIL -->
                    <div v-if="tab == 'details'" class="flex">



                    </div>

                    <div v-else-if="tab == 'approval'">

                      <div class="flex justify-start">

                        <div class="flex flex-col items-center">
                          <img :src="miniABM" class="h-[60px] w-60" />
                          <h1 class="text-2xl font-medium leading-7">Approval</h1>
                        </div>

                      </div>

                      <div class="flex justify-center">

                        <div class="py-12 px-4">

                          <multiStepCircleVertical 
                            :image="userImg" v-for="(data, index) in approvalStatusData" 
                            :key="index" 
                            :data="data.text" 
                            :stop="index+1 === approvalStatusData.length ? true : false" 
                            :any="data" 
                          />

                        </div>

                        <div>

                        </div>

                      </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
    <Footer />
</template>