<script setup>
    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'
</script>

<template>
    <div class="flex flex-col basis-full grow-0 shrink-0 w-full h-full this font-JakartaSans">
        <Navbar />
        <div class="flex w-screen mt-[115px]">
            <Sidebar class="flex-none fixed" />
            <div class="bg-[#e4e4e6] py-5 px-8 w-screen height sm:ml-[100px] md:ml-[260px]">
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
                        <button class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0]">Details</button>
                        <button class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0]">TLK Info</button>
                    </div>
                    <div>

                    </div>
                    <div>
                        <h1>TLK</h1>
                        <hr>
                        <div class="flex flex-col">
                            <span>Requestor <span class="text-red-star">*</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.height {
    min-height: calc(100vh - 115px);
}
</style>