<script setup>
import { onMounted, onBeforeMount, ref, watch } from "vue";
import Api from "@/utils/Api";

import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";

import submenuLine from "@/assets/submenu-line.png";
import submenuLineSelected from "@/assets/submenu-line-selected.png";
import submenuInner from "@/assets/inner-sub-menu.png";

import searchIcon from "@/assets/Icons.png";
import expandArrow from "@/assets/ExpandArrow.png";
import expandArrowSelected from "@/assets/expand-arrow-selected.png";
import groupIcon from "@/assets/Group.png";
import chevronIcon from "@/assets/chevron-white-medium.png";

// harus pake ekstensi kalo enggak gak bakal kebaca
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const searchSidebarValue = ref("");

const fetchSidebarAppearance = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  let api = await Api.get(`/role/get_sidebar_menu`)
  sidebar.menuData = api.data.data
}

const searchSidebar = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  let api = await Api.get(`/role/search_sidebar?search=${searchSidebarValue.value}`)
  sidebar.menuData = api.data.data
}

onBeforeMount(() => {
  if (sidebar.menuData === "") {
    fetchSidebarAppearance()
  }
})

watch(sidebar, () => {
  if (sidebar.menuData === "") {
    fetchSidebarAppearance()
  }

  if(sidebar.writeMenu === '[]') {
    fetchMenuWriteByRole()
  }
})

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

    if(JSON.stringify(sidebar.readMenu) === '[]') {
      fetchMenuReadByRole()
    }

    if(JSON.stringify(sidebar.writeMenu) === '[]') {
      fetchMenuWriteByRole()
    }

})

const isNotifSelected = ref(false)

const handleNotifClick = () => {
  isNotifSelected.value = !isNotifSelected.value
}

  const fetchMenuReadByRole = async () => {

    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.get(`/role/get_menu_read/${localStorage.getItem('id_role_number')}`)
    sidebar.readMenu = api.data.data.menu

  }

  const fetchMenuWriteByRole = async () => {
    
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.get(`/role/get_menu_write/${localStorage.getItem('id_role_number')}`)
    sidebar.writeMenu = api.data.data.menu

  }

  let childrenMenu = ref('')

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
        @keyup.enter="searchSidebar()"
      />
    </div>

    <!-- menu -->
    <div class="sidebar-wrapper mt-3">
      
      <div class="sidebar scroller">
        
        <div class="px-4 flex flex-col items-center">

          <ul id="myMenu" class="pb-20">

            <!-- search icon saat sidebar nya mengecil -->
            <li>
              <div
                class="flex justify-center items-center cursor-pointer py-4"
                :class="sidebar.isWide === true ? 'hidden' : ''"
              >
                <img :src="searchIcon" alt="search" class="w-6 h-6" />
              </div>
            </li>

            <!-- {{ sidebar.menuData }} -->

            <li v-for="data in sidebar.menuData">

              <!-- jika tidak ada child -->
              <router-link :to="`${data.url}`" 
                @click="sidebar.increment(data.menu)"
                v-if="!data.child"
                class="w-full rounded-lg flex sm:justify-between items-center gap-4 text-left p-4"
                :class="
                  sidebar.sidebarMenu === data.menu
                    ? 'text-white bg-[#015289]'
                    : ''
                "
              >
                                  
                <!-- jika parent menu nya tidak ada child -->
                <div class="flex justify-between w-full items-center">
                    
                    <div class="flex gap-4 items-center">

                      <img :src="data.icon_path" class="w-6 h-6"  />

                      <h3
                        class="text-left"
                        :class="sidebar.isWide === true ? '' : 'hidden'"
                      >
                        {{ data.menu }}
                      </h3>

                    </div>

                </div>
              </router-link>

              <!-- jika parent menu ada child -->
              <button
                v-if="data.child"
                @click="sidebar.increment(data.menu)"
                class="w-full rounded-lg flex sm:justify-between items-center gap-4 text-left p-4"
                :class="
                  sidebar.sidebarMenu === data.menu
                    ? 'text-white bg-[#015289]'
                    : ''
                "
              >

                <!-- jika parent menu nya ada child -->
                <div class="flex justify-between w-full items-center">
                    
                  <div class="flex gap-4 items-center">

                    <img :src="data.icon_path" class="w-6 h-6"  />
                    
                    <h3
                      class="text-left"
                      :class="sidebar.isWide === true ? '' : 'hidden'"
                    >
                      {{ data.menu }}
                    </h3>

                  </div>

                  <!-- arrow image -->
                  <div class="relative">
                    
                    <div
                      class="ease-in-out duration-500 absolute bottom-0"
                      :class="
                        sidebar.sidebarMenu !== data.menu
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
                        sidebar.sidebarMenu !== data.menu
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

                  <div class="fixed">

                    <div class="absolute left-[75px] top-[-30px] rounded-lg bg-blue">
  
                      <div 
                        v-for="child in data.child">
  
                      <!-- child -->
                      <router-link 
                        :to="`${child.url}`"
                        v-if="!sidebar.isWide & sidebar.sidebarMenu === data.menu">
                            
                          <div
                              class="flex items-center cursor-pointer text-xs h-10 w-32  text-white"
                              @mouseover="childrenMenu = child.menu"
                            >
                              
                            <!-- <img
                                class="h-[2px] w-2"
                                :class="[
                                  $route.path === data.menu ? 'hidden' : 'inline',
                                ]"
                                :src="submenuLine"
                                alt=""
                              />
  
                              <img
                                class="h-[2px] w-2"
                                :class="[
                                  $route.path === data.menu ? 'inline' : 'hidden',
                                ]"
                                :src="submenuLineSelected"
                                alt=""
                              /> -->
  
                              <!-- class="flex items-center w-full justify-between" -->
                                <!-- :class="[
                                  $route.path === child.url
                                    ? `anchorImage anchorSubMenu`
                                    : '',
                                ]" -->

                              <p
                                class="ml-2"
                            
                              >
                                {{ child.menu }}
                              </p>
  
                            </div>
                      </router-link>

                      <!-- grand child -->
                      <div class="fixed">

                        <div class="absolute left-[135px] top-[-41px] border-2 bg-blue border-white rounded-lg">
                          
                          <router-link
                              :to="grandchild.url"
                              v-for="grandchild in child.child"
                              v-if="!sidebar.isWide & sidebar.sidebarMenu === data.menu & childrenMenu === child.menu"
                            >

                            <!-- {{ child.menu }} -->
  
                            <!-- class="flex gap-[10px] items-center cursor-pointer pl-8 py-2" -->
  
                              <div
                                class="flex items-center cursor-pointer text-xs h-10 w-40 text-white"
                              >
  
                                <!-- <img :src="submenuInner" alt="" class="w-2 h-2" /> -->
    
                                <p class="ml-2">
                                  {{ grandchild.menu }}
                                </p>
    
                                <!-- <div class="flex-1"></div> -->
    
                                <!-- <img class="w-5 h-5" :src="groupIcon" alt="" /> -->
  
                              </div>
  
                          </router-link>
  
                        </div>

                      </div>
                      
                      </div>
  
                    </div>

                  </div>

                </div>

              </button>

              <div v-if="sidebar.isWide">
                <collapse-transition v-if="data.child" dimension="height" :duration="500">

                  <div
                    v-if="sidebar.sidebarMenu === data.menu"
                    class="pl-4 pb-4 sm:flex sm:flex-col hidden"
                  >
                    <ul class="flex flex-col gap-4 pt-4 px-2">
                      <!-- children menu -->
                      <div v-for="child in data.child">
                        <router-link :to="`${child.url}`">
                          <div
                            class="flex gap-[10px] items-center cursor-pointer"
                          >
                            <img
                              class="h-[2px] w-2"
                              :class="[
                                $route.path === data.menu ? 'hidden' : 'inline',
                              ]"
                              :src="submenuLine"
                              alt=""
                            />
                            <img
                              class="h-[2px] w-2"
                              :class="[
                                $route.path === data.menu ? 'inline' : 'hidden',
                              ]"
                              :src="submenuLineSelected"
                              alt=""
                            />

                            <p
                              class="flex items-center w-full justify-between"
                              :class="[
                                $route.path === child.url
                                  ? `anchorImage anchorSubMenu`
                                  : '',
                              ]"
                            >
                              {{ child.menu }}
                            </p>
                          </div>
                        </router-link>

                        <router-link
                          :to="grandchild.url"
                          v-for="grandchild in child.child"
                        >
                          <div
                            class="flex gap-[10px] items-center cursor-pointer pl-8 py-2"
                          >
                            <img :src="submenuInner" alt="" class="w-2 h-2" />

                            <span>
                              {{ grandchild.menu }}
                            </span>

                            <div class="flex-1"></div>

                            <img class="w-5 h-5" :src="groupIcon" alt="" />
                          </div>
                        </router-link>
                      </div>
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
