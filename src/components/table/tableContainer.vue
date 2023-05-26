<script setup>
    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
</script>

<template>
    <div class="bg-[#e4e4e6] pb-16 pt-5 px-8 w-screen clean-margin ease-in-out duration-500"
    :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
    >
        <slot></slot>
    </div>
</template>