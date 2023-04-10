<script setup>

import { ref } from 'vue'

// import NavItems from "./NavItems.vue";

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", children: [], icon: null },
//   { href: "/inbox", label: "Inbox / Notifications", children: [], icon: null },
//   {
//     href: "#",
//     label: "Travel Management System",
//     children: [
//       { href: "#", label: "Request Trip", children: [], icon: null },
//       { href: "#", label: "Settlement", children: [], icon: null },
//       { href: "#", label: "Claim Reimbusement", children: [], icon: null },
//       {
//         href: "#",
//         label: "Cash Advance",
//         children: [
//           { href: "#", label: "Cash Advance Travel", children: [], icon: null },
//           {
//             href: "#",
//             label: "Cash Advance Non Travel",
//             children: [],
//             icon: null,
//           },
//         ],
//         icon: null,
//       },
//     ],
//     icon: null,
//   },

//   {
//     href: "#",
//     label: "Facility Service System",
//     children: [
//       { href: "#", label: "Meeting Room", children: [], icon: null },
//       { href: "#", label: "ATK Request", children: [], icon: null },
//       { href: "#", label: "Document Delivery", children: [], icon: null },
//     ],
//   },
// ];
import ABMIcon from '@/assets/abm.png'
import searchIcon from '@/assets/Icons.png'
import expandArrow from '@/assets/ExpandArrow.png'
import groupIcon from '@/assets/Group.png'

const isOpenSystemConfiguration = ref(false)
const isOpenReference = ref(false)

</script>

<template>
  <!-- <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-start justify-start"></div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-100 text-base-content border">
        <NavItems :item="item" v-for="item in navItems" :key="item.label" />
      </ul>
    </div>
  </div> -->
  <div class="flex flex-col w-[260px] h-screen overflow-y-scroll">

    <div class="flex justify-center py-6">
      <img :src=ABMIcon class="w-20 h-20" alt="">
    </div>
    
      <div class="flex items-center px-4">
        <div class="rounded-l-2xl flex justify-center items-center bg-[#f5f5f5] h-10 pl-1">
          <img :src=searchIcon alt="" class="w-full h-5">
        </div>
        <input type="text" class="rounded-r-2xl bg-[#f5f5f5] h-10 pl-2 outline-none" placeholder="Search...">
      </div>
    
    <div class="px-4 flex flex-col pt-4">
      
      <a href="#" class="p-4 rounded-lg">
        Dashboards
      </a>
      
      <a href="#" class="p-4 rounded-lg">
        Travel Management System
      </a>
    
      <button @click="isOpenSystemConfiguration = !isOpenSystemConfiguration" class="rounded-lg flex items-center p-4">System Configuration <img :src=expandArrow class="w-5 h-5"></button>
      <div v-if="isOpenSystemConfiguration" class="pl-4 pb-4 flex flex-col">
          <ul class="flex flex-col gap-4 pt-4 px-2">
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Meeting Room <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">ATK Request <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Document Delivery <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
          </ul>
      </div>

      <button @click="isOpenReference = !isOpenReference" class="rounded-lg flex items-center p-4">Reference <img :src=expandArrow class="w-5 h-5"></button>
      <div v-if="isOpenReference" class="pl-4 pb-4 flex flex-col">
          <ul class="flex flex-col gap-4 pt-4 px-2">
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Karyawan <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Company <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Department <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Flight Entitlement <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Hotel Fare <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Reimbursement Type <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Pagu <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between">Job Band <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
          </ul>
      </div>

    </div>

  </div>





</template>

<style scoped>

  a:focus {
    background-color: royalblue;
    color: white;
  }

  button:focus {
    background-color: royalblue;
    color: white;
  }

  ul li a img {
    visibility: hidden;
  }

  /* .image li:focus a img { 
    visibility: visible;
  } */

</style>