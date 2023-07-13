<script setup>
import { onMounted, ref } from "vue";

import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";

import dashboardIcon from "@/assets/dashboard-icon.png";
import travelManagementSystemIcon from "@/assets/travel-management-system-icon.png";
import travelManagementSystemSelected from "@/assets/travel-management-system-selected.png";
import systemConfigurationIcon from "@/assets/system-configuration-not-selected.png";
import systemConfigurationIconSelected from "@/assets/system-configuration-selected.png";
import referenceIcon from "@/assets/reference.png";
import referenceIconSelected from "@/assets/reference-selected.png";
import approvalIcon from "@/assets/approval.png";
import approvalSelected from "@/assets/approval-selected.png";
import submenuLine from "@/assets/submenu-line.png";
import submenuLineSelected from "@/assets/submenu-line-selected.png";
import submenuInner from "@/assets/inner-sub-menu.png";
import facilityIcon from "@/assets/facilityIcon.png";
import facilityIconSelected from "@/assets/facilityIconSelected.png";

import searchIcon from "@/assets/Icons.png";
import expandArrow from "@/assets/ExpandArrow.png";
import expandArrowSelected from "@/assets/expand-arrow-selected.png";
import groupIcon from "@/assets/Group.png";
import chevronIcon from "@/assets/chevron-white-medium.png";

// harus pake ekstensi kalo enggak gak bakal kebaca
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const searchSidebarValue = ref("");
const id_role = JSON.parse(localStorage.getItem("id_role"));

// masukkin params ke actions harus pake variable ga boleh pake primitive data langsung
let system = "systemConfiguration";
let reference = "reference";
let travel = "travelManagementSystem";
let approval = "approval";
let facility = "facilityServiceSystem";

onMounted(() => {
  // let scroller = window.document.querySelector(".scroller")
  // scroller.scrollTop = sidebar.scrollValue
  // scroller.addEventListener("scroll", () => {
  //   sidebar.scrollValue = Math.round(scroller.scrollTop)
  // })
});
</script>

<template>
  <!-- ga perlu pake class transition kalo mau pake transition di tailwind -->
  <div
    class="mt-[115px] hidden sm:flex sm:flex-col fixed top-0 bottom-0 overflow-y-auto bg-white zInfinite font-JakartaSans this ease-in-out duration-500"
    :class="sidebar.isWide === true ? 'w-[260px]' : 'w-[100px]'"
  >
    <!-- grow/shrink sidebar button -->
    <div
      class="fixed top-[155px] w-[32px] h-[32px] bg-blue rounded-full sm:flex justify-center items-center hidden cursor-pointer ease-in-out duration-500 z-Infinite"
      @click="sidebar.changeWide"
      :class="
        sidebar.isWide === true ? 'left-[240px]' : '-scale-x-100 left-[84px]'
      "
    >
      <img :src="chevronIcon" class="w-3 h-3" alt="" />
    </div>

    <!-- sidebar search -->
    <div
      class="ml-6 pt-7 flex"
      :class="sidebar.isWide === true ? '' : 'hidden'"
    >
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

    <!-- menu -->
    <div class="sidebar-wrapper mt-3">
      <div class="sidebar scroller">
        <div class="px-4 flex flex-col items-center">
          <ul id="myMenu" class="pb-20">
            <li>
              <div
                class="flex justify-center items-center cursor-pointer py-4"
                :class="sidebar.isWide === true ? 'hidden' : ''"
              >
                <img :src="searchIcon" alt="search" class="w-6 h-6" />
              </div>
            </li>

            <!-- dashboard -->
            <li>
              <router-link
                to="/dashboard"
                class="flex items-center gap-4 p-4 rounded-lg anchorMenu"
              >
                <img :src="dashboardIcon" class="w-6 h-6" alt="" />
                <!-- transition ga berlaku untuk teks / ngilangin objek -->
                <a :class="sidebar.isWide === true ? '' : 'hidden'"
                  >Dashboards</a
                >
              </router-link>
            </li>

            <!-- travel management -->
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
                    <h3
                      class="text-left"
                      :class="sidebar.isWide === true ? '' : 'hidden'"
                    >
                      Travel Management
                    </h3>
                  </div>

                  <!-- arrow transition for opening menu -->
                  <div class="relative">
                    <div
                      class="ease-in-out duration-500 absolute bottom-0"
                      :class="
                        sidebar.sidebarMenu.travelManagementSystem === false
                          ? ''
                          : '-rotate-180 opacity-0'
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrow"
                      />
                    </div>

                    <div
                      class="ease-in-out duration-500"
                      :class="
                        sidebar.sidebarMenu.travelManagementSystem === false
                          ? '-rotate-180 opacity-0'
                          : ''
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrowSelected"
                      />
                    </div>
                  </div>
                </div>
              </button>

              <div v-if="sidebar.isWide">
                <collapse-transition dimension="height" :duration="500">
                  <div
                    v-if="sidebar.sidebarMenu.travelManagementSystem === true"
                    class="pl-4 pb-4 sm:flex sm:flex-col hidden"
                  >
                    <ul class="flex flex-col gap-4 pt-4 px-2">
                      <router-link to="/request" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/request' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/request' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/request'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Request Trip
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <router-link to="/settlement" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/settlement'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/settlement'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/settlement'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Settlement
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <router-link
                        to="/claimreimbursement"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/claimreimbursement'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/claimreimbursement'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/claimreimbursement'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Claim Reimbursement
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/request' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/request' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/cash'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Cash Advance
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/cashadvancetravel"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-[70px]">Travel</p>
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                            <router-link
                              to="/cashadvancenontravel"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-10">Non Travel</p>
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'hidden' : 'inline']"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'inline' : 'hidden']"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <a
                            href="#"
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '#'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Pool Car
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </a>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              :to="{ name: 'PoolCarManagement' }"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-[70px]">Pool Car Management</p>
                              </li>
                            </router-link>
                            <router-link
                              :to="{ name: 'PoolCarRequest' }"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-10">Pool Car Request</p>
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'hidden' : 'inline']"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'inline' : 'hidden']"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <a
                            href="#"
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '#'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Report
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </a>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/settlement-report"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-[70px]">Settlement Report</p>
                              </li>
                            </router-link>
                            <router-link
                              to="/poolcar-report"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-10">Pool Car Usage Report</p>
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>
                    </ul>
                  </div>
                </collapse-transition>
              </div>
            </li>

            <!-- system configuration -->
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
                    <h3 :class="sidebar.isWide === true ? '' : 'hidden'">
                      System Configuration
                    </h3>
                  </div>

                  <!-- arrow transition for opening menu -->
                  <div class="relative">
                    <div
                      class="ease-in-out duration-500 absolute bottom-0"
                      :class="
                        sidebar.sidebarMenu.systemConfiguration === false
                          ? ''
                          : '-rotate-180 opacity-0'
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrow"
                      />
                    </div>

                    <div
                      class="ease-in-out duration-500"
                      :class="
                        sidebar.sidebarMenu.systemConfiguration === false
                          ? '-rotate-180 opacity-0'
                          : ''
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrowSelected"
                      />
                    </div>
                  </div>
                </div>
              </button>

              <div :class="sidebar.isWide === true ? '' : 'hidden'">
                <collapse-transition dimension="height" :duration="500">
                  <div
                    v-if="sidebar.sidebarMenu.systemConfiguration == true"
                    class="pl-4 pb-4 sm:flex sm:flex-col hidden"
                  >
                    <ul class="flex flex-col gap-4 pt-4 px-2">
                      <router-link to="/user" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/user' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/user' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/user'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            User <img class="w-5 h-5" :src="groupIcon" />
                          </p>
                        </div>
                      </router-link>
                      <router-link to="/role" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/role' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/role' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/role'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Role <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>
                      <router-link to="/menu" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/menu' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/menu' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/menu'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Menu <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>
                      <router-link to="/approval" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approval' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approval' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approval'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Approval
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>
                      <router-link to="/sequence" class="cursor-pointer">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/sequence' ? 'hidden' : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/sequence' ? 'inline' : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/sequence'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Sequence
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>
                    </ul>
                  </div>
                </collapse-transition>
              </div>
            </li>

            <!-- reference menu -->
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
                <div class="flex justify-between w-full items-center">
                  <div class="flex gap-4">
                    <img
                      :src="referenceIconSelected"
                      :class="
                        sidebar.sidebarMenu.reference == false
                          ? 'hidden'
                          : 'block'
                      "
                      alt=""
                      class="w-6 h-6 rounded-lg"
                    />
                    <img
                      :src="referenceIcon"
                      class="w-6 h-6 rounded-lg"
                      :class="
                        sidebar.sidebarMenu.reference == true
                          ? 'hidden'
                          : 'block'
                      "
                      alt=""
                    />
                    <h3 :class="sidebar.isWide === true ? '' : 'hidden'">
                      Reference
                    </h3>
                  </div>

                  <!-- arrow transition for opening menu -->
                  <div class="relative">
                    <div
                      class="ease-in-out duration-500 absolute bottom-0"
                      :class="
                        sidebar.sidebarMenu.reference === false
                          ? ''
                          : '-rotate-180 opacity-0'
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrow"
                      />
                    </div>

                    <div
                      class="ease-in-out duration-500"
                      :class="
                        sidebar.sidebarMenu.reference === false
                          ? '-rotate-180 opacity-0'
                          : ''
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrowSelected"
                      />
                    </div>
                  </div>
                </div>
              </button>
            </li>

            <!-- reference sub menu new -->
            <div :class="sidebar.isWide === true ? '' : 'hidden'">
              <!-- hidden ga ngaruh disini -->
              <collapse-transition dimension="height" :duration="500">
                <div
                  v-if="sidebar.sidebarMenu.reference == true"
                  class="pl-4 pb-4 sm:flex sm:flex-col overflow-y-auto ease-in-out duration-500"
                >
                  <ul class="flex flex-col gap-4 pt-4 px-2">
                    <router-link to="/employee" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/employee' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/employee' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/employee'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Employee
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>

                    <router-link to="/company" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/company' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/company' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/company'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Company
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>

                    <router-link to="/departement" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/departement' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/departement' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/departement'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Department
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>

                    <router-link
                      to="/classtransportation"
                      class="cursor-pointer"
                    >
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/classtransportation'
                              ? 'hidden'
                              : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/classtransportation'
                              ? 'inline'
                              : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/classtransportation'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Class Transportation<img
                            class="w-5 h-5"
                            :src="groupIcon"
                            alt=""
                          />
                        </p>
                      </div>
                    </router-link>

                    <router-link to="/currency" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/currency' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/currency' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/currency'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Currency
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>

                    <router-link to="/city" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/city' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/city' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/city'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          City <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>

                    <router-link to="/reimbursement" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/reimbursement'
                              ? 'hidden'
                              : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/reimbursement'
                              ? 'inline'
                              : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/reimbursement'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Reimbursement Type<img
                            class="w-5 h-5"
                            :src="groupIcon"
                            alt=""
                          />
                        </p>
                      </div>
                    </router-link>
                    <router-link to="/zona" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/zona' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/zona' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/zona'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Zona <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
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
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/job'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Job Band<img
                            class="w-5 h-5"
                            :src="groupIcon"
                            alt=""
                          />
                        </p>
                      </div>
                    </router-link>
                    <router-link to="/site" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/site' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/site' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/site'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Site <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>
                    <router-link to="/brand" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/brand' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/brand' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/brand'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Brand <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
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
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/uom'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          UOM <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>
                    <router-link to="/warehouse" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/warehouse' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/warehouse' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/warehouse'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Warehouse
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>
                    <router-link to="/glaccount" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/glaccount' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/glaccount' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/glaccount'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          GL Account
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>
                    <router-link to="/hotel" class="cursor-pointer">
                      <div class="flex gap-[10px] items-center cursor-pointer">
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/hotel' ? 'hidden' : 'inline',
                          ]"
                          :src="submenuLine"
                          alt=""
                        />
                        <img
                          class="h-[2px] w-2"
                          :class="[
                            $route.path == '/hotel' ? 'inline' : 'hidden',
                          ]"
                          :src="submenuLineSelected"
                          alt=""
                        />
                        <p
                          class="flex items-center w-full justify-between"
                          :class="[
                            $route.path == '/hotel'
                              ? `anchorImage anchorSubMenu`
                              : '',
                          ]"
                        >
                          Hotel
                          <img class="w-5 h-5" :src="groupIcon" alt="" />
                        </p>
                      </div>
                    </router-link>
                  </ul>
                </div>
              </collapse-transition>
            </div>

            <!-- approval menu -->
            <li>
              <button
                @click="sidebar.increment(approval)"
                class="rounded-lg flex sm:justify-between items-center gap-4 text-left p-4 w-full"
                :class="
                  sidebar.sidebarMenu.approval == true
                    ? 'text-white bg-[#015289]'
                    : ''
                "
              >
                <div class="flex justify-between w-full items-center">
                  <div class="flex gap-4 items-center">
                    <img
                      :src="approvalIcon"
                      class="w-6 h-6 rounded-lg"
                      :class="
                        sidebar.sidebarMenu.approval === true
                          ? 'hidden'
                          : 'block'
                      "
                      alt=""
                    />
                    <img
                      :src="approvalSelected"
                      class="w-6 h-6 rounded-lg"
                      :class="
                        sidebar.sidebarMenu.approval === false
                          ? 'hidden'
                          : 'block'
                      "
                      alt=""
                    />
                    <h3
                      class="text-left"
                      :class="sidebar.isWide === true ? '' : 'hidden'"
                    >
                      Approval
                    </h3>
                  </div>

                  <!-- arrow transition for opening menu -->
                  <div class="relative">
                    <div
                      class="ease-in-out duration-500 absolute bottom-0"
                      :class="
                        sidebar.sidebarMenu.approval === false
                          ? ''
                          : '-rotate-180 opacity-0'
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrow"
                      />
                    </div>

                    <div
                      class="ease-in-out duration-500"
                      :class="
                        sidebar.sidebarMenu.approval === false
                          ? '-rotate-180 opacity-0'
                          : ''
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrowSelected"
                      />
                    </div>
                  </div>
                </div>
              </button>

              <div v-if="sidebar.isWide">
                <collapse-transition dimension="height" :duration="500">
                  <div
                    v-if="sidebar.sidebarMenu.approval === true"
                    class="pl-4 pb-4 sm:flex sm:flex-col hidden"
                  >
                    <ul class="flex flex-col gap-4 pt-4 px-2">
                      <router-link
                        to="/approvalrequesttrip"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalrequesttrip'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalrequesttrip'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvalrequesttrip'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Request Trip
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <router-link
                        to="/approvalsettlement"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalsettlement'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalsettlement'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvalsettlement'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Settlement
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <router-link
                        to="/approvalreimbursement"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalreimbursement'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalreimbursement'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvalreimbursement'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Claim Reimbursement
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <router-link
                        to="/approvalcatravel"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalcatravel'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalcatravel'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvalcatravel'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Cash Advance Travel
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <router-link
                        to="/approvalcanontravel"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalcanontravel'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalcanontravel'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvalcanontravel'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Cash Advance Non Travel
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalatkrrequest'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvalatkrrequest'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvalatkrrequest'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            ATK Supplies
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/approvalatkrrequest"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                ATK Request
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>

                      <router-link
                        to="/approvaldelegation"
                        class="cursor-pointer"
                      >
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvaldelegation'
                                ? 'hidden'
                                : 'inline',
                            ]"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[
                              $route.path == '/approvaldelegation'
                                ? 'inline'
                                : 'hidden',
                            ]"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <p
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '/approvaldelegation'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Approval Delegation
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </p>
                        </div>
                      </router-link>
                    </ul>
                  </div>
                </collapse-transition>
              </div>
            </li>

            <!-- ffs menu -->
            <li>
              <button
                class="rounded-lg flex sm:justify-between items-center gap-4 text-left p-4 w-full"
                @click="sidebar.increment(facility)"
                :class="
                  sidebar.sidebarMenu.facilityServiceSystem == true
                    ? 'text-white bg-[#015289]'
                    : ''
                "
              >
                <div class="flex justify-between w-full items-center">
                  <div class="flex gap-4 items-center">
                    <img
                      :src="facilityIcon"
                      class="w-6 h-6 rounded-lg"
                      :class="
                        sidebar.sidebarMenu.facilityServiceSystem === true
                          ? 'hidden'
                          : 'block'
                      "
                      alt=""
                    />
                    <img
                      :src="facilityIconSelected"
                      class="w-6 h-6 rounded-lg"
                      :class="
                        sidebar.sidebarMenu.facilityServiceSystem === false
                          ? 'hidden'
                          : 'block'
                      "
                      alt=""
                    />
                    <h3
                      class="text-left"
                      :class="sidebar.isWide === true ? '' : 'hidden'"
                    >
                      Facility System
                    </h3>
                  </div>

                  <!-- arrow transition for opening menu -->
                  <div class="relative">
                    <div
                      class="ease-in-out duration-500 absolute bottom-0"
                      :class="
                        sidebar.sidebarMenu.facilityServiceSystem === false
                          ? ''
                          : '-rotate-180 opacity-0'
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrow"
                      />
                    </div>

                    <div
                      class="ease-in-out duration-500"
                      :class="
                        sidebar.sidebarMenu.facilityServiceSystem === false
                          ? '-rotate-180 opacity-0'
                          : ''
                      "
                    >
                      <img
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                        :src="expandArrowSelected"
                      />
                    </div>
                  </div>
                </div>
              </button>

              <div v-if="sidebar.isWide">
                <collapse-transition dimension="height" :duration="500">
                  <div
                    v-if="sidebar.sidebarMenu.facilityServiceSystem === true"
                    class="pl-4 pb-4 sm:flex sm:flex-col hidden"
                  >
                    <ul class="flex flex-col gap-4 pt-4 px-2">
                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'hidden' : 'inline']"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'inline' : 'hidden']"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <a
                            href="#"
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '#'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Meeting Room
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </a>
                        </div>
                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/management-meeting-room"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <span v-if="id_role == 'EMPLY'"
                                  >Meeting Room</span
                                >
                                <span v-else>Management Meeting Room</span>
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/booking-meeting-room"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                Booking Meeting Room
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/dashboard-meeting-room"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                Dashboard Meeting Room
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'hidden' : 'inline']"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'inline' : 'hidden']"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <a
                            href="#"
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '#'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            ATK Supplies
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </a>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/managementitem"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                Management Item ATK
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/stockinatk"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-[30px]">Stock In ATK</p>
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/stock-opname-atk"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                Stock Opname ATK
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/atk-request"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-[28px]">ATK Request</p>
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'hidden' : 'inline']"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'inline' : 'hidden']"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <router-link
                            to="/doc-delivery"
                            class="cursor-pointer"
                          >
                            <li
                              class="flex gap-[10px] items-center justify-between"
                            >
                              Document Delivery
                              <img class="w-4 h-4" :src="groupIcon" alt="" />
                            </li>
                          </router-link>
                        </div>
                      </button>

                      <button class="cursor-pointer text-left">
                        <div
                          class="flex gap-[10px] items-center cursor-pointer"
                        >
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'hidden' : 'inline']"
                            :src="submenuLine"
                            alt=""
                          />
                          <img
                            class="h-[2px] w-2"
                            :class="[$route.path == '#' ? 'inline' : 'hidden']"
                            :src="submenuLineSelected"
                            alt=""
                          />
                          <a
                            href="#"
                            class="flex items-center w-full justify-between"
                            :class="[
                              $route.path == '#'
                                ? `anchorImage anchorSubMenu`
                                : '',
                            ]"
                          >
                            Reports
                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </a>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link to="#" class="cursor-pointer">
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                Document Delivery Reports
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link to="#" class="cursor-pointer">
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                <p class="mr-[30px]">Stock In Vs Stock Out</p>
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>

                        <div class="ml-5 mt-[10px]">
                          <ul
                            class="flex flex-col gap-[10px] text-base font-normal"
                          >
                            <router-link
                              to="/meetingroomreports"
                              class="cursor-pointer"
                            >
                              <li
                                class="flex gap-[10px] items-center justify-between"
                              >
                                <img
                                  :src="submenuInner"
                                  alt=""
                                  class="w-2 h-2"
                                />
                                Meeting Room Reports
                                <img class="w-5 h-5" :src="groupIcon" alt="" />
                              </li>
                            </router-link>
                          </ul>
                        </div>
                      </button>
                    </ul>
                  </div>
                </collapse-transition>
              </div>
            </li>
          </ul>
        </div>
      </div>
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

.background-white {
  background-color: white;
}

.zInfinite {
  z-index: 999;
}

.this {
  overflow-x: hidden;
}

.slideDown-enter-from {
  transform: translateY(-20px);
}

.slideDown-enter-active {
  transition: all 0.5s ease;
}

.slideDown-enter-to {
  transform: translateY(0px);
}

.slideDown-leave-from {
  transform: translateY(0px);
}

.slideDown-leave-active {
  transition: all 0.5s ease;
}

.slideDown-leave-to {
  transform: translateY(-10px);
}

.sidebar-wrapper {
  height: 100% !important;
  width: 100% !important;
  overflow: hidden;
  position: relative;
  overflow-x: hidden !important;
}

.sidebar {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 0px 0px !important;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0px;
}

.z-Infinite {
  z-index: 9999;
}
</style>
