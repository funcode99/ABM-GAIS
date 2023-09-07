<script setup>
import tail from "@/assets/topbar-image.png";
import arrow from "@/assets/arrow-navbar.png";
import user from "@/assets/navbar/user.svg";
import ABMIcon from "@/assets/abm.png";

import { ref, onBeforeMount } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
import { useRouter } from "vue-router";

import { PublicClientApplication } from "@azure/msal-browser";
import { useMSALStore } from "@/stores/msal";
let msalStore = useMSALStore();

msalStore.msalInstance = new PublicClientApplication(msalStore.msalConfig);

let companyLogo = localStorage.getItem("company_logo");
let userName = localStorage.getItem("username");
let role = localStorage.getItem("id_role").replace(/"/g, "");
let adminRole = role == "ADMTR" || role == "ADM" || role == "SUPADM";

import Api from "@/utils/Api";
import moment from "moment";

const router = useRouter();
const sidebar = useSidebarStore();
const tabs = ref(["Notification", "Approval"]);
const activeTab = ref(0);

let isOpen = ref(false);
let sortedData = ref([]);
let instanceArray = [];
let sortedDataNotif = ref([]);
let instanceArrayNotif = [];
let sortedDataApproval = ref([]);
let instanceArrayApproval = [];

const changeViewStatus = () => {
  isOpen.value = false
};

const changeTab = (index) => {
  activeTab.value = index;
};

const logout = async () => {
  if (localStorage.getItem("ms_access_token")) {
    console.log("masuk ke microsoft");
    SignOut();
  } else {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    let api = await Api.post("/users/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("company_logo");
    localStorage.removeItem("company_code");
    localStorage.removeItem("id_site");
    localStorage.removeItem("id_role");
    localStorage.removeItem("id_company");
    localStorage.removeItem("id_employee");
    localStorage.removeItem("id_role_number");
    localStorage.removeItem("ms_access_token");

    sidebar.menuData = "";
    sidebar.readMenu = "[]";
    sidebar.writeMenu = "[]";

    router.push({ path: "/" });
  }
};

const SignOut = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  let api = await Api.post("/users/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("company_logo");
  localStorage.removeItem("company_code");
  localStorage.removeItem("id_site");
  localStorage.removeItem("id_role");
  localStorage.removeItem("id_company");
  localStorage.removeItem("id_employee");
  localStorage.removeItem("id_role_number");
  localStorage.removeItem("ms_access_token");

  await msalStore.msalInstance
    .logout({})
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
    });
};

const getNotif = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/notification/get_data");
  instanceArray = res.data.data;
  sortedData.value =
    res.data.message == "Success Get Data" ? instanceArray : [];
};

const fetchNotifNonApproval = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/notification/get_notif");
  instanceArrayNotif = res.data.data;
  if (instanceArrayNotif !== undefined) {
    sortedDataNotif.value = instanceArrayNotif;
  }
};

const fetchNotifApproval = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/notification/get_approval");
  instanceArrayApproval = res.data.data;
  if (instanceArrayApproval !== undefined) {
    sortedDataApproval.value = instanceArrayApproval;
  }
};

const readNotif = async (id, id_document) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.post(`/notification/is_viewed/${id}`);
  } catch (error) {
    console.error("Error while updating is_viewed:", error);
  }
  router.push({ path: `/viewcashadvancenontravel/${id_document}` });
};

const readNotifApproval = async (id, id_document) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.post(`/notification/is_viewed/${id}`);
  } catch (error) {
    console.error("Error while updating is_viewed:", error);
  }
  router.push({ path: `/viewapprovalcanontravel/${id_document}` });
};

onBeforeMount(() => {
  getNotif();
  fetchNotifNonApproval();
  fetchNotifApproval();
});

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY, h:mm:ss");
  }
};
</script>

<template>
  <div class="flex gap-2 fixed w-full bg-white zInfinite top-0">
    <router-link to="/dashboard">
      <div
        class="flex justify-center items-center h-[115px] z-50 ease-in-out duration-500"
        :class="sidebar.isWide === true ? 'min-w-[260px]' : 'min-w-[100px]'"
      >
        <img
          :src="ABMIcon"
          class="ease-in-out duration-500"
          :class="
            sidebar.isWide === true ? 'w-[114px] h-[86px]' : 'w-[57px] h-[43px]'
          "
          alt="abm_icon"
        />
      </div>
    </router-link>

    <div
      class="flex w-full justify-between items-center bg-base-100 py-0 px-0 h-[115px]"
    >
      <div class="hidden md:block">
        <img :src="tail" class="max-w-[285px] h-[115px]" />
      </div>

      <div class="hidden md:flex justify-center items-center">
        <img :src="companyLogo" class="max-w-[120px] max-h-[79px]" />
      </div>

      <div class="md:hidden"></div>

      <div class="pr-4">
        <div class="flex justify-center items-center">
          <!-- notification -->
          <div class="relative">
            <div class="dropdown dropdown-end">
              <button tabindex="0" class="mx-10 hover:scale-125">
                <div
                  class="indicator hover:bg-slate-300 hover:rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span
                    class="badge badge-sm bg-[#F04438] border-none indicator-item"
                    >{{
                      sortedData.filter((data) => data.is_viewed === 1).length
                    }}</span
                  >
                </div>
              </button>
              <div
                tabindex="0"
                class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <ul
                  class="absolute right-0 border-[#e4e4e6] border-2 dropdown-content p-2 shadow bg-base-100 rounded-box w-[500px] top-[50px] overflow-y-scroll overflow-x-hidden max-h-60 min-h-12 mt-[-40px]"
                >
                  <div class="tabs">
                    <a
                      v-for="(tab, index) in tabs"
                      :key="index"
                      :class="[
                        'tab',
                        'tab-bordered',
                        'tab-lifted',
                        'font-JakartaSans font-normal text-md',
                        { 'tab-active': activeTab === index },
                      ]"
                      @click="changeTab(index)"
                      v-show="
                        tab == 'Approval' &&
                        (role == 'ADMTR' || role == 'ADM' || role == 'SUPADM')
                          ? true
                          : tab == 'Notification'
                          ? true
                          : false
                      "
                    >
                      {{ tab }}
                    </a>
                  </div>

                  <!-- tab notification -->
                  <main v-if="activeTab === 0">
                    <li
                      v-if="
                        sortedDataNotif.value !== undefined ||
                        sortedDataNotif.length > 0
                      "
                      v-for="data in sortedDataNotif
                        .filter((item) => item.is_viewed)
                        .slice(0, 5)"
                      :key="data.id"
                      class="border-2 py-2 my-2 rounded-box"
                      :style="{
                        'background-color': data.is_viewed
                          ? 'rgba(0, 0, 255, 0.1)'
                          : 'transparent',
                      }"
                    >
                      <button
                        @click="readNotif(data.id, data.id_document)"
                        v-if="adminRole || role"
                      >
                        <a class="flex justify-start gap-2 items-center mx-2">
                          <img
                            :src="user"
                            class="background rounded-full w-[42px] h-[42px]"
                          />
                          <div class="mx-1">
                            <p class="text-left">{{ data.text }}</p>
                            <p class="text-left text-sm">
                              {{ format_date(data.date) }}
                            </p>
                          </div>
                        </a>
                      </button>
                    </li>

                    <li
                      v-if="
                        sortedDataNotif.length == 0 ||
                        sortedDataNotif.filter((data) => data.is_viewed === 1)
                          .length == 0
                      "
                      class="border-2 py-2 my-2 rounded-box"
                    >
                      <button>
                        <a class="flex justify-start gap-2 items-center mx-1"
                          ><img
                            :src="user"
                            class="background rounded-full w-[42px] h-[42px]"
                          />
                          <span class="text-start"> No Notification </span>
                        </a>
                      </button>
                    </li>
                  </main>

                  <!-- tab approval -->
                  <main v-else>
                    <li
                      v-if="
                        sortedDataApproval.value !== undefined ||
                        sortedDataApproval.length > 0
                      "
                      v-for="data in sortedDataApproval
                        .filter((item) => item.is_viewed)
                        .slice(0, 5)"
                      :key="data.id"
                      class="border-2 py-2 my-2 rounded-box"
                      :style="{
                        'background-color': data.is_viewed
                          ? 'rgba(0, 0, 255, 0.1)'
                          : 'transparent',
                      }"
                    >
                      <button
                        @click="readNotifApproval(data.id, data.id_document)"
                        v-if="adminRole || role"
                      >
                        <a class="flex justify-start gap-2 items-center mx-2">
                          <img
                            :src="user"
                            class="background rounded-full w-[42px] h-[42px]"
                          />
                          <div class="mx-1">
                            <p class="text-left">{{ data.text }}</p>
                            <p class="text-left text-sm">
                              {{ format_date(data.date) }}
                            </p>
                          </div>
                        </a>
                      </button>
                    </li>

                    <li
                      v-if="
                        sortedDataApproval.length == 0 ||
                        sortedDataApproval.filter(
                          (data) => data.is_viewed === 1
                        ).length == 0
                      "
                      class="border-2 py-2 my-2 rounded-box"
                    >
                      <button>
                        <a class="flex justify-start gap-2 items-center mx-1"
                          ><img
                            :src="user"
                            class="background rounded-full w-[42px] h-[42px]"
                          />
                          <span class="text-start"> No Notification </span>
                        </a>
                      </button>
                    </li>
                  </main>
                </ul>
              </div>
            </div>
          </div>

          <!-- profile -->
          <div class="relative cursor-pointer">
            
            <div
              class="rounded-full flex items-center bg-[#E4E4E4] w-[195px] h-[60px]"
              @click="isOpen = !isOpen"
            >
              <div class="flex gap-2 items-center px-3 w-full">
                <div>
                  <div class="w-10">
                    <div class="w-[42px] h-[42px]">
                      <img
                        :src="user"
                        class="background rounded-full w-[42px] h-[42px]"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="cursor-pointer w-full"
                >
                  
                  <div
                    class="min-h-max py-3 flex items-center justify-evenly w-full"
                  >
                    <p
                      class="font-JakartaSans font-medium text-base justify-center items-center"
                    >
                      Halo, {{ userName }}
                    </p>
                    <img class="w-[18px] h-[18px]" :src="arrow" alt="" />
                  </div>

                </div>

              </div>
            </div>

            <ul
              v-if="isOpen"
              class="mt-3 p-2 shadow bg-base-100 rounded-box w-52 absolute"
              v-click-outside="changeViewStatus"
            >
              <li class="py-2 border-b-2">
                <button>
                  <a>Profile</a>
                </button>
              </li>
              <li class="py-2 border-b-2">
                <button>
                  <a>Settings</a>
                </button>
              </li>
                <button type="button" @click="logout" class="py-2 border-b-2">
                  <a>Logout</a>
                </button>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: #3e5aed;
}

.zInfinite {
  z-index: 51 !important;
}

.slide-enter-from {
  top: 70px;
}

.slide-enter-active {
  transition: top 0.5s ease;
}

.slide-enter-to {
  top: 50px;
}
</style>
