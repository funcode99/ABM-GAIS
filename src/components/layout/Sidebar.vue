<script setup>

import { ref } from 'vue'

import dashboardIcon from '@/assets/dashboard-icon.png'
import travelManagementSystemIcon from '@/assets/travel-management-system-icon.png'
import systemConfigurationIcon from '@/assets/system-configuration.png'
import referenceIcon from '@/assets/reference.png'

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

  <div class="flex flex-col w-[260px] h-screen overflow-y-auto scroller">

    <div class="flex justify-center h-32 py-2">
      <img :src=ABMIcon class="w-[114px] h-[86px]" alt="">
    </div>
    
      <div class="flex items-center px-4">
        <div class="rounded-l-2xl flex justify-center items-center bg-[#f5f5f5] h-10 pl-1">
          <img :src=searchIcon alt="" class="w-full h-5">
        </div>
        <input type="text" class="rounded-r-2xl bg-[#f5f5f5] h-10 pl-2 outline-none" placeholder="Search...">
      </div>
    
    <div class="px-4 flex flex-col pt-4">
      
        <a href="#" class="flex items-center gap-4 p-4 rounded-lg anchorMenu">
          <img :src=dashboardIcon class="w-6 h-6" alt="">
          Dashboards
        </a>
          
        <a href="#" class="flex items-center gap-4 p-4 rounded-lg anchorMenu">
          <img :src=travelManagementSystemIcon class="w-6 h-6" alt=""> 
          Travel Management System
        </a>
    
      <button @click="isOpenSystemConfiguration = !isOpenSystemConfiguration" class="rounded-lg flex items-center gap-4 text-left p-4 buttonMenu">
        <img :src=systemConfigurationIcon class="w-6 h-6" alt=""> 
        System Configuration 
        <img :src=expandArrow class="w-5 h-5">
      </button>
      <div v-if="isOpenSystemConfiguration" class="pl-4 pb-4 flex flex-col">
          <ul class="flex flex-col gap-4 pt-4 px-2">
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">User <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Role <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Menu <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Approval <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Sequence <img class="w-5 h-5" :src=groupIcon alt=""></a></li>
          </ul>
      </div>

      <button @click="isOpenReference = !isOpenReference" class="rounded-lg flex justify-between p-4 buttonMenu">
        <div class="flex gap-4">
          <img :src=referenceIcon class="w-6 h-6 rounded-lg" alt=""> 
          Reference 
        </div>
        <img :src=expandArrow class="w-5 h-5">
      </button>
      <div v-if="isOpenReference" class="pl-4 pb-4 flex flex-col">
          <ul class="flex flex-col gap-4 pt-4 px-2">
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Karyawan <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Company <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Department <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Flight Entitlement <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Hotel Fare <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Reimbursement Type <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Pagu <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
            <li class="cursor-pointer"><a href="#" class="flex items-center justify-between anchorImage anchorSubMenu">Job Band <img class=" w-5 h-5" :src=groupIcon alt=""></a></li>
          </ul>
      </div>

    </div>

  </div>

</template>

<style scoped>

  .anchorMenu:focus {
    background-color: #015289;
    color: white;
  }

  .buttonMenu:focus {
    background-color: #015289;
    color: white;
  }
  
  .anchorSubMenu:focus {
      color: #015289;
  }

  .anchorImage img {
      visibility: hidden;
  }
  
  .anchorImage:focus img { 
    visibility: visible;
  }

  .scroller {
    scrollbar-width: thin;
  }

</style>