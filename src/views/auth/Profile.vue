<script setup>
    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import profileImage from '@/assets/profile-image.png'
</script>

<template>

    <div class="flex flex-col basis-full grow-0 shrink-0 w-full h-full this font-JakartaSans">
        <Navbar />
    
        <div class="flex w-screen mt-[115px]">

            <Sidebar class="flex-none fixed" />
    
            <div class="bg-[#e4e4e6] py-5 px-[5%] width ml-[260px] ">
                <div class="bg-white h-full rounded-lg p-8">
                    <div class="flex flex-col items-center">
                        <h1 class="font-semibold" text-base>My Profile</h1>
                        <div class="mt-3">
                            <img :src=profileImage class="bg-[#015289] w-[150px] h-[150px] rounded-full" alt="">
                        </div>
                        <div class="w-full px-4 font-semibold">
                            <h1>Details</h1>
                            <hr class="border-2 border-black w-full">
                        </div>
                        <div class="my-8 width px-4">
                            <div class="flex justify-around mb-3">
                                <div class="flex flex-col">
                                    <span>Name*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                                <div class="flex flex-col">
                                    <span>Phone Number*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                            </div>
                            <div class="flex justify-around">
                                <div class="flex flex-col">
                                    <span>SN*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                                <div class="flex flex-col">
                                    <span>Email*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                            </div>
                            <div class="flex justify-around mt-12 mb-3">
                                <div class="flex flex-col">
                                    <span>DOB*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                                <div class="flex flex-col">
                                    <span>Location*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                            </div>
                            <div class="flex justify-around">
                                <div class="flex flex-col">
                                    <span>Gender*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                                <div class="flex flex-col">
                                    <span>Company*</span>
                                    <input type="text" class="border-2 border-black rounded-lg lg:px-4 lg:py-3 md:px-3 md:py-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer class="fixed bottom-0 left-0 right-0" />

        </div>
       
    </div>

</template>

<style>

    .this {
        overflow-x: hidden;
    }

    .width {
        width: calc(100vw - 260px);
    }

    .height {
        height: calc(100vh - 163px);
    }

</style>