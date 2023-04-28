<script setup>
import { ref } from "vue";

import dashboardIcon from "@/assets/dashboard-icon.png";
import travelManagementSystemIcon from "@/assets/travel-management-system-icon.png";
import travelManagementSystemSelected from "@/assets/travel-management-system-selected.png";
import systemConfigurationIcon from "@/assets/system-configuration-not-selected.png";
import systemConfigurationIconSelected from "@/assets/system-configuration-selected.png";
import referenceIcon from "@/assets/reference.png";
import referenceIconSelected from "@/assets/reference-selected.png";
import submenuLine from "@/assets/submenu-line.png";
import submenuLineSelected from "@/assets/submenu-line-selected.png";
import submenuInner from "@/assets/inner-sub-menu.png";

import searchIcon from "@/assets/Icons.png";
import expandArrow from "@/assets/ExpandArrow.png";
import groupIcon from "@/assets/Group.png";

// harus pake ekstensi kalo enggak gak bakal kebaca
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const searchSidebarValue = ref("");

// masukkin params ke actions harus pake variable ga boleh pake primitive data langsung
let system = "systemConfiguration";
let reference = "reference";
let travel = "travelManagementSystem";
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
    class="mt-[115px] hidden sm:flex sm:flex-col w-[100px] sm:w-[260px] fixed top-0 bottom-0 overflow-y-auto scroller bg-white zInfinite font-JakartaSans"
  >
    <!-- <div class="flex justify-center h-32 py-2"> 
        <img :src=ABMIcon class="w-[114px] h-[86px]" alt="">
      </div> -->

    <!-- sidebar search -->
    <div class="sm:flex sm:items-center ml-6 pt-7 hidden">
      <div
        class="rounded-l-2xl flex justify-center items-center bg-[#f5f5f5] h-10 pl-1"
      >
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
          <button
            @click="sidebar.increment(travel)"
            class="rounded-lg flex sm:justify-between items-center gap-4 text-left p-4"
            :class="
              sidebar.sidebarMenu.travelManagementSystem == true
                ? 'text-white bg-[#015289]'
                : ''
            "
          >
            <div class="flex justify-between w-full items-center">
              <div class="flex gap-4 items-center">
                <img
                  :src="travelManagementSystemIcon"
                  class="w-6 h-6 rounded-lg"
                  :class="
                    sidebar.sidebarMenu.travelManagementSystem === true
                      ? 'hidden'
                      : 'block'
                  "
                  alt=""
                />
                <img
                  :src="travelManagementSystemSelected"
                  class="w-6 h-6 rounded-lg"
                  :class="
                    sidebar.sidebarMenu.travelManagementSystem === false
                      ? 'hidden'
                      : 'block'
                  "
                  alt=""
                />
                <h3 class="hidden sm:block text-left">
                  Travel Management System
                </h3>
              </div>

              <div class="hidden sm:block">
                <img :src="expandArrow" class="w-5 h-5" />
              </div>
            </div>
          </button>

          <div
            v-if="sidebar.sidebarMenu.travelManagementSystem === true"
            class="pl-4 pb-4 sm:flex sm:flex-col hidden"
          >
            <ul class="flex flex-col gap-4 pt-4 px-2">
              <router-link to="/request" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/request' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/request' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/request'
                        ? `anchorImage anchorSubMenu`
                        : '',
                    ]"
                  >
                    Request Trip <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>

              <router-link to="/role" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/role' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/role' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/role' ? `anchorImage anchorSubMenu` : '',
                    ]"
                  >
                    Settlement <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>

              <router-link to="/menu" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/menu' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/menu' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/menu' ? `anchorImage anchorSubMenu` : '',
                    ]"
                  >
                    Claim Reimbursement
                    <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>

              <button class="cursor-pointer text-left">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <!-- <img class="h-[2px] w-2" :class="[$route.path == '/request' ? 'hidden' : 'inline']" :src=submenuLine alt="">
                  <img class="h-[2px] w-2" :class="[$route.path == '/request' ? 'inline' : 'hidden']" :src=submenuLineSelected alt=""> -->
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/cash' ? `anchorImage anchorSubMenu` : '',
                    ]"
                  >
                    Cash Advance <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
                <div class="ml-5 mt-[10px]">
                  <ul class="flex flex-col gap-[10px] text-base font-normal">
                    <router-link to="/cashadvancetravel" class="cursor-pointer">
                      <li class="flex gap-[10px] items-center">
                        <img :src="submenuInner" alt="" class="w-2 h-2" />
                        Travel
                      </li>
                    </router-link>
                    <router-link
                      to="/cashadvancenontravel"
                      class="cursor-pointer"
                    >
                      <li class="flex gap-[10px] items-center">
                        <img :src="submenuInner" alt="" class="w-2 h-2" />
                        Non Travel
                      </li>
                    </router-link>
                  </ul>
                </div>
              </button>
            </ul>
          </div>
        </li>

        <li>
          <button
            @click="sidebar.increment(system)"
            class="rounded-lg flex sm:justify-between items-center gap-4 text-left p-4"
            :class="
              sidebar.sidebarMenu.systemConfiguration == true
                ? 'text-white bg-[#015289]'
                : ''
            "
          >
            <div class="flex justify-between w-full items-center">
              <div class="flex gap-4 items-center">
                <img
                  :src="systemConfigurationIcon"
                  class="w-6 h-6 rounded-lg"
                  :class="
                    sidebar.sidebarMenu.systemConfiguration == true
                      ? 'hidden'
                      : 'block'
                  "
                  alt=""
                />
                <img
                  :src="systemConfigurationIconSelected"
                  class="w-6 h-6 rounded-lg"
                  :class="
                    sidebar.sidebarMenu.systemConfiguration == false
                      ? 'hidden'
                      : 'block'
                  "
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
              <router-link to="/user" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/user' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/user' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/user' ? `anchorImage anchorSubMenu` : '',
                    ]"
                  >
                    User <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>
              <router-link to="/role" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/role' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/role' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/role' ? `anchorImage anchorSubMenu` : '',
                    ]"
                  >
                    Role <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>
              <router-link to="/menu" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/menu' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/menu' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/menu' ? `anchorImage anchorSubMenu` : '',
                    ]"
                  >
                    Menu <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>
              <router-link to="/approval" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/approval' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/approval' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/approval'
                        ? `anchorImage anchorSubMenu`
                        : '',
                    ]"
                  >
                    Approval <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>
              <router-link to="/sequence" class="cursor-pointer">
                <div class="flex gap-[10px] items-center cursor-pointer">
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/sequence' ? 'hidden' : 'inline']"
                    :src="submenuLine"
                    alt=""
                  />
                  <img
                    class="h-[2px] w-2"
                    :class="[$route.path == '/sequence' ? 'inline' : 'hidden']"
                    :src="submenuLineSelected"
                    alt=""
                  />
                  <a
                    href="#"
                    class="flex items-center w-full justify-between"
                    :class="[
                      $route.path == '/sequence'
                        ? `anchorImage anchorSubMenu`
                        : '',
                    ]"
                  >
                    Sequence <img class="w-5 h-5" :src="groupIcon" alt="" />
                  </a>
                </div>
              </router-link>
            </ul>
          </div>
        </li>

        <li>
          <button
            @click="sidebar.increment(reference)"
            class="w-full rounded-lg flex gap-4 text-left p-4"
            :class="
              sidebar.sidebarMenu.reference == true
                ? 'text-white bg-[#015289]'
                : ''
            "
          >
            <div class="flex justify-between w-full">
              <div class="flex gap-4">
                <img
                  :src="referenceIconSelected"
                  :class="
                    sidebar.sidebarMenu.reference == false ? 'hidden' : 'block'
                  "
                  alt=""
                  class="w-6 h-6 rounded-lg"
                />
                <img
                  :src="referenceIcon"
                  class="w-6 h-6 rounded-lg"
                  :class="
                    sidebar.sidebarMenu.reference == true ? 'hidden' : 'block'
                  "
                  alt=""
                />
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
            <router-link to="/employee" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/employee' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/employee' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/employee'
                      ? `anchorImage anchorSubMenu`
                      : '',
                  ]"
                >
                  Employee <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/company" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/company' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/company' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/company'
                      ? `anchorImage anchorSubMenu`
                      : '',
                  ]"
                >
                  Company <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/departement" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/departement' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/departement' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/departement'
                      ? `anchorImage anchorSubMenu`
                      : '',
                  ]"
                >
                  Department <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/flight" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/flight' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/flight' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/flight' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Flight Class<img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/currency" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/currency' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/currency' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/currency'
                      ? `anchorImage anchorSubMenu`
                      : '',
                  ]"
                >
                  Currency <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/pagu" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/pagu' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/pagu' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/pagu' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Pagu <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/reimbursement" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[
                    $route.path == '/reimbursement' ? 'hidden' : 'inline',
                  ]"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[
                    $route.path == '/reimbursement' ? 'inline' : 'hidden',
                  ]"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/reimbursement'
                      ? `anchorImage anchorSubMenu`
                      : '',
                  ]"
                >
                  Reimbursement <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/zona" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/zona' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/zona' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/zona' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Zona <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/job" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/job' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/job' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/job' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Job <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/site" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/site' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/site' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/site' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Site <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/brand" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/brand' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/brand' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/brand' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Brand <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/uom" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/uom' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/uom' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/uom' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  UOM <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/warehouse" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/warehouse' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/warehouse' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/warehouse'
                      ? `anchorImage anchorSubMenu`
                      : '',
                  ]"
                >
                  Warehouse <img class="w-5 h-5" :src="groupIcon" alt="" />
                </a>
              </div>
            </router-link>
            <router-link to="/car" class="cursor-pointer">
              <div class="flex gap-[10px] items-center cursor-pointer">
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/car' ? 'hidden' : 'inline']"
                  :src="submenuLine"
                  alt=""
                />
                <img
                  class="h-[2px] w-2"
                  :class="[$route.path == '/car' ? 'inline' : 'hidden']"
                  :src="submenuLineSelected"
                  alt=""
                />
                <a
                  href="#"
                  class="flex items-center w-full justify-between"
                  :class="[
                    $route.path == '/car' ? `anchorImage anchorSubMenu` : '',
                  ]"
                >
                  Car <img class="w-5 h-5" :src="groupIcon" alt="" />
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

.anchorImage img {
  visibility: visible;
}

.anchorSubMenu {
  color: #015289;
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
