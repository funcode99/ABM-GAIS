<script setup>
     import { useSidebarStore } from "@/stores/sidebar.js"
     const sidebar = useSidebarStore()
</script>

<template>
  <div
    class="text-center text-[12px] leading-[24px] text-[#9e9e9e] py-[12px] px-[16px] bg-white w-full font-JakartaSans font-medium flex items-center justify-center fixed bottom-0 zInfinite"
  >
    <h1 class="duration-500 ease-in-out" :class="[
    $route.path === '/' ? '' : sidebar.isWide === true ? 'ml-[160px]' : ''
    ]"
    >
      © PT SINERGI INFORMATIKA SEMEN INDONESIA - 2023
    </h1>
  </div>
</template>

<style>
    .zInfinite {
      z-index: 50 !important;
    }
</style>