<script setup>
  import tail from "@/assets/topbar-image.png"
  import highlight from "@/assets/mvc-logo.png"
  import arrow from '@/assets/arrow-navbar.png'
  import user from "@/assets/navbar/user.svg"
  import ABMIcon from '@/assets/abm.png'
  import { ref } from 'vue'
  import { useSidebarStore } from "@/stores/sidebar.js"
  import { useRouter } from 'vue-router'

  let companyLogo = localStorage.getItem('company_logo')
  let userName = localStorage.getItem('username')

  let companyLogoURL = `${import.meta.env.VITE_APP_URL}${companyLogo}`

  import Api from '@/utils/Api'

  const router = useRouter()
  
  const sidebar = useSidebarStore()
  let isOpen = ref(false)
  let isNotificationOpen = ref(false)
  
  const changeViewStatus = () => {
    isOpen.value = false
  }

  const logout = async () => {
    console.log('masuk ke logout')
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    let api = await Api.post('/users/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('company_logo')
    localStorage.removeItem('username')
    router.push({path: '/'})
  }

</script>

<template>

  <div class="flex gap-2 fixed w-full bg-white zInfinite top-0">
    
    <router-link to="/dashboard">
      <div class="flex justify-center items-center h-[115px] z-50 ease-in-out duration-500"
          :class="sidebar.isWide === true ? 'min-w-[260px]' : 'min-w-[100px]'"  
      >
          <img :src=ABMIcon 
          class="ease-in-out duration-500"
          :class="sidebar.isWide === true ? 'w-[114px] h-[86px]' : 'w-[57px] h-[43px]'"
          alt="abm_icon">
      </div>
    </router-link>

    <div class="flex w-full justify-between items-center bg-base-100 py-0 px-0 h-[115px]">
  
      <div class="hidden md:block">
        <img :src="tail" class="max-w-[285px] h-[115px]" />
      </div>
  
      <div class="hidden md:flex justify-center items-center">
        <img :src="companyLogoURL" class="max-w-[120px] max-h-[79px]" />
        <!-- <img src="http://103.165.130.157:8086/storage/files/company/od2nBcLMjlMCQSbclgvcaZ76TVL502pYVADFR5gK.png" /> -->
      </div>

      <div class="md:hidden"></div>
  
      <div class="pr-4">

        <div class="flex justify-center items-center ">
             
          <!-- notification -->
          <!-- harus pake v-if kalo mau transition -->
          <!-- tabindex nya dihapus tapi dropdown nya masih muncul -->
              <div class="relative">
                <button @click="isNotificationOpen = !isNotificationOpen" class=" mx-10 hover:scale-125">
                      <div class="indicator hover:bg-slate-300 hover:rounded-full p-1">
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
                          >8</span
                        >
                      </div>
                </button>
                <Transition name="slide">
                  <ul v-if="isNotificationOpen" class="absolute right-0 border-[#e4e4e6] border-2 dropdown-content menu p-3 shadow bg-base-100 rounded-box w-52 top-[50px]">
                        <li><a>Contoh kalimat panjang 1, apakah yang akan terjadi</a></li>
                        <li><a>Notifikasi 2</a></li>
                        <li><a>Notifikasi 3</a></li>
                  </ul>
                </Transition>
              </div>
  
          <!-- profile -->
          <div class="relative cursor-pointer">

            <div class="rounded-full flex items-center bg-[#E4E4E4] w-[195px] h-[60px]" @click="isOpen = !isOpen">

              <div class="flex gap-2 items-center px-3 w-full">
                
                <div>
                  <div class="w-10 ">
                    <div class="w-[42px] h-[42px]">
                      <img :src="user" class="background rounded-full w-[42px] h-[42px]" />
                    </div>
                  </div>
                </div>

                <div class="cursor-pointer w-full" v-click-outside="changeViewStatus">
                  <div class="min-h-max py-3 flex items-center justify-evenly w-full">
                    <p class="font-JakartaSans font-medium text-base justify-center items-center">
                      Halo, {{ userName }}
                    </p>
                    <img class="w-[18px] h-[18px]" :src="arrow" alt="">
                  </div>
                </div>

              </div>

            </div>

            <ul v-if="isOpen" class="mt-3 p-2 shadow bg-base-100 rounded-box w-52 absolute">
              <li class="py-2 border-b-2"><a>Profile</a></li>
              <li class="py-2 border-b-2"><a>Settings</a></li>
              <li @click="logout" class="py-2 border-b-2 cursor-pointer"><a>Logout</a></li>
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
    z-index: 99 !important;
  }

  .slide-enter-from
{   
    top: 70px;
}

.slide-enter-active
{
  transition: top .5s ease;
}

.slide-enter-to
{
   top: 50px;
}

</style>