<script setup>
    import chevronIcon from '@/assets/chevron-white-medium.png'
    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
</script>

<template>
    <div class="fixed top-0 bottom-0 left-[32px] bg-red-star z-50">
        <div class="fixed top-[155px] w-[32px] h-[32px] bg-blue rounded-full sm:flex justify-center items-center hidden cursor-pointer ease-in-out duration-500"
          :class="sidebar.isWide === true ? 'left-[244px]' : 'left-[84px]'"
            @click="sidebar.changeWide">
            <img :src="chevronIcon" class="w-3 h-3" alt="">
        </div>
    </div>
</template>