<script setup>
import { ref, reactive, onBeforeMount } from "vue";

import dashboardIcon from "@/assets/dashboard-icon.png";
import travelManagementSystemIcon from "@/assets/travel-management-system-icon.png"
import travelManagementSystemSelected from '@/assets/travel-management-system-selected.png'
import systemConfigurationIcon from "@/assets/system-configuration-not-selected.png"
import systemConfigurationIconSelected from '@/assets/system-configuration-selected.png'
import referenceIcon from "@/assets/reference.png";
import referenceIconSelected from '@/assets/reference-selected.png'
import submenuLine from '@/assets/submenu-line.png'
import submenuInner from '@/assets/inner-sub-menu.png'

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
let travel = 'travelManagementSystem'

</script>

<template>
  <!-- <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-start justify-start"></div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-100 text-base-content border">
      </ul>
    </div>
  </div> -->

  <!-- fixed -->
  <div
    class="mt-[115px] hidden sm:flex sm:flex-col w-[100px] sm:w-[260px] fixed top-0 bottom-0 overflow-y-auto scroller bg-white zInfinite"
  >

    <!-- <div class="flex justify-center h-32 py-2"> 
        <img :src=ABMIcon class="w-[114px] h-[86px]" alt="">
      </div> -->

    <!-- sidebar search -->
    <div class="sm:flex sm:items-center ml-6 pt-7 hidden">
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
            <a class="hidden sm:block">Dashboards</a>
          </router-link>
        </li>

        <li>
          
          <button @click= sidebar.increment(travel) class="rounded-lg flex sm:justify-between items-center gap-4 text-left p-4"
          :class="sidebar.sidebarMenu.travelManagementSystem == true ? 'text-white bg-[#015289]' : ''"
          >
            <div class="flex justify-between w-full items-center">
              
              <div class="flex gap-4 items-center">
                <img
              :src="travelManagementSystemIcon"
              class="w-6 h-6 rounded-lg"
              :class="sidebar.sidebarMenu.travelManagementSystem === true ? 'hidden' : 'block'"
              alt=""
                />
                <img
              :src="travelManagementSystemSelected"
              class="w-6 h-6 rounded-lg"
              :class="sidebar.sidebarMenu.travelManagementSystem === false ? 'hidden' : 'block'"
              alt=""
                />
                <h3 class="hidden sm:block text-left">Travel Management System</h3>
              </div>

              <div class="hidden sm:block">
                <img :src="expandArrow" class="w-5 h-5" />
              </div>

            </div>

          </button>
         
          <div
            v-if="sidebar.sidebarMenu.travelManagementSystem === true"
            class="pl-4 pb-4 sm:flex sm:flex-col hidden">
            <ul class="flex flex-col gap-4 pt-4 px-2">

              <router-link to="/request" class="cursor-pointer"
                >
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img class="h-[2px] w-2" :src=submenuLine alt="">
                  <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                    Request Trip <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>

              <router-link to="/role" class="cursor-pointer"
                >
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img class="h-[2px] w-2" :src=submenuLine alt="">
                  <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                    Settlement <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>

              <router-link to="/menu" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img class="h-[2px] w-2" :src=submenuLine alt="">
                  <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                    Claim Reimbursement <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>

              <button class="cursor-pointer text-left"
                >
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img class="h-[2px] w-2" :src=submenuLine alt="">
                  <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                    Cash Advance <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
                <div class="ml-5 mt-[10px]">
                  <ul class="flex flex-col gap-[10px] text-base font-normal">
                    <li class="flex gap-[10px] items-center"><img :src=submenuInner alt="" class="w-2 h-2"> Travel</li>
                    <li class="flex gap-[10px] items-center"><img :src=submenuInner alt="" class="w-2 h-2"> Non Travel</li>
                  </ul>
                </div>
              </button>

            </ul>
          </div>

        </li>

        <li>

          <button @click= sidebar.increment(system) class="rounded-lg flex sm:justify-between items-center gap-4 text-left p-4"
          :class="sidebar.sidebarMenu.systemConfiguration == true ? 'text-white bg-[#015289]' : ''"
          >
          <div class="flex justify-between w-full items-center">
            <div class="flex gap-4 items-center">
              <img
            :src="systemConfigurationIcon"
            class="w-6 h-6 rounded-lg"
            :class="sidebar.sidebarMenu.systemConfiguration == true ? 'hidden' : 'block'"
            alt=""
              />
              <img
            :src="systemConfigurationIconSelected"
            class="w-6 h-6 rounded-lg"
            :class="sidebar.sidebarMenu.systemConfiguration == false ? 'hidden' : 'block'"
            alt=""
              />
              <h3 class="hidden sm:block">System Configuration</h3>
            </div>  
            <div class="hidden sm:block">
              <img :src="expandArrow" class="w-5 h-5" />
            </div>
          </div>
          </button>
         
          <div
          v-if="sidebar.sidebarMenu.systemConfiguration == true"
          class="pl-4 pb-4 sm:flex sm:flex-col hidden"
        >
          <ul class="flex flex-col gap-4 pt-4 px-2">
            <router-link to="/user" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  User <img class="w-5 h-5" :src="groupIcon" alt=""  />
                </a>
              </div>
            </router-link>
            <router-link to="/role" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Role <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/menu" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Menu <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/approval" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Approval <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/sequence" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Sequence <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
          </ul>
          </div>

        </li>

        <li>
          <button @click="sidebar.increment(reference)" class="w-full rounded-lg flex gap-4 text-left p-4" :class="sidebar.sidebarMenu.reference == true ? 'text-white bg-[#015289]' : ''">
            <div class="flex justify-between w-full">
              <div class='flex gap-4'>
                <img :src="referenceIconSelected" :class="sidebar.sidebarMenu.reference == false ? 'hidden' : 'block'" alt="" class="w-6 h-6 rounded-lg" />
                <img :src="referenceIcon" class="w-6 h-6 rounded-lg" :class="sidebar.sidebarMenu.reference == true ? 'hidden' : 'block'" alt="" />
                <h3 class="hidden sm:block">Reference</h3>
              </div>
              <div class="hidden sm:block">
                <img :src="expandArrow" class="w-5 h-5" />
              </div>
            </div>
          </button>
        </li>
          
          <div
          v-if="sidebar.sidebarMenu.reference == true"
            class="pl-4 pb-4 sm:flex sm:flex-col hidden overflow-y-auto"
          >
            <ul class="flex flex-col gap-4 pt-4 px-2">
              <router-link to="/employee" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Employee <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/company" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Company <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/departement" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Department <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/flight" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Flight <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/pagu" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Pagu <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/reimbursement" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Reimbursement <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/zona" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Zona <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/job" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Job <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/site" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Site <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/brand" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Brand <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/uom" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  UOM <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/warehouse" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Warehouse <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/car" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Car <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
              <router-link to="/currency" class="cursor-pointer"
              >
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img class="h-[2px] w-2" :src=submenuLine alt="">
                <a href='#' class="flex items-center w-full justify-between anchorImage anchorSubMenu" >
                  Currency <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
              </router-link>
            </ul>
          </div>

        

      </ul>

    </div>

  </div>
</template>

<style scoped>
.anchorMenu:focus {
  background-color: #015289;
  color: white;
}

/* .buttonMenu:focus {
  background-color: #015289;
  color: white;
} */

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
