<script setup>

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
  <div class="flex flex-col w-[260px] h-screen">
    <div class="flex justify-center py-6">
      <img :src=ABMIcon class="w-20 h-20" alt="">
    </div>
  </div>
</template>
