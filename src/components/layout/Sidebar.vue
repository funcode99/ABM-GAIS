<script setup>
import { ref, reactive, onBeforeMount } from "vue";

import dashboardIcon from "@/assets/dashboard-icon.png";
import travelManagementSystemIcon from "@/assets/travel-management-system-icon.png";
import systemConfigurationIcon from "@/assets/system-configuration.png";
import referenceIcon from "@/assets/reference.png";

import ABMIcon from "@/assets/abm.png";
import searchIcon from "@/assets/Icons.png";
import expandArrow from "@/assets/ExpandArrow.png";
import groupIcon from "@/assets/Group.png";

// harus pake ekstensi kalo enggak gak bakal kebaca
import { useSidebarStore } from '@/stores/sidebar.js'

const sidebar = useSidebarStore()
const searchSidebarValue = ref('')
// masukkin params ke actions harus pake variable ga boleh pake primitive data langsung
let system = 'systemConfiguration'
let reference = 'reference'

// const searchSidebar = (value) => {

//   let input = document.getElementById("mySearch")
//   let filter = input.value.toUpperCase()
//   let filter2 = searchSidebarValue.value.toUpperCase()
//   let ul = document.getElementById("myMenu")
//   let li = ul.getElementsByTagName("li")

//   for (let i = 0; i < li.length; i++) {
//     let a = li[i].getElementsByTagName("a")[0];
//     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }



// }

const sidebarAccordion = reactive({
  systemConfiguration: false,
  reference: false,
});

const changeAccordion = (section) => {
  if (section == "reference" && sidebarAccordion.reference == true) {
    sidebarAccordion.reference = false;
    sessionStorage.setItem('reference', false)
  } else if (
    section == "system" &&
    sidebarAccordion.systemConfiguration == true) {
    sidebarAccordion.systemConfiguration = false;
    sessionStorage.setItem('system-configuration', false)
  } else if (section == "reference") {
    sidebarAccordion.systemConfiguration = false;
    sidebarAccordion.reference = true;
    sessionStorage.setItem('system-configuration', false)
    sessionStorage.setItem('reference', true)
  } else if (section == "system") {
    sidebarAccordion.systemConfiguration = true;
    sidebarAccordion.reference = false;
    sessionStorage.setItem('system-configuration', true)
    sessionStorage.setItem('reference', false)
  }
}
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

  <!-- fixed -->
  <div
    class="mt-[115px] hidden sm:flex sm:flex-col w-[100px] md:w-[260px] fixed top-0 bottom-0 overflow-y-auto scroller bg-white zInfinite"
  >

    <!-- <div class="flex justify-center h-32 py-2"> 
        <img :src=ABMIcon class="w-[114px] h-[86px]" alt="">
      </div> -->

    <!-- sidebar search -->
    <div class="md:flex md:items-center ml-6 pt-7 hidden">
      <div class="rounded-l-2xl flex justify-center items-center bg-[#f5f5f5] h-10 pl-1">
        <img :src="searchIcon" alt="search" class="w-5 h-5" />
      </div>
      <input
        type="text"
        class="rounded-r-2xl bg-[#f5f5f5] h-10 pl-2 outline-none"
        placeholder="Search..."
        v-model="searchSidebarValue"
        @keyup="searchSidebar(searchSidebarValue)"
      />
    </div>

    <div class="px-4 flex flex-col pt-3">
      <ul id="myMenu">
        <li>
          <router-link
        to="/dashboard"
        href="#"
        class="flex items-center gap-4 p-4 rounded-lg anchorMenu"
      >
        <img :src="dashboardIcon" class="w-6 h-6" alt="" />
        <a class="hidden md:block">Dashboards</a>
          </router-link>
        </li>
        <li>
          <router-link
        to="/"
        href="#"
        class="flex items-center gap-4 p-4 rounded-lg anchorMenu"
      >
        <img :src="travelManagementSystemIcon" class="w-6 h-6" alt="" />
        <a class="hidden md:block">Travel Management System</a>
          </router-link>
        </li>
        <li>
          <!-- @click="changeAccordion('system')" -->
          <button
          @click= sidebar.increment(system)
          class="rounded-lg flex md:justify-between items-center gap-4 text-left p-4 buttonMenu" >
        <div class="flex gap-4">
          <img
            :src="systemConfigurationIcon"
            class="w-6 h-6 rounded-lg"
            alt=""
          />
          <h3 class="hidden md:block">System Configuration</h3>
          <div class="hidden md:inline">
            <img :src="expandArrow" class="w-5 h-5" />
          </div>
        </div>
          </button>
            <div
          v-if="sidebar.reference == true"
          class="pl-4 pb-4 sm:flex sm:flex-col hidden"
        >
          <ul class="flex flex-col gap-4 pt-4 px-2">
            <router-link to="/user" class="cursor-pointer"
              >
            </router-link>
            <a href="#currency" class="flex items-center justify-between anchorImage anchorSubMenu" >
              User <img class="w-5 h-5" :src="groupIcon" alt="" />
            </a>
            <router-link to="/role" class="cursor-pointer"
              ><a
                href="#"
                class="flex items-center justify-between anchorImage anchorSubMenu"
                >Role <img class="w-5 h-5" :src="groupIcon" alt="" /></a
            >
            </router-link>
            <router-link to="/menu" class="cursor-pointer"
              ><a
                href="#"
                class="flex items-center justify-between anchorImage anchorSubMenu"
                >Menu <img class="w-5 h-5" :src="groupIcon" alt="" /></a
            ></router-link>
            <router-link to="/approval" class="cursor-pointer"
              ><a
                href="#"
                class="flex items-center justify-between anchorImage anchorSubMenu"
                >Approval <img class="w-5 h-5" :src="groupIcon" alt="" /></a
            ></router-link>
            <router-link to="/sequence" class="cursor-pointer"
              ><a
                href="#"
                class="flex items-center justify-between anchorImage anchorSubMenu"
                >Sequence <img class="w-5 h-5" :src="groupIcon" alt="" /></a
            ></router-link>
          </ul>
            </div>
        </li>
        <li>
          <button
        @click="sidebar.increment(reference)"
        class="rounded-lg flex md:justify-between p-4 buttonMenu"
      >
        <div class="flex gap-4">
          <img :src="referenceIcon" class="w-6 h-6 rounded-lg" alt="" />
          <h3 class="hidden md:block">Reference</h3>
        </div>
        <div class="hidden md:inline">
          <img :src="expandArrow" class="w-5 h-5" />
        </div>
          </button>
          <div
          v-if="sidebar.systemConfiguration == true"
            class="pl-4 pb-4 sm:flex sm:flex-col hidden overflow-y-auto"
          >
            <ul class="flex flex-col gap-4 pt-4 px-2">
              <router-link to="/employee" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Employee <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/company" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Company <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/departement" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Departement <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/flight" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Flight Entitlement
                  <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/pagu" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Pagu & Meals<img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/reimbursement" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Reimbursement Type
                  <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/zona" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Zona & TLK <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/job" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Job Band <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/site" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Site <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/brand" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Brand <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/uom" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >UOM <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/warehouse" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Warehouse <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/car" class="cursor-pointer"
                ><a
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Car <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
              <router-link to="/currency" class="cursor-pointer"
                ><a
                  id="currency"
                  href="#"
                  class="flex items-center justify-between anchorImage anchorSubMenu"
                  >Currency <img class="w-5 h-5" :src="groupIcon" alt="" /></a
              ></router-link>
            </ul>
            </div>
        </li>
      </ul>
      <!-- <ul>
        <li></li>
      </ul> -->

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

.background-white {
  background-color: white;
}

.zInfinite {
  z-index: 999;
}
</style>
